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
