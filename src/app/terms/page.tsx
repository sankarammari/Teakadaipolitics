import { DraftNotice } from "@/components/common/DraftNotice";
import { PageIntro } from "@/components/common/PageIntro";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Terms and conditions (draft)",
  description: "Draft terms and conditions for Teakadai Politics.",
  path: "/terms",
});

const h2 = "headline pt-4 font-sans text-[1.7rem]";

export default function TermsPage() {
  return (
    <>
      <PageIntro title="Terms and conditions" />
      <div className="container-page">
        <div className="prose-body space-y-5">
          <DraftNotice>
            <strong>Draft, not yet in force.</strong> These terms are placeholders and must be reviewed by someone
            qualified to advise the publication before launch.
          </DraftNotice>

          <h2 className={h2}>Using this site</h2>
          <p>
            You may read and share links to our articles and videos for personal, non-commercial use. Republishing
            full articles requires written permission.
          </p>

          <h2 className={h2}>Content labels</h2>
          <p>
            Articles are labelled as news, analysis or opinion. Opinion pieces reflect their writers’ views, not the
            publication’s position.
          </p>

          <h2 className={h2}>External links</h2>
          <p>
            We link to sources and social platforms we do not control. Their content and policies are their own.
          </p>

          <h2 className={h2}>Changes</h2>
          <p>We may update these terms. The date of the latest version will be shown on this page.</p>
        </div>
      </div>
    </>
  );
}
