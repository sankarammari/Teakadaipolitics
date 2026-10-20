import { contentTypeLabel } from "@/lib/format";
import type { ContentType } from "@/types";

const styles: Record<ContentType, string> = {
  news: "text-news",
  analysis: "text-analysis",
  opinion: "text-opinion",
};

const marks: Record<ContentType, string> = {
  news: "bg-news",
  analysis: "bg-analysis",
  opinion: "bg-opinion",
};

/** News / Analysis / Opinion label. Shape differs per type so colour is not the only cue. */
export function ContentTypeBadge({ type, className = "" }: { type: ContentType; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-1.5 text-sm font-bold ${styles[type]} ${className}`}>
      <span
        aria-hidden
        className={`inline-block size-2.5 ${marks[type]} ${
          type === "news" ? "rounded-full" : type === "analysis" ? "rounded-[1px]" : "rotate-45 rounded-[1px]"
        }`}
      />
      {contentTypeLabel[type]}
    </span>
  );
}
