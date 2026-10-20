import Link from "next/link";
import { primaryNav, siteConfig } from "@/config/site";
import { anim } from "@/lib/anim";
import { repository } from "@/lib/content";
import type { Article } from "@/types";
import { HeaderSearch } from "./HeaderSearch";
import { MobileNav } from "./MobileNav";
import { NavLinks } from "./NavLinks";
import { TodayDate } from "./TodayDate";

function TickerItems({ items, copy }: { items: Article[]; copy?: boolean }) {
  return (
    <ul className="flex shrink-0 items-center" aria-hidden={copy || undefined}>
      {items.map((a) => (
        <li key={a.id} className="flex items-center whitespace-nowrap">
          <Link href={`/articles/${a.slug}`} tabIndex={copy ? -1 : undefined} className="hover:text-tea-light hover:underline">
            {a.title}
          </Link>
          <span aria-hidden className="mx-5 inline-block size-1.5 rotate-45 bg-tea" />
        </li>
      ))}
    </ul>
  );
}

export async function Header() {
  const latest = (await repository.getArticles()).slice(0, 6);

  return (
    <header className="contents">
      {/* Date + scrolling latest headlines */}
      <div className="bg-ink text-paper">
        <div className="container-page flex items-center gap-4 py-2 text-[0.85rem]">
          <span className="hidden shrink-0 text-paper/70 sm:block">
            <TodayDate />
          </span>
          {latest.length > 0 && (
            <div className="flex min-w-0 flex-1 items-center gap-3 sm:border-l sm:border-white/20 sm:pl-4">
              <span className="flex shrink-0 items-center gap-1.5 rounded-sm bg-tea px-1.5 py-px text-xs font-bold">
                <span aria-hidden className="live-dot size-1.5 rounded-full bg-white" />
                சமீபத்திய
              </span>
              <div className="ticker min-w-0 flex-1 overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_4%,#000_96%,transparent)]">
                <div className="ticker-track">
                  <TickerItems items={latest} />
                  <TickerItems items={latest} copy />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Masthead (scrolls away on desktop; on smaller screens it stays pinned instead of the nav) */}
      <div className="site-nav sticky top-0 z-30 border-b border-rule bg-paper lg:static lg:border-b-0">
        <div className="container-page flex items-center justify-between gap-4 pb-3 pt-3 lg:pt-5">
          <Link href="/" className="group block" aria-label={`${siteConfig.name}, முகப்புப் பக்கம்`}>
            <span
              {...anim("fade")}
              className="block whitespace-nowrap font-tamil text-[1.5rem] font-bold leading-tight text-tea min-[360px]:text-[1.75rem] sm:text-[2.3rem] md:text-[2.6rem]"
            >
              {siteConfig.name}
            </span>
            <span className="mt-0.5 hidden text-sm text-ink-soft sm:block sm:text-[0.95rem]">{siteConfig.tagline}</span>
          </Link>
          <MobileNav items={primaryNav} />
        </div>
      </div>

      {/* Desktop nav: pinned, gains a compact wordmark and shadow on scroll */}
      <nav aria-label="முதன்மை வழிசெலுத்தல்" className="site-nav sticky top-0 z-30 hidden border-y border-rule bg-paper/95 backdrop-blur lg:block">
        <div className="container-page flex items-center justify-between gap-6">
          <div className="flex min-w-0 items-center">
            <Link href="/" tabIndex={-1} aria-hidden className="nav-mark font-tamil text-xl font-bold text-tea">
              {siteConfig.name}
            </Link>
            <NavLinks items={primaryNav} />
          </div>
          <div className="nav-search">
            <HeaderSearch />
          </div>
        </div>
      </nav>
    </header>
  );
}
