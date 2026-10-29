import { LogoMark } from "../brand/Logo";

const paymentPlan = [
  { stage: "Booking", pct: "5%", amount: "AED 70,000" },
  { stage: "SPA signature", pct: "10%", amount: "AED 140,000" },
  { stage: "Construction · Q1 2027", pct: "25%", amount: "AED 350,000" },
  { stage: "Handover · Q4 2028", pct: "60%", amount: "AED 840,000" },
];

const returns = [
  { l: "Projected ROI", v: "52.4%" },
  { l: "Est. IRR", v: "14.1%" },
  { l: "Gross yield", v: "6.4%" },
];

export default function SalesOffer() {
  return (
    <div className="relative overflow-hidden bg-[#0D1116] p-8 md:p-11">
      <div className="pointer-events-none absolute -right-12 -top-12 h-60 w-60 opacity-[0.05]">
        <LogoMark tone="light" className="h-full w-full" />
      </div>

      <div className="relative flex items-start justify-between border-b border-[#F5F2EA]/12 pb-6">
        <div className="flex items-center gap-3">
          <LogoMark tone="light" className="h-7 w-7" />
          <span className="text-[12px] tracking-[0.34em] text-[#F5F2EA]">PROPTECH</span>
        </div>
        <div className="text-right">
          <div className="text-[11px] uppercase tracking-[0.2em] text-[#F5F2EA]/45">Investment proposal</div>
          <div className="mt-1.5 text-[11.5px] text-[#F5F2EA]/55">Prepared by your brokerage</div>
        </div>
      </div>

      <div className="relative mt-7 grid grid-cols-2 gap-6">
        {[
          { l: "Prepared for", v: "Mr. Khalid Al Mansoori" },
          { l: "Development", v: "Saadiyat Reserve" },
          { l: "Unit", v: "Villa 214 · 4 bedroom" },
          { l: "Price", v: "AED 1,400,000", gold: true },
        ].map((r) => (
          <div key={r.l}>
            <div className="text-[11px] text-[#F5F2EA]/40">{r.l}</div>
            <div
              className={`mt-2 text-[15px] font-medium ${r.gold ? "text-[#C9A45C]" : "text-[#F5F2EA]/90"}`}
              style={r.gold ? { fontFamily: "var(--font-display)" } : undefined}
            >
              {r.v}
            </div>
          </div>
        ))}
      </div>

      <div className="relative mt-9">
        <div className="text-[11px] text-[#F5F2EA]/40">Payment plan</div>
        <div className="mt-3 divide-y divide-[#F5F2EA]/8 border-y border-[#F5F2EA]/8">
          {paymentPlan.map((p) => (
            <div key={p.stage} className="flex items-center justify-between py-3">
              <span className="text-[13px] text-[#F5F2EA]/75">{p.stage}</span>
              <div className="flex items-center gap-7">
                <span className="text-[12px] text-[#F5F2EA]/45">{p.pct}</span>
                <span className="w-[110px] text-right text-[13px] text-[#F5F2EA]/85">{p.amount}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="relative mt-9 grid grid-cols-3 gap-6 border-t border-[#F5F2EA]/12 pt-6">
        {returns.map((s) => (
          <div key={s.l}>
            <div className="text-[11px] text-[#F5F2EA]/40">{s.l}</div>
            <div
              className="mt-2 text-[20px] font-medium text-[#3E9D80]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {s.v}
            </div>
          </div>
        ))}
      </div>

      <div className="relative mt-10 flex items-end justify-between gap-6 border-t border-[#F5F2EA]/12 pt-6">
        <div>
          <span className="block h-8 w-40 border-b border-[#F5F2EA]/25" />
          <span className="mt-2 block text-[11px] text-[#F5F2EA]/40">Authorised broker</span>
        </div>
        <span className="text-[11px] text-[#F5F2EA]/35">Valid 30 days · Modelled output</span>
      </div>
    </div>
  );
}
