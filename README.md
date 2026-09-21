# RIG MASTER — Landing Page

StoryBrand landing page. Its only job is to turn visitors into LINE OA friends.
Next.js 16 (App Router, static export) · TypeScript · Tailwind CSS v4 · shadcn/ui (Radix) · GSAP + ScrollTrigger · Lenis.

## Run

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # static site → out/
npm run lint
```

## Deploy — GitHub Pages (automatic)

`.github/workflows/deploy.yml` lints, builds, and publishes on every push to `main`. You can also start it by hand from the Actions tab.

One-time setup: **Settings → Pages → Build and deployment → Source: GitHub Actions**.

basePath (`/<repo>`) and the canonical URL come from `actions/configure-pages`. The same workflow therefore works for a project site, a `<user>.github.io` repo, or a custom domain set in Settings → Pages, with nothing hard-coded.

Other static hosts: `npm run build` and upload `out/`. For a sub-path, set `NEXT_PUBLIC_BASE_PATH=/<path>` and `NEXT_PUBLIC_SITE_URL=<full url>` first.

## Before launch — fill these in

| What | Where |
|---|---|
| MyFxbook / live results link | `src/lib/site.ts` → `links.live` |
| Confirm LINE OA ID and link | `src/lib/site.ts` → `lineId`, `links.line` |
| Risk disclosure + privacy policy links | `src/lib/site.ts` → `links.riskDoc`, `links.privacy` |
| Real domain (OG tags, schema) | `NEXT_PUBLIC_SITE_URL` env or `src/lib/site.ts` → `url` |
| Real dashboard screenshot | `src/components/sections/proof.tsx` → `<DashboardFrame shot={import} />` |
| Founder photo | `src/components/sections/guide.tsx` (placeholder comment) |
| Founder story (true events only) | `src/components/sections/guide.tsx` → `<Placeholder>` |
| FAQ: minimum capital, "has it ever lost?" | `src/content/faq.tsx` |
| Hero image — replace with a licensed / real photo | `src/assets/rig.webp` |

Search the code for `data-placeholder` or `TODO` to find every slot.

## Rules baked into the code (from the StoryBrand brief)

- Exactly two button types: `PrimaryCta` ("เริ่มต้น 3 ขั้นตอน" → LINE) and `SecondaryCta` ("ดูผลเทรดสด"). See `src/components/site/cta.tsx`. Don't add a third.
- `--cta` red is used by the primary button only.
- No return %, win rate or testimonials. The risk section must stay fully visible and longer than the returns section.
- No top navigation menu. The right-hand chapter rail is in-page only.

## Structure

```
src/
  app/                      layout (fonts, metadata), page (section order), globals.css (tokens)
  components/ui/            shadcn components + parallax-scrolling.tsx
  components/motion/        SmoothScroll (single Lenis), MotionOrchestrator, Rain
  components/site/          header, CTA buttons, chapter rail, mobile sticky CTA, analytics
  components/sections/      one file per StoryBrand section (S1–S13)
  content/faq.tsx           FAQ content + plain text for structured data
  lib/site.ts               links and facts; single source of truth
```

Sections are Server Components. All scroll choreography lives in `MotionOrchestrator` and is attached through `data-*` attributes (see the header comment in that file). Every animation respects `prefers-reduced-motion`.

## Analytics

GTM-compatible `window.dataLayer` events: `lp_view`, `reach_risk_section`, `cta_primary` / `cta_secondary` (with `location`), `simulator`, `footer_line`. Traffic source comes from `?utm_source=` or `?src=`, then falls back to the referrer.

## Fonts

- Thai: **Noto Sans Thai** (loopless / ไม่มีหัว, variable 100–900). Headlines use weight 300.
- Numerals and index marks: **Instrument Serif**. Latin glyphs only.
- Never add letter-spacing to Thai text. The `.t-caps` class is for Latin only.
