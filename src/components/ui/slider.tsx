"use client"

import * as React from "react"
import { cn } from "cn"
import { Slider as SliderPrimitive } from "radix-ui"

function Slider({
  className,
  defaultValue,
  value,
  min = 0,
  max = 100,
  thumbLabel,
  thumbValueText,
  ...props
}: React.ComponentProps<typeof SliderPrimitive.Root> & {
  /** Accessible name for the thumb(s) — the element with role="slider". */
  thumbLabel?: string
  /** Human-readable value announced by screen readers (e.g. "x3"). */
  thumbValueText?: string
}) {
  const _values = React.useMemo(
    () =>
      Array.isArray(value)
        ? value
        : Array.isArray(defaultValue)
          ? defaultValue
          : [min, max],
    [value, defaultValue, min, max]
  )

  return (
    <SliderPrimitive.Root
      data-slot="slider"
      defaultValue={defaultValue}
      value={value}
      min={min}
      max={max}
      className={cn(
        "relative flex w-full touch-none items-center select-none data-disabled:opacity-50 data-vertical:h-full data-vertical:min-h-40 data-vertical:w-auto data-vertical:flex-col",
        className
      )}
      {...props}
    >
      <SliderPrimitive.Track
        data-slot="slider-track"
        className="relative grow overflow-hidden rounded-full bg-line-strong data-horizontal:h-px data-horizontal:w-full data-vertical:h-full data-vertical:w-px"
      >
        <SliderPrimitive.Range
          data-slot="slider-range"
          className="absolute bg-primary select-none data-horizontal:h-full data-vertical:w-full"
        />
      </SliderPrimitive.Track>
      {Array.from({ length: _values.length }, (_, index) => (
        <SliderPrimitive.Thumb
          data-slot="slider-thumb"
          key={index}
          aria-label={thumbLabel}
          aria-valuetext={thumbValueText}
          className="relative block size-5 shrink-0 rounded-full border border-gold bg-background shadow-[0_0_0_4px_rgb(201_162_39/0.12)] transition-[box-shadow,transform] duration-300 select-none after:absolute after:-inset-3 after:content-[''] before:absolute before:inset-[5px] before:rounded-full before:bg-gold before:content-[''] hover:shadow-[0_0_0_8px_rgb(201_162_39/0.14)] focus-visible:shadow-[0_0_0_8px_rgb(201_162_39/0.22)] focus-visible:outline-hidden active:scale-110 disabled:pointer-events-none disabled:opacity-50"
        />
      ))}
    </SliderPrimitive.Root>
  )
}

export { Slider }
