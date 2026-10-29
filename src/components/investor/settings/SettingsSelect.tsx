"use client";

import { useEffect, useRef, useState } from "react";

export default function SettingsSelect({
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
      <span className="text-[10px] font-medium uppercase tracking-[0.22em] text-[#080B0F]/45">{label}</span>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="mt-3 flex w-full cursor-pointer items-center justify-between gap-4 border border-[#080B0F]/15 bg-white px-4 py-3 text-left text-[13.5px] text-[#1E1E1C] transition-colors duration-300 hover:border-[#C9A45C]/60"
      >
        <span>{value}</span>
        <span className="flex h-5 w-5 shrink-0 items-center justify-center text-[#080B0F]/40">
          {open ? <i className="ri-arrow-up-s-line text-[17px]" /> : <i className="ri-arrow-down-s-line text-[17px]" />}
        </span>
      </button>

      {open && (
        <div className="absolute left-0 top-[calc(100%+6px)] z-40 w-full border border-[#080B0F]/12 bg-white shadow-[0_24px_60px_-34px_rgba(8,11,15,0.55)]">
          {options.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => {
                onChange(option);
                setOpen(false);
              }}
              className={`block w-full cursor-pointer border-b border-[#080B0F]/8 px-4 py-3 text-left text-[13px] last:border-b-0 transition-colors duration-200 hover:bg-[#F5F2EA] ${
                option === value ? "bg-[#F5F2EA]/60 text-[#1E1E1C]" : "text-[#080B0F]/70"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      )}

      {hint && <span className="mt-2 block text-[11.5px] leading-relaxed text-[#080B0F]/45">{hint}</span>}
    </div>
  );
}