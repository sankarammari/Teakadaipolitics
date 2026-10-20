import { Play } from "lucide-react";
import Link from "next/link";
import { CoverImage } from "@/components/common/CoverImage";
import { formatDate } from "@/lib/format";
import type { Video } from "@/types";

interface VideoCardProps {
  video: Video;
  categoryName?: string;
  headingLevel?: "h2" | "h3";
  size?: "standard" | "large";
}

export function VideoCard({ video, categoryName, headingLevel: Heading = "h3", size = "standard" }: VideoCardProps) {
  const large = size === "large";
  return (
    <article className="group relative flex flex-col gap-3">
      <div className="relative">
        <CoverImage
          src={video.thumbnail}
          alt=""
          aspect="aspect-video"
          sizes={large ? "(min-width: 1024px) 60vw, 100vw" : undefined}
        />
        <span
          aria-hidden
          className={`absolute bottom-3 left-3 grid place-items-center rounded-full bg-paper text-ink shadow-sm transition-colors duration-300 group-hover:bg-tea group-hover:text-paper ${
            large ? "size-14" : "size-10"
          }`}
        >
          <span className="play-ring absolute inset-0 rounded-full border-2 border-paper" />
          <Play className={large ? "size-6 translate-x-0.5" : "size-4 translate-x-px"} fill="currentColor" />
        </span>
        {video.durationLabel && (
          <span className="absolute bottom-3 right-3 rounded bg-ink/85 px-2 py-0.5 text-xs font-semibold text-paper">
            {video.durationLabel}
          </span>
        )}
      </div>
      {categoryName && <p className="text-sm font-semibold text-tea">{categoryName}</p>}
      <Heading className={`headline ${large ? "text-[1.7rem] sm:text-[2.2rem]" : "text-[1.25rem]"}`}>
        <Link
          href={`/videos/${video.slug}`}
          className="after:absolute after:inset-0 group-hover:underline group-hover:decoration-tea group-hover:decoration-2 group-hover:underline-offset-4"
        >
          {video.title}
        </Link>
      </Heading>
      {large && <p className="max-w-xl text-ink-soft">{video.description}</p>}
      <p className="flex flex-wrap gap-x-3 text-sm text-ink-soft">
        <span>{video.channelName}</span>
        <time dateTime={video.publishedAt}>{formatDate(video.publishedAt)}</time>
      </p>
    </article>
  );
}
