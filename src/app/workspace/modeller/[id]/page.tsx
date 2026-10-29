import BrokerShell from "@/components/broker/BrokerShell";
import BrokerModeller from "@/components/broker/BrokerModeller";

export const metadata = {
  title: "PROPTECH — Investment Modeller",
};

export default async function BrokerModellerPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <BrokerShell>
      <BrokerModeller id={id} />
    </BrokerShell>
  );
}
