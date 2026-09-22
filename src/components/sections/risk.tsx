import { TriangleAlert, X } from "lucide-react"

import { LoopVideo } from "@/components/motion/loop-video"
import { Em, SectionLabel, SplitHeading } from "@/components/site/typography"
import { asset, site } from "@/lib/site"
import rigPoster from "@/assets/rig-poster.webp"

/*
 * RISK, said before anyone asks — the single biggest trust builder.
 * Must stay fully visible (no "read more") and longer than the offer's money terms.
 * NOTE: never use --cta red here. Warning tone = gold + ivory.
 */
const risks = [
  {
    title: "ระบบนี้ไม่มี Stop Loss",
    text: (
      <>
        ไม้ที่ปิดแล้วจะไม่ขาดทุน แต่ระหว่างทางพอร์ตจะติดลบลอย บางช่วงติดลบเยอะ และถ้าตลาดวิ่งสวนแรงและนานพอ{" "}
        <strong className="font-normal text-ink">พอร์ตถูกล้างได้จริง</strong>
      </>
    ),
  },
  {
    title: "ระดับยิ่งสูง ยิ่งโดนแรง",
    text: (
      <>
        x10 โตเร็วกว่า แต่ถ้าเจอตลาดสวน มันก็ไปก่อนเพื่อน{" "}
        <span className="text-ink">เลือกระดับที่คุณนอนหลับ ไม่ใช่ระดับที่คุณตื่นเต้น</span>
      </>
    ),
  },
  {
    title: "ผลจริงยังสั้นมาก",
    text: (
      <>
        เพิ่งเริ่มนับ {site.trackStart.short} ผลในอดีตไม่รับประกันอนาคต มีค่าธรรมเนียมและค่าสเปรด
        และโบรกเกอร์เป็นโบรกเกอร์ต่างประเทศที่ไม่ได้อยู่ภายใต้การกำกับของ ก.ล.ต. ไทย
      </>
    ),
  },
]

export function Risk() {
  return (
    <section id="risk" aria-labelledby="risk-title" className="relative overflow-hidden bg-deep">
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 z-10 h-[6px] bg-[repeating-linear-gradient(-45deg,var(--gold)_0_8px,transparent_8px_20px)] opacity-45"
      />

      {/* Chapter break: the same rig, now in the storm. */}
      <div className="relative isolate flex min-h-[72svh] items-end lg:min-h-[74vh] lg:items-center">
        <div aria-hidden className="absolute inset-0 -z-10 lg:right-auto lg:w-[52%] lg:[mask-image:linear-gradient(to_left,transparent,#000_38%)]">
          <div data-zoom-out className="absolute inset-0 origin-[50%_85%] will-change-transform">
            <LoopVideo
              src={asset("/media/rig-loop.mp4")}
              poster={rigPoster}
              sizes="(min-width: 1024px) 52vw, 100vw"
              mediaClassName="object-[50%_100%] brightness-[.72] contrast-[1.1] saturate-[.55]"
            />
          </div>
          <div className="absolute inset-0 bg-[linear-gradient(180deg,var(--deep)_0%,rgb(7_8_11/0.1)_26%,rgb(7_8_11/0.35)_55%,var(--deep)_100%)]" />
        </div>

        <div className="container-lux pb-4 lg:grid lg:grid-cols-12 lg:pb-0">
          <div className="lg:col-span-6 lg:col-start-7">
            <SectionLabel index="03" className="mb-8">
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
        </div>
      </div>

      <div className="container-lux pt-14 pb-(--sec) lg:pt-20">
        <ol className="grid border-t border-line lg:grid-cols-3">
          {risks.map((r, i) => (
            <li
              key={r.title}
              className="grid grid-cols-[3.4rem_1fr] gap-x-5 border-b border-line py-9 lg:flex lg:flex-col lg:gap-5 lg:border-r lg:border-b-0 lg:px-8 lg:py-12 lg:first:pl-0 lg:last:border-r-0 lg:last:pr-0"
            >
              <span aria-hidden className="t-num t-outline text-[3.4rem] leading-[0.85] lg:text-[5rem]">
                0{i + 1}
              </span>
              <div>
                <h3 className="mb-3 text-[clamp(1.3rem,2.2vw,1.65rem)] leading-[1.4] font-light text-ink">{r.title}</h3>
                <p className="text-[1rem] leading-[1.85] text-ink-2">{r.text}</p>
              </div>
            </li>
          ))}
        </ol>

        <div
          className="relative mt-12 overflow-hidden rounded-[6px] border border-gold/30 bg-warn p-7 sm:p-10 lg:mt-16 lg:grid lg:grid-cols-12 lg:gap-10 lg:p-14"
        >
          <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_70%_at_0%_0%,rgb(201_162_39/0.13),transparent_60%)]" />
          <ul className="relative space-y-4 lg:col-span-7">
            {[
              <>
                อย่าเอาเงินที่คุณเดือดร้อน<span className="whitespace-nowrap">ถ้าเสียมาลง</span>
              </>,
              "อย่าเอาเงินที่ต้องใช้ใน 6 เดือนมาลง",
              "อย่ากู้มาลงเด็ดขาด",
            ].map((t, i) => (
              <li key={i} className="flex items-start gap-4 text-[clamp(1.15rem,2.1vw,1.5rem)] leading-[1.5] font-light text-ink">
                <X aria-hidden strokeWidth={1.25} className="mt-[0.3em] size-5 shrink-0 text-gold-soft" />
                <span>{t}</span>
              </li>
            ))}
          </ul>
          <p className="relative mt-8 border-t border-gold/25 pt-7 text-[1rem] leading-[1.85] text-ink-2 lg:col-span-5 lg:mt-0 lg:self-center lg:border-t-0 lg:border-l lg:pt-0 lg:pl-10">
            ถ้าอ่านถึงตรงนี้แล้วรู้สึกว่าเสี่ยงเกินไป <span className="text-gold-soft">เราถือว่าหน้านี้ทำงานสำเร็จแล้ว</span>{" "}
            และยินดีที่คุณรู้ก่อนเสียเงิน
          </p>
        </div>
      </div>
    </section>
  )
}
