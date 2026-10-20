import { ArticleBrowser } from "@/components/article/ArticleBrowser";
import { PageIntro } from "@/components/common/PageIntro";
import { repository } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "All articles",
  description: "News, analysis and opinion from Teakadai Politics. Filter by category or type, or search by topic.",
  path: "/articles",
});

export default async function ArticlesPage() {
  const [articles, categories] = await Promise.all([repository.getArticles(), repository.getCategories()]);
  return (
    <>
      <PageIntro
        title="All articles"
        description="Every news report, analysis and opinion piece, newest first. Narrow it down by category, type or a search term."
      />
      <div className="container-page">
        <ArticleBrowser articles={articles} categories={categories} />
      </div>
    </>
  );
}
