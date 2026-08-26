"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/cn";
import { Photo } from "./photo";
import type { SiteImage } from "@/content/images";

/**
 * An auto-advancing carousel that slides horizontally.
 *
 * Every slide is a full-bleed `object-cover` fill — the sources in `public/`
 * are pre-cropped to the frame's aspect ratio, so nothing letterboxes and
 * nothing important is cut. That is a content job, not a CSS one: pick the
 * frame to suit the photographs rather than forcing mismatched shapes into a
 * shared box and hoping `contain` saves it.
 *
 * Controls stay visible instead of appearing on hover, because hover does not
 * exist on touch. Auto-advance pauses on hover and on keyboard focus, and is
 * off entirely under `prefers-reduced-motion` — an animation the reader cannot
 * stop is exactly what that setting exists to prevent.
 */
export function PhotoCarousel({
  images,
  caption,
  ariaLabel = "Photographs",
  className,
  frameClassName = "aspect-[3/2]",
  showDots = true,
  priority,
  interval = 5000,
}: {
  images: SiteImage[];
  /** Fixed label for every slide. Omit to use each image's own `caption`. */
  caption?: string;
  ariaLabel?: string;
  /** Outer wrapper: placement and width. Never the aspect ratio — the dots sit
      below the frame, and an aspect here would squeeze them inside it. */
  className?: string;
  /** The image frame itself: an aspect ratio, or `h-full` to fill a sized
      parent (a stretched grid cell, say). */
  frameClassName?: string;
  /** Off in a cell too small to give the dots their own row; the arrows still
      carry the affordance. */
  showDots?: boolean;
  priority?: boolean;
  interval?: number;
}) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduceMotion = useReducedMotion();

  const count = images.length;
  const go = (delta: number) => setIndex((i) => (i + delta + count) % count);

  useEffect(() => {
    if (paused || reduceMotion || count < 2) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % count), interval);
    return () => clearInterval(id);
  }, [paused, reduceMotion, count, interval]);

  return (
    <div
      className={cn("w-full", className)}
      role="region"
      aria-roledescription="carousel"
      aria-label={ariaLabel}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div
        className={cn(
          "relative overflow-hidden rounded-lg bg-bg-raised-2",
          frameClassName,
        )}
      >
        {/* One track translated by whole slides. Each slide is w-full and
            shrink-0, so the track is exactly count × 100% wide. */}
        <div
          className={cn(
            "flex h-full",
            !reduceMotion &&
              "transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
          )}
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {images.map((image, i) => (
            <div key={image.src} className="relative h-full w-full shrink-0">
              <Photo
                image={image}
                sizes="(min-width: 1024px) 1120px, 100vw"
                className="h-full w-full"
                priority={priority && i === 0}
                showCaption={false}
              />
              {(caption ?? image.caption) && (
                <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 via-black/35 to-transparent px-5 pb-4 pt-14">
                  <span className="eyebrow text-[11px] text-white">
                    {caption ?? image.caption}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>

        {count > 1 && (
          <>
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous photo"
              className="absolute left-3 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm transition-colors hover:bg-black/70"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next photo"
              className="absolute right-3 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm transition-colors hover:bg-black/70"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </>
        )}
      </div>

      {/* Dots sit below the frame rather than on it — inside, they would land
          on the caption scrim in the same corner of the image. */}
      {count > 1 && showDots && (
        <div className="mt-3 flex items-center justify-center gap-2">
          {images.map((image, i) => (
            <button
              key={image.src}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Go to photo ${i + 1}`}
              aria-current={i === index}
              className={cn(
                "h-1.5 rounded-full transition-all",
                i === index ? "w-6 bg-accent" : "w-1.5 bg-border-strong hover:bg-fg-faint",
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
}
