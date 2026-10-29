"use client";

import { useEffect, useMemo, useState } from "react";
import Display from "../ui/Display";
import Eyebrow from "../ui/Eyebrow";
import DevelopmentFilters, { emptyFilters, type DevFilters } from "./DevelopmentFilters";
import ReellyProjectsTable from "./ReellyProjectsTable";
import { propertyGroup } from "../../lib/adminData";
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

export default function DevelopmentsAdmin() {
  const [state, setState] = useState<FetchState>({ kind: "loading" });
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState<DevFilters>(emptyFilters);

  // Load live Reelly data on mount.
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

  // Honour ?developer= deep links from the Developer drawer.
  useEffect(() => {
    const dev = new URLSearchParams(window.location.search).get("developer");
    if (dev) setFilters((f) => ({ ...f, developer: dev }));
  }, []);

  const active = useMemo(
    () =>
      search.trim().length > 0 ||
      JSON.stringify(filters) !== JSON.stringify(emptyFilters),
    [search, filters]
  );

  const projects = state.kind === "ready" ? state.projects : [];

  const rows = useMemo(() => {
    const q = search.trim().toLowerCase();
    return projects.filter((d) => {
      if (q) {
        const haystack = [d.name, d.developer, d.area, d.city].join(" ").toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      if (filters.city !== "All" && d.city !== filters.city) return false;
      if (filters.developer !== "All developers" && d.developer !== filters.developer) return false;
      if (filters.property !== "All" && propertyGroup(d.type) !== filters.property) return false;
      // status + availability filters are not meaningful without local
      // moderation yet — Reelly doesn't surface those semantics directly.
      return true;
    });
  }, [projects, search, filters]);

  function clearAll() {
    setSearch("");
    setFilters(emptyFilters);
  }

  return (
    <div>
      <header className="border-b border-[#080B0F]/10 pb-10">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Eyebrow tone="gold">Admin Console</Eyebrow>
            <Display
              as="h1"
              className="mt-6 text-[34px] font-semibold leading-[1.05] tracking-[-0.03em] text-[#080B0F] md:text-[46px]"
            >
              Development Management
            </Display>
            <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-[#080B0F]/55">
              Live projects fed from the Reelly API. Narrow by developer, city or property type
              using the filters below.
            </p>
          </div>
        </div>

        <p className="mt-6 max-w-3xl border-l-2 border-[#C9A45C] pl-4 text-[13px] leading-relaxed text-[#080B0F]/50">
          Development records are sourced from Reelly — adding projects manually is disabled.
          Developer coverage is managed in Developer Management.
        </p>
      </header>

      <DevelopmentFilters
        search={search}
        onSearch={setSearch}
        filters={filters}
        onFilter={(patch) => setFilters((f) => ({ ...f, ...patch }))}
        active={active}
        onClear={clearAll}
      />

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
              ? `Reelly API is currently returning ${state.upstreamStatus}. This is an upstream issue — our server reached Reelly, but Reelly failed to respond.`
              : "Could not load projects from Reelly."}
          </p>
          <p className="mt-2 text-[12.5px] leading-relaxed text-[#080B0F]/60">
            {state.configMissing
              ? "Add REELLY_API_KEY to .env.local (see .env.example) and restart the dev server."
              : state.message}
          </p>
          {state.upstreamStatus && state.upstreamStatus >= 500 && (
            <p className="mt-4 border-l-2 border-[#C9A45C]/60 pl-4 text-[12px] leading-relaxed text-[#080B0F]/55">
              The page will populate automatically once Reelly recovers. Our client paginates at 20 items per
              call, so partial outages won&apos;t require any code change.
            </p>
          )}
        </div>
      )}

      {state.kind === "ready" && (
        <>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2">
            <span className="text-[12px] uppercase tracking-[0.2em] text-[#080B0F]/45">
              {rows.length} of {projects.length} developments
            </span>
            <span className="text-[12px] text-[#080B0F]/45">
              Live from Reelly · {projects.length} total across {new Set(projects.map((p) => p.developer)).size} developers
            </span>
          </div>

          {projects.length === 0 ? (
            <div className="mt-8 border border-[#080B0F]/12 bg-white px-6 py-20 text-center">
              <i className="ri-building-2-line text-2xl text-[#080B0F]/30" />
              <p className="mt-4 text-[15px] text-[#080B0F]/60">
                Reelly returned no projects for this tenant.
              </p>
            </div>
          ) : rows.length > 0 ? (
            <ReellyProjectsTable rows={rows} />
          ) : (
            <div className="mt-8 border border-[#080B0F]/12 bg-white px-6 py-20 text-center">
              <i className="ri-search-eye-line text-2xl text-[#080B0F]/30" />
              <p className="mt-4 text-[15px] text-[#080B0F]/60">
                No developments match your current filters.
              </p>
              <button
                onClick={clearAll}
                suppressHydrationWarning
                className="mt-5 cursor-pointer whitespace-nowrap border border-[#080B0F]/20 px-6 py-3 text-[11px] font-medium uppercase tracking-[0.16em] text-[#080B0F] transition-colors duration-300 hover:border-[#080B0F] hover:bg-[#080B0F] hover:text-[#F5F2EA]"
              >
                Clear Filters
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
