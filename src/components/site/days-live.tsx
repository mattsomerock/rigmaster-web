"use client"

import { useSyncExternalStore } from "react"

import { daysSince } from "@/lib/live-stats"

const subscribe = () => () => {}

/** Day count that stays correct between builds: the build value first, today's count after hydration. */
export function DaysLive({ since, buildValue }: { since: string; buildValue: number }) {
  const days = useSyncExternalStore(subscribe, () => daysSince(since), () => buildValue)
  return <>{days}</>
}
