import Image from "next/image"

import { PrimaryCta } from "@/components/site/cta"
import { Em, SectionLabel, SplitHeading } from "@/components/site/typography"
import rig from "@/assets/rig.webp"

/* S12 — Closing CTA + explicit permission to say "not yet". */
export function FinalCta() {
  return (
    <section
      id="final"
      aria-labelledby="final-title"
      data-widen
      className="relative isolate flex min-h-svh items-center overflow-hidden py-(--sec)"
    >
      <div aria-hidden className="absolute inset-0 -z-20 overflow-hidden">
        <Image data-zoom-out src={rig} alt="" fill sizes="100vw" className="object-cover object-[50%_30%] will-change-transform" />
      </div>
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,var(--background)_0%,rgb(11_13_18/0.74)_28%,rgb(11_13_18/0.8)_72%,var(--background)_100%),radial-gradient(50%_50%_at_50%_50%,rgb(201_162_39/0.1),transparent)]"
      />

      <div className="container-lux flex flex-col items-center text-center">
        <SectionLabel index="09" className="mb-8">
          ตัดสินใจ
        </SectionLabel>
        <SplitHeading
          id="final-title"
          className="t-display text-[clamp(2.1rem,5.2vw,4.5rem)]"
          lines={["พร้อมเริ่ม หรือขอดูไปก่อน", <Em key="e">ทั้งสองทางโอเคหมด</Em>]}
        />

        <div className="mt-14 grid w-full max-w-5xl gap-4 text-left md:grid-cols-2">
          {[
            {
              title: "ถ้าคุณพร้อม",
              text: "กดปุ่มข้างล่างได้เลย ระบบจะพาไปทีละขั้น มีคลิปให้ดูทุกขั้นตอน ไม่ต้องรอใครตอบ ไม่ต้องนัดคุย",
            },
            {
              title: "ถ้ายังไม่พร้อม",
              text: "ก็แอดไลน์ไว้เฉย ๆ ได้ เราส่งสรุปผลให้ทุกสัปดาห์ รวมสัปดาห์ที่แย่ด้วย ดูไป 1 เดือน 3 เดือน หรือจนกว่าจะมั่นใจก็ได้",
            },
          ].map((c) => (
            <div key={c.title} data-reveal className="rounded-[6px] border border-line bg-background/55 p-7 backdrop-blur-md sm:p-9">
              <h3 className="mb-3 text-[1.125rem] font-normal text-gold-soft">{c.title}</h3>
              <p className="leading-[1.85] text-ink-2">{c.text}</p>
            </div>
          ))}
        </div>

        <p data-reveal className="mt-14 max-w-[30em] text-[clamp(1.15rem,2vw,1.45rem)] leading-[1.7] font-light text-ink">
          การลงทุนที่ตัดสินใจตอนยังไม่มั่นใจมักจบไม่สวย เพราะพอเจอติดลบครั้งแรก คุณจะถอนออกตอนที่แย่ที่สุดพอดี{" "}
          <span className="text-gold-soft">เราไม่รีบ และคุณก็ไม่ควรรีบ</span>
        </p>

        <div data-reveal id="final-cta" className="mt-12 w-full sm:w-auto">
          <PrimaryCta location="final" className="w-full sm:w-auto" />
        </div>
      </div>
    </section>
  )
}
