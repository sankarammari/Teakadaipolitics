import type { ContentBlock, SourceLink } from "@/types";

/*
 * Article body format (see content/README.md):
 *
 *   ## Heading / ### Subheading
 *   Plain paragraphs, separated by a blank line
 *   - bullet list        1. numbered list
 *   > A pull quote
 *   > — Attribution
 *   > [!fact] A reported fact
 *   > source: Label | https://link
 *   > [!statement] What someone said
 *   > speaker: Name
 *   > role: Position (optional)
 *   > source: Label | https://link (optional)
 *   ```chart   { "title": "...", "unit": "₹", "bars": [{ "label": "...", "value": 12 }] }   ```
 *   ```timeline   2026-10-03 | What happened   ```
 */

const parseSource = (value: string): SourceLink | undefined => {
  const [label, url] = value.split("|").map((s) => s.trim());
  return label && url ? { label, url } : undefined;
};

function parseQuote(lines: string[]): ContentBlock {
  const first = lines[0] ?? "";
  const fields: Record<string, string> = {};
  const text: string[] = [];
  let attribution: string | undefined;

  const kind = first.match(/^\[!(fact|statement)\]\s*/i)?.[1]?.toLowerCase();
  const body = kind ? [first.replace(/^\[!(fact|statement)\]\s*/i, ""), ...lines.slice(1)] : lines;

  for (const line of body) {
    const field = line.match(/^(source|speaker|role):\s*(.+)$/i);
    if (field) fields[field[1].toLowerCase()] = field[2].trim();
    else if (/^[—–-]\s+/.test(line) && !kind) attribution = line.replace(/^[—–-]\s+/, "");
    else if (line.trim()) text.push(line.trim());
  }
  const joined = text.join(" ");

  if (kind === "fact") return { type: "fact", text: joined, source: fields.source ? parseSource(fields.source) : undefined };
  if (kind === "statement") {
    return {
      type: "statement",
      text: joined,
      speaker: fields.speaker ?? "",
      role: fields.role,
      source: fields.source ? parseSource(fields.source) : undefined,
    };
  }
  return { type: "quote", text: joined, attribution };
}

function parseFence(kind: string, raw: string, where: string): ContentBlock {
  if (kind === "chart") {
    try {
      const data = JSON.parse(raw);
      return { type: "chart", ...data };
    } catch {
      throw new Error(`Invalid chart JSON in ${where}`);
    }
  }
  if (kind === "timeline") {
    const items = raw
      .split("\n")
      .map((l) => l.trim())
      .filter(Boolean)
      .map((l) => {
        const [date, ...rest] = l.split("|");
        return { date: date.trim(), text: rest.join("|").trim() };
      });
    return { type: "timeline", items };
  }
  throw new Error(`Unknown block \`\`\`${kind} in ${where}`);
}

/** Turns an article's markdown body into typed content blocks. `where` names the file in errors. */
export function parseArticleBody(source: string, where = "article"): ContentBlock[] {
  const blocks: ContentBlock[] = [];
  const lines = source.replace(/\r\n/g, "\n").split("\n");
  let paragraph: string[] = [];

  const flushParagraph = () => {
    if (paragraph.length) blocks.push({ type: "paragraph", text: paragraph.join(" ").trim() });
    paragraph = [];
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    if (!trimmed) {
      flushParagraph();
      continue;
    }

    const fence = trimmed.match(/^```(\w+)/);
    if (fence) {
      flushParagraph();
      const body: string[] = [];
      for (i++; i < lines.length && !lines[i].trim().startsWith("```"); i++) body.push(lines[i]);
      const block = parseFence(fence[1], body.join("\n"), where);
      // A "### Title" directly above a timeline names it
      if (block.type === "timeline") {
        const prev = blocks[blocks.length - 1];
        if (prev?.type === "heading" && prev.level === 3) {
          blocks.pop();
          block.title = prev.text;
        }
      }
      blocks.push(block);
      continue;
    }

    const heading = trimmed.match(/^(#{2,3})\s+(.+)$/);
    if (heading) {
      flushParagraph();
      blocks.push({ type: "heading", level: heading[1].length as 2 | 3, text: heading[2].trim() });
      continue;
    }

    if (trimmed.startsWith(">")) {
      flushParagraph();
      const quote: string[] = [];
      for (; i < lines.length && lines[i].trim().startsWith(">"); i++) quote.push(lines[i].trim().replace(/^>\s?/, ""));
      i--;
      blocks.push(parseQuote(quote));
      continue;
    }

    const bullet = /^[-*]\s+/;
    const numbered = /^\d+[.)]\s+/;
    if (bullet.test(trimmed) || numbered.test(trimmed)) {
      flushParagraph();
      const ordered = numbered.test(trimmed);
      const pattern = ordered ? numbered : bullet;
      const items: string[] = [];
      for (; i < lines.length && pattern.test(lines[i].trim()); i++) items.push(lines[i].trim().replace(pattern, ""));
      i--;
      blocks.push({ type: "list", ordered: ordered || undefined, items });
      continue;
    }

    paragraph.push(trimmed);
  }
  flushParagraph();
  return blocks;
}

/** Rough reading time for Tamil text: about 140 words a minute, never under 2. */
export function estimateReadingTime(blocks: ContentBlock[]): number {
  const words = blocks
    .map((b) => ("text" in b ? b.text : "items" in b ? JSON.stringify(b.items) : ""))
    .join(" ")
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(2, Math.round(words / 140));
}
