import type { DeveloperStatus } from "../../lib/developerData";

const tone: Record<DeveloperStatus, string> = {
  Active: "text-[#3F5C4E]",
  Inactive: "text-[#96604C]",
  Draft: "text-[#080B0F]/45",
};

const dot: Record<DeveloperStatus, string> = {
  Active: "bg-[#4F6F5F]",
  Inactive: "bg-[#A5745F]",
  Draft: "bg-[#080B0F]/30",
};

export default function DeveloperStatusBadge({ status }: { status: DeveloperStatus }) {
  return (
    <span className={`flex items-center gap-2 text-[12px] font-medium ${tone[status]}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${dot[status]}`} />
      {status}
    </span>
  );
}