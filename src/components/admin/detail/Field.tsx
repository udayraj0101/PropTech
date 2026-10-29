"use client";

export default function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  hint,
  error,
  suffix,
  textarea,
  rows = 4,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  hint?: string;
  error?: string;
  suffix?: string;
  textarea?: boolean;
  rows?: number;
}) {
  const base = `w-full border bg-white px-4 py-3 text-[13.5px] text-[#080B0F] placeholder-[#080B0F]/25 outline-none transition-colors duration-300 ${
    error ? "border-[#9B3B2E]" : "border-[#080B0F]/15 focus:border-[#C9A45C]"
  }`;

  return (
    <label className="block">
      <span className="block text-[10px] uppercase tracking-[0.2em] text-[#080B0F]/45">{label}</span>
      {textarea ? (
        <textarea
          value={value}
          rows={rows}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`mt-2 resize-none leading-relaxed ${base}`}
        />
      ) : (
        <span className="relative mt-2 block">
          <input
            type={type}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className={`${base} ${suffix ? "pr-14" : ""}`}
          />
          {suffix && (
            <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[11.5px] text-[#080B0F]/40">
              {suffix}
            </span>
          )}
        </span>
      )}
      {error ? (
        <span className="mt-1.5 block text-[11.5px] text-[#9B3B2E]">{error}</span>
      ) : hint ? (
        <span className="mt-1.5 block text-[11.5px] text-[#080B0F]/40">{hint}</span>
      ) : null}
    </label>
  );
}