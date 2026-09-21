import { MotionOrchestrator } from "@/components/motion/motion-orchestrator"
import { Explain } from "@/components/sections/explain"
import { Faq } from "@/components/sections/faq"
import { FinalCta } from "@/components/sections/final-cta"
import { Footer } from "@/components/sections/footer"
import { Guide } from "@/components/sections/guide"
import { Hero } from "@/components/sections/hero"
import { Level } from "@/components/sections/level"
import { Money } from "@/components/sections/money"
import { Plan } from "@/components/sections/plan"
import { Proof } from "@/components/sections/proof"
import { Risk } from "@/components/sections/risk"
import { Stakes } from "@/components/sections/stakes"
import { Value } from "@/components/sections/value"
import { Analytics } from "@/components/site/analytics"
import { ChapterRail } from "@/components/site/chapter-rail"
import { SiteHeader } from "@/components/site/header"
import { MobileCta } from "@/components/site/mobile-cta"
import { faq } from "@/content/faq"
import { site } from "@/lib/site"

/*
 * StoryBrand landing page — one job: turn visitors into LINE OA friends.
 * Order: Header → Proof → Stakes → Value → Guide → Plan → Risk → Money →
 *        Levels → Explanatory → FAQ → Final CTA → Footer.
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
        <Proof />
        <Stakes />
        <Value />
        <Guide />
        <Plan />
        <Risk />
        <Money />
        <Level />
        <Explain />
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
