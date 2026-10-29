"use client";

export default function StatusSelect({
  label,
  value,
  options,
  onChange,
  hint,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
  hint?: string;
}) {
  return (
    <div>
      <span className="text-[10px] font-medium uppercase tracking-[0.22em] text-[#080B0F]/45">{label}</span>
      <div className="mt-3 inline-flex items-center gap-1 rounded-full border border-[#080B0F]/12 p-1">
        {options.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => onChange(option)}
            className={`cursor-pointer rounded-full px-5 py-2 text-[11px] uppercase tracking-[0.16em] transition-colors duration-300 ${
              value === option ? "bg-[#080B0F] text-[#F5F2EA]" : "text-[#080B0F]/55 hover:text-[#080B0F]"
            }`}
          >
            {option}
          </button>
        ))}
      </div>
      {hint && <span className="mt-2 block text-[11.5px] leading-relaxed text-[#080B0F]/45">{hint}</span>}
    </div>
  );
}