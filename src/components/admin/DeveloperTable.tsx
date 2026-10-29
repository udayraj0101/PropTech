"use client";

import { developerInitials, developerStats, type DeveloperRecord } from "../../lib/developerData";
import DeveloperStatusBadge from "./DeveloperStatusBadge";
import DeveloperActions, { type DeveloperActionKey } from "./DeveloperActions";

const GRID = "grid-cols-[2.1fr_1.1fr_1fr_0.9fr_1fr_1.1fr_0.4fr]";

function Identity({ record }: { record: DeveloperRecord }) {
  return (
    <div className="flex items-center gap-4">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center border border-[#080B0F]/12 bg-[#F5F2EA] text-[12px] tracking-[0.06em] text-[#080B0F]/60">
        {developerInitials(record.name)}
      </span>
      <div className="min-w-0">
        <p className="text-[14px] font-medium leading-snug text-[#080B0F]">{record.name}</p>
        <p className="mt-0.5 text-[11px] tracking-[0.08em] text-[#080B0F]/40">{record.code || "No code"}</p>
      </div>
    </div>
  );
}

export default function DeveloperTable({
  rows,
  onAction,
}: {
  rows: DeveloperRecord[];
  onAction: (record: DeveloperRecord, key: DeveloperActionKey) => void;
}) {
  return (
    <div className="mt-8">
      <div className="hidden border border-[#080B0F]/12 bg-white lg:block">
        <div className={`grid ${GRID} gap-4 border-b border-[#080B0F]/12 px-6 py-4 text-[9.5px] uppercase tracking-[0.2em] text-[#080B0F]/40`}>
          <span>Developer</span>
          <span>Primary market</span>
          <span>Developments</span>
          <span>Active</span>
          <span>Status</span>
          <span>Last updated</span>
          <span className="text-right">Actions</span>
        </div>

        {rows.map((record) => {
          const stats = developerStats(record.name);
          return (
            <div key={record.id} className={`grid ${GRID} items-center gap-4 border-b border-[#080B0F]/8 px-6 py-5 last:border-b-0`}>
              <Identity record={record} />
              <span className="text-[12.5px] text-[#080B0F]/65">{record.market}</span>
              <span className="text-[14px] font-medium text-[#080B0F]">
                {stats.total} {stats.total === 1 ? "development" : "developments"}
              </span>
              <span className="text-[13px] text-[#080B0F]/65">{stats.active}</span>
              <DeveloperStatusBadge status={record.status} />
              <span className="text-[12px] text-[#080B0F]/55">{record.updated}</span>
              <DeveloperActions status={record.status} onSelect={(key) => onAction(record, key)} />
            </div>
          );
        })}
      </div>

      <div className="grid gap-4 lg:hidden">
        {rows.map((record) => {
          const stats = developerStats(record.name);
          return (
            <div key={record.id} className="border border-[#080B0F]/12 bg-white p-6">
              <div className="flex items-start justify-between gap-4">
                <Identity record={record} />
                <DeveloperActions status={record.status} onSelect={(key) => onAction(record, key)} />
              </div>
              <div className="mt-5 grid grid-cols-2 gap-4 border-t border-[#080B0F]/10 pt-5">
                <div>
                  <p className="text-[9.5px] uppercase tracking-[0.2em] text-[#080B0F]/40">Primary market</p>
                  <p className="mt-1.5 text-[13px] text-[#080B0F]/70">{record.market}</p>
                </div>
                <div>
                  <p className="text-[9.5px] uppercase tracking-[0.2em] text-[#080B0F]/40">Developments</p>
                  <p className="mt-1.5 text-[13px] text-[#080B0F]/70">
                    {stats.total} total · {stats.active} active
                  </p>
                </div>
              </div>
              <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2">
                <DeveloperStatusBadge status={record.status} />
                <span className="text-[11.5px] text-[#080B0F]/45">Updated {record.updated}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}