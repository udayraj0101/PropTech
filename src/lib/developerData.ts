import { developments, developers as developerNames } from "./developments";
import { availabilityState, devStatus, devUpdated, type DevStatus } from "./adminData";

export type DeveloperStatus = "Active" | "Inactive" | "Draft";
export type PrimaryMarket = "Abu Dhabi" | "Dubai" | "UAE" | "Other";

export type DeveloperRecord = {
  id: string;
  name: string;
  code: string;
  market: PrimaryMarket;
  status: DeveloperStatus;
  updated: string;
  description: string;
  website: string;
  contact: string;
};

export const MARKET_OPTIONS: PrimaryMarket[] = ["Abu Dhabi", "Dubai", "UAE", "Other"];
export const DEV_STATUS_OPTIONS: DeveloperStatus[] = ["Active", "Inactive", "Draft"];

const marketByDeveloper: Record<string, PrimaryMarket> = {
  ALDAR: "Abu Dhabi",
  MODON: "Abu Dhabi",
  "EAGLE HILLS": "UAE",
  "AL AIN HOLDING": "UAE",
};

export function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function developerInitials(name: string): string {
  const parts = name.split(/[\s-]+/).filter(Boolean);
  if (parts.length === 0) return "—";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export const seedDevelopers: DeveloperRecord[] = developerNames.map((name) => ({
  id: slugify(name),
  name,
  code: "",
  market: marketByDeveloper[name] ?? "Other",
  status: "Active",
  updated: "—",
  description: "",
  website: "",
  contact: "",
}));

export function developmentsFor(name: string) {
  return developments.filter((d) => d.developer === name);
}

export function developerStats(name: string) {
  const items = developmentsFor(name);
  return {
    total: items.length,
    active: items.filter((d) => devStatus(d.id) === "Active").length,
  };
}

export function coverageFor(name: string) {
  return Array.from(new Set(developmentsFor(name).map((d) => d.city)));
}

export type AssociatedDevelopment = {
  id: string;
  name: string;
  area: string;
  city: string;
  price: number;
  availability: string;
  status: DevStatus;
  updated: string;
};

export function associatedDevelopments(name: string): AssociatedDevelopment[] {
  return developmentsFor(name).map((d) => ({
    id: d.id,
    name: d.name,
    area: d.area,
    city: d.city,
    price: d.availablePrice,
    availability: availabilityState(d),
    status: devStatus(d.id),
    updated: devUpdated(d.id),
  }));
}