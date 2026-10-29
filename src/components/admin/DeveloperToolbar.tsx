"use client";

import AdminSelect from "./AdminSelect";

export type DevDirFilters = {
  status: string;
  city: string;
  count: string;
};

export const emptyDevDirFilters: DevDirFilters = { status: "All", city: "All", count: "Any" };

export const STATUS_FILTERS = ["All", "Active", "Inactive", "Draft"];
export const CITY_FILTERS = ["All", "Abu Dhabi", "Dubai", "Other / Future"];
export const COUNT_FILTERS = ["Any", "1+", "5+", "10+"];

export default function DeveloperToolbar({
  search,
  onSearch,
  filters,
  onFilter,
  active,
  onClear,
}: {
  search: string;
  onSearch: (v: string) => void;
  filters: DevDirFilters;
  onFilter: (patch: Partial<DevDirFilters>) => void;
  active: boolean;
  onClear: () => void;
}) {
  return (
    <div className="mt-10">
      <div className="relative">
        <i className="ri-search-line pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#080B0F]/40" />
        <input
          value={search}
          onChange={(e) => onSearch(e.target.value)}
          placeholder="Search developers..."
          className="w-full border border-[#080B0F]/15 bg-white py-3.5 pl-11 pr-4 text-[14px] text-[#080B0F] placeholder-[#080B0F]/30 outline-none transition-colors duration-300 focus:border-[#C9A45C]"
        />
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        <AdminSelect
          label="Status"
          value={filters.status}
          options={STATUS_FILTERS}
          onChange={(v) => onFilter({ status: v })}
        />
        <AdminSelect
          label="City / Coverage"
          value={filters.city}
          options={CITY_FILTERS}
          onChange={(v) => onFilter({ city: v })}
        />
        <AdminSelect
          label="Development count"
          value={filters.count}
          options={COUNT_FILTERS}
          onChange={(v) => onFilter({ count: v })}
        />
      </div>

      {active && (
        <button
          onClick={onClear}
          className="mt-4 inline-flex cursor-pointer items-center gap-2 text-[12.5px] text-[#080B0F]/55 transition-colors duration-300 hover:text-[#C9A45C]"
        >
          <i className="ri-close-circle-line" />
          Clear Filters
        </button>
      )}
    </div>
  );
}