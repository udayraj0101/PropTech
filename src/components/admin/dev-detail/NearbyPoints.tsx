"use client";

import type { ProjectDetailShape } from "./detailTypes";

export default function NearbyPoints({ project }: { project: ProjectDetailShape }) {
  const points = project.project_map_points ?? [];
  if (points.length === 0) return null;

  return (
    <section>
      <div className="flex items-center gap-3">
        <span className="h-px w-8 bg-[#C9A45C]" />
        <h2
          className="text-[20px] font-medium tracking-[-0.01em] text-[#080B0F] md:text-[24px]"
          style={{ fontFamily: "var(--font-display)" }}
        >
          What&apos;s Nearby
        </h2>
      </div>

      <div className="mt-6 border border-[#080B0F]/10 bg-white">
        {points.map((p, i) => (
          <div
            key={`${p.map_point_name}-${i}`}
            className="flex items-center justify-between gap-4 border-b border-[#080B0F]/8 px-5 py-4 last:border-b-0"
          >
            <div className="flex items-center gap-4">
              <span className="flex h-8 w-8 items-center justify-center border border-[#080B0F]/10 bg-[#F5F2EA] text-[#C9A45C]">
                <i className="ri-map-pin-line text-[14px]" />
              </span>
              <span className="text-[13.5px] text-[#080B0F]/80">{p.map_point_name}</span>
            </div>
            <div className="flex items-center gap-5 text-[12px] text-[#080B0F]/55">
              {typeof p.distance === "number" && <span>{p.distance} km</span>}
              {typeof p.time === "number" && (
                <span className="flex items-center gap-1.5">
                  <i className="ri-time-line text-[13px] text-[#080B0F]/40" />
                  {p.time} min
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
