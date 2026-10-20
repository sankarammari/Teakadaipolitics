"use client";

import { Search, X } from "lucide-react";
import { useId, useMemo, useState } from "react";
import { EmptyState } from "@/components/common/EmptyState";
import { filterArticles, type SortOrder } from "@/lib/search";
import type { Article, Category, ContentType } from "@/types";
import { ArticleGrid } from "./ArticleGrid";

interface ArticleBrowserProps {
  articles: Article[];
  categories: Category[];
  /** Show the News / Analysis / Opinion filter. */
  showTypeFilter?: boolean;
  /** Restrict the type filter options (e.g. analysis page). */
  typeOptions?: ContentType[];
  pageSize?: number;
}

const typeLabels: Record<ContentType, string> = { news: "News", analysis: "Analysis", opinion: "Opinion" };

export function ArticleBrowser({
  articles,
  categories,
  showTypeFilter = true,
  typeOptions = ["news", "analysis", "opinion"],
  pageSize = 9,
}: ArticleBrowserProps) {
  const id = useId();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [contentType, setContentType] = useState<ContentType | "all">("all");
  const [sort, setSort] = useState<SortOrder>("newest");
  const [visible, setVisible] = useState(pageSize);

  const results = useMemo(
    () => filterArticles(articles, { query, category, contentType, sort }),
    [articles, query, category, contentType, sort],
  );

  // Only offer categories that actually have articles in this list
  const usedCategories = categories.filter((c) => articles.some((a) => a.category === c.id));
  const filtered = query !== "" || category !== "all" || contentType !== "all";

  const update = <T,>(setter: (v: T) => void) => (value: T) => {
    setter(value);
    setVisible(pageSize);
  };

  const reset = () => {
    setQuery("");
    setCategory("all");
    setContentType("all");
    setVisible(pageSize);
  };

  const field = "w-full rounded-md border border-rule bg-white px-3 py-2 text-[0.95rem] focus:border-ink";

  return (
    <div>
      <div
        role="search"
        aria-label="Filter articles"
        className="mb-8 grid gap-3 rounded-lg bg-paper-deep p-4 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr]"
      >
        <div className="sm:col-span-2 lg:col-span-1">
          <label htmlFor={`${id}-q`} className="mb-1 block text-sm font-semibold">
            Search
          </label>
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-ink-soft" aria-hidden />
            <input
              id={`${id}-q`}
              type="search"
              value={query}
              onChange={(e) => update(setQuery)(e.target.value)}
              placeholder="Title, topic or tag"
              className={`${field} pl-9`}
            />
          </div>
        </div>
        <div>
          <label htmlFor={`${id}-cat`} className="mb-1 block text-sm font-semibold">
            Category
          </label>
          <select id={`${id}-cat`} value={category} onChange={(e) => update(setCategory)(e.target.value)} className={field}>
            <option value="all">All categories</option>
            {usedCategories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
        {showTypeFilter && (
          <div>
            <label htmlFor={`${id}-type`} className="mb-1 block text-sm font-semibold">
              Type
            </label>
            <select
              id={`${id}-type`}
              value={contentType}
              onChange={(e) => update(setContentType)(e.target.value as ContentType | "all")}
              className={field}
            >
              <option value="all">All types</option>
              {typeOptions.map((t) => (
                <option key={t} value={t}>
                  {typeLabels[t]}
                </option>
              ))}
            </select>
          </div>
        )}
        <div>
          <label htmlFor={`${id}-sort`} className="mb-1 block text-sm font-semibold">
            Sort
          </label>
          <select id={`${id}-sort`} value={sort} onChange={(e) => setSort(e.target.value as SortOrder)} className={field}>
            <option value="newest">Newest first</option>
            <option value="oldest">Oldest first</option>
          </select>
        </div>
      </div>

      <div className="mb-6 flex flex-wrap items-center gap-3">
        <p aria-live="polite" className="text-sm text-ink-soft">
          {results.length === 1 ? "1 article" : `${results.length} articles`}
          {filtered ? " match your filters" : ""}
        </p>
        {filtered && (
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center gap-1 rounded-full border border-rule px-3 py-1 text-sm font-semibold hover:border-ink"
          >
            <X className="size-3.5" aria-hidden /> Clear filters
          </button>
        )}
      </div>

      {results.length === 0 ? (
        <EmptyState
          title="No articles match"
          message="Try a shorter search term, or clear the filters to see everything."
        >
          <button
            type="button"
            onClick={reset}
            className="mt-5 rounded-full bg-ink px-5 py-2 text-sm font-semibold text-paper hover:bg-ink/85"
          >
            Clear filters
          </button>
        </EmptyState>
      ) : (
        <>
          <ArticleGrid articles={results.slice(0, visible)} categories={categories} headingLevel="h2" />
          {visible < results.length && (
            <div className="mt-12 text-center">
              <button
                type="button"
                onClick={() => setVisible((v) => v + pageSize)}
                className="rounded-full border-2 border-ink px-6 py-2.5 font-semibold hover:bg-ink hover:text-paper"
              >
                Load more articles
              </button>
              <p className="mt-2 text-sm text-ink-soft">
                Showing {Math.min(visible, results.length)} of {results.length}
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
}
