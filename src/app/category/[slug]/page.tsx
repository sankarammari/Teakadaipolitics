import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleBrowser } from "@/components/article/ArticleBrowser";
import { EmptyState } from "@/components/common/EmptyState";
import { getArticlesByCategory, repository } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export async function generateStaticParams() {
  return (await repository.getCategories()).map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const category = await repository.getCategoryBySlug((await params).slug);
  if (!category) return {};
  return buildMetadata({ title: category.name, description: category.description, path: `/category/${category.slug}` });
}

export default async function CategoryPage({ params }: Props) {
  const category = await repository.getCategoryBySlug((await params).slug);
  if (!category) notFound();

  const [articles, categories] = await Promise.all([getArticlesByCategory(category.id), repository.getCategories()]);

  return (
    <>
      <div data-anim-children="fadeUp" className="container-page pb-8 pt-10 md:pt-14">
        <h1 className="headline text-[2.1rem] md:text-[2.9rem]">{category.name}</h1>
        <p className="mt-3 max-w-2xl text-lg text-ink-soft">{category.description}</p>
        <nav aria-label="பிற பிரிவுகள்" className="mt-6">
          <ul className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <li key={c.id}>
                <Link
                  href={`/category/${c.slug}`}
                  aria-current={c.id === category.id ? "page" : undefined}
                  className="inline-block rounded-full border border-rule px-3.5 py-1 text-sm font-semibold hover:border-ink aria-[current=page]:border-ink aria-[current=page]:bg-ink aria-[current=page]:text-paper"
                >
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="container-page">
        {articles.length ? (
          <ArticleBrowser articles={articles} categories={categories} />
        ) : (
          <EmptyState
            title={`${category.name}: இன்னும் கட்டுரைகள் இல்லை`}
            message="இந்தப் பிரிவு தயார்; புதிய கட்டுரைகள் வெளியானதும் இங்கே தோன்றும்."
            action={{ label: "எல்லாக் கட்டுரைகளும்", href: "/articles" }}
          />
        )}
      </div>
    </>
  );
}
