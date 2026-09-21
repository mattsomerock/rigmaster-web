"use client"

import * as React from "react"
import Lenis from "lenis"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const LenisContext = React.createContext<React.RefObject<Lenis | null> | null>(null)

/** Access the app-wide Lenis instance (null under reduced motion). */
export function useLenis() {
  return React.useContext(LenisContext)?.current ?? null
}

/**
 * One Lenis instance for the whole app, driven by GSAP's ticker so that
 * ScrollTrigger and smooth scrolling stay frame-synchronised.
 * Skipped entirely for users who prefer reduced motion.
 * Also upgrades in-page anchor links (#id) to smooth, focus-safe scrolling.
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = React.useRef<Lenis | null>(null)

  React.useEffect(() => {
    let raf: ((time: number) => void) | null = null

    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const lenis = new Lenis({
        duration: 1.15,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      })
      raf = (time: number) => lenis.raf(time * 1000)
      lenis.on("scroll", ScrollTrigger.update)
      gsap.ticker.add(raf)
      gsap.ticker.lagSmoothing(0)
      lenisRef.current = lenis
    }

    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey) return
      const a = (e.target as Element | null)?.closest<HTMLAnchorElement>('a[href^="#"]')
      const hash = a?.getAttribute("href")
      if (!a || !hash || hash.length < 2) return
      const target = document.getElementById(decodeURIComponent(hash.slice(1)))
      if (!target) return
      e.preventDefault()
      const lenis = lenisRef.current
      if (lenis) lenis.scrollTo(target, { offset: -16, duration: 1.4 })
      else target.scrollIntoView({ behavior: "auto", block: "start" })
      if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1")
      target.focus({ preventScroll: true })
      history.replaceState(null, "", hash)
    }
    document.addEventListener("click", onClick)

    return () => {
      document.removeEventListener("click", onClick)
      if (raf) gsap.ticker.remove(raf)
      lenisRef.current?.destroy()
      lenisRef.current = null
    }
  }, [])

  return <LenisContext.Provider value={lenisRef}>{children}</LenisContext.Provider>
}
