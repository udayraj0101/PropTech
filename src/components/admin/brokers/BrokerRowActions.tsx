"use client";

import { useEffect, useRef, useState } from "react";
import type { Broker } from "../../../lib/brokers";

export type BrokerAction =
  | "view"
  | "edit"
  | "approve"
  | "reject"
  | "suspend"
  | "restore"
  | "deactivate";

export default function BrokerRowActions({
  broker,
  onAction,
}: {
  broker: Broker;
  onAction: (action: BrokerAction) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  const item =
    "flex w-full cursor-pointer items-center gap-2.5 px-4 py-2.5 text-left text-[12.5px] text-[#080B0F]/70 transition-colors duration-200 hover:bg-[#F5F2EA] hover:text-[#080B0F]";

  function run(action: BrokerAction) {
    setOpen(false);
    onAction(action);
  }

  return (
    <div ref={ref} className="relative flex justify-end">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex h-8 w-8 cursor-pointer items-center justify-center border border-[#080B0F]/12 text-[#080B0F]/50 transition-colors duration-300 hover:border-[#080B0F]/30 hover:text-[#080B0F]"
      >
        <i className="ri-more-2-fill text-[16px]" />
      </button>
      {open && (
        <div className="absolute right-0 top-[calc(100%+6px)] z-30 w-[220px] border border-[#080B0F]/12 bg-white py-1.5 shadow-[0_18px_40px_-24px_rgba(8,11,15,0.45)]">
          <button type="button" className={item} onClick={() => run("view")}>
            <i className="ri-user-line text-[15px]" /> Broker Details
          </button>
          <button type="button" className={item} onClick={() => run("edit")}>
            <i className="ri-edit-line text-[15px]" /> Edit broker
          </button>

          {broker.access === "Pending" && (
            <>
              <button type="button" className={item} onClick={() => run("approve")}>
                <i className="ri-check-double-line text-[15px]" /> Approve Access
              </button>
              <button type="button" className={item} onClick={() => run("reject")}>
                <i className="ri-close-circle-line text-[15px]" /> Reject Access
              </button>
            </>
          )}

          {broker.status === "Active" && (
            <>
              <button type="button" className={item} onClick={() => run("suspend")}>
                <i className="ri-pause-circle-line text-[15px]" /> Suspend Access
              </button>
              <button type="button" className={item} onClick={() => run("deactivate")}>
                <i className="ri-forbid-2-line text-[15px]" /> Deactivate Broker
              </button>
            </>
          )}

          {(broker.status === "Suspended" || broker.status === "Inactive") && (
            <button type="button" className={item} onClick={() => run("restore")}>
              <i className="ri-restart-line text-[15px]" /> Restore Access
            </button>
          )}
        </div>
      )}
    </div>
  );
}