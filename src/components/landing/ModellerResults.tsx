"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { ModelInputs, ModelOutputs } from "../../lib/finance";
import { aed, pct } from "../../lib/format";

function buildSeries(inputs: ModelInputs) {
  const out = [];
  let rent = 0;
  for (let y = 0; y <= inputs.years; y++) {
    const value = inputs.propertyValue * Math.pow(1 + inputs.appreciation / 100, y);
    out.push({ year: `Y${y}`, value: Math.round(value), equity: Math.round(value + rent) });
    rent += inputs.propertyValue * (inputs.grossYield / 100) * (inputs.occupancy / 100);
  }
  return out;
}

type TipProps = { active?: boolean; payload?: { value: number }[]; label?: string };

function Tip({ active, payload, label }: TipProps) {
  if (!active || !payload || !payload.length) return null;
  return (
    <div className="border border-[#080B0F]/12 bg-white px-4 py-3">
      <div className="text-[10px] uppercase tracking-[0.2em] text-[#080B0F]/45">{label}</div>
      <div
        className="mt-1 text-[15px] font-medium text-[#080B0F]"
        style={{ fontFamily: "var(--font-display)" }}
      >
        {aed(payload[0].value, true)}
      </div>
    </div>
  );
}

export default function ModellerResults({ inputs, outputs }: { inputs: ModelInputs; outputs: ModelOutputs }) {
  const kpis = [
    { label: "Total ROI", value: pct(outputs.totalRoi), tone: "gold" },
    { label: "Estimated IRR", value: pct(outputs.irr), tone: "up" },
    { label: "Annualised ROI", value: pct(outputs.annualisedRoi), tone: "dark" },
    { label: "Total profit", value: aed(outputs.totalProfit, true), tone: "dark" },
  ];

  return (
    <div className="border border-[#080B0F]/10 bg-white">
      <div className="grid grid-cols-2 gap-px bg-[#080B0F]/8 lg:grid-cols-4">
        {kpis.map((k) => (
          <div key={k.label} className="bg-white p-6">
            <div className="text-[11.5px] text-[#080B0F]/50">{k.label}</div>
            <div
              className={`mt-3 text-[29px] font-medium tracking-[-0.01em] ${
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

      <div className="px-6 pt-8">
        <div className="flex items-center justify-between">
          <h4 className="text-[14px] font-medium text-[#080B0F]/70">Projected portfolio value</h4>
          <span className="text-[12px] text-[#080B0F]/45">Modelled · not a forecast</span>
        </div>
      </div>
      <div className="h-[220px] px-3 pb-4 pt-4">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={buildSeries(inputs)} margin={{ top: 8, right: 12, left: 4, bottom: 0 }}>
            <defs>
              <linearGradient id="modFill" x1="0" y1="0" x2="0" y2="1">
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
              tickFormatter={(v) => `${Math.round(Number(v) / 1000000)}M`}
            />
            <Tooltip content={<Tip />} cursor={{ stroke: "#1F6F5C", strokeOpacity: 0.35 }} />
            <Area type="monotone" dataKey="value" stroke="#1F6F5C" strokeWidth={2} fill="url(#modFill)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-3 gap-px border-t border-[#080B0F]/8 bg-[#080B0F]/8">
        {[
          { l: "Capital gain", v: aed(outputs.capitalGain, true) },
          { l: "Rental income", v: aed(outputs.rentalIncome, true) },
          { l: "Exit value", v: aed(outputs.futureValue, true) },
        ].map((r) => (
          <div key={r.l} className="bg-white px-6 py-5">
            <div className="text-[11.5px] text-[#080B0F]/50">{r.l}</div>
            <div className="mt-2 text-[15px] font-medium text-[#080B0F]/85">{r.v}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
