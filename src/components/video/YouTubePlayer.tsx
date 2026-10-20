"use client";

import { Play, VideoOff } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { getYouTubeEmbedUrl, getYouTubeWatchUrl } from "@/lib/youtube";

interface YouTubePlayerProps {
  videoId: string;
  title: string;
  thumbnail: string;
}

/**
 * Click-to-load player: shows the local thumbnail first and only inserts the
 * YouTube iframe when the reader presses play, so no YouTube requests or
 * autoplay happen on page load. Invalid or missing ids show a fallback.
 */
export function YouTubePlayer({ videoId, title, thumbnail }: YouTubePlayerProps) {
  const [active, setActive] = useState(false);
  const embedUrl = getYouTubeEmbedUrl(videoId);
  const watchUrl = getYouTubeWatchUrl(videoId);

  const poster = (
    <Image src={thumbnail} alt="" fill sizes="(min-width: 1024px) 70vw, 100vw" unoptimized={thumbnail.endsWith(".svg")} className="object-cover" priority />
  );

  if (!embedUrl) {
    return (
      <div className="relative aspect-video overflow-hidden rounded-lg bg-ink">
        <div className="opacity-40">{poster}</div>
        <div className="absolute inset-0 grid place-items-center p-6 text-center text-paper">
          <div>
            <VideoOff className="mx-auto size-8" aria-hidden />
            <p className="headline mt-2 text-2xl">This video isn’t linked yet</p>
            <p className="mt-1 text-sm text-paper/80">Add its YouTube id in the video data to enable playback.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative aspect-video overflow-hidden rounded-lg bg-ink">
      {active ? (
        <iframe
          src={getYouTubeEmbedUrl(videoId, { autoplay: true }) ?? embedUrl}
          title={title}
          className="absolute inset-0 size-full"
          allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; autoplay"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      ) : (
        <>
          {poster}
          <button
            type="button"
            onClick={() => setActive(true)}
            className="group absolute inset-0 grid place-items-center bg-ink/20 hover:bg-ink/30"
          >
            <span className="grid size-20 place-items-center rounded-full bg-paper text-ink shadow-lg group-hover:scale-105 group-focus-visible:scale-105 motion-safe:transition-transform">
              <Play className="size-8 translate-x-0.5" fill="currentColor" aria-hidden />
            </span>
            <span className="sr-only">Play video: {title}</span>
          </button>
          {watchUrl && (
            <noscript>
              <a href={watchUrl}>Watch on YouTube</a>
            </noscript>
          )}
        </>
      )}
    </div>
  );
}
