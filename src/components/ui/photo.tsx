import Image from "next/image";
import { cn } from "@/lib/cn";
import type { SiteImage } from "@/content/images";

/**
 * A single photograph in a fixed-size box. The parent decides the box — pass an
 * aspect ratio or a height through `className` — and the image covers it.
 *
 * Almost every photo on this site is a 3:4 portrait off a phone, so cropping is
 * the norm rather than the exception; `image.position` is how a subject that
 * isn't centred survives that crop.
 *
 * Deliberately no `h-full` here: an explicit height resolves against the grid
 * row even under `align-items: start`, so a tall sibling would stretch this and
 * `aspect-*` would then derive a width from it and overflow the column. Pass
 * `h-full` from the call site only where the parent has a real height.
 */
export function Photo({
  image,
  className,
  sizes = "(min-width: 768px) 45vw, 100vw",
  priority,
}: {
  image: SiteImage;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  return (
    <figure
      className={cn("relative overflow-hidden rounded-lg bg-bg-raised-2", className)}
    >
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover"
        style={image.position ? { objectPosition: image.position } : undefined}
      />
      {image.caption && (
        <figcaption className="eyebrow absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-4 pb-3 pt-10 text-[11px] text-white">
          {image.caption}
        </figcaption>
      )}
    </figure>
  );
}
