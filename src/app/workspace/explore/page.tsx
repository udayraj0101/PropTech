import BrokerShell from "@/components/broker/BrokerShell";
import MapExplorer from "@/components/map/MapExplorer";

export const metadata = {
  title: "PROPTECH — Explore Developments",
};

export default function BrokerExplorePage() {
  return (
    <BrokerShell bleed>
      <MapExplorer detailBase="/workspace/developments" />
    </BrokerShell>
  );
}
