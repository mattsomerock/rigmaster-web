/**
 * Single source of truth for links and facts shown on the page.
 * Anything marked TODO must be filled in before launch.
 */
export const site = {
  name: "RIG MASTER",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://rigmaster.example", // TODO: real domain
  lineId: "@rigmaster", // TODO: confirm the real LINE OA ID
  trackStart: {
    short: "14 ก.ย. 2026",
    long: "14 กันยายน 2026",
    iso: "2026-09-14",
  },
  links: {
    line: "https://line.me/R/ti/p/@rigmaster", // Direct CTA — "เริ่มต้น 3 ขั้นตอน"
    live: "#", // TODO: MyFxbook / live dashboard — Transitional CTA "ดูผลเทรดสด"
    simulator: "https://mattsomerock.github.io/rigmaster_risk_simulator/",
    riskDoc: "#", // TODO: full risk disclosure document
    privacy: "#", // TODO: privacy policy
  },
} as const;

export const isExternal = (href: string) => /^https?:\/\//.test(href);
