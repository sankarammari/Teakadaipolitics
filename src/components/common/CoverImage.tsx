"use client";

import Image from "next/image";
import { useState } from "react";

interface CoverImageProps {
  src: string;
  alt: string;
  /** Tailwind aspect class, e.g. "aspect-[16/10]" */
  aspect?: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
}

const FALLBACK = "/images/fallback.svg";

/** Fixed-ratio image that swaps to a neutral placeholder if the source fails. */
export function CoverImage({
  src,
  alt,
  aspect = "aspect-[16/10]",
  sizes = "(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw",
  priority = false,
  className = "",
}: CoverImageProps) {
  const [current, setCurrent] = useState(src || FALLBACK);

  return (
    <div className={`relative overflow-hidden rounded-md bg-paper-deep ${aspect} ${className}`}>
      <Image
        src={current}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        // Local SVG placeholders don't need the optimiser; real photos will use it.
        unoptimized={current.endsWith(".svg")}
        className="object-cover"
        onError={() => current !== FALLBACK && setCurrent(FALLBACK)}
      />
    </div>
  );
}
