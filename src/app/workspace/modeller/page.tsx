import BrokerShell from "@/components/broker/BrokerShell";
import BrokerModellerIndex from "@/components/broker/BrokerModellerIndex";

export const metadata = {
  title: "PROPTECH — Investment Modeller",
};

export default function BrokerModellerIndexPage() {
  return (
    <BrokerShell>
      <BrokerModellerIndex />
    </BrokerShell>
  );
}
