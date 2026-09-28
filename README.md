# eDesigrs.monster

Premium domain sales site for **eDesigrs.monster** — optimized for SEO, conversion, mobile UX, and Core Web Vitals. Built for Cloudflare Workers & Pages (free plan).

## Stack

- Astro (static output)
- Tailwind CSS v4
- Cloudflare Worker (`src/worker.ts`) for HTTPS canonicalization, security headers, and lightweight `/api/*` endpoints
- Sitemap + robots.txt + Schema.org Product / Organization / WebSite

## Local development

```bash
npm install
npm run dev
```

Open [http://127.0.0.1:4321](http://127.0.0.1:4321).

## Build & deploy (Cloudflare free plan)

```bash
npm run build
npx wrangler deploy
```

Or use the combined script:

```bash
npm run deploy
```

Map the Worker/Pages project to the custom domain `edesigrs.monster` in the Cloudflare dashboard. Stay on the Workers & Pages free plan — no paid bindings required.

### GitHub remote

Target repository: `https://github.com/Mrerg7/edesigrsmonsterv1`

If the empty repo does not exist yet, create it on GitHub (no README), then:

```bash
git remote add github https://github.com/Mrerg7/edesigrsmonsterv1.git
git push -u github main
```

## Key routes

| Route | Purpose |
| --- | --- |
| `/` | Primary listing with CRO hero, trust, FAQ |
| `/portfolio/` | Domain marketplace with filters |
| `/portfolio/[slug]/` | Individual domain pages |
| `/blog/` | Valuation guides & market content |
| `/changelog/` | Deployment changelog |
| `/robots.txt` | Crawler rules + sitemap pointer |

## Lead capture

`POST /api/lead` accepts JSON `{ email, name?, intent?, offer?, source? }` and returns a success payload. Wire to Email Routing / a webhook later without changing the UI.

## Verification checklist

- [x] Canonical HTTPS host enforcement in Worker
- [x] Structured data for Product, Organization, WebSite
- [x] XML sitemap via `@astrojs/sitemap`
- [x] Mobile nav + 48px tap targets + 16px base type
- [x] Dark/light mode toggle
- [x] Exit-intent email capture
- [x] Multiple CTAs by price tier on portfolio detail pages

## Contact

Acquisition inquiries: sales@desertrich.com
