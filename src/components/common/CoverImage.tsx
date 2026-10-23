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
  /** Zoom the photo to 1.2x when the surrounding `.group` card is hovered. */
  hoverZoom?: boolean;
  /** Extra props for the frame, e.g. anim("wipe") */
  frameProps?: Record<string, unknown>;
}

const FALLBACK = "/images/fallback.svg";

/**
 * Fixed-ratio image that swaps to a neutral placeholder if the source fails.
 * Inside a `.group` card the photo zooms to 1.2x on hover (`.img-fx` in globals.css).
 */
export function CoverImage({
  src,
  alt,
  aspect = "aspect-[16/10]",
  sizes = "(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw",
  priority = false,
  className = "",
  hoverZoom = true,
  frameProps,
}: CoverImageProps) {
  const [current, setCurrent] = useState(src || FALLBACK);

  return (
    <div {...frameProps} className={`img-fx relative isolate overflow-hidden rounded-md bg-paper-deep ${aspect} ${className}`}>
      {/* Inner layer: a wipe animates this layer while the photo itself settles from its zoom */}
      <div className="absolute inset-0">
        <Image
          src={current}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          quality={85}
          // Local SVG placeholders don't need the optimiser; real photos will use it.
          unoptimized={current.endsWith(".svg")}
          // Bias the crop upwards so towers and rooflines aren't cut off
          className={`object-cover object-[50%_30%] ${
            hoverZoom ? "group-hover:scale-[1.2] group-focus-within:scale-[1.2]" : ""
          }`}
          onError={() => current !== FALLBACK && setCurrent(FALLBACK)}
        />
      </div>
    </div>
  );
}
