import { Suspense } from "react";
import BrokerShell from "@/components/broker/BrokerShell";
import EditInvestmentForm from "@/components/investor-management/EditInvestmentForm";

export const metadata = {
  title: "PROPTECH — Edit Investment",
};

export default function BrokerEditInvestmentPage() {
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
        <EditInvestmentForm />
      </Suspense>
    </BrokerShell>
  );
}
