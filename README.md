# Hariank Juneja — Portfolio

### 🔗 [hariankjuneja.tech](https://hariankjuneja.tech)

Personal portfolio for Hariank Juneja — AI engineer, full-stack developer, and creative
technologist. Built from scratch with Next.js 16 (App Router), TypeScript, Tailwind CSS v4, and
Framer Motion. No database, no CMS, no UI kit.

Every route is statically generated from typed content files, with one deliberate exception:
`/api/chat`, which backs the "Ask Jinx" widget.

## Stack

| | |
|---|---|
| Framework | Next.js 16.3.2 (App Router, Turbopack) · React 19 |
| Language | TypeScript |
| Styling | Tailwind CSS v4 (CSS-first — there is no `tailwind.config.js`) |
| Motion | Framer Motion, via `LazyMotion` |
| Fonts | Geist Sans + Cormorant Garamond, both self-hosted |
| Chat | Groq (`openai/gpt-oss-120b`), OpenAI-compatible endpoint |
| Hosting | Vercel |

## Getting started

```bash
npm install
```

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

- `npm run dev` — local development server
- `npm run build` — production build; **this is the real check**, as it's the only command that
  runs the full TypeScript pass
- `npm run start` — serve the production build
- `npm run lint` — ESLint

A bare `tsc --noEmit` false-positives on `LayoutProps` before `.next/` has been generated, so use
`npm run build` rather than typechecking directly.

## Structure

```
src/app/          routes; layout.tsx composes header + main + footer + chat
src/components/   layout/ ui/ sections/ case-study/ chat/
src/content/      profile, projects, experience, skills, creative, credentials — all typed
src/lib/          cn, constants, motion, chat-context, use-persisted-attribute
```

The homepage is a hero plus eight stacked sections — About, Selected Work, Skills, Experience,
Creative, Credentials, Code, Contact — and there are four case studies at `/work/[slug]`, each
with a generated Open Graph image.

## Editing content

Everything visible on the site lives in typed files under [`src/content/`](./src/content). Update
those; **no JSX or component changes are needed for content edits.**

- `profile.ts` — name, roles, bio, education, socials, résumé link
- `projects.ts` — the four projects (two full case studies + two lighter entries)
  - `cyber-saarthi` deliberately has no live link — it was paid client work
- `experience.ts` — internship + leadership timeline
- `skills.ts` — grouped skills/stack
- `creative.ts` — music/film/creative side
- `credentials.ts` — Google Skills badges, Infosys Springboard and Innovation Ambassador certificates
- `images.ts` — the shared `SiteImage` shape used by the three files above that carry photographs

[`schema.md`](./docs/schema.md) documents the exact shape of each, plus the steps to add a new project
end to end.

To swap the résumé, replace `public/resume/hariank-juneja-resume.pdf` keeping the filename, or
update `profile.resume.href`.

## Environment variables

One, and it's optional: `GROQ_API_KEY`, used only by the "Ask Jinx" chat widget
(`src/app/api/chat`). Everything else is static and builds without it — without the key the chat
route returns a clean 503 and the rest of the site is unaffected.

Locally, copy `.env.local.example` to `.env.local` and fill it in. Get a free key (no card) at
[console.groq.com/keys](https://console.groq.com/keys). On Vercel, add it under the project's
Environment Variables and redeploy — env vars are read at build time, so an existing deployment
won't pick it up.

## Deployment

Deployed on Vercel at **[hariankjuneja.tech](https://hariankjuneja.tech)** — nameservers point at
Vercel, and the apex 308-redirects to `www`.

`SITE_URL` in `src/lib/constants.ts` feeds canonical URLs, Open Graph tags, and the sitemap. It
must match the domain actually serving the site, or every shared link previews against the wrong
host.

## Docs

- [`CONTEXT.md`](./docs/CONTEXT.md) — **start here.** Current state: what exists, what was decided and
  why, and what's still open. Includes a table of decisions that look like bugs but aren't.
- [`architecture.md`](./docs/architecture.md) — how the code fits together
- [`schema.md`](./docs/schema.md) — the shape of everything under `src/content/`
- [`build.md`](./docs/build.md) — scripts, what's been tested, deploy checklist
- [`project.md`](./docs/project.md) — what this is, who it's for, and the content rule that matters most
- [`portfolio-plan.md`](./docs/portfolio-plan.md) — the original pre-build plan and
  design-system rationale

## Content rule

**Nothing on this site is invented.** Every number, employer, and result is quoted from Hariank's
CV or internship report, and every credential shown is a real certificate. Anything not confirmed
by source material is written as an explicit placeholder rather than a plausible-sounding claim.
If you're adding content here, hold to that.

## Known placeholders

- No portrait photo — `profile.avatar` is typed but `null`, and nothing renders it yet.
  (Photography *has* landed elsewhere: the Creative section, the Cyber सारथी gallery, and the
  Experience timeline.)
- No Instagram link — none was available.
- A few creative-section specifics, such as the short film's title, are written generically
  pending details.

§10 of [`docs/portfolio-plan.md`](./docs/portfolio-plan.md) tracks the full list.
