import { articles } from "@/data/articles";
import { authors } from "@/data/authors";
import { categories } from "@/data/categories";
import { videos } from "@/data/videos";
import type { ContentRepository } from "./repository";

const byNewest = <T extends { publishedAt: string }>(a: T, b: T) =>
  Date.parse(b.publishedAt) - Date.parse(a.publishedAt);

const published = articles.filter((a) => a.status === "published").sort(byNewest);
const sortedVideos = [...videos].sort(byNewest);

export class MockContentRepository implements ContentRepository {
  async getArticles() {
    return published;
  }

  async getArticleBySlug(slug: string) {
    return published.find((a) => a.slug === slug) ?? null;
  }

  async getCategories() {
    return categories;
  }

  async getCategoryBySlug(slug: string) {
    return categories.find((c) => c.slug === slug) ?? null;
  }

  async getVideos() {
    return sortedVideos;
  }

  async getVideoBySlug(slug: string) {
    return sortedVideos.find((v) => v.slug === slug) ?? null;
  }

  async getAuthors() {
    return authors;
  }
}
