"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { resolveInvestor } from "../../lib/investorStore";
import { findInvestment, type Investment, type Investor } from "../../lib/investors";
import InvestmentDetail from "./InvestmentDetail";

export default function InvestmentDetailResolver() {
  const params = useSearchParams();
  const [state, setState] = useState<{ investor: Investor; investment: Investment } | null | undefined>(undefined);

  useEffect(() => {
    const investor = resolveInvestor(params.get("investor"));
    const investment = investor ? findInvestment(investor, params.get("investment")) : undefined;
    setState(investor && investment ? { investor, investment } : null);
  }, [params]);

  if (state === undefined) {
    return (
      <div className="flex min-h-[60vh] w-full items-center justify-center bg-[#F5F2EA]">
        <span className="text-[11px] uppercase tracking-[0.3em] text-[#080B0F]/40">Loading investment</span>
      </div>
    );
  }

  if (state === null) {
    return (
      <div className="flex min-h-[60vh] w-full flex-col items-center justify-center gap-5 bg-[#F5F2EA] text-center">
        <div className="text-[15px] text-[#080B0F]/70">This investment could not be found.</div>
        <Link
          href="/workspace/investors"
          className="cursor-pointer text-[11.5px] uppercase tracking-[0.18em] text-[#9A7433] transition-colors hover:text-[#080B0F]"
        >
          Back to investors
        </Link>
      </div>
    );
  }

  return <InvestmentDetail investor={state.investor} investment={state.investment} />;
}