import { ArticleBrowser } from "@/components/article/ArticleBrowser";
import { PageIntro } from "@/components/common/PageIntro";
import { repository } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "எல்லாக் கட்டுரைகளும்",
  description: "Teakadai Politics-இன் தமிழ்நாட்டுச் செய்திகள், பகுப்பாய்வுகள், கருத்துக் கட்டுரைகள். பிரிவு அல்லது வகைப்படி வடிகட்டலாம், பொருள்வாரியாகத் தேடலாம்.",
  path: "/articles",
});

export default async function ArticlesPage() {
  const [articles, categories] = await Promise.all([repository.getArticles(), repository.getCategories()]);
  return (
    <>
      <PageIntro
        title="எல்லாக் கட்டுரைகளும்"
        description="அனைத்துச் செய்திகளும், பகுப்பாய்வுகளும், கருத்துக் கட்டுரைகளும், புதியவை முதலில். பிரிவு, வகை அல்லது தேடல் சொல்லால் சுருக்கலாம்."
      />
      <div className="container-page">
        <ArticleBrowser articles={articles} categories={categories} />
      </div>
    </>
  );
}
