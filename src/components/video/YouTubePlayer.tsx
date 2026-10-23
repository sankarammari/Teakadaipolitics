"use client";

import { BellRing, Play } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { SocialIcon } from "@/components/common/SocialIcon";
import { siteConfig } from "@/config/site";
import { getYouTubeEmbedUrl, getYouTubeWatchUrl } from "@/lib/youtube";

interface YouTubePlayerProps {
  videoId: string;
  title: string;
  thumbnail: string;
}

/**
 * Click-to-load player: shows the local thumbnail first and only inserts the
 * YouTube iframe when the reader presses play, so no YouTube requests or
 * autoplay happen on page load. Videos without an id yet show a "coming soon"
 * panel that points to the channel.
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
      <div className="relative aspect-video overflow-hidden rounded-lg bg-night">
        <div className="opacity-40">{poster}</div>
        <div className="absolute inset-0 grid place-items-center p-6 text-center text-on-night">
          <div>
            <BellRing className="mx-auto size-8 text-amber" aria-hidden />
            <p className="headline mt-2 text-2xl">இந்த வீடியோ விரைவில் வெளியாகும்</p>
            <p className="mt-1 text-sm text-on-night/80">புதிய வீடியோக்கள் வந்தவுடன் தெரிந்துகொள்ள சேனலை சப்ஸ்கிரைப் செய்யுங்கள்.</p>
            {siteConfig.social.youtube && (
              <a
                href={siteConfig.social.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#ff0000] px-5 py-2 text-sm font-bold text-white transition-transform hover:scale-105"
              >
                <SocialIcon platform="youtube" className="size-4" />
                சப்ஸ்கிரைப் செய்யுங்கள்
                <span className="sr-only">(புதிய தாவலில் திறக்கும்)</span>
              </a>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative aspect-video overflow-hidden rounded-lg bg-night">
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
            className="group absolute inset-0 grid place-items-center bg-night/20 hover:bg-night/30"
          >
            <span className="grid size-20 place-items-center rounded-full bg-paper text-ink shadow-lg group-hover:scale-105 group-focus-visible:scale-105 motion-safe:transition-transform">
              <Play className="size-8 translate-x-0.5" fill="currentColor" aria-hidden />
            </span>
            <span className="sr-only">வீடியோவை இயக்கு: {title}</span>
          </button>
          {watchUrl && (
            <noscript>
              <a href={watchUrl}>யூடியூபில் பாருங்கள்</a>
            </noscript>
          )}
        </>
      )}
    </div>
  );
}
