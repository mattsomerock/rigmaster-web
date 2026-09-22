import { LoopVideo } from "@/components/motion/loop-video"
import { ParallaxComponent, type ParallaxLayer } from "@/components/ui/parallax-scrolling"
import { CtaPair } from "@/components/site/cta"
import { Em, SplitHeading } from "@/components/site/typography"
import { asset, site } from "@/lib/site"
import rigPoster from "@/assets/rig-poster.webp"

/*
 * HOOK. One promise, one line of offer, two buttons.
 * Phone: the film fills the screen and the copy sits on the dark water at the bottom.
 * Desktop: the portrait film becomes a panel on the right that dissolves into the page,
 * so it is shown near its native resolution instead of being blown up full-bleed.
 */
const layers: ParallaxLayer[] = [
  {
    id: "film",
    yPercent: 30,
    content: (
      <div className="absolute inset-0 lg:left-auto lg:w-[60%] lg:[mask-image:linear-gradient(to_right,transparent,#000_36%)]">
        <LoopVideo
          src={asset("/media/rig-loop.mp4")}
          poster={rigPoster}
          preload
          sizes="(min-width: 1024px) 60vw, 100vw"
          mediaClassName="object-[50%_20%] lg:object-[50%_62%]"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-[linear-gradient(180deg,rgb(11_13_18/0.7)_0%,rgb(11_13_18/0)_20%,rgb(11_13_18/0.05)_34%,rgb(11_13_18/0.82)_56%,var(--background)_88%)] lg:bg-[linear-gradient(180deg,rgb(11_13_18/0.55)_0%,rgb(11_13_18/0)_24%,rgb(11_13_18/0)_68%,var(--background)_100%)]"
        />
      </div>
    ),
  },
  {
    id: "glow",
    yPercent: 45,
    content: (
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(60%_40%_at_50%_30%,rgb(201_162_39/0.12),transparent_70%)] lg:bg-[radial-gradient(40%_50%_at_62%_45%,rgb(201_162_39/0.12),transparent_70%)]"
      />
    ),
  },
  {
    id: "copy",
    yPercent: 40,
    content: (
      <div className="container-lux flex h-full flex-col justify-end pb-[max(36px,calc(env(safe-area-inset-bottom)+20px))] lg:justify-center lg:pt-(--header-h) lg:pb-0">
        <div className="max-w-[35rem]">
          <p data-hero-in className="t-caps mb-6 flex items-center gap-3 text-gold-soft">
            <span aria-hidden className="h-px w-8 bg-gold/60" />
            Automated Oil Portfolio · USOUSD
          </p>
          <SplitHeading
            as="h1"
            id="hero-title"
            className="t-display text-ink"
            lines={["ให้ระบบเทรดแทนคุณ", "โดยเงินยังอยู่ใน", <Em key="e">บัญชีของคุณเอง</Em>]}
          />
          <p data-hero-in className="t-lead mt-6 max-w-[30rem]">
            ก็อปปี้พอร์ตเทรดน้ำมันอัตโนมัติที่เปิดให้ดูสดทุกไม้
            <span className="block text-ink">เราได้ส่วนแบ่งเฉพาะวันที่คุณมีกำไร</span>
          </p>
          <div data-hero-in id="hero-cta" className="pointer-events-auto mt-8">
            <CtaPair location="hero" />
          </div>
          <p data-hero-in className="mt-5 text-[0.8125rem] text-ink-2/85">
            มีความเสี่ยง{" "}
            <a href="#risk" className="pointer-events-auto underline decoration-line-strong underline-offset-4 hover:text-ink">
              อ่านก่อนตัดสินใจ
            </a>
          </p>
        </div>
      </div>
    ),
  },
]

export function Hero() {
  return (
    <ParallaxComponent
      id="top"
      data-hero=""
      aria-labelledby="hero-title"
      className="h-[max(100svh,640px)] lg:h-[max(100svh,720px)]"
      layers={layers}
      overlay={
        <>
          <div data-hero-veil aria-hidden className="absolute inset-0 bg-background opacity-0" />
          <div
            data-hero-meta
            className="container-lux absolute inset-x-0 bottom-7 hidden items-end justify-between text-[0.6875rem] tracking-[0.22em] text-muted-foreground uppercase lg:flex"
          >
            <span>MT5 · PU Prime · Grid</span>
            <span aria-hidden className="flex flex-col items-center gap-3">
              <span className="h-11 w-px origin-top animate-[rm-cue_2.4s_cubic-bezier(.16,1,.3,1)_infinite] bg-linear-to-b from-gold to-transparent" />
              Scroll
            </span>
            <span>Live since {site.trackStart.iso.split("-").reverse().join(".")}</span>
          </div>
        </>
      }
    />
  )
}
