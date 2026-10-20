// Generates placeholder SVG covers for mock-data slugs that have no photo yet.
// Run with `npm run placeholders` after adding mock articles or videos.
// Real images can replace any file in public/images without code changes.
import { existsSync, readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

const palette = {
  "current-affairs": ["#1F3F6E", "#C9D6EA"],
  elections: ["#5A2A3A", "#EBCFD6"],
  "government-policy": ["#1E5A45", "#CDE5DA"],
  "public-administration": ["#3B4656", "#D6DCE4"],
  economy: ["#7A4A10", "#F0DEC2"],
  "local-governance": ["#2F5560", "#CFE2E6"],
};

function hash(str) {
  let h = 2166136261;
  for (const ch of str) h = Math.imul(h ^ ch.charCodeAt(0), 16777619);
  return h >>> 0;
}

function cover(slug, category, width, height) {
  const [dark, light] = palette[category] ?? ["#2B3442", "#D9DDE3"];
  let seed = hash(slug);
  const rand = () => ((seed = Math.imul(seed ^ (seed >>> 15), 2246822507) >>> 0) % 1000) / 1000;

  // Kolam-style dot grid
  const gap = 46;
  let dots = "";
  for (let x = gap / 2; x < width; x += gap) {
    for (let y = gap / 2; y < height; y += gap) {
      dots += `<circle cx="${x}" cy="${y}" r="2.4"/>`;
    }
  }

  // Overlapping "tea-glass rings"
  let rings = "";
  const count = 2 + Math.floor(rand() * 3);
  for (let i = 0; i < count; i++) {
    const cx = Math.round(width * (0.2 + rand() * 0.7));
    const cy = Math.round(height * (0.2 + rand() * 0.6));
    const r = Math.round(Math.min(width, height) * (0.14 + rand() * 0.22));
    rings += `<circle cx="${cx}" cy="${cy}" r="${r}" stroke-width="${10 + Math.round(rand() * 14)}"/>`;
  }

  const barY = Math.round(height * (0.55 + rand() * 0.25));
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}">
<rect width="100%" height="100%" fill="${dark}"/>
<g fill="${light}" opacity=".22">${dots}</g>
<g fill="none" stroke="${light}" opacity=".55">${rings}</g>
<rect x="0" y="${barY}" width="${width}" height="${Math.round(height * 0.04)}" fill="#C98A3A" opacity=".85"/>
</svg>
`;
}

function entries(file) {
  const src = readFileSync(join(root, "src/data", file), "utf8");
  const out = [];
  const re = /slug:\s*"([^"]+)"[\s\S]*?category:\s*"([^"]+)"/g;
  let m;
  while ((m = re.exec(src))) out.push({ slug: m[1], category: m[2] });
  return out;
}

const jobs = [
  { file: "articles.ts", dir: "public/images/articles", w: 1200, h: 750 },
  { file: "videos.ts", dir: "public/images/videos", w: 1280, h: 720 },
];

for (const { file, dir, w, h } of jobs) {
  mkdirSync(join(root, dir), { recursive: true });
  for (const { slug, category } of entries(file)) {
    if (existsSync(join(root, dir, `${slug}.jpg`))) continue;
    writeFileSync(join(root, dir, `${slug}.svg`), cover(slug, category, w, h));
  }
}

// Generic fallback used when an image fails to load
writeFileSync(join(root, "public/images/fallback.svg"), cover("fallback", "none", 1200, 750));
console.log("Placeholders written.");
