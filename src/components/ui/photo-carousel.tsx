"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/cn";
import { Photo } from "./photo";
import type { SiteImage } from "@/content/images";

const SIZES = "(min-width: 768px) 33vw, 100vw";

/**
 * A cycling set of photographs in one cell's footprint — arrows and dots
 * rather than the fanned pile this replaced. Both controls stay visible
 * unconditionally (no hover-gating): a hover-only affordance is invisible on
 * touch, which was the exact bug the fan version had before it grew a click
 * handler.
 *
 * `caption`, if given, is a fixed label for the whole set — e.g. "The team"
 * when every slide is the same group of people. Leave it unset and each
 * slide falls back to its own `image.caption` instead, for a set where the
 * photos are of different things. Either way it's rendered top-left, never
 * bottom, so it can't collide with the dots — a per-slide `Photo` caption
 * rendered at the bottom (its default position) would.
 */
export function PhotoCarousel({
  images,
  caption,
  ariaLabel = "Photographs",
  className,
  priority,
}: {
  images: SiteImage[];
  caption?: string;
  ariaLabel?: string;
  className?: string;
  priority?: boolean;
}) {
  const [index, setIndex] = useState(0);
  const go = (delta: number) => setIndex((i) => (i + delta + images.length) % images.length);
  const label = caption ?? images[index].caption;

  return (
    <div
      className={cn("group relative aspect-[3/2] w-full", className)}
      role="region"
      aria-roledescription="carousel"
      aria-label={ariaLabel}
    >
      <Photo image={images[index]} sizes={SIZES} className="h-full" priority={priority} />

      {label && (
        <span className="eyebrow pointer-events-none absolute left-3 top-3 z-10 rounded-full bg-black/55 px-2.5 py-1 text-[11px] text-white backdrop-blur-sm">
          {label}
        </span>
      )}

      {images.length > 1 && (
        <>
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Previous photo"
            className="absolute left-2 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-black/45 text-white backdrop-blur-sm transition-colors hover:bg-black/65"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Next photo"
            className="absolute right-2 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-black/45 text-white backdrop-blur-sm transition-colors hover:bg-black/65"
          >
            <ChevronRight className="h-4 w-4" />
          </button>

          <div className="absolute inset-x-0 bottom-3 z-10 flex items-center justify-center gap-1.5">
            {images.map((image, i) => (
              <button
                key={image.src}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Go to photo ${i + 1}`}
                aria-current={i === index}
                className={cn(
                  "h-1.5 rounded-full transition-all",
                  i === index ? "w-4 bg-white" : "w-1.5 bg-white/50 hover:bg-white/75",
                )}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
