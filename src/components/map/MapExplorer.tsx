"use client";

import { useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import MapFiltersBar, {
  EMPTY_MAP_FILTERS,
  type MapFilters,
} from "./MapFiltersBar";
import ProjectCard from "./ProjectCard";
import { priceBand } from "../../lib/developments";
import type { AdaptedDevelopment } from "../../lib/reelly";

// Leaflet touches `window` on import — avoid SSR entirely.
const LeafletMap = dynamic(() => import("./LeafletMap"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center bg-[#DDE7E7]">
      <span className="text-[11px] uppercase tracking-[0.3em] text-[#080B0F]/40">
        Loading map…
      </span>
    </div>
  ),
});

type FetchState =
  | { kind: "loading" }
  | { kind: "ready"; projects: AdaptedDevelopment[] }
  | {
      kind: "error";
      message: string;
      configMissing: boolean;
      upstreamStatus?: number;
    };

export default function MapExplorer({
  detailBase = "/admin/developments",
}: {
  detailBase?: string;
} = {}) {
  const [state, setState] = useState<FetchState>({ kind: "loading" });
  const [filters, setFilters] = useState<MapFilters>(EMPTY_MAP_FILTERS);
  // Hover-highlight (syncs card ↔ marker ring). Open card is tracked
  // separately so hovering doesn't force a popup.
  const [activeId, setActiveId] = useState<string | null>(null);
  const [openId, setOpenId] = useState<string | null>(null);

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

  const visible = useMemo(() => {
    const q = filters.search.trim().toLowerCase();
    return projects.filter((p) => {
      if (q) {
        const hay = `${p.name} ${p.developer} ${p.area} ${p.city}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      if (filters.developer !== "All" && p.developer !== filters.developer) return false;
      if (filters.price !== "All" && priceBand(p.availablePrice) !== filters.price) return false;
      return true;
    });
  }, [projects, filters]);

  return (
    <div className="flex h-[calc(100svh-68px-72px)] min-h-[640px] w-full flex-col bg-[#F5F2EA]">
      <MapFiltersBar
        filters={filters}
        developerOptions={developerOptions}
        onChange={(patch) => setFilters((f) => ({ ...f, ...patch }))}
        resultCount={visible.length}
      />

      {state.kind === "loading" && (
        <div className="flex flex-1 items-center justify-center">
          <span className="text-[11px] uppercase tracking-[0.3em] text-[#080B0F]/40">
            Loading from Reelly…
          </span>
        </div>
      )}

      {state.kind === "error" && (
        <div className="m-6 border border-[#C06B57]/40 bg-[#F7E7E1] px-6 py-10 md:m-10">
          <p className="text-[13px] font-medium text-[#9E4A38]">
            {state.configMissing
              ? "Reelly API key not configured."
              : state.upstreamStatus && state.upstreamStatus >= 500
              ? `Reelly API is currently returning ${state.upstreamStatus}. Upstream issue — the map will populate automatically once Reelly recovers.`
              : "Could not load projects from Reelly."}
          </p>
          <p className="mt-2 text-[12.5px] leading-relaxed text-[#080B0F]/60">
            {state.configMissing
              ? "Add REELLY_API_KEY to .env.local and restart the dev server."
              : state.message}
          </p>
        </div>
      )}

      {state.kind === "ready" && (
        <div className="flex min-h-0 flex-1 flex-col lg:flex-row">
          <aside className="flex min-h-0 flex-1 flex-col overflow-y-auto border-b border-[#080B0F]/10 bg-[#F5F2EA] lg:w-[46%] lg:max-w-[720px] lg:flex-none lg:border-b-0 lg:border-r">
            {visible.length === 0 ? (
              <div className="flex flex-1 items-center justify-center px-10 py-20 text-center">
                <div>
                  <i className="ri-search-eye-line text-2xl text-[#080B0F]/30" />
                  <p className="mt-4 text-[14px] text-[#080B0F]/60">
                    No projects match these filters.
                  </p>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-5 px-6 py-6 md:grid-cols-2 md:px-8">
                {visible.map((p) => (
                  <ProjectCard
                    key={p.id}
                    project={p}
                    active={p.id === activeId || p.id === openId}
                    onHover={() => setActiveId(p.id)}
                    onFocus={() => setActiveId(p.id)}
                    detailBase={detailBase}
                  />
                ))}
              </div>
            )}
          </aside>

          <section className="relative min-h-[420px] flex-1 lg:min-h-0">
            <LeafletMap
              projects={visible}
              activeId={activeId}
              openId={openId}
              onHover={setActiveId}
              onOpen={setOpenId}
              onClose={() => setOpenId(null)}
              detailBase={detailBase}
            />
          </section>
        </div>
      )}
    </div>
  );
}
