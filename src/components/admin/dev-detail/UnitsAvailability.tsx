"use client";

import { useMemo, useState } from "react";
import {
  bedroomLabel,
  formatAed,
  formatRange,
  formatSqft,
  type ProjectDetailShape,
  type TypicalUnit,
} from "./detailTypes";

type Group = {
  key: string;
  label: string;
  units: TypicalUnit[];
  count: number;
  sizeFrom?: number;
  sizeTo?: number;
  priceFrom?: number;
  priceTo?: number;
};

function groupUnits(items: TypicalUnit[]): Group[] {
  const map = new Map<string, Group>();
  for (const u of items) {
    const key =
      typeof u.bedrooms === "number"
        ? String(u.bedrooms)
        : "unknown";
    const label =
      key === "unknown"
        ? "Unknown"
        : bedroomLabel(u.bedrooms);
    let g = map.get(key);
    if (!g) {
      g = { key, label, units: [], count: 0 };
      map.set(key, g);
    }
    g.units.push(u);
    g.count += 1;
    g.sizeFrom = minOrSelf(g.sizeFrom, u.from_size_sqft);
    g.sizeTo = maxOrSelf(g.sizeTo, u.to_size_sqft);
    g.priceFrom = minOrSelf(g.priceFrom, u.from_price_aed);
    g.priceTo = maxOrSelf(g.priceTo, u.to_price_aed);
  }
  // Sort: Studio/0 → 1 → 2 → … → unknown last
  return Array.from(map.values()).sort((a, b) => {
    if (a.key === "unknown") return 1;
    if (b.key === "unknown") return -1;
    return Number(a.key) - Number(b.key);
  });
}

function minOrSelf(a?: number, b?: number): number | undefined {
  if (a === undefined) return b;
  if (b === undefined) return a;
  return Math.min(a, b);
}

function maxOrSelf(a?: number, b?: number): number | undefined {
  if (a === undefined) return b;
  if (b === undefined) return a;
  return Math.max(a, b);
}

export default function UnitsAvailability({ project }: { project: ProjectDetailShape }) {
  const units = project.typical_units ?? [];
  const groups = useMemo(() => groupUnits(units), [units]);
  const [expanded, setExpanded] = useState<string | null>(groups[0]?.key ?? null);
  const areaUnit = project.area_unit ?? "sqft";

  if (groups.length === 0) {
    return (
      <section>
        <SectionHeading title="Units & Availability" />
        <div className="mt-6 border border-dashed border-[#080B0F]/15 bg-white px-6 py-10 text-center">
          <p className="text-[13px] text-[#080B0F]/50">
            Reelly has not published unit breakdowns for this project yet.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section>
      <SectionHeading title="Units & Availability" />

      <div className="mt-6 flex flex-col gap-2">
        {groups.map((g) => {
          const open = expanded === g.key;
          return (
            <div key={g.key} className="border border-[#080B0F]/10 bg-white">
              <button
                type="button"
                onClick={() => setExpanded(open ? null : g.key)}
                suppressHydrationWarning
                className="grid w-full cursor-pointer grid-cols-[1.4fr_0.8fr_1.5fr_1.5fr_0.3fr] items-center gap-3 px-5 py-4 text-left transition-colors duration-200 hover:bg-[#FBFAF6]"
              >
                <span className="text-[14px] font-medium text-[#080B0F]">{g.label}</span>
                <span className="text-[12.5px] text-[#080B0F]/55">
                  {g.count} {g.count === 1 ? "Unit" : "Units"}
                </span>
                <span className="text-[12.5px] text-[#080B0F]/65">
                  {formatRange(g.sizeFrom, g.sizeTo, (n) => formatSqft(n, areaUnit))}
                </span>
                <span className="text-[13px] font-medium text-[#080B0F]">
                  {formatRange(g.priceFrom, g.priceTo, formatAed)}
                </span>
                <i
                  className={`ri-arrow-down-s-line text-[18px] text-[#080B0F]/50 transition-transform duration-200 ${
                    open ? "rotate-180" : ""
                  }`}
                />
              </button>

              {open && (
                <div className="border-t border-[#080B0F]/8">
                  <div className="grid grid-cols-[0.6fr_1fr_1fr_1.2fr_1fr_0.5fr] gap-3 border-b border-[#080B0F]/8 bg-[#FBFAF6] px-5 py-3 text-[10px] uppercase tracking-[0.14em] text-[#080B0F]/45">
                    <span>Plan</span>
                    <span>Bedrooms</span>
                    <span>Type</span>
                    <span>Area</span>
                    <span>Price</span>
                    <span className="text-right">Actions</span>
                  </div>
                  {g.units.map((u, i) => {
                    const layout = u.layout?.[0]?.image?.url;
                    const sizeLabel = formatRange(
                      u.from_size_sqft,
                      u.to_size_sqft,
                      (n) => formatSqft(n, areaUnit)
                    );
                    const priceLabel = formatRange(u.from_price_aed, u.to_price_aed, formatAed);
                    return (
                      <div
                        key={i}
                        className="grid grid-cols-[0.6fr_1fr_1fr_1.2fr_1fr_0.5fr] items-center gap-3 border-b border-[#080B0F]/8 px-5 py-3.5 last:border-b-0"
                      >
                        <span className="flex h-10 w-10 items-center justify-center border border-[#080B0F]/10 bg-[#F5F2EA]">
                          {layout ? (
                            /* eslint-disable-next-line @next/next/no-img-element */
                            <img
                              src={layout}
                              alt="layout"
                              suppressHydrationWarning
                              className="h-full w-full object-contain"
                            />
                          ) : (
                            <i className="ri-image-line text-[#080B0F]/30" />
                          )}
                        </span>
                        <span className="text-[12.5px] text-[#080B0F]/75">
                          {typeof u.bedrooms === "number" ? u.bedrooms : "—"}
                        </span>
                        <span className="text-[12.5px] text-[#080B0F]/55">
                          {project.available_unit_types_display?.[0] ?? "—"}
                        </span>
                        <span className="text-[12.5px] text-[#080B0F]/80">{sizeLabel}</span>
                        <span className="text-[13px] font-medium text-[#080B0F]">
                          {priceLabel}
                        </span>
                        <div className="flex justify-end gap-2">
                          <button
                            type="button"
                            aria-label="View layout"
                            suppressHydrationWarning
                            className="flex h-7 w-7 cursor-pointer items-center justify-center border border-[#080B0F]/12 text-[#080B0F]/55 transition-colors hover:border-[#080B0F]/40 hover:text-[#080B0F]"
                          >
                            <i className="ri-eye-line text-[13px]" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

function SectionHeading({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="h-px w-8 bg-[#C9A45C]" />
      <h2
        className="text-[20px] font-medium tracking-[-0.01em] text-[#080B0F] md:text-[24px]"
        style={{ fontFamily: "var(--font-display)" }}
      >
        {title}
      </h2>
    </div>
  );
}
