import Link from "next/link";
import { PageIntro } from "@/components/common/PageIntro";
import { PhotoCredit } from "@/components/common/PhotoCredit";
import { repository } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Photo credits",
  description: "Credits and licences for photos used on Teakadai Politics.",
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
        title="Photo credits"
        description="Photos on this site illustrate the topic of each story. They are used under the licences listed and do not show the specific events described."
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
