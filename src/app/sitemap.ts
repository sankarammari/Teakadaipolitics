import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { repository } from "@/lib/content";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [articles, categories, videos] = await Promise.all([
    repository.getArticles(),
    repository.getCategories(),
    repository.getVideos(),
  ]);
  const url = (path: string) => `${siteConfig.url}${path}`;

  const staticRoutes = ["", "/articles", "/analysis", "/videos", "/about", "/contact", "/privacy-policy", "/terms", "/credits"].map(
    (path) => ({ url: url(path || "/"), changeFrequency: "daily" as const, priority: path === "" ? 1 : 0.6 }),
  );

  return [
    ...staticRoutes,
    ...categories.map((c) => ({ url: url(`/category/${c.slug}`), changeFrequency: "daily" as const, priority: 0.6 })),
    ...articles.map((a) => ({ url: url(`/articles/${a.slug}`), lastModified: a.updatedAt ?? a.publishedAt, priority: 0.8 })),
    ...videos.map((v) => ({ url: url(`/videos/${v.slug}`), lastModified: v.publishedAt, priority: 0.5 })),
  ];
}
