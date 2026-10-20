import { anim, stagger } from "@/lib/anim";
import type { Article, Category } from "@/types";
import { ArticleCard } from "./ArticleCard";

interface ArticleGridProps {
  articles: Article[];
  categories?: Category[];
  headingLevel?: "h2" | "h3";
}

export function ArticleGrid({ articles, categories = [], headingLevel }: ArticleGridProps) {
  const names = new Map(categories.map((c) => [c.id, c.name]));
  return (
    <ul className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
      {articles.map((article, i) => (
        <li key={article.id} {...anim("fadeUp", stagger(i, 120))}>
          <ArticleCard article={article} categoryName={names.get(article.category)} headingLevel={headingLevel} />
        </li>
      ))}
    </ul>
  );
}
