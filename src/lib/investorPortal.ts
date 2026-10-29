import { investorSeed, investorDate, type Investor, type InvestmentStatus } from "./investors";
import { developments, type Development } from "./developments";
import type { Session } from "./auth";

export type PortalInvestment = {
  id: string;
  development: string;
  developer: string;
  area: string;
  city: string;
  unit: string;
  unitType: string;
  size: string;
  purchasePrice: number;
  purchaseDate: string;
  purchaseDateISO: string;
  status: InvestmentStatus;
  startingPrice: number | null;
  availablePrice: number | null;
  currentValue: number | null;
  appreciation: number | null;
  appreciationPct: number | null;
  rentalYieldPct: number | null;
  rentalIncome: number | null;
  roiPct: number | null;
  yearsHeld: number;
  image: string;
  performanceAvailable: boolean;
};

export type PortalSummary = {
  count: number;
  purchaseTotal: number;
  valuedCount: number;
  currentTotal: number | null;
  appreciation: number | null;
  appreciationPct: number | null;
  rentalYieldPct: number | null;
  rentalIncomeTotal: number | null;
  roiPct: number | null;
};

const DEFAULT_IMAGE =
  "https://readdy.ai/api/search-image?query=An%20elegant%20contemporary%20residential%20development%20in%20the%20United%20Arab%20Emirates%20at%20warm%20dusk%2C%20refined%20limestone%20and%20glass%20architecture%20with%20soft%20landscaped%20planting%2C%20muted%20warm%20ivory%20and%20charcoal%20tones%2C%20no%20people%2C%20no%20text%2C%20editorial%20luxury%20real%20estate%20photography%20wide%20composition&width=1200&height=800&seq=proptech-portal-default-01&orientation=landscape";

const AREA_STOP = new Set(["island", "islands", "city", "dubai", "abu", "dhabi", "al", "the", "creek"]);

function areaKeywords(dev: Development): string[] {
  return dev.area
    .toLowerCase()
    .split(/[^a-z]+/)
    .filter((w) => w.length >= 3 && !AREA_STOP.has(w));
}

function matchDevelopment(name: string): Development | undefined {
  const hay = name.toLowerCase();
  let best: Development | undefined;
  let bestScore = 0;
  developments.forEach((dev) => {
    const score = areaKeywords(dev).filter((k) => hay.includes(k)).length;
    if (score > bestScore) {
      bestScore = score;
      best = dev;
    }
  });
  return bestScore > 0 ? best : undefined;
}

function round1(value: number): number {
  return Math.round(value * 10) / 10;
}

function yearsSince(iso: string): number {
  const d = Date.parse(iso);
  if (Number.isNaN(d)) return 0;
  const years = (Date.now() - d) / (365.25 * 24 * 3600 * 1000);
  return Math.max(0, round1(years));
}

export function resolvePortalInvestor(session: Session | null | undefined): Investor | null {
  if (!session) return null;
  const email = (session.email || "").trim().toLowerCase();
  if (email) {
    const byEmail = investorSeed.find((i) => i.email.toLowerCase() === email);
    if (byEmail) return byEmail;
  }
  const name = (session.name || "").trim().toLowerCase();
  if (name) {
    const byName = investorSeed.find((i) => i.name.toLowerCase() === name);
    if (byName) return byName;
  }
  return null;
}

export function portalInvestments(investor: Investor): PortalInvestment[] {
  return investor.investments.map((inv) => {
    const dev = matchDevelopment(inv.development);
    const purchase = inv.purchasePrice;
    const start = inv.startingPrice ?? null;
    const avail = inv.availablePrice ?? null;

    let currentValue: number | null = null;
    if (start !== null && avail !== null && start > 0) {
      currentValue = Math.round(purchase * (avail / start));
    }
    const appreciation = currentValue !== null ? currentValue - purchase : null;
    const appreciationPct =
      appreciation !== null && purchase > 0 ? round1((appreciation / purchase) * 100) : null;

    const rentalYieldPct = dev ? dev.yieldPct : null;
    const rentalIncome =
      currentValue !== null && rentalYieldPct !== null ? Math.round(currentValue * (rentalYieldPct / 100)) : null;

    const yearsHeld = yearsSince(inv.purchaseDate);
    let roiPct: number | null = null;
    if (appreciation !== null && purchase > 0) {
      const rentalTotal = (rentalIncome ?? 0) * yearsHeld;
      roiPct = round1(((appreciation + rentalTotal) / purchase) * 100);
    }

    return {
      id: inv.id,
      development: inv.development,
      developer: dev?.developer ?? "—",
      area: dev?.area ?? "—",
      city: dev?.city ?? "—",
      unit: inv.unit,
      unitType: inv.unitType ?? "",
      size: inv.size ?? "",
      purchasePrice: purchase,
      purchaseDate: investorDate(inv.purchaseDate),
      purchaseDateISO: inv.purchaseDate,
      status: inv.status,
      startingPrice: start,
      availablePrice: avail,
      currentValue,
      appreciation,
      appreciationPct,
      rentalYieldPct,
      rentalIncome,
      roiPct,
      yearsHeld,
      image: dev?.image ?? DEFAULT_IMAGE,
      performanceAvailable: currentValue !== null,
    };
  });
}

export function findPortalInvestment(investments: PortalInvestment[], id: string | null): PortalInvestment | undefined {
  if (!id) return undefined;
  return investments.find((i) => i.id === id);
}

export function latestPurchase(investments: PortalInvestment[]): string {
  const valid = investments.map((i) => i.purchaseDateISO).filter((d) => d && !Number.isNaN(Date.parse(d)));
  if (!valid.length) return "—";
  const latest = valid.sort((a, b) => Date.parse(b) - Date.parse(a))[0];
  return investorDate(latest);
}

export function portfolioSummary(investments: PortalInvestment[]): PortalSummary {
  const count = investments.length;
  const purchaseTotal = investments.reduce((s, i) => s + i.purchasePrice, 0);
  const valued = investments.filter((i) => i.currentValue !== null);
  const valuedPurchase = valued.reduce((s, i) => s + i.purchasePrice, 0);
  const currentTotal = valued.length ? valued.reduce((s, i) => s + (i.currentValue as number), 0) : null;
  const appreciation = currentTotal !== null ? currentTotal - valuedPurchase : null;
  const appreciationPct =
    appreciation !== null && valuedPurchase > 0 ? round1((appreciation / valuedPurchase) * 100) : null;

  const yields = valued.map((i) => i.rentalYieldPct).filter((v): v is number => v !== null);
  const rentalYieldPct = yields.length ? round1(yields.reduce((a, b) => a + b, 0) / yields.length) : null;
  const incomes = valued.map((i) => i.rentalIncome).filter((v): v is number => v !== null);
  const rentalIncomeTotal = incomes.length ? incomes.reduce((a, b) => a + b, 0) : null;
  const rois = valued.map((i) => i.roiPct).filter((v): v is number => v !== null);
  const roiPct = rois.length ? round1(rois.reduce((a, b) => a + b, 0) / rois.length) : null;

  return {
    count,
    purchaseTotal,
    valuedCount: valued.length,
    currentTotal,
    appreciation,
    appreciationPct,
    rentalYieldPct,
    rentalIncomeTotal,
    roiPct,
  };
}

export function formatAED(value: number | null | undefined): string {
  if (value === null || value === undefined) return "Not available yet";
  return `AED ${new Intl.NumberFormat("en-AE", { maximumFractionDigits: 0 }).format(value)}`;
}

export function formatSignedAED(value: number | null | undefined): string {
  if (value === null || value === undefined) return "Not available yet";
  const sign = value >= 0 ? "+" : "−";
  return `${sign} AED ${new Intl.NumberFormat("en-AE", { maximumFractionDigits: 0 }).format(Math.abs(value))}`;
}

export function formatPercent(value: number | null | undefined): string {
  if (value === null || value === undefined) return "Not available yet";
  return `${Math.round(value * 10) / 10}%`;
}