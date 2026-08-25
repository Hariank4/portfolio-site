"use client";

import { useState } from "react";
import { Plus, X } from "lucide-react";
import { cn } from "@/lib/cn";
import { Photo } from "./photo";
import type { SiteImage } from "@/content/images";

/**
 * A fanned pile of photographs occupying one cell — three team shots in the
 * footprint of one. Hovering splays them; clicking unfolds the pile into a
 * full column.
 *
 * The collapsed pile is a real <button>, which is what makes it work on touch
 * (there is no hover there, so a hover-only affordance would be invisible on a
 * phone) and reachable by keyboard.
 *
 * Transforms come from CSS custom properties rather than Tailwind variants
 * because each card needs its own pair of values, and `group-hover:` cannot
 * take a per-instance arbitrary transform. The paired rules live in globals.css
 * beside the other component CSS.
 */
const LAYERS = [
  { rest: "rotate(-6deg) translate(-3%, 1.5%)", hover: "rotate(-11deg) translate(-5%, 2.5%)" },
  { rest: "rotate(4.5deg) translate(3%, 0.5%)", hover: "rotate(8.5deg) translate(5%, 1.5%)" },
  { rest: "rotate(0deg)", hover: "rotate(0deg) translateY(-2.5%)" },
];

const SIZES = "(min-width: 768px) 45vw, 100vw";

export function PhotoStack({
  images,
  className,
}: {
  images: SiteImage[];
  className?: string;
}) {
  const [expanded, setExpanded] = useState(false);
  const shown = images.slice(0, LAYERS.length);

  if (expanded) {
    return (
      <div className={cn("flex flex-col gap-3", className)}>
        {shown.map((image) => (
          <Photo key={image.src} image={image} className="aspect-[3/2]" sizes={SIZES} />
        ))}
        <button
          type="button"
          onClick={() => setExpanded(false)}
          className="inline-flex items-center gap-1.5 self-start text-xs text-fg-muted transition-colors hover:text-accent"
        >
          <X className="h-3.5 w-3.5" />
          Collapse
        </button>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setExpanded(true)}
      aria-label={`Expand ${shown.length} team photographs`}
      className={cn(
        "photo-stack relative block aspect-[3/2] w-full cursor-pointer",
        className,
      )}
    >
      {/* Rendered back-to-front, so images[0] ends up on top of the pile.
          Cards are inset so the rotated corners stay inside the cell — the
          parent would otherwise need overflow-visible and would collide with
          its neighbour in the grid. */}
      {shown
        .slice()
        .reverse()
        .map((image, i) => (
          <span
            key={image.src}
            className="photo-stack__card absolute inset-[5%] block"
            style={
              {
                "--rest": LAYERS[i].rest,
                "--hover": LAYERS[i].hover,
                zIndex: i,
              } as React.CSSProperties
            }
          >
            <Photo image={image} sizes={SIZES} className="h-full shadow-lg ring-1 ring-black/10" />
          </span>
        ))}

      <span
        className="absolute right-3 top-3 z-10 inline-flex items-center gap-1 rounded-full bg-black/55 px-2.5 py-1 text-[11px] font-medium text-white backdrop-blur-sm"
        aria-hidden
      >
        <Plus className="h-3 w-3" />
        {shown.length - 1} more
      </span>
    </button>
  );
}
