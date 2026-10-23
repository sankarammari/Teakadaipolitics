# Writing articles

Each article is one file in `content/articles/`. The file name is the web address:
`content/articles/chennai-rain-update.md` becomes `/articles/chennai-rain-update`.
Use lowercase English words joined by hyphens for file names.

Put the cover photo at `public/images/articles/<same-name>.jpg` (landscape, at least 1600 px wide).
If the photo is not your own, add its credit to `src/data/image-credits.ts`.

## Template

```markdown
---
title: "தலைப்பு இங்கே"
excerpt: "ஒன்று அல்லது இரண்டு வரிச் சுருக்கம்."
category: elections        # current-affairs, elections, government-policy,
                           # public-administration, economy, local-governance
contentType: news          # news, analysis or opinion
publishedAt: "2026-10-24T09:00:00+05:30"
featured: false            # true puts it in line for the homepage top story
trendingScore: 70          # higher numbers rank higher in "பெஞ்சு பேச்சு"
coverAlt: "படத்தில் என்ன இருக்கிறது என்ற விளக்கம்"
tags: [சென்னை, தேர்தல்]
sources:
  - label: "The Hindu: செய்தித் தலைப்பு"
    url: "https://..."
---
முதல் பத்தி. பத்திகளுக்கு இடையே ஒரு வெற்று வரி விடுங்கள்.

## துணைத் தலைப்பு

- புள்ளிப் பட்டியல்
- இன்னொரு புள்ளி

> [!fact] உறுதிசெய்யப்பட்ட தகவல் இங்கே.
> source: ஆதாரத்தின் பெயர் | https://...

> [!statement] ஒருவர் சொன்னது இங்கே.
> speaker: பெயர்
> role: பதவி
> source: ஆதாரத்தின் பெயர் | https://...

> மேற்கோள் வாக்கியம்.
> — மேற்கோள் யாருடையது
```

Optional: `updatedAt`, `status: draft` (hides the article), `readingTime` (worked out automatically
if left out).

## Charts and timelines

A bar chart, drawn and animated on the page:

````markdown
```chart
{
  "title": "யூனிட் மின்சார விலை (₹)",
  "unit": "₹",
  "bars": [
    { "label": "தமிழ்நாடு", "value": 37, "display": "₹32–37", "highlight": true },
    { "label": "ஆந்திரப் பிரதேசம்", "value": 20, "display": "₹16–20" }
  ],
  "note": "விளக்கக் குறிப்பு (விருப்பம்)",
  "source": { "label": "The News Minute", "url": "https://..." }
}
```
````

A timeline (a `###` heading right above it becomes its title):

````markdown
### நடந்தது என்ன?

```timeline
3 அக்டோபர் | முதல் நிகழ்வு
10 அக்டோபர் | அடுத்த நிகழ்வு
```
````

Run `npm run build` after adding an article. A missing field or an unknown category stops the build
with a message naming the file.
