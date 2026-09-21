import { Copy, Eye, SlidersHorizontal } from "lucide-react"

import { PrimaryCta } from "@/components/site/cta"
import { Em, SectionLabel, SplitHeading } from "@/components/site/typography"

/* S6 — The plan. Three steps, never more. Carries primary CTA #2. */
const steps = [
  { icon: Eye, title: "ดูของจริง", text: "ดูผลเทรดสด ดูว่าระบบเปิด-ปิดไม้ยังไง ติดลบตอนไหน" },
  { icon: SlidersHorizontal, title: "เลือกระดับ", text: "เลือกความเสี่ยงที่คุณนอนหลับ ตั้งแต่ x1 ถึง x10" },
  { icon: Copy, title: "กดก็อปปี้", text: "เปิดบัญชีชื่อคุณ ฝากเงินเข้าบัญชีคุณ แล้วกดปุ่มก็อปปี้ 1 ครั้ง" },
]

export function Plan() {
  return (
    <section id="plan" aria-labelledby="plan-title" className="bg-deep">
      <div className="container-lux py-(--sec)">
        <div className="mx-auto mb-16 flex max-w-3xl flex-col items-center text-center lg:mb-24">
          <SectionLabel index="04" className="mb-8">
            แผน
          </SectionLabel>
          <SplitHeading id="plan-title" lines={[<span key="a">เริ่มยังไง — <Em>3 ขั้น</Em></span>, "ประมาณ 15 นาที"]} />
        </div>

        <div data-plan className="relative pl-12 lg:pt-14 lg:pl-0">
          <span aria-hidden className="absolute top-3 bottom-3 left-[11px] w-px bg-line-strong lg:top-[11px] lg:right-[16.66%] lg:bottom-auto lg:left-[16.66%] lg:h-px lg:w-auto" />
          <span
            data-plan-progress
            aria-hidden
            className="absolute top-3 bottom-3 left-[11px] w-px origin-top bg-linear-to-b from-gold to-gold-soft shadow-[0_0_14px_var(--gold)] lg:top-[11px] lg:right-[16.66%] lg:bottom-auto lg:left-[16.66%] lg:h-px lg:w-auto lg:origin-left lg:bg-linear-to-r"
          />
          <ol className="grid gap-10 lg:grid-cols-3 lg:gap-8">
          {steps.map(({ icon: Icon, title, text }, i) => (
            <li key={title} data-step data-on="" className="group/step relative lg:text-center">
              <span
                aria-hidden
                className="absolute top-2 -left-12 grid size-[23px] place-items-center rounded-full border border-line-strong bg-deep transition-all duration-700 ease-out-expo group-data-on/step:border-gold group-data-on/step:shadow-[0_0_0_6px_rgb(201_162_39/0.1),0_0_24px_rgb(201_162_39/0.45)] lg:-top-14 lg:left-1/2 lg:-translate-x-1/2"
              >
                <span className="size-[7px] rounded-full bg-line-strong transition-colors duration-700 group-data-on/step:bg-gold" />
              </span>
              <div
                data-reveal
                className="h-full rounded-[6px] border border-line bg-surface p-7 transition-colors duration-700 group-data-on/step:border-gold/25 sm:p-9"
              >
                <span className="t-num block text-[3.5rem] leading-none text-gold-soft">{i + 1}</span>
                <Icon aria-hidden strokeWidth={1.1} className="mt-6 mb-5 size-7 text-gold lg:mx-auto" />
                <h3 className="mb-3 text-[1.4rem] font-normal text-ink">{title}</h3>
                <p className="text-[0.975rem] leading-relaxed text-muted-foreground">{text}</p>
              </div>
            </li>
          ))}
          </ol>
        </div>

        <div data-reveal className="mt-16 flex flex-col items-center gap-8 text-center lg:mt-24">
          <p className="text-ink-2">
            ทุกขั้นมีคลิปจับหน้าจอทีละคลิก
            <br />
            <span className="text-muted-foreground">ไม่ต้องเดา ไม่ต้องนัดคุย ไม่ต้องรอใครตอบ</span>
          </p>
          <PrimaryCta location="plan" className="w-full sm:w-auto" />
        </div>
      </div>
    </section>
  )
}
