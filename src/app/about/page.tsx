import Link from "next/link";
import { ContentTypeBadge } from "@/components/common/ContentTypeBadge";
import { PageIntro } from "@/components/common/PageIntro";
import { siteConfig } from "@/config/site";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "About",
  description: "Why Teakadai Politics exists and how we separate reporting, analysis and opinion.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <PageIntro title="About Teakadai Politics" />
      <div className="container-page">
        <div className="prose-body space-y-6">
          <p className="text-xl">
            In Tamil Nadu, politics has always been argued at the tea shop. Someone reads the paper aloud, someone
            disagrees, and by the second glass the whole bench has an opinion. {siteConfig.name} brings that
            conversation online, with the reporting and evidence it deserves.
          </p>

          <h2 className="headline pt-4 font-sans text-[1.9rem]">What we publish</h2>
          <p>
            Current affairs, explainers on government policy and public administration, election analysis, opinion,
            and video commentary on our YouTube channel.
          </p>

          <h2 className="headline pt-4 font-sans text-[1.9rem]">How to read us</h2>
          <p>Every piece carries one of three labels so you always know what kind of writing you are reading.</p>
          <dl className="space-y-4 font-sans">
            <div>
              <dt><ContentTypeBadge type="news" /></dt>
              <dd className="mt-1 font-serif">Reports what happened. Facts are sourced; statements are attributed to the person who made them.</dd>
            </div>
            <div>
              <dt><ContentTypeBadge type="analysis" /></dt>
              <dd className="mt-1 font-serif">Explains what the evidence means. The reasoning is shown so you can check it.</dd>
            </div>
            <div>
              <dt><ContentTypeBadge type="opinion" /></dt>
              <dd className="mt-1 font-serif">Argues a point of view. It is the writer’s view, not a statement of fact or of the publication’s position.</dd>
            </div>
          </dl>

          <h2 className="headline pt-4 font-sans text-[1.9rem]">Corrections</h2>
          <p>
            When we get something wrong, we correct it and show the updated date on the article. To report an error,{" "}
            <Link href="/contact" className="font-semibold text-tea underline underline-offset-2">
              contact the editors
            </Link>
            .
          </p>
        </div>
      </div>
    </>
  );
}
