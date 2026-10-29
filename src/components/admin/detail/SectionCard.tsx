"use client";

import type { ReactNode } from "react";

export default function SectionCard({
  index,
  title,
  description,
  action,
  children,
}: {
  index: string;
  title: string;
  description?: string;
  action?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="border border-[#080B0F]/12 bg-white">
      <header className="flex flex-wrap items-start justify-between gap-4 border-b border-[#080B0F]/10 px-6 py-5">
        <div>
          <span className="text-[9.5px] uppercase tracking-[0.3em] text-[#C9A45C]">{index}</span>
          <h2
            className="mt-2 text-[19px] font-medium tracking-[-0.01em] text-[#080B0F]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {title}
          </h2>
          {description && <p className="mt-1.5 max-w-xl text-[12.5px] leading-relaxed text-[#080B0F]/50">{description}</p>}
        </div>
        {action}
      </header>
      <div className="px-6 py-6">{children}</div>
    </section>
  );
}