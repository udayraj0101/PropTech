import Link from "next/link";
import Display from "../ui/Display";
import { aedFull, investorDate, type Investment, type Investor } from "../../lib/investors";
import StatusPill from "./StatusPill";

function Field({ label, value, muted }: { label: string; value: string; muted?: boolean }) {
  return (
    <div className="min-w-0">
      <div className="text-[9.5px] uppercase leading-[1.35] tracking-[0.16em] text-[#080B0F]/40">{label}</div>
      <div className={`mt-1.5 text-[13px] leading-snug ${muted ? "text-[#080B0F]/70" : "text-[#080B0F]/90"}`}>
        {value || "—"}
      </div>
    </div>
  );
}

export default function InvestmentDetail({ investor, investment }: { investor: Investor; investment: Investment }) {
  return (
    <div className="w-full bg-[#F5F2EA] pb-24">
      <div className="mx-auto w-full max-w-[1440px] px-6 pt-9 md:px-10">
        <Link
          href={`/workspace/investors/view?id=${investor.id}`}
          className="flex cursor-pointer items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-[#080B0F]/50 transition-colors hover:text-[#9A7433]"
        >
          <i className="ri-arrow-left-line" />
          Back to {investor.name}
        </Link>

        <div className="mt-8 flex flex-wrap items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-[#C9A45C]" />
              <span className="text-[10.5px] uppercase tracking-[0.34em] text-[#C9A45C]">Investment</span>
            </div>
            <Display className="mt-3.5 text-[32px] font-medium leading-[1.05] tracking-[-0.03em] text-[#080B0F] md:text-[44px]">
              {investment.development}
            </Display>
            <p className="mt-3 text-[14px] text-[#080B0F]/55">{investment.unit}</p>
          </div>
          <div className="flex flex-col items-start gap-4 md:items-end">
            <StatusPill status={investment.status} />
            <Link
              href={`/workspace/investors/investment-edit?investor=${investor.id}&investment=${investment.id}`}
              className="flex cursor-pointer items-center gap-3 whitespace-nowrap border border-[#080B0F]/20 px-6 py-3.5 text-[10.5px] uppercase tracking-[0.2em] text-[#080B0F]/80 transition-colors duration-300 hover:border-[#080B0F] hover:bg-[#080B0F] hover:text-[#F5F2EA]"
            >
              <i className="ri-edit-line text-[15px]" />
              Edit investment
            </Link>
          </div>
        </div>

        <div className="mt-8 border-y border-[#080B0F]/10 py-6">
          <div className="grid grid-cols-2 gap-x-6 gap-y-6 px-8 md:grid-cols-4">
            <Field label="Investor" value={investor.name} />
            <Field label="Development" value={investment.development} />
            <Field label="Property / unit" value={investment.unit} />
            <Field label="Investment status" value={investment.status} />
          </div>
        </div>

        <section className="mt-6 border border-[#080B0F]/12 bg-white">
          <div className="border-b border-[#080B0F]/8 px-8 py-5">
            <h3 className="text-[17px] text-[#080B0F]" style={{ fontFamily: "var(--font-display)" }}>
              Investment Record
            </h3>
          </div>
          <div className="grid grid-cols-2 gap-x-6 gap-y-6 px-8 py-8 md:grid-cols-4">
            <Field label="Type" value={investment.unitType || "—"} />
            <Field label="Area / size" value={investment.size || "—"} />
            <Field label="Actual purchase price" value={aedFull(investment.purchasePrice)} />
            <Field label="Purchase date" value={investorDate(investment.purchaseDate)} />
          </div>
        </section>

        <section className="mt-6 border border-[#080B0F]/12 bg-white">
          <div className="border-b border-[#080B0F]/8 px-8 py-5">
            <h3 className="text-[17px] text-[#080B0F]" style={{ fontFamily: "var(--font-display)" }}>
              Development Reference
            </h3>
          </div>
          <div className="grid grid-cols-2 gap-x-6 gap-y-6 px-8 py-8 md:grid-cols-4">
            <Field
              label="Starting price"
              value={investment.startingPrice ? aedFull(investment.startingPrice) : "—"}
              muted
            />
            <Field
              label="Current available price"
              value={investment.availablePrice ? aedFull(investment.availablePrice) : "—"}
              muted
            />
            <Field label="Actual purchase price" value={aedFull(investment.purchasePrice)} />
          </div>

          <div className="border-t border-[#080B0F]/8 px-8 py-7">
            <div className="text-[10px] uppercase tracking-[0.24em] text-[#9A7433]">How these differ</div>
            <div className="mt-4 grid gap-6 md:grid-cols-3">
              <div>
                <div className="text-[13.5px] text-[#080B0F]/90">Starting price</div>
                <p className="mt-1.5 text-[12.5px] leading-relaxed text-[#080B0F]/55">
                  The development's original reference starting price.
                </p>
              </div>
              <div>
                <div className="text-[13.5px] text-[#080B0F]/90">Current available price</div>
                <p className="mt-1.5 text-[12.5px] leading-relaxed text-[#080B0F]/55">
                  The current available inventory price from the development.
                </p>
              </div>
              <div>
                <div className="text-[13.5px] text-[#080B0F]/90">Actual purchase price</div>
                <p className="mt-1.5 text-[12.5px] leading-relaxed text-[#080B0F]/55">
                  The price this investor actually paid, and their personal performance baseline.
                </p>
              </div>
            </div>
            <p className="mt-5 max-w-3xl text-[12.5px] leading-relaxed text-[#080B0F]/50">
              These values are tracked separately and are never merged. Future investor performance uses the actual
              purchase price as the baseline, not the starting or current available price.
            </p>
          </div>
        </section>

        <section className="mt-6 border border-[#080B0F]/12 bg-white">
          <div className="border-b border-[#080B0F]/8 px-8 py-5">
            <h3 className="text-[17px] text-[#080B0F]" style={{ fontFamily: "var(--font-display)" }}>
              Performance
            </h3>
          </div>
          <div className="px-8 py-8">
            <div className="text-[10px] uppercase tracking-[0.24em] text-[#9A7433]">Status</div>
            <p className="mt-2 max-w-3xl text-[13px] leading-relaxed text-[#080B0F]/70">
              Performance tracking will be available once the required market and investment data is available.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}