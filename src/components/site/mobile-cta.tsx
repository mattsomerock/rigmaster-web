"use client"

import * as React from "react"

import { PrimaryCta } from "@/components/site/cta"
import { useHeroCtaGone } from "@/components/site/use-hero-cta-gone"
import { cn } from "@/lib/utils"

/**
 * Phones/tablets: the primary CTA stays pinned to the bottom edge for the whole
 * page once the hero's own button is out of sight (brief: always one tap away).
 * It steps aside while an in-page primary CTA (offer, close) is on screen, so the same button never shows twice.
 */
const IN_PAGE_CTAS = ["offer-cta", "final-cta"]

export function MobileCta() {
  const heroGone = useHeroCtaGone()
  const [inPageVisible, setInPageVisible] = React.useState(false)

  React.useEffect(() => {
    const visible = new Set<Element>()
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) visible.add(e.target)
          else visible.delete(e.target)
        }
        setInPageVisible(visible.size > 0)
      },
      // Ignore the strip the bar itself covers, so a button hidden under it still counts as off-screen.
      { rootMargin: "0px 0px -12% 0px" }
    )
    for (const id of IN_PAGE_CTAS) {
      const el = document.getElementById(id)?.querySelector('[data-track="cta_primary"]')
      if (el) io.observe(el)
    }
    return () => io.disconnect()
  }, [])

  const show = heroGone && !inPageVisible

  return (
    <div
      aria-hidden={!show}
      inert={!show}
      className={cn(
        "fixed inset-x-0 bottom-0 z-50 px-4 pt-6 pb-[calc(12px+env(safe-area-inset-bottom))] lg:hidden",
        "bg-linear-to-t from-deep via-deep/95 to-transparent",
        "translate-y-full transition-transform duration-700 ease-out-expo",
        show && "translate-y-0"
      )}
    >
      <PrimaryCta location="sticky_mobile" className="w-full" />
    </div>
  )
}
