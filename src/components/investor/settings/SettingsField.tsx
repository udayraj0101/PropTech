"use client";

export default function SettingsField({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  hint,
  error,
  disabled,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  placeholder?: string;
  hint?: string;
  error?: string;
  disabled?: boolean;
}) {
  return (
    <label className="block">
      <span className="text-[10px] font-medium uppercase tracking-[0.22em] text-[#080B0F]/45">{label}</span>
      <input
        type={type}
        value={value}
        disabled={disabled}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className={`mt-3 w-full border bg-white px-4 py-3 text-[13.5px] text-[#1E1E1C] outline-none transition-colors duration-300 placeholder:text-[#080B0F]/30 disabled:bg-[#F5F2EA]/60 disabled:text-[#080B0F]/45 ${
          error ? "border-[#9C5749]/60" : "border-[#080B0F]/15 focus:border-[#C9A45C]/70"
        }`}
      />
      {error ? (
        <span className="mt-2 block text-[11.5px] text-[#9C5749]">{error}</span>
      ) : hint ? (
        <span className="mt-2 block text-[11.5px] leading-relaxed text-[#080B0F]/45">{hint}</span>
      ) : null}
    </label>
  );
}