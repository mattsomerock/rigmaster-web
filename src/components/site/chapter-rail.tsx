"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

export const CHAPTERS = [
  { id: "top", label: "เริ่ม" },
  { id: "story", label: "เรื่องจริง" },
  { id: "offer", label: "ข้อเสนอ" },
  { id: "risk", label: "ความเสี่ยง" },
  { id: "faq", label: "รายละเอียด" },
] as const

/** Desktop-only in-page position indicator (not a navigation menu — no exits). */
export function ChapterRail() {
  const [active, setActive] = React.useState<string>("top")

  React.useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id)
      },
      { rootMargin: "-45% 0px -50% 0px" }
    )
    CHAPTERS.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) io.observe(el)
    })
    return () => io.disconnect()
  }, [])

  return (
    <nav aria-label="ตำแหน่งในหน้า" className="group/rail fixed top-1/2 right-6 z-30 hidden -translate-y-1/2 xl:block">
      <ol className="flex flex-col gap-1">
        {CHAPTERS.map(({ id, label }) => {
          const on = active === id
          return (
            <li key={id}>
              <a
                href={`#${id}`}
                aria-current={on ? "location" : undefined}
                className={cn(
                  "flex min-h-7 items-center justify-end gap-3 text-[0.75rem] text-muted-foreground transition-colors",
                  on && "text-gold-soft"
                )}
              >
                <span
                  className={cn(
                    "translate-x-2 opacity-0 transition-all duration-500 ease-out-expo group-hover/rail:translate-x-0 group-hover/rail:opacity-100",
                    on && "translate-x-0 opacity-100"
                  )}
                >
                  {label}
                </span>
                <i
                  className={cn(
                    "block h-px w-3 bg-muted-foreground/60 transition-all duration-500 ease-out-expo",
                    on && "w-7 bg-gold"
                  )}
                />
              </a>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
