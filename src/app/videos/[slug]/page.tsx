import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PhotoCredit } from "@/components/common/PhotoCredit";
import { SampleNotice } from "@/components/common/SampleNotice";
import { SectionHeader } from "@/components/common/SectionHeader";
import { ShareLinks } from "@/components/common/ShareLinks";
import { VideoCard } from "@/components/video/VideoCard";
import { YouTubePlayer } from "@/components/video/YouTubePlayer";
import { anim, stagger } from "@/lib/anim";
import { getRelatedVideos, repository } from "@/lib/content";
import { formatDate } from "@/lib/format";
import { absoluteUrl, buildMetadata } from "@/lib/seo";
import { getYouTubeWatchUrl } from "@/lib/youtube";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export async function generateStaticParams() {
  return (await repository.getVideos()).map((v) => ({ slug: v.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const video = await repository.getVideoBySlug((await params).slug);
  if (!video) return {};
  return buildMetadata({
    title: video.title,
    description: video.description,
    path: `/videos/${video.slug}`,
    image: video.thumbnail,
    type: "video.other",
  });
}

export default async function VideoPage({ params }: Props) {
  const video = await repository.getVideoBySlug((await params).slug);
  if (!video) notFound();

  const [related, categories] = await Promise.all([getRelatedVideos(video), repository.getCategories()]);
  const category = categories.find((c) => c.id === video.category);
  const watchUrl = getYouTubeWatchUrl(video.youtubeVideoId);

  return (
    <>
      <div className="container-page pt-8 md:pt-12">
        <nav {...anim("fade")} aria-label="பக்க வழி" className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
          <Link href="/videos" className="inline-flex items-center gap-1 font-semibold text-ink-soft hover:text-ink">
            <ArrowLeft className="size-4" aria-hidden /> எல்லா வீடியோக்களும்
          </Link>
          {category && (
            <Link href={`/category/${category.slug}`} className="font-semibold text-tea hover:underline">
              {category.name}
            </Link>
          )}
        </nav>

        <div {...anim("wipe", 150, 1200)} className="mt-6 max-w-5xl">
          <YouTubePlayer videoId={video.youtubeVideoId} title={video.title} thumbnail={video.thumbnail} />
          <PhotoCredit credit={video.thumbnailCredit} className="mt-2" />
        </div>

        <div {...anim("fadeUp", 400)} className="mt-8 max-w-3xl">
          <h1 className="headline text-[1.9rem] sm:text-[2.5rem]">{video.title}</h1>
          <p className="mt-3 flex flex-wrap gap-x-4 text-sm text-ink-soft">
            <span className="font-semibold text-ink">{video.channelName}</span>
            <time dateTime={video.publishedAt}>{formatDate(video.publishedAt)}</time>
            {video.durationLabel && <span>{video.durationLabel}</span>}
          </p>
          <p className="mt-5 font-serif text-lg leading-relaxed">{video.description}</p>
          <div className="mt-6 space-y-5">
            <SampleNotice kind="video" />
            {watchUrl && (
              <a
                href={watchUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block font-semibold text-tea underline underline-offset-4"
              >
                யூடியூபில் பாருங்கள்<span className="sr-only"> (புதிய தாவலில் திறக்கும்)</span>
              </a>
            )}
            <ShareLinks url={absoluteUrl(`/videos/${video.slug}`)} title={video.title} />
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section aria-labelledby="more-videos" className="container-page mt-20">
          <SectionHeader id="more-videos" title="மேலும் வீடியோக்கள்" href="/videos" linkLabel="எல்லா வீடியோக்களும்" />
          <ul className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((v, i) => (
              <li key={v.id} {...anim("fadeUp", stagger(i, 120))}>
                <VideoCard video={v} />
              </li>
            ))}
          </ul>
        </section>
      )}
    </>
  );
}
