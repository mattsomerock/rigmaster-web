import * as React from "react"

import { cn } from "@/lib/utils"

/** Editorial section index: serif italic number · hairline · Thai label. */
export function SectionLabel({ index, children, className }: { index: string; children: React.ReactNode; className?: string }) {
  return (
    <p className={cn("flex items-center gap-4 text-[0.8125rem] leading-none text-muted-foreground", className)}>
      <span className="t-num text-xl italic text-gold-soft">{index}</span>
      <span aria-hidden className="h-px w-10 bg-line-strong" />
      <span>{children}</span>
    </p>
  )
}

type HeadingTag = "h1" | "h2" | "h3"

/**
 * Heading split into masked lines for the rise-in reveal.
 * Each entry of `lines` is one visual line; use <Em> for the gold accent.
 */
export function SplitHeading({
  as: Tag = "h2",
  lines,
  className,
  id,
}: {
  as?: HeadingTag
  lines: React.ReactNode[]
  className?: string
  id?: string
}) {
  return (
    <Tag id={id} data-split className={cn("t-h2", className)}>
      {lines.map((line, i) => (
        <span key={i} className="line">
          <span>{line}</span>
        </span>
      ))}
    </Tag>
  )
}

export function Em({ children }: { children: React.ReactNode }) {
  return <em className="text-gold-soft not-italic">{children}</em>
}

/** Visible slot for content the owner must supply (real story, real numbers). */
export function Placeholder({ children, note, className }: { children: React.ReactNode; note?: string; className?: string }) {
  return (
    <div
      data-placeholder
      className={cn(
        "rounded-(--radius) border border-dashed border-gold/35 bg-gold/[0.035] px-5 py-4 text-[0.95rem] leading-relaxed text-gold-soft",
        className
      )}
    >
      {children}
      {note && <span className="mt-1.5 block text-[0.8125rem] text-muted-foreground">{note}</span>}
    </div>
  )
}
