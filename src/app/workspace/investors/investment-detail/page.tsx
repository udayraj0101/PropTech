import { Suspense } from "react";
import BrokerShell from "@/components/broker/BrokerShell";
import InvestmentDetailResolver from "@/components/investor-management/InvestmentDetailResolver";

export const metadata = {
  title: "PROPTECH — Investment",
};

export default function BrokerInvestmentDetailPage() {
  return (
    <BrokerShell>
      <Suspense
        fallback={
          <div className="flex min-h-[60vh] w-full items-center justify-center">
            <span className="text-[11px] uppercase tracking-[0.3em] text-[#080B0F]/40">
              Loading investment
            </span>
          </div>
        }
      >
        <InvestmentDetailResolver />
      </Suspense>
    </BrokerShell>
  );
}
