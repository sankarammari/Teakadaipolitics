/**
 * Publication-level settings. Change branding, links and contact details here
 * instead of inside components.
 */
export const siteConfig = {
  name: "டீக்கடை அரசியல்",
  tagline: "ஒரு கிளாஸ் டீ, ஒரு அரசியல் விவாதம்.",
  description:
    "நடப்பு நிகழ்வுகள், கொள்கைப் பகுப்பாய்வு, கருத்துக் கட்டுரைகள், அரசியல் வீடியோக்கள்: தமிழ்நாட்டு அரசியலை டீக்கடை பெஞ்சிலிருந்து பேசும் இணைய இதழ்.",
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://teakadaipolitics.com").replace(/\/$/, ""),
  locale: "ta_IN",
  contactEmail: "editor@teakadaipolitics.com",

  /**
   * While true, every article and video page shows a "sample content" notice,
   * article structured data is withheld, and search engines are asked not to index.
   * Set NEXT_PUBLIC_SAMPLE_CONTENT=false once real, edited content replaces the mock data.
   */
  sampleContent: process.env.NEXT_PUBLIC_SAMPLE_CONTENT !== "false",

  /** Leave a URL empty to show the "coming soon" state for that platform. */
  social: {
    youtube: process.env.NEXT_PUBLIC_SOCIAL_YOUTUBE || "",
    instagram: process.env.NEXT_PUBLIC_SOCIAL_INSTAGRAM || "",
    x: process.env.NEXT_PUBLIC_SOCIAL_X || "",
  },

  /** Optional external form endpoint (e.g. Formspree). Empty means the form is not live. */
  contactFormEndpoint: process.env.NEXT_PUBLIC_CONTACT_FORM_ENDPOINT || "",
} as const;

export type SocialPlatform = keyof typeof siteConfig.social;

export const primaryNav = [
  { label: "சமீபத்தியவை", href: "/articles" },
  { label: "நடப்பு நிகழ்வுகள்", href: "/category/current-affairs" },
  { label: "தேர்தல்", href: "/category/elections" },
  { label: "கொள்கை", href: "/category/government-policy" },
  { label: "பகுப்பாய்வு", href: "/analysis" },
  { label: "வீடியோ", href: "/videos" },
] as const;
