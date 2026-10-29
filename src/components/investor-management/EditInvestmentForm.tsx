"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Display from "../ui/Display";
import SettingsField from "../investor/settings/SettingsField";
import DevelopmentPicker from "./DevelopmentPicker";
import UnitPicker from "./UnitPicker";
import StatusSelect from "./StatusSelect";
import { developments } from "../../lib/developments";
import { resolveInvestor, updateInvestment } from "../../lib/investorStore";
import {
  INVESTMENT_FORM_STATUSES,
  PRICE_MODEL_NOTE,
  findInvestment,
  type Investment,
  type InvestmentStatus,
  type Investor,
} from "../../lib/investors";

export default function EditInvestmentForm() {
  const router = useRouter();
  const params = useSearchParams();
  const investorId = params.get("investor");
  const investmentId = params.get("investment");

  const [investor, setInvestor] = useState<Investor | null>(null);
  const [record, setRecord] = useState<Investment | null>(null);
  const [loaded, setLoaded] = useState(false);

  const [devId, setDevId] = useState("");
  const [unitId, setUnitId] = useState("");
  const [price, setPrice] = useState("");
  const [date, setDate] = useState("");
  const [status, setStatus] = useState<InvestmentStatus>("Active");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const submittingRef = useRef(false);

  useEffect(() => {
    const found = resolveInvestor(investorId) ?? null;
    const existing = found ? findInvestment(found, investmentId) ?? null : null;
    setInvestor(found);
    setRecord(existing);

    if (existing) {
      const dev =
        developments.find((d) => d.id === existing.developmentId) ||
        developments.find((d) => d.name === existing.development);
      setDevId(dev?.id ?? "");
      const unit = dev?.units.find((u) => `${u.bedrooms} ${u.type}` === existing.unit);
      setUnitId(unit?.id ?? "");
      setPrice(String(existing.purchasePrice));
      setDate(existing.purchaseDate);
      setStatus(existing.status);
    }
    setLoaded(true);
  }, [investorId, investmentId]);

  const development = developments.find((d) => d.id === devId);

  function validate() {
    const next: Record<string, string> = {};
    if (!devId) next.development = "Development is required";
    if (!unitId) next.unit = "Property / unit is required";
    const amount = Number(price.replace(/,/g, ""));
    if (!price.trim() || !isFinite(amount) || amount <= 0) next.price = "Actual purchase price is required";
    if (!date) next.date = "Purchase date is required";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function submit(e: FormEvent) {
    e.preventDefault();
    if (submittingRef.current || !investor || !record) return;
    if (!validate()) return;
    const dev = developments.find((d) => d.id === devId);
    const unit = dev?.units.find((u) => u.id === unitId);
    if (!dev || !unit) return;
    submittingRef.current = true;

    const updated: Investment = {
      ...record,
      developmentId: dev.id,
      development: dev.name,
      unit: `${unit.bedrooms} ${unit.type}`,
      unitType: unit.type,
      size: unit.size,
      purchasePrice: Math.round(Number(price.replace(/,/g, ""))),
      purchaseDate: date,
      startingPrice: Math.round(dev.startingPrice * 1_000_000),
      availablePrice: Math.round(unit.price * 1_000_000),
      status,
    };

    updateInvestment(record.id, updated);
    router.push(`/workspace/investors/investment-detail?investor=${investor.id}&investment=${record.id}`);
  }

  const backHref = investor ? `/workspace/investors/view?id=${investor.id}` : "/workspace/investors";

  if (!loaded) {
    return (
      <div className="flex min-h-[60vh] w-full items-center justify-center bg-[#F5F2EA]">
        <span className="text-[11px] uppercase tracking-[0.3em] text-[#080B0F]/40">Loading investment</span>
      </div>
    );
  }

  if (!investor || !record) {
    return (
      <div className="flex min-h-[60vh] w-full flex-col items-center justify-center gap-5 bg-[#F5F2EA] text-center">
        <div className="text-[15px] text-[#080B0F]/70">This investment could not be found.</div>
        <Link
          href="/workspace/investors"
          className="cursor-pointer text-[11.5px] uppercase tracking-[0.18em] text-[#9A7433] transition-colors hover:text-[#080B0F]"
        >
          Back to investors
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full bg-[#F5F2EA] pb-24">
      <div className="mx-auto w-full max-w-[900px] px-6 pt-9 md:px-10">
        <Link
          href={backHref}
          className="flex cursor-pointer items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-[#080B0F]/50 transition-colors hover:text-[#9A7433]"
        >
          <i className="ri-arrow-left-line" />
          Back to {investor.name}
        </Link>

        <div className="mt-8 flex items-center gap-3">
          <span className="h-px w-8 bg-[#C9A45C]" />
          <span className="text-[10.5px] uppercase tracking-[0.34em] text-[#C9A45C]">Investments</span>
        </div>
        <Display className="mt-3.5 text-[32px] font-medium leading-[1.05] tracking-[-0.03em] text-[#080B0F] md:text-[44px]">
          Edit Investment
        </Display>
        <p className="mt-3 max-w-xl text-[14px] leading-relaxed text-[#080B0F]/55">
          Update the property, acquisition details or status for this investment record.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border border-[#080B0F]/12 bg-white px-6 py-5">
          <div>
            <div className="text-[9.5px] uppercase tracking-[0.18em] text-[#080B0F]/40">Investor</div>
            <div className="mt-1.5 text-[17px] text-[#080B0F]" style={{ fontFamily: "var(--font-display)" }}>
              {investor.name}
            </div>
          </div>
          <div className="text-[13px] text-[#080B0F]/60">{investor.email}</div>
        </div>

        <form onSubmit={submit} noValidate className="mt-6 flex flex-col gap-6">
          <section className="border border-[#080B0F]/12 bg-white">
            <div className="border-b border-[#080B0F]/8 px-8 py-6 md:px-11">
              <h3 className="text-[17px] text-[#080B0F]" style={{ fontFamily: "var(--font-display)" }}>
                Investment Details
              </h3>
              <p className="mt-2 max-w-xl text-[12px] leading-relaxed text-[#080B0F]/50">
                Select the development and the specific property or unit this investor purchased.
              </p>
            </div>
            <div className="grid gap-7 px-8 py-8 md:grid-cols-2 md:px-11">
              <DevelopmentPicker
                value={devId}
                onChange={(id) => {
                  setDevId(id);
                  setUnitId("");
                }}
                error={errors.development}
              />
              <UnitPicker development={development} value={unitId} onChange={setUnitId} error={errors.unit} />
            </div>
          </section>

          <section className="border border-[#080B0F]/12 bg-white">
            <div className="border-b border-[#080B0F]/8 px-8 py-6 md:px-11">
              <h3 className="text-[17px] text-[#080B0F]" style={{ fontFamily: "var(--font-display)" }}>
                Acquisition
              </h3>
              <p className="mt-2 max-w-xl text-[12px] leading-relaxed text-[#080B0F]/50">
                The amount this investor actually paid and when the acquisition took place.
              </p>
            </div>
            <div className="grid gap-7 px-8 py-8 md:grid-cols-2 md:px-11">
              <SettingsField
                label="Actual Purchase Price (AED)"
                value={price}
                onChange={setPrice}
                type="number"
                placeholder="e.g. 1250000"
                error={errors.price}
                hint="This is the investor's actual acquisition price and will be used as the baseline for future investor performance calculations."
              />
              <SettingsField
                label="Purchase Date"
                value={date}
                onChange={setDate}
                type="date"
                error={errors.date}
                hint="Select the actual acquisition date."
              />

              <div className="md:col-span-2">
                <StatusSelect
                  label="Investment Status"
                  value={status}
                  options={INVESTMENT_FORM_STATUSES}
                  onChange={(v) => setStatus(v as InvestmentStatus)}
                />
              </div>
            </div>
          </section>

          <div className="border-l-2 border-[#C9A45C] bg-white/70 px-6 py-5">
            <div className="text-[10px] uppercase tracking-[0.24em] text-[#9A7433]">Price distinction</div>
            <p className="mt-2 max-w-3xl text-[13px] leading-relaxed text-[#080B0F]/70">{PRICE_MODEL_NOTE}</p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <button
              type="submit"
              className="flex cursor-pointer items-center gap-2.5 whitespace-nowrap bg-[#080B0F] px-7 py-3.5 text-[11.5px] uppercase tracking-[0.2em] text-[#F5F2EA] transition-colors duration-300 hover:bg-[#C9A45C] hover:text-[#080B0F]"
            >
              Save Changes
              <i className="ri-check-line text-[15px]" />
            </button>
            <Link
              href={`/workspace/investors/investment-detail?investor=${investor.id}&investment=${record.id}`}
              className="cursor-pointer whitespace-nowrap border border-[#080B0F]/15 px-7 py-3.5 text-[11.5px] uppercase tracking-[0.2em] text-[#080B0F]/70 transition-colors duration-300 hover:border-[#080B0F]/40"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}