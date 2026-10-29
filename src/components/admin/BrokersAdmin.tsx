"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Display from "../ui/Display";
import Eyebrow from "../ui/Eyebrow";
import BrokerToolbar, { defaultBrokerFilters, type BrokerFilters } from "./brokers/BrokerToolbar";
import BrokerTable from "./brokers/BrokerTable";
import BrokerDrawer from "./brokers/BrokerDrawer";
import ConfirmDialog, { type ConfirmKind } from "./brokers/ConfirmDialog";
import PendingAccessPanel from "./brokers/PendingAccessPanel";
import type { BrokerAction } from "./brokers/BrokerRowActions";
import { brokerName, brokerSeed, type Broker } from "../../lib/brokers";

function matches(b: Broker, query: string, filters: BrokerFilters, recentFrom: number): boolean {
  const q = query.trim().toLowerCase();
  if (q) {
    const haystack = `${brokerName(b)} ${b.email} ${b.company} ${b.brokerId}`.toLowerCase();
    if (!haystack.includes(q)) return false;
  }
  if (filters.status !== "All" && b.status !== filters.status) return false;
  if (filters.company !== "All" && b.company !== filters.company) return false;
  if (filters.access !== "All" && b.access !== filters.access) return false;
  if (filters.activity === "Never Logged In" && b.lastLogin !== "—") return false;
  if (filters.activity === "Recent" && !(b.lastLogin !== "—" && Date.parse(b.lastLogin) >= recentFrom)) return false;
  if (filters.activity === "Older" && !(b.lastLogin !== "—" && Date.parse(b.lastLogin) < recentFrom)) return false;
  return true;
}

export default function BrokersAdmin() {
  const [brokers, setBrokers] = useState<Broker[]>(brokerSeed);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState<BrokerFilters>(defaultBrokerFilters);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerMode, setDrawerMode] = useState<"add" | "view" | "edit">("view");
  const [active, setActive] = useState<Broker | null>(null);
  const [pendingOpen, setPendingOpen] = useState(false);
  const [confirm, setConfirm] = useState<{ kind: ConfirmKind; broker: Broker } | null>(null);
  const [notice, setNotice] = useState("");
  const noticeTimer = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (noticeTimer.current) window.clearTimeout(noticeTimer.current);
    };
  }, []);

  const recentFrom = useMemo(() => {
    const times = brokerSeed
      .map((b) => (b.lastLogin === "—" ? 0 : Date.parse(b.lastLogin)))
      .filter((t) => !Number.isNaN(t) && t > 0);
    return Math.max(...times, 0) - 30 * 24 * 60 * 60 * 1000;
  }, []);

  const visible = useMemo(
    () => brokers.filter((b) => matches(b, search, filters, recentFrom)),
    [brokers, search, filters, recentFrom],
  );

  const counts = {
    active: brokers.filter((b) => b.status === "Active").length,
    pending: brokers.filter((b) => b.status === "Pending").length,
    inactive: brokers.filter((b) => b.status === "Inactive" || b.status === "Suspended").length,
  };

  function flash(message: string) {
    setNotice(message);
    if (noticeTimer.current) window.clearTimeout(noticeTimer.current);
    noticeTimer.current = window.setTimeout(() => setNotice(""), 4000);
  }

  function apply(id: string, patch: Partial<Broker>, message: string) {
    const today = new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
    setBrokers((list) => list.map((b) => (b.id === id ? { ...b, ...patch, lastUpdated: today, lastUpdatedBy: "Administrator" } : b)));
    setActive((a) => (a && a.id === id ? { ...a, ...patch, lastUpdated: today, lastUpdatedBy: "Administrator" } : a));
    if (message) flash(message);
  }

  function openRecord(broker: Broker, mode: "view" | "edit") {
    setActive(broker);
    setDrawerMode(mode);
    setDrawerOpen(true);
  }

  function handleAction(broker: Broker, action: BrokerAction) {
    if (action === "view" || action === "edit") return;
    if (action === "approve") {
      apply(
        broker.id,
        { status: "Active", access: "Approved", accessEnabled: true, lastStatusChange: new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }) },
        `${brokerName(broker)} approved — access to the Broker Workspace is now active.`,
      );
      return;
    }
    if (action === "reject") {
      apply(broker.id, { status: "Inactive", access: "Rejected", accessEnabled: false }, `${brokerName(broker)} access request rejected. The record has been retained.`);
      return;
    }
    setConfirm({ kind: action as ConfirmKind, broker });
  }

  function confirmAction() {
    if (!confirm) return;
    const today = new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
    const { kind, broker } = confirm;
    if (kind === "suspend") apply(broker.id, { status: "Suspended", accessEnabled: false, lastStatusChange: today }, `${brokerName(broker)} access suspended.`);
    if (kind === "restore") apply(broker.id, { status: "Active", access: "Approved", accessEnabled: true, lastStatusChange: today }, `${brokerName(broker)} access restored.`);
    if (kind === "deactivate") apply(broker.id, { status: "Inactive", accessEnabled: false, lastStatusChange: today }, `${brokerName(broker)} deactivated. The account record has been retained.`);
    if (kind === "approve") apply(broker.id, { status: "Active", access: "Approved", accessEnabled: true, lastStatusChange: today }, `${brokerName(broker)} approved.`);
    if (kind === "reject") apply(broker.id, { status: "Inactive", access: "Rejected", accessEnabled: false, lastStatusChange: today }, `${brokerName(broker)} access request rejected.`);
    setConfirm(null);
    setDrawerOpen(false);
  }

  function saveBroker(next: Broker) {
    setBrokers((list) => {
      const exists = list.some((b) => b.id === next.id);
      return exists ? list.map((b) => (b.id === next.id ? next : b)) : [next, ...list];
    });
    setActive(next);
    setDrawerOpen(false);
    flash(drawerMode === "add" ? `${brokerName(next)} created.` : `${brokerName(next)} updated.`);
  }

  const hasFilters = search.trim() !== "" || JSON.stringify(filters) !== JSON.stringify(defaultBrokerFilters);

  return (
    <div>
      <header className="flex flex-col gap-8 border-b border-[#080B0F]/10 pb-10 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <Eyebrow tone="gold">Access Management</Eyebrow>
          <Display as="h1" className="mt-6 text-[34px] font-semibold leading-[1.05] tracking-[-0.03em] text-[#080B0F] md:text-[46px]">
            Broker Management
          </Display>
          <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-[#080B0F]/55">
            Manage broker access and user accounts across the PROPTECH platform.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setPendingOpen(true)}
            className="flex cursor-pointer items-center gap-2 whitespace-nowrap border border-[#080B0F]/15 px-5 py-3.5 text-[12.5px] font-medium text-[#080B0F] transition-colors duration-300 hover:border-[#C9A45C]/60 hover:bg-[#C9A45C]/8"
          >
            <i className="ri-user-received-line text-[15px]" />
            Pending Access
            {counts.pending > 0 && (
              <span className="ml-1 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-[#C9A45C]/18 px-1.5 text-[10.5px] font-medium text-[#8A6A34]">
                {counts.pending}
              </span>
            )}
          </button>
          <button
            type="button"
            onClick={() => {
              setActive(null);
              setDrawerMode("add");
              setDrawerOpen(true);
            }}
            className="flex cursor-pointer items-center gap-2 whitespace-nowrap bg-[#080B0F] px-6 py-3.5 text-[12.5px] font-medium text-[#F5F2EA] transition-colors duration-300 hover:bg-[#C9A45C] hover:text-[#080B0F]"
          >
            <i className="ri-add-line text-[15px]" />
            Add Broker
          </button>
        </div>
      </header>

      {notice && (
        <div className="mt-6 flex items-center gap-3 border border-[#4F6F5F]/30 bg-[#4F6F5F]/6 px-5 py-3.5">
          <span className="flex h-4 w-4 items-center justify-center">
            <i className="ri-checkbox-circle-line text-[15px] text-[#4F6F5F]" />
          </span>
          <p className="text-[12.5px] text-[#3F5C4E]">{notice}</p>
        </div>
      )}

      <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-2 text-[12px] text-[#080B0F]/50">
        <span>
          Active Brokers <span className="ml-2 font-medium text-[#3F5C4E]">{counts.active}</span>
        </span>
        <span>
          Pending Approval <span className="ml-2 font-medium text-[#8A6A34]">{counts.pending}</span>
        </span>
        <span>
          Inactive Brokers <span className="ml-2 font-medium text-[#080B0F]/70">{counts.inactive}</span>
        </span>
        <span>
          Total Accounts <span className="ml-2 font-medium text-[#080B0F]">{brokers.length}</span>
        </span>
      </div>

      <div className="mt-6">
        <BrokerToolbar
          search={search}
          onSearch={setSearch}
          filters={filters}
          onFilter={(key, value) => setFilters((f) => ({ ...f, [key]: value }))}
          onClear={() => {
            setSearch("");
            setFilters(defaultBrokerFilters);
          }}
        />
      </div>

      <div className="mt-6">
        {brokers.length === 0 ? (
          <div className="border border-[#080B0F]/12 bg-white px-10 py-20 text-center">
            <h3 className="text-[20px] font-medium text-[#080B0F]" style={{ fontFamily: "var(--font-display)" }}>
              No broker accounts yet
            </h3>
            <p className="mx-auto mt-4 max-w-md text-[13px] leading-relaxed text-[#080B0F]/55">
              Broker accounts will appear here when access is requested or created by an administrator.
            </p>
            <button
              type="button"
              onClick={() => {
                setActive(null);
                setDrawerMode("add");
                setDrawerOpen(true);
              }}
              className="mt-8 whitespace-nowrap cursor-pointer bg-[#080B0F] px-6 py-3.5 text-[12.5px] font-medium text-[#F5F2EA] transition-colors duration-300 hover:bg-[#C9A45C] hover:text-[#080B0F]"
            >
              + Add Broker
            </button>
          </div>
        ) : visible.length === 0 ? (
          <div className="border border-[#080B0F]/12 bg-white px-10 py-20 text-center">
            <h3 className="text-[20px] font-medium text-[#080B0F]" style={{ fontFamily: "var(--font-display)" }}>
              No brokers found
            </h3>
            <p className="mx-auto mt-4 max-w-md text-[13px] leading-relaxed text-[#080B0F]/55">
              Try adjusting your search or filters.
            </p>
            {hasFilters && (
              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setFilters(defaultBrokerFilters);
                }}
                className="mt-8 whitespace-nowrap cursor-pointer border border-[#080B0F]/15 px-6 py-3.5 text-[12.5px] font-medium text-[#080B0F] transition-colors duration-300 hover:border-[#C9A45C]/60 hover:bg-[#C9A45C]/8"
              >
                Clear Filters
              </button>
            )}
          </div>
        ) : (
          <BrokerTable brokers={visible} onOpen={openRecord} onAction={handleAction} />
        )}
      </div>

      <section className="mt-12 border-t border-[#080B0F]/10 pt-8">
        <span className="text-[9.5px] uppercase tracking-[0.24em] text-[#080B0F]/40">Broker Workspace relationship</span>
        <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-[12.5px] text-[#080B0F]/60">
          {["Broker Login", "Broker Workspace", "Interactive Development Map", "Development Details", "Investment Modeller", "Investment Results"].map(
            (step, i, arr) => (
              <span key={step} className="flex items-center gap-4">
                <span className={i === 0 ? "text-[#080B0F]" : ""}>{step}</span>
                {i < arr.length - 1 && <i className="ri-arrow-right-line text-[14px] text-[#080B0F]/25" />}
              </span>
            ),
          )}
        </div>
        <p className="mt-5 max-w-3xl text-[11.5px] leading-relaxed text-[#080B0F]/45">
          Broker records created here control access to the Broker Workspace only. Admin and Broker roles remain clearly
          separated — brokers never have access to the Admin Console, development, developer, market data or broker
          management areas. Disabling or suspending access never deletes the account record.
        </p>
      </section>

      <BrokerDrawer
        open={drawerOpen}
        mode={drawerMode}
        broker={active}
        emailsInUse={brokers.map((b) => ({ id: b.id, email: b.email }))}
        onClose={() => setDrawerOpen(false)}
        onSave={saveBroker}
        onRequestAction={(kind) => {
          if (active) setConfirm({ kind, broker: active });
        }}
      />

      <PendingAccessPanel
        open={pendingOpen}
        brokers={brokers}
        onClose={() => setPendingOpen(false)}
        onOpenRecord={(b) => {
          setPendingOpen(false);
          openRecord(b, "view");
        }}
        onApprove={(b) => handleAction(b, "approve")}
        onReject={(b) => setConfirm({ kind: "reject", broker: b })}
      />

      <ConfirmDialog
        open={Boolean(confirm)}
        kind={confirm?.kind ?? "suspend"}
        subject={confirm ? `${brokerName(confirm.broker)} · ${confirm.broker.company}` : ""}
        onCancel={() => setConfirm(null)}
        onConfirm={confirmAction}
      />
    </div>
  );
}