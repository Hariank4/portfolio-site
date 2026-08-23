# Architecture

As-built reference for how this codebase actually works. For the pre-build rationale/plan, see
`portfolio-plan.md`; this doc describes the current state (a couple of details changed during the
build — notably fonts, see §5 — so this file, not the plan, is the source of truth for "how it
works today").

## 1. Stack

- **Next.js 16**, App Router, `src/` layout, React 19, TypeScript.
- **Tailwind CSS v4** — CSS-first config via `@theme` in `src/app/globals.css`. There is no
  `tailwind.config.js`; all tokens live in that one file.
- **Framer Motion** — scroll reveals, the magnetic button, route transitions.
- **lucide-react** — icons.
- `clsx` + `tailwind-merge` → `src/lib/cn.ts`'s `cn()` helper, used everywhere instead of raw
  string concatenation for conditional classes.
- No CMS, no database, no analytics SDK. Every route is statically generated at build time
  (see §3) **except** `/api/chat`, the one dynamic route backing the chat widget — it is the
  single deliberate exception to "no server-side work" and the only thing needing an env var
  (`GEMINI_API_KEY`). See §10.

## 2. Directory layout

```
src/
  app/                        routes (Next.js App Router file conventions)
    layout.tsx                 root layout: fonts, metadata, JSON-LD, theme-init script
    page.tsx                    home — composes section components in order
    template.tsx                 route-level transition wrapper (client component)
    not-found.tsx                 404 page
    icon.tsx / apple-icon.tsx      generated favicon / apple touch icon (next/og ImageResponse)
    opengraph-image.tsx            home page OG image (generated)
    sitemap.ts / robots.ts          metadata routes
    work/[slug]/
      page.tsx                      case-study template, statically generated per project
      opengraph-image.tsx            per-project OG image (generated, reads project.accent)
  components/
    layout/    SiteHeader, MobileNav, SiteFooter, ThemeToggle, nav-links.ts
    ui/        Container, Eyebrow, SectionHeading, Button, Tag, StatusBadge, RevealOnScroll,
               RevealText, Magnetic, ProjectCover, FeaturedProjectCard, BuildCard,
               TimelineRow
    sections/  Hero, About, SelectedWork, Skills, Experience, Creative, OpenSource, Contact
               (one per numbered section on the home page, in render order)
    case-study/ CaseStudyHero, CaseStudySection, ArchitectureDiagram, SpecList, ChallengeList
  content/     profile.ts, projects.ts, experience.ts, skills.ts, creative.ts — see schema.md
  lib/         cn.ts (class merge helper), motion.ts (shared Framer Motion variants),
               constants.ts (SITE_URL)
```

Import alias: `@/*` → `./src/*` (see `tsconfig.json`).

## 3. Routing & rendering

Every route is static. There is no `"use server"` data fetching and no runtime API calls — content
comes entirely from the typed files in `src/content/`, imported directly into server components.

- `/` — `src/app/page.tsx`, a server component that renders the eight section components in
  sequence. No props, no fetching.
- `/work/[slug]` — `src/app/work/[slug]/page.tsx`. `generateStaticParams()` maps over
  `projects` (all four, not just the two flagships — see schema.md) so all four project pages are
  pre-rendered at build time. `generateMetadata()` builds per-page title/description/OG metadata
  from the matched project. A slug with no match calls `notFound()`.
- Empty content sections degrade gracefully: `CaseStudySection` blocks for architecture/features/
  challenges are conditionally rendered only `if (project.X.length > 0)`, which is how the two
  lighter "build" projects (empty `architecture`/`challenges` arrays) render a shorter page without
  empty headings.

## 4. Client vs. server components

Almost everything is a server component by default. `"use client"` is used only where interaction
or browser APIs are required:
- `ThemeToggle` (reads/writes `document.documentElement`, uses `useSyncExternalStore`)
- `MobileNav` (open/close state, focus trap, portal)
- `Hero`, `RevealOnScroll`/`RevealText`, `Magnetic`, `template.tsx` (all Framer
  Motion — `useReducedMotion`, `whileInView`, animated props)

## 5. Fonts — self-hosted, not next/font/google

The build environment this was authored in could not reach `fonts.googleapis.com` at build time
(network egress was blocked to that host specifically), so **the original plan's `next/font/google`
approach was replaced** with fully self-hosted packages:

- `geist` npm package → `import { GeistSans } from "geist/font/sans"` and
  `import { GeistMono } from "geist/font/mono"` in `layout.tsx`. Internally this is
  `next/font/local` pointed at bundled woff2 files — same `.variable` API as `next/font/google`,
  zero network dependency at build or request time.
- `@fontsource-variable/fraunces` → imported directly for its CSS
  (`@fontsource-variable/fraunces/wght.css` and `wght-italic.css` in `layout.tsx`), which defines
  `@font-face { font-family: 'Fraunces Variable'; ... }` against local woff2 files. Referenced in
  `globals.css` as `--font-display: "Fraunces Variable", ui-serif, Georgia, serif;` — a plain
  string, not a CSS-variable indirection, since Fontsource doesn't hand back a `.variable` class
  the way `geist`/`next/font` do.

  **Use the `wght` build, not `full`.** Fraunces ships optical-size, SOFT and WONK axes this site
  never varies; `full.css` costs ~268KB for the latin subsets versus ~84KB for `wght`. Same family
  name, identical rendering here. Don't "upgrade" these imports back to `full`.

This is a strict improvement over the original plan, not a compromise: no runtime or build-time
dependency on Google's infrastructure at all, which is both faster and more resilient to deploy in
restricted network environments. If re-introducing `next/font/google` later, swap the imports in
`layout.tsx` and drop the two packages — nothing else references them directly.

## 6. Design tokens & theming

All color/spacing/font tokens live in `src/app/globals.css`:
- Plain CSS custom properties on `:root` (dark values — the default) and `:root[data-theme="light"]`
  (light overrides).
- Re-exposed as Tailwind utilities via `@theme inline { --color-bg: var(--bg); ... }`, so `bg-bg`,
  `text-fg-muted`, `border-border`, etc. are available as normal Tailwind classes throughout the
  component tree.
- Theme switching: `ThemeToggle` sets `document.documentElement.dataset.theme` and persists to
  `localStorage("theme")`. An inline `<script>` in `layout.tsx` (`themeInitScript`) reads that
  value and sets the attribute **before** hydration, so there's no flash of the wrong theme.
  `ThemeToggle` itself reads current state via `useSyncExternalStore` (a `MutationObserver` on the
  `data-theme` attribute) rather than `useState`+`useEffect`, specifically to avoid the
  `react-hooks/set-state-in-effect` lint error and the hydration-mismatch class of bugs that
  pattern invites.
- Contrast: every text/background color pair was checked against WCAG AA (4.5:1) with an axe-core
  scan during the build; `--fg-faint` and the light-mode `--accent` were both adjusted from their
  original plan values to pass. Don't drop these below their current lightness without re-checking
  contrast.

## 7. Motion architecture

**Import `m`, never `motion`.** `components/motion-provider.tsx` mounts `LazyMotion` with the
`domAnimation` feature set in the root layout, so every animated component uses `m.div` / `m.p`
rather than `motion.div`. Importing `motion` anywhere pulls the full feature bundle back in and
silently undoes the saving (~9KB gzipped) — the code still works, which is what makes it easy to
regress. `domAnimation` covers animate, variants, `whileInView` and hover/tap/focus; it excludes
drag and layout animations, neither of which this site uses. Needing one of those means switching
to `domMax`, not reaching for `motion`.

`src/lib/motion.ts` defines the shared `revealUp` Framer Motion variant.
`src/components/ui/reveal.tsx` wraps it into two reusable primitives:
- `RevealOnScroll` — opacity/translate-in `whileInView`, `once: true`. Sections pass a manual
  per-item `delay` to stagger a group — see `about.tsx`.
- `RevealText` — splits a string into words, reveals each with a clipped rise. Used for the hero
  headline. Its reduced-motion fallback still applies `wordClassName` (e.g. the italic tagline
  styling) so accessibility doesn't cost visual fidelity — see the comment in `reveal.tsx`.

Every motion primitive checks `useReducedMotion()` and no-ops (renders the end state instantly)
when it's set. This isn't optional/decorative — `globals.css` also force-collapses all
animation/transition durations under `prefers-reduced-motion: reduce` as a second layer of
defense.

`Magnetic` (`ui/magnetic-button.tsx`) implements the hero's primary-CTA pull effect via
`onMouseMove` + a spring transition; also fully disabled under reduced motion.

`app/template.tsx` provides a subtle fade/rise on route change (App Router's `template.tsx`
convention — re-mounts on every navigation, unlike `layout.tsx`).

## 8. Mobile navigation — portal, not inline

`MobileNav` renders its full-screen dialog via `createPortal(..., document.body)`, not inline in
the component tree. This is load-bearing, not a style choice: `SiteHeader` uses
`backdrop-blur-md`, and `backdrop-filter` establishes a CSS containing block for
`position: fixed` descendants. Without the portal, the dialog's `fixed inset-0` resolves against
the header's own (64–80px) box instead of the viewport, and the "full-screen" nav only covers the
header. If you ever remove the portal, you need to also remove `backdrop-blur` from `SiteHeader`,
or reintroduce the clipping bug.

## 9. SEO

- `layout.tsx` sets a title template (`%s — Hariank Juneja`), description, OpenGraph, Twitter
  card, canonical URL, and a `Person` JSON-LD block built from `profile.ts` (only fields backed by
  real data — no fabricated `alumniOf` beyond the actual school, no fake `sameAs` entries).
- `work/[slug]/page.tsx`'s `generateMetadata()` overrides title/description/OG per case study.
- `icon.tsx`, `apple-icon.tsx`, `opengraph-image.tsx`, and `work/[slug]/opengraph-image.tsx` all
  use `next/og`'s `ImageResponse` to generate images at build time — no static image assets to
  keep in sync with copy changes.
- `sitemap.ts` / `robots.ts` are Next.js metadata-route conventions, not static files.

## 10. Visual styles & the chat widget

**Visual styles.** A `data-style` attribute on `<html>` selects `sharp` (default), `fluid`, or
`minimal`. Same mechanism as theming (§6): CSS-variable blocks in `globals.css`, persisted to
`localStorage("visualStyle")`, set pre-hydration by the inline script in `layout.tsx`.
`ThemeToggle` and `VisualStyleToggle` share `lib/use-persisted-attribute.ts`.

**Style and theme are orthogonal, and must stay that way.** `data-theme` owns the ground colour;
`data-style` owns type, surface treatment and density. So a `[data-style]` block may never
hard-code a colour — every surface it sets is `color-mix`ed from `--bg`/`--fg`, which is why all
three styles read correctly in both themes. `minimal` in particular is a *density* change, not a
light mode: it flattens `--bg-raised` onto `--bg` and derives hairline borders from the current
foreground. A style that hard-codes, say, a light background would fight the theme toggle and
produce unreadable combinations.

Each style moves several levers together (that is what makes it read as a different design rather
than a reskin): `--h1-size`, `--h1-leading`, `--display-weight`, `--display-tracking`,
`--eyebrow-transform`, `--eyebrow-tracking`, the radius scale, and the border/raised-surface
tokens. Two small semantic classes carry them — `.font-display` and `.eyebrow` — so components
opt in by class instead of every style needing per-component overrides.

Decoration is switched with `display`, never opacity — see §11 for why that distinction is
load-bearing for performance.

**Chat widget.** `/api/chat` (a Route Handler, Node runtime) proxies to the Gemini API. The
system prompt is built by `lib/chat-context.ts` from the `src/content/` files verbatim — the whole
corpus is a few KB, so there is no embedding/retrieval step; retrieval would be pure overhead at
this size. The prompt instructs the model to answer only from those facts, which is the same
never-invent-anything rule that governs the site's copy (`project.md`).
`components/chat/chat-widget.tsx` portals its panel to `document.body` for exactly the reason §8
describes — do not un-portal it.

## 11. Performance

- Every route is fully static (see §3) — no data-fetching waterfalls, no client-side loading
  states for content.
- Fonts are self-hosted (§5) — no external font request blocks first paint.
- No image optimization pipeline needed because there are no raster images in the design (§ of
  `portfolio-plan.md` explains why — no photography was supplied, so the visual system is
  typography/diagram-led by design, not as a stopgap).

**Fonts dominate the payload.** With no images and a small JS bundle, the woff2 files are ~98% of
the bytes on a cold load. That makes font choices the highest-leverage perf decisions here — see
the `wght` note in §5. Measured on `/`: ~218KB fonts vs ~5KB other resources.

**Decoration must cost nothing when it is invisible.** Three rules the §10 features follow, each
of which was a real measured regression before it was fixed:

- The fluid blob uses `display: none` when inactive, not `opacity: 0`. At zero opacity its 80px
  blur and infinite animation still ran in all three styles — continuous compositing for something
  invisible in two of them.
- The grain overlay has no `mix-blend-mode`. It is fixed and full-viewport, so a blend mode forces
  the whole viewport to re-composite every scroll frame; at ~4% opacity the visual difference is
  imperceptible.
- The hero cursor-glow is a fixed-size element moved with `transform` and coalesced into one
  `requestAnimationFrame`. Driving a gradient's position through CSS variables on every mousemove
  repaints a full-viewport layer per event instead.

**Keep content files out of client components.** `chat-widget.tsx` takes its copy as props from the
root layout rather than importing `src/content/`. As a client component it would otherwise ship
every case study's prose to every page — this was ~40KB of dead weight before it was caught.
