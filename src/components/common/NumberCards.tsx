"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { WeekNumber } from "@/data/numbers";

/** Counts from 0 to the figure each time the card scrolls into view. */
function CountUp({ item }: { item: WeekNumber }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(item.value);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    const run = () => {
      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / 1400);
        setValue(item.value * (1 - Math.pow(1 - t, 3)));
        if (t < 1) frame = requestAnimationFrame(tick);
      };
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(tick);
    };
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) run();
        else setValue(0);
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [item.value]);

  const text = value.toLocaleString("en-IN", {
    minimumFractionDigits: item.decimals ?? 0,
    maximumFractionDigits: item.decimals ?? 0,
  });
  return (
    <span ref={ref} className="tabular-nums">
      {item.prefix}
      {text}
      {item.suffix}
    </span>
  );
}

export function NumberCards({ items }: { items: WeekNumber[] }) {
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((item) => (
        <li key={item.articleSlug}>
          <Link
            href={`/articles/${item.articleSlug}`}
            className="card-lift group flex h-full flex-col rounded-xl border border-rule bg-card p-5 hover:border-tea"
          >
            <span className="font-brand text-[2.4rem] font-black leading-none text-tea [font-stretch:75%]">
              <CountUp item={item} />
            </span>
            <span className="mt-3 text-[0.95rem] leading-snug text-ink-soft">{item.label}</span>
            <span className="mt-auto pt-4 text-sm font-semibold text-ink group-hover:text-tea">
              முழு செய்தி <span aria-hidden className="inline-block transition-transform group-hover:translate-x-1">›</span>
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
