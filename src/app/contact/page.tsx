import { ContactForm } from "@/components/contact/ContactForm";
import { PageIntro } from "@/components/common/PageIntro";
import { SocialLinks } from "@/components/common/SocialLinks";
import { siteConfig } from "@/config/site";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Contact",
  description: "Send story tips, corrections and feedback to the Teakadai Politics editors.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageIntro
        title="Contact the editors"
        description="Story tips, corrections and feedback are all welcome."
      />
      <div className="container-page grid gap-12 lg:grid-cols-[minmax(0,2fr)_1fr]">
        <ContactForm />
        <aside className="space-y-8 lg:border-l lg:border-rule lg:pl-10">
          <div>
            <h2 className="headline text-2xl">Email</h2>
            <a href={`mailto:${siteConfig.contactEmail}`} className="mt-1 inline-block font-semibold text-tea underline underline-offset-2">
              {siteConfig.contactEmail}
            </a>
          </div>
          <div>
            <h2 className="headline text-2xl">Corrections</h2>
            <p className="mt-1 text-ink-soft">Include the article link and what needs correcting.</p>
          </div>
          <div>
            <h2 className="headline text-2xl">Follow</h2>
            <div className="mt-3">
              <SocialLinks />
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}
