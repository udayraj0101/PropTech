import type { ReactNode } from "react";
import Button from "../ui/Button";

type Variant = "primary" | "gold" | "outline" | "outlineLight" | "text";
type Size = "md" | "lg";

export default function ExploreCta({
  children,
  variant = "gold",
  size = "lg",
  className = "",
  href = "#access",
}: {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  href?: string;
}) {
  return (
    <Button href={href} variant={variant} size={size} className={className}>
      {children}
    </Button>
  );
}
