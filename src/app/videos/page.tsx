import { EmptyState } from "@/components/common/EmptyState";
import { PageIntro } from "@/components/common/PageIntro";
import { SocialLinks } from "@/components/common/SocialLinks";
import { VideoCard } from "@/components/video/VideoCard";
import { repository } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Videos",
  description: "Video commentary, explainers and conversations from the Teakadai Politics YouTube channel.",
  path: "/videos",
});

export default async function VideosPage() {
  const [videos, categories] = await Promise.all([repository.getVideos(), repository.getCategories()]);
  const names = new Map(categories.map((c) => [c.id, c.name]));
  const featured = videos.find((v) => v.featured) ?? videos[0];
  const rest = videos.filter((v) => v.id !== featured?.id);

  return (
    <>
      <PageIntro
        title="Videos"
        description="Conversations, explainers and walk-throughs from our YouTube channel."
      >
        <div className="mt-5">
          <SocialLinks />
        </div>
      </PageIntro>

      <div className="container-page">
        {featured ? (
          <>
            <section aria-label="Featured video" className="mb-14 border-b border-rule pb-14">
              <VideoCard video={featured} size="large" categoryName={names.get(featured.category)} headingLevel="h2" />
            </section>
            {rest.length > 0 && (
              <ul className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
                {rest.map((v) => (
                  <li key={v.id}>
                    <VideoCard video={v} categoryName={names.get(v.category)} headingLevel="h2" />
                  </li>
                ))}
              </ul>
            )}
          </>
        ) : (
          <EmptyState title="No videos yet" message="New videos will appear here once they are published." />
        )}
      </div>
    </>
  );
}
