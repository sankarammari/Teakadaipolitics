import Link from "next/link";
import { ArticleCard } from "@/components/article/ArticleCard";
import { ArticleGrid } from "@/components/article/ArticleGrid";
import { EmptyState } from "@/components/common/EmptyState";
import { SectionHeader } from "@/components/common/SectionHeader";
import { SocialLinks } from "@/components/common/SocialLinks";
import { VideoCard } from "@/components/video/VideoCard";
import { getArticlesByCategory, getArticlesByType, getTrendingArticles, repository } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({ path: "/" });

export default async function HomePage() {
  const [articles, categories, videos, trending, analysis, currentAffairs] = await Promise.all([
    repository.getArticles(),
    repository.getCategories(),
    repository.getVideos(),
    getTrendingArticles(5),
    getArticlesByType("analysis", "opinion"),
    getArticlesByCategory("current-affairs"),
  ]);

  const names = new Map(categories.map((c) => [c.id, c.name]));
  // Each article appears in only one homepage section
  const shown = new Set<string>();
  const take = <T extends { id: string }>(list: T[], count: number) => {
    const picked = list.filter((a) => !shown.has(a.id)).slice(0, count);
    picked.forEach((a) => shown.add(a.id));
    return picked;
  };

  const [lead] = take([...articles.filter((a) => a.featured), ...articles], 1);
  const currentAffairsTop = take(currentAffairs, 4);
  const [leadAnalysis] = take([...analysis.filter((a) => a.featured), ...analysis], 1);
  const moreAnalysis = take(analysis, 4);
  const latest = take(articles, 3);
  const featuredVideo = videos.find((v) => v.featured) ?? videos[0];
  const moreVideos = videos.filter((v) => v.id !== featuredVideo?.id).slice(0, 3);

  return (
    <>
      <h1 className="sr-only">Teakadai Politics: latest political news and analysis</h1>

      {/* Top story */}
      <section aria-labelledby="lead-heading" className="container-page pt-8 md:pt-10">
        <h2 id="lead-heading" className="sr-only">Top story</h2>
        {lead ? (
          <ArticleCard article={lead} variant="hero" categoryName={names.get(lead.category)} headingLevel="h2" priority />
        ) : (
          <EmptyState title="No stories yet" message="Published articles will appear here." />
        )}
      </section>

      {/* Bench talk: most-read strip */}
      {trending.length > 0 && (
        <section aria-labelledby="bench-talk" className="container-page mt-12">
          <div className="rounded-xl bg-tea-light px-5 py-6 md:px-8">
            <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
              <h2 id="bench-talk" className="headline text-[1.9rem]">
                Bench talk
              </h2>
              <p className="text-sm text-ink-soft">What readers are discussing this week</p>
            </div>
            <ol className="mt-5 grid gap-x-8 gap-y-5 sm:grid-cols-2 lg:grid-cols-5">
              {trending.map((a, i) => (
                <li key={a.id} className="group relative grid grid-cols-[2rem_1fr] gap-2 lg:border-l lg:border-tea/25 lg:pl-4 lg:first:border-l-0 lg:first:pl-0">
                  <span aria-hidden className="headline text-[2.2rem] leading-none text-tea">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="headline text-[1.2rem]">
                      <Link
                        href={`/articles/${a.slug}`}
                        className="after:absolute after:inset-0 group-hover:underline group-hover:decoration-tea group-hover:decoration-2 group-hover:underline-offset-4"
                      >
                        {a.title}
                      </Link>
                    </h3>
                    <p className="mt-1 text-sm text-ink-soft">{a.readingTime} min read</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>
      )}

      {/* Latest */}
      <section aria-labelledby="latest-heading" className="container-page mt-16">
        <SectionHeader id="latest-heading" title="More stories" href="/articles" linkLabel="All articles" />
        {latest.length ? (
          <ArticleGrid articles={latest} categories={categories} />
        ) : (
          <EmptyState title="No more stories" message="New articles will appear here once published." />
        )}
      </section>

      {/* Current affairs */}
      <section aria-labelledby="ca-heading" className="container-page mt-16">
        <SectionHeader
          id="ca-heading"
          title="Current affairs"
          href="/category/current-affairs"
          linkLabel="More current affairs"
        />
        {currentAffairsTop.length ? (
          <ul className="grid gap-8 md:grid-cols-2">
            {currentAffairsTop.map((a) => (
              <li key={a.id}>
                <ArticleCard article={a} variant="row" />
              </li>
            ))}
          </ul>
        ) : (
          <EmptyState title="No current affairs stories yet" message="Check back soon, or browse all articles." action={{ label: "All articles", href: "/articles" }} />
        )}
      </section>

      {/* Analysis */}
      <section aria-labelledby="analysis-heading" className="mt-16 bg-paper-deep py-14">
        <div className="container-page">
          <SectionHeader
            id="analysis-heading"
            title="Analysis and opinion"
            href="/analysis"
            linkLabel="All analysis"
            description="Arguments, explainers and the numbers behind the noise."
          />
          {leadAnalysis ? (
            <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
              <ArticleCard article={leadAnalysis} categoryName={names.get(leadAnalysis.category)} />
              <ul className="divide-y divide-rule border-t border-rule lg:border-t-0">
                {moreAnalysis.map((a) => (
                  <li key={a.id} className="py-5 lg:first:pt-0">
                    <ArticleCard article={a} variant="text" />
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <EmptyState title="No analysis yet" message="Analysis and opinion pieces will appear here." />
          )}
        </div>
      </section>

      {/* Videos */}
      <section aria-labelledby="videos-heading" className="container-page mt-16">
        <SectionHeader id="videos-heading" title="Watch" href="/videos" linkLabel="All videos" />
        {featuredVideo ? (
          <div className="grid gap-10 lg:grid-cols-[1.6fr_1fr]">
            <VideoCard video={featuredVideo} size="large" categoryName={names.get(featuredVideo.category)} />
            <ul className="grid gap-8">
              {moreVideos.map((v) => (
                <li key={v.id}>
                  <VideoCard video={v} />
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <EmptyState title="No videos yet" message="Video commentary will appear here." />
        )}
      </section>

      {/* Follow */}
      <section aria-labelledby="follow-heading" className="container-page mt-16">
        <div className="rounded-xl bg-ink px-6 py-10 text-paper md:px-10">
          <h2 id="follow-heading" className="headline text-[2rem] md:text-[2.4rem]">
            Pull up a bench
          </h2>
          <p className="mt-2 max-w-xl text-paper/80">
            Follow Teakadai Politics for new videos, short takes and links to every new article.
          </p>
          <div className="mt-6">
            <SocialLinks variant="panel" />
          </div>
        </div>
      </section>
    </>
  );
}
