import type { ImageCredit } from "./image";

export interface Video {
  id: string;
  slug: string;
  title: string;
  description: string;
  /** 11-character YouTube id or a full YouTube URL. Validated by `lib/youtube.ts`. */
  youtubeVideoId: string;
  channelName: string;
  thumbnail: string;
  thumbnailCredit?: ImageCredit;
  /** Category id (see `Category.id`). */
  category: string;
  publishedAt: string;
  featured: boolean;
  durationLabel?: string;
}
