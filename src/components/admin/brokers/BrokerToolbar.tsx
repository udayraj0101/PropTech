"use client";

import FilterMenu from "../shared/FilterMenu";
import { ACCESS_STATUSES, BROKER_STATUSES, companyOptions } from "../../../lib/brokers";

export type BrokerFilters = {
  status: string;
  company: string;
  access: string;
  activity: string;
};

export const defaultBrokerFilters: BrokerFilters = {
  status: "All",
  company: "All",
  access: "All",
  activity: "All",
};

export default function BrokerToolbar({
  search,
  onSearch,
  filters,
  onFilter,
  onClear,
}: {
  search: string;
  onSearch: (v: string) => void;
  filters: BrokerFilters;
  onFilter: (key: keyof BrokerFilters, value: string) => void;
  onClear: () => void;
}) {
  const activeCount = Object.values(filters).filter((v) => v !== "All").length;

  return (
    <div className="border border-[#080B0F]/12 bg-white">
      <div className="flex flex-col gap-4 p-5 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex w-full items-center gap-3 border border-[#080B0F]/12 px-4 py-2.5 lg:max-w-[400px]">
          <span className="flex h-4 w-4 items-center justify-center">
            <i className="ri-search-line text-[15px] text-[#080B0F]/40" />
          </span>
          <input
            value={search}
            onChange={(e) => onSearch(e.target.value)}
            placeholder="Search brokers…"
            className="w-full bg-transparent text-[13px] text-[#080B0F] placeholder:text-[#080B0F]/35 focus:outline-none"
          />
          {search && (
            <button type="button" onClick={() => onSearch("")} className="flex h-4 w-4 cursor-pointer items-center justify-center">
              <i className="ri-close-line text-[15px] text-[#080B0F]/40" />
            </button>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <FilterMenu label="Status" value={filters.status} options={BROKER_STATUSES} onChange={(v) => onFilter("status", v)} />
          <FilterMenu
            label="Brokerage"
            value={filters.company}
            options={companyOptions}
            onChange={(v) => onFilter("company", v)}
            width="w-[260px]"
          />
          <FilterMenu label="Access" value={filters.access} options={ACCESS_STATUSES} onChange={(v) => onFilter("access", v)} />
          <FilterMenu
            label="Last Activity"
            value={filters.activity}
            options={["Recent", "Older", "Never Logged In"]}
            onChange={(v) => onFilter("activity", v)}
          />
          <button
            type="button"
            onClick={onClear}
            className="whitespace-nowrap cursor-pointer px-2 py-2.5 text-[12px] text-[#080B0F]/45 underline decoration-[#080B0F]/20 underline-offset-4 transition-colors duration-300 hover:text-[#080B0F]"
          >
            Clear Filters{activeCount > 0 ? ` (${activeCount})` : ""}
          </button>
        </div>
      </div>
    </div>
  );
}