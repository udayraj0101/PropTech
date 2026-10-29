import type { ReactNode } from "react";

export function Section({ title, note, children }: { title: string; note?: string; children: ReactNode }) {
  return (
    <section className="border-t border-[#080B0F]/10 px-7 py-7">
      <h3 className="text-[9.5px] uppercase tracking-[0.24em] text-[#080B0F]/45">{title}</h3>
      {note && <p className="mt-2.5 text-[12px] leading-relaxed text-[#080B0F]/50">{note}</p>}
      <div className="mt-5">{children}</div>
    </section>
  );
}

export function ReadRow({ label, value }: { label?: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-6 border-b border-[#080B0F]/8 py-3 last:border-b-0">
      {label ? <span className="text-[11.5px] text-[#080B0F]/45">{label}</span> : <span />}
      <span className="text-right text-[13px] text-[#080B0F]">{value || "—"}</span>
    </div>
  );
}