import Display from "./Display";
import type { ReactNode } from "react";

export default function SectionHead({
  eyebrow,
  title,
  description,
  tone = "dark",
  align = "left",
  className = "",
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  tone?: "dark" | "light";
  align?: "left" | "center";
  className?: string;
}) {
  const eyebrowColor = tone === "light" ? "text-[#F5F2EA]/55" : "text-[#080B0F]/50";
  const body = tone === "light" ? "text-[#F5F2EA]/65" : "text-[#080B0F]/70";
  const centered = align === "center";

  return (
    <div className={`${centered ? "mx-auto flex flex-col items-center text-center" : ""} ${className}`}>
      {eyebrow && (
        <div className={`flex items-center gap-3 ${centered ? "justify-center" : ""}`}>
          <span className="h-px w-7 bg-[#C9A45C]" />
          <span className={`text-[11.5px] font-medium uppercase tracking-[0.24em] ${eyebrowColor}`}>
            {eyebrow}
          </span>
        </div>
      )}
      <Display className="mt-6 max-w-4xl text-[36px] font-semibold leading-[1.06] tracking-[-0.03em] md:text-[58px]">
        {title}
      </Display>
      {description && (
        <p className={`mt-7 max-w-xl text-[15.5px] leading-relaxed ${body}`}>{description}</p>
      )}
    </div>
  );
}
