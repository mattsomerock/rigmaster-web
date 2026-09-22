import { Eye, Landmark, Percent } from "lucide-react"

import { DashboardFrame, type PortfolioShot } from "@/components/sections/dashboard-frame"
import { PrimaryCta, SecondaryCta } from "@/components/site/cta"
import { Em, SectionLabel, SplitHeading } from "@/components/site/typography"
import portfolioShot from "@/assets/portfolio-shot.webp"

/* Real MT5 screenshot from the VPS, recoloured to the site palette. The EA's
   settings panel and name, account number, tickets and lot sizes are cropped out;
   no figure is altered. Replace the file and update the date when re-shooting. */
const shot: PortfolioShot = {
  image: portfolioShot,
  alt: "หน้าจอ MT5 จริงของพอร์ตหลัก 22 ก.ย. 2026: กราฟ USOUSD รายชั่วโมง และไม้ Buy ที่เปิดอยู่ 4 ไม้ ไม่มี Stop Loss ติดลบลอยรวม 472.20 USC",
  // U+2060 (word joiner) keeps "ซ่อนเลขบัญชีและค่าตั้งระบบ" on one line; it breaks at the " · " instead.
  note: "ภาพจริงจาก MT5 บน VPS · 22 ก.ย. 2026 · ซ่อน⁠เลข⁠บัญชี⁠และ⁠ค่า⁠ตั้ง⁠ระบบ",
}

/*
 * OFFER. What you get (proof + three promises) and how to start (three steps).
 * Each fact lives here once; the long-form "why" sits in the FAQ.
 * No return %, no win rate, no testimonials (by design).
 */
const promises = [
  {
    icon: Eye,
    title: "เห็นทุกไม้ สด ๆ",
    text: "ทุกไม้ที่ระบบเปิด-ปิด รวมไม้ที่ติดลบ ตรวจสอบได้ตอนที่มันเกิด ไม่ใช่รายงานสรุปที่เลือกมาให้ดู",
  },
  {
    icon: Landmark,
    title: "เงินไม่เคยผ่านมือเรา",
    text: "บัญชีชื่อคุณ รหัสอยู่กับคุณ เราถอนเงินไม่ได้ และจะไม่ขอให้โอนเงินมาที่เราเด็ดขาด",
  },
  {
    icon: Percent,
    title: "ไม่กำไร ไม่จ่าย",
    text: "หักส่วนแบ่งเป็นรายวัน เฉพาะวันที่มีกำไร ไม่มีค่าสมัคร ไม่มีสัญญาผูกมัด",
    rates: true,
  },
]

const steps = [
  { title: "ดูของจริง", text: "เปิดผลเทรดสด ดูว่าระบบติดลบลึกแค่ไหนก่อนตัดสินใจ" },
  { title: "เลือกระดับ", text: "x1 ถึง x10 ตามเงินและใจที่คุณรับได้" },
  { title: "กดก็อปปี้", text: "เปิดบัญชีชื่อคุณ ฝากเงิน แล้วกดก็อปปี้ครั้งเดียว" },
]

export function Offer() {
  return (
    <section id="offer" aria-labelledby="offer-title" className="bg-deep">
      <div className="container-lux py-(--sec)">
        <div className="mb-12 grid gap-8 lg:mb-16 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <SectionLabel index="02" className="mb-8">
              ข้อเสนอ
            </SectionLabel>
            <SplitHeading id="offer-title" lines={["เราไม่ขายสัญญาณ", <Em key="e">เราเปิดพอร์ตจริงให้คุณก็อปปี้</Em>]} />
          </div>
          <div className="lg:col-span-4 lg:flex lg:justify-end">
            <SecondaryCta location="offer" size="md" className="w-full sm:w-auto" />
          </div>
        </div>

        <DashboardFrame shot={shot} />

        <ul className="mt-14 grid border-t border-line md:grid-cols-3 lg:mt-20">
          {promises.map(({ icon: Icon, title, text, rates }) => (
            <li
              key={title}
              className="flex flex-col gap-3 border-b border-line py-8 md:border-r md:border-b-0 md:px-8 md:first:pl-0 md:last:border-r-0 md:last:pr-0"
            >
              <Icon aria-hidden strokeWidth={1.1} className="size-7 text-gold" />
              <h3 className="mt-2 text-[1.3rem] leading-snug font-normal text-ink">{title}</h3>
              <p className="text-[0.975rem] leading-relaxed text-muted-foreground">{text}</p>
              {rates && (
                <p className="mt-1 flex flex-wrap gap-2">
                  <span className="rounded-full border border-gold/35 px-3 py-1 text-[0.8125rem] text-gold-soft">15% ถ้าเปิดบัญชีผ่านลิงก์เรา</span>
                  <span className="rounded-full border border-line-strong px-3 py-1 text-[0.8125rem] text-ink-2">30% ถ้าเปิดเอง</span>
                </p>
              )}
            </li>
          ))}
        </ul>

        <div className="mt-20 lg:mt-28">
          <h3 className="mb-10 text-[clamp(1.45rem,2.6vw,2.1rem)] leading-[1.35] font-light text-ink lg:mb-14 lg:text-center">
            เริ่มได้ใน <Em>3 ขั้น</Em> <span className="text-muted-foreground">· ประมาณ 15 นาที</span>
          </h3>

          <div data-plan className="relative pl-12 lg:pt-12 lg:pl-0">
            {/* Desktop: one horizontal rail between the first and last dot centres. */}
            <span aria-hidden className="absolute top-[11px] right-[16.66%] left-[16.66%] hidden h-px bg-line-strong lg:block" />
            <span
              data-plan-progress
              aria-hidden
              className="absolute top-[11px] right-[16.66%] left-[16.66%] hidden h-px origin-left bg-linear-to-r from-gold to-gold-soft shadow-[0_0_14px_var(--gold)] lg:block"
            />
            <ol className="grid gap-8 lg:grid-cols-3 lg:gap-8">
              {steps.map(({ title, text }, i) => (
                <li key={title} data-step data-on="" className="group/step relative lg:px-6 lg:text-center">
                  {/* Phone: a segment from this dot to the next one — none after the last, so the rail ends on dot 3. */}
                  {i < steps.length - 1 && (
                    <span aria-hidden className="absolute top-[27px] -bottom-9 -left-[37px] w-px bg-line-strong lg:hidden">
                      <span
                        data-plan-seg
                        className="absolute inset-0 origin-top bg-linear-to-b from-gold to-gold-soft shadow-[0_0_14px_var(--gold)]"
                      />
                    </span>
                  )}
                  <span
                    aria-hidden
                    className="absolute top-1 -left-12 grid size-[23px] place-items-center rounded-full border border-line-strong bg-deep transition-all duration-700 ease-out-expo group-data-on/step:border-gold group-data-on/step:shadow-[0_0_0_6px_rgb(201_162_39/0.1),0_0_24px_rgb(201_162_39/0.45)] lg:-top-12 lg:left-1/2 lg:-translate-x-1/2"
                  >
                    <span className="size-[7px] rounded-full bg-line-strong transition-colors duration-700 group-data-on/step:bg-gold" />
                  </span>
                  <div>
                    <p className="flex items-baseline gap-3 lg:justify-center">
                      <span className="t-num text-[2.1rem] leading-none text-gold-soft">{i + 1}</span>
                      <span className="text-[1.3rem] font-normal text-ink">{title}</span>
                    </p>
                    <p className="mt-2 text-[0.975rem] leading-relaxed text-muted-foreground">{text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div id="offer-cta" className="mt-14 flex flex-col items-start gap-6 lg:mt-16 lg:items-center lg:text-center">
            <p className="text-ink-2">
              ทุกขั้นมีคลิปสอนทีละคลิก <span className="whitespace-nowrap">ไม่ต้องนัดคุย</span>{" "}
              <span className="whitespace-nowrap">ไม่ต้องรอใครตอบ</span>
            </p>
            <PrimaryCta location="offer" className="w-full sm:w-auto" />
          </div>
        </div>
      </div>
    </section>
  )
}
