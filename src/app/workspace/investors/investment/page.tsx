import { Suspense } from "react";
import BrokerShell from "@/components/broker/BrokerShell";
import AddInvestmentForm from "@/components/investor-management/AddInvestmentForm";

export const metadata = {
  title: "PROPTECH — Add Investment",
};

export default function BrokerAddInvestmentPage() {
  return (
    <BrokerShell>
      <Suspense
        fallback={
          <div className="flex min-h-[60vh] w-full items-center justify-center">
            <span className="text-[11px] uppercase tracking-[0.3em] text-[#080B0F]/40">
              Loading
            </span>
          </div>
        }
      >
        <AddInvestmentForm />
      </Suspense>
    </BrokerShell>
  );
}
