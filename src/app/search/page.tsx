import { Suspense } from "react";
import { PageIntro } from "@/components/common/PageIntro";
import { SearchView } from "@/components/search/SearchView";
import { repository } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export const metadata = {
  ...buildMetadata({
    title: "தேடல்",
    description: "Teakadai Politics கட்டுரைகளைத் தலைப்பு, பொருள், குறிச்சொல் மூலம் தேடுங்கள்.",
    path: "/search",
  }),
  robots: { index: false, follow: true },
};

export default async function SearchPage() {
  const [articles, categories] = await Promise.all([repository.getArticles(), repository.getCategories()]);
  return (
    <>
      <PageIntro title="தேடல்" />
      <div className="container-page">
        <Suspense fallback={<p className="text-ink-soft">தேடல் ஏற்றப்படுகிறது</p>}>
          <SearchView articles={articles} categories={categories} />
        </Suspense>
      </div>
    </>
  );
}
