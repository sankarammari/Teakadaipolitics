import type { CSSProperties } from "react";

export type AnimKind = "fade" | "fadeUp" | "foldLeft" | "drop" | "wipe" | "line" | "grow";

/**
 * Props that tag an element for the entrance animations in globals.css.
 * `delay` staggers siblings; the script in lib/scroll-animations.ts starts
 * each one when it scrolls into view.
 */
export function anim(kind: AnimKind, delay = 0, duration?: number) {
  const style: Record<string, string> = { "--anim-delay": `${delay}ms` };
  if (duration) style["--anim-duration"] = `${duration}ms`;
  return {
    "data-anim": kind,
    // The script adds data-anim-state before React hydrates
    suppressHydrationWarning: true,
    style: style as CSSProperties,
  };
}

/** Stagger helper for lists: 0, step, 2*step… wrapping every `perRow` items. */
export const stagger = (index: number, step = 90, perRow = 3) => (index % perRow) * step;
