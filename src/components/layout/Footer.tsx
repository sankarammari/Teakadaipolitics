import Link from "next/link";
import { SocialLinks } from "@/components/common/SocialLinks";
import { siteConfig } from "@/config/site";
import { categories } from "@/data/categories";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-20 bg-ink text-paper">
      <div className="container-page grid gap-10 py-12 md:grid-cols-[1.3fr_1fr_1fr]">
        <div>
          <p lang="ta" className="font-tamil text-2xl font-bold text-tea-light">
            {siteConfig.nameTamil}
          </p>
          <p className="headline mt-1 text-xl">{siteConfig.name}</p>
          <p className="mt-3 max-w-xs text-sm text-paper/75">{siteConfig.tagline}</p>
          <div className="mt-5">
            <SocialLinks tone="dark" />
          </div>
        </div>

        <nav aria-label="Sections">
          <h2 className="text-sm font-semibold text-paper/60">Sections</h2>
          <ul className="mt-3 space-y-2 text-[0.95rem]">
            {categories.map((c) => (
              <li key={c.id}>
                <Link href={`/category/${c.slug}`} className="link-quiet">
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Publication">
          <h2 className="text-sm font-semibold text-paper/60">Publication</h2>
          <ul className="mt-3 space-y-2 text-[0.95rem]">
            <li><Link href="/analysis" className="link-quiet">Analysis</Link></li>
            <li><Link href="/videos" className="link-quiet">Videos</Link></li>
            <li><Link href="/about" className="link-quiet">About</Link></li>
            <li><Link href="/contact" className="link-quiet">Contact</Link></li>
            <li><Link href="/privacy-policy" className="link-quiet">Privacy policy</Link></li>
            <li><Link href="/terms" className="link-quiet">Terms</Link></li>
            <li><Link href="/credits" className="link-quiet">Photo credits</Link></li>
          </ul>
        </nav>
      </div>
      <div className="border-t border-white/15">
        <p className="container-page py-5 text-sm text-paper/60">
          © {year} {siteConfig.name}.{" "}
          {siteConfig.sampleContent && "The articles and videos currently on this site are sample content."}
        </p>
      </div>
    </footer>
  );
}
