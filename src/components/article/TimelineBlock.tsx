import { anim } from "@/lib/anim";
import type { ContentBlock } from "@/types";

type Timeline = Extract<ContentBlock, { type: "timeline" }>;

/** Vertical timeline; each point drops in after the one before it. */
export function TimelineBlock({ timeline }: { timeline: Timeline }) {
  return (
    <section className="rounded-xl bg-tea-light/60 p-5 font-sans sm:p-6">
      {timeline.title && <h3 className="headline text-[1.25rem]">{timeline.title}</h3>}
      <ol className="relative mt-4 space-y-5 border-l-2 border-tea/40 pl-6">
        {timeline.items.map((item, i) => (
          <li key={`${item.date}-${i}`} {...anim("fadeUp", i * 120, 700)} className="relative">
            <span
              aria-hidden
              className="absolute -left-[calc(1.5rem+7px)] top-1.5 size-3 rounded-full border-2 border-paper bg-tea ring-2 ring-tea/30"
            />
            <p className="text-sm font-bold text-tea">{item.date}</p>
            <p className="mt-0.5 font-serif leading-relaxed">{item.text}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
