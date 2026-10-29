"use client";

import Link from "next/link";
import { aedCompact } from "../../lib/developments";
import { developerLogo, type AdaptedDevelopment } from "../../lib/reelly";

/**
 * Left-panel card. Clicking anywhere on the card navigates to the
 * project detail page — matches the Reelly behaviour. Hover still syncs
 * the map's active-marker highlight via `onHover`.
 */
export default function ProjectCard({
  project,
  active,
  onHover,
  onFocus,
  detailBase = "/admin/developments",
}: {
  project: AdaptedDevelopment;
  active: boolean;
  onHover: () => void;
  onFocus: () => void;
  /** Route prefix for the detail link. Admin default. Broker passes /workspace/developments. */
  detailBase?: string;
}) {
  const logo = developerLogo(project.developer);

  return (
    <Link
      href={`${detailBase}/${encodeURIComponent(project.id)}`}
      onMouseEnter={onHover}
      onFocus={onFocus}
      className={`group relative flex cursor-pointer flex-col overflow-hidden border bg-white transition-all duration-200 focus:outline-none ${
        active
          ? "border-[#C9A45C] shadow-[0_14px_30px_-18px_rgba(201,164,92,0.6)]"
          : "border-[#080B0F]/10 hover:border-[#080B0F]/25"
      }`}
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#F5F2EA]">
        {project.image ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={project.image}
            alt={project.name}
            suppressHydrationWarning
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-[11px] uppercase tracking-[0.2em] text-[#080B0F]/35">
            No image
          </div>
        )}

        <div className="absolute left-3 top-3 flex items-center gap-1.5">
          <span className="flex items-center gap-1.5 border border-[#080B0F]/10 bg-[#080B0F]/85 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.1em] text-[#F5F2EA] backdrop-blur">
            <i className="ri-shield-check-line text-[11px]" />
            Verified
          </span>
          <span className="border border-[#F5F2EA]/40 bg-[#F5F2EA]/90 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.1em] text-[#080B0F]/75 backdrop-blur">
            {project.completion || "—"}
          </span>
        </div>

        {logo && (
          <span className="absolute bottom-3 left-3 flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-[#F5F2EA]/70 bg-white shadow-[0_8px_18px_-10px_rgba(8,11,15,0.5)]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={logo}
              alt={project.developer}
              suppressHydrationWarning
              className="h-full w-full object-contain p-1"
            />
          </span>
        )}
      </div>

      <div className="flex flex-col gap-3 px-5 py-4">
        <div>
          <h3
            className="text-[16px] font-medium leading-tight text-[#080B0F]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {project.name}
          </h3>
          <p className="mt-1 text-[12px] text-[#080B0F]/55">
            {project.area} · by {project.developer}
          </p>
        </div>

        <div className="flex items-end justify-between border-t border-[#080B0F]/8 pt-3">
          <div>
            <p className="text-[10px] uppercase tracking-[0.18em] text-[#080B0F]/40">Price from</p>
            <p className="mt-1 text-[14px] font-medium text-[#080B0F]">
              {project.priceLabel ||
                (project.availablePrice > 0 ? aedCompact(project.availablePrice) : "—")}
            </p>
          </div>
          <div className="text-right">
            <p className="text-[10px] uppercase tracking-[0.18em] text-[#080B0F]/40">
              {project.saleStatus ? "Status" : project.sizeRange ? "Size" : "Units"}
            </p>
            <p className="mt-1 text-[13.5px] font-medium text-[#080B0F]">
              {project.saleStatus ||
                project.sizeRange ||
                (project.unitsCount ? `${project.unitsCount} units` : "—")}
            </p>
            {project.saleStatus && project.constructionStatus && (
              <p className="mt-0.5 text-[11px] text-[#080B0F]/50">
                {project.constructionStatus}
              </p>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
