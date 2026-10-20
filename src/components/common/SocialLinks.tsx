import { siteConfig, type SocialPlatform } from "@/config/site";
import { SocialIcon } from "./SocialIcon";

const platforms: { key: SocialPlatform; name: string; action: string }[] = [
  { key: "youtube", name: "யூடியூப்", action: "யூடியூபில் பாருங்கள்" },
  { key: "instagram", name: "இன்ஸ்டாகிராம்", action: "இன்ஸ்டாகிராமில் பின்தொடருங்கள்" },
  { key: "x", name: "எக்ஸ் (ட்விட்டர்)", action: "எக்ஸ் தளத்தில் பின்தொடருங்கள்" },
];

const isSafeUrl = (url: string) => {
  try {
    return new URL(url).protocol === "https:";
  } catch {
    return false;
  }
};

interface SocialLinksProps {
  variant?: "row" | "panel";
  tone?: "light" | "dark";
}

/** Links to the publication's accounts. Unconfigured accounts show a "coming soon" state. */
export function SocialLinks({ variant = "row", tone = "light" }: SocialLinksProps) {
  const dark = tone === "dark";

  if (variant === "row") {
    return (
      <ul className="flex items-center gap-2">
        {platforms.map(({ key, name, action }) => {
          const url = siteConfig.social[key];
          const base = `grid size-10 place-items-center rounded-full border ${dark ? "border-white/25" : "border-rule"}`;
          return (
            <li key={key}>
              {isSafeUrl(url) ? (
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${action} (புதிய தாவலில் திறக்கும்)`}
                  className={`${base} ${dark ? "text-paper hover:bg-white/10" : "text-ink hover:bg-white"}`}
                >
                  <SocialIcon platform={key} />
                </a>
              ) : (
                <span
                  className={`${base} opacity-45`}
                  title={`${name} கணக்கு விரைவில்`}
                  aria-label={`${name} கணக்கு விரைவில்`}
                  role="img"
                >
                  <SocialIcon platform={key} />
                </span>
              )}
            </li>
          );
        })}
      </ul>
    );
  }

  return (
    <ul className="grid gap-3 sm:grid-cols-3">
      {platforms.map(({ key, name, action }) => {
        const url = siteConfig.social[key];
        const live = isSafeUrl(url);
        const inner = (
          <>
            <SocialIcon platform={key} className="size-7 shrink-0" />
            <span>
              <span className="block font-semibold">{name}</span>
              <span className="block text-sm opacity-75">{live ? action : "கணக்கு விரைவில்"}</span>
            </span>
          </>
        );
        const cls = "flex items-center gap-3 rounded-lg border px-4 py-3.5";
        return (
          <li key={key}>
            {live ? (
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className={`${cls} border-white/25 text-paper hover:bg-white/10`}
              >
                {inner}
                <span className="sr-only">(புதிய தாவலில் திறக்கும்)</span>
              </a>
            ) : (
              <div className={`${cls} border-dashed border-white/25 text-paper/70`}>{inner}</div>
            )}
          </li>
        );
      })}
    </ul>
  );
}
