"use client";

import { useSyncExternalStore } from "react";

/*
 * "Read later" list: article slugs kept in this browser's localStorage.
 * Every open tab and component stays in step through a window event and the
 * storage event (other tabs).
 */
const KEY = "tp-saved";
const EVENT = "tp-saved-change";
const EMPTY: string[] = [];

let cache: string[] | null = null;

function read(): string[] {
  if (cache) return cache;
  try {
    const parsed = JSON.parse(localStorage.getItem(KEY) ?? "[]");
    cache = Array.isArray(parsed) ? parsed.filter((s) => typeof s === "string") : [];
  } catch {
    cache = [];
  }
  return cache!;
}

function write(slugs: string[]) {
  cache = slugs;
  try {
    localStorage.setItem(KEY, JSON.stringify(slugs));
  } catch {
    // Storage blocked: keep the list for this page view only
  }
  window.dispatchEvent(new Event(EVENT));
}

function subscribe(onChange: () => void) {
  const onStorage = (e: StorageEvent) => {
    if (e.key === KEY) {
      cache = null;
      onChange();
    }
  };
  window.addEventListener(EVENT, onChange);
  window.addEventListener("storage", onStorage);
  return () => {
    window.removeEventListener(EVENT, onChange);
    window.removeEventListener("storage", onStorage);
  };
}

/** Saved slugs, newest first. Empty during server rendering. */
export function useSavedSlugs(): string[] {
  return useSyncExternalStore(subscribe, read, () => EMPTY);
}

export function toggleSaved(slug: string) {
  const current = read();
  write(current.includes(slug) ? current.filter((s) => s !== slug) : [slug, ...current]);
}
