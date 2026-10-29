"use client";

import { useEffect, useRef, useState } from "react";
import { aedCompact, type Development, type Unit } from "../../lib/developments";
import { aedFull } from "../../lib/investors";

export default function UnitPicker({
  development,
  value,
  onChange,
  error,
}: {
  development?: Development;
  value: string;
  onChange: (value: string) => void;
  error?: string;
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

  const selected: Unit | undefined = development?.units.find((u) => u.id === value);
  const disabled = !development;

  return (
    <div ref={ref} className="relative">
      <span className="text-[10px] font-medium uppercase tracking-[0.22em] text-[#080B0F]/45">Property / Unit</span>
      <button
        type="button"
        disabled={disabled}
        onClick={() => setOpen((o) => !o)}
        className={`mt-3 flex w-full items-center justify-between gap-4 border bg-white px-4 py-3 text-left text-[13.5px] transition-colors duration-300 ${
          error ? "border-[#9C5749]/60" : "border-[#080B0F]/15 hover:border-[#C9A45C]/60"
        } ${disabled ? "cursor-not-allowed bg-[#F5F2EA]/50 text-[#080B0F]/35" : "cursor-pointer"}`}
      >
        <span className={selected ? "text-[#1E1E1C]" : "text-[#080B0F]/35"}>
          {selected ? `${selected.bedrooms} ${selected.type}` : disabled ? "Select a development first" : "Select a property / unit"}
        </span>
        <span className="flex h-5 w-5 shrink-0 items-center justify-center text-[#080B0F]/40">
          {open ? <i className="ri-arrow-up-s-line text-[17px]" /> : <i className="ri-arrow-down-s-line text-[17px]" />}
        </span>
      </button>

      {open && development && (
        <div className="absolute left-0 top-[calc(100%+6px)] z-40 max-h-80 w-full overflow-y-auto border border-[#080B0F]/12 bg-white shadow-[0_24px_60px_-34px_rgba(8,11,15,0.55)]">
          {development.units.map((u) => (
            <button
              key={u.id}
              type="button"
              onClick={() => {
                onChange(u.id);
                setOpen(false);
              }}
              className={`grid w-full cursor-pointer grid-cols-[minmax(0,1fr)_auto] items-center gap-4 border-b border-[#080B0F]/8 px-4 py-3.5 text-left last:border-b-0 transition-colors duration-200 hover:bg-[#F5F2EA] ${
                u.id === value ? "bg-[#F5F2EA]/60" : ""
              }`}
            >
              <div className="min-w-0">
                <div className="text-[13.5px] text-[#1E1E1C]">
                  {u.bedrooms} {u.type}
                </div>
                <div className="mt-0.5 text-[11.5px] text-[#080B0F]/50">{u.size}</div>
              </div>
              <div className="text-right">
                <div className="text-[9px] uppercase tracking-[0.14em] text-[#9A7433]">Available</div>
                <div className="mt-0.5 text-[12.5px] text-[#080B0F]/80">{aedCompact(u.price)}</div>
              </div>
            </button>
          ))}
        </div>
      )}

      {error ? (
        <span className="mt-2 block text-[11.5px] text-[#9C5749]">{error}</span>
      ) : (
        <span className="mt-2 block text-[11.5px] leading-relaxed text-[#080B0F]/45">
          {selected
            ? `Current available price ${aedFull(Math.round(selected.price * 1_000_000))} — reference only, not the investor's purchase price.`
            : "The specific property or unit purchased by this investor."}
        </span>
      )}
    </div>
  );
}