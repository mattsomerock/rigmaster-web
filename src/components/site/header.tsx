"use client"

import * as React from "react"

import { SecondaryCta } from "@/components/site/cta"
import { Wordmark } from "@/components/site/logo"
import { cn } from "@/lib/utils"

/**
 * No navigation menu by design (every exit link is a lost lead).
 * Brand mark + the transitional CTA only. Hides on scroll-down, returns on scroll-up.
 */
export function SiteHeader() {
  const [scrolled, setScrolled] = React.useState(false)
  const [hidden, setHidden] = React.useState(false)
  const bar = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    let last = window.scrollY
    let ticking = false
    const update = () => {
      const y = window.scrollY
      const max = document.documentElement.scrollHeight - window.innerHeight
      if (bar.current) bar.current.style.transform = `scaleX(${max > 0 ? y / max : 0})`
      setScrolled(y > 24)
      setHidden(y > last && y > window.innerHeight * 0.9)
      last = y
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
          "fixed inset-x-0 top-0 z-40 transition-[transform,background-color,border-color] duration-700 ease-out-expo",
          "border-b border-transparent",
          scrolled && "border-line bg-background/65 backdrop-blur-xl backdrop-saturate-150",
          hidden && "-translate-y-full"
        )}
      >
        <div className="container-lux flex h-(--header-h) items-center justify-between gap-4">
          <a href="#top" aria-label="RIG MASTER — กลับด้านบน" className="rounded-(--radius)">
            <Wordmark />
          </a>
          <SecondaryCta location="header" size="md" magnetic={false} className="hidden sm:inline-flex" />
        </div>
      </header>
    </>
  )
}
