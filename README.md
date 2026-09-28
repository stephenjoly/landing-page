# Stephen Joly Website

Personal website and writing site built with Next.js 14, TypeScript, Tailwind CSS, and MDX.

The site is content-first: a homepage with a short resume-style work history, an About page, MDX articles, a split `Coding` / `Consulting` projects page, a Speaking page, and a Uses page.

## Stack

- Next.js 14 App Router
- React 18
- TypeScript
- Tailwind CSS v4
- MDX via `@next/mdx`
- `remark-gfm` and `rehype-prism` for article rendering
- `next-themes` for dark mode
- `next-plausible` for analytics

## Routes

- `/` homepage with intro copy, social links, selected articles, and a work-history card
- `/about` biography and profile links
- `/contact` contact form with in-place confirmation
- `/api/contact` POST-only email delivery endpoint
- `/articles` article index
- `/articles/[slug]` MDX article pages
- `/projects` split view for coding projects and consulting case studies
- `/speaking` speaking appearances
- `/uses` equipment and software recommendations
- `/thank-you` static form confirmation page
## Local Development

Install dependencies and start the dev server:

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

Useful pages while working:

- `http://localhost:3000/`
- `http://localhost:3000/about`
- `http://localhost:3000/projects`
- `http://localhost:3000/projects?tab=coding`
- `http://localhost:3000/projects?tab=consulting`
- `http://localhost:3000/articles`

If Next.js gets into a stale dev-cache state after branch switches or config changes:

```bash
rm -rf .next
npm run dev
```

## Project Structure

```text
src/
  app/          App Router pages, route handlers, and page-authored content
  components/   Shared UI primitives and layout components
  images/       Local image and logo assets
  lib/          Article discovery and utility helpers
public/         Static files such as the PDF resume
```

## Content Editing

### Articles

Articles live under:

```text
src/app/articles/<slug>/page.mdx
```

Each article exports metadata and renders through the shared article layout. The article index is generated from those files.

### Projects

Projects are defined in:

```text
src/app/projects/data.ts
```

The coding projects and consulting case studies use separate data collections and different interaction patterns:

- coding projects link out directly
- consulting projects open a modal case-study view

The projects toggle shows each collection's total, padded to two digits. Coding
counts include works in progress; counts update automatically with the data.
The active pill slides between categories, with animation disabled for reduced motion.

### Homepage / About / Speaking / Uses

These pages are authored directly in TSX under `src/app/.../page.tsx`.

## Build

Run a production build locally with:

```bash
npm run build
```

Start the production server with:

```bash
npm run start
```

## Docker

Build and run the site manually:

```bash
docker build -t stephenjoly-site .
docker run --rm -p 3000:3000 --env-file .env.local stephenjoly-site
```

Or use Docker Compose:

```bash
docker compose up --build
```

Then open `http://localhost:2001`.

## Deployment

Dokploy builds and deploys the `main` branch directly from GitHub using the repository Dockerfile.
Its GitHub App triggers deployments for pushes to `main`. The application exposes `/health` for
rolling, zero-downtime deployment checks. GitHub Actions validates that the Dockerfile still builds,
but it does not publish or deploy an image.

Production traffic reaches the Dokploy application through the shared Traefik instance. The retired
Compose container on `vm-production` is retained in a stopped state as a short-term rollback target.

## Consulting case studies

Open `/projects?tab=consulting` and select a project to view the Reader Hybrid
layout, based on the local `ui.pen` frame “Detail Option E — Reader Hybrid”.
The responsive dialog includes client/duration metadata, context, contributions,
and a contact link that opens an email draft with the case-study title. Industry
is omitted until authored data is available. Keyboard focus stays inside the
reader; Escape, the close button, and clicking outside dismiss it. Long case
studies scroll inside a viewport-height panel while the classification and close
button remain visible.

## Known Cleanup Items

- the homepage newsletter form is currently a UI flow only and posts to `/thank-you`
- some template-era artifacts still remain in the repository and are being cleaned up incrementally


## Contact delivery

The Contact page posts to a Next.js route handler using the
[Resend send-email API](https://resend.com/docs/api-reference/emails/send-email).
Configure these **server-only runtime environment variables** in your deployment
or local `.env.local` (never commit values):

| Variable | Purpose |
| --- | --- |
| `RESEND_API_KEY` | Resend API key with sending permission |
| `CONTACT_FROM_EMAIL` | Sender address on a domain verified in Resend |
| `CONTACT_TO_EMAIL` | Stephen’s receiving inbox |

Do not prefix these variables with `NEXT_PUBLIC_`. Configure them on the running
container, not as build arguments. Missing configuration produces a recoverable
error and preserves the visitor’s input. The visitor’s email is used as `reply_to`;
messages are plain text and are not logged by application code.

Client and server validate required name, email and message, format, and field
lengths. The handler rejects the honeypot and caps request bodies at 32 KiB.
Basic rate limiting allows five valid attempts per normalized email and thirty
total attempts per 15-minute window, with a `Retry-After` header when exhausted.
Only hashes and counters are held in memory. The global cap prevents rotating
email addresses from bypassing the send budget; IP headers are not trusted.
Limits are per Node process and reset on restart. Use a shared limiter or proxy
rate limiting before scaling to multiple replicas; this is not a durable quota.

A successful response means Resend accepted the email, not confirmed inbox
arrival. The requested success design says “Delivered”; there is no delivery
webhook or message persistence. Network/provider errors allow retry, which can
produce a duplicate if the provider accepted a send before the connection failed.

Run `npm run test:contact` for handler and validation checks using a mocked provider.
No test sends live email. Before release, configure the variables and verify one
real delivery and reply-to from the deployed site.
