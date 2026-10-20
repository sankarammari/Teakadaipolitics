import { Info } from "lucide-react";
import { siteConfig } from "@/config/site";

/** Shown on content pages while the site is running on mock data. */
export function SampleNotice({ kind = "article" }: { kind?: "article" | "video" }) {
  if (!siteConfig.sampleContent) return null;
  return (
    <p className="flex items-start gap-2 rounded-md bg-tea-light px-3.5 py-2.5 text-sm text-ink">
      <Info className="mt-0.5 size-4 shrink-0 text-tea" aria-hidden />
      <span>
        Sample {kind} for previewing the site. The people, quotes and figures in it are illustrative, not real
        reporting.
      </span>
    </p>
  );
}
