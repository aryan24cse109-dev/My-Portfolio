# Aryan Agarwal — Developer Portfolio

A dark, editorial portfolio for Aryan Agarwal, focused on full-stack development, backend engineering, and practical software projects. The Next.js application lives in `frontend/`; the existing public assets remain in place.

## Stack

- Next.js App Router, React, TypeScript
- Tailwind CSS 4 via PostCSS, with a small custom CSS design system
- Motion for React and Lucide React
- Next Image and Metadata API

## Routes

- `/` — introduction, about, skills snapshot, selected projects, open-source overview
- `/skills` — technologies grouped by area
- `/projects` — the five portfolio entries
- `/projects/[slug]` — data-driven project case studies
- `/experience` — technical training, project leadership, and hackathons
- `/github` — GitHub profile, public repositories, contribution heatmap, and selected open-source activity
- `/contact` — profile links and a server-validated contact form
- Custom not-found route

## Local development

```bash
cd frontend
npm install
npm run dev
```

Open `http://localhost:3000`.

Checks:

```bash
npm run typecheck
npm run lint
npm run build
```

Set `NEXT_PUBLIC_SITE_URL` to the eventual production origin before building for deployment. The app uses localhost only in development; production does not emit localhost canonical, sitemap, or JSON-LD URLs when the variable is unset.

## Content and assets

Project details live in `frontend/src/data/projects.ts`; profile links and skill groups live in `frontend/src/data/site.ts`; experience records live in `frontend/src/data/experience.ts`. See [docs/ASSET_MAP.md](docs/ASSET_MAP.md), [docs/CONTENT_GUIDE.md](docs/CONTENT_GUIDE.md), and [docs/DESIGN_SYSTEM.md](docs/DESIGN_SYSTEM.md).

## Optional integrations

Copy `.env.example` to `.env.local` and configure values only on the server:

- `GITHUB_TOKEN` — server-side GitHub token for the contribution calendar and PR/issue/review counts. Public profile and repository requests can still be displayed without it. Grant only the read access needed for public user data.
- `GITHUB_CACHE_SECONDS` — in-process dashboard cache lifetime; defaults to 3600 seconds.
- `RESEND_API_KEY`, `CONTACT_EMAIL`, and `RESEND_FROM_EMAIL` — Resend delivery credentials and recipient/sender. Configure a sender address verified with Resend. The form reports unavailable delivery until all three values are set.
- `NEXT_PUBLIC_SITE_URL` — deployed origin, required for absolute production metadata, sitemap, and robots URLs. Do not set it to localhost in production.

No email address, sender domain, or live email delivery is assumed by the code. Contact uses a process-local rate limiter and honeypot; for a multi-instance deployment, add a shared rate-limit store before relying on it against sustained abuse.

Existing PNG files and names are preserved. The Return-Rate-Reducer screenshots visibly include prohibited third-party branding/claims, so the UI uses a neutral CSS matrix illustration instead. The supplied open-source PR list is shown without a merged-count claim pending per-PR status verification.

## Resume / CV

The resume path is centralized in `frontend/src/data/site.ts`. The View/Download actions are rendered only when this file exists:

`frontend/public/resume/Aryan-Agarwal-CV.pdf`

To add it: export the final CV as a PDF with that exact filename, put it in that folder, then run the app and verify both View Resume (opens a new tab) and Download CV (downloads with the specified filename). Rebuild and redeploy after the file is added. No placeholder document is included.

## Deployment

See [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md). Deployment is intentionally not performed as part of this local implementation.
