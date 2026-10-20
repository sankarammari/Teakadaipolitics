import { ExternalLink, FileCheck2, MessageSquareQuote } from "lucide-react";
import { anim } from "@/lib/anim";
import type { ContentBlock, SourceLink } from "@/types";

function Source({ source }: { source: SourceLink }) {
  return (
    <a
      href={source.url}
      target="_blank"
      rel="noopener noreferrer"
      className="mt-1.5 inline-flex items-center gap-1 font-sans text-sm text-ink-soft underline underline-offset-2 hover:text-ink"
    >
      ஆதாரம்: {source.label}
      <ExternalLink className="size-3.5" aria-hidden />
      <span className="sr-only">(புதிய தாவலில் திறக்கும்)</span>
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
      {blocks.map((block, i) => (
        // Each block rises gently as the reader scrolls to it
        <div key={i} {...anim("fadeUp", 0, 700)} className="[--anim-distance:16px]">
          {renderBlock(block)}
        </div>
      ))}
    </div>
  );
}

function renderBlock(block: ContentBlock) {
  switch (block.type) {
    case "paragraph":
      return <p>{block.text}</p>;

    case "heading":
      return block.level === 2 ? (
        <h2 className="headline pt-4 font-sans text-[1.6rem]">
          {block.text}
        </h2>
      ) : (
        <h3 className="headline pt-2 font-sans text-[1.3rem]">
          {block.text}
        </h3>
      );

    case "list": {
      const List = block.ordered ? "ol" : "ul";
      return (
        <List
         
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
        <figure className="py-2">
          <blockquote className="headline font-sans text-[1.55rem] text-tea">“{block.text}”</blockquote>
          {block.attribution && (
            <figcaption className="mt-2 font-sans text-sm text-ink-soft">{block.attribution}</figcaption>
          )}
        </figure>
      );

    case "fact":
      return (
        <aside aria-label="உறுதிசெய்யப்பட்ட தகவல்" className="rounded-md border-l-4 border-news bg-white px-5 py-4">
          <p className="flex items-center gap-1.5 font-sans text-sm font-bold text-news">
            <FileCheck2 className="size-4" aria-hidden /> உறுதிசெய்யப்பட்ட தகவல்
          </p>
          <p className="mt-1.5">{block.text}</p>
          {block.source && <Source source={block.source} />}
        </aside>
      );

    case "statement":
      return (
        <figure className="rounded-md border-l-4 border-ink-soft bg-white px-5 py-4">
          <p className="flex items-center gap-1.5 font-sans text-sm font-bold text-ink-soft">
            <MessageSquareQuote className="size-4" aria-hidden /> கூறியவர் பெயருடன் மேற்கோள்
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
}
