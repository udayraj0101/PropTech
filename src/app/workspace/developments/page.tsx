import BrokerShell from "@/components/broker/BrokerShell";
import BrokerDevelopmentsDirectory from "@/components/broker/BrokerDevelopmentsDirectory";

export const metadata = {
  title: "PROPTECH — Developments",
};

export default function BrokerDevelopmentsPage() {
  return (
    <BrokerShell>
      <BrokerDevelopmentsDirectory />
    </BrokerShell>
  );
}
