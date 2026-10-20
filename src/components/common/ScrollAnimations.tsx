"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import "@/lib/scroll-animations";

// The animations are started by the inline script from
// lib/scroll-animations.ts as soon as a page's HTML loads. After a
// client-side navigation the new page's [data-anim] elements are new DOM
// nodes, so ask that script to scan for them again.
export function ScrollAnimations() {
  const pathname = usePathname();

  useEffect(() => {
    window.__tpAnimScan?.();
  }, [pathname]);

  return null;
}
