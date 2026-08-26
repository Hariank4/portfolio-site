# Project context

Orientation for anyone (human or agent) picking this up cold. `CLAUDE.md` has the rules,
`architecture.md` has the how, `schema.md` has the content shapes. This file is the **state**:
what exists, what was decided and why, and what is still open.

Last updated: 2026-08-25.

---

## 1. What this is

Hariank Juneja's personal portfolio. Next.js 16 (App Router), React 19, TypeScript,
Tailwind v4 (CSS-first, no `tailwind.config.js`), Framer Motion.

80 tracked files. 13 routes: one homepage of stacked sections, four static case studies at
`/work/[slug]`, and one dynamic API route.

**Live:** https://hariankjuneja.tech — DNS propagated, nameservers on Vercel, SSL working.
The apex 308-redirects to `www`. `portfolio-site-nine-eta-34.vercel.app` still resolves too.
**Repo:** https://github.com/Hariank4/portfolio-site
**Branches:** `main` is current. `image-addon` is the active working branch (imagery/credentials).
`ui/ux` and `v3` are merged history; `v2` is stale at the old initial commit.

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
| Generative project covers | `project-cover.tsx` is still a **stand-in for screenshots**, not a design choice — it just no longer applies everywhere. Real photography now lives in `public/creative/` (Creative section) and `public/work/` (Cyber सारथी gallery, MeraPath timeline row), all through `ui/photo.tsx`. `profile.avatar` is still `null` and rendered nowhere. |
| Two logo marks, swapped in CSS | The mark is a raster with its background baked in, so it cannot inherit `--bg`. Both variants are mounted and `data-theme` toggles which one displays — same approach as `ThemeToggle`'s two icons. |
| `* { border-color: var(--color-border) }` is unlayered | It therefore overrides every Tailwind `border-*` utility. `border-border-strong` does not actually work anywhere. Pre-existing; noted, not fixed. |
| `bolt/` excluded from tsconfig and eslint | An untracked scratch Vite prototype living inside the repo. It failed the main typecheck until excluded. |
| `--radius-md` / `--radius-lg` look unused | Grepping the `.tsx` for them returns nothing, so a dead-code pass will flag them. They are **live**: Tailwind v4 maps the `--radius-*` namespace onto the `rounded-*` utilities, so `rounded-lg` compiles to `border-radius: var(--radius-lg)` and deleting the token silently changes every rounded corner on the site. Verify a token against the *compiled* CSS in `.next/static/chunks/*.css`, not the source. `--accent-soft` and `--success` were checked the same way, were genuinely unreferenced, and have been removed. |

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

Fonts dominate a cold load — the JS bundle is small and photographs are all below the fold behind
`next/image`. That makes font decisions the highest-leverage work here, with one exception noted
below.

Measured wins: display-font `wght` build (−184KB), dropping GeistMono entirely and using sans for
label type (−70KB), keeping content files out of the client bundle (−40KB), `LazyMotion` (−8KB
gzipped), `template.tsx` back to a Server Component using a CSS animation, and recompressing the
two app icons (−173KB, below).

**`src/app/icon.png` is a real cold-load cost, and it is easy to miss.** Next renders it as
`<link rel="icon" sizes="512x512">`, so every page load fetches it — it is not a decorative asset.
It shipped as a near-uncompressed 512×512 PNG at 230KB, *larger than the entire Geist font*, which
is why the "fonts are ~98% of the bytes" claim that used to sit here was wrong. Both it and
`apple-icon.png` are now 256-colour palette PNGs at the same 512×512 (230→141KB and 216→132KB,
RMSE 0.26/255 — imperceptible on a monochrome signature mark). `apple-icon.png` is deploy weight
only; iOS fetches it just on "add to home screen". If either is ever re-exported, re-quantise it —
`Image.open(p).convert("RGB").quantize(colors=256).save(p, optimize=True)` via Pillow.

There is deliberately **no** `dynamic()`, `Suspense`, `React.lazy`, or artificial loading state
anywhere in the app. At this size direct imports are faster; do not add code-splitting without a
measurement showing it helps.

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
- **`v2` is stale** — still at the old initial commit. `main` is the current line.
- **`bolt/` is an untracked scratch Vite prototype** living inside the repo. It is excluded in
  both `tsconfig.json` and `eslint.config.mjs`; it broke the main typecheck until it was. Not
  part of the build, not committed.
- **Fontsource ships all subsets** (Cyrillic, Vietnamese) into `.next/static/media` — 11 woff2
  files. This is *not* a problem: each `@font-face` is `unicode-range`-gated, and a real browser
  downloads only 3. Verified. Don't "optimise" it.

---

## 8. Open work

**Nothing is blocking production.** The domain is live and the site is deployed.

**Done** — photography landed (Aug 2026), all via `ui/photo.tsx` and the `SiteImage` type:
- **Creative section** — one 4:5 anchor plus two stacked shots, above the three cards. Names the
  band (Moksh) and the War of Bands win at VIHAAN '26, BIMTECH, both confirmed by the user and
  the certificate scan.
- **Cyber सारथी gallery** — unnumbered lead strip above §01, including the platform itself on
  screen. This was the highest-value image available and it is now in. The team photos beside it
  are a `PhotoCarousel` (arrows + dots) — it replaced an earlier hover-fanned pile, which was
  undiscoverable on touch.
- **MeraPath** — a supporting shot on the Experience timeline row.
- **Credentials section** (Aug 2026) — new `06 CREDENTIALS` section between Creative and Code,
  `src/content/credentials.ts` + `sections/credentials.tsx`. Five Google Skills badges (real PNGs
  from the Skills profile) linking out to the one real verify URL — the public profile itself, not
  a per-badge link, since Credly-style individual verify links don't exist here. Infosys Springboard
  is 4 real certificate scans (2 PDF course-completion certs rendered to PNG via `sips`, 2 already
  images) in a 2-up grid, captioned with course + date. Innovation Ambassador — MoE's Innovation
  Cell & AICTE, *not* Infosys despite the similar-sounding name — is likewise 3 real certificate
  scans (Foundation, Advanced, Re-skilling; the last dated the same day this was built), PDF pages
  rendered via `sips` then alpha-cropped to just the certificate with Pillow (the raw page render
  has a transparent margin around it, and PIL's naive RGB `.convert()` turns that transparency
  black rather than white — crop on the alpha channel's bbox, not an RGB diff against white).
  Subsequent sections renumbered: Code is now `07`, Contact `08`. The LOR, offer letter and
  internship certificate stay off this section — they
  prove *employment*, not certification. VIHAAN '26 stays in Creative, since it evidences a
  competitive win.

**Planned, not started:**
- **Portrait in the About section.** `profile.avatar` is typed and null; nothing renders it. The
  left column under "01 ABOUT" is the intended home.

**Checks before publishing any further imagery** — each of these caught something real:
1. If a MeraPath image shows identifiable participants or colleagues, that is MeraPath's call.
   The photos now on the site were cleared by the user.
2. **Look at what is in frame, not just who.** `cs-recognition.jpg` has a cheque in it, and the
   original had a legible Axis Bank MICR line, account code and authorised signature — the
   *drawer's* banking data, not the subject's, so subject consent does not cover it. It ships
   with those three regions destroyed in the source file: downsampled to a handful of pixels,
   then rescaled. A CSS blur would not do — it ships the original bytes. An LOR scan carries a
   supervisor's signature for the same reason.
3. Two source photos carry a GPS Map Camera watermark burning in the office street address and
   coordinates, plus a staff directory on the wall behind. The user has cleared these — the
   extensions are in-house landlines — but neither is published yet.

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
