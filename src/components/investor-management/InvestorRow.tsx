import type { ReactNode } from "react";
import Link from "next/link";
import { investmentCount, type Investor } from "../../lib/investors";
import StatusPill from "./StatusPill";

function Cell({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-3 lg:block">
      <span className="text-[10px] uppercase tracking-[0.16em] text-[#080B0F]/40 lg:hidden">{label}</span>
      <div className="text-right lg:text-left">{children}</div>
    </div>
  );
}

export default function InvestorRow({ investor }: { investor: Investor }) {
  const count = investmentCount(investor);

  return (
    <article className="grid grid-cols-1 items-center gap-4 px-6 py-5 transition-colors duration-300 hover:bg-white/70 lg:grid-cols-[minmax(0,2.2fr)_0.9fr_1fr_1fr_1fr_112px] lg:gap-6">
      <div className="min-w-0">
        <h3 className="truncate text-[17px] leading-tight text-[#080B0F]" style={{ fontFamily: "var(--font-display)" }}>
          {investor.name}
        </h3>
        <a
          href={`mailto:${investor.email}`}
          className="mt-1 block truncate text-[12.5px] text-[#080B0F]/55 transition-colors hover:text-[#9A7433]"
        >
          {investor.email}
        </a>
        <p className="mt-0.5 text-[12.5px] text-[#080B0F]/45">{investor.phone || "—"}</p>
      </div>

      <Cell label="Investments">
        <div className="text-[13px] text-[#080B0F]/75">
          {count} {count === 1 ? "Investment" : "Investments"}
        </div>
        <div className="mt-1 hidden text-[10px] uppercase tracking-[0.14em] text-[#080B0F]/35 lg:block">
          {investor.brokerage}
        </div>
      </Cell>

      <Cell label="Investment status">
        <StatusPill status={investor.status} />
      </Cell>

      <Cell label="Portal access">
        <div>
          <div className="hidden text-[9px] uppercase tracking-[0.16em] text-[#080B0F]/35 lg:block">Investor Portal</div>
          <div className="mt-0.5">
            <StatusPill status={investor.portal} />
          </div>
        </div>
      </Cell>

      <Cell label="Last updated">
        <span className="text-[12.5px] text-[#080B0F]/60">{investor.lastUpdated}</span>
      </Cell>

      <div className="flex items-center justify-end gap-2.5">
        <Link
          href={`/workspace/investors/edit?id=${investor.id}`}
          title="Edit investor"
          aria-label="Edit investor"
          className="flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center border border-[#080B0F]/15 text-[#080B0F]/70 transition-colors duration-300 hover:border-[#080B0F] hover:bg-[#080B0F] hover:text-[#F5F2EA]"
        >
          <i className="ri-edit-line text-[15px]" />
        </Link>
        <Link
          href={`/workspace/investors/view?id=${investor.id}`}
          title="View investor"
          aria-label="View investor"
          className="flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center border border-[#080B0F]/15 text-[#080B0F]/70 transition-colors duration-300 hover:border-[#080B0F] hover:bg-[#080B0F] hover:text-[#F5F2EA]"
        >
          <i className="ri-arrow-right-line text-[15px]" />
        </Link>
      </div>
    </article>
  );
}