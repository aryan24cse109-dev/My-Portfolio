# Asset map

All raster images remain PNG; no assets are renamed, moved, converted, or regenerated.

## Brand and icons

- `frontend/public/brand/aryan-monogram.png` — 1254×1254 square mark for compact header/footer identity.
- `frontend/public/brand/aryan-monogram.svg` — horizontal name wordmark despite the filename (viewBox 1800×440); use in horizontal identity contexts.
- `frontend/public/brand/aryan-wordmark.png` — horizontal wordmark, 1800×440.
- `frontend/public/brand/aryan-wordmark.svg` — scalable horizontal name + Full-Stack Developer lockup, viewBox 1800×440.
- `frontend/public/brand/brand-preview.png` — 1672×941 brand reference; not rendered as a page image.
- `frontend/public/icons/favicon.svg`, `favicon.ico` (48×48), `icon-16.png` (16×16), `icon-32.png` (32×32), `apple-touch-icon.png` (180×180), `pwa-192.png` (192×192), `pwa-512.png` (512×512), and `pwa-maskable-512.png` (512×512) — browser/Apple/PWA icon candidates. PWA installability is not enabled without an actual requirement.

## Open Graph

- `frontend/public/images/og/default-og.png` — 1734×907; default/home, skills, contact.
- `frontend/public/images/og/projects-og.png` — 1734×907; project listing and detail routes.
- `frontend/public/images/og/github-og.png` — 1733×907; open-source page.

## Profile

- `frontend/public/images/profile/aryan-hero.png` — 1122×1402; portrait with dark backdrop, used in hero and prioritized.
- `frontend/public/images/profile/aryan-cutout.png` — 1672×941; wide right-aligned portrait with negative space; retained for future suitable section.
- `frontend/public/images/profile/aryan-secondary.png` — 1122×1402; alternate studio portrait, not currently repeated.
- `frontend/public/images/profile/aryan-workspace.png` — 1122×1402; workspace portrait used in About.

## Project screenshot mapping

All screenshots are PNG, have descriptive `alt`, and are rendered with Next Image. Project galleries use natural image aspect ratios.

- DealLens: `cover.png` (1900×907) card/lead; `comparison - analysis.png` (1392×902) comparison gallery; `communication.png` (1895×895) draft gallery.
- Wealthra: `dashboard.png` (1902×858) card/lead; `invoice.png` (1912×911), `payment.png` (1911×912), `client-message.png` (1906×837), `analytics.png` (1913×912), and `ai-assistant.png` (1912×845) gallery. `client-page.png` (1911×801) and `sign-in.png` (1037×672) remain available but are not currently used.
- IntelliLandAI: `Dashboard.png` (1917×920) card/lead; `Document-Processing.png` (1910×847), `Validation.png` (1917×927), `GIS.png` (1907×921), `audit-history.png` (1908×923) gallery. `Sign-in.png` (1015×837) remains available but is not currently used.
- Open source: `code-contributions.png` (1913×907) homepage contribution overview; `pr-details.png` (1915×787) and `merged-pr.png` (1908×911) GitHub page illustrations. They are not used to support an unverified aggregate count.
- Return-Rate-Reducer: `dashboard.png` (1887×888), `risk-analysis.png` (1900×905), and `session.png` (1885×912) are all excluded because they contain boAt branding; no screenshot is used. A neutral CSS matrix visualization illustrates the user-provided deterministic weights.

## Rendering guidance

Project screenshots are never stretched or cropped; use `object-fit: contain` for lead/detail images and natural width in galleries. The hero portrait uses a controlled `cover` crop with the face kept high in frame. Below-the-fold images are lazy by default; the hero is prioritized.
