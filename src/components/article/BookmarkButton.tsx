"use client";

import { Bookmark, BookmarkCheck } from "lucide-react";
import { toggleSaved, useSavedSlugs } from "@/lib/bookmarks";

export function BookmarkButton({ slug, className = "" }: { slug: string; className?: string }) {
  const saved = useSavedSlugs().includes(slug);
  return (
    <button
      type="button"
      onClick={() => toggleSaved(slug)}
      aria-pressed={saved}
      className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-sm font-semibold transition-colors ${
        saved ? "border-tea bg-tea text-on-night" : "border-rule bg-card text-ink hover:border-ink"
      } ${className}`}
    >
      {saved ? <BookmarkCheck className="size-4" aria-hidden /> : <Bookmark className="size-4" aria-hidden />}
      {saved ? "சேமிக்கப்பட்டது" : "பிறகு படிக்க"}
    </button>
  );
}
