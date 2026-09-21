import type { ReactNode } from "react"
import { Check, TriangleAlert, X } from "lucide-react"

import { Em, SectionLabel, SplitHeading } from "@/components/site/typography"
import { site } from "@/lib/site"

/*
 * S7 — Risk, said before anyone asks. The single biggest trust builder.
 * Must stay fully visible (no "read more"), and longer than the returns section.
 * NOTE: never use --cta red here. Warning tone = gold + ivory.
 */
function RiskBlock({ n, title, children }: { n: string; title: string; children: ReactNode }) {
  return (
    <article className="grid gap-x-16 gap-y-6 border-t border-line py-14 lg:grid-cols-12 lg:py-20">
      <div className="lg:col-span-3">
        <span data-slide-in aria-hidden className="t-num t-outline block text-[clamp(5rem,10vw,9rem)] leading-[0.82] lg:sticky lg:top-[calc(var(--header-h)+40px)]">
          {n}
        </span>
      </div>
      <div className="lg:col-span-8">
        <h3 data-reveal className="mb-7 text-[clamp(1.6rem,3vw,2.35rem)] leading-[1.35] font-light text-ink">
          {title}
        </h3>
        <div data-reveal className="max-w-[38em] space-y-5 text-[1.0625rem] leading-[1.9] text-ink-2">
          {children}
        </div>
      </div>
    </article>
  )
}

function Stress({ children }: { children: ReactNode }) {
  return <p className="border-t border-dashed border-line-strong pt-6 text-[1.25rem] font-light text-ink">{children}</p>
}

export function Risk() {
  return (
    <section id="risk" aria-labelledby="risk-title" data-widen className="relative overflow-hidden bg-deep">
      <div aria-hidden className="absolute inset-x-0 top-0 h-[6px] overflow-hidden opacity-45">
        <div data-hazard className="h-full w-[200%] bg-[repeating-linear-gradient(-45deg,var(--gold)_0_8px,transparent_8px_20px)]" />
      </div>

      <div className="container-lux py-(--sec)">
        <div className="mb-16 max-w-4xl lg:mb-20">
          <SectionLabel index="05" className="mb-8">
            <span className="inline-flex items-center gap-2 text-gold-soft">
              <TriangleAlert aria-hidden strokeWidth={1.4} className="size-4" />
              อ่านก่อนตัดสินใจ
            </span>
          </SectionLabel>
          <SplitHeading
            id="risk-title"
            lines={["สิ่งที่คุณต้องรู้ก่อน", <Em key="a">และเราจะไม่พูดให้มันดูสวย</Em>, <Em key="b">กว่าความจริง</Em>]}
          />
        </div>

        <RiskBlock n="01" title="ระบบนี้ไม่มี Stop Loss">
          <p>ระบบออกแบบมาไม่ให้ปิดไม้ที่ติดลบ มันจะถือรอจนกลับมาได้กำไรแล้วค่อยปิด</p>
          <div className="grid gap-3 py-2 sm:grid-cols-2">
            <div className="rounded-[6px] border border-line bg-surface p-5">
              <p className="mb-1.5 flex items-center gap-2 text-[0.9375rem] text-ink">
                <Check aria-hidden strokeWidth={1.5} className="size-4 text-gold" />
                ข้อดี
              </p>
              <p className="text-[0.975rem] leading-relaxed">ไม้ที่ปิดแล้วจะไม่ขาดทุน</p>
            </div>
            <div className="rounded-[6px] border border-gold/30 bg-gold/[0.05] p-5">
              <p className="mb-1.5 flex items-center gap-2 text-[0.9375rem] text-ink">
                <TriangleAlert aria-hidden strokeWidth={1.5} className="size-4 text-gold" />
                ข้อเสียที่คุณต้องรับได้
              </p>
              <p className="text-[0.975rem] leading-relaxed">ระหว่างทางพอร์ตจะติดลบลอย และบางช่วงจะติดลบเยอะ</p>
            </div>
          </div>
          <p>
            ถ้าตลาดวิ่งสวนแรงและนานพอ <strong className="font-normal text-ink">พอร์ตสามารถถูกล้างได้จริง</strong>
          </p>
          <Stress>เราจะไม่บอกว่ามันเป็นไปไม่ได้</Stress>
        </RiskBlock>

        <RiskBlock n="02" title="ระดับเสี่ยงสูง = โดนแรงกว่า">
          <p>x10 โตเร็วกว่า แต่ถ้าเจอตลาดสวน มันก็ไปก่อนเพื่อน</p>
          <Stress>เลือกระดับที่คุณนอนหลับ ไม่ใช่ระดับที่คุณตื่นเต้น</Stress>
        </RiskBlock>

        <RiskBlock n="03" title="ผลในอดีตไม่รับประกันอนาคต">
          <p>ผลเทรดจริงเพิ่งเริ่มนับ {site.trackStart.short} ยังสั้นมาก</p>
          <p>ข้อมูลย้อนหลังที่ใช้พัฒนาระบบเป็นคนละเรื่องกับผลจริง และเราจะแยกให้ดูเสมอ</p>
          <p>นอกจากนี้ยังมีค่าธรรมเนียม ค่าสเปรด และโบรกเกอร์ต่างประเทศไม่ได้อยู่ภายใต้การกำกับของ ก.ล.ต. ไทย</p>
        </RiskBlock>

        <div
          data-reveal
          className="relative mt-6 overflow-hidden rounded-[6px] border border-gold/30 bg-warn p-8 sm:p-12 lg:mt-10 lg:p-16"
        >
          <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_70%_at_0%_0%,rgb(201_162_39/0.13),transparent_60%)]" />
          <ul className="relative mb-10 space-y-5">
            {["อย่าเอาเงินที่คุณเดือดร้อนถ้าเสียมาลง", "อย่าเอาเงินที่ต้องใช้ใน 6 เดือนมาลง", "อย่ากู้มาลงเด็ดขาด"].map((t) => (
              <li key={t} className="flex items-start gap-4 text-[clamp(1.2rem,2.3vw,1.65rem)] leading-[1.5] font-light text-ink">
                <X aria-hidden strokeWidth={1.25} className="mt-[0.3em] size-6 shrink-0 text-gold-soft" />
                {t}
              </li>
            ))}
          </ul>
          <p className="relative max-w-[36em] border-t border-gold/25 pt-8 text-[1.0625rem] leading-[1.9] text-ink-2">
            ถ้าอ่านถึงตรงนี้แล้วคุณรู้สึกว่าเสี่ยงเกินไป <span className="text-gold-soft">เราถือว่าหน้านี้ทำงานสำเร็จแล้ว</span>{" "}
            และยินดีที่คุณรู้ก่อนเสียเงิน
          </p>
        </div>
      </div>
    </section>
  )
}
