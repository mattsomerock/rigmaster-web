import type { ReactNode } from "react"
import { ImageIcon } from "lucide-react"

import { Em, Placeholder, SectionLabel, SplitHeading } from "@/components/site/typography"

function W({ children }: { children: ReactNode }) {
  return <span data-w>{children}</span>
}

/*
 * STORY. Problem → villain → the guide who lived it (StoryBrand S3 + S5 in one beat).
 * The founder's story MUST be true — the owner writes it.
 */
export function Story() {
  return (
    <section id="story" aria-labelledby="story-title" className="border-t border-line">
      <div className="container-lux py-(--sec)">
        <SectionLabel index="01" className="mb-8">
          เรื่องจริง
        </SectionLabel>
        <SplitHeading
          id="story-title"
          lines={["พอร์ตส่วนใหญ่ไม่ได้ตาย", "เพราะเจ้าของขี้เกียจ", <Em key="e">มันตายเพราะเจ้าของขยันเกินไป</Em>]}
        />

        <div data-scrub className="mt-10 max-w-3xl text-[clamp(1.2rem,2.2vw,1.75rem)] leading-[1.7] font-light text-ink lg:mt-14">
          <p>
            <W>เฝ้ากราฟทุกคืน</W> <W>เข้าไม้เพราะ “รู้สึกว่าน่าจะขึ้น”</W>
            <br />
            <W>แล้วถือต่อเพราะ “เดี๋ยวมันก็กลับมา”</W>
          </p>
        </div>

        <div data-reveal className="mt-12 border-y border-line py-9 lg:mt-16 lg:py-12">
          <p className="text-[clamp(1.6rem,4vw,3.1rem)] leading-[1.3] font-extralight text-ink">ศัตรูไม่ใช่ตลาด</p>
          <p className="text-[clamp(1.6rem,4vw,3.1rem)] leading-[1.3] font-light text-gold-soft">ศัตรูคือการตัดสินใจที่ไม่มีกฎ</p>
        </div>

        <div className="mt-14 grid items-start gap-10 lg:mt-20 lg:grid-cols-12">
          {/* PLACEHOLDER — replace with <Image src={founder} alt="…" fill className="object-cover" /> (a real photo of a person, not a logo). */}
          <div
            data-clip-in
            role="img"
            aria-label="พื้นที่สำหรับรูปจริงของผู้ก่อตั้ง"
            className="relative aspect-[4/5] w-44 overflow-hidden rounded-[6px] border border-line-strong bg-linear-to-b from-surface-2 to-deep sm:w-56 lg:col-span-4 lg:w-full lg:max-w-sm"
          >
            <div aria-hidden className="absolute inset-x-[-20%] bottom-[-30%] h-3/5 bg-[radial-gradient(closest-side,rgb(201_162_39/0.2),transparent)]" />
            <svg aria-hidden viewBox="0 0 200 220" className="absolute bottom-0 left-1/2 w-[70%] -translate-x-1/2 text-[#1c2029]">
              <circle cx="100" cy="72" r="42" fill="currentColor" />
              <path d="M10 220c0-55 40-90 90-90s90 35 90 90z" fill="currentColor" />
            </svg>
            <span className="absolute inset-x-3 bottom-3 flex items-center justify-center gap-1.5 rounded-full border border-dashed border-gold/40 bg-deep/85 px-3 py-1.5 text-[0.6875rem] text-gold-soft">
              <ImageIcon aria-hidden strokeWidth={1.5} className="size-3 shrink-0" />
              ใส่รูปจริงของคุณ
            </span>
          </div>

          <div className="space-y-7 text-[1.0625rem] leading-[1.9] text-ink-2 lg:col-span-7 lg:col-start-6">
            <p data-reveal className="text-[clamp(1.3rem,2.2vw,1.65rem)] leading-[1.5] font-light text-ink">
              ผมรู้ เพราะผมเคยเป็นคนแบบนั้น
            </p>
            <div data-reveal>
              <Placeholder note="เจ้าของเขียนเองด้วยเรื่องจริง 2–3 บรรทัด ห้ามแต่ง">
                [ ปีที่พอร์ตแตก / เงินก้อนนั้นมาจากไหน / คืนนั้นรู้สึกยังไง ]
              </Placeholder>
            </div>
            <blockquote data-reveal className="border-l border-gold/60 pl-6 text-[clamp(1.2rem,2vw,1.5rem)] leading-[1.6] font-light text-ink">
              หลังจากคืนนั้น ผมเลิกถามว่า <span className="whitespace-nowrap">“จะทำกำไรยังไง”</span>
              <br />
              แล้วเริ่มถามว่า
              <span className="block text-gold-soft">“จะทำยังไงให้ไม่ต้องตัดสินใจเองอีก”</span>
            </blockquote>
            <p data-reveal>
              คำตอบคือระบบที่ทำตามกฎทุกครั้ง ผมรันมันด้วยเงินตัวเอง 6 เดือนก่อนเปิดให้ใครก็อปปี้
              และทุกบาทในพอร์ตหลักวันนี้ <span className="text-ink">ก็ยังเป็นเงินของผมเอง</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
