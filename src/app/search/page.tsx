import { Suspense } from "react";
import { PageIntro } from "@/components/common/PageIntro";
import { SearchView } from "@/components/search/SearchView";
import { repository } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export const metadata = {
  ...buildMetadata({
    title: "Search",
    description: "Search Teakadai Politics articles by title, topic or tag.",
    path: "/search",
  }),
  robots: { index: false, follow: true },
};

export default async function SearchPage() {
  const [articles, categories] = await Promise.all([repository.getArticles(), repository.getCategories()]);
  return (
    <>
      <PageIntro title="Search" />
      <div className="container-page">
        <Suspense fallback={<p className="text-ink-soft">Loading search</p>}>
          <SearchView articles={articles} categories={categories} />
        </Suspense>
      </div>
    </>
  );
}
