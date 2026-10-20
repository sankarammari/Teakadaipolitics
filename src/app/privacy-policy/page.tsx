import { DraftNotice } from "@/components/common/DraftNotice";
import { PageIntro } from "@/components/common/PageIntro";
import { siteConfig } from "@/config/site";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Privacy policy (draft)",
  description: "Draft privacy policy for Teakadai Politics.",
  path: "/privacy-policy",
});

const h2 = "headline pt-4 font-sans text-[1.7rem]";

export default function PrivacyPage() {
  return (
    <>
      <PageIntro title="Privacy policy" />
      <div className="container-page">
        <div className="prose-body space-y-5">
          <DraftNotice>
            <strong>Draft, not yet in force.</strong> This text is a placeholder describing how the site works today.
            It must be reviewed against the publication’s actual practices and applicable law, including India’s
            Digital Personal Data Protection Act, 2023, before launch.
          </DraftNotice>

          <h2 className={h2}>What this site collects today</h2>
          <p>
            The site has no accounts, comments or newsletter. It does not store anything you type into the search box
            or the contact form on our servers. The contact form does not submit messages until an email service is
            connected; until then it only opens your own email app.
          </p>

          <h2 className={h2}>Embedded videos</h2>
          <p>
            Videos are hosted on YouTube. The player is not loaded until you press play, and then uses YouTube’s
            privacy-enhanced mode. Once playing, YouTube’s own privacy policy applies.
          </p>

          <h2 className={h2}>Hosting</h2>
          <p>
            Our hosting provider may keep standard server logs, such as IP addresses and pages requested, for security
            and reliability.
          </p>

          <h2 className={h2}>Contact</h2>
          <p>
            Questions about privacy can be sent to{" "}
            <a className="text-tea underline" href={`mailto:${siteConfig.contactEmail}`}>
              {siteConfig.contactEmail}
            </a>
            .
          </p>
        </div>
      </div>
    </>
  );
}
