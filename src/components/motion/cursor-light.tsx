"use client"

import * as React from "react"

/**
 * Desktop only: a soft pool of gold light that trails the pointer, like a torch
 * at night. It is additive (screen blend), so it lifts the text under it for
 * reading and never darkens the rest of the page. Off for touch, coarse
 * pointers and reduced motion; nothing runs on phones.
 */
export function CursorLight() {
  const ref = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const el = ref.current
    const ok = window.matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)")
    if (!el || !ok.matches) return
    el.hidden = false

    let tx = 0
    let ty = 0
    let x = 0
    let y = 0
    let frame = 0
    let seen = false

    // Eases toward the pointer (the slight lag reads as a hand-held beam), then stops.
    const render = () => {
      x += (tx - x) * 0.18
      y += (ty - y) * 0.18
      el.style.transform = `translate3d(${x}px, ${y}px, 0)`
      frame = Math.abs(tx - x) + Math.abs(ty - y) > 0.5 ? requestAnimationFrame(render) : 0
    }
    const move = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return
      tx = e.clientX
      ty = e.clientY
      if (!seen) {
        seen = true
        x = tx
        y = ty
        el.style.opacity = "1"
      }
      if (!frame) frame = requestAnimationFrame(render)
    }
    const hide = () => {
      seen = false
      el.style.opacity = "0"
    }

    window.addEventListener("pointermove", move, { passive: true })
    document.documentElement.addEventListener("pointerleave", hide)
    window.addEventListener("blur", hide)
    return () => {
      window.removeEventListener("pointermove", move)
      document.documentElement.removeEventListener("pointerleave", hide)
      window.removeEventListener("blur", hide)
      cancelAnimationFrame(frame)
      el.hidden = true
    }
  }, [])

  return (
    <div
      ref={ref}
      hidden
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-30 -mt-[320px] -ml-[320px] size-[640px] rounded-full bg-[radial-gradient(closest-side,rgb(232_205_120/0.26),rgb(220_193_106/0.12)_32%,rgb(201_162_39/0.04)_62%,transparent)] opacity-0 mix-blend-screen transition-opacity duration-700 will-change-transform"
    />
  )
}
