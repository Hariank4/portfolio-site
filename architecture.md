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
- `@fontsource-variable/cormorant-garamond` → imported directly for its CSS
  (`@fontsource-variable/cormorant-garamond/wght.css` and `wght-italic.css` in `layout.tsx`), which
  defines `@font-face { font-family: 'Cormorant Garamond Variable'; ... }` against local woff2
  files. Referenced in `globals.css` as
  `--font-display: "Cormorant Garamond Variable", ui-serif, Georgia, serif;` — a plain string, not a
  CSS-variable indirection, since Fontsource doesn't hand back a `.variable` class the way
  `geist`/`next/font` do.

  **Weight 300, and the face was chosen for that.** Playfair Display bottoms out at 400 and still
  reads heavy at display sizes; Cormorant Garamond goes to 300 with far finer hairlines. It also
  sits optically smaller at the same px, which is why the display clamps are larger than they look.

  **Always import the `wght` build, never `full`.** The full builds carry axes this site never
  varies. Fraunces (an earlier display face) cost ~268KB for the latin subsets that way versus
  ~84KB for `wght`. Same lesson applies to any face swapped in later.

This is a strict improvement over the original plan, not a compromise: no runtime or build-time
dependency on Google's infrastructure at all, which is both faster and more resilient to deploy in
restricted network environments. If re-introducing `next/font/google` later, swap the imports in
`layout.tsx` and drop the two packages — nothing else references them directly.

## 6. Design tokens & theming

All color/spacing/font tokens live in `src/app/globals.css`:
- Plain CSS custom properties on `:root` (light values — the default) and
  `:root[data-theme="dark"]` (dark overrides). **Light is the default.** Warm cream ground, warm near-black type, one purple accent — warm
  near-blacks rather than pure, which is easier to sit with. The accent lifts from `#5b3fd6` to
  `#b5a0f5` in dark, since the denser purple does not read against `#100f0d`.
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
- Contrast: every text/background pair is checked against WCAG AA (4.5:1). Current ratios —
  light: fg 16.83, muted 6.21, faint 4.88, accent 6.33, accent-fg-on-accent 6.72, success 4.88;
  dark: fg 16.98, muted 6.74, faint 4.86, accent 8.49, accent-fg-on-accent 8.29. **`--fg-faint` in
  light is the tightest at 4.88** — it failed at 3.93 on the first pass and had to be darkened, so
  re-measure rather than eyeballing if either it or `--bg` moves.

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

## 10. Interaction layer & the chat widget

**The visual style switcher was removed.** There is no `data-style` attribute, no
`sharp`/`fluid`/`minimal`, and no ambient decoration (the gradient blob, the grain overlay and
the dot-grid all went with it). Only `data-theme` remains — see §6.

**Cursor system.** Two pieces that deliberately do not overlap:

- `ui/cursor-grid.tsx` — a canvas grid that lights up around the pointer, rendered **in the hero
  only**. Ported from React Bits; its two CSS rules live in `globals.css` because this project
  has no component stylesheets. Its rAF loop stops itself once no cell is lit, so an idle hero
  costs nothing — do not "optimise" that into a permanent loop.
- `ui/custom-cursor.tsx` — a dot that tracks the pointer with a ring trailing on a spring,
  mounted sitewide inside `MotionProvider`.

Both gate on `(pointer: fine)` and `prefers-reduced-motion`, via `useSyncExternalStore` rather
than setState-in-an-effect. **The native cursor is only hidden while the custom one is actually
running** (the `has-custom-cursor` class on `<html>`); hiding it on touch would remove an
affordance and give nothing back.

The hero content sits in a `pointer-events-none` container so pointer moves reach the grid
beneath it; the CTA row opts back in with `pointer-events-auto`.

**Navbar.** `MouseEyes` (`ui/mouse-eyes.tsx`) is a small pair of eyes that track the pointer —
reworked from a full-screen demo, listening on `window` and writing to the DOM inside one rAF
rather than calling setState per mousemove. `AskJinxButton` opens the chat widget through a
`window` event (`OPEN_CHAT_EVENT`, exported from `chat-widget.tsx`) so neither component owns
the other's state and the chat UI is never duplicated.

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

**Pointer work must be coalesced.** Every pointer-driven feature in §10 batches into a single
`requestAnimationFrame` rather than acting per event — `pointermove` fires faster than the display
refreshes, so the uncoalesced version does redundant work every frame. This applies to
`CustomCursor` (two motion values per update) and `MouseEyes` (two DOM writes). The source
component `MouseEyes` was ported from called `setState` per mousemove, re-rendering the tree each
time; that was the first thing changed.

`CursorGrid` is the exception that proves the rule: it drives its own rAF loop, but the loop
**stops itself** once no cell is lit, so an idle hero costs nothing. Do not convert it to a
permanent loop.

**Gate interaction on capability, not assumption.** The cursor and grid both check
`(pointer: fine)` and `prefers-reduced-motion` before attaching anything, via `useSyncExternalStore`
rather than setState-in-an-effect (React 19 rejects the latter). The native cursor is hidden only
while the custom one is actually running.

**Keep content files out of client components.** `chat-widget.tsx` takes its copy as props from the
root layout rather than importing `src/content/`. As a client component it would otherwise ship
every case study's prose to every page — this was ~40KB of dead weight before it was caught.
