# Hariank Juneja — Portfolio

Personal portfolio for Hariank Juneja — AI engineer, full-stack developer, and creative
technologist. Built with Next.js 16 (App Router), TypeScript, and Tailwind CSS v4.

See [`/docs/portfolio-plan.md`](./docs/portfolio-plan.md) for the full implementation plan,
design system, and content sourcing notes.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

- `npm run dev` — local development server
- `npm run build` — production build (also runs typechecking)
- `npm run start` — serve the production build
- `npm run lint` — ESLint

## Editing content

Everything visible on the site — bio, projects, skills, experience, creative work, social
links, résumé — lives in typed files under [`src/content/`](./src/content). Update those files;
no JSX/component changes are needed for content edits.

- `profile.ts` — name, roles, bio, education, socials, résumé link
- `projects.ts` — the four projects (two full case studies + two lighter entries)
- `experience.ts` — internship + leadership timeline
- `skills.ts` — grouped skills/stack
- `creative.ts` — music/film/creative side

To swap the résumé, replace `public/resume/hariank-juneja-resume.pdf` and keep the filename, or
update `profile.resume.href` in `src/content/profile.ts`.

## Environment variables

None required — the site is fully static, with no external APIs or database.

## Deployment

Any Next.js host works (Vercel is the natural fit). Before deploying, update `SITE_URL` in
`src/lib/constants.ts` to the real production domain — it feeds canonical URLs, Open Graph tags,
and the sitemap.

## Known placeholders

See §10 of `docs/portfolio-plan.md` for the full list — in short: no profile photo (the design is
typography/diagram-led on purpose), no Instagram link (none was available), and a couple of
creative-section specifics (film title, etc.) are written generically pending details.
