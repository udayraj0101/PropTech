"use client";

import Link from "next/link";
import { aedCompact } from "../../lib/developments";
import type { AdaptedDevelopment } from "../../lib/reelly";

/**
 * Floating card shown when a map marker is clicked. Mirrors the Reelly
 * screenshot: On Sale badge + close button on top, image, project name,
 * developer, "from:" + big price, completion date.
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
    <div className="relative border border-[#080B0F]/12 bg-white shadow-[0_28px_60px_-28px_rgba(8,11,15,0.55)]">
      {/* Top-right close button */}
      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        suppressHydrationWarning
        className="absolute right-3 top-3 z-10 flex h-7 w-7 cursor-pointer items-center justify-center rounded-full border border-[#080B0F]/15 bg-white text-[#080B0F]/55 transition-colors duration-200 hover:border-[#080B0F]/40 hover:text-[#080B0F]"
      >
        <i className="ri-close-line text-[14px]" />
      </button>

      {/* Image + badge */}
      <div className="relative h-[150px] w-full overflow-hidden bg-[#F5F2EA]">
        {project.image ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={project.image}
            alt={project.name}
            suppressHydrationWarning
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-[10px] uppercase tracking-[0.2em] text-[#080B0F]/35">
            No image
          </div>
        )}
        {project.saleStatus && (
          <span className="absolute left-3 top-3 border border-[#080B0F]/10 bg-[#080B0F]/85 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.1em] text-[#F5F2EA] backdrop-blur">
            {project.saleStatus}
          </span>
        )}
      </div>

      {/* Body */}
      <div className="px-5 py-4">
        <h3
          className="text-[16px] font-medium leading-tight text-[#080B0F]"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {project.name}
        </h3>
        <p className="mt-1 text-[12px] text-[#080B0F]/55">{project.developer}</p>

        <div className="mt-4">
          <p className="text-[11px] text-[#080B0F]/50">from:</p>
          <p
            className="mt-1 text-[20px] font-semibold leading-none tracking-[-0.01em] text-[#080B0F]"
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
