/**
 * Shared types + helpers for the Reelly project detail page.
 * Keep this file "use client"-safe (no server-only imports).
 */

export type Img = { url: string; metadata?: { width?: number; height?: number } };

export type Amenity = {
  id: number;
  icon?: Img | null;
  amenity?: {
    id: number;
    name: string;
    icon?: Img | null;
  } | null;
};

export type MapPoint = { map_point_name: string; distance?: number; time?: number };

export type PaymentPlanStep = {
  id?: number;
  name: string;
  percentage?: number;
  stage_type?: string;
  notes?: string;
};

export type PaymentPlan = {
  id?: number;
  name?: string;
  is_handover?: boolean;
  months_after_handover?: number | null;
  steps?: PaymentPlanStep[];
};

export type TypicalUnit = {
  bedrooms?: number;
  from_price_aed?: number;
  to_price_aed?: number;
  from_size_sqft?: number;
  to_size_sqft?: number;
  layout?: Array<{ image?: Img; order?: number }>;
};

export type ReellyLocation = {
  region?: string | null;
  city?: string | null;
  district?: string | null;
  sector?: string | null;
  latitude?: number;
  longitude?: number;
};

export type ProjectDetailShape = {
  id: number | string;
  slug_name?: string;
  name: string;
  developer?: string;
  sale_status_display?: string;
  construction_status_display?: string;
  completion_date?: string;
  min_price?: number;
  max_price?: number;
  price_currency?: string;
  area_unit?: string;
  min_size?: number;
  max_size?: number;
  min_bedrooms?: number;
  max_bedrooms?: number;
  available_unit_types_display?: string[];
  units_count?: number;
  service_charge?: string;
  furnishing_display?: string;
  readiness_progress?: number;
  overview?: string;
  short_description?: string;
  escrow_number?: string;
  marketing_brochure?: string;
  cover_image?: Img;
  general_plan?: Img;
  lobby?: Img[];
  interior?: Img[];
  architecture?: Img[];
  project_amenities?: Amenity[];
  project_map_points?: MapPoint[];
  payment_plans?: PaymentPlan[];
  typical_units?: TypicalUnit[];
  location?: ReellyLocation;
  post_handover?: boolean;
};

/** "180 000 000" with space-grouped thousands — matches Reelly's format. */
export function formatAed(n?: number): string {
  if (n === undefined || n === null || !Number.isFinite(n)) return "—";
  const rounded = Math.round(n);
  const grouped = rounded
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  return `${grouped} AED`;
}

export function formatSqft(n?: number, unit = "sqft"): string {
  if (n === undefined || n === null || !Number.isFinite(n)) return "—";
  const rounded = Math.round(n);
  return `${rounded.toLocaleString("en-US")} ${unit}`;
}

export function formatRange(a?: number, b?: number, format = formatAed): string {
  const left = typeof a === "number" ? format(a) : null;
  const right = typeof b === "number" ? format(b) : null;
  if (left && right && a !== b) return `${format(a!)} – ${format(b!)}`;
  return left || right || "—";
}

export function bedroomLabel(n?: number): string {
  if (!n) return "Studio";
  if (n === 1) return "1 Bedroom";
  return `${n} Bedrooms`;
}
