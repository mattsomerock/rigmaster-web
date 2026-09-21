import Image from "next/image"

import { ParallaxComponent, type ParallaxLayer } from "@/components/ui/parallax-scrolling"
import { Rain } from "@/components/motion/rain"
import { CtaPair } from "@/components/site/cta"
import { Em, SplitHeading } from "@/components/site/typography"
import { site } from "@/lib/site"
import rig from "@/assets/rig.webp"

/* Both image layers share identical geometry so they line up perfectly at rest;
   only their scroll speed differs — that difference is the depth. */
const RIG_POSITION = "object-[50%_78%] lg:object-[50%_86%]"

const layers: ParallaxLayer[] = [
  {
    id: "rig",
    yPercent: 70,
    content: (
      <>
        <Image
          src={rig}
          alt=""
          fill
          preload
          placeholder="blur"
          sizes="100vw"
          className={`object-cover ${RIG_POSITION}`}
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(70%_55%_at_50%_38%,rgb(11_13_18/0.86)_0%,rgb(11_13_18/0.55)_55%,rgb(11_13_18/0.25)_100%)]"
        />
        <div aria-hidden className="absolute inset-x-0 top-0 h-2/5 bg-linear-to-b from-background/90 to-transparent" />
      </>
    ),
  },
  {
    id: "atmosphere",
    yPercent: 55,
    content: (
      <>
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(45%_35%_at_50%_62%,rgb(201_162_39/0.16),transparent_70%)]"
        />
        <Rain className="absolute inset-0 opacity-60" />
      </>
    ),
  },
  {
    id: "copy",
    yPercent: 40,
    className: "flex items-start justify-center",
    content: (
      <div className="container-lux flex flex-col items-center pt-[calc(var(--header-h)+clamp(16px,4vh,40px))] text-center lg:pt-[calc(var(--header-h)+clamp(20px,6vh,80px))]">
        <p data-hero-in className="t-caps mb-7 flex items-center gap-3 text-gold-soft">
          <span aria-hidden className="hidden h-px w-8 bg-gold/60 sm:block" />
          <span>
            Automated Oil Portfolio<span className="hidden sm:inline"> · USOUSD</span>
          </span>
          <span aria-hidden className="hidden h-px w-8 bg-gold/60 sm:block" />
        </p>
        <SplitHeading
          as="h1"
          id="hero-title"
          className="t-display max-w-[15ch] text-ink"
          lines={["ให้ระบบเทรดแทนคุณ", "โดยเงินยังอยู่ใน", <Em key="e">บัญชีของคุณเอง</Em>]}
        />
        <p data-hero-in className="t-lead mt-7 max-w-[36rem]">
          RIG MASTER เปิดพอร์ตเทรดน้ำมันอัตโนมัติของเรา ให้คุณดูทุกไม้<span className="whitespace-nowrap">แบบเรียลไทม์</span>{" "}
          แล้วให้คุณก็อปปี้ตาม{" "}
          <span className="text-ink">เราได้ส่วนแบ่งเฉพาะตอนที่คุณมีกำไรเท่านั้น ถ้าคุณไม่ได้ เราก็ไม่ได้</span>
        </p>
        <div data-hero-in id="hero-cta" className="mt-10 w-full sm:w-auto">
          <CtaPair location="hero" className="justify-center" />
        </div>
        <div data-hero-in className="mt-6 text-[0.8125rem] leading-relaxed text-muted-foreground">
          <p className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-ink-2">
            <span>ไม่มีค่าสมัคร</span>
            <span aria-hidden className="size-0.5 rounded-full bg-gold" />
            <span>ไม่มีสัญญาผูกมัด</span>
            <span aria-hidden className="size-0.5 rounded-full bg-gold" />
            <span>หยุดได้ทุกเมื่อ</span>
          </p>
          <p className="mt-1 text-ink-2/85">
            มีความเสี่ยง{" "}
            <a href="#risk" className="pointer-events-auto underline decoration-line-strong underline-offset-4 hover:text-ink">
              โปรดอ่านข้อมูลก่อนตัดสินใจ
            </a>
          </p>
        </div>
      </div>
    ),
  },
  {
    id: "sea",
    yPercent: 10,
    className: "pointer-events-none",
    content: (
      <>
        <Image
          src={rig}
          alt=""
          fill
          sizes="100vw"
          className={`object-cover ${RIG_POSITION} [mask-image:linear-gradient(to_bottom,transparent_84%,#000_97%)] lg:[mask-image:linear-gradient(to_bottom,transparent_78%,#000_94%)]`}
        />
        <div aria-hidden className="absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-b from-transparent to-background/70" />
      </>
    ),
  },
]

export function Hero() {
  return (
    <ParallaxComponent
      id="top"
      data-hero=""
      aria-labelledby="hero-title"
      className="h-[max(100svh,860px)] lg:h-[max(100svh,720px)]"
      layers={layers}
      overlay={
        <>
          <div data-hero-veil aria-hidden className="absolute inset-0 bg-background opacity-0" />
          <div
            data-hero-meta
            className="container-lux absolute inset-x-0 bottom-7 hidden items-end justify-between text-[0.6875rem] tracking-[0.22em] text-muted-foreground uppercase md:flex"
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
