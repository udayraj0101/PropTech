import { accessTone, type AccessStatus } from "../../../lib/brokers";

export default function AccessBadge({ access }: { access: AccessStatus }) {
  return (
    <span className={`inline-flex items-center gap-2 text-[11.5px] ${accessTone(access)}`}>
      <span className="h-1.5 w-1.5 rounded-full bg-current opacity-70" />
      {access}
    </span>
  );
}