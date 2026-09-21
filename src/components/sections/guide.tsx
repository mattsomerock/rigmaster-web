import { Briefcase, ImageIcon, Server, ShieldCheck, TrendingUp } from "lucide-react"

import { Em, Placeholder, SectionLabel, SplitHeading } from "@/components/site/typography"
import { site } from "@/lib/site"

/* S5 — The Guide: empathy + authority. The story MUST be true — owner writes it. */
const credentials = [
  { icon: TrendingUp, title: "ผลเทรดจริงเปิดให้ตรวจสอบ", text: `เริ่มนับ ${site.trackStart.short} ผ่าน MyFxbook` },
  { icon: Server, title: "VPS ทำงานต่อเนื่อง 307 วัน", text: "ไม่มีหลุดแม้แต่ครั้งเดียว" },
  { icon: ShieldCheck, title: "โค้ดมีกฎที่แก้ไม่ได้ฝังอยู่ข้างใน", text: "ระบบถูกห้ามไม่ให้ทำบางอย่าง ต่อให้ผมอยากให้ทำก็ตาม" },
  { icon: Briefcase, title: "เงินในพอร์ตคัดลอกทุกบาทเป็นของผมเอง", text: "ผมไม่ได้กำลังทดลองกับเงินคุณ" },
]

export function Guide() {
  return (
    <section id="guide" aria-labelledby="guide-title" className="border-t border-line">
      <div className="container-lux grid gap-14 py-(--sec) lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          {/* PLACEHOLDER — replace with <Image src={founder} alt="…" fill className="object-cover" /> (a real photo of a person, not a logo). */}
          <div
            data-clip-in
            role="img"
            aria-label="พื้นที่สำหรับรูปจริงของผู้ก่อตั้ง"
            className="relative mx-auto aspect-square max-w-md overflow-hidden rounded-[6px] border border-line-strong bg-linear-to-b from-surface-2 to-deep lg:sticky lg:top-[calc(var(--header-h)+32px)] lg:aspect-[4/5] lg:max-w-none"
          >
            <div aria-hidden className="absolute inset-x-[-20%] bottom-[-30%] h-3/5 bg-[radial-gradient(closest-side,rgb(201_162_39/0.2),transparent)]" />
            <svg aria-hidden viewBox="0 0 200 220" className="absolute bottom-0 left-1/2 w-[70%] -translate-x-1/2 text-[#1c2029]">
              <circle cx="100" cy="72" r="42" fill="currentColor" />
              <path d="M10 220c0-55 40-90 90-90s90 35 90 90z" fill="currentColor" />
            </svg>
            <span className="absolute bottom-6 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full border border-dashed border-gold/40 bg-deep/85 px-4 py-2 text-[0.75rem] whitespace-nowrap text-gold-soft">
              <ImageIcon aria-hidden strokeWidth={1.5} className="size-3.5" />
              ใส่รูปจริงของคุณ (รูปคน ไม่ใช่โลโก้)
            </span>
          </div>
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          <SectionLabel index="03" className="mb-8">
            ใครอยู่เบื้องหลัง
          </SectionLabel>
          <SplitHeading
            id="guide-title"
            lines={["ผมไม่ได้เริ่มจากการเป็น", "คนที่ทำระบบได้", <Em key="e">ผมเริ่มจากการเป็นคนที่พอร์ตแตก</Em>]}
          />

          <div className="mt-12 space-y-8 text-[1.0625rem] leading-[1.9] text-ink-2">
            <div data-reveal>
              <Placeholder note="ส่วนนี้เจ้าของต้องเขียนเองด้วยเรื่องจริง ห้ามแต่ง">
                [ ปีที่เกิดเรื่อง / เงินก้อนนั้นมาจากไหน / เกิดอะไรขึ้น / ความรู้สึกในคืนนั้น ]
              </Placeholder>
            </div>
            <blockquote data-reveal className="border-l border-gold/60 pl-6 text-[clamp(1.25rem,2.1vw,1.6rem)] leading-[1.6] font-light text-ink">
              หลังจากวันนั้นผมเลิกถามว่า “จะทำกำไรยังไง”
              <br />
              แล้วเปลี่ยนเป็น <span className="text-gold-soft">“จะทำยังไงให้ผมไม่ต้องตัดสินใจอีก”</span>
            </blockquote>
            <p data-reveal>
              ผมใช้เวลาหลายปีเขียนระบบ รันจริงด้วยเงินตัวเอง 6 เดือน แก้บั๊กไปทีละตัวจนมันนิ่ง
              <br />
              แล้วถึงค่อยเปิดให้คนอื่นก็อปปี้
            </p>
          </div>

          <ul className="mt-14 grid border-t border-line sm:grid-cols-2">
            {credentials.map(({ icon: Icon, title, text }) => (
              <li
                key={title}
                data-reveal
                className="flex gap-4 border-b border-line py-7 sm:odd:border-r sm:odd:pr-6 sm:even:pl-6"
              >
                <Icon aria-hidden strokeWidth={1.1} className="mt-1 size-6 shrink-0 text-gold" />
                <div>
                  <p className="leading-snug text-ink">{title}</p>
                  <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-muted-foreground">{text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
