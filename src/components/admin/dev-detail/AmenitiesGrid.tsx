"use client";

import type { ProjectDetailShape } from "./detailTypes";

export default function AmenitiesGrid({ project }: { project: ProjectDetailShape }) {
  const items = project.project_amenities ?? [];
  if (items.length === 0) return null;

  return (
    <section>
      <div className="flex items-center gap-3">
        <span className="h-px w-8 bg-[#C9A45C]" />
        <h2
          className="text-[20px] font-medium tracking-[-0.01em] text-[#080B0F] md:text-[24px]"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Amenities
        </h2>
      </div>

      <div className="mt-6 grid gap-px border border-[#080B0F]/10 bg-[#080B0F]/10 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => {
          const name = item.amenity?.name ?? "Amenity";
          const icon = item.icon?.url || item.amenity?.icon?.url;
          return (
            <div
              key={item.id}
              className="flex items-center gap-4 bg-white px-5 py-4"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden border border-[#080B0F]/10 bg-[#F5F2EA]">
                {icon ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={icon}
                    alt={name}
                    suppressHydrationWarning
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <i className="ri-star-smile-line text-[#C9A45C]" />
                )}
              </span>
              <span className="text-[13px] font-medium text-[#080B0F]">{name}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
