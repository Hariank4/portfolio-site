/**
 * Shared shape for every photograph on the site. Lives here rather than in one
 * of the content files because three of them use it — creative.ts, projects.ts
 * and experience.ts — and importing `CreativeImage` into a case study read
 * like a mistake.
 *
 * Rendered by `components/ui/photo.tsx`. Sources go in `public/`, resized to
 * ~1400–1600px on the long edge: next/image serves scaled variants from there,
 * so committing camera originals only inflates the repo.
 */
export type SiteImage = {
  src: string;
  alt: string;
  /** Optional overlay label. Keep to what is verifiable — venue names on this
      site are read off signage visible in the photo itself. */
  caption?: string;
  /** CSS object-position, for shots where the subject isn't dead centre. */
  position?: string;
};
