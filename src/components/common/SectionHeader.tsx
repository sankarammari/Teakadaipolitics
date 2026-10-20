import Link from "next/link";

interface SectionHeaderProps {
  title: string;
  href?: string;
  linkLabel?: string;
  id?: string;
  description?: string;
}

export function SectionHeader({ title, href, linkLabel = "See all", id, description }: SectionHeaderProps) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-x-6 gap-y-1 border-b-2 border-ink pb-2">
      <div>
        <h2 id={id} className="headline text-[1.9rem] md:text-[2.2rem]">
          {title}
        </h2>
        {description && <p className="mt-1 text-ink-soft">{description}</p>}
      </div>
      {href && (
        <Link href={href} className="pb-1 text-[0.95rem] font-semibold text-tea underline-offset-4 hover:underline">
          {linkLabel}
        </Link>
      )}
    </div>
  );
}
