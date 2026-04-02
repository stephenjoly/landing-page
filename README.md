# Stephen Joly Website

Personal website and writing site built with Next.js 14, TypeScript, Tailwind CSS, and MDX.

The site is content-first: a homepage with a short resume-style work history, an About page, MDX articles, a split `Coding` / `Consulting` projects page, a Speaking page, a Uses page, and an RSS feed.

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
- `/articles` article index
- `/articles/[slug]` MDX article pages
- `/projects` split view for coding projects and consulting case studies
- `/speaking` speaking appearances
- `/uses` equipment and software recommendations
- `/thank-you` static form confirmation page
- `/feed.xml` RSS feed generated from article content

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

## Environment Variables

Create `.env.local` with:

```bash
NEXT_PUBLIC_SITE_URL=https://your-domain.example
```

`NEXT_PUBLIC_SITE_URL` is required for:

- RSS feed generation in `/feed.xml`
- absolute metadata and feed links

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

Each article exports metadata and renders through the shared article layout. The article index and RSS feed are generated from those files.

### Projects

Projects are defined in:

```text
src/app/projects/data.ts
```

The coding projects and consulting case studies use separate data collections and different interaction patterns:

- coding projects link out directly
- consulting projects open a modal case-study view

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

## Known Cleanup Items

- `src/app/feed.xml/route.ts` still contains inherited placeholder author/feed metadata and should be updated to match the site
- the homepage newsletter form is currently a UI flow only and posts to `/thank-you`
- some template-era artifacts still remain in the repository and are being cleaned up incrementally
