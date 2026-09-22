import { MotionOrchestrator } from "@/components/motion/motion-orchestrator"
import { Faq } from "@/components/sections/faq"
import { FinalCta } from "@/components/sections/final-cta"
import { Footer } from "@/components/sections/footer"
import { Hero } from "@/components/sections/hero"
import { LiveStrip } from "@/components/sections/live-strip"
import { Offer } from "@/components/sections/offer"
import { Risk } from "@/components/sections/risk"
import { Story } from "@/components/sections/story"
import { Analytics } from "@/components/site/analytics"
import { ChapterRail } from "@/components/site/chapter-rail"
import { SiteHeader } from "@/components/site/header"
import { MobileCta } from "@/components/site/mobile-cta"
import { faq } from "@/content/faq"
import { site } from "@/lib/site"

/*
 * StoryBrand landing page — one job: turn visitors into LINE OA friends.
 * Hook → Real data → Story → Offer → Risk → Detail (FAQ) → Close → Footer.
 * Say each thing once; anything a careful reader wants goes in the FAQ.
 */
const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    url: site.url,
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.text },
    })),
  },
]

export default function Home() {
  return (
    <>
      <a
        href="#main"
        className="fixed top-3 left-3 z-[100] -translate-y-24 rounded-(--radius) bg-ink px-4 py-2 text-sm font-medium text-background transition-transform focus:translate-y-0"
      >
        ข้ามไปยังเนื้อหาหลัก
      </a>
      <SiteHeader />
      <ChapterRail />

      <main id="main">
        <Hero />
        <LiveStrip />
        <Story />
        <Offer />
        <Risk />
        <Faq />
        <FinalCta />
      </main>
      <Footer />

      <MobileCta />
      <Analytics />
      <MotionOrchestrator />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  )
}
