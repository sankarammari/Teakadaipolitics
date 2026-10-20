import Link from "next/link";
import { ArticleBrowser } from "@/components/article/ArticleBrowser";
import { ArticleCard } from "@/components/article/ArticleCard";
import { EmptyState } from "@/components/common/EmptyState";
import { PageIntro } from "@/components/common/PageIntro";
import { getArticlesByType, repository } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "பகுப்பாய்வும் கருத்தும்",
  description:
    "தமிழ்நாட்டுத் தேர்தல், அரசுக் கொள்கை, பொது நிர்வாகம் பற்றிய அரசியல் பகுப்பாய்வுகள், விளக்கங்கள், கருத்துக் கட்டுரைகள்.",
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
        title="பகுப்பாய்வும் கருத்தும்"
        description="பகுப்பாய்வு, சான்றுகள் என்ன சொல்கின்றன என்பதை விளக்கும். கருத்து, ஒரு நிலைப்பாட்டை வாதிடும். நீங்கள் எதைப் படிக்கிறீர்கள் என்று தெரிய, ஒவ்வொரு கட்டுரைக்கும் அடையாளம் உண்டு."
      >
        {topics.length > 0 && (
          <nav aria-label="பகுப்பாய்வுப் பொருள்கள்" className="mt-6">
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
            <section aria-label="சிறப்புப் பகுப்பாய்வு" className="mb-16 border-b border-rule pb-14">
              <ArticleCard article={featured} variant="lead" categoryName={names.get(featured.category)} headingLevel="h2" priority />
            </section>
            <h2 className="headline mb-6 text-[1.8rem]">எல்லாப் பகுப்பாய்வுகளும் கருத்துகளும்</h2>
            <ArticleBrowser articles={pieces} categories={categories} typeOptions={["analysis", "opinion"]} />
          </>
        ) : (
          <EmptyState title="இன்னும் பகுப்பாய்வுகள் இல்லை" message="பகுப்பாய்வு, கருத்துக் கட்டுரைகள் வெளியானதும் இங்கே தோன்றும்." />
        )}
      </div>
    </>
  );
}
