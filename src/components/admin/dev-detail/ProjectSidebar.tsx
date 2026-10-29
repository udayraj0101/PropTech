"use client";

import Link from "next/link";
import { formatAed } from "./detailTypes";
import type { ProjectDetailShape } from "./detailTypes";

function paymentPlanLabel(project: ProjectDetailShape): string | null {
  const steps = project.payment_plans?.[0]?.steps ?? [];
  if (steps.length === 0) return null;
  const percentages = steps
    .map((s) => s.percentage)
    .filter((p): p is number => typeof p === "number" && p > 0);
  if (percentages.length === 0) return null;
  return percentages.join("/") + "%";
}

function Row({
  icon,
  label,
  value,
  badge,
}: {
  icon: string;
  label?: string;
  value: React.ReactNode;
  badge?: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-4 border-b border-[#080B0F]/8 py-4 last:border-b-0">
      <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center border border-[#080B0F]/10 bg-[#F5F2EA] text-[#C9A45C]">
        <i className={`${icon} text-[16px]`} />
      </span>
      <div className="min-w-0 flex-1">
        {label && (
          <p className="text-[11px] uppercase tracking-[0.14em] text-[#080B0F]/45">{label}</p>
        )}
        <div className="mt-1 flex flex-wrap items-center gap-2">
          <span
            className="text-[15px] font-medium text-[#080B0F]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {value}
          </span>
          {badge}
        </div>
      </div>
    </div>
  );
}

export default function ProjectSidebar({
  project,
  modellerBase,
}: {
  project: ProjectDetailShape;
  /** When set, renders a "Model this investment" CTA pointing at `{modellerBase}/{id}`. */
  modellerBase?: string;
}) {
  const price = project.min_price;
  const locationLabel = [project.location?.district, project.location?.region]
    .filter(Boolean)
    .join(" · ");
  const plan = paymentPlanLabel(project);

  return (
    <aside className="flex flex-col gap-6">
      <div className="border border-[#080B0F]/10 bg-white px-6 py-6">
        <div className="flex items-center gap-2 text-[12px] text-[#080B0F]/55">
          <i className="ri-map-pin-2-line text-[14px] text-[#C9A45C]" />
          <span>{locationLabel || "—"}</span>
        </div>
        <h1
          className="mt-3 text-[28px] font-semibold leading-[1.1] tracking-[-0.02em] text-[#080B0F] md:text-[32px]"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {project.name}
        </h1>

        <div className="mt-6">
          <Row
            icon="ri-price-tag-3-line"
            label="Price from:"
            value={price ? formatAed(price) : "—"}
          />
          {typeof project.units_count === "number" && (
            <Row
              icon="ri-stack-line"
              value={`${project.units_count} Units in sale`}
            />
          )}
          {plan && (
            <Row
              icon="ri-wallet-3-line"
              label="Payment plan:"
              value={plan}
              badge={
                project.post_handover ? (
                  <span className="inline-flex items-center gap-1 border border-[#6b4ea3]/40 bg-[#6b4ea3]/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.12em] text-[#6b4ea3]">
                    Post Handover
                  </span>
                ) : undefined
              }
            />
          )}
          {project.developer && (
            <Row
              icon="ri-briefcase-line"
              label="Developer:"
              value={project.developer}
            />
          )}
          {project.service_charge && (
            <Row
              icon="ri-coin-line"
              label="Service charge:"
              value={project.service_charge}
            />
          )}
          {project.furnishing_display && (
            <Row
              icon="ri-sofa-line"
              label="Furnishing:"
              value={project.furnishing_display}
            />
          )}
        </div>

        <button
          type="button"
          suppressHydrationWarning
          className="mt-7 flex w-full cursor-pointer items-center justify-center gap-2 bg-[#080B0F] px-6 py-3.5 text-[12px] font-medium uppercase tracking-[0.14em] text-[#F5F2EA] transition-colors duration-300 hover:bg-[#C9A45C] hover:text-[#080B0F]"
        >
          <i className="ri-add-line text-[14px]" />
          Publish Resale Unit
        </button>

        {modellerBase && (
          <Link
            href={`${modellerBase}/${encodeURIComponent(String(project.id))}`}
            className="mt-3 flex w-full cursor-pointer items-center justify-center gap-2 border border-[#C9A45C] bg-[#C9A45C]/10 px-6 py-3.5 text-[12px] font-medium uppercase tracking-[0.14em] text-[#9A7433] transition-colors duration-300 hover:bg-[#C9A45C] hover:text-[#080B0F]"
          >
            <i className="ri-line-chart-line text-[14px]" />
            Model this investment
          </Link>
        )}
      </div>

      {typeof project.readiness_progress === "number" && (
        <div className="border border-[#080B0F]/10 bg-white px-6 py-5">
          <p className="text-[11px] uppercase tracking-[0.18em] text-[#080B0F]/45">
            Construction progress
          </p>
          <div className="mt-3 flex items-baseline justify-between">
            <span
              className="text-[22px] font-semibold text-[#080B0F]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {project.readiness_progress.toFixed(1)}%
            </span>
            <span className="text-[11px] text-[#080B0F]/50">
              {project.construction_status_display}
            </span>
          </div>
          <div className="mt-3 h-1 w-full bg-[#080B0F]/8">
            <div
              className="h-1 bg-[#C9A45C]"
              style={{ width: `${Math.max(0, Math.min(100, project.readiness_progress))}%` }}
            />
          </div>
        </div>
      )}
    </aside>
  );
}
