type Metric = { label: string; value: string; note: string; tone?: "gold" | "neutral" };

export default function OverviewMetrics({ metrics }: { metrics: Metric[] }) {
  return (
    <div className="grid grid-cols-2 border-y border-[#080B0F]/10 lg:grid-cols-5">
      {metrics.map((m, i) => (
        <div
          key={m.label}
          className={`flex flex-col justify-between px-6 py-8 md:px-7 ${
            i % 2 === 1 ? "border-l border-[#080B0F]/10" : ""
          } ${i >= 2 ? "border-t border-[#080B0F]/10" : ""} ${
            i >= 1 ? "lg:border-l lg:border-[#080B0F]/10" : ""
          } lg:border-t-0`}
        >
          <span className="text-[10px] uppercase tracking-[0.24em] text-[#080B0F]/40">{m.label}</span>
          <span
            className={`mt-8 block text-[32px] font-semibold leading-none tracking-[-0.02em] md:text-[36px] ${
              m.tone === "gold" ? "text-[#C9A45C]" : "text-[#080B0F]"
            }`}
            style={{ fontFamily: "var(--font-display)" }}
          >
            {m.value}
          </span>
          <span className="mt-3 text-[12px] leading-relaxed text-[#080B0F]/50">{m.note}</span>
        </div>
      ))}
    </div>
  );
}
