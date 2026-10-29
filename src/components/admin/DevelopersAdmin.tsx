"use client";

import { useMemo, useState } from "react";
import Display from "../ui/Display";
import Eyebrow from "../ui/Eyebrow";
import DeveloperToolbar, { emptyDevDirFilters, type DevDirFilters } from "./DeveloperToolbar";
import DeveloperTable from "./DeveloperTable";
import type { DeveloperActionKey } from "./DeveloperActions";
import DeveloperDrawer from "./DeveloperDrawer";
import AddDeveloperModal from "./AddDeveloperModal";
import DeveloperDetailModal from "./DeveloperDetailModal";
import {
  coverageFor,
  developerStats,
  seedDevelopers,
  type DeveloperRecord,
} from "../../lib/developerData";

export default function DevelopersAdmin() {
  const [records, setRecords] = useState<DeveloperRecord[]>(seedDevelopers);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState<DevDirFilters>(emptyDevDirFilters);
  const [viewing, setViewing] = useState<DeveloperRecord | null>(null);
  const [editing, setEditing] = useState<DeveloperRecord | null>(null);
  const [adding, setAdding] = useState(false);
  const [confirm, setConfirm] = useState<DeveloperRecord | null>(null);

  const active = useMemo(
    () => search.trim().length > 0 || JSON.stringify(filters) !== JSON.stringify(emptyDevDirFilters),
    [search, filters]
  );

  const rows = useMemo(() => {
    const q = search.trim().toLowerCase();
    return records.filter((dev) => {
      const coverage = coverageFor(dev.name);
      const haystack = [dev.name, dev.code, dev.market, ...coverage].join(" ").toLowerCase();
      if (q && !haystack.includes(q)) return false;

      if (filters.status !== "All" && dev.status !== filters.status) return false;

      if (filters.city === "Abu Dhabi" || filters.city === "Dubai") {
        if (!coverage.includes(filters.city) && dev.market !== filters.city) return false;
      }
      if (filters.city === "Other / Future") {
        if (coverage.length > 0 || dev.market !== "Other") return false;
      }

      const total = developerStats(dev.name).total;
      if (filters.count === "1+" && total < 1) return false;
      if (filters.count === "5+" && total < 5) return false;
      if (filters.count === "10+" && total < 10) return false;

      return true;
    });
  }, [records, search, filters]);

  function clearAll() {
    setSearch("");
    setFilters(emptyDevDirFilters);
  }

  function setStatus(record: DeveloperRecord, status: DeveloperRecord["status"]) {
    setRecords((list) => list.map((r) => (r.id === record.id ? { ...r, status, updated: "Just now" } : r)));
  }

  function handleAction(record: DeveloperRecord, key: DeveloperActionKey) {
    if (key === "view") setViewing(record);
    else if (key === "edit") setEditing(record);
    else if (key === "activate") setStatus(record, "Active");
    else if (key === "deactivate") {
      if (developerStats(record.name).active > 0) setConfirm(record);
      else setStatus(record, "Inactive");
    }
  }

  return (
    <div>
      <header className="border-b border-[#080B0F]/10 pb-10">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Eyebrow tone="gold">Admin Console</Eyebrow>
            <Display as="h1" className="mt-6 text-[34px] font-semibold leading-[1.05] tracking-[-0.03em] text-[#080B0F] md:text-[46px]">
              Developer Management
            </Display>
            <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-[#080B0F]/55">
              Manage developer records and their associated developments across PROPTECH.
            </p>
          </div>
          <button
            onClick={() => setAdding(true)}
            className="cursor-pointer whitespace-nowrap border border-[#080B0F] bg-[#080B0F] px-7 py-3.5 text-[11px] font-medium uppercase tracking-[0.18em] text-[#F5F2EA] transition-colors duration-300 hover:bg-[#C9A45C] hover:text-[#080B0F]"
          >
            + Add Developer
          </button>
        </div>

        <p className="mt-6 max-w-3xl border-l-2 border-[#C9A45C] pl-4 text-[13px] leading-relaxed text-[#080B0F]/50">
          Each development belongs to one developer record. Developers created here are available in the developer field
          when managing developments.
        </p>
      </header>

      <DeveloperToolbar
        search={search}
        onSearch={setSearch}
        filters={filters}
        onFilter={(patch) => setFilters((f) => ({ ...f, ...patch }))}
        active={active}
        onClear={clearAll}
      />

      <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2">
        <span className="text-[12px] uppercase tracking-[0.2em] text-[#080B0F]/45">
          {rows.length} of {records.length} developers
        </span>
        <span className="text-[12px] text-[#080B0F]/45">
          Active · in Broker experience &nbsp;|&nbsp; Inactive · hidden &nbsp;|&nbsp; Draft · not published
        </span>
      </div>

      {rows.length > 0 ? (
        <DeveloperTable rows={rows} onAction={handleAction} />
      ) : records.length === 0 ? (
        <div className="mt-8 border border-[#080B0F]/12 bg-white px-6 py-20 text-center">
          <i className="ri-building-2-line text-2xl text-[#080B0F]/30" />
          <p className="mt-4 text-[15px] text-[#080B0F]/60">No developer records yet</p>
          <button
            onClick={() => setAdding(true)}
            className="mt-5 cursor-pointer whitespace-nowrap border border-[#080B0F] bg-[#080B0F] px-6 py-3 text-[11px] font-medium uppercase tracking-[0.16em] text-[#F5F2EA] transition-colors duration-300 hover:bg-[#C9A45C] hover:text-[#080B0F]"
          >
            + Add Developer
          </button>
        </div>
      ) : (
        <div className="mt-8 border border-[#080B0F]/12 bg-white px-6 py-20 text-center">
          <i className="ri-search-eye-line text-2xl text-[#080B0F]/30" />
          <p className="mt-4 text-[15px] text-[#080B0F]/60">No developers found</p>
          <p className="mt-2 text-[13px] text-[#080B0F]/45">Try adjusting your search or filters.</p>
          <button
            onClick={clearAll}
            className="mt-5 cursor-pointer whitespace-nowrap border border-[#080B0F]/20 px-6 py-3 text-[11px] font-medium uppercase tracking-[0.16em] text-[#080B0F] transition-colors duration-300 hover:border-[#080B0F] hover:bg-[#080B0F] hover:text-[#F5F2EA]"
          >
            Clear Filters
          </button>
        </div>
      )}

      {viewing && (
        <DeveloperDrawer
          record={viewing}
          onClose={() => setViewing(null)}
          onEdit={() => {
            setEditing(viewing);
            setViewing(null);
          }}
        />
      )}

      {editing && (
        <DeveloperDetailModal
          record={editing}
          onClose={() => setEditing(null)}
          onSave={(updated) => {
            setRecords((list) => list.map((r) => (r.id === editing.id ? updated : r)));
            setEditing(updated);
          }}
        />
      )}

      {adding && (
        <AddDeveloperModal
          onClose={() => setAdding(false)}
          onCreate={(record) => {
            setRecords((list) => [...list, record]);
            setAdding(false);
          }}
        />
      )}

      {confirm && (
        <div className="fixed inset-0 z-[90] flex items-center justify-center px-6">
          <div className="absolute inset-0 cursor-pointer bg-[#080B0F]/45" onClick={() => setConfirm(null)} />
          <div className="relative w-full max-w-[460px] border border-[#080B0F]/12 bg-[#F5F2EA] p-9">
            <p className="text-[11px] uppercase tracking-[0.26em] text-[#C9A45C]">Confirm</p>
            <h3 className="mt-3 text-[22px] font-medium text-[#080B0F]" style={{ fontFamily: "var(--font-display)" }}>
              Deactivate Developer?
            </h3>
            <p className="mt-3 text-[13.5px] leading-relaxed text-[#080B0F]/55">
              This developer has active development records. Deactivating the developer will affect how these records are
              managed and displayed.
            </p>
            <div className="mt-8 flex justify-end gap-3">
              <button
                onClick={() => setConfirm(null)}
                className="cursor-pointer whitespace-nowrap border border-[#080B0F]/20 px-6 py-3 text-[11px] font-medium uppercase tracking-[0.16em] text-[#080B0F] transition-colors duration-300 hover:border-[#080B0F]"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setStatus(confirm, "Inactive");
                  setConfirm(null);
                }}
                className="cursor-pointer whitespace-nowrap border border-[#080B0F] bg-[#080B0F] px-6 py-3 text-[11px] font-medium uppercase tracking-[0.16em] text-[#F5F2EA] transition-colors duration-300 hover:bg-[#C9A45C] hover:text-[#080B0F]"
              >
                Deactivate
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}