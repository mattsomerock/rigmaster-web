import type { ReactNode } from "react"
import { Coins, HeartCrack, Hourglass } from "lucide-react"

import { Em, SectionLabel, SplitHeading } from "@/components/site/typography"

const stakes = [
  { icon: Hourglass, title: "เวลา", text: "ปีที่ใช้ไปกับการลองผิดลองถูก เอาคืนไม่ได้" },
  { icon: Coins, title: "ทุน", text: "เงินเก็บที่ค่อย ๆ ถูกเงินเฟ้อกิน ระหว่างที่ยังไม่กล้าเริ่ม" },
  { icon: HeartCrack, title: "ความเชื่อใจ", text: "ทุกครั้งที่โดนหลอก โอกาสดีครั้งต่อไปก็ถูกปฏิเสธไปด้วย" },
]

function W({ children }: { children: ReactNode }) {
  return <span data-w>{children}</span>
}

/* S3 — The stakes: problem + villain. */
export function Stakes() {
  return (
    <section id="stakes" aria-labelledby="stakes-title" className="border-t border-line">
      <div className="container-lux grid gap-y-12 py-(--sec) lg:grid-cols-12">
        <div className="lg:col-span-3">
          <SectionLabel index="01">ปัญหาจริง</SectionLabel>
        </div>

        <div className="lg:col-span-9">
          <SplitHeading
            id="stakes-title"
            lines={["พอร์ตส่วนใหญ่ไม่ได้ตาย", "เพราะเจ้าของขี้เกียจ", <Em key="e">มันตายเพราะเจ้าของขยันเกินไป</Em>]}
          />

          <div data-scrub className="mt-16 max-w-3xl space-y-6 text-[clamp(1.3rem,2.4vw,1.95rem)] leading-[1.65] font-light text-ink">
            <p>
              <W>เฝ้ากราฟทุกคืน</W> <W>อ่านข่าวทุกเช้า</W>
            </p>
            <p>
              <W>เข้าไม้เพราะ “รู้สึกว่าน่าจะขึ้น”</W>
              <br />
              <W>แล้วถือต่อเพราะ “เดี๋ยวมันก็กลับมา”</W>
            </p>
          </div>

          <div data-reveal className="my-16 border-y border-line py-10 lg:my-24 lg:py-14">
            <p className="text-[clamp(1.7rem,4.2vw,3.3rem)] leading-[1.3] font-extralight text-ink">ศัตรูไม่ใช่ตลาด</p>
            <p className="text-[clamp(1.7rem,4.2vw,3.3rem)] leading-[1.3] font-light text-gold-soft">
              ศัตรูคือการตัดสินใจที่ไม่มีกฎ
            </p>
          </div>

          <div data-scrub className="max-w-3xl text-[clamp(1.2rem,2.1vw,1.65rem)] leading-[1.7] font-light text-ink">
            <p>
              <W>และถ้าคุณเคยผ่านคืนที่พอร์ตเหลือศูนย์</W>
              <br />
              <W>คุณจะรู้ว่าสิ่งที่เจ็บกว่าเงิน</W>
              <br />
              <W>คือความรู้สึกว่าตัวเองโง่เอง</W>
            </p>
          </div>

          <h3 className="sr-only">สามสิ่งที่กำลังเสี่ยง</h3>
          <ul className="mt-20 grid border-t border-line md:grid-cols-3 lg:mt-28">
            {stakes.map(({ icon: Icon, title, text }, i) => (
              <li
                key={title}
                data-reveal
                className="group flex flex-col gap-4 border-b border-line py-9 md:border-r md:border-b-0 md:px-8 md:first:pl-0 md:last:border-r-0"
              >
                <span className="t-num text-sm text-muted-foreground italic">0{i + 1}</span>
                <Icon aria-hidden strokeWidth={1} className="size-9 text-gold transition-transform duration-700 ease-out-expo group-hover:-translate-y-1" />
                <h4 className="text-xl font-normal text-ink">{title}</h4>
                <p className="text-[0.975rem] leading-relaxed text-muted-foreground">{text}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
