import { SavedList } from "@/components/article/SavedList";
import { PageIntro } from "@/components/common/PageIntro";
import { repository } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export const metadata = {
  ...buildMetadata({
    title: "சேமித்த கட்டுரைகள்",
    description: "பிறகு படிக்க நீங்கள் சேமித்த கட்டுரைகள்.",
    path: "/saved",
  }),
  robots: { index: false, follow: true },
};

export default async function SavedPage() {
  const [articles, categories] = await Promise.all([repository.getArticles(), repository.getCategories()]);
  return (
    <>
      <PageIntro
        title="சேமித்த கட்டுரைகள்"
        description="பிறகு படிக்க நீங்கள் சேமித்தவை. இவை இந்த உலாவியில் மட்டுமே சேமிக்கப்படும்."
      />
      <div className="container-page">
        {/* Cards only need metadata, so leave the bodies out of the client payload */}
        <SavedList articles={articles.map((a) => ({ ...a, content: [] }))} categories={categories} />
      </div>
    </>
  );
}
