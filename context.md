# Project Context

## Overview

This repository is Stephen Joly's personal landing page and content site. It is a content-focused Next.js application built on the App Router, styled with Tailwind CSS, and customized from a template-based starting point. The site combines personal branding, long-form writing, speaking history, project case studies, and a small newsletter-style signup flow.

The project is primarily a frontend application. The contact form uses a Next.js route handler and Resend for email delivery. There is no database or authenticated user area.

## Goals

- Present Stephen's profile, background, and professional story.
- Showcase selected projects and speaking appearances.
- Publish long-form articles through MDX.
- Support a polished, responsive, dark-mode-aware reading experience.
- Remain easy to deploy as a standalone Next.js app.

## Stack

- Next.js 14 with the App Router
- React 18
- TypeScript
- Tailwind CSS v4
- MDX via `@next/mdx`
- `remark-gfm` for GitHub-flavored Markdown features
- `@mapbox/rehype-prism` for code highlighting in MDX
- `next-themes` for theme switching
- `next-plausible` for analytics

## Runtime And Deployment

- `next.config.mjs` enables MDX page extensions and `output: 'standalone'`.
- Plausible analytics is injected in the root layout.
- Docker support exists via `Dockerfile` and `docker-compose.yml`.

## Application Structure

- `src/app`
  App Router pages, route handlers, metadata, and page-level content.
- `src/components`
  Shared layout primitives and reusable UI components.
- `src/lib`
  Small utilities for article discovery and date formatting.
- `src/images`
  Avatars, portraits, logos, and photo assets bundled with the site.
- `public`
  Static assets served directly, including the resume PDF.

## Routes

- `/`
  Homepage with intro copy, social links, resume-style experience list, selected articles, photo strip, and a newsletter form UI.
- `/about`
  Biography with career chapters, portrait, shared social profiles, and a contact invitation.
- `/contact`
  Accessible contact form with inline validation and in-place success; submits to `/api/contact`.
- `/api/contact`
  POST-only Resend delivery handler with server validation, honeypot, bounded request size, and process-local rate limiting.
- `/articles`
  Article index built from MDX metadata.
- `/articles/[slug]`
  MDX article pages under `src/app/articles/*/page.mdx`.
- `/projects`
  Split project view with `Coding` and `Consulting` tabs, persisted through the `tab` query param.
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

Projects are hard-coded in `src/app/projects/data.ts` as two structured collections:

- `codingProjects`
  Link-driven cards for software and build projects.
- `consultingProjects`
  Modal-driven case studies for client and advisory work.

The `/projects` route renders both collections through a split-view UI. The active view is controlled by the `tab` query param, defaults to `coding`, and preserves the existing modal experience for consulting projects.

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
- `src/components/Header.tsx` handles desktop/mobile navigation and the theme toggle.
- `src/components/SimpleLayout.tsx`, `Container.tsx`, `Card.tsx`, and `Section.tsx` are the main page-building primitives.

## Environment Expectations

Contact delivery requires server-only `RESEND_API_KEY`, `CONTACT_FROM_EMAIL`, and `CONTACT_TO_EMAIL`. Without configuration the endpoint returns a recoverable error, never a fake success. See README for setup and rate-limit scope.

## Known Template Inheritance

This project was clearly adapted from a portfolio/blog starter. A few inherited artifacts still exist and should be treated carefully when making updates:

- Some commented references to older template branding remain in project data.
- The homepage newsletter form currently posts to `/thank-you` only; it is a UI flow, not a real email subscription integration.

## Working Guidance

- Prefer preserving the existing visual language unless a task explicitly asks for redesign.
- Keep page metadata aligned with the visible page content.
- When adding articles, follow the existing MDX folder-per-article pattern.
- When changing navigation, update both header and footer links.
- When changing brand copy or career history, review `/`, `/about`, `/projects`, and the resume PDF in `public/files` for consistency.

## Maintenance Priorities

- Keep `context.md` current when routes, architecture, or content patterns change.
- Remove remaining template leftovers when touched by related work.
- Keep the README accurate when deployment or onboarding expectations change.
- Add local `context.md` files only if a directory grows complex enough to need implementation-specific guidance.
