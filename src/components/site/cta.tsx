import { ArrowRight, ChartNoAxesColumn } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { isExternal, site } from "@/lib/site"

/**
 * The page has exactly TWO button types (StoryBrand rule):
 *   PrimaryCta   — "เริ่มต้น 3 ขั้นตอน" → LINE OA. Wording must never change.
 *   SecondaryCta — "ดูผลเทรดสด"       → live results.
 * Do not add a third.
 */
export const PRIMARY_LABEL = "เริ่มต้น 3 ขั้นตอน"
export const SECONDARY_LABEL = "ดูผลเทรดสด"

type CtaProps = {
  /** Where on the page the button sits — sent with the click event. */
  location: string
  className?: string
  size?: "xl" | "md"
  magnetic?: boolean
  tabIndex?: number
}

export function PrimaryCta({ location, className, size = "xl", magnetic = true, tabIndex }: CtaProps) {
  return (
    <Button asChild variant="cta" size={size} className={className}>
      <a
        href={site.links.line}
        data-track="cta_primary"
        data-loc={location}
        data-magnetic={magnetic ? "" : undefined}
        tabIndex={tabIndex}
      >
        <span aria-hidden className="relative size-2 shrink-0 rounded-full bg-white">
          <span className="absolute -inset-1.5 animate-[rm-ping_2.2s_cubic-bezier(.16,1,.3,1)_infinite] rounded-full border border-white/70" />
        </span>
        {PRIMARY_LABEL}
        <ArrowRight strokeWidth={1.5} className="transition-transform duration-500 ease-out-expo group-hover/button:translate-x-1" />
      </a>
    </Button>
  )
}

export function SecondaryCta({ location, className, size = "xl", magnetic = true }: CtaProps) {
  const href = site.links.live
  const external = isExternal(href)
  return (
    <Button asChild variant="line" size={size} className={className}>
      <a
        href={href}
        data-track="cta_secondary"
        data-loc={location}
        data-magnetic={magnetic ? "" : undefined}
        {...(external ? { target: "_blank", rel: "noopener" } : {})}
      >
        <ChartNoAxesColumn strokeWidth={1.5} />
        {SECONDARY_LABEL}
      </a>
    </Button>
  )
}

export function CtaPair({ location, className }: { location: string; className?: string }) {
  return (
    <div className={cn("flex flex-col gap-3 sm:flex-row sm:items-center", className)}>
      <PrimaryCta location={location} className="w-full sm:w-auto" />
      <SecondaryCta location={location} className="w-full sm:w-auto" />
    </div>
  )
}
