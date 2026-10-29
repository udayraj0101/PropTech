"use client";

import { aedCompact } from "../../lib/developments";
import { associatedDevelopments } from "../../lib/developerData";
import DeveloperStatusBadge from "./DeveloperStatusBadge";

function availTone(state: string) {
  if (state === "Available") return "text-[#3F5C4E]";
  if (state === "Limited Availability") return "text-[#8A6A34]";
  return "text-[#080B0F]/40";
}

function availDot(state: string) {
  if (state === "Available") return "bg-[#4F6F5F]";
  if (state === "Limited Availability") return "bg-[#B08A4A]";
  return "bg-[#080B0F]/25";
}

export default function DeveloperDevelopmentsList({
  developer,
  compact = false,
}: {
  developer: string;
  compact?: boolean;
}) {
  const items = associatedDevelopments(developer);

  if (items.length === 0) {
    return (
      <div className="border border-dashed border-[#080B0F]/15 px-5 py-8 text-center">
        <p className="text-[13px] text-[#080B0F]/45">No developments currently linked to this developer.</p>
      </div>
    );
  }

  return (
    <div className="border border-[#080B0F]/12">
      <div className="grid grid-cols-[1.6fr_1.3fr_1.1fr_1fr] gap-3 border-b border-[#080B0F]/10 bg-[#F5F2EA]/50 px-5 py-3 text-[9px] uppercase tracking-[0.2em] text-[#080B0F]/40">
        <span>Development</span>
        <span>City</span>
        <span>Current available</span>
        <span>{compact ? "Availability" : "Status"}</span>
      </div>
      {items.map((d) => (
        <div
          key={d.id}
          className="grid grid-cols-[1.6fr_1.3fr_1.1fr_1fr] items-center gap-3 border-b border-[#080B0F]/8 px-5 py-3.5 last:border-b-0"
        >
          <div className="min-w-0">
            <p className="text-[13px] font-medium leading-snug text-[#080B0F]">{d.name}</p>
            <p className="mt-0.5 text-[11px] text-[#080B0F]/40">Updated {d.updated}</p>
          </div>
          <span className="text-[12px] text-[#080B0F]/60">{d.city}</span>
          <span className="text-[13px] font-medium text-[#080B0F]">
            {aedCompact(d.price)}
          </span>
          {compact ? (
            <span className={`flex items-center gap-2 text-[11.5px] ${availTone(d.availability)}`}>
              <span className={`h-1.5 w-1.5 rounded-full ${availDot(d.availability)}`} />
              {d.availability}
            </span>
          ) : (
            <DeveloperStatusBadge status={d.status} />
          )}
        </div>
      ))}
    </div>
  );
}