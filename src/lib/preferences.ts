/*
 * Reader preferences kept in localStorage: colour theme and article text size.
 * PREFERENCES_SCRIPT runs in <head> before the first paint so a dark-mode
 * reader never sees a white flash; the toggles below update the same keys.
 */
export const THEME_KEY = "tp-theme";
export const FONT_KEY = "tp-font";

export type Theme = "light" | "dark";
export type FontSize = "md" | "lg" | "xl";
export const FONT_SIZES: FontSize[] = ["md", "lg", "xl"];

export const PREFERENCES_SCRIPT = `(function(){try{
  var r=document.documentElement;
  var t=localStorage.getItem("${THEME_KEY}");if(t==="light"||t==="dark")r.setAttribute("data-theme",t);
  var f=localStorage.getItem("${FONT_KEY}");if(f==="lg"||f==="xl")r.setAttribute("data-font",f);
}catch(e){}})();`;

export function readStored<T extends string>(key: string, allowed: readonly T[]): T | null {
  try {
    const value = localStorage.getItem(key) as T | null;
    return value && allowed.includes(value) ? value : null;
  } catch {
    return null;
  }
}

export function store(key: string, value: string | null) {
  try {
    if (value === null) localStorage.removeItem(key);
    else localStorage.setItem(key, value);
  } catch {
    // Private mode or storage blocked: the choice just won't be remembered
  }
}
