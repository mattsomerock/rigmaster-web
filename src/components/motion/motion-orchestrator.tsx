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
 * Attaches all scroll choreography to server-rendered markup via data-attributes,
 * so sections stay Server Components and ship no JS of their own.
 *
 *   data-split            heading whose `.line > span` children rise into view
 *   data-reveal           fades/lifts in (batched)
 *   data-count="307"      counts up once
 *   data-scrub + data-w   words brighten as you scroll
 *   data-stack-card       sticky card that recedes as the next one arrives
 *   data-tilt-in          3D panel that flattens as it enters
 *   data-draw             SVG stroke draws once
 *   data-clip-in          image unmasks with scroll
 *   data-widen            section grows from inset to full-bleed
 *   data-plan …           progress rail + steps
 *   data-hazard           stripe drift
 *   data-zoom-out         background scales down as its section arrives
 *   data-magnetic         pointer-follow (fine pointers only)
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
        fine: "(hover: hover) and (pointer: fine)",
      },
      (ctx) => {
        const { motion, desktop, fine } = ctx.conditions as Record<string, boolean>
        if (!motion) {
          html.classList.remove("js-motion")
          return
        }
        html.classList.add("js-motion")
        const cleanups: Array<() => void> = []
        const q = <T extends Element = HTMLElement>(sel: string) => gsap.utils.toArray<T>(sel)

        /* ---------- Hero intro ---------- */
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

        /* ---------- Headings ---------- */
        q("[data-split]").forEach((h) => {
          if (h.closest("[data-hero]")) return
          gsap.to(h.querySelectorAll(".line > span"), {
            y: 0,
            duration: 1.35,
            stagger: 0.1,
            ease: "expo.out",
            scrollTrigger: { trigger: h, start: "top 88%", once: true },
          })
        })

        /* ---------- Generic reveals ---------- */
        ScrollTrigger.batch("[data-reveal]", {
          start: "top 90%",
          once: true,
          onEnter: (els) =>
            gsap.to(els, { opacity: 1, y: 0, duration: 1.15, ease: "expo.out", stagger: 0.08, overwrite: true }),
        })

        /* ---------- Counters ---------- */
        q("[data-count]").forEach((el) => {
          const end = Number(el.dataset.count)
          const o = { v: 0 }
          el.textContent = "0"
          ScrollTrigger.create({
            trigger: el,
            start: "top 92%",
            once: true,
            onEnter: () =>
              gsap.to(o, {
                v: end,
                duration: 2.2,
                ease: "expo.out",
                delay: 0.1,
                onUpdate: () => {
                  el.textContent = String(Math.round(o.v))
                },
              }),
          })
          cleanups.push(() => {
            el.textContent = String(end)
          })
        })

        /* ---------- Scrubbed words ---------- */
        q("[data-scrub]").forEach((block) => {
          gsap.fromTo(
            block.querySelectorAll("[data-w]"),
            { opacity: 0.14 },
            {
              opacity: 1,
              stagger: 0.4,
              ease: "none",
              scrollTrigger: { trigger: block, start: "top 82%", end: "bottom 52%", scrub: 0.6 },
            }
          )
        })

        /* ---------- Stacked cards ---------- */
        const cards = q("[data-stack-card]")
        cards.forEach((card, i) => {
          const next = cards[i + 1]
          if (!next) return
          const st = { trigger: next, start: "top bottom", end: "top 28%", scrub: true }
          gsap.to(card, { scale: 0.94 - (cards.length - i - 2) * 0.025, ease: "none", scrollTrigger: st })
          const shade = card.querySelector("[data-stack-shade]")
          if (shade) gsap.to(shade, { opacity: 0.62, ease: "none", scrollTrigger: st })
        })

        /* ---------- 3D panel ---------- */
        q("[data-tilt-in]").forEach((el) => {
          gsap.fromTo(
            el,
            { rotateX: desktop ? 24 : 12, scale: 0.9, yPercent: 4 },
            {
              rotateX: 0,
              scale: 1,
              yPercent: 0,
              ease: "none",
              scrollTrigger: { trigger: el, start: "top 96%", end: "top 28%", scrub: 0.6 },
            }
          )
        })
        q<SVGPathElement>("[data-draw]").forEach((path) => {
          const len = path.getTotalLength()
          gsap.fromTo(
            path,
            { strokeDasharray: len, strokeDashoffset: len },
            {
              strokeDashoffset: 0,
              duration: 2.6,
              ease: "power2.inOut",
              scrollTrigger: { trigger: path, start: "top 85%", once: true },
            }
          )
        })

        /* ---------- Clip reveals ---------- */
        q("[data-clip-in]").forEach((el) => {
          gsap.fromTo(
            el,
            { clipPath: "inset(14% 14% 14% 14%)" },
            {
              clipPath: "inset(0% 0% 0% 0%)",
              ease: "none",
              scrollTrigger: { trigger: el, start: "top 92%", end: "top 38%", scrub: 0.5 },
            }
          )
        })
        q("[data-widen]").forEach((el) => {
          const x = desktop ? 3 : 2.5
          gsap.fromTo(
            el,
            { clipPath: `inset(0% ${x}% 0% ${x}% round 14px)` },
            {
              clipPath: "inset(0% 0% 0% 0% round 0px)",
              ease: "none",
              scrollTrigger: { trigger: el, start: "top bottom", end: "top 18%", scrub: true },
            }
          )
        })

        /* ---------- Plan rail ---------- */
        q("[data-plan]").forEach((plan) => {
          const bar = plan.querySelector("[data-plan-progress]")
          if (bar) {
            gsap.fromTo(
              bar,
              desktop ? { scaleX: 0, scaleY: 1 } : { scaleY: 0, scaleX: 1 },
              {
                ...(desktop ? { scaleX: 1 } : { scaleY: 1 }),
                ease: "none",
                scrollTrigger: { trigger: plan, start: "top 72%", end: "bottom 62%", scrub: 0.5 },
              }
            )
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

        /* ---------- Risk section ---------- */
        q("[data-hazard]").forEach((el) => {
          gsap.to(el, {
            xPercent: -25,
            ease: "none",
            scrollTrigger: { trigger: el, start: "top bottom", end: "+=2400", scrub: true },
          })
        })
        q("[data-slide-in]").forEach((el) => {
          gsap.from(el, {
            opacity: 0,
            x: -36,
            duration: 1.4,
            ease: "expo.out",
            scrollTrigger: { trigger: el, start: "top 86%", once: true },
          })
        })

        /* ---------- Final arrival ---------- */
        q("[data-zoom-out]").forEach((el) => {
          gsap.fromTo(
            el,
            { scale: 1.28 },
            {
              scale: 1,
              ease: "none",
              scrollTrigger: {
                trigger: el.closest("section") ?? el,
                start: "top bottom",
                end: "center center",
                scrub: true,
              },
            }
          )
        })

        /* ---------- Magnetic CTAs ---------- */
        if (fine && desktop) {
          q("[data-magnetic]").forEach((btn) => {
            const xTo = gsap.quickTo(btn, "x", { duration: 0.6, ease: "power3" })
            const yTo = gsap.quickTo(btn, "y", { duration: 0.6, ease: "power3" })
            const move = (e: PointerEvent) => {
              const r = btn.getBoundingClientRect()
              xTo((e.clientX - r.left - r.width / 2) * 0.2)
              yTo((e.clientY - r.top - r.height / 2) * 0.32)
            }
            const leave = () => {
              xTo(0)
              yTo(0)
            }
            btn.addEventListener("pointermove", move)
            btn.addEventListener("pointerleave", leave)
            cleanups.push(() => {
              btn.removeEventListener("pointermove", move)
              btn.removeEventListener("pointerleave", leave)
            })
          })
        }

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
