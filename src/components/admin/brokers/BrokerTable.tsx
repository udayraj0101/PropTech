"use client";

import BrokerRowActions, { type BrokerAction } from "./BrokerRowActions";
import BrokerStatusBadge from "./BrokerStatusBadge";
import AccessBadge from "./AccessBadge";
import { brokerName, type Broker } from "../../../lib/brokers";

const GRID = "grid grid-cols-[1.5fr_1.5fr_1.5fr_1fr_0.9fr_0.95fr_1fr_1fr_0.3fr] gap-4";

export default function BrokerTable({
  brokers,
  onOpen,
  onAction,
}: {
  brokers: Broker[];
  onOpen: (broker: Broker, mode: "view" | "edit") => void;
  onAction: (broker: Broker, action: BrokerAction) => void;
}) {
  return (
    <>
      <div className="hidden overflow-x-auto border border-[#080B0F]/12 bg-white lg:block">
        <div className="min-w-[1120px]">
          <div className={`${GRID} border-b border-[#080B0F]/12 px-6 py-4 text-[9.5px] uppercase tracking-[0.16em] text-[#080B0F]/40`}>
            <span>Broker</span>
            <span>Company / Brokerage</span>
            <span>Email</span>
            <span>Phone</span>
            <span>Status</span>
            <span>Access</span>
            <span>Last Login</span>
            <span>Created</span>
            <span />
          </div>
          {brokers.map((b) => (
            <div
              key={b.id}
              onClick={() => onOpen(b, "view")}
              className={`${GRID} cursor-pointer items-center border-b border-[#080B0F]/8 px-6 py-4 last:border-b-0 transition-colors duration-300 hover:bg-[#FBFAF6]`}
            >
              <span className="text-[13px] font-medium text-[#080B0F]">
                {brokerName(b)}
                {b.brokerId && <span className="mt-1 block text-[10.5px] tracking-[0.1em] text-[#080B0F]/40">{b.brokerId}</span>}
              </span>
              <span className="text-[12.5px] text-[#080B0F]/65">{b.company}</span>
              <span className="truncate text-[12.5px] text-[#080B0F]/65">{b.email}</span>
              <span className="text-[12.5px] text-[#080B0F]/55">{b.phone || "—"}</span>
              <BrokerStatusBadge status={b.status} />
              <AccessBadge access={b.access} />
              <span className="text-[12.5px] text-[#080B0F]/55">{b.lastLogin || "—"}</span>
              <span className="text-[12.5px] text-[#080B0F]/55">{b.createdAt || "—"}</span>
              <span onClick={(e) => e.stopPropagation()}>
                <BrokerRowActions broker={b} onAction={(a) => (a === "view" || a === "edit" ? onOpen(b, a) : onAction(b, a))} />
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="border border-[#080B0F]/12 bg-white lg:hidden">
        {brokers.map((b) => (
          <div key={b.id} onClick={() => onOpen(b, "view")} className="cursor-pointer border-b border-[#080B0F]/8 p-5 last:border-b-0">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-[14px] font-medium text-[#080B0F]">{brokerName(b)}</div>
                <div className="mt-1 text-[12px] text-[#080B0F]/50">{b.company}</div>
                <div className="mt-1.5 text-[12px] text-[#080B0F]/55">{b.email}</div>
              </div>
              <div className="flex flex-col items-end gap-2">
                <BrokerStatusBadge status={b.status} />
                <AccessBadge access={b.access} />
              </div>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-3 border-t border-[#080B0F]/8 pt-4 text-[11.5px] text-[#080B0F]/55">
              <span>Phone<br /><span className="text-[12.5px] text-[#080B0F]">{b.phone || "—"}</span></span>
              <span>Last login<br /><span className="text-[12.5px] text-[#080B0F]">{b.lastLogin || "—"}</span></span>
              <span>Created<br /><span className="text-[12.5px] text-[#080B0F]">{b.createdAt || "—"}</span></span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}