import { EmptyState } from "@/components/common/EmptyState";
import { PageIntro } from "@/components/common/PageIntro";
import { SocialLinks } from "@/components/common/SocialLinks";
import { VideoCard } from "@/components/video/VideoCard";
import { anim, stagger } from "@/lib/anim";
import { repository } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "வீடியோ",
  description: "Teakadai Politics யூடியூப் சேனலின் அரசியல் விவாதங்கள், விளக்கங்கள், உரையாடல்கள்.",
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
        title="வீடியோ"
        description="எங்கள் யூடியூப் சேனலின் உரையாடல்கள், விளக்கங்கள், நேரடி அலசல்கள்."
      >
        <div className="mt-5">
          <SocialLinks />
        </div>
      </PageIntro>

      <div className="container-page">
        {featured ? (
          <>
            <section {...anim("fadeUp")} aria-label="சிறப்பு வீடியோ" className="mb-14 border-b border-rule pb-14">
              <VideoCard video={featured} size="large" categoryName={names.get(featured.category)} headingLevel="h2" />
            </section>
            {rest.length > 0 && (
              <ul className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
                {rest.map((v, i) => (
                  <li key={v.id} {...anim("fadeUp", stagger(i, 120))}>
                    <VideoCard video={v} categoryName={names.get(v.category)} headingLevel="h2" />
                  </li>
                ))}
              </ul>
            )}
          </>
        ) : (
          <EmptyState title="இன்னும் வீடியோக்கள் இல்லை" message="புதிய வீடியோக்கள் வெளியானதும் இங்கே தோன்றும்." />
        )}
      </div>
    </>
  );
}
