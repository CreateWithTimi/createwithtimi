# M03 Motion portfolio — review handoff

Status: implemented locally; not deployed. Verification completed 20 October 2026.

## Release contents

- `/motion`: founder introduction, one genuine project, evidenced capabilities, Motion Lab introduction, contact.
- `/motion/drag-to-cart`: personal/educational classification, component breakdown, walkthrough, contribution, limitations, and external live-experience links.
- Genuine 1440 × 1120 screenshot captured from https://cwt-drag-to-cart.vercel.app/ (approximately 64 kB). No generated project imagery.
- Shared Motion navigation and a compact homepage introduction after Selected Work.
- `/start-a-project?service=motion`: shorter enquiry mode, optional compensation context, validated project context, and direct email fallback. Default studio questions and validation retained.
- Published-project lookup, lazy routes, route metadata, sitemap additions, and route focus handling after lazy content mounts.
- Small reliability fixes: effect-local reveal registrations for StrictMode, accessible mobile-dialog name, tablet story-grid containment.
- No packages added, no Rive runtime installed, no standalone experiment repository changed.

## Files

Added:
- `src/pages/MotionPage.jsx`
- `src/pages/MotionProjectPage.jsx`
- `src/components/motion/MotionShared.jsx`
- `src/components/RouteFocus.jsx`
- `src/content/motion.js`
- `src/lib/inquiry.js`
- `src/styles/motion.css`
- `src/assets/motion/drag-to-cart-preview.jpg`
- `tests/motion.test.js`
- This report.

Modified:
- `src/main.jsx`
- `src/content/site.js`
- `vite.config.js`
- `src/pages/HomePage.jsx`
- `src/pages/StartAProjectPage.jsx`
- `src/components/layout/SiteHeader.jsx`
- `src/components/RevealRuntime.jsx`
- `src/layouts/AppLayout.jsx`
- `src/styles/global.css`

## Verification performed

- `node --test tests/motion.test.js`: 5/5 passed. Covers published lookup, query allowlisting, independent motion/studio validation, and context/reply-to/honeypot payload fields.
- Production build passed, including a build with `VITE_SITE_URL=https://createwithtimi.vercel.app`.
- `git diff --check` passed.
- Browser direct loads: homepage, Rangers, OmniRetail, studio inquiry, motion inquiry, Motion index, and project detail.
- Browser DOM containment checks at 1440, 1024, 768, 430, 390, and 320px across those seven page variants. New pages had no horizontal overflow. Homepage overflow at 768px was corrected by giving its existing story sequence a full tablet row; 768px was rechecked successfully.
- Genuine preview image loaded on project detail; no broken completed image elements were reported in the route matrix. Offscreen lazy images were not all forced to download in that matrix.
- Desktop and narrow-screen Motion screenshots captured for review; mobile index visually inspected.
- Motion project CTA carries `service=motion&project=drag-to-cart`; form displays the recognised project.
- Empty motion submission produces errors and focuses the error summary without sending data.
- Returning to the ordinary studio form restores its original questions.
- Heading focus verified after lazy detail load and form navigation.
- Mobile menu Tab wrap, Escape close, and focus restoration checked.
- Live-experience anchor clicked; its destination is the supplied standalone application. The live app was separately opened and its Add to bag interaction changed the count from 0 to 1.
- Browser title/canonical verified on project detail. Unknown project slug renders not-found with `noindex, follow` and no canonical.
- Generated sitemap contains all four previous routes plus `/motion` and `/motion/drag-to-cart`.

## Limits and review items

- No Formspree test message sent. Actual delivery, reply behaviour, and provider success/error responses remain untested end to end. Payload logic is covered by unit tests.
- Reduced-motion paths were reviewed in source; OS preference emulation and screen-reader testing were not performed. Motion pages use still previews and introduce no autoplay animation.
- This is an in-app-browser check, not a Safari/Firefox or real-device compatibility certification.
- Existing client-side metadata updates remain; non-JavaScript social crawlers may receive the generic studio preview. No prerendering migration was introduced.
- The standalone experiment is external and has its own accessibility and availability limitations.
- No additional assets are required for this external-demo release. A video fallback, tutorial, and direct `.riv` embedding are future enhancements, not publication requirements.
- Review the copy, genuine screenshot, and layouts before authorising deployment. After deployment, check direct-route refreshes and actual Formspree delivery on the production origin.
