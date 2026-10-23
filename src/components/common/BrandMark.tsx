import Image from "next/image";
import { siteConfig } from "@/config/site";

interface BrandMarkProps {
  size?: "lg" | "md" | "sm";
  tone?: "light" | "dark";
  priority?: boolean;
}

const sizes = {
  lg: { logo: "size-14 sm:size-[4.25rem] md:size-20", top: "text-[1.55rem] sm:text-[1.9rem] md:text-[2.3rem]", bottom: "text-[0.72rem] sm:text-[0.82rem] md:text-[0.95rem]", px: 80 },
  md: { logo: "size-16", top: "text-[1.8rem]", bottom: "text-[0.85rem]", px: 64 },
  sm: { logo: "size-8", top: "text-[1.05rem]", bottom: "text-[0.5rem]", px: 32 },
};

/**
 * Round logo + stacked English wordmark. The wordmark echoes the logo's
 * heavy condensed lettering in a cleaner, modern cut (Archivo, narrow width).
 */
export function BrandMark({ size = "lg", tone = "light", priority = false }: BrandMarkProps) {
  const s = sizes[size];
  const dark = tone === "dark";
  return (
    <span className="group/brand flex items-center gap-2.5 sm:gap-3">
      <Image
        src={siteConfig.logo}
        alt=""
        width={s.px}
        height={s.px}
        priority={priority}
        quality={90}
        className={`${s.logo} shrink-0 rounded-full shadow-[0_4px_14px_-6px_rgb(0_0_0/0.55)] ring-2 ${
          dark ? "ring-amber/60" : "ring-amber"
        } transition-transform duration-500 ease-out group-hover/brand:-rotate-6 group-hover/brand:scale-105`}
      />
      <span className="flex flex-col leading-none">
        <span
          className={`font-brand font-black uppercase tracking-[-0.01em] [font-stretch:72%] ${s.top} ${
            dark ? "text-on-night" : "text-ink"
          }`}
        >
          Teakadai
        </span>
        <span
          className={`mt-[0.18em] font-brand font-bold uppercase tracking-[0.42em] [font-stretch:80%] ${s.bottom} ${
            dark ? "text-amber" : "text-tea"
          }`}
        >
          Politics
        </span>
      </span>
    </span>
  );
}
