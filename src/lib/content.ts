import type { Article, ContentType, Video } from "@/types";
import { MockContentRepository } from "./mock-repository";
import type { ContentRepository } from "./repository";

/*
 * Swap this line for an API-backed repository in the backend phase
 * (read NEXT_PUBLIC_API_BASE_URL there, never in components).
 */
export const repository: ContentRepository = new MockContentRepository();

export async function getArticlesByCategory(categoryId: string): Promise<Article[]> {
  return (await repository.getArticles()).filter((a) => a.category === categoryId);
}

export async function getArticlesByType(...types: ContentType[]): Promise<Article[]> {
  return (await repository.getArticles()).filter((a) => types.includes(a.contentType));
}

export async function getTrendingArticles(limit = 5): Promise<Article[]> {
  return [...(await repository.getArticles())]
    .sort((a, b) => (b.trendingScore ?? 0) - (a.trendingScore ?? 0))
    .slice(0, limit);
}

/** Same category first, then shared tags, excluding the article itself. */
export async function getRelatedArticles(article: Article, limit = 3): Promise<Article[]> {
  const score = (other: Article) =>
    (other.category === article.category ? 2 : 0) +
    other.tags.filter((t) => article.tags.includes(t)).length;

  return (await repository.getArticles())
    .filter((a) => a.id !== article.id)
    .map((a) => ({ a, s: score(a) }))
    .filter(({ s }) => s > 0)
    .sort((x, y) => y.s - x.s)
    .slice(0, limit)
    .map(({ a }) => a);
}

export async function getRelatedVideos(video: Video, limit = 3): Promise<Video[]> {
  const all = (await repository.getVideos()).filter((v) => v.id !== video.id);
  const same = all.filter((v) => v.category === video.category);
  return [...same, ...all.filter((v) => v.category !== video.category)].slice(0, limit);
}

export async function getCategoryMap() {
  return new Map((await repository.getCategories()).map((c) => [c.id, c]));
}
