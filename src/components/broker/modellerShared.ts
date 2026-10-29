/**
 * Shared helpers for the broker Modeller + Results pages.
 * Both pages fetch the same Reelly project detail and build the same
 * `ModelInputs`, so the pricing / assumption logic lives here.
 */

import type { ModelInputs } from "../../lib/finance";
import type { ProjectDetailShape } from "../admin/dev-detail/detailTypes";

/** Sensible UAE market defaults when Reelly doesn't give us a figure. */
export const DEFAULT_YEARS = 7;
export const DEFAULT_YIELD = 6.5;
export const DEFAULT_APPRECIATION = 5.5;
export const DEFAULT_OCCUPANCY = 92;

export function buildInitialInputs(project: ProjectDetailShape): ModelInputs {
  const price = typeof project.min_price === "number" ? project.min_price : 1_000_000;
  return {
    propertyValue: price,
    years: DEFAULT_YEARS,
    grossYield: DEFAULT_YIELD,
    appreciation: DEFAULT_APPRECIATION,
    occupancy: DEFAULT_OCCUPANCY,
  };
}

/** Decode `ModelInputs` from URL search params (used by Results page). */
export function readInputs(
  params: URLSearchParams,
  fallback: ModelInputs
): ModelInputs {
  const num = (key: string, def: number) => {
    const raw = params.get(key);
    if (raw === null || raw === "") return def;
    const n = Number(raw);
    return Number.isFinite(n) ? n : def;
  };
  return {
    propertyValue: num("price", fallback.propertyValue),
    years: num("years", fallback.years),
    grossYield: num("yield", fallback.grossYield),
    appreciation: num("appreciation", fallback.appreciation),
    occupancy: num("occupancy", fallback.occupancy),
  };
}

/** Encode `ModelInputs` into a query string for the Results link. */
export function inputsToQuery(inputs: ModelInputs): string {
  const q = new URLSearchParams({
    price: String(inputs.propertyValue),
    years: String(inputs.years),
    yield: String(inputs.grossYield),
    appreciation: String(inputs.appreciation),
    occupancy: String(inputs.occupancy),
  });
  return q.toString();
}
