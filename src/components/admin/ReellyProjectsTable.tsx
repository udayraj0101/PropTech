"use client";

import Link from "next/link";
import { aedCompact } from "../../lib/developments";
import type { AdaptedDevelopment } from "../../lib/reelly";

const GRID = "grid-cols-[1.9fr_1.5fr_0.9fr_0.9fr_1.1fr_0.9fr_1.1fr]";

function saleTone(status?: string): string {
  if (!status) return "text-[#080B0F]/40";
  const s = status.toLowerCase();
  if (s.includes("sale") || s.includes("selling")) return "text-[#3F5C4E]";
  if (s.includes("sold")) return "text-[#080B0F]/50";
  if (s.includes("soon") || s.includes("eoi")) return "text-[#8A6A34]";
  return "text-[#080B0F]/65";
}

function StatusCell({ project: d }: { project: AdaptedDevelopment }) {
  const sale = d.saleStatus;
  const build = d.constructionStatus;
  if (!sale && !build) return <span className="text-[12px] text-[#080B0F]/40">—</span>;
  return (
    <span className="flex flex-col gap-0.5 leading-tight">
      {sale && (
        <span className={`text-[12px] font-medium ${saleTone(sale)}`}>{sale}</span>
      )}
      {build && (
        <span className="text-[11px] text-[#080B0F]/50">{build}</span>
      )}
    </span>
  );
}

export default function ReellyProjectsTable({ rows }: { rows: AdaptedDevelopment[] }) {
  return (
    <div className="mt-8">
      <div className="hidden border border-[#080B0F]/12 bg-white lg:block">
        <div
          className={`grid ${GRID} gap-4 border-b border-[#080B0F]/12 px-6 py-4 text-[9.5px] uppercase tracking-[0.2em] text-[#080B0F]/40`}
        >
          <span>Development</span>
          <span>Location</span>
          <span>Type</span>
          <span>Starting</span>
          <span>Current available</span>
          <span>Completion</span>
          <span>Status</span>
        </div>

        {rows.map((d) => (
          <Link
            key={d.id}
            href={`/admin/developments/${encodeURIComponent(d.id)}`}
            className={`grid ${GRID} cursor-pointer items-center gap-4 border-b border-[#080B0F]/8 px-6 py-5 transition-colors duration-200 last:border-b-0 hover:bg-[#FBFAF6]`}
          >
            <div className="min-w-0">
              <p className="text-[14px] font-medium leading-snug text-[#080B0F]">{d.name}</p>
              <p className="mt-1 text-[11.5px] tracking-[0.08em] text-[#080B0F]/45">
                {d.developer}
              </p>
            </div>
            <div className="min-w-0">
              <p className="text-[12.5px] leading-snug text-[#080B0F]/65">
                {d.area}, {d.city}
              </p>
              {d.sizeRange && (
                <p className="mt-1 text-[11px] text-[#080B0F]/45">{d.sizeRange}</p>
              )}
            </div>
            <div className="flex flex-col">
              <span className="text-[12.5px] text-[#080B0F]/65">{d.type}</span>
              {typeof d.unitsCount === "number" && (
                <span className="mt-1 text-[11px] text-[#080B0F]/45">
                  {d.unitsCount} units
                </span>
              )}
            </div>
            <span className="text-[13px] text-[#080B0F]/40">
              <span className="mr-1 text-[10px] uppercase tracking-[0.14em]">From</span>
              {d.startingPrice > 0 ? aedCompact(d.startingPrice) : "—"}
            </span>
            <span className="text-[14.5px] font-medium text-[#080B0F]">
              {d.availablePrice > 0 ? aedCompact(d.availablePrice) : "—"}
            </span>
            <span className="text-[12px] text-[#080B0F]/55">{d.completion}</span>
            <StatusCell project={d} />
          </Link>
        ))}
      </div>

      <div className="grid gap-4 lg:hidden">
        {rows.map((d) => (
          <Link
            key={d.id}
            href={`/admin/developments/${encodeURIComponent(d.id)}`}
            className="block border border-[#080B0F]/12 bg-white p-6 transition-colors duration-200 hover:border-[#080B0F]/25"
          >
            <p className="text-[15px] font-medium text-[#080B0F]">{d.name}</p>
            <p className="mt-1 text-[11.5px] tracking-[0.08em] text-[#080B0F]/45">{d.developer}</p>
            <p className="mt-3 text-[12.5px] text-[#080B0F]/60">
              {d.area}, {d.city} · {d.type}
            </p>
            <div className="mt-5 grid grid-cols-2 gap-4 border-t border-[#080B0F]/10 pt-5">
              <div>
                <p className="text-[9.5px] uppercase tracking-[0.2em] text-[#080B0F]/40">Starting</p>
                <p className="mt-1.5 text-[13px] text-[#080B0F]/40">
                  {d.startingPrice > 0 ? aedCompact(d.startingPrice) : "—"}
                </p>
              </div>
              <div>
                <p className="text-[9.5px] uppercase tracking-[0.2em] text-[#080B0F]/40">
                  Current available
                </p>
                <p className="mt-1.5 text-[14px] font-medium text-[#080B0F]">
                  {d.availablePrice > 0 ? aedCompact(d.availablePrice) : "—"}
                </p>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between text-[11.5px] text-[#080B0F]/55">
              <span>Completion {d.completion}</span>
              <StatusCell project={d} />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
