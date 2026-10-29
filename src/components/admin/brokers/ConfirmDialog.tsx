"use client";

export type ConfirmKind = "approve" | "reject" | "suspend" | "restore" | "deactivate";

const copy: Record<ConfirmKind, { title: string; text: string; confirm: string }> = {
  approve: {
    title: "Approve Broker Access?",
    text: "This broker will be activated and will be able to sign in to the Broker Workspace.",
    confirm: "Approve Access",
  },
  reject: {
    title: "Reject Access Request?",
    text: "This access request will be marked as rejected. The record is retained for administrative reference.",
    confirm: "Reject Access",
  },
  suspend: {
    title: "Suspend Broker Access?",
    text: "This broker will no longer be able to access the Broker Workspace until access is restored.",
    confirm: "Suspend Access",
  },
  restore: {
    title: "Restore Broker Access?",
    text: "This broker will be able to sign in and access the Broker Workspace again.",
    confirm: "Restore Access",
  },
  deactivate: {
    title: "Deactivate Broker Account?",
    text: "This broker will be marked inactive and cannot access the Broker Workspace. The account record is retained.",
    confirm: "Deactivate Broker",
  },
};

export default function ConfirmDialog({
  open,
  kind,
  subject,
  onCancel,
  onConfirm,
}: {
  open: boolean;
  kind: ConfirmKind;
  subject: string;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  if (!open) return null;
  const c = copy[kind];

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-6">
      <div className="absolute inset-0 bg-[#080B0F]/45 backdrop-blur-[2px]" onClick={onCancel} />
      <div className="relative w-full max-w-[480px] border border-[#080B0F]/12 bg-[#FBFAF6] p-8">
        <span className="text-[9.5px] uppercase tracking-[0.24em] text-[#080B0F]/40">Confirmation</span>
        <h2 className="mt-3 text-[22px] font-semibold tracking-[-0.02em] text-[#080B0F]" style={{ fontFamily: "var(--font-display)" }}>
          {c.title}
        </h2>
        <p className="mt-4 text-[13px] leading-relaxed text-[#080B0F]/55">{c.text}</p>
        <p className="mt-4 border-l-2 border-[#C9A45C]/60 pl-4 text-[12.5px] text-[#080B0F]/70">{subject}</p>

        <div className="mt-8 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="whitespace-nowrap cursor-pointer border border-[#080B0F]/15 px-5 py-3 text-[12.5px] font-medium text-[#080B0F] transition-colors duration-300 hover:border-[#080B0F]/35"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="whitespace-nowrap cursor-pointer bg-[#080B0F] px-6 py-3 text-[12.5px] font-medium text-[#F5F2EA] transition-colors duration-300 hover:bg-[#C9A45C] hover:text-[#080B0F]"
          >
            {c.confirm}
          </button>
        </div>
      </div>
    </div>
  );
}