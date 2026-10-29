"use client";

import { useState } from "react";
import Display from "../ui/Display";
import Eyebrow from "../ui/Eyebrow";
import SectionCard from "./detail/SectionCard";
import Field from "./detail/Field";
import FormSelect from "./detail/FormSelect";
import DeveloperStatusBadge from "./DeveloperStatusBadge";
import DeveloperDevelopmentsList from "./DeveloperDevelopmentsList";
import {
  DEV_STATUS_OPTIONS,
  MARKET_OPTIONS,
  associatedDevelopments,
  developmentsFor,
  developerInitials,
  type DeveloperRecord,
  type DeveloperStatus,
  type PrimaryMarket,
} from "../../lib/developerData";

export default function DeveloperDetailModal({
  record,
  onClose,
  onSave,
}: {
  record: DeveloperRecord;
  onClose: () => void;
  onSave: (record: DeveloperRecord) => void;
}) {
  const [form, setForm] = useState<DeveloperRecord>(record);
  const [saved, setSaved] = useState(false);

  const patch = (p: Partial<DeveloperRecord>) => {
    setForm((f) => ({ ...f, ...p }));
    setSaved(false);
  };

  const areas = Array.from(new Set(developmentsFor(record.name).map((d) => d.area)));
  const cities = Array.from(new Set(developmentsFor(record.name).map((d) => d.city)));
  const items = associatedDevelopments(record.name);

  return (
    <div className="fixed inset-0 z-[80] overflow-y-auto bg-[#F5F2EA]">
      <div className="sticky top-0 z-40 border-b border-[#080B0F]/10 bg-[#F5F2EA]/95 backdrop-blur">
        <div className="mx-auto flex w-full max-w-[1240px] flex-wrap items-center justify-between gap-4 px-6 py-4 md:px-12">
          <div>
            <p className="text-[9.5px] uppercase tracking-[0.24em] text-[#080B0F]/40">Developers / Developer Details</p>
            <button
              onClick={onClose}
              className="mt-2 inline-flex cursor-pointer items-center gap-2 text-[12px] text-[#080B0F]/55 transition-colors duration-300 hover:text-[#C9A45C]"
            >
              <i className="ri-arrow-left-line" /> Back to Developers
            </button>
          </div>
          <div className="flex items-center gap-3">
            {saved && (
              <span className="flex items-center gap-2 text-[12px] text-[#3F5C4E]">
                <i className="ri-checkbox-circle-fill" /> Developer updated
              </span>
            )}
            <button
              onClick={() => {
                onSave(form);
                setSaved(true);
              }}
              className="cursor-pointer whitespace-nowrap border border-[#080B0F] bg-[#080B0F] px-6 py-3 text-[10.5px] font-medium uppercase tracking-[0.16em] text-[#F5F2EA] transition-colors duration-300 hover:bg-[#C9A45C] hover:text-[#080B0F]"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto w-full max-w-[1240px] px-6 py-12 md:px-12">
        <Eyebrow tone="gold">Developer Management</Eyebrow>
        <div className="mt-6 flex flex-wrap items-center justify-between gap-6">
          <div>
            <Display as="h1" className="text-[34px] font-semibold leading-[1.05] tracking-[-0.03em] text-[#080B0F] md:text-[44px]">
              Developer Details
            </Display>
            <p className="mt-4 text-[15px] text-[#080B0F]/55">{record.name}</p>
          </div>
          <DeveloperStatusBadge status={form.status} />
        </div>

        <div className="mt-10 space-y-6">
          <SectionCard index="Section 01" title="Developer Information" description="Core identity and status of this developer record.">
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Developer Name" value={form.name} onChange={(v) => patch({ name: v })} />
              <Field label="Developer Code" value={form.code} onChange={(v) => patch({ code: v })} placeholder="Optional internal code" />
              <FormSelect label="Primary Market" value={form.market} options={MARKET_OPTIONS} onChange={(v) => patch({ market: v as PrimaryMarket })} />
              <FormSelect label="Status" value={form.status} options={DEV_STATUS_OPTIONS} onChange={(v) => patch({ status: v as DeveloperStatus })} />
              <div className="sm:col-span-2">
                <Field label="Short Description" value={form.description} onChange={(v) => patch({ description: v })} textarea rows={3} placeholder="Optional" />
              </div>
              <Field label="Website" value={form.website} onChange={(v) => patch({ website: v })} placeholder="Optional" />
            </div>
          </SectionCard>

          <SectionCard index="Section 02" title="Coverage" description="Cities and areas covered by this developer.">
            {cities.length === 0 && areas.length === 0 ? (
              <p className="text-[13px] text-[#080B0F]/45">No coverage recorded yet.</p>
            ) : (
              <div className="space-y-4">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.22em] text-[#080B0F]/40">Cities</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {cities.map((c) => (
                      <span key={c} className="border border-[#080B0F]/12 px-3 py-1.5 text-[11.5px] text-[#080B0F]/65">
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.22em] text-[#080B0F]/40">Areas</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {areas.map((a) => (
                      <span key={a} className="border border-[#080B0F]/12 px-3 py-1.5 text-[11.5px] text-[#080B0F]/65">
                        {a}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </SectionCard>

          <SectionCard index="Section 03" title="Associated Developments" description={`${items.length} development records linked to this developer.`}>
            <DeveloperDevelopmentsList developer={record.name} />
          </SectionCard>

          <SectionCard index="Section 04" title="Media / Identity">
            <div className="grid gap-5 sm:grid-cols-[160px_1fr]">
              <div className="flex h-[120px] items-center justify-center border border-[#080B0F]/12 bg-[#F5F2EA]/50 text-[16px] tracking-[0.06em] text-[#080B0F]/55">
                {developerInitials(form.name)}
              </div>
              <div className="flex h-[120px] flex-col items-center justify-center border border-dashed border-[#080B0F]/15 text-center">
                <i className="ri-image-add-line text-xl text-[#080B0F]/35" />
                <p className="mt-2 text-[12.5px] text-[#080B0F]/45">Developer logo · optional upload</p>
              </div>
            </div>
            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              <Field label="Contact / Reference" value={form.contact} onChange={(v) => patch({ contact: v })} placeholder="Optional" />
            </div>
          </SectionCard>

          <SectionCard index="Section 05" title="Data Information">
            <div className="grid gap-px border border-[#080B0F]/12 bg-[#080B0F]/12 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { label: "Created", value: "—" },
                { label: "Created By", value: "—" },
                { label: "Last Updated", value: form.updated },
                { label: "Last Updated By", value: "—" },
              ].map((d) => (
                <div key={d.label} className="bg-white px-5 py-4">
                  <p className="text-[9.5px] uppercase tracking-[0.22em] text-[#080B0F]/40">{d.label}</p>
                  <p className="mt-2 text-[13px] text-[#080B0F]/70">{d.value}</p>
                </div>
              ))}
            </div>
          </SectionCard>
        </div>
      </div>
    </div>
  );
}