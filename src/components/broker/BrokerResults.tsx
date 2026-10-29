"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
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
import { pct } from "../../lib/format";
import { runModel, type ModelInputs } from "../../lib/finance";
import type { ProjectDetailShape } from "../admin/dev-detail/detailTypes";
import { buildInitialInputs, inputsToQuery, readInputs } from "./modellerShared";

type FetchState =
  | { kind: "loading" }
  | { kind: "ready"; project: ProjectDetailShape }
  | { kind: "error"; message: string; configMissing: boolean; upstreamStatus?: number };

function aedMillions(n: number): string {
  if (!Number.isFinite(n)) return "AED —";
  if (Math.abs(n) >= 1_000_000) return `AED ${(n / 1_000_000).toFixed(2).replace(/\.00$/, "")}M`;
  if (Math.abs(n) >= 1_000) return `AED ${(n / 1_000).toFixed(0)}K`;
  return `AED ${Math.round(n).toLocaleString("en-US")}`;
}

export default function BrokerResults({ id }: { id: string }) {
  // useSearchParams needs a Suspense boundary in app router.
  return (
    <Suspense fallback={<ResultsFallback />}>
      <BrokerResultsInner id={id} />
    </Suspense>
  );
}

function ResultsFallback() {
  return (
    <div className="flex min-h-[400px] items-center justify-center">
      <span className="text-[11px] uppercase tracking-[0.3em] text-[#080B0F]/40">
        Loading results…
      </span>
    </div>
  );
}

function BrokerResultsInner({ id }: { id: string }) {
  const search = useSearchParams();
  const [state, setState] = useState<FetchState>({ kind: "loading" });

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

  if (state.kind === "loading") return <ResultsFallback />;

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

  const project = state.project;
  const inputs = readInputs(new URLSearchParams(search.toString()), buildInitialInputs(project));
  return <ResultsBody project={project} inputs={inputs} />;
}

function ResultsBody({
  project,
  inputs,
}: {
  project: ProjectDetailShape;
  inputs: ModelInputs;
}) {
  const outputs = useMemo(() => runModel(inputs), [inputs]);
  const location = [project.location?.district, project.location?.region]
    .filter(Boolean)
    .join(" · ");

  const paymentSteps = project.payment_plans?.[0]?.steps ?? [];

  return (
    <div>
      <Link
        href={`/workspace/modeller/${encodeURIComponent(String(project.id))}?${inputsToQuery(
          inputs
        )}`}
        className="inline-flex items-center gap-2 text-[11.5px] uppercase tracking-[0.18em] text-[#080B0F]/55 transition-colors hover:text-[#C9A45C]"
      >
        <i className="ri-arrow-left-line" /> Back to Modeller
      </Link>

      <header className="mt-6">
        <div className="flex items-center gap-3">
          <span className="h-px w-8 bg-[#C9A45C]" />
          <span className="text-[10.5px] uppercase tracking-[0.34em] text-[#C9A45C]">
            Investment results
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

      {/* KPI tiles */}
      <section className="mt-10 border border-[#080B0F]/10 bg-white">
        <div className="grid grid-cols-2 gap-px bg-[#080B0F]/8 lg:grid-cols-4">
          {[
            { label: "Total ROI", value: pct(outputs.totalRoi), tone: "gold" },
            { label: "Estimated IRR", value: pct(outputs.irr), tone: "up" },
            { label: "Annualised ROI", value: pct(outputs.annualisedRoi), tone: "dark" },
            { label: "Total profit", value: aedMillions(outputs.totalProfit), tone: "dark" },
          ].map((k) => (
            <div key={k.label} className="bg-white p-7">
              <div className="text-[11.5px] text-[#080B0F]/50">{k.label}</div>
              <div
                className={`mt-3 text-[30px] font-medium tracking-[-0.01em] ${
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
      </section>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1.4fr_1fr]">
        {/* Value projection chart */}
        <section className="border border-[#080B0F]/10 bg-white">
          <div className="flex items-center justify-between border-b border-[#080B0F]/10 px-6 py-5">
            <h2
              className="text-[16px] font-medium text-[#080B0F]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Value projection
            </h2>
            <span className="text-[11px] uppercase tracking-[0.2em] text-[#080B0F]/45">
              Modelled · {inputs.years}-year hold
            </span>
          </div>
          <ValueChart inputs={inputs} />
        </section>

        {/* Investment summary */}
        <section className="border border-[#080B0F]/10 bg-white">
          <div className="border-b border-[#080B0F]/10 px-6 py-5">
            <h2
              className="text-[16px] font-medium text-[#080B0F]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Investment summary
            </h2>
          </div>
          <dl className="divide-y divide-[#080B0F]/8">
            {[
              { label: "Property price", value: aedMillions(inputs.propertyValue) },
              { label: "Capital gain", value: aedMillions(outputs.capitalGain) },
              { label: "Rental income", value: aedMillions(outputs.rentalIncome) },
              { label: "Exit value", value: aedMillions(outputs.futureValue) },
              { label: "Gross yield", value: pct(inputs.grossYield) },
              { label: "Occupancy", value: pct(inputs.occupancy) },
            ].map((row) => (
              <div key={row.label} className="flex items-center justify-between gap-4 px-6 py-4">
                <dt className="text-[12.5px] text-[#080B0F]/55">{row.label}</dt>
                <dd className="text-[14px] font-medium text-[#080B0F]">{row.value}</dd>
              </div>
            ))}
          </dl>
        </section>
      </div>

      {/* Payment plan projection */}
      {paymentSteps.length > 0 && (
        <section className="mt-10 border border-[#080B0F]/10 bg-white">
          <div className="border-b border-[#080B0F]/10 px-6 py-5">
            <h2
              className="text-[16px] font-medium text-[#080B0F]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Payment plan at this price
            </h2>
            <p className="mt-1 text-[12px] text-[#080B0F]/55">
              Applying Reelly&apos;s payment plan percentages to your modelled price.
            </p>
          </div>
          <div className="divide-y divide-[#080B0F]/8">
            {paymentSteps.map((step, i) => {
              const pctValue = typeof step.percentage === "number" ? step.percentage : 0;
              const amount = (inputs.propertyValue * pctValue) / 100;
              return (
                <div
                  key={step.id ?? i}
                  className="flex items-center justify-between gap-6 px-6 py-5"
                >
                  <div className="flex items-center gap-5">
                    <span
                      className="flex h-11 w-11 shrink-0 items-center justify-center border border-[#C9A45C]/40 bg-[#C9A45C]/10 text-[12px] font-semibold text-[#9A7433]"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {pctValue}%
                    </span>
                    <div>
                      <p className="text-[14px] font-medium text-[#080B0F]">{step.name}</p>
                      {step.notes && (
                        <p className="mt-0.5 text-[12px] text-[#080B0F]/50">{step.notes}</p>
                      )}
                    </div>
                  </div>
                  <span
                    className="text-[15px] font-medium text-[#080B0F]"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {aedMillions(amount)}
                  </span>
                </div>
              );
            })}
          </div>
        </section>
      )}

      <p className="mt-10 max-w-3xl text-[11px] leading-relaxed text-[#080B0F]/45">
        Modelled projections only. Returns depend on actual market conditions, exit timing,
        rental demand and holding costs. Not a guarantee of performance.
      </p>
    </div>
  );
}

function ValueChart({ inputs }: { inputs: ModelInputs }) {
  const series = useMemo(() => {
    const rows = [];
    let rent = 0;
    for (let y = 0; y <= inputs.years; y++) {
      const value = inputs.propertyValue * Math.pow(1 + inputs.appreciation / 100, y);
      rows.push({
        year: `Y${y}`,
        value: Math.round(value),
        equity: Math.round(value + rent),
      });
      rent += inputs.propertyValue * (inputs.grossYield / 100) * (inputs.occupancy / 100);
    }
    return rows;
  }, [inputs]);

  return (
    <div className="h-[320px] px-3 pb-5 pt-5">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={series} margin={{ top: 8, right: 16, left: 4, bottom: 0 }}>
          <defs>
            <linearGradient id="resEquity" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#C9A45C" stopOpacity={0.28} />
              <stop offset="100%" stopColor="#C9A45C" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="resValue" x1="0" y1="0" x2="0" y2="1">
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
              return (
                <div className="border border-[#080B0F]/12 bg-white px-4 py-3">
                  <div className="text-[10px] uppercase tracking-[0.2em] text-[#080B0F]/45">
                    {label}
                  </div>
                  {payload.map((p) => (
                    <div
                      key={String(p.dataKey)}
                      className="mt-1 flex items-center justify-between gap-4 text-[12.5px]"
                    >
                      <span className="text-[#080B0F]/60">
                        {p.dataKey === "value" ? "Capital" : "+ Rental"}
                      </span>
                      <span className="font-medium text-[#080B0F]">
                        {aedMillions(Number(p.value))}
                      </span>
                    </div>
                  ))}
                </div>
              );
            }}
            cursor={{ stroke: "#C9A45C", strokeOpacity: 0.35 }}
          />
          <Area
            type="monotone"
            dataKey="equity"
            stroke="#C9A45C"
            strokeWidth={2}
            fill="url(#resEquity)"
          />
          <Area
            type="monotone"
            dataKey="value"
            stroke="#1F6F5C"
            strokeWidth={2}
            fill="url(#resValue)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
