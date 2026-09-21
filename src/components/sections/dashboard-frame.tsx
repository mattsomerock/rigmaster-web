import Image, { type StaticImageData } from "next/image"
import { ImageIcon } from "lucide-react"

import { site } from "@/lib/site"

/**
 * Frame for the REAL portfolio screenshot. Until one is supplied (`shot`),
 * it renders a neutral illustrative chart with NO numbers — never fake P&L.
 */
export function DashboardFrame({ shot }: { shot?: StaticImageData }) {
  return (
    <div className="[perspective:1600px]">
      <figure
        data-tilt-in
        className="relative origin-[50%_0%] overflow-hidden rounded-[6px] border border-line-strong bg-linear-to-b from-surface-2 to-deep shadow-[0_80px_160px_-40px_rgb(0_0_0/0.85),0_0_0_1px_rgb(201_162_39/0.06),0_0_120px_-30px_rgb(201_162_39/0.22)] will-change-transform"
      >
        <div className="flex items-center gap-3 border-b border-line px-4 py-3 text-[0.6875rem] tracking-[0.14em] text-muted-foreground uppercase sm:px-5">
          <span aria-hidden className="flex gap-1.5">
            <i className="size-2 rounded-full bg-line-strong" />
            <i className="size-2 rounded-full bg-line-strong" />
            <i className="size-2 rounded-full bg-line-strong" />
          </span>
          <span>
            RIG MASTER<span className="hidden sm:inline"> · Master portfolio</span>
          </span>
          <span className="ml-auto text-gold-soft">USOUSD</span>
        </div>

        {shot ? (
          <Image src={shot} alt="หน้าจอพอร์ตหลัก RIG MASTER (ภาพจริง)" sizes="(min-width: 1024px) 1100px, 100vw" className="h-auto w-full" />
        ) : (
          <div className="relative grid md:grid-cols-[1fr_220px]">
            <div className="p-4 sm:p-6">
              <svg viewBox="0 0 720 320" className="h-auto w-full" aria-hidden>
                <defs>
                  <linearGradient id="dash-fill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#C9A227" stopOpacity=".22" />
                    <stop offset="1" stopColor="#C9A227" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <g stroke="rgb(201 162 39 / .18)" strokeDasharray="2 7">
                  {[50, 95, 140, 185, 230, 275].map((y) => (
                    <line key={y} x1="0" x2="720" y1={y} y2={y} />
                  ))}
                </g>
                <path
                  d="M0 190 C40 178 64 128 104 140 S168 214 206 200 S270 118 308 130 S372 246 412 232 S476 164 516 176 S580 96 620 108 S690 150 720 128 V320 H0Z"
                  fill="url(#dash-fill)"
                />
                <path
                  data-draw
                  d="M0 190 C40 178 64 128 104 140 S168 214 206 200 S270 118 308 130 S372 246 412 232 S476 164 516 176 S580 96 620 108 S690 150 720 128"
                  fill="none"
                  stroke="#DCC16A"
                  strokeWidth="1.5"
                />
                <g fill="#0B0D12" stroke="#C9A227" strokeWidth="1.25">
                  {[
                    [206, 200],
                    [388, 230],
                    [412, 232],
                    [620, 108],
                  ].map(([cx, cy]) => (
                    <circle key={cx} cx={cx} cy={cy} r="4" />
                  ))}
                </g>
              </svg>
            </div>
            <div aria-hidden className="hidden flex-col gap-5 border-l border-line p-6 md:flex">
              {["Balance", "Equity", "Open positions", "Closed today"].map((k, i) => (
                <div key={k} className="flex flex-col gap-2">
                  <span className="text-[0.625rem] tracking-[0.16em] text-muted-foreground uppercase">{k}</span>
                  <span
                    className="h-2 rounded-full bg-[linear-gradient(90deg,var(--line)_0%,var(--line-strong)_50%,var(--line)_100%)] bg-[length:200%_100%] animate-[rm-shimmer_2.6s_linear_infinite]"
                    style={{ width: `${[72, 90, 54, 80][i]}%` }}
                  />
                </div>
              ))}
            </div>
            <span className="absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 rounded-full border border-dashed border-gold/40 bg-deep/85 px-4 py-2 text-[0.75rem] whitespace-nowrap text-gold-soft backdrop-blur-sm">
              <ImageIcon className="size-3.5" strokeWidth={1.5} aria-hidden />
              ใส่ภาพหน้าจอพอร์ตจริงที่นี่
            </span>
          </div>
        )}

        <figcaption className="flex flex-wrap items-center gap-2 border-t border-line px-4 py-3 sm:px-5">
          <span className="rounded-full border border-gold/30 px-3 py-1 text-[0.6875rem] text-gold-soft">
            ผลจริงเริ่มนับ {site.trackStart.short}
          </span>
          {["MT5", "PU Prime", "VPS 24/7"].map((t) => (
            <span key={t} className="rounded-full border border-line-strong px-3 py-1 text-[0.6875rem] tracking-[0.08em] text-ink-2">
              {t}
            </span>
          ))}
        </figcaption>
      </figure>
    </div>
  )
}
