"use client"

import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"

gsap.registerPlugin(ScrollTrigger, useGSAP)

declare global {
  interface Window {
    __rmMotion?: boolean
  }
}

/**
 * The page has exactly three motion moments; everything else is static so
 * those three read clearly (and the page stays light in LINE's in-app browser):
 *
 *   1. Hero opening     [data-hero] veil, headline lines, [data-hero-in] copy, [data-hero-meta]
 *   2. Into the storm   [data-zoom-out] camera pull-back on the risk film
 *   3. The three steps  [data-plan] rail ([data-plan-progress] desktop, [data-plan-seg] phone) + [data-step] lights
 *
 * The hero parallax itself lives in <ParallaxComponent>.
 */
export function MotionOrchestrator() {
  useGSAP(() => {
    window.__rmMotion = true
    const html = document.documentElement
    const mm = gsap.matchMedia()

    mm.add(
      {
        motion: "(prefers-reduced-motion: no-preference)",
        desktop: "(min-width: 1024px)",
      },
      (ctx) => {
        const { motion, desktop } = ctx.conditions as Record<string, boolean>
        if (!motion) {
          html.classList.remove("js-motion")
          return
        }
        html.classList.add("js-motion")
        const cleanups: Array<() => void> = []
        const q = <T extends Element = HTMLElement>(sel: string) => gsap.utils.toArray<T>(sel)

        /* ---------- 1. Hero opening ---------- */
        gsap
          .timeline({ defaults: { ease: "expo.out" } })
          .to("[data-hero-veil]", { opacity: 0, duration: 1.8, ease: "power2.out" }, 0)
          .from("[data-hero] [data-parallax-layers]", { scale: 1.08, duration: 2.8 }, 0)
          .to("[data-hero] [data-split] .line > span", { y: 0, duration: 1.5, stagger: 0.12 }, 0.3)
          .to("[data-hero-in]", { opacity: 1, y: 0, duration: 1.3, stagger: 0.1 }, 0.75)
          .to("[data-hero-meta]", { opacity: 1, duration: 1.2 }, 1.2)

        // Credits line leaves quickly so it never crosses the sinking copy
        gsap.to("[data-hero-meta] > *", {
          opacity: 0,
          y: -16,
          ease: "none",
          scrollTrigger: { trigger: "[data-hero]", start: "top top", end: "12% top", scrub: true },
        })

        /* ---------- 2. Into the storm ---------- */
        q("[data-zoom-out]").forEach((el) => {
          gsap.fromTo(
            el,
            { scale: 1.28 },
            {
              scale: 1,
              ease: "none",
              scrollTrigger: { trigger: el.parentElement ?? el, start: "top bottom", end: "center center", scrub: true },
            }
          )
        })

        /* ---------- 3. The three steps ---------- */
        q("[data-plan]").forEach((plan) => {
          // Desktop: one horizontal rail. Phone: one segment per gap, each filling
          // as its section passes the same line where the steps light up.
          const bar = plan.querySelector("[data-plan-progress]")
          if (desktop && bar) {
            gsap.fromTo(
              bar,
              { scaleX: 0 },
              { scaleX: 1, ease: "none", scrollTrigger: { trigger: plan, start: "top 72%", end: "bottom 62%", scrub: 0.5 } }
            )
          }
          if (!desktop) {
            plan.querySelectorAll("[data-plan-seg]").forEach((seg) => {
              gsap.fromTo(
                seg,
                { scaleY: 0 },
                { scaleY: 1, ease: "none", scrollTrigger: { trigger: seg, start: "top 70%", end: "bottom 70%", scrub: 0.5 } }
              )
            })
          }
          plan.querySelectorAll("[data-step]").forEach((step) => {
            step.removeAttribute("data-on")
            ScrollTrigger.create({
              trigger: step,
              start: "top 70%",
              onEnter: () => step.setAttribute("data-on", ""),
              onLeaveBack: () => step.removeAttribute("data-on"),
            })
            cleanups.push(() => step.setAttribute("data-on", ""))
          })
        })

        const refresh = () => ScrollTrigger.refresh()
        document.fonts?.ready.then(refresh)
        window.addEventListener("load", refresh)
        cleanups.push(() => window.removeEventListener("load", refresh))

        return () => cleanups.forEach((fn) => fn())
      }
    )
  })

  return null
}
