"use client";

import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";

const data = [
  { m: "Jan", v: 1400 },
  { m: "Feb", v: 1445 },
  { m: "Mar", v: 1478 },
  { m: "Apr", v: 1520 },
  { m: "May", v: 1585 },
  { m: "Jun", v: 1612 },
  { m: "Jul", v: 1670 },
  { m: "Aug", v: 1712 },
  { m: "Sep", v: 1768 },
];

type TipProps = { active?: boolean; payload?: { value: number }[]; label?: string };

function Tip({ active, payload, label }: TipProps) {
  if (!active || !payload || !payload.length) return null;
  return (
    <div className="border border-[#C9A45C]/40 bg-[#080B0F] px-3 py-2">
      <div className="text-[10px] uppercase tracking-[0.2em] text-[#F5F2EA]/50">{label}</div>
      <div className="mt-0.5 text-[13px] text-[#C9A45C]">{payload[0].value}K</div>
    </div>
  );
}

export default function PortfolioChart() {
  return (
    <div className="h-[170px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 6, right: 4, left: 4, bottom: 0 }}>
          <defs>
            <linearGradient id="pfFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#C9A45C" stopOpacity={0.28} />
              <stop offset="100%" stopColor="#C9A45C" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="m" tick={{ fill: "#8A8F96", fontSize: 11 }} axisLine={false} tickLine={false} />
          <Tooltip content={<Tip />} cursor={{ stroke: "#C9A45C", strokeOpacity: 0.4 }} />
          <Area type="monotone" dataKey="v" stroke="#C9A45C" strokeWidth={2} fill="url(#pfFill)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
