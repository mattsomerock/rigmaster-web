"use client"

import * as React from "react"

/**
 * True once the hero's own buttons can no longer be seen: scrolled above the
 * viewport, or sunk out of the hero by the parallax and clipped by its overflow.
 * IntersectionObserver reports that clipped state with a positive `top`, which
 * reads like "still below", so the geometry is checked directly on scroll.
 */
export function useHeroCtaGone() {
  const [gone, setGone] = React.useState(false)

  React.useEffect(() => {
    const cta = document.getElementById("hero-cta")
    const hero = document.getElementById("top")
    if (!cta || !hero) return
    let frame = 0
    const check = () => {
      frame = 0
      const c = cta.getBoundingClientRect()
      setGone(c.bottom <= 0 || c.top >= hero.getBoundingClientRect().bottom)
    }
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(check)
    }
    schedule()
    window.addEventListener("scroll", schedule, { passive: true })
    window.addEventListener("resize", schedule)
    return () => {
      window.removeEventListener("scroll", schedule)
      window.removeEventListener("resize", schedule)
      cancelAnimationFrame(frame)
    }
  }, [])

  return gone
}
