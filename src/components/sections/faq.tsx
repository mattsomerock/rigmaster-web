import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Em, SectionLabel, SplitHeading } from "@/components/site/typography"
import { faq } from "@/content/faq"

/* DETAIL. Everything a careful reader wants, folded away. Radix accordion: keyboard + screen-reader ready. */
export function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="border-t border-line">
      <div className="container-lux grid gap-12 py-(--sec) lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-[calc(var(--header-h)+40px)]">
            <SectionLabel index="04" className="mb-8">
              รายละเอียด
            </SectionLabel>
            <SplitHeading id="faq-title" lines={["ถามตรง", <Em key="e">ตอบตรง</Em>]} />
            <p data-reveal className="mt-6 text-[0.975rem] leading-relaxed text-muted-foreground">
              รายละเอียดทั้งหมดอยู่ตรงนี้ เปิดอ่านเฉพาะข้อที่สงสัย
            </p>
          </div>
        </div>

        <Accordion type="single" collapsible className="border-t border-line lg:col-span-7 lg:col-start-6">
          {faq.map((item, i) => (
            <AccordionItem key={item.q} value={`q${i}`} data-reveal className="border-b border-line">
              <AccordionTrigger className="items-center gap-6 rounded-none py-7 text-[1.125rem] font-normal text-ink hover:no-underline hover:text-gold-soft focus-visible:ring-0 [&_[data-slot=accordion-trigger-icon]]:size-5 [&_[data-slot=accordion-trigger-icon]]:text-gold-soft">
                <span className="flex items-baseline gap-5">
                  <span aria-hidden className="t-num w-6 shrink-0 text-base text-muted-foreground italic">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {item.q}
                </span>
              </AccordionTrigger>
              <AccordionContent className="pb-8 pl-11 text-[1rem] leading-[1.85] text-ink-2">{item.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
