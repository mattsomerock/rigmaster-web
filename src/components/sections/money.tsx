import { Ban, DoorOpen, Landmark, Megaphone, Percent } from "lucide-react"

import { ProfitCalculator } from "@/components/sections/profit-calculator"
import { Em, SectionLabel, SplitHeading } from "@/components/site/typography"
import { cn } from "@/lib/utils"

/* S8 — Profit share + where the money lives. Full disclosure of the conflict of interest. */
const rules = [
  { icon: Landmark, title: "บัญชีเป็นชื่อคุณ", text: "รหัสผ่านอยู่กับคุณ เราไม่มีสิทธิ์ถอนเงินออกจากบัญชีคุณไม่ว่ากรณีใด" },
  { icon: Ban, title: "เราไม่เคยขอให้โอนเงินมาที่เรา", text: "ถ้ามีใครอ้างชื่อ RIG MASTER แล้วขอให้โอนเงิน นั่นคือมิจฉาชีพ" },
  { icon: DoorOpen, title: "หยุดเมื่อไหร่ก็ได้", text: "ไม่มีสัญญา ไม่มีขั้นต่ำ ไม่มีค่าปรับ เรามีคลิปสอนวิธีหยุดและถอนให้ด้วย" },
  {
    icon: Percent,
    title: "แบ่งกำไรหักจากกำไรเท่านั้น",
    text: "หักเป็นรายวัน วันไหนไม่มีกำไร เราไม่ได้อะไรเลย",
    rates: true,
  },
  {
    icon: Megaphone,
    title: "เราได้ค่าแนะนำจากโบรกเกอร์ด้วย",
    text: "คิดจากปริมาณการเทรด ไม่ได้คิดจากกำไรของคุณ เราบอกเองเพราะนี่คือจุดที่ผลประโยชน์เราไม่ตรงกับคุณ 100% และเป็นเหตุผลที่เราไม่เลือกให้ใช้ฟรี",
  },
]

export function Money() {
  return (
    <section id="money" aria-labelledby="money-title" className="border-t border-line">
      <div className="container-lux py-(--sec)">
        <div className="mb-16 grid gap-8 lg:mb-20 lg:grid-cols-12">
          <div className="lg:col-span-3">
            <SectionLabel index="06">กติกาแบ่งกำไร</SectionLabel>
          </div>
          <div className="lg:col-span-9">
            <SplitHeading
              id="money-title"
              lines={["คำถามที่ถูกถามบ่อยที่สุด", "ไม่ใช่ “ได้เท่าไหร่”", <Em key="e">แต่คือ “แล้วเงินผมอยู่ไหน”</Em>]}
            />
          </div>
        </div>

        <ul className="grid border-t border-l border-line sm:grid-cols-2 lg:grid-cols-6">
          {rules.map(({ icon: Icon, title, text, rates }, i) => (
            <li
              key={title}
              data-reveal
              className={cn(
                "group flex flex-col gap-4 border-r border-b border-line p-7 transition-colors duration-700 hover:bg-surface sm:p-9 lg:col-span-2",
                i > 2 && "lg:col-span-3",
                i === 4 && "sm:col-span-2 lg:col-span-3"
              )}
            >
              <Icon aria-hidden strokeWidth={1.1} className="size-7 text-gold transition-transform duration-700 ease-out-expo group-hover:-translate-y-1" />
              <h3 className="text-[1.125rem] leading-snug font-normal text-ink">{title}</h3>
              <p className="text-[0.95rem] leading-relaxed text-muted-foreground">{text}</p>
              {rates && (
                <p className="mt-1 flex flex-wrap gap-2">
                  <span className="rounded-full border border-gold/35 px-3 py-1 text-[0.8125rem] text-gold-soft">15% ถ้าเปิดพอร์ตผ่านลิงก์เรา</span>
                  <span className="rounded-full border border-line-strong px-3 py-1 text-[0.8125rem] text-ink-2">30% ถ้าเปิดเอง</span>
                </p>
              )}
            </li>
          ))}
        </ul>

        <div className="mt-16 grid gap-6 lg:mt-24 lg:grid-cols-12 lg:gap-10">
          <div data-reveal className="lg:col-span-7">
            <ProfitCalculator />
          </div>
          <div data-reveal className="lg:col-span-5 lg:pt-4">
            <h3 className="mb-6 text-[1.45rem] font-light text-ink">ทำไมมีสองอัตรา</h3>
            <div className="space-y-5 text-[1rem] leading-[1.9] text-ink-2">
              <p>
                ถ้าคุณเปิดพอร์ตผ่านลิงก์ของเรา โบรกเกอร์จะจ่ายค่าแนะนำให้เราส่วนหนึ่ง เราจึงเก็บส่วนแบ่งกำไรจากคุณน้อยลงครึ่งหนึ่ง
              </p>
              <p className="border-l border-gold/60 bg-gold/[0.04] py-4 pr-4 pl-5 text-ink">
                ค่าแนะนำนั้นคิดจากปริมาณการเทรด ไม่ได้คิดจากกำไรของคุณ นี่คือจุดเดียวที่ผลประโยชน์ของเราไม่ได้ตรงกับคุณ 100%
                และเราบอกเองก่อนถูกถาม
              </p>
              <p>
                เราจึงไม่เลือกให้ใช้ฟรี ทั้งที่ทำได้ เพราะถ้าเก็บศูนย์ เราจะได้เงินเท่าเดิมไม่ว่าคุณจะกำไรหรือขาดทุน
                และเราจะไม่แก้ระบบให้เทรดถี่ขึ้นเพื่อค่าแนะนำ
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
