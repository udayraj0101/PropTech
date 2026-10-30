"use client";

import Link from "next/link";
import { aedCompact } from "../../lib/developments";
import type { AdaptedDevelopment } from "../../lib/reelly";

/**
 * Floating card shown when a map marker is clicked.
 * Mirrors the Reelly screenshot: cover image (or gradient fallback),
 * sale badge + close button, project name + developer, "PRICE FROM"
 * label + big price, completion/construction, "View project" CTA.
 */
export default function MarkerPopupCard({
  project,
  onClose,
  detailBase = "/admin/developments",
}: {
  project: AdaptedDevelopment;
  onClose: () => void;
  detailBase?: string;
}) {
  const price =
    project.priceLabel ||
    (project.availablePrice > 0 ? aedCompact(project.availablePrice) : "—");

  return (
    <div className="relative w-full overflow-hidden border border-[#080B0F]/12 bg-white shadow-[0_28px_60px_-28px_rgba(8,11,15,0.55)]">
      {/* Top-right close button — floats above everything */}
      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        suppressHydrationWarning
        className="absolute right-3 top-3 z-20 flex h-7 w-7 cursor-pointer items-center justify-center rounded-full border border-[#080B0F]/15 bg-white text-[#080B0F]/55 shadow-sm transition-colors duration-200 hover:border-[#080B0F]/40 hover:text-[#080B0F]"
      >
        <i className="ri-close-line text-[14px]" />
      </button>

      {/* Image + badges */}
      <div
        className="relative h-[150px] w-full overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, #F5F2EA 0%, #E8E2D0 55%, #D7CFB8 100%)",
        }}
      >
        {project.image && (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={project.image}
            alt={project.name}
            suppressHydrationWarning
            className="absolute inset-0 h-full w-full object-cover"
          />
        )}
        {!project.image && (
          <div className="absolute inset-0 flex items-center justify-center text-[10px] uppercase tracking-[0.22em] text-[#080B0F]/45">
            <i className="ri-building-2-line mr-2 text-[16px] text-[#C9A45C]" />
            {project.developer || "Project"}
          </div>
        )}

        {/* Sale status badge */}
        {project.saleStatus && (
          <span className="absolute left-3 top-3 z-10 border border-[#080B0F]/10 bg-[#080B0F]/85 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.1em] text-[#F5F2EA] backdrop-blur">
            {project.saleStatus}
          </span>
        )}
        {!project.saleStatus && project.completion && project.completion !== "—" && (
          <span className="absolute left-3 top-3 z-10 border border-[#080B0F]/10 bg-[#080B0F]/85 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.1em] text-[#F5F2EA] backdrop-blur">
            {project.completion}
          </span>
        )}
      </div>

      {/* Body */}
      <div className="px-5 py-4">
        <h3
          className="pr-8 text-[16px] font-medium leading-tight text-[#080B0F]"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {project.name}
        </h3>
        <p className="mt-1 text-[12px] text-[#080B0F]/55">{project.developer}</p>

        <div className="mt-4">
          <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-[#9A7433]">
            Price from
          </p>
          <p
            className="mt-1.5 text-[22px] font-semibold leading-none tracking-[-0.01em] text-[#080B0F]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {price}
          </p>
        </div>

        <p className="mt-4 text-[11.5px] text-[#080B0F]/55">
          {project.completion}
          {project.constructionStatus ? ` · ${project.constructionStatus}` : ""}
        </p>

        <Link
          href={`${detailBase}/${encodeURIComponent(project.id)}`}
          className="mt-4 flex cursor-pointer items-center justify-between border-t border-[#080B0F]/10 pt-3 text-[11.5px] font-medium uppercase tracking-[0.14em] text-[#C9A45C] transition-colors hover:text-[#9A7433]"
        >
          View project
          <i className="ri-arrow-right-line text-[14px]" />
        </Link>
      </div>
    </div>
  );
}
