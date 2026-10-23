import Link from "next/link";
import { BrandMark } from "@/components/common/BrandMark";
import { SocialLinks } from "@/components/common/SocialLinks";
import { siteConfig } from "@/config/site";
import { categories } from "@/data/categories";
import { anim } from "@/lib/anim";
import { VisitCounter } from "./VisitCounter";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-20 bg-ink text-paper">
      <div className="container-page grid gap-10 py-12 md:grid-cols-[1.3fr_1fr_1fr]">
        <div {...anim("fadeUp")}>
          <Link href="/" aria-label={`${siteConfig.name}, முகப்புப் பக்கம்`} className="inline-block">
            <BrandMark size="md" tone="dark" />
          </Link>
          <p className="mt-4 max-w-xs text-sm text-paper/75">{siteConfig.tagline}</p>
          <div className="mt-5">
            <SocialLinks tone="dark" />
          </div>
        </div>

        <nav {...anim("fadeUp", 120)} aria-label="பிரிவுகள்">
          <h2 className="text-sm font-semibold text-paper/60">பிரிவுகள்</h2>
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

        <nav {...anim("fadeUp", 240)} aria-label="இதழ் பற்றி">
          <h2 className="text-sm font-semibold text-paper/60">இதழ்</h2>
          <ul className="mt-3 space-y-2 text-[0.95rem]">
            <li><Link href="/analysis" className="link-quiet">பகுப்பாய்வு</Link></li>
            <li><Link href="/videos" className="link-quiet">வீடியோ</Link></li>
            <li><Link href="/about" className="link-quiet">எங்களைப் பற்றி</Link></li>
            <li><Link href="/contact" className="link-quiet">தொடர்புக்கு</Link></li>
            <li><Link href="/privacy-policy" className="link-quiet">தனியுரிமைக் கொள்கை</Link></li>
            <li><Link href="/terms" className="link-quiet">விதிமுறைகள்</Link></li>
            <li><Link href="/credits" className="link-quiet">படங்களுக்கான நன்றி</Link></li>
          </ul>
        </nav>
      </div>
      <div className="border-t border-white/15">
        <div className="container-page flex flex-wrap items-center justify-between gap-x-6 gap-y-3 py-5 pr-20 xl:pr-6">
          <p className="text-sm text-paper/60">
            © {year} {siteConfig.name}.{" "}
            {siteConfig.sampleContent && "இந்தத் தளத்தில் தற்போது உள்ள கட்டுரைகளும் வீடியோக்களும் மாதிரி உள்ளடக்கம் மட்டுமே."}
          </p>
          <VisitCounter />
        </div>
      </div>
    </footer>
  );
}
