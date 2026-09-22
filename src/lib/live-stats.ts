import raw from "@/content/live-stats.json"

/**
 * Risk-side numbers from the master portfolio on Myfxbook.
 * Refreshed at build time by scripts/fetch-stats.mjs (see README → Live data).
 */
export type LiveStats = {
  /** Date of the Myfxbook data (YYYY-MM-DD). Always shown next to the numbers. */
  asOf: string
  /** Myfxbook "Drawdown": deepest peak-to-valley, equity included (floating losses count). */
  maxDrawdownPct: number
  /** Floating loss on open trades right now, as % of balance. Never shows a gain. */
  floatingLossPct: number
}

export const liveStats: LiveStats = raw

const TH_MONTHS = ["ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.", "ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค."]

/** "2026-09-22" → "22 ก.ย. 2026" (same style as site.trackStart.short). */
export function thaiDate(iso: string) {
  const [y, m, d] = iso.split("-").map(Number)
  return `${d} ${TH_MONTHS[m - 1]} ${y}`
}

/** Whole days since an ISO date, counted on Bangkok calendar days. */
export function daysSince(iso: string, now = Date.now()) {
  const [y, m, d] = iso.split("-").map(Number)
  const bkk = new Date(now + 7 * 3_600_000)
  const today = Date.UTC(bkk.getUTCFullYear(), bkk.getUTCMonth(), bkk.getUTCDate())
  return Math.max(0, Math.round((today - Date.UTC(y, m - 1, d)) / 86_400_000))
}
