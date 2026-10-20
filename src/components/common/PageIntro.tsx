interface PageIntroProps {
  title: string;
  description?: string;
  children?: React.ReactNode;
}

/** Title block at the top of listing and info pages. */
export function PageIntro({ title, description, children }: PageIntroProps) {
  return (
    <div className="container-page pb-8 pt-10 md:pt-14">
      <h1 className="headline text-[2.6rem] md:text-[3.6rem]">{title}</h1>
      {description && <p className="mt-3 max-w-2xl text-lg text-ink-soft">{description}</p>}
      {children}
    </div>
  );
}
