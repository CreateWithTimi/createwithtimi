# CreateWithTimi V1 Production QA Report

Audit date: 2026-08-26

Production URL: https://createwithtimi.vercel.app

Release classification: CONTROLLED DEMO READY

Launch recommendation: FIX BEFORE SHIP only if manual live-browser QA finds a real route, rendering, navigation, or Formspree regression. Source/build/static audit found no P0 or P1 blockers.

## Scope

This audit covers the approved V1 production site architecture:

- `/`
- `/work/rangers-legends`
- `/start-a-project`
- SPA fallback / unknown-route behavior
- production metadata, sitemap, robots and social preview assets
- Formspree inquiry pipeline source
- interaction/reduced-motion source
- accessibility and factual-safety source checks
- production-origin build output

No visual design, content, Formspree, route, interaction or metadata-direction changes were made.

## Audit Limitation

The sandbox could not resolve `createwithtimi.vercel.app` over DNS, so live production route rendering and in-browser interaction QA could not be completed from this environment.

Verified here:

- source implementation
- Vercel SPA configuration
- production-origin build
- raw built metadata
- sitemap/robots/static asset output
- optimized asset usage
- Formspree source path
- concept-safety/source hygiene

Requires human live-browser confirmation:

- direct route open/refresh on production
- responsive visual checks at 1440, 1024, 768, 430, 390
- mobile menu focus/scroll behavior in a real browser
- production Formspree test submission

## Findings

### P0 - Launch Blockers

None found.

### P1 - Should Fix Before Public Launch

None found in source/build/static audit.

### P2 - Meaningful Post-Launch / Manual Verification

1. Live production route/render QA could not be performed from this sandbox because DNS resolution failed for `createwithtimi.vercel.app`. Human browser QA should confirm direct open, refresh, internal navigation, back/forward and unknown-route behavior.
2. Production Formspree delivery was not automatically tested during this audit by instruction. Human QA should submit one live production inquiry and confirm inbox delivery plus reply behavior.

### P3 - Polish / Known Debt

1. Favicon remains intentionally pending because no approved standalone CWT identity asset exists.
2. WhatsApp appears to be holding a stale preview cache. X and Instagram have already been confirmed working, and the production metadata/source architecture is correct.

## Production Route Status

Expected Vercel behavior:

- `/` routes to the React app.
- `/work/rangers-legends` routes to the React app.
- `/start-a-project` routes to the React app.
- unknown extensionless routes route to the React app and render the V1 404 state.
- real static files remain directly accessible.

Source verification:

- React Router defines `/`, `/work/rangers-legends`, `/start-a-project` and `*`.
- `vercel.json` rewrites extensionless paths to `/index.html` without swallowing static files containing extensions.
- Route-level lazy loading remains enabled.

## Homepage Status

Source confirms the V1 homepage includes:

- hero positioning
- Story -> World -> Experience section
- Featured World / Rangers Legends
- `id="work"`
- `id="how-we-work"`
- How We Work
- Ways to Work Together
- final CTA
- footer through global layout

No development placeholder copy was found in production-facing homepage source.

## Rangers Case Study Status

Source confirms the case study includes:

- intro/hero
- independent concept framing
- Opportunity
- Idea
- Story -> World system
- READ / comic
- EXPLORE / digital
- SHARE / graphics
- WEAR / apparel
- COLLECT / cards
- What This Proves
- live-world bridge
- final CWT CTA

External Rangers Legends CTA points to `https://rangers-legends.vercel.app/`.

All case-study media imports use approved optimized derivatives.

## Start A Project / Formspree Status

Source confirms:

- Formspree endpoint: `https://formspree.io/f/mwlegrkd`
- recipient documented as `createwithtimi@gmail.com`
- required validation remains in place
- radio controls for Step 01 and Step 02
- checkbox multi-select for Step 03
- name, email, organization, description, timeline and budget fields
- honeypot `_gotcha`
- JSON `fetch` submission
- duplicate-submit prevention during submitting state
- success state only after provider success
- error state preserves entered values
- accessible status/error handling exists

Manual production test still required by instruction.

## Mobile / Navigation / Hash Status

Source confirms:

- semantic header/nav/main/footer structure
- mobile menu uses a real button, `aria-expanded`, `aria-controls`, Escape close, focus trap, body scroll lock and link-close behavior
- `WORK` targets `/#work`
- `HOW WE WORK` targets `/#how-we-work`
- hash scrolling respects reduced motion
- global footer navigation uses the same route targets

Manual browser checks required for production rendering, scroll landing and mobile focus behavior.

## Interaction / Reduced Motion Status

Source confirms:

- one `RevealRuntime` IntersectionObserver system
- progressive enhancement: content is not hidden unless `.reveal-ready` is added by JavaScript
- reduced-motion exits before enabling reveal observer
- reduced-motion CSS disables smooth scroll, transform transitions and hover transforms
- hover effects are non-critical

No animation dependency was added.

## Responsive Status

Source confirms targeted containment patterns including:

- `min-width: 0`
- `minmax(0, 1fr)`
- `max-width: 100%`
- mobile recomposition rules for homepage and case-study media
- no global `overflow-x: hidden` masking strategy

Manual visual QA remains required at 1440, 1024, 768, 430 and 390 because production browser access was unavailable from the sandbox.

## Accessibility Status

Source confirms:

- skip link to `#main-content`
- semantic landmarks
- visible `:focus-visible`
- keyboard-accessible mobile menu
- real form inputs, radios, checkboxes, selects and button
- labels and `fieldset` / `legend` usage for project inquiry
- error summary and field-level errors
- submit status live region
- success and error focus management
- `aria-current` only for route/location-aware navigation

No confirmed accessibility blocker found in source.

## Metadata / SEO Status

Production-origin build verified:

- canonical: `https://createwithtimi.vercel.app/`
- `og:type`: `website`
- `og:url`: `https://createwithtimi.vercel.app/`
- `og:image`: `https://createwithtimi.vercel.app/cwt-social-preview.png`
- `twitter:card`: `summary_large_image`
- `twitter:image`: `https://createwithtimi.vercel.app/cwt-social-preview.png`
- robots: `index, follow`

Route metadata source covers:

- Home
- Rangers Legends case study
- Start a Project
- 404 fallback with `noindex, follow`

Rangers route metadata remains concept-safe.

## Static Files / Sitemap / Robots

Production-origin build verified:

- `dist/cwt-social-preview.png`
- `dist/robots.txt`
- `dist/sitemap.xml`

Sitemap contains only:

- `https://createwithtimi.vercel.app/`
- `https://createwithtimi.vercel.app/work/rangers-legends`
- `https://createwithtimi.vercel.app/start-a-project`

`robots.txt` allows normal crawling:

```text
User-agent: *
Allow: /
```

## Media / Performance Snapshot

Production-origin build output:

- served media total: 1.92 MB
- largest image: `collection-hero-main-1200` at 440.76 KB
- main JS: 286.80 KB
- total JS: 322.30 KB
- CSS: 41.04 KB

Production pages import optimized JPG derivatives. Original multi-MB PNGs are not imported by homepage or case-study pages.

## Concept / Factual Safety

Source search found no accidental production-facing claims of:

- official Rangers International commission
- official partnership
- ownership
- commercial performance
- revenue
- audience metrics
- client results
- testimonials
- awards

Rangers Legends is explicitly framed as a concept exploration and not an official commission, partnership, endorsement or licensed project.

## Code / Repo Hygiene

Source search found no:

- `console.log`
- `console.error`
- `TODO`
- `FIXME`
- lorem ipsum
- dummy/sample production copy
- localhost production leakage
- `example.com` production leakage
- committed `.env` file
- private API key, token or credential

The public Formspree endpoint is intentionally present and is not a secret.

## Business Journey

The V1 source structure supports the intended journey:

Home positioning -> Featured Rangers proof -> Rangers case-study thinking -> Start a Project inquiry.

No confirmed dead end found in source.

## Manual Production QA Checklist

Before final public announcement, verify in a real browser:

1. Open and refresh `/`.
2. Open and refresh `/work/rangers-legends`.
3. Open and refresh `/start-a-project`.
4. Open and refresh `/this-route-does-not-exist` and confirm the app 404 state appears.
5. Test header/footer WORK and HOW WE WORK from all routes.
6. Test mobile menu open, close, Escape, link close, scroll lock and focus behavior at 390 and 430.
7. Check layouts at 1440, 1024, 768, 430 and 390.
8. Confirm all homepage and Rangers case-study images load.
9. Submit one production Formspree test inquiry and confirm inbox delivery.
10. Confirm reduced-motion behavior.
11. Recheck `/cwt-social-preview.png`, `/robots.txt` and `/sitemap.xml`.
12. Confirm X, Instagram and LinkedIn preview cards; treat WhatsApp stale preview as cache behavior unless source metadata regresses.
