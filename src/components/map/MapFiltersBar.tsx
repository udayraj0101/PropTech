"use client";

import type { ReactNode } from "react";

/**
 * Reelly-style horizontal filter chip row. Chips are purely visual at
 * the moment — Reelly's project list doesn't surface the taxonomy for
 * each filter (district / company / payments / handover / etc.) in a
 * stable shape yet. We expose search + developer + price via real state,
 * and keep the rest as placeholders so the layout matches the reference
 * screenshot. Wiring more filters is a type-level change once Reelly
 * exposes the vocab reliably.
 */
export type MapFilters = {
  search: string;
  developer: string;
  price: string;
};

export const EMPTY_MAP_FILTERS: MapFilters = {
  search: "",
  developer: "All",
  price: "All",
};

function Chip({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      suppressHydrationWarning
      className="flex cursor-pointer items-center gap-2 whitespace-nowrap border border-[#080B0F]/12 bg-white px-4 py-2.5 text-[12.5px] text-[#080B0F]/70 transition-colors duration-300 hover:border-[#080B0F]/35 hover:text-[#080B0F]"
    >
      <span className="text-[#080B0F]/50">{label}</span>
      <span className="font-medium text-[#080B0F]">{children}</span>
      <i className="ri-arrow-down-s-line text-[14px] text-[#080B0F]/40" />
    </button>
  );
}

export default function MapFiltersBar({
  filters,
  developerOptions,
  onChange,
  resultCount,
}: {
  filters: MapFilters;
  developerOptions: string[];
  onChange: (patch: Partial<MapFilters>) => void;
  resultCount: number;
}) {
  return (
    <div className="flex flex-col gap-4 border-b border-[#080B0F]/10 bg-[#F5F2EA] px-6 py-4 md:px-10">
      <div className="flex flex-wrap items-center gap-2.5">
        <div className="relative flex-1 min-w-[260px] max-w-[480px]">
          <i className="ri-search-line pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[14px] text-[#080B0F]/40" />
          <input
            value={filters.search}
            onChange={(e) => onChange({ search: e.target.value })}
            placeholder="Search & filters"
            suppressHydrationWarning
            className="w-full border border-[#080B0F]/12 bg-white py-2.5 pl-10 pr-4 text-[13px] text-[#080B0F] placeholder-[#080B0F]/35 outline-none transition-colors duration-300 focus:border-[#C9A45C]"
          />
        </div>

        <Chip label="District">All</Chip>

        <div className="relative">
          <select
            value={filters.developer}
            onChange={(e) => onChange({ developer: e.target.value })}
            suppressHydrationWarning
            className="cursor-pointer appearance-none border border-[#080B0F]/12 bg-white py-2.5 pl-4 pr-10 text-[12.5px] font-medium text-[#080B0F] transition-colors duration-300 hover:border-[#080B0F]/35 focus:outline-none focus:border-[#C9A45C]"
          >
            {developerOptions.map((d) => (
              <option key={d} value={d}>
                {d === "All" ? "Company · All" : `Company · ${d}`}
              </option>
            ))}
          </select>
          <i className="ri-arrow-down-s-line pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[14px] text-[#080B0F]/40" />
        </div>

        <div className="relative">
          <select
            value={filters.price}
            onChange={(e) => onChange({ price: e.target.value })}
            suppressHydrationWarning
            className="cursor-pointer appearance-none border border-[#080B0F]/12 bg-white py-2.5 pl-4 pr-10 text-[12.5px] font-medium text-[#080B0F] transition-colors duration-300 hover:border-[#080B0F]/35 focus:outline-none focus:border-[#C9A45C]"
          >
            {["All", "Under AED 2M", "AED 2M – 4M", "AED 4M+"].map((p) => (
              <option key={p} value={p}>
                {p === "All" ? "Price · All" : `Price · ${p}`}
              </option>
            ))}
          </select>
          <i className="ri-arrow-down-s-line pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[14px] text-[#080B0F]/40" />
        </div>

        <Chip label="Payments">All</Chip>
        <Chip label="Handover">Any</Chip>
        <Chip label="Unit type">All</Chip>
        <Chip label="Bedrooms">Any</Chip>
        <Chip label="Status">All</Chip>
      </div>

      <div className="flex items-center justify-between text-[11.5px] text-[#080B0F]/50">
        <span>
          {resultCount} {resultCount === 1 ? "project" : "projects"} · live from Reelly
        </span>
        <span className="hidden md:inline">Dubai · Abu Dhabi · UAE</span>
      </div>
    </div>
  );
}
