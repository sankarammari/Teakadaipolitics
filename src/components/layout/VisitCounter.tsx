"use client";

import { Eye } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const numberFormat = new Intl.NumberFormat("en-IN");

/**
 * "Total Visitors" in the footer. Each page view (including client-side
 * navigation) adds one through /api/visits, then the number counts up to the
 * new total. Automated browsers are not counted.
 */
export function VisitCounter() {
  const pathname = usePathname();
  const [total, setTotal] = useState<number | null>(null);
  const [shown, setShown] = useState(0);
  const counted = useRef<string | null>(null);

  useEffect(() => {
    // Guard against React running the effect twice for the same page
    if (counted.current === pathname) return;
    counted.current = pathname;
    const method = navigator.webdriver ? "GET" : "POST";
    fetch("/api/visits", { method, cache: "no-store" })
      .then((r) => (r.ok ? r.json() : null))
      .then((d: { count?: number } | null) => {
        if (typeof d?.count === "number") setTotal(d.count);
      })
      .catch(() => {});
  }, [pathname]);

  // Count up from the previous number to the new total
  useEffect(() => {
    if (total === null) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const from = shown;
    if (reduce || from === total) {
      setShown(total);
      return;
    }
    const start = performance.now();
    const duration = from === 0 ? 1400 : 600;
    let frame = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setShown(Math.round(from + (total - from) * eased));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- animate only when the total changes
  }, [total]);

  if (total === null) return null;

  return (
    <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-sm text-paper/80">
      <Eye className="size-4 text-amber" aria-hidden />
      <span>Total Visitors</span>
      <span className="font-brand text-base font-bold tabular-nums tracking-wide text-amber [font-stretch:85%]">
        {numberFormat.format(shown)}
      </span>
    </p>
  );
}
