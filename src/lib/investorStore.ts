import { investorSeed, type Investment, type Investor } from "./investors";

const INVESTOR_KEY = "proptech.investors.created";
const INVESTMENT_KEY = "proptech.investments.created";
const INVESTOR_EDIT_KEY = "proptech.investors.edited";
const INVESTMENT_EDIT_KEY = "proptech.investments.edited";

function read<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw) as T;
    return parsed ?? fallback;
  } catch {
    return fallback;
  }
}

function write(key: string, value: unknown): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    return;
  }
}

export function getCreatedInvestors(): Investor[] {
  const parsed = read<Investor[]>(INVESTOR_KEY, []);
  return Array.isArray(parsed) ? parsed : [];
}

export function addCreatedInvestor(investor: Investor): void {
  write(INVESTOR_KEY, [investor, ...getCreatedInvestors()]);
}

export function getStoredInvestments(): Record<string, Investment[]> {
  return read<Record<string, Investment[]>>(INVESTMENT_KEY, {});
}

export function addStoredInvestment(investorId: string, investment: Investment): void {
  const existing = getStoredInvestments();
  const forInvestor = existing[investorId] ?? [];
  write(INVESTMENT_KEY, { ...existing, [investorId]: [investment, ...forInvestor] });
}

export function getInvestorEdits(): Record<string, Partial<Investor>> {
  return read<Record<string, Partial<Investor>>>(INVESTOR_EDIT_KEY, {});
}

export function getInvestmentEdits(): Record<string, Investment> {
  return read<Record<string, Investment>>(INVESTMENT_EDIT_KEY, {});
}

export function updateInvestor(next: Investor): void {
  const edits = getInvestorEdits();
  edits[next.id] = next;
  write(INVESTOR_EDIT_KEY, edits);
}

export function updateInvestment(investmentId: string, next: Investment): void {
  const edits = getInvestmentEdits();
  edits[investmentId] = next;
  write(INVESTMENT_EDIT_KEY, edits);
}

export function allInvestors(): Investor[] {
  const created = getCreatedInvestors();
  const stored = getStoredInvestments();
  const investorEdits = getInvestorEdits();
  const investmentEdits = getInvestmentEdits();

  const createdIds = new Set(created.map((i) => i.id));
  const base = [...created, ...investorSeed.filter((i) => !createdIds.has(i.id))];

  return base.map((inv) => {
    const withEdits = investorEdits[inv.id] ? { ...inv, ...investorEdits[inv.id] } : inv;
    const additions = stored[inv.id] ?? [];
    const existingIds = new Set(inv.investments.map((i) => i.id));
    const combined = [...additions.filter((i) => !existingIds.has(i.id)), ...inv.investments];
    const investments = combined.map((i) => (investmentEdits[i.id] ? { ...i, ...investmentEdits[i.id] } : i));
    return { ...withEdits, investments };
  });
}

export function resolveInvestor(id: string | null): Investor | undefined {
  if (!id) return undefined;
  return allInvestors().find((i) => i.id === id);
}