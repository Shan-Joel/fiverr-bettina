# Privatpraxis Bettina Wittmann — Frontend

Next.js (App Router) + Tailwind CSS frontend for the aesthetic-medicine practice,
using WordPress as a headless CMS over its REST API.

## ⭐ Switching the WordPress backend — the one thing to know

There is exactly **one** place that defines which WordPress install the site
reads from: the **`WP_API_URL`** environment variable.

```bash
# .env.local  (local)   — or the host's env vars (production)
WP_API_URL=https://seeyourwebsite.xyz/bettina   # dev backend (current)
```

To repoint the whole site at the client's live WordPress, change that one line
and redeploy. Everything follows from it automatically:

- all REST requests (`lib/wp.ts` is the only module that reads it);
- the allowed image domain for `next/image` (`next.config.ts` derives the host
  from the same variable).

No WordPress hostname is hardcoded anywhere else.

## Environment variables

| Variable | Required | Description |
|----------|----------|-------------|
| `WP_API_URL` | yes | WordPress base URL, no trailing slash, no `/wp-json`. |
| `NEXT_PUBLIC_SITE_URL` | recommended | Public URL of this site, used for canonical URLs, sitemap and Open Graph. Defaults to `http://localhost:3000`. |
| `REVALIDATE_SECRET` | for instant updates | Shared secret for on-demand revalidation. Must match the value in the WordPress "Revalidate Frontend on Save" snippet. Generate with `openssl rand -hex 24`. |

Copy `.env.example` to `.env.local` to get started.

## On-demand revalidation (instant content updates)

The route `app/api/revalidate/route.ts` lets WordPress refresh the live site the
moment content is saved. WordPress (snippet 07 — see `../wordpress/README.md`)
POSTs to `/api/revalidate` with the shared `REVALIDATE_SECRET`; the endpoint
expires the WordPress data cache (tag `"wp"`) and regenerates all routes, so
changes appear within ~1–2 seconds — no ISR wait, no redeploy.

To enable it in production: set `REVALIDATE_SECRET` in the Vercel project env
vars (same value as the WordPress snippet) and redeploy. The ISR `revalidate`
interval (`REVALIDATE_SECONDS` in `lib/config.ts`) then only acts as a
background fallback and can be raised to reduce regenerations.

## Requirements

- **Node.js ≥ 20.9** (see `.nvmrc` → `nvm use`). Next.js 16 will not run on 18.

## Scripts

```bash
npm install        # install dependencies
npm run dev        # local dev server
npm run build      # production build (also runs type-checking)
npm start          # serve the production build
npm test           # unit tests (Vitest) for the WP client + SEO helpers
```

## How it works

- **Rendering:** static generation + ISR (`revalidate = 300`), so content edited
  in WordPress appears on the live site within ~5 minutes with no redeploy.
- **Data:** `lib/wp.ts` fetches treatments, pages and global options. ACF fields
  arrive pre-formatted via the WordPress `acf_data` REST field.
- **SEO:** per-route metadata (canonical, Open Graph, Twitter) in `lib/seo.ts`,
  JSON-LD (`MedicalBusiness`, `MedicalProcedure`, `FAQPage`, `BreadcrumbList`),
  plus generated `sitemap.xml` and `robots.txt`.
- **Design:** brand tokens (sage/cream/sand) and the Garamond type pairing live
  in `app/globals.css`; reusable pieces live in `components/`.

## Project structure

```
app/                 routes (home, treatments/[slug], about, contact, imprint, privacy)
  sitemap.ts         generated sitemap        robots.ts  generated robots
components/           Header, Footer, Hero, TreatmentCard, FaqAccordion, ...
lib/
  config.ts          the single source for WP_API_URL  ← change backend here
  wp.ts              the only module that calls WordPress
  types.ts seo.ts fonts.ts
```

## Deploying to Vercel

1. Import the repo; set the project root to `frontend/`.
2. Add env vars `WP_API_URL` and `NEXT_PUBLIC_SITE_URL` (production domain).
3. Deploy. ISR + image optimization work out of the box.

The WordPress backend setup is documented in
[`../wordpress/README.md`](../wordpress/README.md).
