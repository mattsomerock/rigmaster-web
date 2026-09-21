"use client"

import * as React from "react"

import { track } from "@/lib/track"

/**
 * Funnel instrumentation (GTM dataLayer):
 *   lp_view → reach_risk_section → cta_primary (with location) → LINE friend
 * Clicks are captured by delegation from any element carrying data-track.
 */
let viewTracked = false

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

    return () => {
      document.removeEventListener("click", onClick)
      io.disconnect()
    }
  }, [])

  return null
}
