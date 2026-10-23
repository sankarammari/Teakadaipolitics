"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { readStored, store, THEME_KEY, type Theme } from "@/lib/preferences";

const systemTheme = (): Theme => (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");

/** Switches between light and dark. Follows the system setting until the reader picks one. */
export function ThemeToggle({ className = "" }: { className?: string }) {
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    setTheme(readStored(THEME_KEY, ["light", "dark"] as const) ?? systemTheme());
  }, []);

  const toggle = () => {
    const next: Theme = (theme ?? systemTheme()) === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    store(THEME_KEY, next);
    setTheme(next);
  };

  const dark = theme === "dark";
  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={theme ? dark : undefined}
      className={`grid size-10 place-items-center rounded-full border border-rule bg-card text-ink transition-transform hover:-translate-y-0.5 hover:border-ink ${className}`}
    >
      {/* Both icons render; CSS shows the one for the current theme, so the first paint is already right */}
      <Sun className="theme-icon-sun size-[1.1rem]" aria-hidden />
      <Moon className="theme-icon-moon size-[1.1rem]" aria-hidden />
      <span className="sr-only">{dark ? "வெளிர் நிறத் தோற்றத்துக்கு மாற்று" : "இருண்ட தோற்றத்துக்கு மாற்று"}</span>
    </button>
  );
}
