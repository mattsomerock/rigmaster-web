"use client"

import * as React from "react"
import gsap from "gsap"
import { CalendarDays } from "lucide-react"

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

const DAY_PROFIT = 1000
const RATES = { link: 0.15, self: 0.3 } as const
type RateKey = keyof typeof RATES

const fmt = (n: number) => Math.round(n).toLocaleString("th-TH")

function useTweenedNumber(target: number) {
  const [value, setValue] = React.useState(target)
  const current = React.useRef(target)

  React.useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const o = { v: current.current }
    const tween = gsap.to(o, {
      v: target,
      duration: reduce ? 0 : 0.9,
      ease: "expo.out",
      onUpdate: () => {
        current.current = o.v
        setValue(o.v)
      },
    })
    return () => {
      tween.kill()
    }
  }, [target])

  return value
}

/** Illustrative daily split — explicitly NOT a projection or guarantee. */
export function ProfitCalculator() {
  const [rate, setRate] = React.useState<RateKey>("link")
  const ours = DAY_PROFIT * RATES[rate]
  const yours = DAY_PROFIT - ours
  const yoursShown = useTweenedNumber(yours)
  const oursShown = useTweenedNumber(ours)

  return (
    <div className="rounded-[6px] border border-line-strong bg-linear-to-b from-surface-2 to-deep p-6 sm:p-10">
      <p className="t-caps mb-2 text-gold-soft">Illustration only</p>
      <p className="mb-1 text-[0.8125rem] text-muted-foreground">ตัวอย่างสมมติ เพื่อให้เห็นวิธีคิดเท่านั้น</p>
      <h3 className="mb-7 text-[1.45rem] font-light text-ink">ถ้าวันนั้นระบบทำกำไรได้ 1,000 บาท</h3>

      <ToggleGroup
        type="single"
        value={rate}
        onValueChange={(v) => v && setRate(v as RateKey)}
        spacing={0}
        aria-label="เลือกวิธีเปิดพอร์ต"
        className="mb-8 w-full rounded-(--radius) border border-line-strong p-1"
      >
        {(
          [
            ["link", "เปิดผ่านลิงก์เรา · 15%"],
            ["self", "เปิดเอง · 30%"],
          ] as const
        ).map(([value, label]) => (
          <ToggleGroupItem
            key={value}
            value={value}
            className="h-11 flex-1 rounded-[3px]! px-3 text-[0.875rem] font-normal text-muted-foreground transition-colors duration-500 hover:bg-transparent hover:text-ink data-[state=on]:bg-gold data-[state=on]:font-medium data-[state=on]:text-background sm:text-[0.9375rem]"
          >
            {label}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>

      <div aria-hidden className="flex h-14 overflow-hidden rounded-(--radius) border border-line bg-deep">
        <div
          className="flex items-center bg-linear-to-r from-gold/40 to-gold-soft/70 pl-4 text-[0.75rem] font-medium text-background transition-[flex-basis] duration-700 ease-out-expo"
          style={{ flexBasis: `${(yours / DAY_PROFIT) * 100}%` }}
        >
          ส่วนของคุณ
        </div>
        <div className="flex min-w-0 flex-1 items-center justify-end overflow-hidden pr-3 text-[0.75rem] whitespace-nowrap text-muted-foreground">
          <span className="hidden sm:inline">ของเรา</span>
        </div>
      </div>

      <dl className="mt-4 grid grid-cols-2 gap-3" aria-live="polite">
        <div className="rounded-(--radius) border border-line bg-deep px-5 py-4">
          <dt className="text-[0.8125rem] text-muted-foreground">ส่วนของคุณ</dt>
          <dd className="t-num text-[2.6rem] leading-tight text-gold-soft">{fmt(yoursShown)}</dd>
        </div>
        <div className="rounded-(--radius) border border-line bg-deep px-5 py-4">
          <dt className="text-[0.8125rem] text-muted-foreground">ส่วนแบ่งของเรา</dt>
          <dd className="t-num text-[2.6rem] leading-tight text-ink">{fmt(oursShown)}</dd>
        </div>
      </dl>

      <p className="mt-4 flex items-center gap-3 rounded-(--radius) border border-dashed border-line-strong px-5 py-4 text-[0.9375rem] text-ink-2">
        <CalendarDays aria-hidden strokeWidth={1.25} className="size-5 shrink-0 text-gold" />
        <span>
          วันที่ไม่มีกำไร → ส่วนแบ่งของเรา <span className="t-num text-xl text-ink">0</span> บาท ทั้งสองแบบ
        </span>
      </p>
      <p className="mt-4 text-[0.8125rem] leading-relaxed text-muted-foreground">
        ตัวเลขนี้เป็นเพียงตัวอย่างการคำนวณ ไม่ใช่ผลตอบแทนที่คาดการณ์หรือรับประกัน
      </p>
    </div>
  )
}
