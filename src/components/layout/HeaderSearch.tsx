import { Search } from "lucide-react";

/** Plain GET form, so search works even before JavaScript loads. */
export function HeaderSearch({ id = "header-search" }: { id?: string }) {
  return (
    <form action="/search" method="get" role="search" className="relative flex items-center">
      <label htmlFor={id} className="sr-only">
        கட்டுரைகளைத் தேடுங்கள்
      </label>
      <input
        id={id}
        name="q"
        type="search"
        placeholder="தேடுங்கள்"
        className="w-full rounded-full border border-rule bg-card py-1.5 pl-4 pr-10 text-sm placeholder:text-ink-soft/70 focus:border-ink md:w-52"
      />
      <button
        type="submit"
        className="absolute right-1 grid size-8 place-items-center rounded-full text-ink-soft hover:text-ink"
        aria-label="தேடு"
      >
        <Search className="size-4" aria-hidden />
      </button>
    </form>
  );
}
