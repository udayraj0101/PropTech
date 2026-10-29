"use client";

import { useEffect, useMemo, useState } from "react";
import Display from "../ui/Display";
import ProjectCard from "../map/ProjectCard";
import { priceBand } from "../../lib/developments";
import type { AdaptedDevelopment } from "../../lib/reelly";

type FetchState =
  | { kind: "loading" }
  | { kind: "ready"; projects: AdaptedDevelopment[] }
  | {
      kind: "error";
      message: string;
      configMissing: boolean;
      upstreamStatus?: number;
    };

type CityFilter = "All" | "Abu Dhabi" | "Dubai";

/**
 * Broker-facing developments directory. Card grid of every Reelly
 * project. Reuses the same ProjectCard that the Map page's left panel
 * uses — click a card to open its detail page.
 */
export default function BrokerDevelopmentsDirectory() {
  const [state, setState] = useState<FetchState>({ kind: "loading" });
  const [search, setSearch] = useState("");
  const [city, setCity] = useState<CityFilter>("All");
  const [developer, setDeveloper] = useState("All");
  const [price, setPrice] = useState("All");
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/projects");
        const data = (await res.json()) as {
          projects?: AdaptedDevelopment[];
          error?: string;
          configMissing?: boolean;
          upstreamStatus?: number;
        };
        if (cancelled) return;
        if (!res.ok || !data.projects) {
          setState({
            kind: "error",
            message: data.error ?? `Request failed with status ${res.status}`,
            configMissing: Boolean(data.configMissing),
            upstreamStatus: data.upstreamStatus,
          });
          return;
        }
        setState({ kind: "ready", projects: data.projects });
      } catch (err) {
        if (cancelled) return;
        setState({
          kind: "error",
          message: err instanceof Error ? err.message : "Network error",
          configMissing: false,
        });
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const projects = state.kind === "ready" ? state.projects : [];

  const developerOptions = useMemo(() => {
    const set = new Set<string>();
    projects.forEach((p) => set.add(p.developer));
    return ["All", ...Array.from(set).sort()];
  }, [projects]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return projects.filter((p) => {
      if (q) {
        const hay = `${p.name} ${p.developer} ${p.area} ${p.city} ${p.type}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      if (city !== "All" && p.city !== city) return false;
      if (developer !== "All" && p.developer !== developer) return false;
      if (price !== "All" && priceBand(p.availablePrice) !== price) return false;
      return true;
    });
  }, [projects, search, city, developer, price]);

  const activeCount =
    (search.trim() ? 1 : 0) +
    (city !== "All" ? 1 : 0) +
    (developer !== "All" ? 1 : 0) +
    (price !== "All" ? 1 : 0);

  function clearAll() {
    setSearch("");
    setCity("All");
    setDeveloper("All");
    setPrice("All");
  }

  return (
    <div className="w-full">
      <div className="flex flex-wrap items-end justify-between gap-8">
        <div>
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-[#C9A45C]" />
            <span className="text-[10.5px] uppercase tracking-[0.34em] text-[#C9A45C]">
              Development directory
            </span>
          </div>
          <Display
            as="h1"
            className="mt-3.5 text-[32px] font-medium leading-[1.05] tracking-[-0.03em] text-[#080B0F] md:text-[44px]"
          >
            Developments
          </Display>
          <p className="mt-3 max-w-xl text-[14px] leading-relaxed text-[#080B0F]/55">
            Browse and compare developments live from Reelly. Click any card to open the
            full development profile.
          </p>
        </div>

        <div className="flex items-center gap-1 rounded-full border border-[#080B0F]/12 p-1">
          {(["All", "Abu Dhabi", "Dubai"] as CityFilter[]).map((c) => (
            <button
              key={c}
              onClick={() => setCity(c)}
              suppressHydrationWarning
              className={`cursor-pointer rounded-full px-6 py-2.5 text-[11.5px] uppercase tracking-[0.2em] transition-colors duration-300 ${
                city === c
                  ? "bg-[#080B0F] text-[#F5F2EA]"
                  : "text-[#080B0F]/55 hover:text-[#080B0F]"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-3 border-y border-[#080B0F]/10 py-5">
        <div className="flex min-w-[240px] flex-1 items-center border border-[#080B0F]/15 px-4 py-2.5 focus-within:border-[#080B0F]/45 sm:max-w-md">
          <i className="ri-search-line text-[15px] text-[#080B0F]/40" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search developments…"
            suppressHydrationWarning
            className="w-full bg-transparent pl-3 text-sm text-[#080B0F] placeholder-[#080B0F]/35 outline-none"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              aria-label="Clear search"
              suppressHydrationWarning
              className="flex h-6 w-6 cursor-pointer items-center justify-center text-[#080B0F]/40 transition-colors hover:text-[#9A7433]"
            >
              <i className="ri-close-line text-[15px]" />
            </button>
          )}
        </div>

        <SelectPill
          label="Developer"
          value={developer}
          options={developerOptions}
          onChange={setDeveloper}
        />
        <SelectPill
          label="Price"
          value={price}
          options={["All", "Under AED 2M", "AED 2M – 4M", "AED 4M+"]}
          onChange={setPrice}
        />

        {activeCount > 0 && (
          <button
            onClick={clearAll}
            suppressHydrationWarning
            className="flex cursor-pointer items-center gap-2 px-1 text-[11.5px] uppercase tracking-[0.16em] text-[#9A7433] transition-colors hover:text-[#080B0F]"
          >
            <i className="ri-close-circle-line text-[15px]" />
            Clear all
          </button>
        )}
      </div>

      {state.kind === "loading" && (
        <div className="mt-10 border border-[#080B0F]/12 bg-white px-6 py-16 text-center">
          <span className="text-[11px] uppercase tracking-[0.3em] text-[#080B0F]/40">
            Loading from Reelly…
          </span>
        </div>
      )}

      {state.kind === "error" && (
        <div className="mt-10 border border-[#C06B57]/40 bg-[#F7E7E1] px-6 py-10">
          <p className="text-[13px] font-medium text-[#9E4A38]">
            {state.configMissing
              ? "Reelly API key not configured."
              : state.upstreamStatus && state.upstreamStatus >= 500
              ? `Reelly API returned ${state.upstreamStatus} — upstream issue.`
              : "Could not load developments."}
          </p>
          <p className="mt-2 text-[12.5px] leading-relaxed text-[#080B0F]/60">{state.message}</p>
        </div>
      )}

      {state.kind === "ready" && (
        <>
          <div className="mt-6 flex items-baseline justify-between gap-4">
            <span className="text-[10.5px] uppercase tracking-[0.28em] text-[#080B0F]/45">
              {filtered.length} {filtered.length === 1 ? "development" : "developments"}
            </span>
            <span className="text-[10.5px] uppercase tracking-[0.22em] text-[#080B0F]/40">
              Live from Reelly
            </span>
          </div>

          {filtered.length === 0 ? (
            <div className="mt-8 border border-[#080B0F]/12 bg-white px-8 py-16 text-center">
              <div className="text-[15px] text-[#080B0F]/70">
                No developments match your filters.
              </div>
              <button
                onClick={clearAll}
                suppressHydrationWarning
                className="mt-4 cursor-pointer text-[11.5px] uppercase tracking-[0.18em] text-[#9A7433] transition-colors hover:text-[#080B0F]"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {filtered.map((p) => (
                <ProjectCard
                  key={p.id}
                  project={p}
                  active={p.id === activeId}
                  onHover={() => setActiveId(p.id)}
                  onFocus={() => setActiveId(p.id)}
                  detailBase="/workspace/developments"
                />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

function SelectPill({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (v: string) => void;
}) {
  const active = value !== "All";
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        suppressHydrationWarning
        className={`cursor-pointer appearance-none border bg-white py-2.5 pl-4 pr-10 text-[12.5px] font-medium transition-colors duration-300 focus:outline-none ${
          active
            ? "border-[#C9A45C]/60 text-[#080B0F]"
            : "border-[#080B0F]/12 text-[#080B0F]/70 hover:border-[#080B0F]/35"
        }`}
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {o === "All" ? `${label} · All` : `${label} · ${o}`}
          </option>
        ))}
      </select>
      <i className="ri-arrow-down-s-line pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[14px] text-[#080B0F]/40" />
    </div>
  );
}
