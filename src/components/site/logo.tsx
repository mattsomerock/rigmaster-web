import { cn } from "@/lib/utils"

/** Derrick monogram — an "A"-frame read as a rig tower. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden className={cn("size-8", className)}>
      <rect x=".5" y=".5" width="31" height="31" rx="2" fill="none" stroke="rgb(201 162 39 / .38)" />
      <path
        d="M16 5 8.5 27M16 5l7.5 22M11.2 19h9.6M12.6 14h6.8M10.2 23.5h11.6"
        stroke="#C9A227"
        strokeWidth="1.4"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  )
}

export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-3", className)}>
      <LogoMark />
      <span className="text-[0.8125rem] font-medium tracking-[0.32em] text-ink">RIG MASTER</span>
    </span>
  )
}
