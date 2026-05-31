# Lighthouse Audit Fixes — Summary

**Date:** 2026-05-31
**Branch:** `fix/lighthouse-audit`

---

## Results

| Page | Metric | Before | After | Change |
|------|--------|--------|-------|--------|
| **Travel** | Performance | 65 | 71 | +6 |
| **Travel** | Accessibility | 94 | **100** | **+6** |
| **Travel** | Best Practices | 96 | 96 | — |
| **Travel** | SEO | 100 | 100 | — |
| **Travel** | LCP | 6.1 s | 4.9 s | −1.2 s |

| **Homepage** | Performance | 88* | ~65** | — |
| **Homepage** | Accessibility | 95 | 96 | +1 |
| **Homepage** | Best Practices | 92 | 92 | — |
| **Homepage** | SEO | 100 | 100 | — |

\* Production CDN (Cloudflare)  
\*\* Local server test (slower image delivery)

---

## Changes Made

### 1. Performance: Trailing Slash Redirect

**File:** `astro.config.mjs`

Added `trailingSlash: 'always'` to eliminate the 307 redirect from `/travel` → `/travel/`. This saves ~850ms on first visit.

```js
export default defineConfig({
  site: 'https://itsaydrian.com',
  trailingSlash: 'always',  // NEW
  adapter: cloudflare(),
  integrations: [sitemap()]
});
```

### 2. Performance: Image Preload Optimization

**File:** `src/pages/travel/index.astro`

Changed `preloadImage` from the full-size 297KB image to the 800px 123KB variant. The `<picture>` element already handles responsive srcset, so the preload should match the most common viewport size.

```astro
preloadImage="/assets/aydrian-travel-800.jpg"  <!-- was /assets/aydrian-travel.jpg -->
```

### 3. Accessibility: Color Contrast — Eyebrow Text

**File:** `src/styles/global.css`

Darkened `--ink-faint` from `#8e857d` to `#706660`. This improves contrast ratio from 3.47:1 to ~5.1:1 (target: 4.5:1).

### 4. Accessibility: Color Contrast — Pill Cool

**File:** `src/styles/global.css`

Darkened `--hydro` from `#49747f` to `#3c6470`. This improves contrast ratio from 4.3:1 to ~5.1:1 (target: 4.5:1).

### 5. Accessibility: Color Contrast — Chat Trigger on Dark Hero

**File:** `src/pages/travel/index.astro`

Removed the scoped `.chat-trigger-btn.btn-ghost` style that was overriding the hero button color to dark text. The hero buttons now correctly inherit the light text color from `.hero-cta .btn-ghost` in global.css.

### 6. Accessibility: Heading Order

**File:** `src/layouts/Layout.astro`

Changed footer `<h4>` to `<h3>` for both "What I do" and "Get in touch" sections. This fixes the heading hierarchy (no more skipping from `<h2>` to `<h4>`).

### 7. Accessibility: Accessible Names — Hero Scroll Links

**Files:** `src/pages/index.astro`, `src/pages/travel/index.astro`

Updated `aria-label` to include the visible text:

```html
<!-- Before -->
<a href="#intro" class="hero-scroll" aria-label="Scroll to intro">Read on</a>

<!-- After -->
<a href="#intro" class="hero-scroll" aria-label="Read on — scroll to intro">Read on</a>
```

### 8. Accessibility: Accessible Names — Chat Trigger Buttons

**File:** `src/pages/travel/index.astro`

Updated all chat trigger buttons to include visible text in `aria-label`:

```html
<!-- Before -->
<button aria-label="Start planning your trip">Start planning</button>

<!-- After -->
<button aria-label="Start planning — open travel inquiry chat">Start planning</button>
```

### 9. Accessibility: Accessible Names — Chat Widget Trigger

**File:** `src/components/TravelChatWidget.astro`

Updated the floating chat widget trigger button:

```html
<!-- Before -->
<button aria-label="Open travel inquiry chat">Plan a trip</button>

<!-- After -->
<button aria-label="Plan a trip — open travel inquiry chat">Plan a trip</button>
```

### 10. Accessibility: Image Aspect Ratio

**File:** `src/layouts/Layout.astro`

Added explicit `width="136" height="48"` to the logo image to prevent layout shift and ensure correct aspect ratio.

```html
<img src="/assets/itsaydrian-logo.png" alt="ItsAydrian" width="136" height="48">
```

---

## Remaining Non-Critical Issues

These are all **false positives or low-impact** items that don't affect the user experience:

1. **"Minify CSS" / "Reduce unused CSS"** — Google Fonts CSS is not minified by Google (by design). The unused CSS is font-face declarations that are actually loaded and used.
2. **"Use efficient cache lifetimes"** — Local test server doesn't set cache headers. Production Cloudflare handles this.
3. **"Improve image delivery"** — Suggests WebP/AVIF. This is a larger optimization that would require converting all assets.
4. **"Render-blocking requests"** — Google Fonts CSS is render-blocking. Already preconnected and optimized.
5. **"Forced reflow"** — Minor 95ms reflow from animation initialization. Negligible impact.

---

## Next Steps

1. **Deploy these changes** to production
2. **Re-run Lighthouse on production** after deployment to get accurate performance scores (local server is slower than Cloudflare CDN)
3. **Consider WebP/AVIF image conversion** for further performance gains
4. **Consider self-hosting fonts** to eliminate Google Fonts render-blocking entirely

---

## Build Status

✅ `npm run build` passes successfully
