"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

type Drop = { x: number; y: number; l: number; s: number; a: number }

/**
 * Fine diagonal rain on a canvas. Renders nothing under reduced motion,
 * pauses when off-screen or when the tab is hidden, caps DPR at 1.5.
 */
export function Rain({ className }: { className?: string }) {
  const ref = React.useRef<HTMLCanvasElement>(null)

  React.useEffect(() => {
    const cv = ref.current
    if (!cv || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const ctx = cv.getContext("2d")
    if (!ctx) return

    const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
    let w = 0
    let h = 0
    let drops: Drop[] = []
    let visible = false
    let raf = 0

    const resize = () => {
      w = cv.clientWidth
      h = cv.clientHeight
      cv.width = w * dpr
      cv.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const n = w < 768 ? 60 : 130
      drops = Array.from({ length: n }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        l: 10 + Math.random() * 24,
        s: 9 + Math.random() * 10,
        a: 0.04 + Math.random() * 0.16,
      }))
    }

    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      ctx.lineWidth = 1
      for (const d of drops) {
        ctx.strokeStyle = `rgba(226,210,160,${d.a})`
        ctx.beginPath()
        ctx.moveTo(d.x, d.y)
        ctx.lineTo(d.x - d.l * 0.16, d.y + d.l)
        ctx.stroke()
        d.y += d.s
        d.x -= d.s * 0.16
        if (d.y > h) {
          d.y = -d.l
          d.x = Math.random() * w * 1.1
        }
      }
      raf = requestAnimationFrame(draw)
    }
    const start = () => {
      if (!raf && visible && !document.hidden) raf = requestAnimationFrame(draw)
    }
    const stop = () => {
      cancelAnimationFrame(raf)
      raf = 0
    }

    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(cv)
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting
      if (visible) start()
      else stop()
    })
    io.observe(cv)
    const onVis = () => (document.hidden ? stop() : start())
    document.addEventListener("visibilitychange", onVis)

    return () => {
      stop()
      ro.disconnect()
      io.disconnect()
      document.removeEventListener("visibilitychange", onVis)
    }
  }, [])

  return <canvas ref={ref} aria-hidden className={cn("pointer-events-none size-full", className)} />
}
