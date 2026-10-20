import Link from "next/link";
import { HeaderSearch } from "@/components/layout/HeaderSearch";

export const metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <div className="container-page py-20 md:py-28">
      <p lang="ta" className="font-tamil text-2xl font-bold text-tea">
        இந்த பக்கம் இல்லை
      </p>
      <h1 className="headline mt-2 text-[2.8rem] md:text-[4rem]">This page isn’t here</h1>
      <p className="mt-3 max-w-xl text-lg text-ink-soft">
        The link may be old, or the article may have moved. Search for it, or start from the latest stories.
      </p>
      <div className="mt-8 max-w-sm">
        <HeaderSearch id="notfound-search" />
      </div>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/" className="rounded-full bg-ink px-5 py-2.5 font-semibold text-paper hover:bg-ink/85">
          Go to the homepage
        </Link>
        <Link href="/articles" className="rounded-full border-2 border-ink px-5 py-2 font-semibold hover:bg-ink hover:text-paper">
          Browse all articles
        </Link>
      </div>
    </div>
  );
}
