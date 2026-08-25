import { cn } from "@/lib/cn";
import { Photo } from "./photo";
import type { SiteImage } from "@/content/images";

/**
 * A fanned pile of photographs occupying one cell. Three team shots in the
 * footprint of one — they splay apart on hover.
 *
 * Transforms come from CSS custom properties rather than Tailwind variants
 * because each card needs its own pair of values, and `group-hover:` cannot
 * take a per-instance arbitrary transform. The paired rules live in
 * globals.css next to the other component CSS.
 *
 * Cards are inset so the rotated corners stay inside the cell — the parent
 * would otherwise need `overflow-visible` and would collide with its
 * neighbour in the grid.
 */
const LAYERS = [
  { rest: "rotate(-6deg) translate(-3%, 1.5%)", hover: "rotate(-11deg) translate(-5%, 2.5%)" },
  { rest: "rotate(4.5deg) translate(3%, 0.5%)", hover: "rotate(8.5deg) translate(5%, 1.5%)" },
  { rest: "rotate(0deg)", hover: "rotate(0deg) translateY(-2.5%)" },
];

export function PhotoStack({
  images,
  className,
}: {
  images: SiteImage[];
  className?: string;
}) {
  // Rendered back-to-front, so images[0] ends up on top of the pile.
  const ordered = images.slice(0, LAYERS.length).reverse();

  return (
    <div className={cn("photo-stack relative", className)}>
      {ordered.map((image, i) => (
        <div
          key={image.src}
          className="photo-stack__card absolute inset-[5%]"
          style={
            {
              "--rest": LAYERS[i].rest,
              "--hover": LAYERS[i].hover,
              zIndex: i,
            } as React.CSSProperties
          }
        >
          <Photo
            image={image}
            sizes="(min-width: 768px) 45vw, 100vw"
            className="shadow-lg ring-1 ring-black/10"
          />
        </div>
      ))}
    </div>
  );
}
