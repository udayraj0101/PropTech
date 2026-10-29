import type { ElementType, ReactNode } from "react";

export default function Display({
  as,
  children,
  className = "",
}: {
  as?: ElementType;
  children: ReactNode;
  className?: string;
}) {
  const Tag = (as || "h2") as ElementType;
  return (
    <Tag className={className} style={{ fontFamily: "var(--font-display)" }}>
      {children}
    </Tag>
  );
}
