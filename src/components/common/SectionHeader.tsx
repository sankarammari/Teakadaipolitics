import Link from "next/link";
import { anim } from "@/lib/anim";

interface SectionHeaderProps {
  title: string;
  href?: string;
  linkLabel?: string;
  id?: string;
  description?: string;
}

/** Section title whose rule draws itself in as the section scrolls into view. */
export function SectionHeader({ title, href, linkLabel = "அனைத்தும்", id, description }: SectionHeaderProps) {
  return (
    <div
      {...anim("line")}
      className="draw-rule mb-6 flex flex-wrap items-end justify-between gap-x-6 gap-y-1 pb-2"
    >
      <div>
        <h2 {...anim("fadeUp", 100)} id={id} className="headline text-[1.9rem] md:text-[2.2rem]">
          {title}
        </h2>
        {description && (
          <p {...anim("fade", 250)} className="mt-1 text-ink-soft">
            {description}
          </p>
        )}
      </div>
      {href && (
        <Link
          {...anim("fade", 350)}
          href={href}
          className="group/link inline-flex items-center gap-1 pb-1 text-[0.95rem] font-semibold text-tea underline-offset-4 hover:underline"
        >
          {linkLabel}
          <span aria-hidden className="inline-block transition-transform group-hover/link:translate-x-1">
            ›
          </span>
        </Link>
      )}
    </div>
  );
}
