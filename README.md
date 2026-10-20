# Teakadai Politics (Phase 1 frontend)

Public website for `teakadaipolitics.com`: political news, analysis, opinion and YouTube video commentary.
Phase 1 is frontend only. All content comes from local TypeScript mock data; there is no backend or database.

Built with Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS 4 and Lucide icons.

## Getting started

Requires Node.js 18.18 or later (20+ recommended).

```bash
npm install
cp .env.example .env.local   # optional, defaults work without it
npm run dev                  # http://localhost:3000
```

| Command | What it does |
|---|---|
| `npm run dev` | Development server |
| `npm run build` | Production build (all routes are pre-rendered) |
| `npm start` | Serve the production build |
| `npm run lint` | ESLint |
| `npm run placeholders` | Regenerate placeholder SVG covers in `public/images` from the mock data |

## Configuration

Branding, navigation and links live in `src/config/site.ts`. Environment variables (see `.env.example`):

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Canonical URL for metadata, sitemap and Open Graph |
| `NEXT_PUBLIC_SAMPLE_CONTENT` | `true` (default): show sample notices, withhold article structured data, block crawlers. Set `false` only after real content replaces the mocks. |
| `NEXT_PUBLIC_SOCIAL_YOUTUBE` / `_INSTAGRAM` / `_X` | Official account URLs. Empty shows a "coming soon" state. |
| `NEXT_PUBLIC_CONTACT_FORM_ENDPOINT` | Optional external form service. Empty means the form validates but clearly says it can't send yet. |
| `NEXT_PUBLIC_API_BASE_URL` | Reserved for the Phase 2 backend. Unused now. |

Brand colours and fonts are tokens at the top of `src/app/globals.css` and in `src/app/layout.tsx`.

## Project structure

```text
src/
  app/                  Routes (App Router), sitemap.ts, robots.ts, opengraph-image.tsx
  components/
    layout/             Header, mobile menu, footer, nav, header search
    article/            Cards, grid, typed body renderer, filter/sort/load-more browser
    video/              Video card, click-to-load YouTube player
    search/             Search page view
    contact/            Contact form
    common/             Badges, cover image with fallback, social links, notices, empty states
  config/site.ts        Publication settings
  data/                 Mock articles, authors, categories, videos (SAMPLE CONTENT)
  lib/
    repository.ts       ContentRepository interface (the content contract)
    mock-repository.ts  Phase 1 implementation over src/data
    content.ts          Active repository + derived queries (related, trending, by type)
    search.ts           Client-side search, filter and sort
    seo.ts              Metadata builder and article JSON-LD
    youtube.ts          YouTube id/URL validation and embed URL helper
  types/                Article, Author, Category, Video, ContentBlock
scripts/                Placeholder image generator
```

## Routes

`/`, `/articles`, `/articles/[slug]`, `/category/[slug]`, `/analysis`, `/videos`, `/videos/[slug]`, `/search?q=`,
`/about`, `/contact`, `/privacy-policy`, `/terms`, plus a custom 404. Dynamic routes are generated from the data with
`generateStaticParams` and `dynamicParams = false`, so unknown slugs return the 404 page.

## Content

- **Articles** use typed `content` blocks (`paragraph`, `heading`, `list`, `quote`, `fact`, `statement`) instead of HTML.
  `fact` blocks render as "Reported fact" with an optional source; `statement` blocks render as "Attributed statement" with
  the speaker. Every article is labelled News, Analysis or Opinion, and analysis/opinion pages carry an explanatory note.
- Only `status: "published"` articles are shown. `art-014` is a draft kept to prove that.
- **Videos**: set `youtubeVideoId` to an 11-character id or any YouTube URL. Empty or invalid values show a
  "not linked yet" fallback. The iframe loads only after the reader presses play (privacy-enhanced domain, no autoplay on load).
- **Images**: demo photos in `public/images/articles` and `public/images/videos` are from Wikimedia Commons under
  CC BY / CC BY-SA / public-domain licences. Their credits live in `src/data/image-credits.ts` and must stay visible
  (caption on article and video pages, plus `/credits`) for as long as the photos are used. They only illustrate the topic.
  When replacing a photo with the publication's own, overwrite the `.jpg`, update `coverAlt`, and remove or change its
  credit entry. Broken images fall back to `public/images/fallback.svg`; `npm run placeholders` makes SVG covers for
  any mock slug without a photo.

All current articles, authors and videos are fictional samples. Before launch, replace them with real, edited content and
real contributor bios, then set `NEXT_PUBLIC_SAMPLE_CONTENT=false`.

## Connecting the backend (Phase 2)

Pages read content only through `repository` in `src/lib/content.ts`. To move to Django REST Framework:

1. Add `src/lib/api-repository.ts` implementing `ContentRepository`, reading `NEXT_PUBLIC_API_BASE_URL` (or a server-only variable).
2. Map API responses to the types in `src/types`.
3. Change the one assignment in `src/lib/content.ts`.
4. For content that changes after build, add `export const revalidate = <seconds>` to the routes (ISR) or switch
   `dynamicParams` to `true` for slugs added after deploy.

No component changes are needed.

## Deployment (Vercel)

1. Push this repository to GitHub and import it in Vercel. Framework preset: Next.js; defaults for build (`npm run build`) and output.
2. Add the environment variables above in Project Settings.
3. Add `teakadaipolitics.com` and `www.teakadaipolitics.com` under Domains. Follow Vercel's DNS instructions at your
   registrar, pick one as primary and redirect the other.
4. Confirm HTTPS is issued, then smoke-test every route, the 404 page, search, filters, the contact form and external links.

The site has no server dependencies, so any host that runs `next start` works too. A fully static export
(`output: "export"`) is possible, but check the Next.js static export limitations first (e.g. the image optimiser).

## Launch checklist

- [ ] Real articles, authors, videos and images replace `src/data` and `public/images` (keep credits for any stock photo still used)
- [ ] Social URLs and contact email configured
- [ ] Privacy policy and terms reviewed and the draft notices removed
- [ ] `NEXT_PUBLIC_SAMPLE_CONTENT=false`
- [ ] `npm run build` passes; routes, links and embeds tested on mobile and desktop
