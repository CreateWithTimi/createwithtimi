# CreateWithTimi Studio

CreateWithTimi Studio is a new independent creative-technology studio website.

The V1 site is intentionally small:

- `/` - Studio homepage
- `/work/rangers-legends` - flagship concept case study
- `/start-a-project` - focused project inquiry experience

This repository is not an extension of Rangers Legends. Rangers Legends remains a separate live experience and will be presented here only as a case study explaining the thinking behind the concept.

## Stack

- Vite
- React
- JavaScript
- React Router

No TypeScript, Next.js, Tailwind, CMS, backend, animation framework, or state-management library has been introduced for Milestone 00.

## Scripts

```bash
npm install
npm run dev
npm run build
npm run preview
```

## Project Inquiry Delivery

The `/start-a-project` inquiry form uses Formspree as the temporary V1 delivery provider.

- Provider: Formspree
- Form: `CWT Project Inquiries`
- Endpoint: `https://formspree.io/f/mwlegrkd`
- Recipient: `createwithtimi@gmail.com`
- No secret key is required in the browser for this Formspree setup.

Local setup:

1. Run `npm run dev`.
2. Submit a test inquiry through `/start-a-project`.
3. Confirm receipt in Formspree and at `createwithtimi@gmail.com`.

Vercel setup:

1. Deploy the current V1 build.
2. Submit a test inquiry through `/start-a-project`.
3. Confirm receipt in Formspree and at `createwithtimi@gmail.com`.
4. Confirm replying to the Formspree email targets the submitted email address if reply behavior is configured.

Formspree is the V1 delivery provider and may later be replaced by CWT-owned domain/email infrastructure.

## SEO and Shareability

The site uses lightweight route-aware metadata for title, description, robots, canonical URLs, Open Graph, and Twitter/X summary-card previews.

- Default title: `CreateWithTimi — We Build Worlds Around Stories People Care About`
- Social preview asset: `public/cwt-social-preview.png`
- Source/reference preview asset: `docs/visual-reference/cwt-social-preview.jpg`
- Required production origin variable: `VITE_SITE_URL`

Local setup:

1. Copy `.env.example` to `.env` if you need local production-origin testing.
2. Set `VITE_SITE_URL` to the deployment origin when testing absolute canonical and social URLs.
3. Leave `VITE_SITE_URL` empty for ordinary local development.

Vercel setup:

1. Add `VITE_SITE_URL` in the Vercel project environment variables once the production origin is confirmed.
2. Use the final deployed origin, for example `https://your-production-origin`, without a trailing slash.
3. Rebuild after setting or changing the value.

Canonical behavior:

- Known public routes receive canonical URLs only when `VITE_SITE_URL` is available.
- Unknown/404 routes are marked `noindex, follow` and do not receive a canonical URL.

Sitemap and robots behavior:

- `robots.txt` allows normal crawling.
- `sitemap.xml` is generated during production builds only when `VITE_SITE_URL` is set.
- The sitemap includes only `/`, `/work/rangers-legends`, and `/start-a-project`.

Post-deploy preview validation:

- Test share cards on WhatsApp, X, LinkedIn, and Discord.
- Confirm the image, title, description, canonical URL, `og:url`, and absolute social-image URL.

Favicon status: pending until an approved standalone favicon or identity asset exists.

## Source Structure

```text
src/
  assets/       approved local assets only
  components/   shared UI primitives and reusable sections
  content/      structured route/content data
  layouts/      global app shell and route layouts
  pages/        route-level views
  styles/       global CSS, tokens, accessibility, responsive safeguards
docs/
  VISUAL_SYSTEM.md
  V1_MILESTONE_PLAN.md
CWT_STUDIO_BRIEF.md
```

## Canonical Planning Documents

- `CWT_STUDIO_BRIEF.md` - positioning, content, routes, business language, and safeguards.
- `docs/VISUAL_SYSTEM.md` - visual-system foundation, tokens, grid, media defaults, and responsive intent.
- `docs/V1_MILESTONE_PLAN.md` - approved incremental V1 sequence.

## Milestone 00 Boundary

Milestone 00 establishes the product, content, design, and engineering foundation only. It does not implement the homepage, Rangers Legends case study, Start a Project form, speculative motion, imported Rangers assets, deployment, or GitHub pushes.
