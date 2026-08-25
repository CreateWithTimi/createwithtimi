# CWT Visual System

Milestone 01 establishes the base visual language for CreateWithTimi Studio. This document complements `CWT_STUDIO_BRIEF.md`; it does not replace the brief.

## 1. Visual North Star

CWT is the frame around the worlds.

The studio system should feel precise, editorial, restrained, and culturally aware. It should create a gallery-like frame where individual Story Worlds can become more expressive without turning CWT itself into a generic agency template or decorative visual playground.

## 2. CWT and Story Worlds

CWT sections use the neutral system: warm paper, near-black ink, muted metadata, thin rules, strong whitespace, and structured grids.

Story Worlds may locally introduce their own accent and denser visual energy while still sitting inside the CWT frame. The featured project can take over a viewport with its own accent, then the page can return to neutral CWT.

## 3. Reference Image Role

The files in `docs/visual-reference/` are canonical for visual direction, hierarchy, composition language, spacing character, and responsive intent.

They are not canonical for copy, claims, project assets, historical details, logos, crests, merchandise, or generated imagery. `CWT_STUDIO_BRIEF.md` remains canonical for factual content and business language.

## 4. Color Tokens

Defined in `src/styles/global.css`:

- `--color-paper`: warm primary canvas.
- `--color-ink`: near-black primary foreground.
- `--color-muted`: secondary/system information.
- `--color-border`: thin editorial dividers.
- `--color-inverse`: dark-section foundation.
- `--color-inverse-text`: text on dark sections.
- `--project-accent`: locally controlled Story World accent, falling back to neutral CWT ink.

Rangers red is not a permanent CWT brand accent and is not encoded as the generic Story World default. It should appear only when the Rangers Legends case study explicitly supplies it.

## 5. Project Accent Architecture

Story Worlds can override `--project-accent` locally without changing global CWT tokens. Without a supplied project accent, the system falls back safely to neutral CWT ink.

Pattern:

```css
.story-world {
  --project-accent: var(--story-world-accent, var(--color-ink));
}
```

Future project sections can set `--story-world-accent` at the section/component level. For example, the Rangers Legends case study may supply its own accent when that project world explicitly enters the page.

## 6. Typography Roles

Selected V1 typography:

- Display: Archivo Narrow.
- Body/System: Archivo.

Archivo Narrow gives CWT a condensed editorial display voice without becoming sports-specific, futuristic, luxury-coded, playful, or SaaS-like. Archivo gives body copy, navigation, labels, metadata, buttons, and captions a contemporary neutral foundation.

Both families are loaded from Google Fonts in `index.html` and are open-source Omnibus-Type families under the SIL Open Font License 1.1. No font files are copied into the repository, and no typography package has been added.

Fallback stacks:

```css
--font-display:
  "Archivo Narrow", "Arial Narrow", "Roboto Condensed", "Helvetica Neue Condensed",
  ui-sans-serif, system-ui, sans-serif;

--font-body:
  "Archivo", Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,
  "Segoe UI", sans-serif;

--font-system: var(--font-body);
```

- Display: large, compressed editorial statements that can become composition.
- Body: readable narrative copy.
- System: metadata, labels, categories, dates, numbering, and structural information.

Scale tokens:

- `--type-display-xl`
- `--type-display-lg`
- `--type-display-md`
- `--type-heading`
- `--type-body-lg`
- `--type-body`
- `--type-small`
- `--type-label`

Display type may become very large. System type stays substantially smaller. Not all text should be uppercase. System tone comes from scale, weight, and case rather than a separate monospace family.

## 6.1 Wordmark and Full-Name Treatment

V1 uses a typographic identity only.

Compact mark:

```text
CWT
```

Treatment: Archivo, uppercase, weight 800, neutral ink, no project accent.

Full-name treatment:

```text
CREATEWITHTIMI
```

Treatment: Archivo, uppercase, label scale, neutral ink. Use it as a formal studio name treatment, not as a decorative logo symbol.

Do not add abstract symbols, world/globe icons, spark icons, AI icons, trademark marks, or project-accent wordmark variants without explicit approval.

Internal specimen: `docs/TYPE_SPECIMEN.md`.

## 7. Spacing and Rhythm

Spacing uses a small fluid scale:

- `--space-2xs`
- `--space-xs`
- `--space-sm`
- `--space-md`
- `--space-lg`
- `--space-xl`
- `--space-2xl`
- `--space-3xl`

The system supports quiet spacious sections, denser project moments, and a return to quiet CWT rhythm.

## 8. Containers

Base primitives:

- `.container`: standard readable container.
- `.container-wide`: wider editorial field.
- `.full-bleed`: full-width sections or media moments.

Responsive gutters are controlled by `--gutter`.

## 9. Editorial Grid

`.editorial-grid` establishes a 12-column desktop grid:

```css
grid-template-columns: repeat(12, minmax(0, 1fr));
```

The grid exists for structured asymmetry, not equal-column sameness. Future compositions can place headlines, metadata, media, and captions in different grid territories.

At narrower widths, the grid recomposes to a single-column structure.

## 10. Responsive and Mobile Philosophy

Mobile is recomposition, not compressed desktop.

The foundation uses a small number of responsive transitions. At narrow widths, multi-column structures become vertical sequences, gutters tighten, and content remains readable and contained.

Review targets remain 1440, 1024, 768, 430, and 390.

## 11. Media Principles

Base media defaults are intentionally safe:

```css
img,
video {
  height: auto;
}
```

Media can fill available width without forced global cropping, fixed aspect ratios, or universal `object-fit: cover`.

Images are objects, not cards. Cropping, layering, and framing should be decided by future story-specific components.

## 12. Shape and Surface Language

The foundation favors sharp editorial edges, thin rules, flat surfaces, and strong framing.

Only one minimal radius token exists: `--radius-minimal`. It should be used sparingly. Avoid pill-heavy interfaces, floating SaaS cards, glass panels, and shadow-heavy surfaces.

## 13. Accessibility Foundation

Established globally:

- visible `:focus-visible`
- skip-link support
- accessible contrast between paper/ink/muted
- semantic element defaults
- keyboard-safe base behavior
- reduced-motion handling

No outline is removed without replacement. No critical communication should depend on hover alone.

## 14. Motion Vocabulary

Milestone 01 establishes motion tokens only:

- `--duration-fast`
- `--duration-standard`
- `--duration-slow`
- `--ease-standard`
- `--ease-transform`

Approved motion language remains Reveal, Transform, Connect.

No scroll reveal system, page transitions, parallax, custom cursor, GSAP, Framer Motion, Rive, WebGL, or animation library has been introduced.

## 15. Intentionally Unresolved

Deferred decisions:

- long-term custom or paid brand typography beyond the V1 lock
- final custom wordmark/logo/final identity asset
- favicon
- homepage composition
- exact Rangers case-study compositions
- final Rangers media
- animation choreography
- custom cursor
- inquiry form design
- social preview artwork
- final deployment metadata
