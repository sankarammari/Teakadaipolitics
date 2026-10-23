"use client";

import { useEffect, useState } from "react";
import { FONT_KEY, FONT_SIZES, readStored, store, type FontSize } from "@/lib/preferences";

/** அ- / அ+ : steps the article text size and remembers it for this browser. */
export function FontSizeControl() {
  const [size, setSize] = useState<FontSize>("md");

  useEffect(() => {
    setSize(readStored(FONT_KEY, FONT_SIZES) ?? "md");
  }, []);

  const apply = (next: FontSize) => {
    if (next === "md") document.documentElement.removeAttribute("data-font");
    else document.documentElement.setAttribute("data-font", next);
    store(FONT_KEY, next === "md" ? null : next);
    setSize(next);
  };

  const i = FONT_SIZES.indexOf(size);
  const btn =
    "grid h-8 min-w-9 place-items-center px-2 font-semibold text-ink transition-colors hover:bg-paper-deep disabled:opacity-35 disabled:hover:bg-transparent";

  return (
    <div role="group" aria-label="எழுத்து அளவு" className="inline-flex items-center overflow-hidden rounded-full border border-rule bg-card">
      <button type="button" className={`${btn} text-sm`} disabled={i === 0} onClick={() => apply(FONT_SIZES[i - 1])}>
        அ<span aria-hidden>−</span>
        <span className="sr-only">எழுத்தைச் சிறிதாக்கு</span>
      </button>
      <span aria-hidden className="h-5 w-px bg-rule" />
      <button type="button" className={`${btn} text-base`} disabled={i === FONT_SIZES.length - 1} onClick={() => apply(FONT_SIZES[i + 1])}>
        அ<span aria-hidden>+</span>
        <span className="sr-only">எழுத்தைப் பெரிதாக்கு</span>
      </button>
    </div>
  );
}
