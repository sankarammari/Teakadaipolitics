import type { Article, ContentType } from "@/types";

export type SortOrder = "newest" | "oldest";

export interface ArticleFilters {
  query?: string;
  category?: string;
  contentType?: ContentType | "all";
  sort?: SortOrder;
}

const normalise = (s: string) => s.toLowerCase().normalize("NFKD").replace(/\s+/g, " ").trim();

/**
 * Every whitespace-separated term must appear in the title, excerpt or tags.
 * Runs in the browser in Phase 1; a backend search endpoint can replace it.
 */
export function matchesQuery(article: Article, query: string): boolean {
  const terms = normalise(query).split(" ").filter(Boolean);
  if (terms.length === 0) return true;
  const haystack = normalise([article.title, article.excerpt, ...article.tags].join(" "));
  return terms.every((t) => haystack.includes(t));
}

export function filterArticles(articles: Article[], filters: ArticleFilters): Article[] {
  const { query = "", category = "all", contentType = "all", sort = "newest" } = filters;
  const direction = sort === "newest" ? -1 : 1;

  return articles
    .filter((a) => category === "all" || a.category === category)
    .filter((a) => contentType === "all" || a.contentType === contentType)
    .filter((a) => matchesQuery(a, query))
    .sort((a, b) => direction * (Date.parse(a.publishedAt) - Date.parse(b.publishedAt)));
}
