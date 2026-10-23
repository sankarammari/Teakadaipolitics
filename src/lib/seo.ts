import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import type { Article } from "@/types";

interface PageMetaInput {
  title?: string;
  description?: string;
  path: string;
  image?: string;
  type?: "website" | "article" | "video.other";
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
  tags?: string[];
}

export const absoluteUrl = (path: string) =>
  path.startsWith("http") ? path : `${siteConfig.url}${path.startsWith("/") ? "" : "/"}${path}`;

/** Page metadata with canonical URL, Open Graph and Twitter cards filled consistently. */
export function buildMetadata({
  title,
  description = siteConfig.description,
  path,
  image,
  type = "website",
  publishedTime,
  modifiedTime,
  authors,
  tags,
}: PageMetaInput): Metadata {
  // Social platforms ignore SVG; without a raster image the default opengraph-image is used.
  const images = image && !image.endsWith(".svg") ? [{ url: absoluteUrl(image) }] : undefined;
  const ogTitle = title ? `${title} | ${siteConfig.name}` : siteConfig.name;

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: ogTitle,
      description,
      url: path,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      ...(type === "article"
        ? { type: "article", publishedTime, modifiedTime, authors, tags }
        : { type: type === "video.other" ? "video.other" : "website" }),
      ...(images ? { images } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description,
      ...(images ? { images } : {}),
    },
  };
}

/**
 * NewsArticle / OpinionNewsArticle structured data. Returns null until
 * indexing is switched on, so a preview deployment is never marked up as news.
 */
export function articleJsonLd(article: Article) {
  if (!siteConfig.allowIndexing) return null;
  return {
    "@context": "https://schema.org",
    "@type": article.contentType === "opinion" ? "OpinionNewsArticle" : article.contentType === "analysis" ? "AnalysisNewsArticle" : "NewsArticle",
    headline: article.title,
    description: article.excerpt,
    image: [absoluteUrl(article.coverImage)],
    datePublished: article.publishedAt,
    dateModified: article.updatedAt ?? article.publishedAt,
    author: [{ "@type": "Organization", name: siteConfig.name, url: siteConfig.url }],
    publisher: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
    mainEntityOfPage: absoluteUrl(`/articles/${article.slug}`),
    keywords: article.tags.join(", "),
  };
}
