/* S10 — Long explanatory copy for the skeptical reader and for SEO. */
export function Explain() {
  return (
    <section aria-labelledby="explain-title" className="border-t border-line">
      <div className="container-lux grid gap-8 py-20 lg:grid-cols-12 lg:py-28">
        <h2 id="explain-title" className="text-[1.25rem] leading-relaxed font-light text-ink lg:col-span-3">
          RIG MASTER ทำงานอย่างไร
          <span className="mt-1 block text-[0.9375rem] text-muted-foreground">สำหรับคนที่อยากรู้ละเอียด</span>
        </h2>
        <div className="text-[0.975rem] leading-[1.95] text-muted-foreground lg:col-span-8 lg:col-start-5 lg:columns-2 lg:gap-12 [&>p]:mb-5 [&>p]:break-inside-avoid">
          <p>
            RIG MASTER คือระบบเทรดอัตโนมัติที่ทำงานกับสัญญาน้ำมันดิบ (USOUSD) บนแพลตฟอร์ม MetaTrader 5 ผ่านโบรกเกอร์ PU Prime
            โดยใช้กลยุทธ์แบบ Grid ที่ทยอยเปิดไม้ตามระยะห่างของราคาที่กำหนดไว้ล่วงหน้า ทุกการตัดสินใจถูกกำหนดด้วยกฎในโค้ดทั้งหมด
            ไม่มีการเข้าไปตัดสินใจด้วยมือระหว่างทาง
          </p>
          <p>
            ระบบคัดลอกการเทรดทำงานแบบสัดส่วน คือพอร์ตของคุณจะเปิดไม้ตามพอร์ตหลักโดยปรับขนาดตามเงินทุนที่คุณมี
            คุณจึงไม่จำเป็นต้องมีทุนเท่าพอร์ตหลัก บัญชีที่ใช้เป็นบัญชีประเภทเซ็นต์ ซึ่งช่วยให้ปรับขนาดการเทรดได้ละเอียดกว่าบัญชีมาตรฐาน
          </p>
          <p>
            สิ่งที่คุณต้องเข้าใจให้ชัดคือ กลยุทธ์ Grid แลกระหว่าง “ความสม่ำเสมอของไม้ที่ปิด” กับ “ความเสี่ยงที่กระจุกตัวอยู่ในไม้ที่ยังไม่ปิด”
            ระบบไม่ตัดขาดทุน จึงไม่มีการขาดทุนเล็ก ๆ บ่อย ๆ แต่แลกมาด้วยความเสี่ยงที่ใหญ่และเกิดไม่บ่อย
            คนที่เหมาะกับระบบนี้คือคนที่เข้าใจการแลกเปลี่ยนนี้ และใช้เงินที่เสียได้โดยไม่กระทบชีวิต
          </p>
          <p>
            เราเลือกเปิดเผยผลเทรดแบบสดทุกไม้ แทนการโชว์ภาพกำไรที่เลือกมาแล้ว เพราะเราคิดว่าสิ่งที่ตลาดนี้ขาดที่สุดไม่ใช่ระบบที่ดี
            แต่คือข้อมูลที่ตรวจสอบได้
          </p>
        </div>
      </div>
    </section>
  )
}
