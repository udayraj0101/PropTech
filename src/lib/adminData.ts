import { developments, developers, type Development } from "./developments";

export const activeDevelopments = developments.length;
export const totalDevelopers = developers.length;

export const withAvailability = developments.filter((d) =>
  d.units.some((u) => u.status === "Available")
).length;

export const pricingReview = developments.filter((d) => d.market === "Emerging").length;

export const availableUnits = developments.reduce(
  (n, d) => n + d.units.filter((u) => u.status === "Available").length,
  0
);

export const cityCoverage = (["Abu Dhabi", "Dubai"] as const).map((city) => {
  const items = developments.filter((d) => d.city === city);
  return {
    city,
    count: items.length,
    developers: Array.from(new Set(items.map((d) => d.developer))),
  };
});

export const developerCoverage = developers.map((name) => {
  const items = developments.filter((d) => d.developer === name);
  return {
    name,
    count: items.length,
    cities: Array.from(new Set(items.map((d) => d.city))),
  };
});

export type StatusState = "current" | "review";

export const dataStatus: { label: string; state: StatusState; detail: string }[] = [
  {
    label: "Current Availability",
    state: "current",
    detail: `All ${developments.length} development records updated`,
  },
  {
    label: "Pricing",
    state: pricingReview > 0 ? "review" : "current",
    detail: `${pricingReview} records flagged for review`,
  },
  {
    label: "Payment Plans",
    state: "current",
    detail: "Plan structures synced from developers",
  },
  {
    label: "Market Data",
    state: "review",
    detail: "2 emerging areas pending refresh",
  },
];

export const recentUpdates = [
  { title: "Current availability changed", area: "Yas Living · Yas Island", time: "2 hours ago", tag: "Availability" },
  { title: "Current available price updated", area: "Reem Hills · Al Reem Island", time: "Yesterday", tag: "Pricing" },
  { title: "Payment structure changed", area: "Al Maryah Crest · Al Maryah Island", time: "2 days ago", tag: "Payment plan" },
  { title: "Area performance data updated", area: "Dubai Creek · Dubai", time: "3 days ago", tag: "Market data" },
  { title: "Development record activated", area: "Khalifa Quarter · Khalifa City", time: "5 days ago", tag: "Developments" },
];

export type DevStatus = "Active" | "Inactive" | "Draft";
export type AvailState = "Available" | "Limited Availability" | "No Current Availability";

export const developmentMeta: Record<string, { status: DevStatus; updated: string }> = {
  "saadiyat-reserve": { status: "Active", updated: "12 Sep 2026" },
  "yas-living": { status: "Active", updated: "05 Oct 2026" },
  "reem-hills": { status: "Active", updated: "02 Oct 2026" },
  "marsa-al-bateen": { status: "Active", updated: "28 Sep 2026" },
  "al-raha-gardens": { status: "Active", updated: "22 Sep 2026" },
  "khalifa-quarter": { status: "Draft", updated: "01 Oct 2026" },
  "al-maryah-crest": { status: "Active", updated: "30 Sep 2026" },
  "boulevard-heights": { status: "Active", updated: "18 Sep 2026" },
  "creek-harbour-residences": { status: "Inactive", updated: "11 Sep 2026" },
  "marina-promenade": { status: "Active", updated: "26 Sep 2026" },
};

export function devStatus(id: string): DevStatus {
  return developmentMeta[id]?.status ?? "Active";
}

export function devUpdated(id: string): string {
  return developmentMeta[id]?.updated ?? "—";
}

export function availabilityState(d: Development): AvailState {
  if (!d.units.some((u) => u.status === "Available")) return "No Current Availability";
  if (d.availability === "Limited") return "Limited Availability";
  return "Available";
}

export function propertyGroup(type: string): string {
  if (type === "Apartment") return "Apartments";
  if (type === "Villa") return "Villas";
  if (type === "Townhouse") return "Townhouses";
  return "Other";
}