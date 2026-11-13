# Project Context

## Overview

This repository is Stephen Joly's personal website at `stephenjoly.net`. It is a content-focused Next.js App Router application styled with Tailwind CSS and adapted from a portfolio template. The site combines personal branding, long-form writing, speaking history, project case studies, and a contact form.

The project is primarily a frontend application. The contact form uses a Next.js route handler and Resend for email delivery. There is no database or authenticated user area.

## Goals

- Present Stephen's profile, background, and professional story.
- Showcase selected projects and speaking appearances.
- Publish long-form articles through MDX.
- Support a polished, responsive, dark-mode-aware reading experience.
- Remain easy to deploy as a standalone Next.js app.

## Stack

- Next.js 16 with the App Router
- React 19
- TypeScript
- Tailwind CSS v4
- MDX via `@next/mdx`
- `remark-gfm` for GitHub-flavored Markdown features
- `@mapbox/rehype-prism` for code highlighting in MDX
- `next-themes` for theme switching
- `posthog-js` for production pageview analytics

## Runtime And Deployment

- `next.config.mjs` enables MDX page extensions, `output: 'standalone'`, and same-origin `/ingest` rewrites to PostHog's US ingest and asset hosts.
- `src/app/layout.tsx` mounts `src/lib/posthog.tsx`. Analytics initializes only on `stephenjoly.net` and `www.stephenjoly.net`, reads the public project key from `/api/analytics-config`, and registers `site: 'stephenjoly.net'`. It records pageviews and page leaves, with autocapture, surveys, and session recording disabled.
- `POSTHOG_KEY` is a server runtime environment variable. The shared PostHog project uses the `site` event property to distinguish this website's traffic.
- Dokploy builds and deploys the GitHub `main` branch using `Dockerfile`; the app exposes `/health` for deployment checks. `docker-compose.yml` describes a retired deployment, not the current production path.

## Application Structure

- `src/app`
  App Router pages, route handlers, metadata, and page-level content.
- `src/components`
  Shared layout primitives and reusable UI components.
- `src/lib`
  Article discovery, metadata, contact validation/rate limiting, analytics, and other shared utilities.
- `src/images`
  Avatars, portraits, logos, and photo assets bundled with the site.
- `public`
  Static assets served directly, including the resume PDF.

## Routes

- `/`
  Homepage with intro copy, social links, photos, selected coding projects, a consulting-project carousel, recent articles, and a compact career summary.
- `/about`
  Biography with career chapters, portrait, shared social profiles, and a contact invitation.
- `/contact`
  Accessible contact form with inline validation and in-place success; submits to `/api/contact`.
- `/api/contact`
  POST-only Resend delivery handler with server validation, honeypot, bounded request size, and process-local rate limiting.
- `/api/analytics-config`
  Returns the public PostHog project key from the server runtime environment without caching.
- `/health`
  Uncached health response used by deployment checks.
- `/social-card.png`
  Generated social sharing image.
- `/articles`
  Article index built from MDX metadata.
- `/articles/[slug]`
  MDX article pages under `src/app/articles/*/page.mdx`.
- `/projects`
  Split project view with `Coding` and `Consulting` tabs in the `tab` query param; consulting case studies can be linked with the `case` query param.
- `/cv`
  Complete professional record with grouped promotions, education, leadership,
  skills, languages and awards. Includes a résumé download and consulting link.
- `/speaking`
  Curated speaking appearances with outbound links.
- `/uses`
  Equipment, software, and recommendations page.
- `/thank-you`
  Static confirmation page used by the homepage form.

## Content Model

### Articles

Articles live under `src/app/articles/<slug>/page.mdx`. Each article exports:

- `article`
  Title, description, author, and date.
- `metadata`
  Next.js page metadata.
- A default MDX page rendered with `ArticleLayout`.

`src/lib/articles.ts` discovers article files with `fast-glob`, imports their exported metadata, and sorts them by date descending.

### Projects

Projects are authored in `src/app/projects/data.ts` as two structured collections:

- `codingProjects`
  Link-driven cards for software and build projects.
- `consultingProjects`
  Featured and archived case studies for client and advisory work, opened in a modal.

University student mentorship and HomEquity's in-house business process
automation are CV experience, excluded from the consulting project collection.

The `/projects` route renders both collections through a split-view UI. The active view is controlled by the `tab` query param and defaults to `coding`. The `case` query param selects a consulting case study for direct links and browser history.

### Contact Delivery

`src/lib/contact.ts` defines shared validation and the client submission interface.
`src/app/api/contact/route.ts` sends plain-text email through Resend with the visitor
as reply-to and the recipient/sender configured only on the server. No message
content or provider responses are logged. Success means Resend accepted the send;
there is no inbox-delivery webhook. The UI uses the requested “Delivered” wording.
The form retains input on error and focuses the success heading or first invalid
field. About and Contact share `src/lib/socialProfiles.ts`.

### Static Profile Content

Homepage, About, Speaking, and Uses pages are largely authored directly in TSX files. Most content updates are simple source edits rather than CMS-driven changes.

## Shared UI Patterns

- `src/app/layout.tsx` sets global metadata, loads analytics, and wraps all pages in the shared shell.
- `src/app/providers.tsx` manages theme state and preserves system theme behavior.
- `src/components/Layout.tsx` composes the page chrome using the shared header and footer.
- `src/components/Header.tsx` handles desktop/mobile navigation and the right-aligned, always-expanded Contact pill, matching navigation height and typography.
- `src/components/ThemeSelector.tsx` provides the footer’s Light/Dark/System radio controls. Explicit choices persist; System follows device preference through `next-themes`.
- `src/components/SimpleLayout.tsx`, `Container.tsx`, `Card.tsx`, and `Section.tsx` are the main page-building primitives.

## Environment Expectations

Contact delivery requires server-only `RESEND_API_KEY`, `CONTACT_FROM_EMAIL`, and `CONTACT_TO_EMAIL`. Without configuration the endpoint returns a recoverable error, never a fake success. Production analytics requires server runtime `POSTHOG_KEY`; the client fetches this public project key only on the configured production host. See README for setup and rate-limit scope.

## Known Template Inheritance

This project was adapted from a portfolio/blog starter. A newsletter form remains in the homepage source but is not rendered. The `/thank-you` page remains from that template flow; there is no email subscription integration.

## Working Guidance

- Prefer preserving the existing visual language unless a task explicitly asks for redesign.
- Keep page metadata aligned with the visible page content.
- When adding articles, follow the existing MDX folder-per-article pattern.
- When changing navigation, update both header and footer links.
- When changing brand copy or career history, review `/`, `/about`, `/projects`, and the resume PDF in `public/files` for consistency.

## CV

`src/app/cv/page.tsx` server-renders the approved record. `cv.module.css` scopes
the inherited zinc/teal design to this page; `CVNavigation.tsx` supplies scroll
wayfinding. The shared header and footer expose `/cv` as “CV”. Education uses a
native disclosure, and the existing redacted résumé stays in `public/files`.

The content inventory in `docs/cv-experience-points.json` maps 20 roles and 60
detailed bullets to the supplied PDFs and LinkedIn. Preserve all of them when
editing. Use the selected US$41M forecast including contingencies, keep projected
outcomes qualified, and omit private contact and client names. The Deloitte text
link leads to `/projects?tab=consulting`. See `docs/cv-production-brief.md`.

`mockups/cv/` remains the approved standalone design reference, served by the
**CV Mockup** Paseo script. It is separate from the application preview.

## Maintenance Priorities

- Keep `context.md` current when routes, architecture, or content patterns change.
- Remove remaining template leftovers when touched by related work.
- Keep the README accurate when deployment or onboarding expectations change.
- Add local `context.md` files only if a directory grows complex enough to need implementation-specific guidance.
