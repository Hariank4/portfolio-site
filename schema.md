# Content schema

Everything visible on the site lives in typed files under `src/content/`. This is not a database
schema — there is no database — it's the shape of the plain TypeScript objects that every
component reads from. Edit these files to change site content; you should never need to touch a
component's JSX just to update copy, add a project, or change a link.

All content is imported directly into server components at build time (see `architecture.md` §3),
so a bad shape here is a TypeScript compile error, not a runtime surprise.

## `profile.ts`

One object, `profile`, `as const`. Drives the hero, about section, footer, and contact section.

```ts
{
  name: string;
  initials: string;
  avatar: string | null;        // null = no photo; see portfolio-plan.md §10
  roles: string[];               // hero eyebrow, joined with " · "
  location: string;
  email: string;
  education: { degree: string; school: string; detail: string };
  tagline: string;                // hero headline, second line (rendered italic)
  heroSubline: string;             // hero paragraph
  aboutLead: string;                // About section heading
  aboutBody: string[];               // About section paragraphs, one <p> per entry
  resume: { href: string; label: string };  // href is a /public path, not an external URL
  socials: { label: string; href: string; handle: string }[];
    // rendered in this order in the footer, contact section, and mobile nav.
    // href starting with "http" opens in a new tab; "mailto:" does not.
  pillars: { key: string; title: string; description: string }[];
    // exactly 3 in current content (Engineer/Builder/Creative) — About section cards.
    // Nothing enforces exactly 3; the layout is a 3-col grid on desktop (sm:grid-cols-3
    // in about.tsx) so a different count will still render, just not evenly.
}
```

## `projects.ts`

```ts
type ArchitectureStep = { label: string; detail: string };
type Challenge = { challenge: string; resolution: string };
type PriorArt  = { approach: string; difference: string };
type ProjectLink = { label: string; href: string };

type Project = {
  slug: string;                    // URL segment: /work/{slug}
  kind: "flagship" | "build";       // "flagship" → full-width alternating case-study block on
                                      // the home page + is one of the two "primary" projects.
                                      // "build" → smaller card in the "Also building" row.
                                      // Both kinds get a /work/[slug] page either way.
  status: "Live" | "Internal MVP" | "Concept" | "Prototype";
    // drives StatusBadge color (ui/status-badge.tsx: Live=green, Internal MVP=amber,
    // Concept=violet, Prototype=cyan) — adding a new status string needs a matching
    // entry in that component's dotColor map or it falls back to gray.
  title: string;          // display title, can include non-Latin script (e.g. "Cyber सारथी")
  plainTitle: string;      // ASCII-safe version — used in <title>, OG images, alt text
  subtitle: string;
  summary: string;          // one-liner for cards
  timeframe: string;
  role: string;
  tech: string[];            // rendered as Tag pills
  links: ProjectLink[];       // external links (e.g. live site) — empty array is fine, hides
                                // the links row on the case-study hero
  problem: string;              // case-study §01
  whyItMatters: string;           // case-study §02
  whatIBuilt: string[];            // case-study §03, one numbered line per entry
  architecture: ArchitectureStep[]; // case-study §04 — rendered as a horizontal step diagram.
                                       // Empty array → entire section is omitted, not shown empty.
  features: string[];                // case-study §05 — empty array omits the section
  challenges: Challenge[];            // case-study §06 — empty array omits the section
  priorArt?: PriorArt[];               // case-study §07 — optional; omitted entirely if absent
  gallery?: SiteImage[];               // photographs, above §01 and deliberately unnumbered.
                                       // [0] is the wide lead; the rest go 2-up beneath it.
  heroClassName?: string;              // className override for gallery[0] — default is a
                                       // landscape crop (fits a screenshot); a portrait phone
                                       // photo needs its own aspect + max-width instead, or the
                                       // landscape crop cuts off whatever the shot is meant to show.
  carousel?: SiteImage[];               // auto-advancing slide carousel. With a gallery present it
                                       // shares the detail row (3:2 default); without one it IS
                                       // the lead, at heroClassName's shape. Crop every source to
                                       // the frame's ratio — slides are object-cover, so a
                                       // mismatched source gets silently cropped.
  resultsStatus: string;               // §07, or §08 when priorArt is present — always shown
  accent: "coral" | "cyan" | "violet" | "amber";
    // maps to a CSS var in project-cover.tsx's accentVar and the OG image's accentHex —
    // both maps must stay in sync if you add a 5th accent value.
};

const projects: Project[]        // all four projects, in display order
const flagshipProjects           // projects.filter(kind === "flagship") — currently 2
const otherBuilds                // projects.filter(kind === "build") — currently 2
function getProjectBySlug(slug)  // used by work/[slug]/page.tsx
```

**On `priorArt`.** Use it where the honest framing is "this category of thing already exists,
here is the specific gap I'm addressing" — not as a novelty claim. `class-attendance-monitor`
is the only project using it: the mechanisms it combines (BLE, Wi-Fi, QR, geofencing, device
binding) are all well-established, so the case study says so plainly rather than implying they
were invented here. It reuses `ChallengeList` for rendering, since `approach → difference` is
the same shape as `challenge → resolution`.

`generateStaticParams()` in `work/[slug]/page.tsx` maps over the full `projects` array, not just
`flagshipProjects` — so every project, regardless of `kind`, gets a real `/work/{slug}` page. A
"build"-kind project with empty `architecture`/`challenges` just renders a shorter page (see
architecture.md §3).

## `experience.ts`

```ts
type TimelineItem = {
  period: string;
  title: string;
  org: string;
  description: string;
  tags?: string[];    // optional — omit for entries where tags don't add anything
  image?: SiteImage;  // optional — narrows the copy and sits beside it on desktop.
                      // Rows without one are laid out exactly as before.
};

const experience: TimelineItem[]   // rendered as the Experience section timeline, in array order
const activities: string[]          // short one-line items below the timeline (DSA Quest, IEEE
                                       // Got Talent, short film) — deliberately not full
                                       // TimelineItem entries, kept lightweight on purpose
```

## `skills.ts`

```ts
type SkillGroup = { title: string; items: string[] };

const skillGroups: SkillGroup[]   // rendered as N columns (lg:grid-cols-4 in skills.tsx) —
                                     // adding a 5th group will wrap to a second row, not break.
```

## `creative.ts`

```ts
type CreativeItem = { title: string; description: string };

const creativeImages: SiteImage[]    // slides of the section's carousel, any length. Crop each
                                        // source to 3:2 so it fills the frame edge to edge.
const creativeQuote: string          // one line, display italic, between photos and cards
const creativeItems: CreativeItem[]  // rendered as a 3-col grid (md:grid-cols-3 in creative.tsx)
```

## `images.ts`

```ts
type SiteImage = {
  src: string;        // path under public/
  alt: string;
  caption?: string;   // overlay label. Only state what is verifiable — venue names on this
                      // site are read off signage visible in the photo itself.
  position?: string;  // CSS object-position. Most sources are 3:4 phone portraits being
                      // cropped to landscape cells, so off-centre subjects need this.
};
```

Rendered by `components/ui/photo.tsx`. Used by `creative.ts` (`creativeImages`), `projects.ts`
(`gallery`) and `experience.ts` (`image`). Resize sources to ~1400–1600px on the long edge before
committing — `next/image` serves scaled variants regardless, so originals only inflate the repo.

## Adding a new project end to end

1. Add an entry to `projects` in `projects.ts` matching the `Project` type above.
2. If `accent` is a new value not already in the union, add it to the type AND to both
   `accentVar` (`ui/project-cover.tsx`) and `accentHex` (`work/[slug]/opengraph-image.tsx`).
3. If `status` is a new value, add it to `dotColor` in `ui/status-badge.tsx`.
4. That's it — `/work/{slug}` and its OG image are generated automatically at build time, and it
   appears on the home page in either the flagship or "Also building" row based on `kind`.
