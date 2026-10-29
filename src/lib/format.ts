export function aed(n: number, compact = false): string {
  if (!isFinite(n)) return "AED —";
  const abs = Math.abs(n);
  if (compact && abs >= 1_000_000) return `AED ${(n / 1_000_000).toFixed(2).replace(/\.00$/, "")}M`;
  if (compact && abs >= 1_000) return `AED ${(n / 1_000).toFixed(0)}K`;
  return `AED ${Math.round(n).toLocaleString("en-US")}`;
}

export function pct(n: number, digits = 1): string {
  if (!isFinite(n)) return "—";
  return `${n.toFixed(digits)}%`;
}

export function num(n: number, digits = 0): string {
  return n.toLocaleString("en-US", { minimumFractionDigits: digits, maximumFractionDigits: digits });
}
