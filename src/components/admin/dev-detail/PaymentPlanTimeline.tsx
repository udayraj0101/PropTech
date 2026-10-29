"use client";

import type { ProjectDetailShape } from "./detailTypes";

export default function PaymentPlanTimeline({ project }: { project: ProjectDetailShape }) {
  const plan = project.payment_plans?.[0];
  const steps = plan?.steps ?? [];
  if (steps.length === 0) return null;

  return (
    <section>
      <div className="flex items-center gap-3">
        <span className="h-px w-8 bg-[#C9A45C]" />
        <h2
          className="text-[20px] font-medium tracking-[-0.01em] text-[#080B0F] md:text-[24px]"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Payment Plan
        </h2>
        {project.post_handover && (
          <span className="ml-2 inline-flex items-center gap-1 border border-[#6b4ea3]/40 bg-[#6b4ea3]/10 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.12em] text-[#6b4ea3]">
            Post Handover
          </span>
        )}
      </div>

      <div className="mt-6 border border-[#080B0F]/10 bg-white">
        {steps.map((step, i) => {
          const pct = typeof step.percentage === "number" ? step.percentage : 0;
          return (
            <div
              key={step.id ?? i}
              className="flex items-center gap-5 border-b border-[#080B0F]/8 px-6 py-5 last:border-b-0"
            >
              <span
                className="flex h-14 w-14 shrink-0 items-center justify-center border border-[#C9A45C]/40 bg-[#C9A45C]/10 text-[14px] font-semibold text-[#9A7433]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {pct}%
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-[14px] font-medium text-[#080B0F]">{step.name}</p>
                {step.notes && (
                  <p className="mt-1 text-[12px] text-[#080B0F]/55">{step.notes}</p>
                )}
              </div>
              <span className="text-[10px] uppercase tracking-[0.18em] text-[#080B0F]/40">
                Stage {String(i + 1).padStart(2, "0")}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
