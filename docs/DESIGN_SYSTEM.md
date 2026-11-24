# Design system

## Visual language

Dark editorial surfaces, generous negative space, low-opacity dividers, restrained blue accents, and project screenshots displayed as real application evidence. Sections flow through background shifts, spacing, and typography rather than identical cards.

## Tokens

| Token | Value |
|---|---|
| Background | `#10131B` |
| Background secondary | `#151A25` |
| Surface | `#1A2030` |
| Elevated/border surface | `#20283A` |
| Foreground | `#F5F7FA` |
| Secondary text | `#A6AFBF` |
| Muted text | `#737F93` |
| Primary blue | `#3B82F6` |
| Violet accent | `#8B5CF6` |
| Border | `rgba(255,255,255,.10)` |

## Type

Space Grotesk is the display face; Inter is the body/interface face, loaded through `next/font/google` with `display: swap`. Heading scale uses responsive `clamp()` values. Body text is 14–16px with generous line height; metadata is 9–11px and uppercase only for compact labels.

## Layout and spacing

Main container max width is 1240px. Spacing follows a 4px base rhythm, with section padding around 112px desktop and 78px mobile. Breakpoints are content-driven around 390px, 760px, and 950px; layouts are checked at the prompt's target widths.

## Components

- Primary action: blue rectangular button with a moving arrow and restrained elevation.
- Secondary action: transparent bordered action with subtle fill on hover.
- Text links: understated, high-contrast hover response.
- Cards: screenshot-forward and mostly unboxed; images retain intrinsic ratio and have visible index/context labels.
- Tags: compact outlined labels, no skill ratings.

## Motion

Motion for React handles small reveal and route-entry effects. CSS handles routine hover/focus changes. Reveals favor opacity and short transform movement; reduced-motion users receive no travel. No scroll hijacking, continuous decorative animation, or large parallax is used.

## Accessibility

Visible focus rings, skip link, semantic landmarks, descriptive alt text, responsive touch-sized controls, Escape-to-close mobile navigation, reduced-motion CSS, and no hover-only content.
