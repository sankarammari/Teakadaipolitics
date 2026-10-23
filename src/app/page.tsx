import Link from "next/link";
import { ArticleCard } from "@/components/article/ArticleCard";
import { ArticleGrid } from "@/components/article/ArticleGrid";
import { EmptyState } from "@/components/common/EmptyState";
import { SectionHeader } from "@/components/common/SectionHeader";
import { SocialLinks } from "@/components/common/SocialLinks";
import { VideoCard } from "@/components/video/VideoCard";
import { getArticlesByCategory, getArticlesByType, getTrendingArticles, repository } from "@/lib/content";
import { anim, stagger } from "@/lib/anim";
import { readingTimeLabel } from "@/lib/format";
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
      <h1 className="sr-only">Teakadai Politics: தமிழ்நாட்டு அரசியல் செய்திகளும் பகுப்பாய்வும்</h1>

      {/* Top story */}
      <section aria-labelledby="lead-heading" className="container-page pt-8 md:pt-10">
        <h2 id="lead-heading" className="sr-only">முதன்மைச் செய்தி</h2>
        {lead ? (
          <ArticleCard article={lead} variant="hero" categoryName={names.get(lead.category)} headingLevel="h2" priority />
        ) : (
          <EmptyState title="இன்னும் செய்திகள் இல்லை" message="வெளியிடப்படும் கட்டுரைகள் இங்கே தோன்றும்." />
        )}
      </section>

      {/* Bench talk: most-read strip */}
      {trending.length > 0 && (
        <section aria-labelledby="bench-talk" className="container-page mt-12">
          <div {...anim("foldLeft", 0, 1200)} className="rounded-xl bg-tea-light px-5 py-6 md:px-8">
            <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
              <h2 id="bench-talk" className="headline text-[1.9rem]">
                பெஞ்சு பேச்சு
              </h2>
              <p className="text-sm text-ink-soft">இந்த வாரம் வாசகர்கள் அதிகம் பேசுபவை</p>
            </div>
            <ol className="mt-5 grid gap-x-10 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">
              {trending.map((a, i) => (
                <li key={a.id} {...anim("fadeUp", 300 + i * 110)} className="group relative grid grid-cols-[2rem_1fr] gap-2">
                  <span
                    aria-hidden
                    {...anim("drop", 450 + i * 110, 700)}
                    className="headline inline-block text-[2.2rem] leading-none text-tea transition-transform duration-300 group-hover:-translate-y-1 group-hover:scale-110"
                  >
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="headline text-[1.15rem]">
                      <Link
                        href={`/articles/${a.slug}`}
                        className="after:absolute after:inset-0 group-hover:underline group-hover:decoration-tea group-hover:decoration-2 group-hover:underline-offset-4"
                      >
                        {a.title}
                      </Link>
                    </h3>
                    <p className="mt-1 text-sm text-ink-soft">{readingTimeLabel(a.readingTime)}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>
      )}

      {/* Latest */}
      <section aria-labelledby="latest-heading" className="container-page mt-16">
        <SectionHeader id="latest-heading" title="மேலும் செய்திகள்" href="/articles" linkLabel="எல்லாக் கட்டுரைகளும்" />
        {latest.length ? (
          <ArticleGrid articles={latest} categories={categories} />
        ) : (
          <EmptyState title="வேறு செய்திகள் இல்லை" message="புதிய கட்டுரைகள் வெளியானதும் இங்கே தோன்றும்." />
        )}
      </section>

      {/* Current affairs */}
      <section aria-labelledby="ca-heading" className="container-page mt-16">
        <SectionHeader
          id="ca-heading"
          title="நடப்பு நிகழ்வுகள்"
          href="/category/current-affairs"
          linkLabel="மேலும் நடப்பு நிகழ்வுகள்"
        />
        {currentAffairsTop.length ? (
          <ul className="grid gap-8 md:grid-cols-2">
            {currentAffairsTop.map((a, i) => (
              <li key={a.id} {...anim("fadeUp", stagger(i, 120, 2))}>
                <ArticleCard article={a} variant="row" />
              </li>
            ))}
          </ul>
        ) : (
          <EmptyState title="நடப்பு நிகழ்வுச் செய்திகள் இன்னும் இல்லை" message="சிறிது நேரம் கழித்துப் பாருங்கள், அல்லது எல்லாக் கட்டுரைகளையும் படியுங்கள்." action={{ label: "எல்லாக் கட்டுரைகளும்", href: "/articles" }} />
        )}
      </section>

      {/* Analysis */}
      <section aria-labelledby="analysis-heading" className="mt-16 bg-paper-deep py-14">
        <div className="container-page">
          <SectionHeader
            id="analysis-heading"
            title="பகுப்பாய்வும் கருத்தும்"
            href="/analysis"
            linkLabel="எல்லாப் பகுப்பாய்வுகளும்"
            description="சத்தத்துக்குப் பின்னால் உள்ள வாதங்கள், விளக்கங்கள், எண்கள்."
          />
          {leadAnalysis ? (
            <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
              <div {...anim("fadeUp")}>
                <ArticleCard article={leadAnalysis} categoryName={names.get(leadAnalysis.category)} />
              </div>
              <ul className="divide-y divide-rule border-t border-rule lg:border-t-0">
                {moreAnalysis.map((a, i) => (
                  <li key={a.id} {...anim("fadeUp", 150 + i * 110)} className="py-5 lg:first:pt-0">
                    <ArticleCard article={a} variant="text" />
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <EmptyState title="இன்னும் பகுப்பாய்வுகள் இல்லை" message="பகுப்பாய்வு, கருத்துக் கட்டுரைகள் இங்கே தோன்றும்." />
          )}
        </div>
      </section>

      {/* Videos */}
      <section aria-labelledby="videos-heading" className="container-page mt-16">
        <SectionHeader id="videos-heading" title="பாருங்கள்" href="/videos" linkLabel="எல்லா வீடியோக்களும்" />
        {featuredVideo ? (
          <div className="grid gap-10 lg:grid-cols-[1.6fr_1fr]">
            <div {...anim("fadeUp")}>
              <VideoCard video={featuredVideo} size="large" categoryName={names.get(featuredVideo.category)} />
            </div>
            <ul className="grid gap-8">
              {moreVideos.map((v, i) => (
                <li key={v.id} {...anim("fadeUp", 150 + i * 120)}>
                  <VideoCard video={v} />
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <EmptyState title="இன்னும் வீடியோக்கள் இல்லை" message="வீடியோ விவாதங்கள் இங்கே தோன்றும்." />
        )}
      </section>

      {/* Follow */}
      <section aria-labelledby="follow-heading" className="container-page mt-16">
        <div {...anim("fadeUp")} className="relative overflow-hidden rounded-xl bg-ink px-6 py-10 text-paper md:px-10">
          {/* Oversized wordmark drifting behind the panel */}
          <div aria-hidden className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 select-none opacity-[0.06]">
            <div className="ticker-track [--ticker-duration:60s]">
              {[0, 1].map((k) => (
                <span key={k} className="whitespace-nowrap pr-16 font-brand text-[9rem] font-black uppercase leading-none [font-stretch:72%]">
                  Teakadai Politics · Teakadai Politics ·
                </span>
              ))}
            </div>
          </div>
          <h2 {...anim("fadeUp", 150)} id="follow-heading" className="headline relative text-[2rem] md:text-[2.4rem]">
            பெஞ்சில் வந்து உட்காருங்கள்
          </h2>
          <p {...anim("fadeUp", 250)} className="relative mt-2 max-w-xl text-paper/80">
            புதிய வீடியோக்கள், சுருக்கமான கருத்துகள், ஒவ்வொரு புதிய கட்டுரைக்குமான இணைப்புகள்: Teakadai Politics-ஐப் பின்தொடருங்கள்.
          </p>
          <div {...anim("fadeUp", 400)} className="relative mt-6">
            <SocialLinks variant="panel" />
          </div>
        </div>
      </section>
    </>
  );
}
