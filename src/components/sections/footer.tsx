import { ArrowUpRight } from "lucide-react"

import { Wordmark } from "@/components/site/logo"
import { isExternal, site } from "@/lib/site"

/* S13 — Footer + mandatory risk warning. */
const links = [
  { label: "LINE OA", value: site.lineId, href: site.links.line, track: "footer_line" },
  { label: "ผลเทรดสด", value: "MyFxbook", href: site.links.live, track: "cta_secondary" },
  { label: "เอกสารเปิดเผยความเสี่ยงฉบับเต็ม", value: "อ่าน", href: site.links.riskDoc },
  { label: "นโยบายความเป็นส่วนตัว", value: "อ่าน", href: site.links.privacy },
]

export function Footer() {
  return (
    <footer className="border-t border-line pt-20 pb-[calc(128px+env(safe-area-inset-bottom))] lg:pt-28 lg:pb-12">
      <div className="container-lux">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <h2 className="mb-6 text-[0.9375rem] font-normal text-gold-soft">คำเตือนความเสี่ยง</h2>
            <div className="max-w-[46em] space-y-4 text-[0.9rem] leading-[1.9] text-muted-foreground">
              <p>
                การเทรดสัญญาซื้อขายส่วนต่าง (CFD) และผลิตภัณฑ์ที่ใช้เลเวอเรจ มีความเสี่ยงสูงและอาจทำให้สูญเสียเงินลงทุนทั้งหมด
                ผลการดำเนินงานในอดีตไม่ได้เป็นสิ่งยืนยันผลในอนาคต
              </p>
              <p>
                ข้อมูลบนหน้านี้เป็นข้อมูลทั่วไปเพื่อการพิจารณา ไม่ถือเป็นคำแนะนำการลงทุน
                และไม่ได้คำนึงถึงสถานะทางการเงินหรือวัตถุประสงค์เฉพาะของท่าน
              </p>
              <p>
                โบรกเกอร์ที่ใช้เป็นโบรกเกอร์ต่างประเทศ ซึ่งไม่ได้อยู่ภายใต้การกำกับดูแลของสำนักงาน ก.ล.ต. แห่งประเทศไทย
                ผู้ลงทุนควรศึกษาข้อมูลและพิจารณาความเสี่ยงอย่างรอบคอบก่อนตัดสินใจ
              </p>
            </div>
          </div>

          <ul className="border-t border-line lg:col-span-4 lg:col-start-9">
            {links.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  data-track={l.track}
                  data-loc={l.track ? "footer" : undefined}
                  {...(isExternal(l.href) && l.href !== site.links.line ? { target: "_blank", rel: "noopener" } : {})}
                  className="group flex min-h-14 items-center justify-between gap-4 border-b border-line py-3 text-[0.9375rem]"
                >
                  <span className="text-muted-foreground">{l.label}</span>
                  <span className="flex items-center gap-1.5 text-ink transition-colors group-hover:text-gold-soft">
                    {l.value}
                    <ArrowUpRight aria-hidden strokeWidth={1.5} className="size-3.5" />
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <p
          aria-hidden
          className="t-num t-outline mt-20 overflow-hidden text-center text-[clamp(3.6rem,15.5vw,14rem)] leading-[0.9] whitespace-nowrap select-none [-webkit-text-stroke-color:var(--line-strong)]"
        >
          RIG MASTER
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 text-[0.75rem] tracking-[0.12em] text-muted-foreground uppercase">
          <Wordmark className="[&_span]:text-[0.75rem]" />
          <span>USOUSD · MT5 · Live since {site.trackStart.iso.split("-").reverse().join(".")}</span>
          <span>© {new Date().getFullYear()} RIG MASTER</span>
        </div>
      </div>
    </footer>
  )
}
