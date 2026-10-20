import { Info } from "lucide-react";
import { siteConfig } from "@/config/site";

/** Shown on content pages while the site is running on mock data. */
export function SampleNotice({ kind = "article" }: { kind?: "article" | "video" }) {
  if (!siteConfig.sampleContent) return null;
  return (
    <p className="flex items-start gap-2 rounded-md bg-tea-light px-3.5 py-2.5 text-sm text-ink">
      <Info className="mt-0.5 size-4 shrink-0 text-tea" aria-hidden />
      <span>
        {kind === "video" ? "இது தளத்தின் வடிவமைப்பைக் காட்டும் மாதிரி வீடியோ." : "இது தளத்தின் வடிவமைப்பைக் காட்டும் மாதிரிக் கட்டுரை."} இதில் உள்ள நபர்கள், மேற்கோள்கள், எண்ணிக்கைகள் அனைத்தும் கற்பனையானவை; உண்மைச் செய்தி அல்ல.
      </span>
    </p>
  );
}
