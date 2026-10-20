import { ArrowLeft, ExternalLink } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleBody } from "@/components/article/ArticleBody";
import { ArticleGrid } from "@/components/article/ArticleGrid";
import { ContentTypeBadge } from "@/components/common/ContentTypeBadge";
import { CoverImage } from "@/components/common/CoverImage";
import { PhotoCredit } from "@/components/common/PhotoCredit";
import { SampleNotice } from "@/components/common/SampleNotice";
import { SectionHeader } from "@/components/common/SectionHeader";
import { ShareLinks } from "@/components/common/ShareLinks";
import { siteConfig } from "@/config/site";
import { anim } from "@/lib/anim";
import { getRelatedArticles, getTrendingArticles, repository } from "@/lib/content";
import { formatDate, readingTimeLabel } from "@/lib/format";
import { absoluteUrl, articleJsonLd, buildMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export async function generateStaticParams() {
  return (await repository.getArticles()).map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = await repository.getArticleBySlug((await params).slug);
  if (!article) return {};
  return buildMetadata({
    title: article.title,
    description: article.excerpt,
    path: `/articles/${article.slug}`,
    image: article.coverImage,
    type: "article",
    publishedTime: article.publishedAt,
    modifiedTime: article.updatedAt,
    authors: [siteConfig.name],
    tags: article.tags,
  });
}

const typeNotes = {
  news: null,
  analysis: "பகுப்பாய்வு: வெளியான தகவல்களை விளக்குகிறது. முடிவுகள், சான்றுகளைக் கட்டுரையாளர் புரிந்துகொண்ட விதம்.",
  opinion: "கருத்து: இதில் உள்ளவை கட்டுரையாளரின் சொந்தக் கருத்துகள்; உண்மை அறிக்கையோ இதழின் நிலைப்பாடோ அல்ல.",
} as const;

export default async function ArticlePage({ params }: Props) {
  const article = await repository.getArticleBySlug((await params).slug);
  if (!article) notFound();

  const [related, categories, trendingAll] = await Promise.all([
    getRelatedArticles(article),
    repository.getCategories(),
    getTrendingArticles(6),
  ]);
  const trending = trendingAll.filter((a) => a.id !== article.id).slice(0, 5);
  const category = categories.find((c) => c.id === article.category);
  const jsonLd = articleJsonLd(article);
  const url = absoluteUrl(`/articles/${article.slug}`);
  const note = typeNotes[article.contentType];

  return (
    <article>
      <div aria-hidden className="reading-progress fixed inset-x-0 top-0 z-50 h-1 bg-tea" />
      {jsonLd && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      )}

      <header className="container-page pt-8 md:pt-12">
        <nav {...anim("fade")} aria-label="பக்க வழி" className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
          <Link href="/articles" className="inline-flex items-center gap-1 font-semibold text-ink-soft hover:text-ink">
            <ArrowLeft className="size-4" aria-hidden /> எல்லாக் கட்டுரைகளும்
          </Link>
          {category && (
            <Link href={`/category/${category.slug}`} className="font-semibold text-tea hover:underline">
              {category.name}
            </Link>
          )}
        </nav>

        <div className="mt-6 max-w-4xl">
          <div {...anim("fade", 100)}>
            <ContentTypeBadge type={article.contentType} />
          </div>
          <h1 {...anim("fadeUp", 200, 1000)} className="headline mt-2 text-[2.1rem] sm:text-[2.7rem] lg:text-[3.3rem]">
            {article.title}
          </h1>
          <p {...anim("fadeUp", 380)} className="mt-4 max-w-3xl font-serif text-xl leading-relaxed text-ink-soft">{article.excerpt}</p>
        </div>

        <div {...anim("fade", 520)} className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 border-y border-rule py-3 text-sm">
          <p className="text-ink-soft">
            வெளியீடு: <time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time>
          </p>
          {article.updatedAt && (
            <p className="text-ink-soft">
              புதுப்பிப்பு: <time dateTime={article.updatedAt}>{formatDate(article.updatedAt)}</time>
            </p>
          )}
          <p className="text-ink-soft">{readingTimeLabel(article.readingTime)}</p>
        </div>
      </header>

      <figure className="container-page mt-8">
        {/* Grows from 94% to full width as it reaches mid-screen */}
        <div data-motion-scale="94" suppressHydrationWarning className="origin-top">
          <CoverImage
            src={article.coverImage}
            alt={article.coverAlt}
            aspect="aspect-[16/9]"
            sizes="(min-width: 1216px) 1168px, 100vw"
            priority
            frameProps={anim("wipe", 300, 1300)}
          />
        </div>
        <figcaption {...anim("fade", 600)} className="mt-2 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
          <span className="text-sm text-ink-soft">{article.coverAlt}</span>
          <PhotoCredit credit={article.coverCredit} />
        </figcaption>
      </figure>

      <div className="container-page mt-10 grid gap-10 lg:grid-cols-[minmax(0,40rem)_1fr] lg:gap-16">
        <div data-reading className="min-w-0">
          <div {...anim("fadeUp")} className="mb-8 space-y-3">
            <SampleNotice />
            {note && (
              <p
                className={`border-l-4 pl-4 text-[0.95rem] ${
                  article.contentType === "opinion" ? "border-opinion" : "border-analysis"
                }`}
              >
                {note}
              </p>
            )}
          </div>

          <ArticleBody blocks={article.content} />

          {article.sources && article.sources.length > 0 && (
            <section aria-labelledby="sources-heading" className="mt-12 border-t border-rule pt-6">
              <h2 id="sources-heading" className="headline text-2xl">
                ஆதாரங்கள்
              </h2>
              <ul className="mt-3 space-y-2">
                {article.sources.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 underline underline-offset-2 hover:text-tea"
                    >
                      {s.label}
                      <ExternalLink className="size-3.5" aria-hidden />
                      <span className="sr-only">(புதிய தாவலில் திறக்கும்)</span>
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <div className="mt-10 border-t border-rule pt-6">
            <ul className="flex flex-wrap gap-2" aria-label="குறிச்சொற்கள்">
              {article.tags.map((tag) => (
                <li key={tag}>
                  <Link
                    href={`/search?q=${encodeURIComponent(tag)}`}
                    className="inline-block rounded-full bg-paper-deep px-3 py-1 text-sm hover:bg-rule"
                  >
                    {tag}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <ShareLinks url={url} title={article.title} />
            </div>
          </div>
        </div>

        {trending.length > 0 && (
          <aside {...anim("fadeUp", 200)} aria-labelledby="sidebar-trending" className="lg:pt-1">
            <div className="rounded-lg bg-tea-light p-5 lg:sticky lg:top-20">
              <h2 id="sidebar-trending" className="headline text-[1.4rem]">
                பெஞ்சு பேச்சு
              </h2>
              <ol className="mt-3 divide-y divide-tea/20">
                {trending.map((a, i) => (
                  <li key={a.id} className="group relative grid grid-cols-[1.5rem_1fr] gap-2 py-3">
                    <span aria-hidden className="headline text-xl leading-none text-tea">
                      {i + 1}
                    </span>
                    <Link
                      href={`/articles/${a.slug}`}
                      className="headline text-[1.02rem] after:absolute after:inset-0 group-hover:underline group-hover:decoration-tea group-hover:underline-offset-4"
                    >
                      {a.title}
                    </Link>
                  </li>
                ))}
              </ol>
            </div>
          </aside>
        )}
      </div>

      {related.length > 0 && (
        <section aria-labelledby="related-heading" className="container-page mt-20">
          <SectionHeader id="related-heading" title="அடுத்துப் படிக்க" />
          <ArticleGrid articles={related} categories={categories} />
        </section>
      )}
    </article>
  );
}
