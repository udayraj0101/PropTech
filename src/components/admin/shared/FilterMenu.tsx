"use client";

import { useEffect, useRef, useState } from "react";

export default function FilterMenu({
  label,
  value,
  options,
  onChange,
  width = "w-[230px]",
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (v: string) => void;
  width?: string;
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

  const active = value !== "All";

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={`flex cursor-pointer items-center gap-2 whitespace-nowrap border px-4 py-2.5 text-[12px] transition-colors duration-300 ${
          active ? "border-[#C9A45C]/60 bg-[#C9A45C]/8 text-[#080B0F]" : "border-[#080B0F]/12 bg-white text-[#080B0F]/60 hover:text-[#080B0F]"
        }`}
      >
        <span className="text-[#080B0F]/40">{label}</span>
        <span className="font-medium">{active ? value : "All"}</span>
        <span className="flex h-4 w-4 items-center justify-center">
          <i className="ri-arrow-down-s-line text-[14px]" />
        </span>
      </button>

      {open && (
        <div className={`absolute left-0 top-[calc(100%+6px)] z-30 ${width} border border-[#080B0F]/12 bg-white py-1.5 shadow-[0_18px_40px_-24px_rgba(8,11,15,0.45)]`}>
          {["All", ...options].map((o) => (
            <button
              key={o}
              type="button"
              onClick={() => {
                onChange(o);
                setOpen(false);
              }}
              className={`flex w-full cursor-pointer items-center justify-between px-4 py-2.5 text-left text-[12.5px] transition-colors duration-200 hover:bg-[#F5F2EA] ${
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