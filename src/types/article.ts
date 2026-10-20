import type { Author } from "./author";
import type { ImageCredit } from "./image";

export type ContentType = "news" | "analysis" | "opinion";
export type PublishStatus = "draft" | "published";

/** A source the article relies on. Shown in the "Sources" list under the body. */
export interface SourceLink {
  label: string;
  url: string;
}

/**
 * Article bodies are stored as typed blocks instead of HTML so the same
 * renderer works for mock data now and for API (rich-text JSON) later.
 * `fact` and `statement` exist so reporting, attributed quotes and opinion
 * are visually distinct on the page.
 */
export type ContentBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; level: 2 | 3; text: string }
  | { type: "list"; ordered?: boolean; items: string[] }
  | { type: "quote"; text: string; attribution?: string }
  | { type: "fact"; text: string; source?: SourceLink }
  | {
      type: "statement";
      text: string;
      speaker: string;
      role?: string;
      source?: SourceLink;
    };

export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: ContentBlock[];
  coverImage: string;
  coverAlt: string;
  coverCredit?: ImageCredit;
  /** Category id (see `Category.id`). */
  category: string;
  tags: string[];
  author: Author;
  publishedAt: string;
  updatedAt?: string;
  readingTime: number;
  featured: boolean;
  status: PublishStatus;
  contentType: ContentType;
  sources?: SourceLink[];
  /** Mock-only popularity signal used for the "Bench talk" list. */
  trendingScore?: number;
}
