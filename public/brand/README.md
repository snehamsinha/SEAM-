# Brand assets

## SEAM

Place the approved full logo at `public/brand/seam-logo.png`. The shared `BrandLogo` component renders `/brand/seam-logo.png` directly, preserving colors and aspect ratio with `object-fit: contain`. The navbar, mobile header and footer use this component. The visible logo frame is 150px wide on desktop and 120px on mobile.

The text/CSS wordmark has been removed completely. The PNG must exist at the exact path above; there is no fabricated fallback. The approved artwork is served as a 724 × 543 optimized PNG; its original proportions and colors are preserved. A shared overflow frame compensates for its empty source padding while preserving all emblem and wordmark pixels. The logo shown in chat has generous surrounding navy margins; a tightly cropped approved export will be more legible in the header. No artwork is recreated or recolored.

## UTS Startups

Place the official logo at `public/brand/partners/uts-startups.png` (also supports `.svg` / `.webp`). `BackingLogo` automatically uses it; the older `public/brand/uts-startups.*` path remains supported. Until the asset is supplied, a centered text lockup appears. Use a version suitable for the cream background.

## Favicon

An approved icon-only asset can be placed at `public/brand/favicon.svg` or `.png`, then referenced with a matching `<link rel="icon">` in `index.html`. No new logo or favicon has been invented.

`favicon.png` is a 128px export of the emblem from the approved source. No logo redesign or recoloring is applied.
