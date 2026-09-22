// Refresh src/content/live-stats.json from the official Myfxbook API before a build.
//
// Needs the repository secrets MYFXBOOK_EMAIL and MYFXBOOK_PASSWORD (the public
// portfolio page sits behind a bot check, so the API is the only supported source).
// Without them, or on any error, the last committed snapshot is kept and the build
// carries on — the page always prints the date of the numbers it shows.
//
//   node scripts/fetch-stats.mjs

import { writeFile } from "node:fs/promises"

const OUT = new URL("../src/content/live-stats.json", import.meta.url)
const API = "https://www.myfxbook.com/api"
const ACCOUNT_ID = Number(process.env.MYFXBOOK_ACCOUNT_ID || 12200713) // id in the portfolio URL
const { MYFXBOOK_EMAIL: email, MYFXBOOK_PASSWORD: password } = process.env

const warn = (msg) => console.log(process.env.GITHUB_ACTIONS ? `::warning::live stats: ${msg}` : `live stats: ${msg}`)

async function call(method, params) {
  const res = await fetch(`${API}/${method}.json?${new URLSearchParams(params)}`, {
    signal: AbortSignal.timeout(20_000),
  })
  const body = await res.json()
  // Error text comes from Myfxbook and never echoes credentials.
  if (!res.ok || body.error) throw new Error(`${method}: ${body.message || `HTTP ${res.status}`}`)
  return body
}

/** Myfxbook dates look like "09/22/2026 10:14" (MM/dd/yyyy HH:mm). */
function isoDate(mfx) {
  const m = /^(\d{2})\/(\d{2})\/(\d{4})/.exec(mfx ?? "")
  return m ? `${m[3]}-${m[1]}-${m[2]}` : new Date().toISOString().slice(0, 10)
}

async function main() {
  if (!email || !password) {
    warn("MYFXBOOK_EMAIL / MYFXBOOK_PASSWORD not set — keeping the committed snapshot")
    return
  }

  const { session } = await call("login", { email, password })
  try {
    const { accounts } = await call("get-my-accounts", { session })
    const account = accounts.find((a) => Number(a.id) === ACCOUNT_ID)
    if (!account) throw new Error(`account ${ACCOUNT_ID} not found`)

    const maxDrawdownPct = Number(account.drawdown)
    const equityPercent = Number(account.equityPercent)
    if (!Number.isFinite(maxDrawdownPct) || !Number.isFinite(equityPercent)) throw new Error("unexpected response shape")

    const stats = {
      asOf: isoDate(account.lastUpdateDate),
      maxDrawdownPct: Math.round(maxDrawdownPct * 100) / 100,
      // Loss side only: a floating gain is shown as 0, never as a return figure.
      floatingLossPct: Math.round(Math.max(0, 100 - equityPercent) * 100) / 100,
    }
    await writeFile(OUT, `${JSON.stringify(stats, null, 2)}\n`)
    console.log("live stats:", stats)
  } finally {
    await call("logout", { session }).catch(() => {})
  }
}

main().catch((err) => warn(`${err.message} — keeping the committed snapshot`))
