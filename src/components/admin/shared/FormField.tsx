"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

export const inputClass =
  "w-full border border-[#080B0F]/12 bg-white px-3.5 py-2.5 text-[13px] text-[#080B0F] placeholder:text-[#080B0F]/30 focus:border-[#C9A45C]/70 focus:outline-none transition-colors duration-200";

export function Field({ label, helper, children }: { label: string; helper?: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="block text-[9.5px] uppercase tracking-[0.2em] text-[#080B0F]/45">{label}</span>
      <div className="mt-2">{children}</div>
      {helper && <span className="mt-2 block text-[11px] leading-relaxed text-[#080B0F]/45">{helper}</span>}
    </label>
  );
}

export function FormSelect({
  value,
  options,
  onChange,
  placeholder = "Select",
}: {
  value: string;
  options: string[];
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={`${inputClass} flex cursor-pointer items-center justify-between text-left`}
      >
        <span className={value ? "text-[#080B0F]" : "text-[#080B0F]/35"}>{value || placeholder}</span>
        <span className="flex h-4 w-4 items-center justify-center">
          <i className="ri-arrow-down-s-line text-[15px] text-[#080B0F]/40" />
        </span>
      </button>
      {open && (
        <div className="absolute left-0 top-[calc(100%+4px)] z-40 max-h-[240px] w-full overflow-y-auto border border-[#080B0F]/12 bg-white py-1.5 shadow-[0_18px_40px_-24px_rgba(8,11,15,0.45)]">
          {options.map((o) => (
            <button
              key={o}
              type="button"
              onClick={() => {
                onChange(o);
                setOpen(false);
              }}
              className={`flex w-full cursor-pointer items-center justify-between px-3.5 py-2.5 text-left text-[12.5px] transition-colors duration-200 hover:bg-[#F5F2EA] ${
                value === o ? "text-[#080B0F]" : "text-[#080B0F]/60"
              }`}
            >
              {o}
              {value === o && <i className="ri-check-line text-[14px] text-[#C9A45C]" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export function TextArea({
  value,
  onChange,
  placeholder = "Optional notes for internal reference",
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <div>
      <textarea
        value={value}
        maxLength={500}
        onChange={(e) => onChange(e.target.value)}
        rows={3}
        placeholder={placeholder}
        className={`${inputClass} resize-none`}
      />
      <span className="mt-1.5 block text-right text-[10.5px] text-[#080B0F]/35">{value.length}/500</span>
    </div>
  );
}

export function Toggle({
  on,
  onToggle,
  labels = ["Enabled", "Disabled"],
}: {
  on: boolean;
  onToggle: () => void;
  labels?: [string, string];
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="flex cursor-pointer items-center gap-3"
      aria-pressed={on}
    >
      <span
        className={`flex h-6 w-11 items-center rounded-full border px-0.5 transition-colors duration-300 ${
          on ? "border-[#4F6F5F]/50 bg-[#4F6F5F]/18" : "border-[#080B0F]/15 bg-[#080B0F]/5"
        }`}
      >
        <span
          className={`h-[19px] w-[19px] rounded-full transition-transform duration-300 ${
            on ? "translate-x-[20px] bg-[#4F6F5F]" : "translate-x-0 bg-[#080B0F]/35"
          }`}
        />
      </span>
      <span className={`text-[12.5px] font-medium ${on ? "text-[#3F5C4E]" : "text-[#080B0F]/50"}`}>
        {on ? labels[0] : labels[1]}
      </span>
    </button>
  );
}