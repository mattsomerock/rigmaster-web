import type { ReactNode } from "react"
import { ArrowUpRight } from "lucide-react"

import { DaysLive } from "@/components/site/days-live"
import { daysSince, liveStats, thaiDate } from "@/lib/live-stats"
import { site } from "@/lib/site"

/*
 * REAL DATA, straight under the hook: the numbers do the talking.
 * Risk-side figures only — never return %, win rate or testimonials (brief S2).
 */
export function LiveStrip() {
  const stats: { label: string; note: string; value: ReactNode; unit: string }[] = [
    {
      label: "ผลจริงเปิดมาแล้ว",
      note: `ตั้งแต่ ${site.trackStart.short}`,
      value: <DaysLive since={site.trackStart.iso} buildValue={daysSince(site.trackStart.iso)} />,
      unit: "วัน",
    },
    {
      label: "ติดลบลึกสุด",
      note: "รวมไม้ที่ยังไม่ปิด",
      value: liveStats.maxDrawdownPct.toFixed(2),
      unit: "%",
    },
    {
      label: "ติดลบลอยตอนนี้",
      note: "ไม้ที่ยังเปิดอยู่",
      value: liveStats.floatingLossPct.toFixed(2),
      unit: "%",
    },
  ]

  return (
    <section id="live" aria-labelledby="live-title" className="relative z-10 border-y border-line bg-deep">
      <div className="container-lux py-9 lg:py-12">
        <div className="mb-6 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1.5">
          <h2 id="live-title" className="flex items-center gap-2.5 text-[0.9375rem] font-normal text-ink">
            <span aria-hidden className="relative size-1.5 rounded-full bg-gold-soft">
              <span className="absolute -inset-1 animate-[rm-ping_2.4s_cubic-bezier(.16,1,.3,1)_infinite] rounded-full border border-gold-soft/70" />
            </span>
            ข้อมูลจริงจากพอร์ตหลัก
          </h2>
          <p className="text-[0.8125rem] text-muted-foreground">MyFxbook · ข้อมูล ณ {thaiDate(liveStats.asOf)}</p>
        </div>

        <dl className="grid grid-cols-3 border-t border-line">
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col gap-2.5 border-r border-line py-6 pr-3 last:border-r-0 not-first:pl-4 lg:py-8 lg:not-first:pl-10">
              <dt className="order-2 text-[0.8125rem] leading-snug text-ink-2 lg:text-[0.9375rem]">
                {s.label}
                <span className="mt-0.5 block text-[0.75rem] text-muted-foreground lg:text-[0.8125rem]">{s.note}</span>
              </dt>
              <dd className="order-1 flex items-baseline gap-1 text-ink">
                <span className="t-num text-[clamp(2.3rem,6vw,4.25rem)] leading-none">{s.value}</span>
                <span className="text-[0.9375rem] text-ink-2 lg:text-lg">{s.unit}</span>
              </dd>
            </div>
          ))}
        </dl>

        <div className="mt-2 flex flex-col gap-4 border-t border-line pt-6 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
          <p className="max-w-[44em] text-[0.875rem] leading-relaxed text-ink-2">
            ตัวเลขนี้มาจากช่วงแรกที่ยังสั้นมาก <span className="text-ink">ยังไม่ใช่จุดที่แย่ที่สุดที่เป็นไปได้</span>{" "}
            ระบบไม่มี Stop Loss ติดลบในอนาคตอาจลึกกว่านี้หลายเท่า
          </p>
          <a
            href={site.links.live}
            target="_blank"
            rel="noopener"
            data-track="cta_secondary"
            data-loc="live_strip"
            className="group inline-flex min-h-11 shrink-0 items-center gap-2 self-start border-b border-gold/40 whitespace-nowrap text-[0.9375rem] text-gold-soft transition-colors hover:border-gold-soft lg:self-auto"
          >
            ดูทุกไม้บน MyFxbook
            <ArrowUpRight aria-hidden strokeWidth={1.5} className="size-4 transition-transform duration-500 ease-out-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>
    </section>
  )
}
