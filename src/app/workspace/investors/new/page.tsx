import BrokerShell from "@/components/broker/BrokerShell";
import AddInvestorForm from "@/components/investor-management/AddInvestorForm";

export const metadata = {
  title: "PROPTECH — Add Investor",
};

export default function BrokerAddInvestorPage() {
  return (
    <BrokerShell>
      <AddInvestorForm />
    </BrokerShell>
  );
}
