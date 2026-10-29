"use client";

import { useEffect, useRef, useState } from "react";

export default function AdminSelect({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
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

  const active = value !== options[0];

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className={`flex w-full cursor-pointer items-center justify-between gap-3 border bg-white px-4 py-3 text-left transition-colors duration-300 ${
          active ? "border-[#C9A45C]/60" : "border-[#080B0F]/15 hover:border-[#080B0F]/40"
        }`}
      >
        <span className="min-w-0">
          <span className="block text-[9.5px] uppercase tracking-[0.22em] text-[#080B0F]/40">{label}</span>
          <span className={`mt-0.5 block truncate text-[13px] ${active ? "text-[#080B0F]" : "text-[#080B0F]/60"}`}>
            {value}
          </span>
        </span>
        <i
          className={`ri-arrow-down-s-line shrink-0 text-[#080B0F]/40 transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div className="absolute left-0 top-[calc(100%+4px)] z-30 max-h-64 w-full overflow-auto border border-[#080B0F]/12 bg-white py-1 shadow-[0_24px_50px_-24px_rgba(8,11,15,0.45)]">
          {options.map((o) => (
            <button
              key={o}
              onClick={() => {
                onChange(o);
                setOpen(false);
              }}
              className={`block w-full cursor-pointer px-4 py-2.5 text-left text-[13px] transition-colors duration-200 hover:bg-[#F5F2EA] ${
                o === value ? "text-[#C9A45C]" : "text-[#080B0F]/70"
              }`}
            >
              {o}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}