import { licenseUrl } from "@/data/image-credits";
import type { ImageCredit } from "@/types";

/** "Photo: Author / Wikimedia Commons, CC BY-SA 4.0" line under a picture. */
export function PhotoCredit({ credit, className = "" }: { credit?: ImageCredit; className?: string }) {
  if (!credit) return null;
  const license = licenseUrl(credit.license);
  return (
    <p className={`text-xs text-ink-soft ${className}`}>
      Photo:{" "}
      <a href={credit.sourceUrl} target="_blank" rel="noopener noreferrer" className="underline-offset-2 hover:underline">
        {credit.author} / Wikimedia Commons
      </a>
      ,{" "}
      {license ? (
        <a href={license} target="_blank" rel="noopener noreferrer license" className="underline-offset-2 hover:underline">
          {credit.license}
        </a>
      ) : (
        credit.license
      )}
    </p>
  );
}
