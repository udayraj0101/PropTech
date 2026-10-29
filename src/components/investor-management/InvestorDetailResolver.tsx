"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { resolveInvestor } from "../../lib/investorStore";
import type { Investor } from "../../lib/investors";
import InvestorDetail from "./InvestorDetail";

export default function InvestorDetailResolver() {
  const params = useSearchParams();
  const [investor, setInvestor] = useState<Investor | null | undefined>(undefined);

  useEffect(() => {
    setInvestor(resolveInvestor(params.get("id")) ?? null);
  }, [params]);

  if (investor === undefined) {
    return (
      <div className="flex min-h-[60vh] w-full items-center justify-center bg-[#F5F2EA]">
        <span className="text-[11px] uppercase tracking-[0.3em] text-[#080B0F]/40">Loading investor</span>
      </div>
    );
  }

  if (investor === null) {
    return (
      <div className="flex min-h-[60vh] w-full flex-col items-center justify-center gap-5 bg-[#F5F2EA] text-center">
        <div className="text-[15px] text-[#080B0F]/70">This investor could not be found.</div>
        <Link
          href="/workspace/investors"
          className="cursor-pointer text-[11.5px] uppercase tracking-[0.18em] text-[#9A7433] transition-colors hover:text-[#080B0F]"
        >
          Back to investors
        </Link>
      </div>
    );
  }

  return <InvestorDetail investor={investor} />;
}