import { ExternalLink, FileCheck2, MessageSquareQuote } from "lucide-react";
import type { ContentBlock, SourceLink } from "@/types";

function Source({ source }: { source: SourceLink }) {
  return (
    <a
      href={source.url}
      target="_blank"
      rel="noopener noreferrer"
      className="mt-1.5 inline-flex items-center gap-1 font-sans text-sm text-ink-soft underline underline-offset-2 hover:text-ink"
    >
      Source: {source.label}
      <ExternalLink className="size-3.5" aria-hidden />
      <span className="sr-only">(opens in a new tab)</span>
    </a>
  );
}

/**
 * Renders typed article blocks. Reported facts and attributed statements get
 * their own treatment so readers can tell them apart from the writer's voice.
 */
export function ArticleBody({ blocks }: { blocks: ContentBlock[] }) {
  return (
    <div className="prose-body space-y-6">
      {blocks.map((block, i) => {
        switch (block.type) {
          case "paragraph":
            return <p key={i}>{block.text}</p>;

          case "heading":
            return block.level === 2 ? (
              <h2 key={i} className="headline pt-4 font-sans text-[1.9rem]">
                {block.text}
              </h2>
            ) : (
              <h3 key={i} className="headline pt-2 font-sans text-[1.45rem]">
                {block.text}
              </h3>
            );

          case "list": {
            const List = block.ordered ? "ol" : "ul";
            return (
              <List
                key={i}
                className={`space-y-2 pl-6 marker:text-tea ${block.ordered ? "list-decimal" : "list-disc"}`}
              >
                {block.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </List>
            );
          }

          case "quote":
            return (
              <figure key={i} className="py-2">
                <blockquote className="headline font-sans text-[1.9rem] text-tea">“{block.text}”</blockquote>
                {block.attribution && (
                  <figcaption className="mt-2 font-sans text-sm text-ink-soft">{block.attribution}</figcaption>
                )}
              </figure>
            );

          case "fact":
            return (
              <aside key={i} aria-label="Reported fact" className="rounded-md border-l-4 border-news bg-white px-5 py-4">
                <p className="flex items-center gap-1.5 font-sans text-sm font-bold text-news">
                  <FileCheck2 className="size-4" aria-hidden /> Reported fact
                </p>
                <p className="mt-1.5">{block.text}</p>
                {block.source && <Source source={block.source} />}
              </aside>
            );

          case "statement":
            return (
              <figure key={i} className="rounded-md border-l-4 border-ink-soft bg-white px-5 py-4">
                <p className="flex items-center gap-1.5 font-sans text-sm font-bold text-ink-soft">
                  <MessageSquareQuote className="size-4" aria-hidden /> Attributed statement
                </p>
                <blockquote className="mt-1.5 italic">“{block.text}”</blockquote>
                <figcaption className="mt-2 font-sans text-sm">
                  <span className="font-semibold">{block.speaker}</span>
                  {block.role && <span className="text-ink-soft">, {block.role}</span>}
                </figcaption>
                {block.source && <Source source={block.source} />}
              </figure>
            );
        }
      })}
    </div>
  );
}
