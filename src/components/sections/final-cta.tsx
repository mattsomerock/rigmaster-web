import Image from "next/image"

import { PrimaryCta } from "@/components/site/cta"
import { Em, SectionLabel, SplitHeading } from "@/components/site/typography"
import rigPoster from "@/assets/rig-poster.webp"

/* CLOSE. One button + explicit permission to say "not yet". */
export function FinalCta() {
  return (
    <section
      id="final"
      aria-labelledby="final-title"
      data-widen
      className="relative isolate flex min-h-[88svh] items-center overflow-hidden py-(--sec)"
    >
      <div aria-hidden className="absolute inset-0 -z-20 overflow-hidden">
        <Image data-zoom-out src={rigPoster} alt="" fill sizes="100vw" className="object-cover object-[50%_28%] will-change-transform" />
      </div>
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,var(--background)_0%,rgb(11_13_18/0.72)_30%,rgb(11_13_18/0.8)_70%,var(--background)_100%),radial-gradient(50%_50%_at_50%_50%,rgb(201_162_39/0.1),transparent)]"
      />

      <div className="container-lux flex flex-col items-center text-center">
        <SectionLabel index="05" className="mb-8">
          ตัดสินใจ
        </SectionLabel>
        <SplitHeading
          id="final-title"
          className="t-display text-[clamp(2.1rem,5.2vw,4.5rem)]"
          lines={["พร้อมเริ่ม หรือขอดูไปก่อน", <Em key="e">ทั้งสองทางโอเคหมด</Em>]}
        />
        <p data-reveal className="mt-8 max-w-[32em] text-[clamp(1.05rem,1.6vw,1.25rem)] leading-[1.8] text-ink-2">
          ยังไม่พร้อมก็แอดไลน์ไว้ดูเฉย ๆ ได้ เราส่งสรุปผลให้ทุกสัปดาห์ รวมสัปดาห์ที่แย่ด้วย
          <span className="mt-2 block text-gold-soft">เราไม่รีบ และคุณก็ไม่ควรรีบ</span>
        </p>
        <div data-reveal id="final-cta" className="mt-10 w-full sm:w-auto">
          <PrimaryCta location="final" className="w-full sm:w-auto" />
        </div>
      </div>
    </section>
  )
}
