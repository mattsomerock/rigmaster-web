import type { Metadata, Viewport } from "next"
import { Instrument_Serif, Noto_Sans_Thai } from "next/font/google"

import { site } from "@/lib/site"
import "./globals.css"

/* Loopless (ไม่มีหัว) Thai — clean, modern, variable 100–900. */
const thai = Noto_Sans_Thai({
  subsets: ["thai", "latin"],
  variable: "--font-thai",
  display: "swap",
})

/* Editorial serif for numerals and index marks only (Latin glyphs). */
const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument",
  display: "swap",
})

const description =
  "RIG MASTER เปิดพอร์ตเทรดน้ำมันอัตโนมัติ (USOUSD) ให้คุณดูทุกไม้แบบเรียลไทม์ แล้วก็อปปี้ตาม เงินอยู่ในบัญชีชื่อคุณเอง เราได้ส่วนแบ่งเฉพาะวันที่คุณมีกำไร มีความเสี่ยง โปรดอ่านก่อนตัดสินใจ"

export const metadata: Metadata = {
  // Origin only: Next.js appends basePath to file-based metadata (OG image, icon) itself.
  metadataBase: new URL(new URL(site.url).origin),
  title: "RIG MASTER — พอร์ตเทรดน้ำมันอัตโนมัติที่คุณตรวจสอบได้ทุกไม้",
  description,
  applicationName: site.name,
  alternates: { canonical: site.url },
  openGraph: {
    type: "website",
    url: site.url,
    locale: "th_TH",
    siteName: site.name,
    title: "RIG MASTER — ให้ระบบเทรดแทนคุณ โดยเงินยังอยู่ในบัญชีของคุณเอง",
    description,
  },
  twitter: { card: "summary_large_image" },
  formatDetection: { telephone: false },
}

export const viewport: Viewport = {
  themeColor: "#0b0d12",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
}

/* Hide below-the-fold content for its entrance animation only when JS motion
   will actually run; if it never initialises (blocked script, error), show
   everything after 3.5s. Reduced-motion users never get the class. */
const motionGate = `(function(){var d=document.documentElement;if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;d.classList.add('js-motion');setTimeout(function(){if(!window.__rmMotion)d.classList.remove('js-motion')},3500)})();`

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="th" suppressHydrationWarning className={`${thai.variable} ${serif.variable} dark`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: motionGate }} />
      </head>
      <body>{children}</body>
    </html>
  )
}
