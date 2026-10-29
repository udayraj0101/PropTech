"use client";

import { useState } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const growth = [
  { k: "2018", v: 100 },
  { k: "2019", v: 104 },
  { k: "2020", v: 97 },
  { k: "2021", v: 106 },
  { k: "2022", v: 119 },
  { k: "2023", v: 133 },
  { k: "2024", v: 146 },
  { k: "2025", v: 158 },
  { k: "2026", v: 171 },
];

const yields = [
  { k: "Al Reem", v: 6.8 },
  { k: "Yas", v: 6.2 },
  { k: "Dubai Marina", v: 5.7 },
  { k: "Downtown", v: 5.3 },
  { k: "Saadiyat", v: 5.1 },
  { k: "Al Bateen", v: 4.6 },
];

const transactions = [
  { k: "Q1", v: 3120 },
  { k: "Q2", v: 3675 },
  { k: "Q3", v: 4318 },
  { k: "Q4", v: 4082 },
];

const tabs = [
  { id: "growth", label: "Price growth" },
  { id: "yield", label: "Rental yield" },
  { id: "txn", label: "Transaction activity" },
];

type TipProps = { active?: boolean; payload?: { value: number }[]; label?: string; unit?: string };

function Tip({ active, payload, label, unit }: TipProps) {
  if (!active || !payload || !payload.length) return null;
  return (
    <div className="border border-[#C9A45C]/40 bg-[#080B0F] px-4 py-3">
      <div className="text-[10px] uppercase tracking-[0.2em] text-[#F5F2EA]/50">{label}</div>
      <div
        className="mt-1.5 text-[16px] font-medium text-[#C9A45C]"
        style={{ fontFamily: "var(--font-display)" }}
      >
        {payload[0].value}
        {unit || ""}
      </div>
    </div>
  );
}

const axis = { fill: "#8A8F96", fontSize: 11 };

export default function PulsePanel() {
  const [tab, setTab] = useState("growth");

  return (
    <div className="border border-[#F5F2EA]/12 bg-[#0D1116]">
      <div className="flex flex-wrap items-center justify-between gap-5 border-b border-[#F5F2EA]/10 px-6 py-5 md:px-8">
        <div>
          <h4
            className="text-[15px] font-medium text-[#F5F2EA]/90"
            style={{ fontFamily: "var(--font-display)" }}
          >
            UAE market performance
          </h4>
          <p className="mt-1 text-[12px] text-[#F5F2EA]/45">Illustrative demonstration data</p>
        </div>
        <div className="flex flex-wrap gap-1">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              suppressHydrationWarning
              className={`cursor-pointer px-4 py-2 text-[12px] transition-colors duration-300 ${
                tab === t.id ? "bg-[#C9A45C] text-[#080B0F]" : "text-[#F5F2EA]/55 hover:text-[#F5F2EA]"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div className="h-[340px] p-5 md:p-8">
        <ResponsiveContainer width="100%" height="100%">
          {tab === "growth" ? (
            <AreaChart data={growth} margin={{ top: 10, right: 6, left: -18, bottom: 0 }}>
              <defs>
                <linearGradient id="pulseFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#C9A45C" stopOpacity={0.28} />
                  <stop offset="100%" stopColor="#C9A45C" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="#FFFFFF" strokeOpacity={0.06} vertical={false} />
              <XAxis dataKey="k" tick={axis} axisLine={false} tickLine={false} />
              <YAxis tick={axis} axisLine={false} tickLine={false} domain={[80, 180]} />
              <Tooltip content={<Tip />} cursor={{ stroke: "#C9A45C", strokeOpacity: 0.4 }} />
              <Area
                type="monotone"
                dataKey="v"
                stroke="#C9A45C"
                strokeWidth={2}
                fill="url(#pulseFill)"
                animationDuration={1400}
              />
            </AreaChart>
          ) : (
            <BarChart
              data={tab === "yield" ? yields : transactions}
              margin={{ top: 10, right: 6, left: -18, bottom: 0 }}
            >
              <CartesianGrid stroke="#FFFFFF" strokeOpacity={0.06} vertical={false} />
              <XAxis dataKey="k" tick={axis} axisLine={false} tickLine={false} />
              <YAxis tick={axis} axisLine={false} tickLine={false} />
              <Tooltip
                content={<Tip unit={tab === "yield" ? "%" : ""} />}
                cursor={{ fill: "#FFFFFF", fillOpacity: 0.03 }}
              />
              <Bar
                dataKey="v"
                fill={tab === "yield" ? "#2F7D63" : "#4A4E55"}
                maxBarSize={54}
                animationDuration={1200}
              />
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
}
