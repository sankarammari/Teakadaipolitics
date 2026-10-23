/**
 * Publication-level settings. Change branding, links and contact details here
 * instead of inside components.
 */
export const siteConfig = {
  /** Brand name stays in English everywhere; the rest of the site is Tamil. */
  name: "Teakadai Politics",
  tagline: "டீ குடிப்போம்… கருத்தைப் பகிர்வோம்… மாற்றத்தை உருவாக்குவோம்!",
  logo: "/logo/teakadai-politics-logo.jpg",
  description:
    "நடப்பு நிகழ்வுகள், கொள்கைப் பகுப்பாய்வு, கருத்துக் கட்டுரைகள், அரசியல் வீடியோக்கள்: தமிழ்நாட்டு அரசியலை டீக்கடை பெஞ்சிலிருந்து பேசும் Teakadai Politics இணைய இதழ்.",
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://teakadaipolitics.com").replace(/\/$/, ""),
  locale: "ta_IN",
  contactEmail: "editor@teakadaipolitics.com",

  /** Set NEXT_PUBLIC_SAMPLE_CONTENT=true to show "sample content" notices on articles and videos. */
  sampleContent: process.env.NEXT_PUBLIC_SAMPLE_CONTENT === "true",

  /**
   * Search engines are asked not to index the site, and article structured data
   * is withheld, until NEXT_PUBLIC_ALLOW_INDEXING=true is set on the live domain.
   */
  allowIndexing: process.env.NEXT_PUBLIC_ALLOW_INDEXING === "true",

  /** Official accounts. Env vars override; an empty URL shows a "coming soon" state. */
  social: {
    facebook: process.env.NEXT_PUBLIC_SOCIAL_FACEBOOK || "https://www.facebook.com/share/1CASFfsgmv/",
    youtube: process.env.NEXT_PUBLIC_SOCIAL_YOUTUBE || "https://www.youtube.com/@teakadai_politics",
    instagram: process.env.NEXT_PUBLIC_SOCIAL_INSTAGRAM || "https://www.instagram.com/teakadai_politics",
    x: process.env.NEXT_PUBLIC_SOCIAL_X || "https://x.com/teakadaipoli",
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
