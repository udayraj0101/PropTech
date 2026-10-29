"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import Display from "../ui/Display";
import { aed, pct } from "../../lib/format";
import { runModel, type ModelInputs } from "../../lib/finance";
import type { ProjectDetailShape } from "../admin/dev-detail/detailTypes";
import { buildInitialInputs, inputsToQuery } from "./modellerShared";
import styles from "../landing/Slider.module.css";

type FetchState =
  | { kind: "loading" }
  | { kind: "ready"; project: ProjectDetailShape }
  | { kind: "error"; message: string; configMissing: boolean; upstreamStatus?: number };

/** Compact AED formatter honouring the Reelly scale (millions-sized numbers). */
function aedMillions(n: number): string {
  if (!Number.isFinite(n)) return "AED —";
  if (Math.abs(n) >= 1_000_000) return `AED ${(n / 1_000_000).toFixed(2).replace(/\.00$/, "")}M`;
  if (Math.abs(n) >= 1_000) return `AED ${(n / 1_000).toFixed(0)}K`;
  return aed(n);
}

export default function BrokerModeller({ id }: { id: string }) {
  const [state, setState] = useState<FetchState>({ kind: "loading" });
  const [inputs, setInputs] = useState<ModelInputs | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(`/api/projects/${encodeURIComponent(id)}`);
        const data = (await res.json()) as {
          project?: ProjectDetailShape;
          error?: string;
          configMissing?: boolean;
          upstreamStatus?: number;
        };
        if (cancelled) return;
        if (!res.ok || !data.project) {
          setState({
            kind: "error",
            message: data.error ?? `Request failed with status ${res.status}`,
            configMissing: Boolean(data.configMissing),
            upstreamStatus: data.upstreamStatus,
          });
          return;
        }
        setState({ kind: "ready", project: data.project });
        setInputs(buildInitialInputs(data.project));
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
  }, [id]);

  if (state.kind === "loading") {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <span className="text-[11px] uppercase tracking-[0.3em] text-[#080B0F]/40">
          Loading project…
        </span>
      </div>
    );
  }

  if (state.kind === "error") {
    return (
      <div className="border border-[#C06B57]/40 bg-[#F7E7E1] px-6 py-10">
        <p className="text-[13px] font-medium text-[#9E4A38]">
          {state.configMissing
            ? "Reelly API key not configured."
            : state.upstreamStatus === 404
            ? "Project not found."
            : "Could not load project."}
        </p>
        <p className="mt-2 text-[12.5px] leading-relaxed text-[#080B0F]/60">{state.message}</p>
      </div>
    );
  }

  if (!inputs) return null;
  const project = state.project;

  return (
    <ModellerBody project={project} inputs={inputs} setInputs={setInputs} />
  );
}

function ModellerBody({
  project,
  inputs,
  setInputs,
}: {
  project: ProjectDetailShape;
  inputs: ModelInputs;
  setInputs: React.Dispatch<React.SetStateAction<ModelInputs | null>>;
}) {
  const outputs = useMemo(() => runModel(inputs), [inputs]);
  const minPrice = project.min_price ?? 0;
  const maxPriceCeiling = Math.max((project.max_price ?? minPrice) * 1.5, minPrice * 1.5, 500_000);
  const location = [project.location?.district, project.location?.region]
    .filter(Boolean)
    .join(" · ");

  const update = (patch: Partial<ModelInputs>) =>
    setInputs((prev) => (prev ? { ...prev, ...patch } : prev));

  const rows: {
    key: keyof ModelInputs;
    label: string;
    min: number;
    max: number;
    step: number;
    format: (v: number) => string;
  }[] = [
    {
      key: "propertyValue",
      label: "Property price",
      min: Math.max(500_000, Math.floor(minPrice * 0.5)),
      max: Math.ceil(maxPriceCeiling),
      step: 50_000,
      format: (v) => aedMillions(v),
    },
    {
      key: "years",
      label: "Hold period",
      min: 1,
      max: 15,
      step: 1,
      format: (v) => `${v} ${v === 1 ? "year" : "years"}`,
    },
    { key: "grossYield", label: "Gross rental yield", min: 2, max: 10, step: 0.1, format: (v) => `${v.toFixed(1)}%` },
    { key: "appreciation", label: "Capital appreciation p.a.", min: 0, max: 12, step: 0.1, format: (v) => `${v.toFixed(1)}%` },
    { key: "occupancy", label: "Occupancy", min: 60, max: 100, step: 1, format: (v) => `${v}%` },
  ];

  return (
    <div>
      <Link
        href="/workspace/modeller"
        className="inline-flex items-center gap-2 text-[11.5px] uppercase tracking-[0.18em] text-[#080B0F]/55 transition-colors hover:text-[#C9A45C]"
      >
        <i className="ri-arrow-left-line" /> Back to Projects
      </Link>

      <header className="mt-6">
        <div className="flex items-center gap-3">
          <span className="h-px w-8 bg-[#C9A45C]" />
          <span className="text-[10.5px] uppercase tracking-[0.34em] text-[#C9A45C]">
            Investment modeller
          </span>
        </div>
        <Display
          as="h1"
          className="mt-3 text-[32px] font-medium leading-[1.05] tracking-[-0.03em] text-[#080B0F] md:text-[40px]"
        >
          {project.name}
        </Display>
        <p className="mt-2 text-[13.5px] text-[#080B0F]/55">
          {location} · by {project.developer}
        </p>
      </header>

      <div className="mt-10 grid gap-px bg-[#080B0F]/10 lg:grid-cols-[minmax(320px,0.85fr)_1.5fr]">
        {/* Controls */}
        <div className="flex flex-col gap-8 bg-white p-8 md:p-10">
          <div className="border border-[#080B0F]/12 bg-[#FBFAF6] p-5">
            <div className="text-[10px] uppercase tracking-[0.22em] text-[#080B0F]/50">
              Reelly reference price
            </div>
            <div
              className="mt-2 text-[18px] font-medium text-[#080B0F]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {minPrice > 0 ? aedMillions(minPrice) : "—"}
            </div>
            <p className="mt-3 border-t border-[#080B0F]/8 pt-3 text-[12px] leading-relaxed text-[#080B0F]/55">
              Override with the actual available unit price — every figure recalculates
              instantly.
            </p>
          </div>

          {rows.map((r) => (
            <div key={r.key}>
              <div className="flex items-baseline justify-between">
                <label className="text-[13.5px] text-[#080B0F]/70">{r.label}</label>
                <span
                  className="text-[14px] font-medium text-[#080B0F]"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {r.format(inputs[r.key])}
                </span>
              </div>
              <input
                type="range"
                min={r.min}
                max={r.max}
                step={r.step}
                value={inputs[r.key]}
                onChange={(e) =>
                  update({ [r.key]: Number(e.target.value) } as Partial<ModelInputs>)
                }
                suppressHydrationWarning
                className={`mt-3 h-1 w-full cursor-pointer ${styles.slider}`}
              />
            </div>
          ))}
        </div>

        {/* Results preview + CTA */}
        <div className="flex flex-col gap-6 bg-[#FBFAF6] p-6 md:p-8">
          <div className="border border-[#080B0F]/10 bg-white">
            <div className="grid grid-cols-2 gap-px bg-[#080B0F]/8 lg:grid-cols-4">
              {[
                { label: "Total ROI", value: pct(outputs.totalRoi), tone: "gold" },
                { label: "Estimated IRR", value: pct(outputs.irr), tone: "up" },
                { label: "Annualised ROI", value: pct(outputs.annualisedRoi), tone: "dark" },
                { label: "Total profit", value: aedMillions(outputs.totalProfit), tone: "dark" },
              ].map((k) => (
                <div key={k.label} className="bg-white p-6">
                  <div className="text-[11.5px] text-[#080B0F]/50">{k.label}</div>
                  <div
                    className={`mt-3 text-[26px] font-medium tracking-[-0.01em] ${
                      k.tone === "gold"
                        ? "text-[#9A7B33]"
                        : k.tone === "up"
                        ? "text-[#1F6F5C]"
                        : "text-[#080B0F]"
                    }`}
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {k.value}
                  </div>
                </div>
              ))}
            </div>

            <div className="px-6 pt-7">
              <div className="flex items-center justify-between">
                <h4 className="text-[14px] font-medium text-[#080B0F]/70">
                  Projected value trajectory
                </h4>
                <span className="text-[12px] text-[#080B0F]/45">Modelled · not a forecast</span>
              </div>
            </div>
            <ProjectionChart inputs={inputs} />
          </div>

          <Link
            href={`/workspace/results/${encodeURIComponent(String(project.id))}?${inputsToQuery(
              inputs
            )}`}
            className="flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap bg-[#080B0F] px-8 py-4 text-[12px] font-medium uppercase tracking-[0.14em] text-[#F5F2EA] transition-colors duration-300 hover:bg-[#C9A45C] hover:text-[#080B0F]"
          >
            View full investment breakdown
            <i className="ri-arrow-right-line text-[14px]" />
          </Link>
        </div>
      </div>
    </div>
  );
}

function ProjectionChart({ inputs }: { inputs: ModelInputs }) {
  const series = useMemo(() => {
    const rows = [];
    for (let y = 0; y <= inputs.years; y++) {
      const value = inputs.propertyValue * Math.pow(1 + inputs.appreciation / 100, y);
      rows.push({ year: `Y${y}`, value: Math.round(value) });
    }
    return rows;
  }, [inputs]);

  return (
    <div className="h-[220px] px-3 pb-4 pt-4">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={series} margin={{ top: 8, right: 12, left: 4, bottom: 0 }}>
          <defs>
            <linearGradient id="modFillBroker" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1F6F5C" stopOpacity={0.22} />
              <stop offset="100%" stopColor="#1F6F5C" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="#080B0F" strokeOpacity={0.07} vertical={false} />
          <XAxis dataKey="year" tick={{ fill: "#8A8F96", fontSize: 11 }} axisLine={false} tickLine={false} />
          <YAxis
            tick={{ fill: "#8A8F96", fontSize: 11 }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => `${Math.round(Number(v) / 1_000_000)}M`}
          />
          <Tooltip
            content={({ active, payload, label }) => {
              if (!active || !payload || payload.length === 0) return null;
              const v = Number(payload[0].value);
              return (
                <div className="border border-[#080B0F]/12 bg-white px-4 py-3">
                  <div className="text-[10px] uppercase tracking-[0.2em] text-[#080B0F]/45">
                    {label}
                  </div>
                  <div
                    className="mt-1 text-[15px] font-medium text-[#080B0F]"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {aedMillions(v)}
                  </div>
                </div>
              );
            }}
            cursor={{ stroke: "#1F6F5C", strokeOpacity: 0.35 }}
          />
          <Area type="monotone" dataKey="value" stroke="#1F6F5C" strokeWidth={2} fill="url(#modFillBroker)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
