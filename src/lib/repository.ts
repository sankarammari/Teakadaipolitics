import type { Article, Author, Category, Video } from "@/types";

/**
 * The only way pages read content. Phase 1 uses `MockContentRepository`;
 * a later `ApiContentRepository` (Django REST Framework) implements the
 * same contract, so pages and components stay unchanged.
 *
 * Every method returns published content only.
 */
export interface ContentRepository {
  getArticles(): Promise<Article[]>;
  getArticleBySlug(slug: string): Promise<Article | null>;
  getCategories(): Promise<Category[]>;
  getCategoryBySlug(slug: string): Promise<Category | null>;
  getVideos(): Promise<Video[]>;
  getVideoBySlug(slug: string): Promise<Video | null>;
  getAuthors(): Promise<Author[]>;
}
