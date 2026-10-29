"use client";

import { useEffect, useRef, useState } from "react";

export default function FormSelect({
  label,
  value,
  options,
  onChange,
  hint,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (v: string) => void;
  hint?: string;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  return (
    <div ref={ref} className="relative">
      <span className="block text-[10px] uppercase tracking-[0.2em] text-[#080B0F]/45">{label}</span>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="mt-2 flex w-full cursor-pointer items-center justify-between gap-3 border border-[#080B0F]/15 bg-white px-4 py-3 text-left text-[13.5px] text-[#080B0F] transition-colors duration-300 hover:border-[#080B0F]/40"
      >
        <span className="truncate">{value}</span>
        <i className={`ri-arrow-down-s-line shrink-0 text-[#080B0F]/40 transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="absolute left-0 top-[calc(100%+4px)] z-30 max-h-64 w-full overflow-auto border border-[#080B0F]/12 bg-white py-1 shadow-[0_24px_50px_-24px_rgba(8,11,15,0.45)]">
          {options.map((o) => (
            <button
              key={o}
              type="button"
              onClick={() => {
                onChange(o);
                setOpen(false);
              }}
              className={`block w-full cursor-pointer px-4 py-2.5 text-left text-[13.5px] transition-colors duration-200 hover:bg-[#F5F2EA] ${
                o === value ? "text-[#C9A45C]" : "text-[#080B0F]/70"
              }`}
            >
              {o}
            </button>
          ))}
        </div>
      )}
      {hint && <span className="mt-1.5 block text-[11.5px] text-[#080B0F]/40">{hint}</span>}
    </div>
  );
}