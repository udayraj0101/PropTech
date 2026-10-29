import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "primary" | "gold" | "outline" | "outlineLight" | "text";
type Size = "md" | "lg";

type Props = {
  children: ReactNode;
  href?: string;
  variant?: Variant;
  size?: Size;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  id?: string;
  disabled?: boolean;
};

const base =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium uppercase tracking-[0.14em] transition-all duration-300 cursor-pointer";

const sizes: Record<Size, string> = {
  md: "px-7 py-3.5 text-[11px]",
  lg: "px-9 py-4 text-[12px]",
};

const variants: Record<Variant, string> = {
  primary: "bg-[#080B0F] text-[#F5F2EA] hover:bg-[#C9A45C] hover:text-[#080B0F]",
  gold: "bg-[#C9A45C] text-[#080B0F] hover:bg-[#F5F2EA]",
  outline:
    "border border-[#080B0F]/25 text-[#080B0F] hover:border-[#080B0F] hover:bg-[#080B0F] hover:text-[#F5F2EA]",
  outlineLight:
    "border border-[#F5F2EA]/35 text-[#F5F2EA] hover:bg-[#F5F2EA] hover:text-[#080B0F] hover:border-[#F5F2EA]",
  text: "px-0 py-0 text-[#080B0F] hover:text-[#C9A45C]",
};

export default function Button({
  children,
  href,
  variant = "primary",
  size = "md",
  className = "",
  onClick,
  type = "button",
  id,
  disabled,
}: Props) {
  const cls = `${base} ${sizes[size]} ${variants[variant]} ${className}`;
  if (href) {
    return (
      <Link href={href} className={cls} id={id}>
        {children}
      </Link>
    );
  }
  return (
    <button
      type={type}
      onClick={onClick}
      className={cls}
      id={id}
      disabled={disabled}
      suppressHydrationWarning
    >
      {children}
    </button>
  );
}
