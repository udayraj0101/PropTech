import Link from "next/link";
import styles from "../ui/arch.module.css";

type Tone = "dark" | "light";

export function LogoMark({
  className = "",
  draw = false,
  tone,
}: {
  className?: string;
  draw?: boolean;
  tone?: Tone;
}) {
  const color = tone === "light" ? "text-[#F5F2EA]" : tone === "dark" ? "text-[#080B0F]" : "";
  return (
    <svg
      viewBox="0 0 44 44"
      className={`${color} ${className} ${draw ? styles.draw : ""}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M14 36 V8 H25 A9 9 0 0 1 25 26 H14"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M29 33 L36 26" stroke="#C9A45C" strokeWidth="1.9" strokeLinecap="round" />
    </svg>
  );
}

export default function Logo({
  tone = "dark",
  className = "",
  draw = false,
}: {
  tone?: Tone;
  className?: string;
  draw?: boolean;
}) {
  const color = tone === "dark" ? "text-[#080B0F]" : "text-[#F5F2EA]";
  return (
    <Link
      href="/"
      className={`group flex items-center gap-3 cursor-pointer transition-colors duration-500 ${color} ${className}`}
    >
      <LogoMark className="h-[26px] w-[26px] shrink-0" draw={draw} />
      <span className="text-[15px] font-medium leading-none tracking-[0.34em]">PROPTECH</span>
    </Link>
  );
}
