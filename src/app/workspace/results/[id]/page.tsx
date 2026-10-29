import BrokerShell from "@/components/broker/BrokerShell";
import BrokerResults from "@/components/broker/BrokerResults";

export const metadata = {
  title: "PROPTECH — Investment Results",
};

export default async function BrokerResultsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <BrokerShell>
      <BrokerResults id={id} />
    </BrokerShell>
  );
}
