import { Eye, Lock, Timer } from "lucide-react"

import { Em, SectionLabel, SplitHeading } from "@/components/site/typography"

/* S4 — Value proposition. Exactly three. Life outcomes, not features. */
const values = [
  {
    icon: Eye,
    title: "ตรวจสอบได้ทุกไม้",
    text: "คุณเห็นทุกอย่างที่ระบบทำ ตอนที่มันทำ ไม่ต้องรอรายงานสรุปที่ใครเลือกมาให้ดู",
  },
  {
    icon: Lock,
    title: "เงินอยู่ในมือคุณ",
    text: "บัญชีเป็นชื่อคุณ รหัสอยู่กับคุณ เราไม่มีสิทธิ์ถอนเงินออกจากบัญชีคุณไม่ว่ากรณีใด",
  },
  {
    icon: Timer,
    title: "ได้เวลาคืนมา",
    text: "ตั้งค่า 15 นาทีครั้งเดียว หลังจากนั้นระบบทำงาน 24 ชั่วโมง คุณไปใช้ชีวิต",
  },
]

export function Value() {
  return (
    <section id="value" aria-labelledby="value-title" className="bg-deep">
      <div className="container-lux py-(--sec)">
        <div className="mb-14 grid gap-8 lg:mb-20 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <SectionLabel index="02" className="mb-8">
              สิ่งที่คุณได้กลับไป
            </SectionLabel>
            <SplitHeading id="value-title" lines={["ไม่ใช่ฟีเจอร์ของระบบ", <Em key="e">แต่คือชีวิตที่เปลี่ยนไป</Em>]} />
          </div>
          <p data-reveal className="text-muted-foreground lg:col-span-3 lg:col-start-10 lg:text-right">
            สามข้อ ไม่มากกว่านั้น
          </p>
        </div>

        <div className="grid gap-5">
          {values.map(({ icon: Icon, title, text }, i) => (
            <article
              key={title}
              data-stack-card
              style={{ top: `calc(var(--header-h) + 24px + ${i * 22}px)` }}
              className="sticky grid min-h-[clamp(320px,50vh,440px)] origin-top items-center gap-8 overflow-hidden rounded-[6px] border border-line-strong bg-[linear-gradient(155deg,#171b22_0%,#0e1016_65%)] p-7 will-change-transform sm:p-10 lg:grid-cols-[auto_1fr_auto] lg:gap-14 lg:p-14"
            >
              <span aria-hidden className="t-num t-outline text-[clamp(4.5rem,10vw,9rem)] leading-[0.8]">
                0{i + 1}
              </span>
              <div>
                <h3 className="mb-4 text-[clamp(1.6rem,3vw,2.5rem)] leading-[1.35] font-light text-ink">{title}</h3>
                <p className="max-w-[30em] text-[1.0625rem] leading-[1.85] text-ink-2">{text}</p>
              </div>
              <span className="grid size-[clamp(84px,9vw,124px)] place-items-center rounded-full border border-gold/30 bg-[radial-gradient(circle,rgb(201_162_39/0.12),transparent_70%)] text-gold-soft">
                <Icon aria-hidden strokeWidth={0.9} className="size-[42%]" />
              </span>
              <span
                aria-hidden
                className="pointer-events-none absolute -top-1/2 -right-1/4 h-[140%] w-3/5 bg-[radial-gradient(closest-side,rgb(201_162_39/0.08),transparent)]"
              />
              <span data-stack-shade aria-hidden className="pointer-events-none absolute inset-0 bg-black opacity-0" />
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
