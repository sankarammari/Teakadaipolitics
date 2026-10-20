import { ContactForm } from "@/components/contact/ContactForm";
import { PageIntro } from "@/components/common/PageIntro";
import { SocialLinks } from "@/components/common/SocialLinks";
import { siteConfig } from "@/config/site";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "தொடர்புக்கு",
  description: "செய்திக் குறிப்புகள், திருத்தங்கள், கருத்துகளை டீக்கடை அரசியல் ஆசிரியர் குழுவுக்கு அனுப்புங்கள்.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageIntro
        title="ஆசிரியர் குழுவைத் தொடர்புகொள்ள"
        description="செய்திக் குறிப்புகள், திருத்தங்கள், கருத்துகள் அனைத்தையும் வரவேற்கிறோம்."
      />
      <div className="container-page grid gap-12 lg:grid-cols-[minmax(0,2fr)_1fr]">
        <ContactForm />
        <aside className="space-y-8 lg:border-l lg:border-rule lg:pl-10">
          <div>
            <h2 className="headline text-2xl">மின்னஞ்சல்</h2>
            <a href={`mailto:${siteConfig.contactEmail}`} className="mt-1 inline-block font-semibold text-tea underline underline-offset-2">
              {siteConfig.contactEmail}
            </a>
          </div>
          <div>
            <h2 className="headline text-2xl">திருத்தங்கள்</h2>
            <p className="mt-1 text-ink-soft">கட்டுரையின் இணைப்பையும், எதைத் திருத்த வேண்டும் என்பதையும் குறிப்பிடுங்கள்.</p>
          </div>
          <div>
            <h2 className="headline text-2xl">பின்தொடர</h2>
            <div className="mt-3">
              <SocialLinks />
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}
