"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { BrandMark } from "@/components/common/BrandMark";
import { SocialLinks } from "@/components/common/SocialLinks";
import { HeaderSearch } from "./HeaderSearch";
import { isActive } from "./NavLinks";

interface NavItem {
  label: string;
  href: string;
}

export function MobileNav({ items }: { items: readonly NavItem[] }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // Close whenever the route changes
  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    panelRef.current?.querySelector<HTMLElement>("input, a")?.focus();
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
        return;
      }
      // Keep Tab focus inside the open menu
      if (e.key === "Tab" && panelRef.current) {
        const focusables = panelRef.current.querySelectorAll<HTMLElement>("a, button, input");
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls="mobile-nav"
        onClick={() => setOpen((v) => !v)}
        className="grid size-11 place-items-center rounded-full border border-rule bg-card text-ink"
      >
        <Menu className="size-5" aria-hidden />
        <span className="sr-only">மெனுவைத் திற</span>
      </button>

      {open && (
        <div
          ref={panelRef}
          id="mobile-nav"
          role="dialog"
          aria-modal="true"
          aria-label="மெனு"
          className="fixed inset-0 z-40 overflow-y-auto bg-paper"
        >
          <div className="container-page flex items-center justify-between pt-5">
            <BrandMark size="sm" />
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                buttonRef.current?.focus();
              }}
              className="grid size-11 place-items-center rounded-full border border-rule bg-card text-ink"
            >
              <X className="size-5" aria-hidden />
              <span className="sr-only">மெனுவை மூடு</span>
            </button>
          </div>
          <nav aria-label="மொபைல் வழிசெலுத்தல்" className="container-page py-5">
            <HeaderSearch id="mobile-search" />
            <ul className="mt-5 divide-y divide-rule border-y border-rule">
              {items.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive(pathname, item.href) ? "page" : undefined}
                    className="headline block py-3.5 text-2xl aria-[current=page]:text-tea"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <SocialLinks />
            </div>
            <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm text-ink-soft">
              <li><Link href="/about" className="link-quiet">எங்களைப் பற்றி</Link></li>
              <li><Link href="/contact" className="link-quiet">தொடர்புக்கு</Link></li>
            </ul>
          </nav>
        </div>
      )}
    </div>
  );
}
