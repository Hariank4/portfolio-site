# Project context

Orientation for anyone (human or agent) picking this up cold. `CLAUDE.md` has the rules,
`architecture.md` has the how, `schema.md` has the content shapes. This file is the **state**:
what exists, what was decided and why, and what is still open.

Last updated: 2026-08-24.

---

## 1. What this is

Hariank Juneja's personal portfolio. Next.js 16 (App Router), React 19, TypeScript,
Tailwind v4 (CSS-first, no `tailwind.config.js`), Framer Motion.

75 tracked files. 13 routes: one homepage of stacked sections, four static case studies at
`/work/[slug]`, and one dynamic API route.

**Live:** https://portfolio-site-nine-eta-34.vercel.app
**Repo:** https://github.com/Hariank4/portfolio-site — `main` and `v3` in sync.
**Domain:** `hariankjuneja.tech` registered, **not yet attached to Vercel**. `SITE_URL` in
`src/lib/constants.ts` already points at it.

---

## 2. The one rule that matters most

**Never invent achievements, metrics, employers, or results.** Every number on this site is
quoted from the CV or internship report. "5,000+ registered users" and "178+ commits" are real
figures with sources. If a fact is not confirmed by material the user supplied, write an explicit
placeholder rather than a plausible-sounding claim.

This is also why the chat assistant's system prompt leads with the same instruction, and why a
"Verify" link should never be rendered for a credential that has no real verification URL.

Second rule, close behind: **content lives in `src/content/*.ts`, never hardcoded in JSX.**

---

## 3. Architecture in one pass

```
src/app/          routes; layout.tsx composes header + main + footer + chat
src/components/   layout/ ui/ sections/ case-study/ chat/
src/content/      profile, projects, experience, skills, creative — all typed
src/lib/          cn, constants, motion, chat-context, use-persisted-attribute
```

Everything is statically generated except `/api/chat` and the per-project OG image.

**One display axis:** `data-theme` — `light` (default) / `dark`, on `<html>`, persisted to
`localStorage`, set pre-hydration by an inline script in `layout.tsx` so there is no flash.

The palette is 60/30/10: warm cream ground (`#faf8f4`), warm near-black type (`#1a1714`), one
purple accent (`#5b3fd6`, lifting to `#b5a0f5` in dark where the denser purple stops reading),
plus green for status. Warm rather than pure neutrals, deliberately — easier on the eyes.

A three-way visual style switcher (`sharp`/`fluid`/`minimal`) used to sit alongside this. It was
removed, along with all the ambient decoration that depended on it.

---

## 4. Decisions that look like bugs but aren't

Do not "fix" these without reading the reasoning.

| Thing | Why |
|---|---|
| `createPortal` in `mobile-nav.tsx` / `chat-widget.tsx` | The header's `backdrop-blur` creates a containing block that breaks `position: fixed` sizing for anything rendered inside it. §8 of `architecture.md`. |
| Fonts self-hosted via `geist` + `@fontsource-variable/cormorant-garamond` | `fonts.googleapis.com` was unreachable during the original build. Do not switch to `next/font/google` without checking reachability. |
| Display font is the `wght` build, not `full` | Full builds carry axes the site never varies. Fraunces (the previous face) cost 268KB that way vs 84KB for `wght`. |
| `m.*` everywhere, never `motion.*` | `LazyMotion` + `domAnimation` in `components/motion-provider.tsx`. Importing `motion` pulls the full bundle back in and silently undoes ~9KB — the code still *works*, which is what makes it easy to regress. |
| Pointer work coalesced into one rAF | `pointermove` outpaces the display. `CustomCursor` and `MouseEyes` batch per frame; `CursorGrid` runs its own loop but halts when nothing is lit. |
| Native cursor hidden only while the custom one runs | Both it and `CursorGrid` gate on `(pointer: fine)` + `prefers-reduced-motion`. Hiding it on touch removes an affordance and gives nothing back. |
| `chat-widget.tsx` takes copy as **props** | It is a client component in the root layout. Importing `src/content/` directly shipped every case study's prose to every page (~40KB). |
| No raster images anywhere | None were supplied. The generative project covers in `project-cover.tsx` are a **stand-in for screenshots**, not a design choice. `profile.avatar` is `null` and rendered nowhere. |
| `* { border-color: var(--color-border) }` is unlayered | It therefore overrides every Tailwind `border-*` utility. `border-border-strong` does not actually work anywhere. Pre-existing; noted, not fixed. |
| `bolt/` excluded from tsconfig and eslint | An untracked scratch Vite prototype living inside the repo. It failed the main typecheck until excluded. |

---

## 5. The chat assistant ("Jinx")

The single deliberate exception to the otherwise-static architecture.

- **Route:** `src/app/api/chat/route.ts`. **Provider:** Groq, OpenAI-compatible endpoint.
- **Model:** `openai/gpt-oss-120b`. Groq rotates ids; a retired one 404s with `model_not_found`.
  Check what is actually served: `GET https://api.groq.com/openai/v1/models`.
- **Env var:** `GROQ_API_KEY`. In `.env.local` locally (gitignored) and in Vercel's environment
  variables for production. Without it the route returns a clean 503 and the rest of the site is
  unaffected.
- **Name:** `profile.assistantName` — change it in one place.

**Not RAG.** `src/lib/chat-context.ts` builds a two-tier prompt:

- **Core, always sent** — profile, experience, skills, creative, and a one-line index of *every*
  project. This is why the assistant can never fail to know a project exists, which is the worst
  failure mode of top-k retrieval.
- **Detail, selected per question** — the expensive per-project prose, only for projects the
  question is about. Selection is **lexical, not embeddings**: with four projects, cosine
  similarity over a vector store reaches the same answer for an extra API call and a
  `vectors.json` to ship. Revisit at dozens of documents.

Recent turns join the question when selecting, so "what stack did it use?" still resolves.

~2,900 → ~1,970 tokens average. **The binding limit is 8,000 tokens/minute, not the 1,000
requests/day** — roughly 6 chats a minute. Exceeding it returns an honest "busy right now"
message. Trimming the prompt further is the lever if real traffic ever hits it.

Why not Gemini: its free tier allows **20 requests/day**, which a public portfolio exhausts
before lunch, and replies took 15–32s versus ~1s here.

---

## 6. Performance notes

Fonts are ~98% of the bytes on a cold load — there are no images and the JS bundle is small.
That makes font decisions the highest-leverage performance work here.

Measured wins: display-font `wght` build (−184KB), dropping GeistMono entirely and using sans for
label type (−70KB), keeping content files out of the client bundle (−40KB), `LazyMotion` (−8KB
gzipped), and `template.tsx` back to a Server Component using a CSS animation.

`npm run build` is the real check — it is the only command that runs the full TypeScript check.
A bare `tsc --noEmit` false-positives on `LayoutProps` before `.next/` exists.

---

## 7. Known issues / gotchas

- **Local `.git` is 189 MiB; the remote is not.** History was rewritten with `git filter-repo` to
  strip `node_modules`, `.next` and `tsconfig.tsbuildinfo`. A fresh clone from GitHub is **328
  KB** — verified. The local repo still carries ~25,800 *unreachable* objects awaiting garbage
  collection. Harmless, but to reclaim the space:
  `git reflog expire --expire=now --all && git gc --prune=now`
- **The rewrite force-pushed `main` and `v2`.** Any pre-existing clone is broken and needs a fresh
  `git clone`, not a pull.
- **macOS TCC.** The project lives under `~/Documents`, which is privacy-protected. If `node`,
  `npm` or `git` start failing with `EPERM: process.cwd`, grant the host app Documents access in
  System Settings → Privacy & Security → Files and Folders, then **restart the app** — TCC grants
  only apply to newly launched processes.
- **`.env.local.example` is committed; `.env.local` is not.** A real key was once pasted into the
  `.example` by mistake. Next.js only ever loads `.env.local`.
- **`v2` is stale** — still at the old initial commit. Only `main` and `v3` are current.

---

## 8. Open work

**Blocking production:**
- Attach `hariankjuneja.tech` in Vercel → Settings → Domains, and point DNS. `SITE_URL` already
  expects it; until then canonical URLs, OG tags and the sitemap name a host that does not serve
  the site.

**Planned, not started** — imagery and credentials:
- **Portrait in the About section.** `profile.avatar` is typed and null; nothing renders it. The
  left column under "01 ABOUT" is the intended home.
- **MeraPath imagery** — into the Cyber सारथी case study and the Experience section. Platform
  screenshots are the highest-value change available to this site, because they would replace the
  placeholder generative covers with the actual product.
- **Credentials section.** The résumé's Training entries (Infosys Springboard, Google Skills) are
  on the CV but nowhere on the site. Note that the LOR, joining letter and internship certificate
  prove *employment*, not certification — grouping them under "Certifications" would overstate
  what they are.
- Adding any of these means introducing `next/image`, which the site currently uses nowhere.

**Two checks before publishing imagery:**
1. If a MeraPath image shows identifiable participants or colleagues, that is MeraPath's call and
   theirs — not ours. Platform screenshots avoid this, but must not expose real names or emails.
2. An LOR scan carries a supervisor's handwritten signature.

**Deferred by choice:** Cmd+K command palette; real embeddings for the chat (see §5).

---

## 9. Commands

```bash
npm install
npm run dev      # local dev server
npm run build    # production build + full typecheck — the real check
npm run lint     # ESLint
```

No env vars are required to build or run. `GROQ_API_KEY` only enables the chat widget.
