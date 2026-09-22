# RIG MASTER — Landing Page

StoryBrand landing page. Its only job is to turn visitors into LINE OA friends.
Next.js 16 (App Router, static export) · TypeScript · Tailwind CSS v4 · shadcn/ui (Radix) · GSAP + ScrollTrigger.

## Run

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # static site → out/
npm run lint
```

## Deploy — GitHub Pages (automatic)

`.github/workflows/deploy.yml` lints, builds, and publishes on every push to `main`, and every 3 hours to refresh the live data (see below). You can also start it by hand from the Actions tab.

One-time setup: **Settings → Pages → Build and deployment → Source: GitHub Actions**.

basePath (`/<repo>`) and the canonical URL come from `actions/configure-pages`. The same workflow therefore works for a project site, a `<user>.github.io` repo, or a custom domain set in Settings → Pages, with nothing hard-coded.

Other static hosts: `npm run build` and upload `out/`. For a sub-path, set `NEXT_PUBLIC_BASE_PATH=/<path>` and `NEXT_PUBLIC_SITE_URL=<full url>` first.

## Before launch — fill these in

| What | Where |
|---|---|
| Myfxbook API secrets (auto-refresh of the live strip) | GitHub → Settings → Secrets and variables → Actions: `MYFXBOOK_EMAIL`, `MYFXBOOK_PASSWORD` |
| Confirm LINE OA ID and link | `src/lib/site.ts` → `lineId`, `links.line` |
| Risk disclosure + privacy policy links | `src/lib/site.ts` → `links.riskDoc`, `links.privacy` |
| Real domain (OG tags, schema) | `NEXT_PUBLIC_SITE_URL` env or `src/lib/site.ts` → `url` |
| Real dashboard screenshot | `src/components/sections/offer.tsx` → `<DashboardFrame shot={import} />` |
| Founder photo | `src/components/sections/story.tsx` (placeholder comment) |
| Founder story (true events only) | `src/components/sections/story.tsx` → `<Placeholder>` |
| FAQ: minimum capital, "has it ever lost?" | `src/content/faq.tsx` |

Search the code for `data-placeholder` or `TODO` to find every slot.

## Rules baked into the code (from the StoryBrand brief)

- Exactly two button types: `PrimaryCta` ("เริ่มต้น 3 ขั้นตอน" → LINE) and `SecondaryCta` ("ดูผลเทรดสด"). See `src/components/site/cta.tsx`. Don't add a third.
- `--cta` red is used by the primary button only.
- No return %, win rate or testimonials. The risk section must stay fully visible and longer than the money terms in the offer.
- No top navigation menu. The right-hand chapter rail is in-page only.
- The primary CTA is always one tap/click away: the sticky bottom bar on phones and tablets, the header on desktop. Each appears once the hero's own button is out of sight. `useHeroCtaGone` checks geometry instead of IntersectionObserver because the parallax clips the hero button.
- Motion has exactly three moments: the hero opening (plus its parallax), the camera pull-back into the storm, and the 3-step progress rail. Everything else is static, with no smooth-scroll library.
- Short page: Hook → Real data → Story → Offer → Risk → FAQ → Close. Say each fact once. Long-form detail (how the Grid works, x1–x10 levels, why there are two fee rates) goes in the FAQ, not in a new section. This is a deliberate departure from the brief's S8–S10 layout.

## Video

`public/media/rig-loop.mp4` (H.264, 720×1104, ~1.2 MB) is a seamless 9 s loop cut from the source clip: bottom cropped to remove the generator mark, last second cross-faded into the first, no audio. `src/assets/rig-poster.webp` is its first frame and paints before the video (LCP). If you replace the video, export a new poster from its first frame. `LoopVideo` downloads nothing for reduced-motion or Save-Data visitors and plays only while on screen.

## Live data

The strip under the hero (`LiveStrip`) shows risk-side numbers only: days live, max drawdown (Myfxbook's figure, which includes floating losses), and the current floating loss (a floating gain shows as 0). Return %, win rate and balance are never shown.

- Numbers live in `src/content/live-stats.json`. The page always prints their date.
- `scripts/fetch-stats.mjs` refreshes that file from the **official Myfxbook API** during each CI build. The public portfolio page is behind a bot check and must not be scraped.
- It needs the repository secrets `MYFXBOOK_EMAIL` and `MYFXBOOK_PASSWORD`. Without them, or on any API error, the committed snapshot is kept and the build still succeeds.
- The day count is computed in the browser, so it stays correct between builds.
- GitHub pauses scheduled workflows after 60 days with no commits. If the date on the strip stops moving, run the workflow by hand or push any commit.

## Share image

`src/app/opengraph-image.jpg` (1200×630) shows the brand, the main promise and the risk line, with alt text in `opengraph-image.alt.txt`. It was rendered from HTML in Chrome so Thai marks shape correctly. LINE caches link previews; after changing the image, refresh it with LINE's Page Poker tool.

## Structure

```
src/
  app/                      layout (fonts, metadata), page (section order), globals.css (tokens)
  components/ui/            shadcn components + parallax-scrolling.tsx
  components/motion/        MotionOrchestrator (the three moments), LoopVideo
  components/site/          header, CTA buttons, chapter rail, mobile sticky CTA, analytics, DaysLive
  components/sections/      hero, live-strip, story, offer, risk, faq, final-cta, footer
  content/live-stats.json   Myfxbook snapshot shown in the live strip
  lib/live-stats.ts         types + Thai date / day-count helpers
  content/faq.tsx           FAQ content + plain text for structured data
  lib/site.ts               links and facts; single source of truth
```

Sections are Server Components. The three scroll moments live in `MotionOrchestrator` and attach through `data-*` attributes (see the header comment in that file). Every animation respects `prefers-reduced-motion`.

## Analytics

GTM-compatible `window.dataLayer` events: `lp_view`, `scroll_depth` (`percent` 25/50/75/100), `reach_risk_section`, `cta_primary` / `cta_secondary` (with `location`), `simulator`, `footer_line`. Traffic source comes from `?utm_source=` or `?src=`, then falls back to the referrer.

## Fonts

- Thai: **Noto Sans Thai** (loopless / ไม่มีหัว, variable 100–900). Headlines use weight 300.
- Numerals and index marks: **Instrument Serif**. Latin glyphs only.
- Never add letter-spacing to Thai text. The `.t-caps` class is for Latin only.
