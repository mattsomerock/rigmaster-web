import { CalendarDays } from "lucide-react"

import { DashboardFrame } from "@/components/sections/dashboard-frame"
import { Em, SectionLabel, SplitHeading } from "@/components/site/typography"
import { site } from "@/lib/site"

/* S2 — Proof bar. No return %, no win rate, no testimonials (by design). */
const nb = "whitespace-nowrap"
const stats = [
  { value: 6, unit: "เดือน", text: "รันจริงด้วยเงินตัวเองก่อนเปิดให้ใครก็อปปี้" },
  { value: 307, unit: "วัน", text: "VPS ทำงานต่อเนื่องไม่หลุด" },
  {
    value: 100,
    unit: "%",
    text: (
      <>
        เงินในพอร์ตคัดลอกทั้งหมดเป็นของ<span className={nb}>ผู้ก่อตั้งเอง</span>
      </>
    ),
  },
  {
    value: null,
    unit: "ทุกไม้",
    text: (
      <>
        เปิดให้ตรวจสอบสด ไม่ตัดต่อ <span className={nb}>ไม่เลือกโชว์</span>
      </>
    ),
  },
]

export function Proof() {
  return (
    <section id="proof" aria-labelledby="proof-title" className="relative z-10 -mt-px pb-(--sec)">
      <div className="container-lux">
        <div className="mb-12 grid gap-8 lg:mb-20 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <SectionLabel index="00" className="mb-8">
              หลักฐาน
            </SectionLabel>
            <SplitHeading
              id="proof-title"
              lines={["เราไม่ขายสัญญาณ", <Em key="e">เราให้คุณดูพอร์ตจริง</Em>]}
            />
          </div>
          <p data-reveal className="t-lead lg:col-span-4 lg:col-start-9">
            ทุกไม้ที่ระบบเปิดและปิด ตรวจสอบได้แบบเรียลไทม์ ไม่ต้องรอรายงานสรุปที่ใครเลือกมาให้ดู
          </p>
        </div>

        <DashboardFrame />

        <dl className="mt-16 grid grid-cols-2 border-t border-line lg:mt-24 lg:grid-cols-4">
          {stats.map((s) => (
            <div
              key={s.unit}
              data-reveal
              className="flex flex-col gap-4 border-b border-line py-8 pr-4 max-lg:odd:border-r max-lg:even:pl-5 lg:border-r lg:px-8 lg:py-10 lg:first:pl-0 lg:last:border-r-0"
            >
              <dt className="order-2 text-[0.9375rem] leading-relaxed text-muted-foreground">{s.text}</dt>
              <dd className="order-1 flex items-baseline gap-2 text-ink">
                {s.value !== null ? (
                  <>
                    <span data-count={s.value} className="t-num text-[clamp(3rem,6.5vw,5.25rem)] leading-none">
                      {s.value}
                    </span>
                    <span className="text-lg font-light text-gold-soft">{s.unit}</span>
                  </>
                ) : (
                  <span className="text-[clamp(2.1rem,4.4vw,3.4rem)] leading-none font-light">{s.unit}</span>
                )}
              </dd>
            </div>
          ))}
        </dl>

        <p data-reveal className="mt-10 flex max-w-xl items-start gap-4 text-[0.9375rem] leading-relaxed text-ink-2">
          <CalendarDays aria-hidden strokeWidth={1.25} className="mt-1 size-5 shrink-0 text-gold" />
          <span>
            ผลเทรดจริงของพอร์ตหลักเริ่มนับ {site.trackStart.long}
            <br />
            ยังเป็นช่วงเริ่มต้น และเราจะไม่พูดเกินกว่านั้น
          </span>
        </p>
      </div>
    </section>
  )
}
