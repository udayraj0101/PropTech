"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { developments } from "../../lib/developments";

export default function DevelopmentPicker({
  value,
  onChange,
  error,
}: {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  const selected = developments.find((d) => d.id === value);

  const list = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return developments;
    return developments.filter((d) =>
      [d.name, d.developer, d.area, d.city].join(" ").toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <div ref={ref} className="relative">
      <span className="text-[10px] font-medium uppercase tracking-[0.22em] text-[#080B0F]/45">Development</span>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={`mt-3 flex w-full cursor-pointer items-center justify-between gap-4 border bg-white px-4 py-3 text-left text-[13.5px] transition-colors duration-300 ${
          error ? "border-[#9C5749]/60" : "border-[#080B0F]/15 hover:border-[#C9A45C]/60"
        }`}
      >
        <span className={selected ? "text-[#1E1E1C]" : "text-[#080B0F]/35"}>
          {selected ? `${selected.name} · ${selected.city}` : "Select a development"}
        </span>
        <span className="flex h-5 w-5 shrink-0 items-center justify-center text-[#080B0F]/40">
          {open ? <i className="ri-arrow-up-s-line text-[17px]" /> : <i className="ri-arrow-down-s-line text-[17px]" />}
        </span>
      </button>

      {open && (
        <div className="absolute left-0 top-[calc(100%+6px)] z-40 w-full border border-[#080B0F]/12 bg-white shadow-[0_24px_60px_-34px_rgba(8,11,15,0.55)]">
          <div className="flex items-center border-b border-[#080B0F]/10 px-4 py-2.5">
            <i className="ri-search-line text-[15px] text-[#080B0F]/40" />
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search developments..."
              className="w-full bg-transparent pl-3 text-sm text-[#080B0F] placeholder-[#080B0F]/35 outline-none"
            />
          </div>
          <div className="max-h-72 overflow-y-auto">
            {list.length === 0 ? (
              <div className="px-4 py-6 text-center text-[12.5px] text-[#080B0F]/50">
                No developments match your search.
              </div>
            ) : (
              list.map((d) => (
                <button
                  key={d.id}
                  type="button"
                  onClick={() => {
                    onChange(d.id);
                    setOpen(false);
                    setQuery("");
                  }}
                  className={`block w-full cursor-pointer border-b border-[#080B0F]/8 px-4 py-3 text-left last:border-b-0 transition-colors duration-200 hover:bg-[#F5F2EA] ${
                    d.id === value ? "bg-[#F5F2EA]/60" : ""
                  }`}
                >
                  <div className="text-[13.5px] text-[#1E1E1C]">{d.name}</div>
                  <div className="mt-0.5 text-[11.5px] text-[#080B0F]/50">
                    {d.developer} · {d.area}, {d.city}
                  </div>
                </button>
              ))
            )}
          </div>
        </div>
      )}

      {error ? (
        <span className="mt-2 block text-[11.5px] text-[#9C5749]">{error}</span>
      ) : (
        <span className="mt-2 block text-[11.5px] leading-relaxed text-[#080B0F]/45">
          Selected from existing PROPTECH developments.
        </span>
      )}
    </div>
  );
}