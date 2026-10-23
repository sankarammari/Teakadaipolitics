"use client";

import { Search, X } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { ArticleCard } from "@/components/article/ArticleCard";
import { EmptyState } from "@/components/common/EmptyState";
import { filterArticles } from "@/lib/search";
import type { Article, Category } from "@/types";

/** Browser-side search over local articles. The query lives in ?q= so results are shareable. */
export function SearchView({ articles, categories }: { articles: Article[]; categories: Category[] }) {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const urlQuery = params.get("q") ?? "";
  const [query, setQuery] = useState(urlQuery);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => setQuery(urlQuery), [urlQuery]);

  // Keep the URL in step with typing, without adding history entries
  useEffect(() => {
    const t = setTimeout(() => {
      if (query.trim() === urlQuery.trim()) return;
      const next = query.trim() ? `${pathname}?q=${encodeURIComponent(query.trim())}` : pathname;
      router.replace(next, { scroll: false });
    }, 250);
    return () => clearTimeout(t);
  }, [query, urlQuery, pathname, router]);

  const trimmed = query.trim();
  const results = useMemo(() => (trimmed ? filterArticles(articles, { query: trimmed }) : []), [articles, trimmed]);
  const names = new Map(categories.map((c) => [c.id, c.name]));

  const clear = () => {
    setQuery("");
    inputRef.current?.focus();
  };

  return (
    <div>
      <form role="search" onSubmit={(e) => e.preventDefault()} className="relative max-w-2xl">
        <label htmlFor="search-page-input" className="sr-only">
          கட்டுரைகளைத் தேடுங்கள்
        </label>
        <Search className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-ink-soft" aria-hidden />
        <input
          ref={inputRef}
          id="search-page-input"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="தலைப்பு, பொருள் அல்லது குறிச்சொல் மூலம் தேடுங்கள்"
          autoFocus
          className="w-full rounded-full border-2 border-ink bg-white py-3 pl-12 pr-14 text-lg focus:outline-offset-4 [&::-webkit-search-cancel-button]:hidden"
        />
        {query && (
          <button
            type="button"
            onClick={clear}
            className="absolute right-2 top-1/2 grid size-10 -translate-y-1/2 place-items-center rounded-full hover:bg-paper-deep"
          >
            <X className="size-5" aria-hidden />
            <span className="sr-only">தேடலை அழி</span>
          </button>
        )}
      </form>

      <p aria-live="polite" className="mt-4 text-sm text-ink-soft">
        {trimmed
          ? `“${trimmed}” தேடலுக்கு ${results.length} முடிவுகள்`
          : "கட்டுரைத் தலைப்புகள், சுருக்கங்கள், குறிச்சொற்களில் தேட ஒரு சொல்லைத் தட்டச்சு செய்யுங்கள்."}
      </p>

      <div className="mt-8">
        {trimmed && results.length === 0 ? (
          <EmptyState
            title="எதுவும் கிடைக்கவில்லை"
            message={`“${trimmed}” என்ற தேடலுக்குக் கட்டுரைகள் இல்லை. எழுத்துப்பிழையைச் சரிபாருங்கள், “பட்ஜெட்” அல்லது “தேர்தல்” போன்ற பொதுவான சொல்லை முயலுங்கள், அல்லது எல்லாக் கட்டுரைகளையும் பாருங்கள்.`}
            action={{ label: "எல்லாக் கட்டுரைகளும்", href: "/articles" }}
          />
        ) : (
          <ul data-anim-children="fadeUp" className="max-w-3xl divide-y divide-rule">
            {results.map((a) => (
              <li key={a.id} className="py-5 first:pt-0">
                <ArticleCard article={a} variant="row" categoryName={names.get(a.category)} headingLevel="h2" />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
