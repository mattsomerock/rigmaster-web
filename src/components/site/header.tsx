"use client"

import * as React from "react"

import { PrimaryCta, SecondaryCta } from "@/components/site/cta"
import { Wordmark } from "@/components/site/logo"
import { useHeroCtaGone } from "@/components/site/use-hero-cta-gone"
import { cn } from "@/lib/utils"

/**
 * No navigation menu by design (every exit link is a lost lead).
 * Always on screen so the primary action is one click away on desktop; it joins
 * the bar once the hero's own button has scrolled out of view. (Phones use <MobileCta>.)
 */
export function SiteHeader() {
  const [scrolled, setScrolled] = React.useState(false)
  const pastHero = useHeroCtaGone()
  const bar = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    let ticking = false
    const update = () => {
      const y = window.scrollY
      const max = document.documentElement.scrollHeight - window.innerHeight
      if (bar.current) bar.current.style.transform = `scaleX(${max > 0 ? y / max : 0})`
      setScrolled(y > 24)
      ticking = false
    }
    const onScroll = () => {
      if (!ticking) {
        ticking = true
        requestAnimationFrame(update)
      }
    }
    update()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <>
      <div
        ref={bar}
        aria-hidden
        className="fixed inset-x-0 top-0 z-50 h-px origin-left scale-x-0 bg-linear-to-r from-gold to-gold-soft"
      />
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-40 transition-[background-color,border-color] duration-700 ease-out-expo",
          "border-b border-transparent",
          scrolled && "border-line bg-background/80 backdrop-blur-xl backdrop-saturate-150"
        )}
      >
        <div className="container-lux flex h-(--header-h) items-center justify-between gap-4">
          <a href="#top" aria-label="RIG MASTER — กลับด้านบน" className="rounded-(--radius)">
            <Wordmark />
          </a>
          <div className="flex items-center gap-3">
            <SecondaryCta location="header" size="md" className="hidden sm:inline-flex" />
            <div className={cn("hidden", pastHero && "lg:block lg:animate-in lg:fade-in lg:duration-500")}>
              <PrimaryCta location="header" size="md" />
            </div>
          </div>
        </div>
      </header>
    </>
  )
}
