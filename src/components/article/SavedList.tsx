"use client";

import { useSavedSlugs } from "@/lib/bookmarks";
import type { Article, Category } from "@/types";
import { EmptyState } from "@/components/common/EmptyState";
import { ArticleCard } from "./ArticleCard";
import { BookmarkButton } from "./BookmarkButton";

/** The reader's saved articles, newest save first. */
export function SavedList({ articles, categories }: { articles: Article[]; categories: Category[] }) {
  const slugs = useSavedSlugs();
  const names = new Map(categories.map((c) => [c.id, c.name]));
  const saved = slugs.map((s) => articles.find((a) => a.slug === s)).filter((a): a is Article => Boolean(a));

  if (saved.length === 0) {
    return (
      <EmptyState
        title="இன்னும் எதுவும் சேமிக்கவில்லை"
        message="எந்தக் கட்டுரையிலும் 'பிறகு படிக்க' பொத்தானை அழுத்தினால், அது இங்கே சேமிக்கப்படும். சேமிப்புகள் இந்த உலாவியில் மட்டுமே இருக்கும்."
        action={{ label: "கட்டுரைகளைப் பாருங்கள்", href: "/articles" }}
      />
    );
  }

  return (
    <ul data-anim-children="fadeUp" className="max-w-3xl divide-y divide-rule">
      {saved.map((a) => (
        <li key={a.id} className="flex flex-col gap-3 py-5 first:pt-0 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0 flex-1">
            <ArticleCard article={a} variant="row" categoryName={names.get(a.category)} headingLevel="h2" />
          </div>
          <BookmarkButton slug={a.slug} className="relative z-10 self-start" />
        </li>
      ))}
    </ul>
  );
}
