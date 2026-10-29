"use client";

import { useEffect, useRef, useState } from "react";

export type RowActionKey =
  | "edit"
  | "availability"
  | "pricing"
  | "payment"
  | "market"
  | "toggle";

const items: { key: RowActionKey; label: string }[] = [
  { key: "edit", label: "View / Edit" },
  { key: "availability", label: "Manage Availability" },
  { key: "pricing", label: "Manage Pricing" },
  { key: "payment", label: "Manage Payment Plan" },
  { key: "market", label: "View Market Data" },
];

export default function RowActions({
  isActive,
  onSelect,
}: {
  isActive: boolean;
  onSelect: (key: RowActionKey) => void;
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

  function choose(key: RowActionKey) {
    setOpen(false);
    onSelect(key);
  }

  return (
    <div ref={ref} className="relative flex justify-end">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Actions"
        className="flex h-8 w-8 cursor-pointer items-center justify-center text-[#080B0F]/50 transition-colors duration-300 hover:text-[#C9A45C]"
      >
        <i className="ri-more-2-fill text-lg" />
      </button>

      {open && (
        <div className="absolute right-0 top-9 z-40 w-56 border border-[#080B0F]/12 bg-white py-1.5 shadow-[0_28px_60px_-28px_rgba(8,11,15,0.5)]">
          {items.map((it) => (
            <button
              key={it.key}
              onClick={() => choose(it.key)}
              className="block w-full cursor-pointer px-5 py-2.5 text-left text-[13px] text-[#080B0F]/75 transition-colors duration-200 hover:bg-[#F5F2EA] hover:text-[#080B0F]"
            >
              {it.label}
            </button>
          ))}
          <div className="my-1 border-t border-[#080B0F]/10" />
          <button
            onClick={() => choose("toggle")}
            className="block w-full cursor-pointer px-5 py-2.5 text-left text-[13px] text-[#080B0F]/75 transition-colors duration-200 hover:bg-[#F5F2EA] hover:text-[#080B0F]"
          >
            {isActive ? "Deactivate" : "Activate"}
          </button>
        </div>
      )}
    </div>
  );
}