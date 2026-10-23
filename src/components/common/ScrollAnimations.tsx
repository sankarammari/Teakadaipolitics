"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import "@/lib/scroll-animations";

// The animations are started by the inline script from
// lib/scroll-animations.ts as soon as a page's HTML loads. Once React has
// hydrated, children of [data-anim-children] can be tagged safely; after a
// client-side navigation the new page's nodes are scanned again.
export function ScrollAnimations() {
  const pathname = usePathname();

  useEffect(() => {
    window.__tpHydrated = true;
    window.__tpTagChildren?.();
    window.__tpAnimScan?.();
  }, [pathname]);

  return null;
}
