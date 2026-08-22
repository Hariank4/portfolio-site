# Project

## What this is

Hariank Juneja's personal portfolio — a from-scratch, single-repo Next.js site. There was no
existing codebase when this was built; only a CV and an internship report existed in the project
folder, so this is greenfield, not a migration or theme.

The site positions Hariank across three connected identities — **Engineer** (AI systems, backend
architecture), **Builder** (shipped, real-user products), **Creative** (music, film, storytelling)
— rather than as three unrelated resumes. See `src/content/profile.ts` → `pillars` for how that's
expressed in copy.

## Doc map

| Doc | Read this for |
|---|---|
| `project.md` (this file) | What the site is, who it's for, content rules |
| `architecture.md` | How the code is put together — stack, routing, rendering, theming, motion |
| `schema.md` | The exact shape of every content file under `src/content/` |
| `build.md` | Scripts, local dev, testing performed, deployment |
| `portfolio-plan.md` | The original pre-build plan and design-system rationale (§4 color/type
  tokens, §10 tracked placeholders) — architecture.md reflects what actually got built, which is
  the same in spirit but is the more current reference for exact current-state details |

## Content rules — read before editing copy

This is the one rule that matters most for anyone (human or agent) editing this repo:

**Never invent achievements, metrics, employers, or results.** Every number on this site (5,000+
users, 178+ commits, 8 REST endpoints, 5,300+ lines removed, ~300-page PDFs) is quoted directly
from Hariank's CV or his 45-day MeraPath internship report — not estimated, not rounded up for
effect. If new project content is added later and a fact isn't confirmed by source material the
user provides, it goes in as an explicit placeholder (see the "Known placeholders" section of
`portfolio-plan.md` §10) rather than as an asserted fact. When in doubt, prefer "not yet public" /
"concept stage" framing over a vague-but-impressive-sounding claim.

Two of the four projects in `src/content/projects.ts` are intentionally lighter than the other
two: `ai-medical-scribe` is explicitly a `"Concept"` (no shipped code, said so on the page), and
`heart-attack-detection-band` is a `"Prototype"`. Don't upgrade their status or backfill metrics
for them without new source material to back it up.

## Who this is for

Primary audience: recruiters, engineering managers, and collaborators evaluating Hariank as an AI
engineer / full-stack developer / creative technologist. Secondary: people who find the site via
search for "Hariank Juneja", "Generative AI Engineer", or similar (see `architecture.md`'s SEO
section) — copy should stay natural, not keyword-stuffed, per the original brief.
