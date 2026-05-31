# ItsAydrian.com Astro Refactor — Review & Recommendations

**Reviewer:** Janine  
**Date:** 2026-05-30  
**Branch:** `refactor-astro`  
**Preview URL:** https://refactor-astro-itsaydrian.aydrian.workers.dev  
**PR:** #23 — feat: Astro refactor with Cloudflare deployment

---

## Executive Summary

The Astro refactor is a **strong foundation**. The design system is cohesive, the build pipeline is solid, and the content strategy is clear. However, the site currently undersells the business — it functions as a digital business card rather than a growth engine for ItsAydrian LLC's three revenue streams.

**The biggest gap:** The site treats Travel and Pet Care as footnotes that link elsewhere, while App Studio is slightly better represented but still missing a key product (Waymark). For a business where the goal is to hit $40k–$80k in commissionable travel bookings and grow app revenue, the site needs owned landing pages that convert, not just outbound links.

---

## What Exists (Current State)

### Pages
| Route | Purpose | Status |
|---|---|---|
| `/` | Home — hero, intro, services, apps, contact | ✅ Polished |
| `/apps/tiny-maintenance/` | App landing — screenshots, features, FAQ, privacy, terms | ✅ Complete |
| `/atticus-list/` | Amazon affiliate product grid | ✅ Charming, functional |
| `/404` | Custom error page | ✅ Clean |

### Technical Stack
- **Astro 6.3.7** + `@astrojs/cloudflare` — solid, modern choice
- **One layout** (`Layout.astro`) — consistent header/footer/nav/theme
- **Zero components** — everything is inline in page files
- **One global CSS file** (~3,600 lines) — well-structured but monolithic
- **Theme system** — light/dark/system with localStorage persistence, no flash
- **CI/CD** — GitHub Actions for PR previews + production deploy to Cloudflare

### Design System Strengths
- Strong typographic hierarchy (Instrument Serif + Inter + Noto Sans JP)
- Excellent color token system with light/dark modes
- Good accessibility (skip links, aria labels, reduced-motion support)
- Consistent card/button/pill language across pages
- Japanese text integration feels intentional, not gimmicky

---

## Critical Gaps & Missing Content

### 1. Waymark is Completely Absent
**Severity: High**

Waymark (https://waymark.itsaydrian.com) is a live, deployed product. It doesn't appear on the homepage, in the apps section, or anywhere on the site. The homepage says "1 app live" — it's actually 2. Waymark should:
- Appear in the homepage Apps section
- Have its own `/apps/waymark/` landing page (or at least a redirect/card)
- Be listed in the footer

### 2. No Owned Travel Landing Page
**Severity: High**

The Travel section on the homepage links directly to `foratravel.com`. This is fine for booking, but it means:
- **Zero SEO value** for Aydrian's Japan expertise
- **No lead capture** — visitors bounce to Fora without leaving contact info
- **No portfolio** — can't show itineraries, testimonials, or trip photos
- **No content marketing** — no blog posts, guides, or Japan tips to drive organic traffic

A `/travel/` page (and ideally `/travel/japan/`) would create an owned funnel for the $40k/$80k commission goal.

### 3. No Owned Pet Care Landing Page
**Severity: Medium**

Similar to travel, pet care links directly to Rover. A `/pet-care/` page could:
- Show service area (Lincoln Square / Manhattan)
- Display photos of Atticus + client dogs
- Explain the booking process
- Capture inquiries from people who aren't ready to book on Rover yet
- Build local SEO for "dog sitter NYC" / "corgi boarding Manhattan"

### 4. No `/apps/` Index Page
**Severity: Low (temporary)**

The nav links directly to `/apps/tiny-maintenance/`. There should be a `/apps/` index that:
- Lists all apps (Tiny Maintenance, future projects)
- Provides a clear "app studio" positioning for ItsAydrian Designs

However, this is a lower priority because **Tiny Maintenance will eventually move to `tiny-maintenance.itsaydrian.com`** and be managed from the Tiny Maintenance repo. The current `/apps/tiny-maintenance/` pages on itsaydrian.com are a temporary placeholder. A simple `/apps/` index that points to Tiny Maintenance (and future apps) is sufficient for now.

### 5. Stale Content on Homepage
**Severity: Medium**

The "Right now" box and hero meta are static copy that will age quickly:
- "Shipping Tiny Maintenance v1.1" — v1.2 is live, v1.3/v1.4 in progress
- "1 app live" — this is correct (only Tiny Maintenance is publicly marketed; Waymark is internal to travel advising)
- "Planning a 12-day Kansai itinerary" — will be stale in weeks

Consider either:
- Updating to evergreen copy (e.g., "Building iOS apps for everyday life")
- Or adding a lightweight CMS/date-based content system

### 6. No Lead Capture / Newsletter
**Severity: Medium**

For a business trying to grow travel bookings and app sales, there's no way to:
- Collect emails from interested travelers
- Notify people when new apps ship
- Build an audience for Japan content

A simple email capture (e.g., Buttondown, ConvertKit, or even a Mailchimp form) would help.

### 7. No Structured Data / SEO Enhancements
**Severity: Low-Medium**

Missing:
- JSON-LD structured data (LocalBusiness, Person, Product, SoftwareApplication)
- `robots.txt`
- `sitemap.xml`
- Canonical URL handling

### 8. No Content Collections / CMS Architecture
**Severity: Low (for now)**

All content is hardcoded in `.astro` files. For a growing site with blog posts, travel itineraries, or app changelogs, Astro Content Collections would make this much more maintainable.

---

## Visual Observations from Preview

### Homepage
- **Hero:** The Tokyo night shot is striking. The dark gradient overlay successfully keeps text readable, though it's a high-risk design that depends on the image's left side being naturally dark.
- **Services cards:** Well-balanced, consistent padding, good hover effects.
- **Contact band:** The dark/inverted section provides a strong visual close to the page.
- **Footer:** Clean, personal. The Japanese sign-off is a nice touch.

### Tiny Maintenance Page
- **Hero background:** The faint background image is so subtle it almost looks like a rendering artifact. Consider either removing it or making it slightly more visible.
- **Screenshots:** Four iPhone mockups are consistent and well-framed. The labels are clear.
- **FAQ:** Accordion works well. Good categorization.
- **Missing:** No secondary CTA at the bottom of the page. For a long page, a repeat "Download" button after the FAQ would help.

### Atticus's List Page
- **Hero banner:** The "Chief Corgi Officer" tag is charming but slightly hard to read against the photo.
- **Category nav:** Simple and effective. Could be sticky on scroll.
- **Product cards:** The first-person Atticus voice is excellent brand differentiation.
- **Image loading:** Most product images below the fold are lazy-loaded and don't appear in quick screenshots — this is expected behavior, not a bug. The images are present on the server.

---

## Recommended Architecture for Expansion

```
src/
├── components/
│   ├── SectionHead.astro
│   ├── Card.astro
│   ├── AppCard.astro
│   ├── ProductCard.astro
│   ├── Button.astro
│   ├── Pill.astro
│   └── EmailCapture.astro
├── content/
│   ├── blog/              # Japan guides, travel tips, app updates
│   ├── itineraries/       # Sample trip plans (for SEO + social proof)
│   └── apps/              # App metadata (for /apps/ index)
├── layouts/
│   ├── Layout.astro         # Current (keep)
│   └── PageLayout.astro     # Optional: variant without hero overlay
├── pages/
│   ├── index.astro
│   ├── travel/
│   │   ├── index.astro      # Travel advising landing page
│   │   └── japan.astro      # Japan expertise page (SEO goldmine)
│   ├── pet-care/
│   │   └── index.astro      # Rover landing page
│   ├── apps/
│   │   ├── index.astro      # App studio index (temporary, until Tiny Maintenance gets its own subdomain)
│   │   └── tiny-maintenance/
│   │       ├── index.astro    # Temporary placeholder; will move to tiny-maintenance.itsaydrian.com
│   │       ├── privacy.astro
│   │       └── terms.astro
│   ├── atticus-list/
│   │   └── index.astro
│   └── 404.astro
```

### Content Collections Setup
For blog posts, itineraries, or app changelogs, add:
```js
// astro.config.mjs
export default defineConfig({
  adapter: cloudflare(),
  integrations: [],
  // Content collections are native in Astro, just need the src/content/ dir
});
```

---

## Immediate Action Items (Priority Order)

1. **Update homepage "Right now" copy** — Fix Tiny Maintenance version reference to v1.2 or make it evergreen
2. **Create `/travel/` landing page** — Start with a simple page: hero, Japan focus, Fora CTA, email capture
3. **Create `/apps/` index page** — Simple listing of Tiny Maintenance (temporary, points to App Store and the existing `/apps/tiny-maintenance/` placeholder)
4. **Add JSON-LD structured data** — At minimum, LocalBusiness schema on homepage
5. **Split global CSS** — Move page-specific styles into `<style>` blocks or scoped component files
6. **Add `robots.txt` and `sitemap.xml`** — Astro can generate these at build time

---

## Discussion Points for Aydrian

### Travel Page Strategy
- Do you want `/travel/` to be a simple landing page, or do you want to publish content (blog posts, itineraries) there?
- Should the travel page capture leads (email) or just route to Fora?
- Do you have client testimonials or trip photos you can use for social proof?

### Pet Care Page Strategy
- Is the goal local SEO ("dog sitter upper west side") or just a prettier landing page than Rover's profile?
- Do you have photos of client dogs (with permission) that could build trust?

### App Studio Strategy
- Should `/apps/` position ItsAydrian as a micro-studio, or just list products?
- Do you want to tease upcoming apps, or keep them hidden until launch?
- Each app has its own privacy policy (Tiny Maintenance does). Is the plan to keep those on the app-specific subdomain (e.g., `tiny-maintenance.itsaydrian.com/privacy`) or keep them on the main site?
- When Tiny Maintenance moves to its own subdomain, will the app page redirect, or will the main site just link out?

### Content Marketing
- Would you publish Japan travel guides? (Huge SEO opportunity)
- Would you write about app development / indie app journey?
- How do you feel about adding an email newsletter?

---

## Conclusion

The refactor is a **success from a technical and design perspective**. The site is fast, accessible, and visually distinctive. The remaining work is **content strategy and business funnel optimization** — making sure every revenue stream has a proper home on the site that converts visitors into leads, bookings, and downloads.

The most impactful next step is **creating an owned landing page for Travel** so the site works as hard as the businesses it represents.

---

## Additional Feedback (Friend's Review)

**Date:** 2026-05-30

### Hero Section
- **Remove the pill badges** (📍 New York, 🇯🇵 Tokyo, 🐾 5★, 📱 1 app) — let the headline and dek carry the weight
- **Add a clear CTA** just under the dek with whatever action you want visitors to take. If there are two, do primary + secondary (outline/ghost)
- **Remove the eyebrow** "ItsAydrian LLC · est. 2024" — it reads corporate and undermines the personal voice

### Japanese Language
- **The Japanese text is a trust signal.** It's not for Japanese speakers — it's for people who are wowed by a bilingual person who knows Japanese. This is social proof of your Japan expertise
- **Consider adding more Japanese** throughout the site, or even a full Japanese version of key pages (homepage, /travel/japan) to demonstrate fluency

### SEO & Technical
- **Run an SEO audit** when nearly ready — Lighthouse tests for mobile, speed, accessibility, etc.
- **Use SEMrush free tier** for one domain (sufficient for your needs)
- **Set up Google Search Console (GSC)** properly
- **Submit sitemap** and have `robots.txt` and `llms.txt` on root
- **Add schema/structured data** — Organization at minimum, but also consider LocalBusiness, Person, and Service schemas for the travel advising work

---

## Synthesized Action Plan

### Phase 1: Homepage Polish (Immediate)
1. **Redesign hero** — remove pills, remove eyebrow, add primary + secondary CTA
2. **Update "Right now" copy** — make evergreen or update to v1.2
3. **Add Japanese** — consider more integration as a trust signal

### Phase 2: SEO Foundation (Before launch)
4. **Add `robots.txt`** — allow all, point to sitemap
5. **Add `sitemap.xml`** — Astro can generate at build time
6. **Add `llms.txt`** — describe site for AI crawlers
7. **Add JSON-LD schema** — Organization, LocalBusiness, Person
8. **Run Lighthouse audit** — mobile, performance, accessibility, best practices
9. **Set up GSC** — submit sitemap, verify domain

### Phase 3: Business Funnels (Post-launch)
10. **Create `/travel/` landing page** — hero, Japan focus, Fora CTA, email capture
11. **Create `/pet-care/` landing page** — local SEO play
12. **Consider `/travel/japan/` content hub** — SEO goldmine for "Japan itinerary", "Japan travel planner", etc.

### Phase 4: Content & Growth
13. **Email capture** — Buttondown or similar for travel leads and app announcements
14. **Content marketing** — Japan travel guides, app development posts
15. **SEMrush audit** — keyword research, competitor analysis, backlink tracking

---

## Hero Redesign Spec

### Current
```
[ItsAydrian LLC · est. 2024]
A small studio for things worth doing well.
いつもの場所、いつも丁寧に
Travel advising with a Japan habit. Trusted pet care in New York. iOS apps I wanted to exist.
One person, three crafts, one address — howdy@itsaydrian.com.
[📍 New York, NY] [🇯🇵 Tokyo, Kyoto, beyond] [🐾 5★ on Rover] [📱 1 app live]
```

### Proposed
```
A small studio for things worth doing well.
いつもの場所、いつも丁寧に
Travel advising with a Japan habit. Trusted pet care in New York. iOS apps I wanted to exist.

[Primary CTA: Plan a trip →]  [Secondary CTA: See my work →]
```

**Primary CTA options:**
- "Plan a trip →" (routes to Fora or /travel/)
- "Say howdy →" (mailto)
- "Download the app →" (App Store)

**Secondary CTA options:**
- "See my work →" (scroll to #what-i-do)
- "About me →" (scroll to #intro)
- "Japan travel →" (routes to /travel/)

The friend's recommendation is to pick the action you most want visitors to take. For your current business goals, that's likely **travel bookings** (primary) and **app downloads** or **general credibility** (secondary).

### Japanese Language Strategy
The existing Japanese text in the hero is a good start. Consider:
- Adding a Japanese subtitle to the /travel/ page when built
- Using Japanese in the footer (already present: いつもありがとうございます)
- For a /travel/japan/ page, a bilingual opening paragraph would be powerful social proof
- The goal is **not** to serve Japanese speakers — it's to signal expertise to English-speaking travelers considering Japan

---

## SEO & Technical Checklist

### Files to Add
- [ ] `/robots.txt` — `User-agent: *` `Allow: /` `Sitemap: https://itsaydrian.com/sitemap.xml`
- [ ] `/sitemap.xml` — Astro can generate this at build time
- [ ] `/llms.txt` — Brief description of the site for AI crawlers

### Schema to Add
- [ ] **Organization** — ItsAydrian LLC name, URL, logo, email
- [ ] **Person** — Aydrian Howard, job title, sameAs (social profiles)
- [ ] **LocalBusiness** — For travel advising / pet care, service area (NYC, Japan)
- [ ] **Service** — For travel advising (offers, provider, area served)
- [ ] **SoftwareApplication** — For Tiny Maintenance (on app page)

### Tools to Use
- [ ] **Google Search Console** — verify domain, submit sitemap, monitor performance
- [ ] **SEMrush** — free tier, one domain, keyword research + competitor tracking
- [ ] **Lighthouse** — run in Chrome DevTools for mobile/desktop scores
- [ ] **PageSpeed Insights** — confirm Core Web Vitals

### Performance Targets
- [ ] **LCP < 2.5s** — Largest Contentful Paint (hero image)
- [ ] **FID < 100ms** — First Input Delay (JS is minimal, should be fine)
- [ ] **CLS < 0.1** — Cumulative Layout Shift (image dimensions are set, good)
- [ ] **Mobile score > 90** — Lighthouse performance score

---

## Discussion Points

### Hero CTA
- What's the single action you want every visitor to take? Travel inquiry? App download? Email contact?
- Should the secondary CTA scroll to the services section, or route to a specific page?

### Japanese Language
- Are you comfortable adding more Japanese text? (e.g., a bilingual subtitle on /travel/)
- Is the current level (hero tagline + footer) enough, or do you want more integration?

### SEO Priority
- Do you want to tackle the technical SEO (robots, sitemap, schema) before the /travel/ page, or after?
- The /travel/ page is the biggest business impact, but the SEO foundation helps the whole site

### Content Marketing
- Would you publish sample Japan itineraries? (Even anonymized client trips would be powerful)
- Are you open to a simple email newsletter for travel leads?

---

**Final note:** The friend's feedback is spot-on. The hero is currently the weakest part of an otherwise strong page. The pills and eyebrow add clutter and corporate vibes. A clear CTA would immediately improve conversion. The Japanese text is already working as social proof — lean into it.
