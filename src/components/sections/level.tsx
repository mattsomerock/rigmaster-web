import { ArrowRight } from "lucide-react"

import { RiskDial } from "@/components/sections/risk-dial"
import { Em, SectionLabel, SplitHeading } from "@/components/site/typography"
import { site } from "@/lib/site"

/* S9 — Risk levels x1–x10. Simulator is a TEXT link only (two-button rule). */
export function Level() {
  return (
    <section id="level" aria-labelledby="level-title" className="bg-deep">
      <div className="container-lux grid items-center gap-14 py-(--sec) lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <SectionLabel index="07" className="mb-8">
            ระดับความเสี่ยง x1–x10
          </SectionLabel>
          <SplitHeading id="level-title" lines={["เลือกระดับ", <Em key="e">ที่คุณนอนหลับ</Em>]} />
          <p data-reveal className="t-lead mt-8">
            เราให้คุณเลือกได้ว่าจะให้ระบบใช้ความเสี่ยงหนักแค่ไหนเทียบกับพอร์ตหลัก
          </p>
          <dl data-reveal className="mt-8 border-t border-line">
            <div className="grid grid-cols-[88px_1fr] gap-4 border-b border-line py-5">
              <dt className="text-gold-soft">ระดับต่ำ</dt>
              <dd className="text-ink-2">โตช้ากว่า ติดลบระหว่างทางน้อยกว่า</dd>
            </div>
            <div className="grid grid-cols-[88px_1fr] gap-4 border-b border-line py-5">
              <dt className="text-gold-soft">ระดับสูง</dt>
              <dd className="text-ink-2">โตเร็วกว่า ติดลบระหว่างทางหนักกว่า และมีโอกาสถูกล้างพอร์ตสูงกว่า</dd>
            </div>
          </dl>
          <p data-reveal className="mt-8 text-ink-2">
            ไม่มีระดับไหน “ดีที่สุด”
            <br />
            มีแค่ระดับที่เหมาะกับเงินและใจของคุณ
          </p>
          <a
            data-reveal
            data-track="simulator"
            data-loc="level"
            href={site.links.simulator}
            target="_blank"
            rel="noopener"
            className="group mt-8 inline-flex min-h-11 items-center gap-3 border-b border-gold/40 pb-1 text-gold-soft transition-colors hover:border-gold-soft"
          >
            ลองจำลองดูว่าพอร์ตคุณทนได้ลึกแค่ไหน
            <ArrowRight aria-hidden strokeWidth={1.5} className="size-4 transition-transform duration-500 ease-out-expo group-hover:translate-x-1" />
          </a>
        </div>

        <div data-reveal className="lg:col-span-6 lg:col-start-7">
          <RiskDial />
        </div>
      </div>
    </section>
  )
}
