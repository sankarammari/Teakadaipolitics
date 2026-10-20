import { anim } from "@/lib/anim";

interface PageIntroProps {
  title: string;
  description?: string;
  children?: React.ReactNode;
}

/** Title block at the top of listing and info pages. */
export function PageIntro({ title, description, children }: PageIntroProps) {
  return (
    <div className="container-page pb-8 pt-10 md:pt-14">
      <h1 {...anim("fadeUp")} className="headline text-[2.1rem] md:text-[2.9rem]">
        {title}
      </h1>
      {description && (
        <p {...anim("fadeUp", 150)} className="mt-3 max-w-2xl text-lg text-ink-soft">
          {description}
        </p>
      )}
      {children && <div {...anim("fade", 300)}>{children}</div>}
    </div>
  );
}
