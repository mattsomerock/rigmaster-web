"use client"

import * as React from "react"
import Image, { type StaticImageData } from "next/image"

import { cn } from "@/lib/utils"

type NavigatorWithConnection = Navigator & { connection?: { saveData?: boolean } }

/**
 * Muted background loop layered over its own first frame.
 *
 *  - The still (next/image) paints first and is the LCP candidate; the video
 *    fades in only once frames are actually playing, so there is never a flash.
 *  - `preload="none"`: nothing is fetched until play() — reduced-motion and
 *    Save-Data visitors keep the still and download nothing.
 *  - Plays only while near the viewport and the tab is visible (battery / CPU on phones).
 */
export function LoopVideo({
  src,
  poster,
  preload = false,
  sizes = "100vw",
  className,
  mediaClassName,
}: {
  src: string
  poster: StaticImageData
  /** Preload the still — only for the above-the-fold instance. */
  preload?: boolean
  sizes?: string
  className?: string
  /** Applied to both the still and the video (object-position, filters…). */
  mediaClassName?: string
}) {
  const ref = React.useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = React.useState(false)

  React.useEffect(() => {
    const video = ref.current
    if (!video) return
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const saveData = (navigator as NavigatorWithConnection).connection?.saveData
    if (reduce || saveData) return

    // React does not reliably reflect `muted` to the element; autoplay requires it.
    video.muted = true
    video.defaultMuted = true

    // Play only while near the viewport AND the tab is visible. Retry on return,
    // since a play() attempted in a background tab (or before an app switch) stays paused.
    let inView = false
    const sync = () => {
      if (inView && !document.hidden) video.play().catch(() => {})
      else video.pause()
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting
        sync()
      },
      { rootMargin: "200px 0px" }
    )
    io.observe(video)
    document.addEventListener("visibilitychange", sync)
    return () => {
      io.disconnect()
      document.removeEventListener("visibilitychange", sync)
    }
  }, [])

  return (
    <div className={cn("absolute inset-0 overflow-hidden", className)}>
      <Image
        src={poster}
        alt=""
        fill
        preload={preload}
        placeholder="blur"
        sizes={sizes}
        className={cn("object-cover", mediaClassName)}
      />
      <video
        ref={ref}
        aria-hidden
        tabIndex={-1}
        muted
        loop
        playsInline
        disablePictureInPicture
        preload="none"
        onPlaying={() => setPlaying(true)}
        className={cn(
          "absolute inset-0 size-full object-cover opacity-0 transition-opacity duration-[1400ms] ease-out",
          playing && "opacity-100",
          mediaClassName
        )}
      >
        <source src={src} type="video/mp4" />
      </video>
    </div>
  )
}
