"use client";

import AdminSelect from "./AdminSelect";

export type DevFilters = {
  city: string;
  developer: string;
  status: string;
  availability: string;
  property: string;
};

export const emptyFilters: DevFilters = {
  city: "All",
  developer: "All developers",
  status: "All",
  availability: "All",
  property: "All",
};

export const CITY_OPTIONS = ["All", "Abu Dhabi", "Dubai"];
export const DEVELOPER_OPTIONS = ["All developers", "ALDAR", "MODON", "EAGLE HILLS", "AL AIN HOLDING"];
export const STATUS_OPTIONS = ["All", "Active", "Inactive", "Draft"];
export const AVAILABILITY_OPTIONS = ["All", "Available", "Limited Availability", "No Current Availability"];
export const PROPERTY_OPTIONS = ["All", "Apartments", "Villas", "Townhouses", "Other"];

export default function DevelopmentFilters({
  search,
  onSearch,
  filters,
  onFilter,
  active,
  onClear,
}: {
  search: string;
  onSearch: (v: string) => void;
  filters: DevFilters;
  onFilter: (patch: Partial<DevFilters>) => void;
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
          placeholder="Search developments..."
          className="w-full border border-[#080B0F]/15 bg-white py-3.5 pl-11 pr-4 text-[14px] text-[#080B0F] placeholder-[#080B0F]/30 outline-none transition-colors duration-300 focus:border-[#C9A45C]"
        />
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        <AdminSelect label="City" value={filters.city} options={CITY_OPTIONS} onChange={(v) => onFilter({ city: v })} />
        <AdminSelect
          label="Developer"
          value={filters.developer}
          options={DEVELOPER_OPTIONS}
          onChange={(v) => onFilter({ developer: v })}
        />
        <AdminSelect
          label="Status"
          value={filters.status}
          options={STATUS_OPTIONS}
          onChange={(v) => onFilter({ status: v })}
        />
        <AdminSelect
          label="Availability"
          value={filters.availability}
          options={AVAILABILITY_OPTIONS}
          onChange={(v) => onFilter({ availability: v })}
        />
        <AdminSelect
          label="Property type"
          value={filters.property}
          options={PROPERTY_OPTIONS}
          onChange={(v) => onFilter({ property: v })}
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