import Link from "next/link";
import { aedFull, investorDate, type Investment, type Investor } from "../../lib/investors";
import StatusPill from "./StatusPill";

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0">
      <div className="text-[9.5px] uppercase leading-[1.35] tracking-[0.16em] text-[#080B0F]/40">{label}</div>
      <div className="mt-1.5 text-[13.5px] text-[#080B0F]/85">{value || "—"}</div>
    </div>
  );
}

export default function InvestmentsList({ investor }: { investor: Investor }) {
  return (
    <div className="mt-5 flex flex-col gap-4">
      {investor.investments.map((m: Investment) => (
        <article key={m.id} className="border border-[#080B0F]/12 bg-white">
          <div className="flex flex-wrap items-start justify-between gap-4 px-7 py-6">
            <div className="min-w-0">
              <h3
                className="truncate text-[19px] leading-tight text-[#080B0F]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {m.development}
              </h3>
              <div className="mt-1.5 text-[13px] text-[#080B0F]/60">{m.unit}</div>
            </div>
            <StatusPill status={m.status} />
          </div>

          <div className="grid grid-cols-2 gap-x-6 gap-y-5 border-t border-[#080B0F]/8 px-7 py-6 md:grid-cols-3">
            <Meta label="Actual purchase price" value={aedFull(m.purchasePrice)} />
            <Meta label="Purchase date" value={investorDate(m.purchaseDate)} />
            <Meta label="Investment status" value={m.status} />
          </div>

          <div className="flex items-center justify-between gap-4 border-t border-[#080B0F]/8 px-7 py-4">
            <Link
              href={`/workspace/investors/investment-edit?investor=${investor.id}&investment=${m.id}`}
              className="flex cursor-pointer items-center gap-2.5 text-[10.5px] uppercase tracking-[0.18em] text-[#080B0F]/55 transition-colors duration-300 hover:text-[#9A7433]"
            >
              <i className="ri-edit-line text-[15px]" />
              Edit investment
            </Link>
            <Link
              href={`/workspace/investors/investment-detail?investor=${investor.id}&investment=${m.id}`}
              className="flex cursor-pointer items-center gap-3 whitespace-nowrap border border-[#080B0F]/15 px-6 py-3 text-[10.5px] uppercase tracking-[0.18em] text-[#080B0F]/80 transition-colors duration-300 hover:border-[#080B0F] hover:bg-[#080B0F] hover:text-[#F5F2EA]"
            >
              View investment
              <i className="ri-arrow-right-line" />
            </Link>
          </div>
        </article>
      ))}
    </div>
  );
}