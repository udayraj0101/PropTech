"use client";

import type { ProjectDetailShape } from "./detailTypes";

export default function ProjectHero({
  project,
  galleryCount,
}: {
  project: ProjectDetailShape;
  galleryCount: number;
}) {
  const image = project.cover_image?.url;
  const sale = project.sale_status_display;
  const completion = project.completion_date;

  return (
    <section className="relative overflow-hidden border border-[#080B0F]/10 bg-[#F5F2EA]">
      <div className="relative h-[320px] w-full md:h-[460px]">
        {image ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={image}
            alt={project.name}
            suppressHydrationWarning
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-[11px] uppercase tracking-[0.25em] text-[#080B0F]/35">
            No cover image
          </div>
        )}

        {/* Top-left badges */}
        <div className="absolute left-5 top-5 flex items-center gap-2">
          {sale && (
            <span className="border border-[#080B0F]/10 bg-[#080B0F]/85 px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.14em] text-[#F5F2EA] backdrop-blur">
              {sale}
            </span>
          )}
          {completion && (
            <span className="border border-[#080B0F]/10 bg-[#F5F2EA]/92 px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.14em] text-[#080B0F]/80 backdrop-blur">
              {completion}
            </span>
          )}
        </div>

        {/* Bottom-left thumbnail/map/brochure chip row */}
        <div className="absolute bottom-4 left-4 flex flex-wrap items-center gap-2">
          <Chip icon="ri-camera-line">{galleryCount || 1} photos</Chip>
          <Chip icon="ri-map-pin-2-line">Map</Chip>
          {project.marketing_brochure && (
            <a
              href={project.marketing_brochure}
              target="_blank"
              rel="noreferrer"
              className="flex cursor-pointer items-center gap-1.5 border border-[#080B0F]/10 bg-[#F5F2EA]/95 px-3 py-1.5 text-[11.5px] text-[#080B0F]/80 backdrop-blur transition-colors duration-200 hover:border-[#080B0F]/35 hover:text-[#080B0F]"
            >
              <i className="ri-download-line" />
              Brochure
            </a>
          )}
        </div>
      </div>
    </section>
  );
}

function Chip({ icon, children }: { icon: string; children: React.ReactNode }) {
  return (
    <span className="flex items-center gap-1.5 border border-[#080B0F]/10 bg-[#F5F2EA]/95 px-3 py-1.5 text-[11.5px] text-[#080B0F]/80 backdrop-blur">
      <i className={`${icon} text-[13px]`} />
      {children}
    </span>
  );
}
