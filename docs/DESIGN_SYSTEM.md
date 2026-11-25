# Design system — Swiss Editorial + Engineering Case-Study Archive

Single source of truth for the Aryan Agarwal portfolio. This is a visual redesign of an existing, functional Next.js 15 / React 19 app — not a rebuild. Every route, API integration, and meaningful animation is preserved. When implementing, treat this document as the specification and apply it consistently; do not invent per-page visual systems.

## 1. Design philosophy

A carefully designed independent software engineer's portfolio. Swiss/editorial graphic design (strict grid, strong typographic hierarchy, generous but purposeful whitespace, hairline rules, index numbering) combined with product-engineering case studies. The engineering work is the main attraction; chrome is quiet and confident. Personal, technical, expressive, professionally engineered.

Avoid: generic AI portfolio, neon/gaming, SaaS dashboard, terminal emulator, agency template, empty minimalism with huge whitespace. Every element earns its place.

## 2. Color palette

| Role | Token | Value |
|---|---|---|
| Main background | `--bg` | `#F6F4EE` |
| Secondary background | `--bg-alt` | `#EFEEE7` |
| Card background | `--surface` | `#FFFFFF` |
| Alternate section | (use `--bg-alt`) | `#ECEAE2` |
| Inset / metric cell | `--surface-2` | `#E7E4DA` |
| Primary ink | `--ink` | `#1A1A17` |
| Secondary text | `--text-2` | `#4A4A44` |
| Muted text | `--muted` | `#6E6E66` |
| Meta / eyebrow | `--meta` | `#8A8A80` |
| Accent (burnt orange) | `--blue` (legacy name) / `--accent` | `#C4471F` |
| Accent hover | `--accent-hover` | `#9E3714` |
| Accent tint | `--accent-tint` | `#F3E3DA` |
| Border | `--line` | `#DCD8CC` |
| Border strong | `--line-strong` | `#C4BFB1` |
| Success / warning / error | — | `#2F7D52` / `#9A6A16` / `#B23A2E` |

`color-scheme: light`. Selection: `rgba(196,71,31,.16)`. Accent is burnt orange and is the only saturated brand color; category colors on skill/technology logos are the logos' own brand colors, used small.

## 3. Typography

- Display: **Space Grotesk** (`--font-display` → `--font-space`). Headings, hero, page titles, card titles, numerals.
- Body/UI: **Inter** (`--font-body` → `--font-inter`).
- Mono: system monospace, reserved for compact technical metadata only (eyebrow labels, project meta, image index, PR numbers, footer fine print, timeline dates).

Scale (desktop → mobile):
| Element | Desktop | Mobile |
|---|---|---|
| Hero display | clamp(52px, 7vw, 92px) | clamp(44px, 13vw, 72px) |
| Page title | clamp(44px, 6.5vw, 78px) | clamp(38px, 11vw, 60px) |
| Section heading | clamp(32px, 4vw, 50px) | clamp(30px, 9vw, 44px) |
| Card title | clamp(22px, 2.6vw, 30px) | 22px |
| Body | 17px | 16px |
| Secondary | 15–16px | 15px |
| Nav | 15px | mobile menu 28–42px |
| Form label | 13–14px | 14px |
| Input text | 15px | 16px |
| Meta/eyebrow | 11–12px uppercase, letter-spacing .16em | 11px |

Weights: display 500–600; body 400; emphasis 500–600. Headings use tight tracking (`-.04em` to `-.06em`), line-height ~1.0–1.1.

## 4. Spacing, container, grid

- Base rhythm 4px. Section padding 112px desktop / 76px mobile. Container max `--container: 1240px`, width `min(1240px, 100% - 64px)` (40px gutters ≤760, 32px ≤390).
- 12-column editorial grid conceptually; implemented as CSS grid per section. Hairline rules (`--line`) separate rows/cells; index numbers (`01 / 05`) label items.
- Asymmetry is intentional: hero is a 2-column split (~58/42); project index alternates a wide lead card with a 2-up grid; case study uses content + sticky sidebar (~1fr / 300px).

## 5. Hero composition (home)

Asymmetric two-column. Left column (wider): eyebrow (mono), large display headline, short deck, primary + secondary actions, and a compact meta row (location / focus / availability). Right column (narrower): a bordered portrait/monogram plate with an offset accent frame and a caption, plus a small vertical index label. A thin baseline rule and section index anchor the composition to the grid. Mobile stacks to a single column (copy first, plate below).

## 6. Project card (index)

Screenshot-forward. Image plate with hairline border and `01 / 05` index chip; hover reveals an "open" affordance and a subtle image scale. Below: mono meta row (category · index), display title with arrow affordance, 1–2 line summary, and a compact stack tag row (first 5). Featured/lead card spans full width with a larger plate. Cards are unboxed (no heavy shadow) — separation via rules and whitespace.

## 7. Case-study layout (`/projects/[slug]`)

Editorial article. Top: back link, eyebrow (category), large title, overview deck, action links (source / live / walkthrough / API). Full-bleed cover plate. Body grid: main column of ruled sections (Problem / Approach + workflow + factor table / Included / Notes / Limits / Screens / Related) + sticky sidebar (Role, Technologies, Links). Ruled `section` blocks with mono eyebrows. Note callouts use accent left-border + tint. Pager (prev/next) at end.

## 8. Skills grouping

Structured technology groups (Languages, Frontend, Backend, Data, Integrations, Tools) as the primary presentation: a bordered grid of group cards, each with a display group title, a count, and a wrapped list of technologies with their logo marks. The existing floating technology **orbit animation is preserved** as a secondary interactive showcase below the groups (click-to-inspect), honoring reduced-motion.

## 9. Timeline / experience

Ruled list of experience cards on a 2-column grid: left rail = large index numeral + category/date (mono); right = title, project, role, description, result callout (accent), and an inline link. Hairline dividers, no heavy cards.

## 10. Navigation, buttons, forms

- Header: sticky, hairline bottom border, brand (monogram + name), horizontal nav with animated underline, resume action, motion toggle; mobile = full-screen menu with staggered display links, Escape to close, scroll lock.
- Buttons: primary = solid accent, white label, hover darken + slight lift; secondary = white surface, hairline border, tint hover; text = underlined-on-hover accent. Min height 48–52px desktop, ≥44px touch.
- Forms: white fields, hairline border, 15px text, 13–14px labels, visible accent focus ring; status line with success/error color.

## 11. Image treatment

Screenshots keep intrinsic aspect ratio (`object-fit: contain` for covers, `cover` for plates), hairline border, white/near-white matte. Duotone/overlay only for gradient fades at plate bottoms. No heavy filters. Index chips are white with ink text.

## 12. Borders & shadows

Hairline rules are the primary separator. Shadows are rare and soft (only on hover elevation of primary actions and the hero plate). No glassmorphism, no neon glow.

## 13. Responsive behavior

Breakpoints 950 / 760 / 390. Verified at 360, 390, 768, 1024, 1440, 1920. No horizontal overflow at any width. Grids collapse predictably (2-up → 1-up; sidebar drops below content ≤950). Body ≥16px and labels ≥14px on mobile.

## 14. Animation principles

Motion for React (route transitions, reveals) + CSS (hover/focus). Reveals use opacity + short (≤22px) travel with `[0.22,1,0.36,1]` easing. The skills orbit and about-portrait state transitions are preserved. Reduced motion (OS preference via `prefers-reduced-motion` and the in-app toggle → `data-motion="reduced"`) disables travel, scale, and continuous animation while keeping opacity/color changes. No scroll hijacking or parallax.

## 15. Accessibility & contrast

Semantic landmarks, skip link, visible focus rings (accent), descriptive alt text, ≥44px touch targets, Escape-to-close mobile nav, aria on interactive orbs/filters, and no hover-only content. Body/secondary text meets WCAG AA on the light surfaces; accent is used for large/bold text and fills (white on accent passes AA for large/bold), never for small body text on white.