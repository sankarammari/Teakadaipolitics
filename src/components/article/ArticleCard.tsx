import Link from "next/link";
import { ContentTypeBadge } from "@/components/common/ContentTypeBadge";
import { CoverImage } from "@/components/common/CoverImage";
import { anim } from "@/lib/anim";
import { formatDate, readingTimeLabel } from "@/lib/format";
import type { Article } from "@/types";

type Variant = "hero" | "lead" | "standard" | "row" | "text";

interface ArticleCardProps {
  article: Article;
  categoryName?: string;
  variant?: Variant;
  headingLevel?: "h2" | "h3";
  priority?: boolean;
}

export function ArticleMetaLine({ article }: { article: Article }) {
  return (
    <p className="flex flex-wrap gap-x-3 gap-y-0.5 text-sm text-ink-soft">
      <time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time>
      <span>{readingTimeLabel(article.readingTime)}</span>
    </p>
  );
}

function Kicker({ article, categoryName }: { article: Article; categoryName?: string }) {
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
      <ContentTypeBadge type={article.contentType} />
      {categoryName && <span className="text-sm text-ink-soft">{categoryName}</span>}
      {article.featured && (
        <span className="rounded-full bg-tea-light px-2 py-0.5 text-xs font-bold text-tea">சிறப்பு</span>
      )}
    </div>
  );
}

/** One article teaser. The whole card is one link via the title's stretched ::after. */
export function ArticleCard({
  article,
  categoryName,
  variant = "standard",
  headingLevel: Heading = "h3",
  priority,
}: ArticleCardProps) {
  const href = `/articles/${article.slug}`;
  const titleLink = (
    <Link href={href} className="after:absolute after:inset-0 group-hover:underline group-hover:decoration-tea group-hover:decoration-2 group-hover:underline-offset-4">
      {article.title}
    </Link>
  );

  // Homepage top story: headline builds word by word, photo wipes in beside it
  if (variant === "hero") {
    const words = article.title.split(" ");
    return (
      <article className="group relative grid items-center gap-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-10">
        <div className="order-2 lg:order-1">
          <div {...anim("fade", 100)}>
            <Kicker article={article} categoryName={categoryName} />
          </div>
          <Heading className="headline mt-3 text-[1.9rem] sm:text-[2.4rem] xl:text-[2.75rem]">
            <Link href={href} className="after:absolute after:inset-0">
              {words.map((word, i) => (
                <span key={i}>
                  <span {...anim("fadeUp", 200 + i * 80, 700)} className="inline-block">
                    {word}
                  </span>{" "}
                </span>
              ))}
            </Link>
          </Heading>
          <p {...anim("fadeUp", 300 + words.length * 80)} className="mt-4 font-serif text-[1.15rem] leading-relaxed text-ink-soft">
            {article.excerpt}
          </p>
          <div {...anim("fade", 450 + words.length * 80)} className="mt-5">
            <ArticleMetaLine article={article} />
          </div>
        </div>
        <CoverImage
          src={article.coverImage}
          alt={article.coverAlt}
          aspect="aspect-[3/2]"
          sizes="(min-width: 1024px) 58vw, 100vw"
          priority={priority}
          className="order-1 lg:order-2"
          hoverZoom={false}
          frameProps={anim("wipe", 150)}
        />
      </article>
    );
  }

  if (variant === "lead") {
    return (
      <article className="group relative grid gap-5">
        <CoverImage
          src={article.coverImage}
          alt={article.coverAlt}
          aspect="aspect-[16/9]"
          sizes="(min-width: 1024px) 60vw, 100vw"
          priority={priority}
          frameProps={anim("wipe")}
        />
        <div>
          <div {...anim("fade", 200)}>
            <Kicker article={article} categoryName={categoryName} />
          </div>
          <Heading {...anim("fadeUp", 300)} className="headline mt-2 text-[1.9rem] sm:text-[2.5rem] lg:text-[2.9rem]">
            {titleLink}
          </Heading>
          <p {...anim("fadeUp", 420)} className="mt-3 max-w-2xl font-serif text-[1.15rem] leading-relaxed text-ink-soft">
            {article.excerpt}
          </p>
          <div {...anim("fade", 550)} className="mt-4">
            <ArticleMetaLine article={article} />
          </div>
        </div>
      </article>
    );
  }

  if (variant === "row") {
    return (
      <article className="card-lift group relative grid grid-cols-[7.5rem_1fr] gap-4 sm:grid-cols-[11rem_1fr]">
        <CoverImage src={article.coverImage} alt={article.coverAlt} aspect="aspect-[4/3]" sizes="11rem" />
        <div>
          <Kicker article={article} />
          <Heading className="headline mt-1 text-[1.2rem] sm:text-[1.4rem]">{titleLink}</Heading>
          <div className="mt-1.5">
            <ArticleMetaLine article={article} />
          </div>
        </div>
      </article>
    );
  }

  if (variant === "text") {
    return (
      <article className="group relative">
        <Kicker article={article} />
        <Heading className="headline mt-1 text-[1.2rem]">{titleLink}</Heading>
        <div className="mt-1">
          <ArticleMetaLine article={article} />
        </div>
      </article>
    );
  }

  return (
    <article className="card-lift group relative flex flex-col gap-3">
      <CoverImage src={article.coverImage} alt={article.coverAlt} />
      <Kicker article={article} categoryName={categoryName} />
      <Heading className="headline text-[1.35rem]">{titleLink}</Heading>
      <p className="line-clamp-3 text-ink-soft">{article.excerpt}</p>
      <ArticleMetaLine article={article} />
    </article>
  );
}
