import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { estimateReadingTime, parseArticleBody } from "@/lib/markdown";
import type { Article, ContentType, PublishStatus, SourceLink } from "@/types";
import { authorById } from "./authors";
import { categories } from "./categories";
import { imageCredits } from "./image-credits";

/*
 * Articles live in content/articles/<slug>.md: YAML frontmatter for the
 * metadata, Markdown-style text for the body (format in content/README.md).
 * The file name is the URL slug, and the cover photo is
 * public/images/articles/<slug>.jpg. Read at build time only.
 */

const DIR = path.join(process.cwd(), "content", "articles");
const CONTENT_TYPES: ContentType[] = ["news", "analysis", "opinion"];
const STATUSES: PublishStatus[] = ["draft", "published"];

// YAML turns unquoted dates into Date objects; keep everything as ISO strings
const isoDate = (value: unknown) => (value instanceof Date ? value.toISOString() : value ? String(value) : undefined);

function load(file: string): Article {
  const slug = file.replace(/\.md$/, "");
  const { data, content } = matter(readFileSync(path.join(DIR, file), "utf8"));
  const fail = (msg: string): never => {
    throw new Error(`content/articles/${file}: ${msg}`);
  };

  for (const key of ["title", "excerpt", "category", "publishedAt", "coverAlt"]) if (!data[key]) fail(`missing "${key}"`);
  if (!categories.some((c) => c.id === data.category)) {
    fail(`unknown category "${data.category}" (use one of: ${categories.map((c) => c.id).join(", ")})`);
  }
  const contentType: ContentType = data.contentType ?? "news";
  if (!CONTENT_TYPES.includes(contentType)) fail(`contentType must be news, analysis or opinion`);
  const status: PublishStatus = data.status ?? "published";
  if (!STATUSES.includes(status)) fail(`status must be draft or published`);
  const publishedAt = isoDate(data.publishedAt)!;
  if (Number.isNaN(Date.parse(publishedAt))) fail(`publishedAt is not a date: ${publishedAt}`);

  const blocks = parseArticleBody(content, `content/articles/${file}`);
  const coverImage = `/images/articles/${slug}.jpg`;

  return {
    id: data.id ?? slug,
    slug,
    title: data.title,
    excerpt: data.excerpt,
    content: blocks,
    coverImage,
    coverAlt: data.coverAlt,
    coverCredit: imageCredits[coverImage],
    category: data.category,
    tags: data.tags ?? [],
    author: authorById(data.author ?? "a-desk"),
    publishedAt,
    updatedAt: isoDate(data.updatedAt),
    readingTime: data.readingTime ?? estimateReadingTime(blocks),
    featured: Boolean(data.featured),
    status,
    contentType,
    sources: (data.sources ?? []) as SourceLink[],
    trendingScore: data.trendingScore ?? 0,
  };
}

export const articles: Article[] = readdirSync(DIR)
  .filter((f) => f.endsWith(".md"))
  .map(load);
