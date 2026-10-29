"use client";

import { useState } from "react";
import Field from "./detail/Field";
import FormSelect from "./detail/FormSelect";
import { DEV_STATUS_OPTIONS, MARKET_OPTIONS, slugify, type DeveloperRecord, type DeveloperStatus, type PrimaryMarket } from "../../lib/developerData";

export default function AddDeveloperModal({
  onClose,
  onCreate,
}: {
  onClose: () => void;
  onCreate: (record: DeveloperRecord) => void;
}) {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [market, setMarket] = useState<PrimaryMarket>("Abu Dhabi");
  const [status, setStatus] = useState<DeveloperStatus>("Draft");
  const [description, setDescription] = useState("");
  const [website, setWebsite] = useState("");
  const [contact, setContact] = useState("");
  const [error, setError] = useState("");

  function create() {
    if (!name.trim()) {
      setError("Developer name is required.");
      return;
    }
    onCreate({
      id: slugify(name) || `developer-${Date.now()}`,
      name: name.trim(),
      code: code.trim(),
      market,
      status,
      updated: "Just now",
      description: description.trim(),
      website: website.trim(),
      contact: contact.trim(),
    });
  }

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center px-6">
      <div className="absolute inset-0 cursor-pointer bg-[#080B0F]/45" onClick={onClose} />
      <div className="relative flex max-h-[88vh] w-full max-w-[620px] flex-col border border-[#080B0F]/12 bg-[#F5F2EA]">
        <header className="flex items-start justify-between gap-4 border-b border-[#080B0F]/12 px-8 py-6">
          <div>
            <p className="text-[10px] uppercase tracking-[0.26em] text-[#C9A45C]">Developer Management</p>
            <h3 className="mt-2 text-[23px] font-medium text-[#080B0F]" style={{ fontFamily: "var(--font-display)" }}>
              Add Developer
            </h3>
            <p className="mt-1.5 text-[12.5px] text-[#080B0F]/50">
              Create a developer record for the PROPTECH development network.
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="flex h-8 w-8 cursor-pointer items-center justify-center text-[#080B0F]/45 transition-colors duration-300 hover:text-[#080B0F]"
          >
            <i className="ri-close-line text-xl" />
          </button>
        </header>

        <div className="flex-1 overflow-y-auto px-8 py-7">
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <Field label="Developer Name *" value={name} onChange={(v) => { setName(v); setError(""); }} placeholder="Developer name" error={error} />
            </div>
            <Field label="Developer Code" value={code} onChange={setCode} placeholder="Optional internal code" />
            <FormSelect label="Primary Market" value={market} options={MARKET_OPTIONS} onChange={(v) => setMarket(v as PrimaryMarket)} />
            <div className="sm:col-span-2">
              <FormSelect label="Developer Status" value={status} options={DEV_STATUS_OPTIONS} onChange={(v) => setStatus(v as DeveloperStatus)} />
            </div>
            <div className="sm:col-span-2">
              <Field label="Short Description" value={description} onChange={setDescription} placeholder="Optional" textarea rows={3} />
            </div>
            <Field label="Website" value={website} onChange={setWebsite} placeholder="Optional" />
            <Field label="Contact / Reference" value={contact} onChange={setContact} placeholder="Optional" />
          </div>

          <div className="mt-6 border border-dashed border-[#080B0F]/15 px-5 py-6 text-center">
            <i className="ri-image-add-line text-xl text-[#080B0F]/35" />
            <p className="mt-2 text-[12.5px] text-[#080B0F]/45">Developer logo · optional</p>
          </div>

          <p className="mt-5 border-l-2 border-[#C9A45C] pl-4 text-[12px] leading-relaxed text-[#080B0F]/50">
            Only the developer name, primary market and status are required for the current PROPTECH workflow.
          </p>
        </div>

        <footer className="flex items-center justify-end gap-3 border-t border-[#080B0F]/12 px-8 py-5">
          <button
            onClick={onClose}
            className="cursor-pointer whitespace-nowrap border border-[#080B0F]/20 px-6 py-3 text-[10.5px] font-medium uppercase tracking-[0.16em] text-[#080B0F] transition-colors duration-300 hover:border-[#080B0F]"
          >
            Cancel
          </button>
          <button
            onClick={create}
            className="cursor-pointer whitespace-nowrap border border-[#080B0F] bg-[#080B0F] px-6 py-3 text-[10.5px] font-medium uppercase tracking-[0.16em] text-[#F5F2EA] transition-colors duration-300 hover:bg-[#C9A45C] hover:text-[#080B0F]"
          >
            Create Developer
          </button>
        </footer>
      </div>
    </div>
  );
}