"use client";

import { aedCompact, type Development } from "../../lib/developments";
import { availabilityState, devStatus, devUpdated, type DevStatus } from "../../lib/adminData";
import RowActions, { type RowActionKey } from "./RowActions";

const GRID = "grid-cols-[2fr_1.5fr_0.9fr_0.9fr_1.1fr_1.1fr_0.8fr_0.9fr_0.4fr]";

function StatusBadge({ status }: { status: DevStatus }) {
  const map: Record<DevStatus, string> = {
    Active: "text-[#3F5C4E]",
    Inactive: "text-[#080B0F]/45",
    Draft: "text-[#8A6A34]",
  };
  const dot: Record<DevStatus, string> = {
    Active: "bg-[#4F6F5F]",
    Inactive: "bg-[#080B0F]/30",
    Draft: "bg-[#B08A4A]",
  };
  return (
    <span className={`flex items-center gap-2 text-[12px] font-medium ${map[status]}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${dot[status]}`} />
      {status}
    </span>
  );
}

function AvailBadge({ state }: { state: string }) {
  const limited = state === "Limited Availability";
  const none = state === "No Current Availability";
  return (
    <span className={`flex items-center gap-2 text-[12px] ${none ? "text-[#080B0F]/40" : limited ? "text-[#8A6A34]" : "text-[#3F5C4E]"}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${none ? "bg-[#080B0F]/25" : limited ? "bg-[#B08A4A]" : "bg-[#4F6F5F]"}`} />
      {none ? "No Current Availability" : limited ? "Limited Availability" : "Available"}
    </span>
  );
}

export default function DevelopmentTable({
  rows,
  statuses,
  onAction,
}: {
  rows: Development[];
  statuses: Record<string, DevStatus>;
  onAction: (dev: Development, key: RowActionKey) => void;
}) {
  const statusOf = (d: Development) => statuses[d.id] ?? devStatus(d.id);

  return (
    <div className="mt-8">
      <div className="hidden border border-[#080B0F]/12 bg-white lg:block">
        <div className={`grid ${GRID} gap-4 border-b border-[#080B0F]/12 px-6 py-4 text-[9.5px] uppercase tracking-[0.2em] text-[#080B0F]/40`}>
          <span>Development</span>
          <span>Location</span>
          <span>Type</span>
          <span>Starting</span>
          <span>Current available</span>
          <span>Availability</span>
          <span>Status</span>
          <span>Updated</span>
          <span className="text-right">Actions</span>
        </div>

        {rows.map((d) => (
          <div key={d.id} className={`grid ${GRID} items-center gap-4 border-b border-[#080B0F]/8 px-6 py-5 last:border-b-0`}>
            <div className="min-w-0">
              <p className="text-[14px] font-medium leading-snug text-[#080B0F]">{d.name}</p>
              <p className="mt-1 text-[11.5px] tracking-[0.08em] text-[#080B0F]/45">{d.developer}</p>
            </div>
            <div className="min-w-0">
              <p className="text-[12.5px] leading-snug text-[#080B0F]/65">{d.area}, {d.city}</p>
              <p className="mt-1 text-[11.5px] text-[#080B0F]/40">Handover {d.completion}</p>
            </div>
            <span className="text-[12.5px] text-[#080B0F]/65">{d.type}</span>
            <span className="text-[13px] text-[#080B0F]/40">
              <span className="mr-1 text-[10px] uppercase tracking-[0.14em]">From</span>
              {aedCompact(d.startingPrice)}
            </span>
            <span className="text-[14.5px] font-medium text-[#080B0F]">{aedCompact(d.availablePrice)}</span>
            <AvailBadge state={availabilityState(d)} />
            <StatusBadge status={statusOf(d)} />
            <span className="text-[12px] text-[#080B0F]/55">{devUpdated(d.id)}</span>
            <RowActions isActive={statusOf(d) === "Active"} onSelect={(key) => onAction(d, key)} />
          </div>
        ))}
      </div>

      <div className="grid gap-4 lg:hidden">
        {rows.map((d) => (
          <div key={d.id} className="border border-[#080B0F]/12 bg-white p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[15px] font-medium text-[#080B0F]">{d.name}</p>
                <p className="mt-1 text-[11.5px] tracking-[0.08em] text-[#080B0F]/45">{d.developer}</p>
              </div>
              <RowActions isActive={statusOf(d) === "Active"} onSelect={(key) => onAction(d, key)} />
            </div>
            <p className="mt-4 text-[12.5px] text-[#080B0F]/60">{d.area}, {d.city} · {d.type}</p>
            <div className="mt-5 grid grid-cols-2 gap-4 border-t border-[#080B0F]/10 pt-5">
              <div>
                <p className="text-[9.5px] uppercase tracking-[0.2em] text-[#080B0F]/40">Starting</p>
                <p className="mt-1.5 text-[13px] text-[#080B0F]/40">{aedCompact(d.startingPrice)}</p>
              </div>
              <div>
                <p className="text-[9.5px] uppercase tracking-[0.2em] text-[#080B0F]/40">Current available</p>
                <p className="mt-1.5 text-[14px] font-medium text-[#080B0F]">{aedCompact(d.availablePrice)}</p>
              </div>
            </div>
            <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2">
              <AvailBadge state={availabilityState(d)} />
              <StatusBadge status={statusOf(d)} />
              <span className="text-[11.5px] text-[#080B0F]/45">Updated {devUpdated(d.id)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}