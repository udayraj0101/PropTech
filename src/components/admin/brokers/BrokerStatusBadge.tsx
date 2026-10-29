import { brokerStatusDot, brokerStatusTone, type BrokerStatus } from "../../../lib/brokers";

export default function BrokerStatusBadge({ status }: { status: BrokerStatus }) {
  return (
    <span className={`inline-flex items-center gap-2 text-[11.5px] ${brokerStatusTone(status)}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${brokerStatusDot(status)}`} />
      {status}
    </span>
  );
}