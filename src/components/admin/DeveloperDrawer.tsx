"use client";

import { useRouter } from "next/navigation";
import { developerInitials, developerStats, type DeveloperRecord } from "../../lib/developerData";
import DeveloperStatusBadge from "./DeveloperStatusBadge";
import DeveloperDevelopmentsList from "./DeveloperDevelopmentsList";

export default function DeveloperDrawer({
  record,
  onClose,
  onEdit,
}: {
  record: DeveloperRecord;
  onClose: () => void;
  onEdit: () => void;
}) {
  const router = useRouter();
  const stats = developerStats(record.name);

  return (
    <div className="fixed inset-0 z-[70] flex justify-end">
      <div className="absolute inset-0 cursor-pointer bg-[#080B0F]/45" onClick={onClose} />

      <aside className="relative flex h-full w-full max-w-[560px] flex-col border-l border-[#080B0F]/12 bg-[#F5F2EA]">
        <header className="flex items-start justify-between gap-4 border-b border-[#080B0F]/12 px-7 py-6">
          <div className="flex items-center gap-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center border border-[#080B0F]/12 bg-white text-[14px] tracking-[0.06em] text-[#080B0F]/60">
              {developerInitials(record.name)}
            </span>
            <div>
              <p className="text-[10px] uppercase tracking-[0.24em] text-[#C9A45C]">Developer record</p>
              <h2 className="mt-1.5 text-[21px] font-medium text-[#080B0F]" style={{ fontFamily: "var(--font-display)" }}>
                {record.name}
              </h2>
              <div className="mt-2 flex items-center gap-4">
                <DeveloperStatusBadge status={record.status} />
                <span className="text-[11.5px] text-[#080B0F]/50">{record.market}</span>
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="flex h-8 w-8 cursor-pointer items-center justify-center text-[#080B0F]/45 transition-colors duration-300 hover:text-[#080B0F]"
          >
            <i className="ri-close-line text-xl" />
          </button>
        </header>

        <div className="flex-1 overflow-y-auto px-7 py-7">
          <div className="grid grid-cols-2 gap-px border border-[#080B0F]/12 bg-[#080B0F]/12">
            <div className="bg-white px-5 py-4">
              <p className="text-[9.5px] uppercase tracking-[0.22em] text-[#080B0F]/40">Developments</p>
              <p className="mt-2 text-[20px] font-medium text-[#080B0F]" style={{ fontFamily: "var(--font-display)" }}>
                {stats.total}
              </p>
            </div>
            <div className="bg-white px-5 py-4">
              <p className="text-[9.5px] uppercase tracking-[0.22em] text-[#080B0F]/40">Active</p>
              <p className="mt-2 text-[20px] font-medium text-[#080B0F]" style={{ fontFamily: "var(--font-display)" }}>
                {stats.active}
              </p>
            </div>
          </div>

          <p className="mt-8 text-[10px] uppercase tracking-[0.26em] text-[#C9A45C]">Associated Developments</p>
          <div className="mt-4">
            <DeveloperDevelopmentsList developer={record.name} compact />
          </div>

          {record.description && (
            <>
              <p className="mt-8 text-[10px] uppercase tracking-[0.26em] text-[#C9A45C]">Overview</p>
              <p className="mt-3 text-[13px] leading-relaxed text-[#080B0F]/60">{record.description}</p>
            </>
          )}
        </div>

        <footer className="flex items-center justify-between gap-3 border-t border-[#080B0F]/12 px-7 py-5">
          <button
            onClick={onEdit}
            className="cursor-pointer whitespace-nowrap border border-[#080B0F]/20 px-6 py-3 text-[10.5px] font-medium uppercase tracking-[0.16em] text-[#080B0F] transition-colors duration-300 hover:border-[#080B0F]"
          >
            Edit Developer
          </button>
          <button
            onClick={() => router.push(`/admin/developments?developer=${encodeURIComponent(record.name)}`)}
            className="cursor-pointer whitespace-nowrap border border-[#080B0F] bg-[#080B0F] px-6 py-3 text-[10.5px] font-medium uppercase tracking-[0.16em] text-[#F5F2EA] transition-colors duration-300 hover:bg-[#C9A45C] hover:text-[#080B0F]"
          >
            View All Developments
          </button>
        </footer>
      </aside>
    </div>
  );
}