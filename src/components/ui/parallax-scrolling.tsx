"use client"

/**
 * Layered scroll parallax — adapted from Osmo's "Parallax" resource
 * (https://www.osmo.supply/) for production use:
 *
 *  - Layers are passed in as props instead of hard-coded demo images.
 *  - GSAP work is scoped with `useGSAP`, so unmount only reverts THIS
 *    component's tweens/ScrollTriggers (the original killed every trigger
 *    on the page).
 *  - Smooth scrolling (Lenis) is NOT created here. It lives once, app-wide,
 *    in <SmoothScroll>, so several parallax sections can coexist.
 *  - Honors `prefers-reduced-motion`: layers stay put.
 */

import * as React from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"

import { cn } from "@/lib/utils"

gsap.registerPlugin(ScrollTrigger, useGSAP)

export interface ParallaxLayer {
  /** Stable key for React. */
  id: string
  /**
   * Distance the layer travels (in % of its own height) while the header
   * scrolls out of view. Bigger number = moves with the page less = feels
   * further away. Osmo defaults: 70 / 55 / 40 / 10 (back → front).
   */
  yPercent: number
  content: React.ReactNode
  className?: string
}

export interface ParallaxComponentProps
  extends Omit<React.ComponentProps<"section">, "children"> {
  /** Back-to-front. Later layers paint on top of earlier ones. */
  layers: ParallaxLayer[]
  /** Optional content rendered after the parallax header. */
  children?: React.ReactNode
  /** Static (non-parallax) UI painted above all layers and the fade. */
  overlay?: React.ReactNode
  /** Gradient that blends the header into the page background. */
  fade?: boolean
  wrapperClassName?: string
}

export function ParallaxComponent({
  layers,
  children,
  overlay,
  fade = true,
  className,
  wrapperClassName,
  ...sectionProps
}: ParallaxComponentProps) {
  const root = React.useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const trigger = root.current?.querySelector<HTMLElement>(
          "[data-parallax-layers]"
        )
        if (!trigger) return

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger,
            start: "0% 0%",
            end: "100% 0%",
            scrub: 0,
          },
        })

        trigger
          .querySelectorAll<HTMLElement>("[data-parallax-layer]")
          .forEach((el, i) => {
            tl.to(
              el,
              { yPercent: Number(el.dataset.parallaxY), ease: "none" },
              i === 0 ? 0 : "<"
            )
          })
      })
    },
    { scope: root }
  )

  return (
    <div ref={root} className={cn("relative", wrapperClassName)}>
      <section
        className={cn("relative isolate overflow-hidden", className)}
        {...sectionProps}
      >
        <div data-parallax-layers className="absolute inset-0">
          {layers.map((layer, i) => (
            <div
              key={layer.id}
              data-parallax-layer={i + 1}
              data-parallax-y={layer.yPercent}
              className={cn(
                "absolute inset-0 will-change-transform",
                layer.className
              )}
            >
              {layer.content}
            </div>
          ))}
        </div>
        {fade && (
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-[22%] bg-linear-to-b from-transparent to-background"
          />
        )}
        {overlay && <div className="pointer-events-none absolute inset-0 z-20">{overlay}</div>}
      </section>
      {children}
    </div>
  )
}
