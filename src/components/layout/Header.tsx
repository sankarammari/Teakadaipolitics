import Link from "next/link";
import { primaryNav, siteConfig } from "@/config/site";
import { repository } from "@/lib/content";
import { HeaderSearch } from "./HeaderSearch";
import { MobileNav } from "./MobileNav";
import { NavLinks } from "./NavLinks";
import { TodayDate } from "./TodayDate";

export async function Header() {
  const latest = (await repository.getArticles()).slice(0, 3);

  return (
    <header className="bg-paper">
      {/* Date + latest headlines strip */}
      <div className="bg-ink text-paper">
        <div className="container-page flex items-center gap-4 py-2 text-[0.85rem]">
          <span className="hidden text-paper/70 sm:block">
            <TodayDate />
          </span>
          {latest.length > 0 && (
            <div className="flex min-w-0 flex-1 items-center gap-3 sm:border-l sm:border-white/20 sm:pl-4">
              <span className="shrink-0 rounded-sm bg-tea px-1.5 py-px text-xs font-bold">Latest</span>
              <ul className="flex min-w-0 flex-1 gap-6 overflow-hidden">
                {latest.map((a, i) => (
                  <li key={a.id} className={`min-w-0 truncate ${i > 0 ? "hidden lg:block" : ""}`}>
                    <Link href={`/articles/${a.slug}`} className="hover:underline">
                      {a.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      <div className="container-page flex items-end justify-between gap-4 pb-3 pt-4 md:pt-5">
        <Link href="/" className="group block" aria-label={`${siteConfig.name}, home`}>
          <span
            lang="ta"
            className="block whitespace-nowrap font-tamil text-[1.3rem] font-bold leading-none text-tea min-[360px]:text-[1.6rem] sm:text-[2rem] md:text-[2.25rem]"
          >
            {siteConfig.nameTamil}
          </span>
          <span className="headline mt-1 block text-lg text-ink sm:text-xl">{siteConfig.name}</span>
        </Link>

        <div className="flex items-center gap-2">
          <p className="hidden max-w-[16rem] text-right text-sm leading-snug text-ink-soft lg:block">
            {siteConfig.tagline}
          </p>
          <MobileNav items={primaryNav} />
        </div>
      </div>

      <nav aria-label="Primary" className="hidden border-y border-rule md:block">
        <div className="container-page flex items-center justify-between gap-6">
          <NavLinks items={primaryNav} />
          <HeaderSearch />
        </div>
      </nav>
      <div className="border-b border-rule md:hidden" />
    </header>
  );
}
