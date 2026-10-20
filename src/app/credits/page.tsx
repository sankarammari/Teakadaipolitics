import Link from "next/link";
import { PageIntro } from "@/components/common/PageIntro";
import { PhotoCredit } from "@/components/common/PhotoCredit";
import { repository } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "படங்களுக்கான நன்றி",
  description: "டீக்கடை அரசியல் தளத்தில் பயன்படுத்தப்பட்ட படங்களின் உரிமையாளர்களும் உரிமங்களும்.",
  path: "/credits",
});

export default async function CreditsPage() {
  const [articles, videos] = await Promise.all([repository.getArticles(), repository.getVideos()]);
  const rows = [
    ...articles.filter((a) => a.coverCredit).map((a) => ({ href: `/articles/${a.slug}`, title: a.title, credit: a.coverCredit })),
    ...videos.filter((v) => v.thumbnailCredit).map((v) => ({ href: `/videos/${v.slug}`, title: v.title, credit: v.thumbnailCredit })),
  ];

  return (
    <>
      <PageIntro
        title="படங்களுக்கான நன்றி"
        description="இந்தத் தளத்தில் உள்ள படங்கள் ஒவ்வொரு கட்டுரையின் பொருளை விளக்குவதற்கு மட்டுமே. கீழே குறிப்பிட்ட உரிமங்களின்கீழ் பயன்படுத்தப்படுகின்றன; கட்டுரையில் விவரிக்கப்படும் குறிப்பிட்ட நிகழ்வுகளைக் காட்டுபவை அல்ல."
      />
      <div className="container-page">
        <ul className="max-w-3xl divide-y divide-rule border-y border-rule">
          {rows.map((row) => (
            <li key={row.href} className="py-3.5">
              <Link href={row.href} className="font-semibold hover:text-tea">
                {row.title}
              </Link>
              <PhotoCredit credit={row.credit} className="mt-0.5" />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
