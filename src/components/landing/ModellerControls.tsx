import type { ModelInputs } from "../../lib/finance";
import { aed } from "../../lib/format";
import styles from "./Slider.module.css";

type Props = {
  inputs: ModelInputs;
  onChange: (patch: Partial<ModelInputs>) => void;
};

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
    label: "Available property price",
    min: 500000,
    max: 20000000,
    step: 50000,
    format: (v) => aed(v),
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
  { key: "occupancy", label: "Occupancy assumption", min: 60, max: 100, step: 1, format: (v) => `${v}%` },
];

export default function ModellerControls({ inputs, onChange }: Props) {
  return (
    <div className="flex flex-col gap-8">
      <div className="border border-[#080B0F]/12 bg-white p-5">
        <div className="flex items-center justify-between gap-4">
          <div>
            <div className="text-[12px] text-[#080B0F]/50">Reference price</div>
            <div className="mt-1.5 text-[15px] text-[#080B0F]/45 line-through">AED 1,000,000</div>
          </div>
          <i className="ri-arrow-right-line text-[#C9A45C]" />
          <div className="text-right">
            <div className="text-[12px] text-[#C9A45C]">Available price</div>
            <div
              className="mt-1.5 text-[17px] font-medium text-[#080B0F]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {aed(inputs.propertyValue, true)}
            </div>
          </div>
        </div>
        <p className="mt-4 border-t border-[#080B0F]/8 pt-4 text-[12.5px] leading-relaxed text-[#080B0F]/55">
          Brokers can override the reference price with the actual available unit price — every figure updates
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
              onChange({ [r.key]: Number(e.target.value) } as Partial<ModelInputs>)
            }
            className={`mt-3 h-1 w-full cursor-pointer ${styles.slider}`}
          />
        </div>
      ))}
    </div>
  );
}
