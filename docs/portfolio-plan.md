# Hariank Juneja — Portfolio Implementation Plan

> **Historical document — not current state.** This is the original pre-build plan, kept as a
> record of the reasoning behind the information architecture and design system. Several things
> named here have since changed: the display font (Fraunces → Cormorant Garamond), the palette
> (dark-first → light-first cream/purple), and one project (AI Medical Scribe → Class Attendance
> Monitor). For what the site actually does today, read `architecture.md` and `CONTEXT.md`.

Status: Approved for build (Phase 2 complete). This document was the source of truth for
information architecture, design system, and technical decisions during the initial build.

## 0. Source material (real, verified)

Everything on the site is derived from two files the user provided in the connected folder:

- `Hariank_Juneja_CV_2026.docx` — profile, skills, experience, projects, education, leadership,
  contact links (LinkedIn, GitHub — extracted from the doc's actual hyperlink relationships).
- `Hariank_45Day_Internship_Report.pdf` — detailed, dated breakdown of the MeraPath internship
  (Cyber Sarthi + Tender Command Centre), including real figures (178+ commits, 5,300+ lines of
  dead code removed, 8 REST endpoints, live URL cybersarthi.in).

No metrics, employers, awards, or company names are invented. Where the brief mentioned something
the source material doesn't confirm (e.g. TEDx, MUN, CTF participation), it is **left out** rather
than asserted. The AI Medical Scribe concept is included because the user described it directly as
their own exploratory concept — it is labeled "Concept / Exploration," not a shipped product, and
carries no fabricated metrics.

Verified links: `mailto:hariankjuneja4@gmail.com`, `https://www.linkedin.com/in/hariank-juneja`,
`https://github.com/Hariank4`, `https://cybersarthi.in`. No Instagram handle was found anywhere in the
source material, so it is omitted rather than guessed.

No profile photo or product screenshots were supplied. Rather than invent screenshots or stock
photography, the visual system is typography- and diagram-led: generative gradient "cover" panels,
hand-built SVG architecture diagrams, and code/UI motifs stand in for photography. This is a
deliberate design decision (see §4) and is called out in the final placeholders list.

## 1. Repository state at start

The connected folder ("my portfolio web") contained no existing code — only the two documents
above. This is a greenfield build, not a migration, so Phase 1 ("inspect existing repo") concluded
there is nothing to preserve or reconcile.

## 2. Tech stack

- **Next.js 16** (App Router, React 19, TypeScript, `src/` layout) — latest stable, matches the
  "modern React" preference in the brief.
- **Tailwind CSS v4** (CSS-first `@theme` config, no `tailwind.config.js`) — scaffolded default.
- **Framer Motion** for scroll reveals, magnetic buttons, and route-level transitions.
- **lucide-react** for iconography.
- `clsx` + `tailwind-merge` for a small `cn()` class helper.
- No CMS, no database, no analytics SDK, no UI kit — content lives in typed local files
  (`src/content/*`) so everything stays editable and the dependency graph stays minimal.

## 3. Information architecture & routes

```
/                         Home — full narrative in one scroll
/work/cyber-saarthi        Case study: Cyber सारथी
/work/tender-command-centre Case study: AI Tender Command Centre
/sitemap.xml               generated
/robots.txt                generated
```

Home sections, in order (renumbered from the brief's suggested flow to read better as one
continuous story — builder identity is established before the resume-style detail):

1. **Hero** — name, positioning statement, short intro, primary/secondary CTA, social row.
2. **About** — the Engineer / Builder / Creative framing, short bio, education line.
3. **Selected Work** — two flagship case-study feature blocks (Cyber सारथी, Tender Command
   Centre) linking to dedicated pages, plus a lighter "Also building" row for the Medical Scribe
   concept and the Heart Attack Detection Band.
4. **Skills / Stack** — grouped, scannable, not a giant tag cloud.
5. **Experience** — a timeline: MeraPath internship (detailed) + leadership/activities
   (IEEE Computer Society, IIC, DSA Quest, IEEE Got Talent) kept short, not a resume dump.
6. **Creative Side** — music (guitar), short film direction, storytelling — framed as part of the
   same person, not a separate identity.
7. **Open Source / Code** — GitHub profile link + how Hariank works (tools: Claude Code, Cursor,
   Git). No fabricated stats or repo lists.
8. **Contact** — "Have something worth building?" + email / LinkedIn / GitHub / résumé.
9. **Footer** — compact, repeats primary links, no filler.

Each project case study page follows: Problem → Why it matters → What was built → Architecture →
Tech → Key features → Challenges → Status (with real dates from the internship report) → Links.

## 4. Visual system

**Direction:** premium editorial-technical. Near-black canvas, warm ivory type, a single warm
signal accent used sparingly (CTAs, active nav, tag highlights, diagram nodes) — not gradients
sprayed across the page, not glassmorphism, not stock photography.

**Color tokens** (defined as CSS variables in `globals.css`, dark is default):

| Token | Dark | Light |
|---|---|---|
| `--bg` | `#0a0a0b` | `#faf9f6` |
| `--bg-raised` | `#131316` | `#ffffff` |
| `--border` | `#232327` | `#e6e3dd` |
| `--fg` | `#f3f1ec` | `#151412` |
| `--fg-muted` | `#9c9a97` | `#5c5a56` |
| `--accent` | `#ff6b3d` | `#d9481f` |
| `--accent-soft` | `#ff6b3d1a` | `#d9481f14` |

**Typography:**
- Display: **Fraunces** (variable serif, optical sizing + italic) — headlines, pull quotes, section
  numerals. Gives the "editorial" weight the brief asks for without reaching for a generic grotesk.
- UI/Body: **Geist Sans** — already first-party in the Next.js scaffold, clean and neutral.
- Mono: **Geist Mono** — eyebrows, tags, section index numbers, code/architecture labels.
- Scale: fluid clamp()-based sizes from a 12px base up to ~96px display, so hierarchy holds at
  every viewport without separate mobile overrides for every heading.

**Spacing/grid:** 8px base unit; content container caps at 1200px with responsive gutters;
sections use a loose 12-col CSS grid where layout needs it (case studies, skills).

**Motion:** Framer Motion `whileInView` reveals (opacity + 12px translate, once), a magnetic-pull
primary button, a subtle text-reveal on the hero headline, and a soft view-transition between
routes. Everything respects `prefers-reduced-motion` via a shared `useReducedMotion` gate — when
set, all of the above degrade to instant/opacity-only. No scroll-jacking, no parallax on text.

## 5. Component architecture

```
src/
  app/
    layout.tsx            root layout, fonts, theme script, metadata
    page.tsx               home (composes section components)
    template.tsx            route transition wrapper
    work/[slug]/page.tsx     case study page, statically generated from content/projects.ts
    sitemap.ts, robots.ts
  components/
    layout/  SiteHeader, MobileNav, SiteFooter, ThemeToggle
    ui/      Container, Eyebrow, SectionHeading, Button, Tag, RevealOnScroll, RevealText,
             MagneticButton, ProjectCard, TimelineRow, StatusBadge
    sections/ Hero, About, SelectedWork, Skills, Experience, Creative, OpenSource, Contact
    case-study/ CaseStudyHero, CaseStudySection, ArchitectureDiagram, SpecTable
  content/   profile.ts, projects.ts, experience.ts, skills.ts, creative.ts, leadership.ts
  lib/       cn.ts, motion.ts (shared variants), constants.ts
```

Every section is a self-contained component reading from `src/content/*` — updating a project
detail, a skill, or a social link never touches JSX.

## 6. SEO strategy

- Per-route `metadata` (title template, description) in `layout.tsx` / each `page.tsx`.
- Open Graph + Twitter card metadata with a generated OG image per case study.
- `application/ld+json` `Person` structured data on the home page (name, jobTitle, alumniOf,
  sameAs → LinkedIn/GitHub) — only fields backed by real data.
- `sitemap.ts` / `robots.ts` route handlers (Next.js metadata routes).
- Semantic headings (single h1 per page), descriptive link text, alt text on every SVG/graphic.
- Target queries from the brief (Hariank Juneja, Generative AI Engineer, Full Stack Developer,
  Manav Rachna University) addressed naturally in copy — no keyword stuffing.

## 7. Performance strategy

- Static generation for every route (no server data fetching needed).
- `next/font` self-hosts Fraunces/Geist at build time — no runtime Google Fonts request.
- No image dependency to optimize away (typography/SVG-led design), which also sidesteps the
  "don't invent screenshots" constraint.
- Framer Motion tree-shaken usage (no full-bundle imports); animations are CSS-transform based.
- Route-level code is small — no heavy client-only libraries beyond Framer Motion.

## 8. Accessibility

- Semantic landmarks (`header`, `nav`, `main`, `section[aria-label]`, `footer`).
- Visible focus rings (accent-colored, never removed).
- Color pairs checked for 4.5:1+ contrast in both themes.
- `prefers-reduced-motion` fully supported (see §4).
- Mobile nav is a real dialog: focus-trapped, `Escape` to close, labelled.
- Contact links use descriptive accessible names (not bare "click here").

## 9. Milestones (build order)

1. Design tokens + base UI primitives.
2. Content data layer (typed, from verified source material).
3. Layout shell: header, mobile nav, footer, theme toggle, route transition.
4. Home sections top to bottom.
5. Case study template + two case study pages.
6. SEO metadata, sitemap, robots, OG.
7. Motion pass.
8. `next build`, lint, typecheck — fix to zero errors.
9. Responsive + accessibility pass across mobile/tablet/desktop.
10. Visual polish pass against the "premium 2026 portfolio" bar.
11. Deliver into the user's connected folder + written report.

## 10. Known placeholders (tracked, not invented)

- No profile photo — hero and about are typography/diagram led by design; a photo can be dropped
  into `src/content/profile.ts` (`avatar` field, currently `null`) later without a redesign.
- Instagram — omitted (no handle found in source material). Add to `profile.ts` `socials` array
  if/when available.
- Project screenshots — represented with generated cover treatments + SVG architecture diagrams
  instead of real screenshots (none were supplied).
- Short film title/venue and specific music performances — described generically in the Creative
  section since the source material confirms the activity but not specifics; marked with an inline
  comment in `content/creative.ts` for the user to fill in.
