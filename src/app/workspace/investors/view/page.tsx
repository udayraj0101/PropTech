import { Suspense } from "react";
import BrokerShell from "@/components/broker/BrokerShell";
import InvestorDetailResolver from "@/components/investor-management/InvestorDetailResolver";

export const metadata = {
  title: "PROPTECH — Investor",
};

export default function BrokerInvestorViewPage() {
  return (
    <BrokerShell>
      <Suspense
        fallback={
          <div className="flex min-h-[60vh] w-full items-center justify-center">
            <span className="text-[11px] uppercase tracking-[0.3em] text-[#080B0F]/40">
              Loading investor
            </span>
          </div>
        }
      >
        <InvestorDetailResolver />
      </Suspense>
    </BrokerShell>
  );
}
