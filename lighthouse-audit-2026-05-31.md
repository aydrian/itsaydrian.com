# Lighthouse Audit — itsaydrian.com

**Date:** 2026-05-31
**Tool:** Lighthouse 13.3.0 (mobile emulation)
**URLs tested:** https://itsaydrian.com/ (homepage), https://itsaydrian.com/travel

---

## Scores Summary

| Page          | Performance | Accessibility | Best Practices | SEO |
|---------------|-------------|---------------|--------------|-----|
| Homepage      | 88          | 95            | 92           | 100 |
| Travel        | 65          | 94            | 96           | 100 |

---

## Core Web Vitals

| Metric   | Homepage | Travel | Target  |
|----------|----------|--------|---------|
| LCP      | 3.4 s    | 6.1 s  | < 2.5 s |
| TBT      | 0 ms     | 0 ms   | < 200 ms |
| CLS      | 0.001    | 0      | < 0.1   |
| Speed Index| 3.0 s  | 5.4 s  | < 3.4 s |

**Travel page is the problem.** LCP is 2.4× the target. CLS is perfect on both pages.

---

## Critical Issues (Travel Page)

### 1. LCP — 6.1 seconds

- **Suspected cause:** Two large images (297KB + 353KB = 650KB total)
  - `aydrian-travel.jpg` (297KB) — appears on both pages
  - `aydrian-tokyo-hero-1600.jpg` (353KB) — 1600px hero, likely overkill for mobile
- **Hero 800px variant exists** (`aydrian-tokyo-hero-800.jpg`, 123KB) but 1600px version is being loaded

### 2. Multiple Page Redirects — 850ms wasted

- `https://itsaydrian.com/travel` → `https://itsaydrian.com/travel/` (307 redirect)
- This is a Cloudflare Workers / Astro routing issue. The trailing slash redirect is adding latency.

### 3. CSS Not Minified

- Google Fonts CSS is 92KB (not minified by Google Fonts by default — this is a false positive)
- Astro CSS `Layout.NRWABs81.css` is 7.4KB — should be minified in production

---

## Accessibility Issues (Both Pages)

### 1. Color Contrast (13 on homepage, 7 on travel)

- `.eyebrow` text: `#8e857d` on `#fbfaf8` — contrast ratio 3.47:1 (needs 4.5:1)
- `.pill.pill-cool`: `#49747f` on `#e6eced` — contrast ratio 4.3:1 (needs 4.5:1)
- **Travel page only:** Chat trigger button on dark section — contrast ratio 1.04:1 (extremely low)

### 2. Heading Order

- Footer section uses `<h4>` after `<h2>` without `<h3>` — should be `<h3>` or restructure heading hierarchy

### 3. Accessible Names

- Hero scroll link (`aria-label="Scroll to intro"`) doesn't include visible text "READ ON"
- Chat trigger buttons (`aria-label="Open travel inquiry chat"`) don't include visible text "Plan a trip" / "Reach out"

### 4. Image Aspect Ratio

- `itsaydrian-logo.png` renders at 136×48 but the natural image dimensions may differ

---

## SEO Issues

- **None critical.** Both pages score 100 on SEO.
- Minor: image aspect ratio warning (same as accessibility)

---

## Quick Wins (Priority Order)

1. **Fix the /travel redirect** — Add trailing slash handling or canonical URL in Cloudflare Workers
2. **Optimize images** — Serve `aydrian-tokyo-hero-800.jpg` instead of 1600px on mobile, or use `srcset`
3. **Fix contrast on travel page chat trigger** — Light text on dark background is unreadable
4. **Fix heading hierarchy** — Change footer `<h4>` to `<h3>`
5. **Fix accessible names** — Include visible text in `aria-label` or use `aria-labelledby`
6. **Add `srcset`/`sizes` for responsive images** — `aydrian-travel.jpg` is 297KB on all viewports

---

## Estimated Impact

- Fixing the redirect + images on travel page: **Performance score likely 85–90**
- Fixing contrast + headings: **Accessibility score likely 98–100**

---

## Notes

- Google Fonts CSS flagged as "unused" is a Lighthouse false positive — font-face declarations are not counted as "used" but the fonts are actually loaded and used.
- The travel page is heavier because it loads the chat widget JS (~2KB, negligible) and the hero images.
- `loading="lazy"` is correctly used on below-the-fold images.
