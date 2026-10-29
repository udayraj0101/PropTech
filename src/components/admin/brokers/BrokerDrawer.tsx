"use client";

import { useEffect, useState } from "react";
import { Field, FormSelect, TextArea, Toggle, inputClass } from "../shared/FormField";
import { ReadRow, Section } from "../shared/DetailSection";
import type { ConfirmKind } from "./ConfirmDialog";
import {
  ACCESS_STATUSES,
  BROKER_STATUSES,
  brokerName,
  brokerSlug,
  companyOptions,
  type AccessStatus,
  type Broker,
  type BrokerStatus,
} from "../../../lib/brokers";

function blankBroker(): Broker {
  return {
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    companyLocation: "",
    licenseRef: "",
    brokerId: "",
    status: "Pending",
    access: "Pending",
    accessEnabled: false,
    notes: "",
    lastLogin: "—",
    createdAt: "",
    createdBy: "Administrator",
    lastUpdated: "",
    lastUpdatedBy: "Administrator",
    lastStatusChange: "",
  };
}

export default function BrokerDrawer({
  open,
  mode,
  broker,
  emailsInUse,
  onClose,
  onSave,
  onRequestAction,
}: {
  open: boolean;
  mode: "add" | "view" | "edit";
  broker: Broker | null;
  emailsInUse: { id: string; email: string }[];
  onClose: () => void;
  onSave: (broker: Broker) => void;
  onRequestAction: (kind: ConfirmKind) => void;
}) {
  const [draft, setDraft] = useState<Broker>(blankBroker());
  const [error, setError] = useState("");

  useEffect(() => {
    if (open) {
      setDraft(broker ? { ...broker } : blankBroker());
      setError("");
    }
  }, [open, broker]);

  if (!open) return null;

  const readOnly = mode === "view";
  const set = (patch: Partial<Broker>) => setDraft((d) => ({ ...d, ...patch }));

  function changeStatus(status: string) {
    const next = status as BrokerStatus;
    set(next === "Active" ? { status: next, access: "Approved", accessEnabled: true } : { status: next, accessEnabled: false });
  }

  function changeAccess(access: string) {
    const next = access as AccessStatus;
    set({ access: next, status: next === "Approved" ? draft.status : "Pending", accessEnabled: false });
  }

  function toggleAccess() {
    if (draft.accessEnabled) set({ accessEnabled: false, status: "Inactive" });
    else set({ accessEnabled: true, status: "Active", access: "Approved" });
  }

  function save() {
    if (!draft.firstName.trim()) return setError("First name is required.");
    if (!draft.lastName.trim()) return setError("Last name is required.");
    if (!draft.email.trim()) return setError("Email is required.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(draft.email.trim())) return setError("Enter a valid email address.");
    if (!draft.company.trim()) return setError("Brokerage / Company is required.");

    const duplicate = emailsInUse.some(
      (e) => e.id !== draft.id && e.email.toLowerCase() === draft.email.trim().toLowerCase(),
    );
    if (duplicate) return setError("An account using this email already exists.");

    if (draft.status === "Active" && draft.access !== "Approved") {
      return setError("An account cannot be active unless access is approved.");
    }

    setError("");
    const name = `${draft.firstName} ${draft.lastName}`;
    const today = new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
    onSave({
      ...draft,
      id: draft.id || `broker-${brokerSlug(name)}`,
      firstName: draft.firstName.trim(),
      lastName: draft.lastName.trim(),
      email: draft.email.trim(),
      accessEnabled: draft.status === "Active" && draft.access === "Approved",
      createdAt: draft.createdAt || today,
      lastUpdated: today,
      lastStatusChange: draft.lastStatusChange || today,
    });
  }

  const footerActions = (
    <>
      {draft.status === "Active" && (
        <>
          <button
            type="button"
            onClick={() => onRequestAction("suspend")}
            className="whitespace-nowrap cursor-pointer border border-[#080B0F]/15 px-5 py-3 text-[12.5px] font-medium text-[#080B0F] transition-colors duration-300 hover:border-[#A5745F]/60 hover:bg-[#A5745F]/8"
          >
            Suspend Broker
          </button>
          <button
            type="button"
            onClick={() => onRequestAction("deactivate")}
            className="whitespace-nowrap cursor-pointer border border-[#080B0F]/15 px-5 py-3 text-[12.5px] font-medium text-[#080B0F] transition-colors duration-300 hover:border-[#080B0F]/35"
          >
            Deactivate Broker
          </button>
        </>
      )}
      {(draft.status === "Suspended" || draft.status === "Inactive") && (
        <button
          type="button"
          onClick={() => onRequestAction("restore")}
          className="whitespace-nowrap cursor-pointer border border-[#080B0F]/15 px-5 py-3 text-[12.5px] font-medium text-[#080B0F] transition-colors duration-300 hover:border-[#4F6F5F]/50 hover:bg-[#4F6F5F]/8"
        >
          Restore Access
        </button>
      )}
      {draft.access === "Pending" && draft.status === "Pending" && (
        <button
          type="button"
          onClick={() => onRequestAction("approve")}
          className="whitespace-nowrap cursor-pointer border border-[#080B0F]/15 px-5 py-3 text-[12.5px] font-medium text-[#080B0F] transition-colors duration-300 hover:border-[#4F6F5F]/50 hover:bg-[#4F6F5F]/8"
        >
          Approve Access
        </button>
      )}
    </>
  );

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-[#080B0F]/45 backdrop-blur-[2px]" onClick={onClose} />
      <aside className="relative flex h-full w-full max-w-[700px] flex-col bg-[#FBFAF6] shadow-[-30px_0_60px_-40px_rgba(8,11,15,0.5)]">
        <header className="flex items-start justify-between gap-6 border-b border-[#080B0F]/10 px-7 py-6">
          <div>
            <span className="text-[9.5px] uppercase tracking-[0.24em] text-[#080B0F]/40">
              {mode === "add" ? "New account" : "Broker Management"}
            </span>
            <h2 className="mt-2 text-[26px] font-semibold tracking-[-0.02em] text-[#080B0F]" style={{ fontFamily: "var(--font-display)" }}>
              {mode === "add" ? "Add Broker" : brokerName(draft) || "Broker Details"}
            </h2>
            {mode !== "add" && (
              <div className="mt-3 flex items-center gap-6 text-[11.5px]">
                <span className="text-[#080B0F]/50">
                  Status <span className="ml-2 font-medium text-[#080B0F]">{draft.status}</span>
                </span>
                <span className="text-[#080B0F]/50">
                  Access <span className="ml-2 font-medium text-[#080B0F]">{draft.access}</span>
                </span>
              </div>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 cursor-pointer items-center justify-center border border-[#080B0F]/12 text-[#080B0F]/50 transition-colors duration-300 hover:text-[#080B0F]"
          >
            <i className="ri-close-line text-[18px]" />
          </button>
        </header>

        <div className="flex-1 overflow-y-auto">
          {error && (
            <div className="mx-7 mt-6 flex items-start gap-3 border border-[#C9A45C]/45 bg-[#C9A45C]/8 px-4 py-3">
              <span className="flex h-4 w-4 items-center justify-center">
                <i className="ri-error-warning-line text-[15px] text-[#9A7433]" />
              </span>
              <p className="text-[12px] leading-relaxed text-[#8A6A34]">{error}</p>
            </div>
          )}

          <Section title="01 Personal Information">
            {readOnly ? (
              <div>
                <ReadRow label="First name" value={draft.firstName} />
                <ReadRow label="Last name" value={draft.lastName} />
                <ReadRow label="Email" value={draft.email} />
                <ReadRow label="Phone" value={draft.phone} />
                <ReadRow label="Broker ID" value={draft.brokerId} />
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-5">
                <Field label="First Name">
                  <input value={draft.firstName} onChange={(e) => set({ firstName: e.target.value })} className={inputClass} />
                </Field>
                <Field label="Last Name">
                  <input value={draft.lastName} onChange={(e) => set({ lastName: e.target.value })} className={inputClass} />
                </Field>
                <Field label="Email">
                  <input value={draft.email} onChange={(e) => set({ email: e.target.value })} className={inputClass} />
                </Field>
                <Field label="Phone">
                  <input value={draft.phone} onChange={(e) => set({ phone: e.target.value })} placeholder="+971 —" className={inputClass} />
                </Field>
                <Field label="Broker ID" helper="Optional internal reference for this account.">
                  <input value={draft.brokerId} onChange={(e) => set({ brokerId: e.target.value })} className={inputClass} />
                </Field>
              </div>
            )}
          </Section>

          <Section title="02 Brokerage Information">
            {readOnly ? (
              <div>
                <ReadRow label="Brokerage / Company" value={draft.company} />
                <ReadRow label="Company location" value={draft.companyLocation} />
                <ReadRow label="License / Reference" value={draft.licenseRef} />
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-5">
                <Field label="Brokerage / Company">
                  <FormSelect value={draft.company} options={companyOptions} onChange={(v) => set({ company: v })} placeholder="Select brokerage" />
                </Field>
                <Field label="Company Location">
                  <input value={draft.companyLocation} onChange={(e) => set({ companyLocation: e.target.value })} placeholder="Abu Dhabi / Dubai" className={inputClass} />
                </Field>
                <div className="col-span-2">
                  <Field label="License / Reference" helper="Optional. Enter a neutral internal reference only — no regulatory authority or licence structure is assumed.">
                    <input value={draft.licenseRef} onChange={(e) => set({ licenseRef: e.target.value })} className={inputClass} />
                  </Field>
                </div>
              </div>
            )}
          </Section>

          <Section title="03 Access & Status">
            {readOnly ? (
              <div>
                <ReadRow label="Account status" value={draft.status} />
                <ReadRow label="Access status" value={draft.access} />
                <ReadRow label="Created date" value={draft.createdAt} />
                <ReadRow label="Last updated" value={draft.lastUpdated} />
                <ReadRow label="Last login" value={draft.lastLogin} />
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-5">
                <Field label="Account Status">
                  <FormSelect value={draft.status} options={BROKER_STATUSES} onChange={changeStatus} />
                </Field>
                <Field label="Access Status" helper="A pending access request cannot access the Broker Workspace.">
                  <FormSelect value={draft.access} options={ACCESS_STATUSES} onChange={changeAccess} />
                </Field>
                <div className="col-span-2 grid grid-cols-2 gap-5">
                  <ReadRow label="Created date" value={draft.createdAt || "Set on creation"} />
                  <ReadRow label="Last login" value={draft.lastLogin} />
                </div>
              </div>
            )}

            <div className="mt-5 border border-[#080B0F]/10 bg-white px-5 py-5">
              <span className="text-[9.5px] uppercase tracking-[0.2em] text-[#080B0F]/40">Broker Access</span>
              <div className="mt-4 flex items-center justify-between gap-6">
                <Toggle on={draft.accessEnabled} onToggle={readOnly ? () => {} : toggleAccess} />
                <span className="text-right text-[11.5px] leading-relaxed text-[#080B0F]/50">
                  {draft.accessEnabled
                    ? "When enabled, the broker can sign in and access the Broker Workspace."
                    : "The broker account cannot access the Broker Workspace."}
                </span>
              </div>
              <p className="mt-4 border-t border-[#080B0F]/8 pt-4 text-[11.5px] leading-relaxed text-[#080B0F]/45">
                Disabling access never deletes the broker record. Historical account information remains intact.
              </p>
            </div>
          </Section>

          <Section title="04 Account Activity" note="Account access activity only. No performance, sales or revenue information is recorded here.">
            <div className="grid grid-cols-2 gap-5">
              <ReadRow label="Last login" value={draft.lastLogin} />
              <ReadRow label="Account created" value={draft.createdAt} />
              <ReadRow label="Last status change" value={draft.lastStatusChange} />
              <ReadRow label="Recent login" value={draft.lastLogin} />
            </div>
          </Section>

          <Section title="05 Data Information" note="Administrative traceability for this account record.">
            <div className="grid grid-cols-2 gap-5">
              <ReadRow label="Created" value={draft.createdAt} />
              <ReadRow label="Created by" value={draft.createdBy} />
              <ReadRow label="Last updated" value={draft.lastUpdated} />
              <ReadRow label="Last updated by" value={draft.lastUpdatedBy} />
              <ReadRow label="Last login" value={draft.lastLogin} />
              <ReadRow label="Last status change" value={draft.lastStatusChange} />
            </div>
          </Section>

          <Section title="Notes">
            {readOnly ? (
              <p className="text-[13px] leading-relaxed text-[#080B0F]/70">{draft.notes || "—"}</p>
            ) : (
              <TextArea value={draft.notes} onChange={(notes) => set({ notes })} />
            )}
          </Section>

          <div className="border-t border-[#080B0F]/10 px-7 py-6">
            <span className="text-[9.5px] uppercase tracking-[0.24em] text-[#080B0F]/40">Role separation</span>
            <p className="mt-3 text-[12px] leading-relaxed text-[#080B0F]/55">
              This record controls Broker Login and the Broker Workspace only. Brokers have no access to the Admin Console,
              Development Management, Developer Management, Market Data Management or Broker Management.
            </p>
          </div>
        </div>

        <footer className="flex flex-wrap items-center justify-between gap-4 border-t border-[#080B0F]/10 bg-white px-7 py-5">
          <button
            type="button"
            onClick={onClose}
            className="whitespace-nowrap cursor-pointer text-[12.5px] text-[#080B0F]/50 underline decoration-[#080B0F]/20 underline-offset-4 transition-colors duration-300 hover:text-[#080B0F]"
          >
            {mode === "add" ? "Cancel" : "Back to Brokers"}
          </button>

          <div className="flex flex-wrap items-center gap-3">
            {mode !== "add" && footerActions}
            {readOnly ? (
              <button
                type="button"
                onClick={() => onSave({ ...draft })}
                className="whitespace-nowrap cursor-pointer bg-[#080B0F] px-6 py-3 text-[12.5px] font-medium text-[#F5F2EA] transition-colors duration-300 hover:bg-[#C9A45C] hover:text-[#080B0F]"
              >
                Save Changes
              </button>
            ) : (
              <button
                type="button"
                onClick={save}
                className="whitespace-nowrap cursor-pointer bg-[#080B0F] px-6 py-3 text-[12.5px] font-medium text-[#F5F2EA] transition-colors duration-300 hover:bg-[#C9A45C] hover:text-[#080B0F]"
              >
                {mode === "add" ? "Create Broker" : "Save Changes"}
              </button>
            )}
          </div>
        </footer>
      </aside>
    </div>
  );
}