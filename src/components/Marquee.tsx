'use client'

const TICKER_TEXT =
  'PRODUCT DESIGN · UX/UI · CISCO · J.P. MORGAN CHASE · OXEFIT · SPRINGBOARD · FIGMA · '

export default function Marquee() {
  const repeated = TICKER_TEXT.repeat(6)

  return (
    <div className="overflow-hidden border-t border-b border-foreground/10 py-4 select-none">
      <div className="marquee-track">
        <span className="text-sm font-medium tracking-widest text-foreground/40 uppercase pr-0">
          {repeated}
          {repeated}
        </span>
      </div>
    </div>
  )
}
