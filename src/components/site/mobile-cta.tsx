"use client"

import * as React from "react"

import { PrimaryCta } from "@/components/site/cta"
import { cn } from "@/lib/utils"

/**
 * Mobile: the primary CTA stays pinned to the bottom edge once the hero CTA
 * has scrolled away. It steps aside while the closing CTA is on screen.
 */
export function MobileCta() {
  const [show, setShow] = React.useState(false)

  React.useEffect(() => {
    const hero = document.getElementById("hero-cta")
    const final = document.getElementById("final-cta")
    if (!hero || !final) return
    let heroVisible = true
    let finalVisible = false
    const sync = () => setShow(!heroVisible && !finalVisible)
    const heroIO = new IntersectionObserver(([e]) => {
      heroVisible = e.isIntersecting || e.boundingClientRect.top > 0
      sync()
    })
    const finalIO = new IntersectionObserver(
      ([e]) => {
        finalVisible = e.isIntersecting
        sync()
      },
      { rootMargin: "0px 0px -8% 0px" }
    )
    heroIO.observe(hero)
    finalIO.observe(final)
    return () => {
      heroIO.disconnect()
      finalIO.disconnect()
    }
  }, [])

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
      <PrimaryCta location="sticky_mobile" magnetic={false} className="w-full" />
    </div>
  )
}
