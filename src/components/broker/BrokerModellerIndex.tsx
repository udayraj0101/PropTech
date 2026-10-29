"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Display from "../ui/Display";
import { aedCompact } from "../../lib/developments";
import type { AdaptedDevelopment } from "../../lib/reelly";

type FetchState =
  | { kind: "loading" }
  | { kind: "ready"; projects: AdaptedDevelopment[] }
  | { kind: "error"; message: string; configMissing: boolean; upstreamStatus?: number };

export default function BrokerModellerIndex() {
  const [state, setState] = useState<FetchState>({ kind: "loading" });
  const [search, setSearch] = useState("");

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
  const q = search.trim().toLowerCase();
  const filtered = q
    ? projects.filter((p) =>
        `${p.name} ${p.developer} ${p.area}`.toLowerCase().includes(q)
      )
    : projects;

  return (
    <div>
      <div className="flex items-center gap-3">
        <span className="h-px w-8 bg-[#C9A45C]" />
        <span className="text-[10.5px] uppercase tracking-[0.34em] text-[#C9A45C]">
          Investment modeller
        </span>
      </div>
      <Display
        as="h1"
        className="mt-3.5 text-[32px] font-medium leading-[1.05] tracking-[-0.03em] text-[#080B0F] md:text-[44px]"
      >
        Choose a Development to Model
      </Display>
      <p className="mt-3 max-w-xl text-[14px] leading-relaxed text-[#080B0F]/55">
        Pick a project from Reelly to open the investment modeller — adjust price, hold
        period, rental yield and appreciation to project returns.
      </p>

      <div className="mt-8 flex min-w-[240px] max-w-md items-center border border-[#080B0F]/15 bg-white px-4 py-2.5 focus-within:border-[#080B0F]/45">
        <i className="ri-search-line text-[15px] text-[#080B0F]/40" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search projects…"
          suppressHydrationWarning
          className="w-full bg-transparent pl-3 text-sm text-[#080B0F] placeholder-[#080B0F]/35 outline-none"
        />
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
              : "Could not load projects from Reelly."}
          </p>
          <p className="mt-2 text-[12.5px] leading-relaxed text-[#080B0F]/60">{state.message}</p>
        </div>
      )}

      {state.kind === "ready" && (
        <div className="mt-8 flex flex-col border-t border-[#080B0F]/12">
          {filtered.map((p) => (
            <Link
              key={p.id}
              href={`/workspace/modeller/${encodeURIComponent(p.id)}`}
              className="group flex cursor-pointer flex-wrap items-center justify-between gap-6 border-b border-[#080B0F]/12 py-5 transition-colors duration-300 hover:bg-white"
            >
              <div className="flex min-w-0 items-center gap-5 pl-1">
                <div>
                  <div className="flex items-center gap-2.5">
                    <span className="h-px w-5 bg-[#C9A45C]" />
                    <span className="text-[9.5px] uppercase tracking-[0.24em] text-[#9A7433]">
                      {p.developer}
                    </span>
                  </div>
                  <div
                    className="mt-1.5 text-[17px] text-[#080B0F]"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {p.name}
                  </div>
                  <div className="mt-1 text-[11px] uppercase tracking-[0.16em] text-[#080B0F]/45">
                    {p.area} · {p.city} · {p.type}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-8">
                <div className="text-right">
                  <div className="text-[9px] uppercase tracking-[0.14em] text-[#9A7433]">
                    Price from
                  </div>
                  <div
                    className="mt-0.5 text-[18px] font-medium text-[#080B0F]"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {p.availablePrice > 0 ? aedCompact(p.availablePrice) : "—"}
                  </div>
                </div>
                <span className="flex h-9 w-9 shrink-0 items-center justify-center border border-[#080B0F]/15 text-[#080B0F]/60 transition-colors duration-300 group-hover:border-[#080B0F] group-hover:bg-[#080B0F] group-hover:text-[#F5F2EA]">
                  <i className="ri-arrow-right-line" />
                </span>
              </div>
            </Link>
          ))}

          {filtered.length === 0 && (
            <div className="border border-[#080B0F]/12 bg-white px-6 py-16 text-center">
              <span className="text-[14px] text-[#080B0F]/55">
                No projects match &quot;{search}&quot;.
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
