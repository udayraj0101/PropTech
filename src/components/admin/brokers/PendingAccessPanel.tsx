"use client";

import AccessBadge from "./AccessBadge";
import BrokerStatusBadge from "./BrokerStatusBadge";
import type { Broker } from "../../../lib/brokers";
import { brokerName } from "../../../lib/brokers";

export default function PendingAccessPanel({
  open,
  brokers,
  onClose,
  onOpenRecord,
  onApprove,
  onReject,
}: {
  open: boolean;
  brokers: Broker[];
  onClose: () => void;
  onOpenRecord: (broker: Broker, mode: "view" | "edit") => void;
  onApprove: (broker: Broker) => void;
  onReject: (broker: Broker) => void;
}) {
  if (!open) return null;

  const pending = brokers.filter((b) => b.access === "Pending");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
      <div className="absolute inset-0 bg-[#080B0F]/45 backdrop-blur-[2px]" onClick={onClose} />
      <div className="relative flex max-h-[82vh] w-full max-w-[760px] flex-col border border-[#080B0F]/12 bg-[#FBFAF6]">
        <header className="flex items-start justify-between gap-6 border-b border-[#080B0F]/10 px-7 py-6">
          <div>
            <span className="text-[9.5px] uppercase tracking-[0.24em] text-[#080B0F]/40">Access requests</span>
            <h2 className="mt-2 text-[24px] font-semibold tracking-[-0.02em] text-[#080B0F]" style={{ fontFamily: "var(--font-display)" }}>
              Pending Access
            </h2>
            <p className="mt-2 max-w-lg text-[12px] leading-relaxed text-[#080B0F]/50">
              Submitted through the public Request Access form. Approved requests become active brokers with access to the
              Broker Workspace.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 cursor-pointer items-center justify-center border border-[#080B0F]/12 text-[#080B0F]/50 transition-colors duration-300 hover:text-[#080B0F]"
          >
            <i className="ri-close-line text-[18px]" />
          </button>
        </header>

        <div className="border-b border-[#080B0F]/10 bg-white px-7 py-4">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-[11.5px] text-[#080B0F]/50">
            {["Request Access", "Broker Application", "Pending", "Admin Review", "Active Broker", "Broker Login"].map((s, i, arr) => (
              <span key={s} className="flex items-center gap-3">
                <span>{s}</span>
                {i < arr.length - 1 && <i className="ri-arrow-right-line text-[13px] text-[#080B0F]/25" />}
              </span>
            ))}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {pending.length === 0 ? (
            <div className="px-7 py-16 text-center">
              <p className="text-[15px] text-[#080B0F]">No pending access requests</p>
              <p className="mt-3 text-[12.5px] text-[#080B0F]/50">
                New requests from the public Request Access form will appear here.
              </p>
            </div>
          ) : (
            pending.map((b) => (
              <div key={b.id} className="flex items-center justify-between gap-6 border-b border-[#080B0F]/8 px-7 py-5 last:border-b-0">
                <div>
                  <div className="text-[14px] text-[#080B0F]">{brokerName(b)}</div>
                  <div className="mt-1 text-[12px] text-[#080B0F]/50">
                    {b.company} · {b.email}
                  </div>
                  <div className="mt-1.5 text-[11.5px] text-[#080B0F]/40">Requested {b.createdAt}</div>
                </div>
                <div className="flex shrink-0 items-center gap-4">
                  <div className="flex flex-col items-end gap-2">
                    <BrokerStatusBadge status={b.status} />
                    <AccessBadge access={b.access} />
                  </div>
                  <button
                    type="button"
                    onClick={() => onReject(b)}
                    className="whitespace-nowrap cursor-pointer border border-[#080B0F]/15 px-4 py-2.5 text-[12px] font-medium text-[#080B0F] transition-colors duration-300 hover:border-[#96604C]/50 hover:bg-[#96604C]/8"
                  >
                    Reject
                  </button>
                  <button
                    type="button"
                    onClick={() => onApprove(b)}
                    className="whitespace-nowrap cursor-pointer bg-[#080B0F] px-4 py-2.5 text-[12px] font-medium text-[#F5F2EA] transition-colors duration-300 hover:bg-[#C9A45C] hover:text-[#080B0F]"
                  >
                    Approve
                  </button>
                  <button
                    type="button"
                    onClick={() => onOpenRecord(b, "view")}
                    className="flex h-8 w-8 cursor-pointer items-center justify-center border border-[#080B0F]/12 text-[#080B0F]/50 transition-colors duration-300 hover:text-[#080B0F]"
                  >
                    <i className="ri-arrow-right-up-line text-[15px]" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}