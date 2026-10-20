/**
 * Publication-level settings. Change branding, links and contact details here
 * instead of inside components.
 */
export const siteConfig = {
  name: "Teakadai Politics",
  nameTamil: "டீக்கடை அரசியல்",
  tagline: "Politics, argued over a glass of tea.",
  description:
    "Teakadai Politics publishes current affairs, policy analysis, opinion and video commentary on Indian politics.",
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://teakadaipolitics.com").replace(/\/$/, ""),
  locale: "en_IN",
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
  { label: "Latest", href: "/articles" },
  { label: "Current affairs", href: "/category/current-affairs" },
  { label: "Elections", href: "/category/elections" },
  { label: "Policy", href: "/category/government-policy" },
  { label: "Analysis", href: "/analysis" },
  { label: "Videos", href: "/videos" },
] as const;
