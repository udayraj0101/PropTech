import type { ReactNode } from "react";

export default function Eyebrow({
  children,
  tone = "dark",
  className = "",
}: {
  children: ReactNode;
  tone?: "dark" | "light" | "gold";
  className?: string;
}) {
  const color =
    tone === "light"
      ? "text-[#F5F2EA]/60"
      : tone === "gold"
      ? "text-[#C9A45C]"
      : "text-[#080B0F]/50";
  return (
    <div
      className={`flex items-center gap-3 text-[11px] font-medium tracking-[0.36em] uppercase ${color} ${className}`}
    >
      <span className="h-px w-8 bg-current opacity-60" />
      <span>{children}</span>
    </div>
  );
}
