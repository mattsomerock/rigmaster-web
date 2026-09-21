"use client"

import * as React from "react"

import { Slider } from "@/components/ui/slider"
import { cn } from "@/lib/utils"

type Tier = 0 | 1 | 2
const tierOf = (lv: number): Tier => (lv <= 3 ? 0 : lv <= 6 ? 1 : 2)

const DESCRIPTIONS: Record<Tier, string> = {
  0: "ระดับต่ำ — โตช้ากว่า ติดลบระหว่างทางน้อยกว่า เหมาะกับคนที่อยากนอนหลับสบาย",
  1: "ระดับกลาง — โตเร็วขึ้น แต่ช่วงตลาดสวนจะเห็นพอร์ตติดลบลึกขึ้นตามไปด้วย",
  2: "ระดับสูง — โตเร็วกว่า ติดลบระหว่างทางหนักกว่า และมีโอกาสถูกล้างพอร์ตสูงกว่า ถ้าเจอตลาดสวนแรงจะไปก่อนเพื่อน",
}

const METERS = [
  { label: "ความเร็วในการโต", words: ["ช้า", "ปานกลาง", "เร็ว"], fill: "bg-linear-to-r from-gold to-gold-soft", curve: (t: number) => 0.12 + t * 0.88 },
  {
    label: "ความลึกของการติดลบระหว่างทาง",
    words: ["น้อย", "ปานกลาง", "หนัก"],
    fill: "bg-[repeating-linear-gradient(-45deg,#8f8a7f_0_5px,#5c584f_5px_10px)]",
    curve: (t: number) => 0.12 + t * 0.88,
  },
  {
    label: "โอกาสถูกล้างพอร์ต",
    words: ["ต่ำ", "สูงขึ้น", "สูง"],
    fill: "bg-[repeating-linear-gradient(-45deg,#ede8dc_0_2px,#5c584f_2px_7px)]",
    curve: (t: number) => 0.06 + Math.pow(t, 1.7) * 0.94,
  },
] as const

/**
 * Qualitative only — shows direction, never numbers. Real drawdown figures
 * live in the external simulator, which carries its own methodology notes.
 */
export function RiskDial() {
  const [lv, setLv] = React.useState(3)
  const t = (lv - 1) / 9
  const tier = tierOf(lv)

  return (
    <div className="rounded-[6px] border border-line-strong bg-linear-to-b from-surface-2 to-deep p-6 sm:p-10">
      <div className="mb-6 flex items-end justify-between">
        <span className="text-[0.875rem] text-gold-soft">ลองเลื่อนดู</span>
        <output aria-hidden className="t-num text-[4.25rem] leading-none text-ink">
          x{lv}
        </output>
      </div>

      <Slider
        min={1}
        max={10}
        step={1}
        value={[lv]}
        onValueChange={([v]) => setLv(v)}
        thumbLabel="ระดับความเสี่ยงเทียบกับพอร์ตหลัก"
        thumbValueText={`x${lv}`}
        aria-describedby="lv-desc"
        className="py-4"
      />
      <div aria-hidden className="mb-8 flex justify-between text-[0.75rem] text-muted-foreground">
        <span>x1</span>
        <span>x5</span>
        <span>x10</span>
      </div>

      <div className="space-y-5">
        {METERS.map((m) => (
          <div key={m.label}>
            <div className="mb-2 flex justify-between gap-4 text-[0.9375rem] text-ink-2">
              <span>{m.label}</span>
              <span className="text-muted-foreground">{m.words[tier]}</span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-line">
              <i
                className={cn("block h-full origin-left rounded-full transition-transform duration-700 ease-out-expo", m.fill)}
                style={{ transform: `scaleX(${m.curve(t)})` }}
              />
            </div>
          </div>
        ))}
      </div>

      <p id="lv-desc" className="mt-7 min-h-[5.5em] rounded-(--radius) border border-line bg-deep px-5 py-4 text-[0.975rem] leading-relaxed text-ink-2">
        {DESCRIPTIONS[tier]}
      </p>
      <p className="mt-4 text-[0.8125rem] leading-relaxed text-muted-foreground">
        ภาพเปรียบเทียบเชิงคุณภาพเพื่อให้เห็นทิศทางเท่านั้น ไม่ใช่ตัวเลขจริง ตัวเลขจริงดูได้ในตัวจำลอง
      </p>
    </div>
  )
}
