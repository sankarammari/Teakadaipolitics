"use client";

import { Bookmark } from "lucide-react";
import Link from "next/link";
import { useSavedSlugs } from "@/lib/bookmarks";

/** Header shortcut to the reader's saved articles, with a count badge. */
export function SavedLink() {
  const count = useSavedSlugs().length;
  return (
    <Link
      href="/saved"
      className="relative grid size-10 place-items-center rounded-full border border-rule bg-card text-ink transition-transform hover:-translate-y-0.5 hover:border-ink"
    >
      <Bookmark className="size-[1.1rem]" aria-hidden />
      <span className="sr-only">சேமித்த கட்டுரைகள்{count ? ` (${count})` : ""}</span>
      {count > 0 && (
        <span
          aria-hidden
          className="absolute -right-1 -top-1 grid min-w-5 place-items-center rounded-full bg-tea px-1 text-[0.7rem] font-bold leading-5 text-on-night"
        >
          {count}
        </span>
      )}
    </Link>
  );
}
