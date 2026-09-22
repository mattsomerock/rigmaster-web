"use client"

import * as React from "react"

import { track } from "@/lib/track"

/**
 * Funnel instrumentation (GTM dataLayer):
 *   lp_view → scroll_depth (25/50/75/100) → reach_risk_section → cta_primary (with location) → LINE friend
 * Clicks are captured by delegation from any element carrying data-track.
 */
let viewTracked = false
const DEPTHS = [25, 50, 75, 100]

export function Analytics() {
  React.useEffect(() => {
    if (!viewTracked) {
      viewTracked = true
      track("lp_view")
    }

    const onClick = (e: MouseEvent) => {
      const el = (e.target as Element | null)?.closest<HTMLElement>("[data-track]")
      if (el) track(el.dataset.track!, { location: el.dataset.loc ?? "" })
    }
    document.addEventListener("click", onClick)

    const risk = document.getElementById("risk")
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          track("reach_risk_section")
          io.disconnect()
        }
      },
      { threshold: 0.15 }
    )
    if (risk) io.observe(risk)

    // Where do people stop reading? Each threshold fires once per page view.
    const sent = new Set<number>()
    let frame = 0
    const measure = () => {
      frame = 0
      const el = document.documentElement
      const pct = ((window.scrollY + window.innerHeight) / el.scrollHeight) * 100
      for (const d of DEPTHS) {
        if (pct >= d - 1 && !sent.has(d)) {
          sent.add(d)
          track("scroll_depth", { percent: d })
        }
      }
      if (sent.size === DEPTHS.length) window.removeEventListener("scroll", onScroll)
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(measure)
    }
    window.addEventListener("scroll", onScroll, { passive: true })

    return () => {
      document.removeEventListener("click", onClick)
      window.removeEventListener("scroll", onScroll)
      cancelAnimationFrame(frame)
      io.disconnect()
    }
  }, [])

  return null
}
