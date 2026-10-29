import { Suspense } from "react";
import BrokerShell from "@/components/broker/BrokerShell";
import EditInvestorForm from "@/components/investor-management/EditInvestorForm";

export const metadata = {
  title: "PROPTECH — Edit Investor",
};

export default function BrokerEditInvestorPage() {
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
        <EditInvestorForm />
      </Suspense>
    </BrokerShell>
  );
}
