import Link from "next/link";
import { ArticleBrowser } from "@/components/article/ArticleBrowser";
import { ArticleCard } from "@/components/article/ArticleCard";
import { EmptyState } from "@/components/common/EmptyState";
import { PageIntro } from "@/components/common/PageIntro";
import { getArticlesByType, repository } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Analysis and opinion",
  description:
    "Political analysis, explainers and opinion on elections, government policy and public administration.",
  path: "/analysis",
});

export default async function AnalysisPage() {
  const [pieces, categories] = await Promise.all([getArticlesByType("analysis", "opinion"), repository.getCategories()]);
  const featured = pieces.find((a) => a.featured && a.contentType === "analysis") ?? pieces[0];
  const names = new Map(categories.map((c) => [c.id, c.name]));
  const topics = categories.filter((c) => pieces.some((a) => a.category === c.id));

  return (
    <>
      <PageIntro
        title="Analysis and opinion"
        description="Analysis explains what the evidence shows. Opinion argues a point of view. Each piece is labelled so you know which you are reading."
      >
        {topics.length > 0 && (
          <nav aria-label="Analysis topics" className="mt-6">
            <ul className="flex flex-wrap gap-2">
              {topics.map((c) => (
                <li key={c.id}>
                  <Link
                    href={`/category/${c.slug}`}
                    className="inline-block rounded-full border border-rule px-3.5 py-1 text-sm font-semibold hover:border-ink"
                  >
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </PageIntro>

      <div className="container-page">
        {featured ? (
          <>
            <section aria-label="Featured analysis" className="mb-16 border-b border-rule pb-14">
              <ArticleCard article={featured} variant="lead" categoryName={names.get(featured.category)} headingLevel="h2" priority />
            </section>
            <h2 className="headline mb-6 text-[2rem]">All analysis and opinion</h2>
            <ArticleBrowser articles={pieces} categories={categories} typeOptions={["analysis", "opinion"]} />
          </>
        ) : (
          <EmptyState title="No analysis yet" message="Analysis and opinion pieces will appear here once published." />
        )}
      </div>
    </>
  );
}
