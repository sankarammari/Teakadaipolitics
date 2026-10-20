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
import { getRelatedArticles, repository } from "@/lib/content";
import { formatDate } from "@/lib/format";
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
    authors: [article.author.name],
    tags: article.tags,
  });
}

const typeNotes = {
  news: null,
  analysis: "Analysis interprets reported facts. Conclusions are the writer’s reading of the evidence.",
  opinion: "Opinion. The views here are the writer’s own, not a statement of fact or of the publication’s position.",
} as const;

export default async function ArticlePage({ params }: Props) {
  const article = await repository.getArticleBySlug((await params).slug);
  if (!article) notFound();

  const [related, categories] = await Promise.all([getRelatedArticles(article), repository.getCategories()]);
  const category = categories.find((c) => c.id === article.category);
  const jsonLd = articleJsonLd(article);
  const url = absoluteUrl(`/articles/${article.slug}`);
  const note = typeNotes[article.contentType];

  return (
    <article>
      {jsonLd && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      )}

      <header className="container-page pt-8 md:pt-12">
        <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
          <Link href="/articles" className="inline-flex items-center gap-1 font-semibold text-ink-soft hover:text-ink">
            <ArrowLeft className="size-4" aria-hidden /> All articles
          </Link>
          {category && (
            <Link href={`/category/${category.slug}`} className="font-semibold text-tea hover:underline">
              {category.name}
            </Link>
          )}
        </nav>

        <div className="mt-6 max-w-4xl">
          <ContentTypeBadge type={article.contentType} />
          <h1 className="headline mt-2 text-[2.5rem] sm:text-[3.4rem] lg:text-[4.2rem]">{article.title}</h1>
          <p className="mt-4 max-w-3xl font-serif text-xl leading-relaxed text-ink-soft">{article.excerpt}</p>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 border-y border-rule py-3 text-sm">
          <p>
            By <span className="font-semibold">{article.author.name}</span>
          </p>
          <p className="text-ink-soft">
            Published <time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time>
          </p>
          {article.updatedAt && (
            <p className="text-ink-soft">
              Updated <time dateTime={article.updatedAt}>{formatDate(article.updatedAt)}</time>
            </p>
          )}
          <p className="text-ink-soft">{article.readingTime} min read</p>
        </div>
      </header>

      <figure className="container-page mt-8">
        <CoverImage
          src={article.coverImage}
          alt={article.coverAlt}
          aspect="aspect-[16/9]"
          sizes="(min-width: 1216px) 1168px, 100vw"
          priority
        />
        <figcaption className="mt-2 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
          <span className="text-sm text-ink-soft">{article.coverAlt}</span>
          <PhotoCredit credit={article.coverCredit} />
        </figcaption>
      </figure>

      <div className="container-page mt-10 grid gap-10 lg:grid-cols-[minmax(0,40rem)_1fr] lg:gap-16">
        <div className="min-w-0">
          <div className="mb-8 space-y-3">
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
                Sources
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
                      <span className="sr-only">(opens in a new tab)</span>
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <div className="mt-10 border-t border-rule pt-6">
            <ul className="flex flex-wrap gap-2" aria-label="Tags">
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

        <aside aria-label="About the author" className="lg:pt-1">
          <div className="rounded-lg border border-rule bg-white p-5 lg:sticky lg:top-6">
            <p className="text-sm font-semibold text-ink-soft">Written by</p>
            <p className="headline mt-1 text-2xl">{article.author.name}</p>
            <p className="mt-2 text-sm text-ink-soft">{article.author.bio}</p>
          </div>
        </aside>
      </div>

      {related.length > 0 && (
        <section aria-labelledby="related-heading" className="container-page mt-20">
          <SectionHeader id="related-heading" title="Read next" />
          <ArticleGrid articles={related} categories={categories} />
        </section>
      )}
    </article>
  );
}
