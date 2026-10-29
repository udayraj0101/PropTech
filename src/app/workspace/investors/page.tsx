import BrokerShell from "@/components/broker/BrokerShell";
import InvestorManagement from "@/components/investor-management/InvestorManagement";

export const metadata = {
  title: "PROPTECH — Investor Management",
};

export default function BrokerInvestorsPage() {
  return (
    <BrokerShell>
      <InvestorManagement />
    </BrokerShell>
  );
}
