import { ExternalLink } from "lucide-react";
import { anim } from "@/lib/anim";
import type { ContentBlock } from "@/types";

type Chart = Extract<ContentBlock, { type: "chart" }>;

function Bar({ width, delay, highlight }: { width: number; delay: number; highlight?: boolean }) {
  const grow = anim("grow", delay, 1100);
  return (
    <div
      {...grow}
      style={{ ...grow.style, width: `${width}%` }}
      className={`h-full rounded-full ${highlight ? "bg-tea" : "bg-night-soft/60"}`}
    />
  );
}

/** Horizontal bar chart. Bars grow from the left each time the chart scrolls into view. */
export function ChartBlock({ chart }: { chart: Chart }) {
  const max = Math.max(...chart.bars.map((b) => b.value), 1);
  return (
    <figure className="rounded-xl border border-rule bg-card p-5 font-sans sm:p-6">
      <figcaption className="headline text-[1.2rem]">{chart.title}</figcaption>
      <ul className="mt-5 space-y-4">
        {chart.bars.map((bar, i) => (
          <li key={bar.label}>
            <div className="mb-1.5 flex items-baseline justify-between gap-3 text-sm">
              <span className={bar.highlight ? "font-bold text-ink" : "text-ink-soft"}>{bar.label}</span>
              <span className={`tabular-nums ${bar.highlight ? "font-bold text-tea" : "text-ink-soft"}`}>
                {bar.display ?? `${chart.unit ?? ""}${bar.value.toLocaleString("en-IN")}`}
              </span>
            </div>
            <div className="h-3 overflow-hidden rounded-full bg-paper-deep">
              <Bar width={(bar.value / max) * 100} delay={150 + i * 140} highlight={bar.highlight} />
            </div>
          </li>
        ))}
      </ul>
      {(chart.note || chart.source) && (
        <div className="mt-4 space-y-1 text-xs text-ink-soft">
          {chart.note && <p>{chart.note}</p>}
          {chart.source && (
            <a
              href={chart.source.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 underline underline-offset-2 hover:text-ink"
            >
              ஆதாரம்: {chart.source.label}
              <ExternalLink className="size-3" aria-hidden />
              <span className="sr-only">(புதிய தாவலில் திறக்கும்)</span>
            </a>
          )}
        </div>
      )}
    </figure>
  );
}
