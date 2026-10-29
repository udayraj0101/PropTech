"use client";

import { useState } from "react";
import styles from "../ui/arch.module.css";

type Dev = {
  id: string;
  name: string;
  developer: string;
  area: string;
  asset: string;
  x: number;
  y: number;
  from: string;
  yield: string;
  completion: string;
  status: string;
};

const items: Dev[] = [
  { id: "bateen", name: "Marsa Al Bateen", developer: "Eagle Hills", area: "Al Bateen", asset: "Apartment", x: 24, y: 34, from: "AED 3.80M", yield: "4.6%", completion: "Q1 2027", status: "Under construction" },
  { id: "saadiyat", name: "Saadiyat Reserve", developer: "Aldar", area: "Saadiyat Island", asset: "Villa", x: 36, y: 51, from: "AED 5.40M", yield: "5.1%", completion: "Q4 2028", status: "Selling" },
  { id: "reem", name: "Reem Hills", developer: "Modon", area: "Al Reem Island", asset: "Apartment", x: 61, y: 39, from: "AED 1.55M", yield: "6.8%", completion: "Q3 2027", status: "Selling" },
  { id: "yas", name: "Yas Vista", developer: "Aldar", area: "Yas Island", asset: "Apartment", x: 50, y: 68, from: "AED 2.20M", yield: "6.2%", completion: "Q2 2028", status: "Launched" },
  { id: "maryah", name: "Al Maryah Crest", developer: "Aldar", area: "Al Maryah Island", asset: "Apartment", x: 57, y: 26, from: "AED 4.10M", yield: "5.4%", completion: "Q1 2029", status: "Planning" },
  { id: "ghantoot", name: "Ghantoot Coastal", developer: "Eagle Hills", area: "Ghantoot", asset: "Villa", x: 17, y: 64, from: "AED 7.20M", yield: "4.2%", completion: "Q4 2029", status: "Planning" },
  { id: "khalifa", name: "Khalifa Quarter", developer: "Al Ain Holding", area: "Khalifa City", asset: "Townhouse", x: 75, y: 58, from: "AED 1.90M", yield: "6.5%", completion: "Q2 2027", status: "Selling" },
  { id: "raha", name: "Al Raha Gardens", developer: "Aldar", area: "Al Raha", asset: "Townhouse", x: 71, y: 27, from: "AED 2.60M", yield: "5.9%", completion: "Q3 2028", status: "Under construction" },
  { id: "downtown", name: "Boulevard Heights", developer: "Eagle Hills", area: "Downtown Dubai", asset: "Apartment", x: 85, y: 45, from: "AED 2.85M", yield: "6.0%", completion: "Q4 2027", status: "Selling" },
  { id: "ain", name: "Al Ain Gardens", developer: "Al Ain Holding", area: "Al Ain", asset: "Villa", x: 89, y: 67, from: "AED 1.65M", yield: "6.4%", completion: "Q1 2028", status: "Launched" },
];

const statusTone: Record<string, string> = {
  Selling: "#C9A45C",
  Launched: "#2F7D63",
  "Under construction": "#5A6068",
  Planning: "#A7ABB0",
};

const groups = [
  { key: "developer", label: "Developer" },
  { key: "area", label: "Area" },
  { key: "asset", label: "Asset class" },
  { key: "status", label: "Status" },
] as const;

type FilterKey = (typeof groups)[number]["key"];

export default function DevMap() {
  const [sel, setSel] = useState<Record<FilterKey, string>>({
    developer: "All",
    area: "All",
    asset: "All",
    status: "All",
  });
  const [activeId, setActiveId] = useState("saadiyat");

  const filtered = items.filter(
    (d) =>
      (sel.developer === "All" || d.developer === sel.developer) &&
      (sel.area === "All" || d.area === sel.area) &&
      (sel.asset === "All" || d.asset === sel.asset) &&
      (sel.status === "All" || d.status === sel.status)
  );
  const current = filtered.find((d) => d.id === activeId) || filtered[0] || null;
  const isFiltered = groups.some((g) => sel[g.key] !== "All");

  const optionsFor = (key: FilterKey) => ["All", ...Array.from(new Set(items.map((i) => i[key])))];

  return (
    <div className="border border-[#080B0F]/10 bg-[#F5F2EA]">
      <div className="flex flex-col divide-y divide-[#080B0F]/10 border-b border-[#080B0F]/10 lg:flex-row lg:divide-x lg:divide-y-0">
        {groups.map((g) => (
          <div key={g.key} className="flex-1 px-5 py-5">
            <span className="text-[11px] uppercase tracking-[0.2em] text-[#080B0F]/45">{g.label}</span>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {optionsFor(g.key).map((o) => {
                const on = sel[g.key] === o;
                return (
                  <button
                    key={o}
                    onClick={() =>
                      setSel((s) => ({ ...s, [g.key]: o } as Record<FilterKey, string>))
                    }
                    suppressHydrationWarning
                    className={`cursor-pointer px-3 py-1.5 text-[11.5px] transition-colors duration-300 ${
                      on
                        ? "bg-[#080B0F] text-[#F5F2EA]"
                        : "border border-[#080B0F]/15 text-[#080B0F]/60 hover:border-[#080B0F]/40 hover:text-[#080B0F]"
                    }`}
                  >
                    {o}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between px-5 py-3.5">
        <span className="text-[11.5px] text-[#080B0F]/50">
          {filtered.length} of {items.length} developments
        </span>
        {isFiltered && (
          <button
            onClick={() => setSel({ developer: "All", area: "All", asset: "All", status: "All" })}
            suppressHydrationWarning
            className="cursor-pointer text-[11.5px] text-[#080B0F]/50 transition-colors hover:text-[#C9A45C]"
          >
            Clear filters
          </button>
        )}
      </div>

      <div className="relative h-[600px] overflow-hidden border-t border-[#080B0F]/10 bg-[#EDE9E0]">
        <img
          suppressHydrationWarning
          src="https://readdy.ai/api/search-image?query=Minimalist%20ivory%20map%20of%20a%20coastal%20island%20metropolis%20seen%20from%20directly%20above%2C%20fine%20pale%20grey%20street%20lines%20and%20soft%20water%20channels%2C%20elegant%20editorial%20cartography%20with%20muted%20beige%20tones%2C%20no%20text%20or%20labels%2C%20high-end%20architectural%20atlas%20aesthetic&width=1200&height=900&seq=proptech-map-01&orientation=landscape"
          alt="UAE development map"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#F5F2EA]/60 via-transparent to-[#F5F2EA]/20" />

        {filtered.map((d) => {
          const on = current?.id === d.id;
          const tone = statusTone[d.status];
          return (
            <button
              key={d.id}
              onMouseEnter={() => setActiveId(d.id)}
              onFocus={() => setActiveId(d.id)}
              onClick={() => setActiveId(d.id)}
              aria-label={d.name}
              suppressHydrationWarning
              className="absolute z-10 -translate-x-1/2 -translate-y-1/2 cursor-pointer"
              style={{ left: `${d.x}%`, top: `${d.y}%` }}
            >
              <span className="relative flex h-4 w-4 items-center justify-center">
                <span
                  className={`absolute h-11 w-11 rounded-full border ${on ? styles.pulse : ""}`}
                  style={{ borderColor: tone, opacity: on ? undefined : 0.22 }}
                />
                <span
                  className="h-3.5 w-3.5 rounded-full border-2 transition-all duration-300"
                  style={{
                    borderColor: tone,
                    backgroundColor: on ? tone : "#F5F2EA",
                    transform: on ? "scale(1.14)" : "scale(1)",
                  }}
                />
              </span>
            </button>
          );
        })}

        {filtered.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="border border-[#080B0F]/12 bg-[#F5F2EA]/95 px-6 py-4 text-[13px] text-[#080B0F]/60">
              No developments match this combination of filters.
            </span>
          </div>
        )}

        {current && (
          <div
            className="pointer-events-none absolute z-30 hidden w-[290px] sm:block"
            style={{ left: `${current.x}%`, top: `${current.y}%` }}
          >
            <div
              className={`pointer-events-auto border border-[#080B0F]/12 bg-white/97 shadow-[0_30px_70px_-28px_rgba(8,11,15,0.4)] backdrop-blur-md ${
                current.x > 58 ? "-translate-x-[112%] -translate-y-1/2" : "translate-x-[16%] -translate-y-1/2"
              }`}
            >
              <div className="flex items-center justify-between border-b border-[#080B0F]/10 px-5 py-3.5">
                <span className="text-[12px] text-[#080B0F]/55">{current.area}</span>
                <span className="flex items-center gap-2">
                  <span
                    className="h-1.5 w-1.5 rounded-full"
                    style={{ background: statusTone[current.status] }}
                  />
                  <span className="text-[11px] text-[#080B0F]/50">{current.status}</span>
                </span>
              </div>
              <div className="px-5 py-5">
                <div
                  className="text-[18px] font-medium tracking-[-0.01em] text-[#080B0F]"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {current.name}
                </div>
                <div className="mt-1.5 text-[12.5px] text-[#080B0F]/55">{current.developer}</div>
                <div className="mt-5 grid grid-cols-2 gap-x-4 gap-y-4">
                  {[
                    { l: "Starting price", v: current.from },
                    { l: "Indicative yield", v: current.yield },
                    { l: "Completion", v: current.completion },
                    { l: "Asset class", v: current.asset },
                  ].map((r) => (
                    <div key={r.l}>
                      <div className="text-[11px] text-[#080B0F]/45">{r.l}</div>
                      <div className="mt-1 text-[13px] text-[#080B0F]/85">{r.v}</div>
                    </div>
                  ))}
                </div>
                <button
                  suppressHydrationWarning
                  className="group mt-5 flex cursor-pointer items-center gap-2 border-t border-[#080B0F]/10 pt-4 text-[12px] text-[#C9A45C]"
                >
                  View development
                  <i className="ri-arrow-right-line transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="absolute bottom-5 left-5 hidden border border-[#080B0F]/10 bg-[#F5F2EA]/92 px-5 py-4 backdrop-blur-md sm:block">
          <span className="text-[11px] uppercase tracking-[0.2em] text-[#080B0F]/45">Status</span>
          <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
            {Object.entries(statusTone).map(([k, c]) => (
              <span key={k} className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full" style={{ background: c }} />
                <span className="text-[11.5px] text-[#080B0F]/60">{k}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
