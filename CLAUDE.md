@AGENTS.md

# Hariank Juneja — Portfolio

Personal portfolio site (Next.js 16 App Router, TypeScript, Tailwind CSS v4, Framer Motion). No
database. Every route is statically generated from typed content files, with one deliberate
exception: `/api/chat` backs the chat widget and needs a `GROQ_API_KEY` (the site builds and
runs fine without it — the widget just says it's unconfigured). See `docs/architecture.md` §10.

## Read before doing anything

- `docs/project.md` — what this is, who it's for, and the content rule that matters most
- `docs/architecture.md` — how the code is put together, including two decisions that look like
  bugs but aren't (self-hosted fonts, the mobile-nav portal) — read this before "fixing" either
- `docs/schema.md` — exact TypeScript shape of everything under `src/content/`, and the steps to
  add a new project end to end
- `docs/build.md` — scripts, what's already been tested, deploy checklist
- `docs/portfolio-plan.md` — the original pre-build plan and design-system rationale (colors,
  type scale, motion strategy)

## Rules

1. **Never invent achievements, metrics, employers, or results.** Every number on this site is
   quoted from Hariank's CV / internship report, not estimated. If you're adding new project
   content and a fact isn't confirmed by material the user gives you, write it as an explicit
   placeholder, not a plausible-sounding claim. See `docs/project.md`.
2. **Content edits go in `src/content/*.ts`, never hardcoded into a component.** If you find
   yourself editing JSX to change copy, stop — the content should be a prop from one of those
   files instead.
3. **Don't remove the `createPortal` in `components/layout/mobile-nav.tsx`.** The header's
   `backdrop-blur` creates a CSS containing block that breaks `position: fixed` sizing for
   anything rendered inline inside it — this is the fix, not incidental complexity.
   `docs/architecture.md` §8 has the full explanation.
4. **Don't switch fonts back to `next/font/google` without checking the environment can reach
   `fonts.googleapis.com` first.** They're self-hosted via the `geist` and
   `@fontsource-variable/cormorant-garamond` packages specifically because that host was
   unreachable during the original build. `docs/architecture.md` §5.
5. **`npm run build` is the real check, not `npm run dev`.** It's the only command that runs the
   full TypeScript check; a plain `tsc --noEmit` will false-positive on `LayoutProps` if `.next/`
   hasn't been generated yet. Run build (and `npm run lint`) before considering any change done.
6. **Keep dependencies minimal.** Don't add a UI kit, animation library, or icon set beyond what's
   already here without a real reason — this was a deliberate constraint from the original brief.

## Quick reference

```bash
npm install
npm run dev      # local dev server
npm run build    # production build + typecheck — run this before calling anything done
npm run lint     # ESLint
```

Content lives in `src/content/`. Components in `src/components/{layout,ui,sections,case-study}/`.
Routes in `src/app/`. No env vars required.
