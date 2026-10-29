/**
 * Reelly API client. Server-only — never import from client components.
 * The API key lives in REELLY_API_KEY (no NEXT_PUBLIC_ prefix), so it
 * stays on the server. Expose data to the browser through /api/* routes.
 *
 * Docs: https://docs.reelly.ai
 * Base: https://api-reelly.up.railway.app
 * Auth: `X-API-Key` request header
 */

export const REELLY_BASE_URL =
  process.env.REELLY_BASE_URL || "https://api-reelly.up.railway.app";

/**
 * The 4 developer names shown on the landing page. Reelly project
 * responses are filtered to these before leaving the server. Match is
 * case-insensitive and whitespace-tolerant.
 */
export const LANDING_DEVELOPERS = [
  "ALDAR",
  "MODON",
  "EAGLE HILLS",
  "AL AIN HOLDING",
] as const;

/**
 * Reelly developer IDs matching our 4 landing-page brands. Confirmed by
 * probing `GET /api/v2/clients/developers` against the test tenant on
 * 2026-10-29. "AL AIN HOLDING" is listed in Reelly's catalog as "ALAIN"
 * (one word) — same entity.
 *
 * Used by `listProjectsForLandingDevelopers` to pass `developer=<id>` to
 * Reelly's `/projects` endpoint, which only accepts numeric IDs.
 */
export const LANDING_DEVELOPER_IDS: Record<(typeof LANDING_DEVELOPERS)[number], number> = {
  ALDAR: 46,
  MODON: 326,
  "EAGLE HILLS": 154,
  "AL AIN HOLDING": 573,
};

export type ReellyProjectsResponse = {
  count?: number;
  next?: string | null;
  previous?: string | null;
  results?: ReellyProject[];
};

// Reelly's project shape is broad — keep the type loose. Fields are
// consumed defensively via the normalizer below.
export type ReellyProject = Record<string, unknown> & {
  id?: number | string;
  name?: string;
};

function requireKey(): string {
  const key = process.env.REELLY_API_KEY;
  if (!key) {
    throw new Error(
      "REELLY_API_KEY is not set. Add it to .env.local and restart the dev server."
    );
  }
  return key;
}

export class ReellyError extends Error {
  constructor(public status: number, public path: string, message: string) {
    super(message);
    this.name = "ReellyError";
  }
}

export async function reellyFetch<T>(
  path: string,
  init: RequestInit = {}
): Promise<T> {
  const url = path.startsWith("http") ? path : `${REELLY_BASE_URL}${path}`;
  const res = await fetch(url, {
    ...init,
    headers: {
      Accept: "application/json",
      "X-API-Key": requireKey(),
      ...(init.headers || {}),
    },
    // Cache lightly on the server — Reelly data isn't realtime-critical.
    next: { revalidate: 60 },
  });
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    // Reelly often returns an HTML error page for 5xx. Strip markup so the
    // UI message is readable; fall back to the status text otherwise.
    const looksLikeHtml = body.trim().startsWith("<");
    const detail = looksLikeHtml ? "" : body.slice(0, 200);
    throw new ReellyError(
      res.status,
      path,
      `Reelly ${res.status} ${res.statusText}${detail ? ` — ${detail}` : ""}`
    );
  }
  return (await res.json()) as T;
}

/** Max per-call page size we ever request. Reelly rejected `limit=all` with
 * server-side 500s, so we always paginate at this size. */
export const REELLY_PAGE_SIZE = 20;
/** Safety cap on `listAllProjects` so an unbounded dataset can't hang the server. */
export const REELLY_MAX_PAGES = 50;

/**
 * GET /api/v2/clients/projects
 * Single page. Pass extra query params via `searchParams`.
 */
export async function listProjects(
  searchParams?: Record<string, string | number | undefined>
): Promise<ReellyProjectsResponse> {
  const q = new URLSearchParams();
  for (const [k, v] of Object.entries(searchParams ?? {})) {
    if (v !== undefined && v !== null && v !== "") q.set(k, String(v));
  }
  // Sensible defaults for our development page use-case.
  if (!q.has("preferred_currency")) q.set("preferred_currency", "AED");
  if (!q.has("preferred_area_unit")) q.set("preferred_area_unit", "sqft");
  if (!q.has("limit")) q.set("limit", String(REELLY_PAGE_SIZE));

  const query = q.toString();
  const path = `/api/v2/clients/projects${query ? `?${query}` : ""}`;
  return reellyFetch<ReellyProjectsResponse>(path);
}

/**
 * Page through `GET /api/v2/clients/projects` at REELLY_PAGE_SIZE items per
 * call. Follows the `next` cursor if the response includes one; otherwise
 * walks `offset` in page-size increments until a short page or MAX_PAGES.
 */
export async function listAllProjects(
  baseParams?: Record<string, string | number | undefined>
): Promise<ReellyProject[]> {
  const collected: ReellyProject[] = [];
  let offset = 0;

  for (let page = 0; page < REELLY_MAX_PAGES; page++) {
    const data = await listProjects({ ...baseParams, offset, limit: REELLY_PAGE_SIZE });
    const batch = data.results ?? [];
    collected.push(...batch);

    // Prefer the server-provided cursor when present.
    if (data.next) {
      const nextOffset = extractOffset(data.next);
      if (nextOffset !== null && nextOffset > offset) {
        offset = nextOffset;
        continue;
      }
    }

    // No next cursor and the batch is shorter than a full page → done.
    if (batch.length < REELLY_PAGE_SIZE) break;
    offset += REELLY_PAGE_SIZE;
  }

  return collected;
}

function extractOffset(nextUrl: string): number | null {
  try {
    const url = new URL(nextUrl, REELLY_BASE_URL);
    const v = url.searchParams.get("offset");
    const n = v === null ? NaN : Number(v);
    return Number.isFinite(n) ? n : null;
  } catch {
    return null;
  }
}

/**
 * Shape consumed by the admin DevelopmentTable. A superset-of-adapter —
 * extra fields are ignored by the table.
 */
export type AdaptedDevelopment = {
  id: string;
  name: string;
  developer: string;
  area: string;
  city: "Abu Dhabi" | "Dubai";
  type: string;
  startingPrice: number; // in AED millions
  availablePrice: number; // in AED millions
  availability: "Available" | "Limited" | "Waitlist";
  completion: string;
  paymentPlan: string;
  updatedAt: string;
  status: "Active" | "Inactive" | "Draft";
  image?: string;
  lat?: number;
  lng?: number;
  priceLabel?: string;
  paymentPlanLabel?: string;
  /** e.g. "On Sale" — Reelly's `sale_status_display`. */
  saleStatus?: string;
  /** e.g. "Under Construction" — Reelly's `construction_status_display`. */
  constructionStatus?: string;
  /** Unit size range formatted ("820 – 1,780 sqft"). Empty when missing. */
  sizeRange?: string;
  /** Total units in the project. */
  unitsCount?: number;
};

function pickString(obj: Record<string, unknown>, keys: string[]): string {
  for (const k of keys) {
    const v = obj[k];
    if (typeof v === "string" && v.trim()) return v;
    if (typeof v === "number") return String(v);
    if (v && typeof v === "object") {
      const name = (v as Record<string, unknown>).name;
      if (typeof name === "string" && name.trim()) return name;
    }
  }
  return "";
}

function pickNumber(obj: Record<string, unknown>, keys: string[]): number {
  for (const k of keys) {
    const v = obj[k];
    if (typeof v === "number" && Number.isFinite(v)) return v;
    if (typeof v === "string") {
      const n = Number(v);
      if (Number.isFinite(n) && n !== 0) return n;
    }
  }
  return 0;
}

/**
 * Convert a raw Reelly project record into the shape consumed by the
 * admin UI. Missing fields fall back to safe defaults so the table
 * never crashes on partial data.
 */
/**
 * Convert a raw Reelly project record into the shape consumed by the
 * admin UI. Based on the real Reelly response schema confirmed against
 * `GET /api/v2/clients/projects` on 2026-10-28:
 *
 *   developer: string                     (e.g. "AHS Properties")
 *   cover_image: { url: string, ... }     (nested object)
 *   min_price / max_price: number (AED)   (e.g. 180_000_000)
 *   price_currency: "AED"
 *   completion_date: string               ("Q2 2026")
 *   sale_status_display: string           ("On Sale")
 *   construction_status_display: string   ("Under Construction")
 *   min_bedrooms / max_bedrooms: number
 *   available_unit_types_display: string
 *   location: {
 *     region: "Dubai" | "Abu Dhabi" | ...
 *     district: string
 *     latitude / longitude: number
 *   }
 *
 * Fields outside this schema fall back to safe defaults so an evolving
 * response never crashes the table.
 */
export function adaptProject(raw: ReellyProject): AdaptedDevelopment {
  const developer = pickString(raw, ["developer", "developer_name"]) || "Unknown";

  const location = (raw.location && typeof raw.location === "object"
    ? (raw.location as Record<string, unknown>)
    : {}) as Record<string, unknown>;

  const region = pickString(location, ["region"]) || pickString(raw, ["city", "region"]);
  const city: "Abu Dhabi" | "Dubai" = region.toLowerCase().includes("abu dhabi")
    ? "Abu Dhabi"
    : "Dubai";

  const area =
    pickString(location, ["district", "sector", "village"]) ||
    pickString(raw, ["area", "district"]) ||
    region ||
    "—";

  const minPriceRaw = pickNumber(raw, [
    "min_price",
    "price_from",
    "starting_price",
    "available_price",
  ]);
  const maxPriceRaw = pickNumber(raw, ["max_price", "price_to", "available_price"]);
  // Reelly returns prices in AED. Convert anything over 10K to millions.
  const toMillions = (n: number) => (n > 10000 ? n / 1_000_000 : n);

  const lat = pickNumber(location, ["latitude", "lat"]) || pickNumber(raw, ["latitude", "lat"]);
  const lng =
    pickNumber(location, ["longitude", "lng", "lon"]) ||
    pickNumber(raw, ["longitude", "lng", "lon"]);

  // Cover image is a nested { url, ... } object in Reelly's response.
  const coverImageRaw = raw.cover_image;
  const image =
    (coverImageRaw && typeof coverImageRaw === "object"
      ? pickString(coverImageRaw as Record<string, unknown>, ["url"])
      : pickString(raw, ["main_photo", "image", "cover"])) || undefined;

  // Human-readable project type: prefer available_unit_types_display,
  // otherwise fall back to bedroom range.
  const unitTypes = pickString(raw, ["available_unit_types_display", "property_type", "type"]);
  const minBed = pickNumber(raw, ["min_bedrooms"]);
  const maxBed = pickNumber(raw, ["max_bedrooms"]);
  const bedroomSummary =
    minBed > 0
      ? minBed === maxBed
        ? `${minBed} bed`
        : `${minBed}–${maxBed} bed`
      : "";
  const type = unitTypes || bedroomSummary || "—";

  const saleStatus = pickString(raw, ["sale_status_display", "sale_status"]) || undefined;
  const constructionStatus =
    pickString(raw, ["construction_status_display", "construction_status"]) || undefined;

  const minSize = pickNumber(raw, ["min_size"]);
  const maxSize = pickNumber(raw, ["max_size"]);
  const areaUnit = pickString(raw, ["area_unit"]) || "sqft";
  const sizeRange =
    minSize > 0
      ? minSize === maxSize
        ? `${Math.round(minSize).toLocaleString()} ${areaUnit}`
        : `${Math.round(minSize).toLocaleString()} – ${Math.round(maxSize).toLocaleString()} ${areaUnit}`
      : undefined;

  const unitsCount = pickNumber(raw, ["units_count"]) || undefined;

  return {
    id: String(raw.id ?? pickString(raw, ["slug_name", "slug", "name"]) ?? Math.random()),
    name: pickString(raw, ["name", "title"]) || "Untitled",
    developer,
    area,
    city,
    type,
    startingPrice: toMillions(minPriceRaw),
    availablePrice: toMillions(maxPriceRaw || minPriceRaw),
    availability: "Available",
    completion:
      pickString(raw, ["completion_date", "handover_date"]) || saleStatus || "—",
    paymentPlan: pickString(raw, ["payment_plan", "payment_terms"]) || "—",
    updatedAt: pickString(raw, ["updated_at", "modified_at"]) || "—",
    status: "Active",
    image,
    lat: lat || undefined,
    lng: lng || undefined,
    priceLabel: pickString(raw, ["price_label"]) || undefined,
    paymentPlanLabel: pickString(raw, ["payment_plan_label"]) || undefined,
    saleStatus,
    constructionStatus,
    sizeRange,
    unitsCount,
  };
}

/**
 * Developer logo lookup for the 4 landing-page developers. Falls back
 * to initials when no match. Logos are the same CDN URLs rendered on the
 * public landing — safe to reference client-side.
 */
export const DEVELOPER_LOGOS: Record<string, string> = {
  ALDAR:
    "https://storage.helloreaddy.io/project_files/adec7213-67e0-4d5c-985f-d084445559f6/2f13af8c-b38c-4314-97bd-ea9c550ec91e_compressed_ALDAR-LOGO.webp",
  MODON:
    "https://storage.helloreaddy.io/project_files/adec7213-67e0-4d5c-985f-d084445559f6/c23cfff4-2181-4b73-aca2-84dc5d434639_compressed_images.webp",
  "EAGLE HILLS":
    "https://storage.helloreaddy.io/project_files/adec7213-67e0-4d5c-985f-d084445559f6/140f98b1-b42c-492e-814c-db8b3dd16d7e_compressed_Eagle-Hills-logo.webp",
  "AL AIN HOLDING":
    "https://storage.helloreaddy.io/project_files/adec7213-67e0-4d5c-985f-d084445559f6/5825882c-66b6-4867-85fb-7c239dddd9bf_compressed_ALAIN.webp",
};

export function developerLogo(name: string): string | undefined {
  const key = name.toUpperCase().replace(/\s+/g, " ").trim();
  return DEVELOPER_LOGOS[key];
}

/**
 * Fetch projects for every landing-page developer in parallel (one
 * Reelly request per developer id), then dedupe by project id. Uses
 * Reelly's `developer=<id>` query filter which only accepts numeric
 * IDs — see `LANDING_DEVELOPER_IDS`.
 */
export async function listProjectsForLandingDevelopers(): Promise<ReellyProject[]> {
  const perDev = await Promise.all(
    Object.values(LANDING_DEVELOPER_IDS).map((id) => listAllProjects({ developer: id }))
  );
  const seen = new Map<string | number, ReellyProject>();
  for (const list of perDev) {
    for (const project of list) {
      if (project.id !== undefined) seen.set(project.id, project);
    }
  }
  return Array.from(seen.values());
}

/**
 * Fetch and adapt the Reelly projects the UI should display.
 *
 * Default: restrict to the 4 landing-page developers (ALDAR, MODON,
 * EAGLE HILLS, AL AIN HOLDING / ALAIN). Set `REELLY_RESTRICT_TO_LANDING=0`
 * in the environment to show every project instead (useful for debug or
 * if we point the API key at a different tenant later).
 */
export async function listReellyProjects(): Promise<AdaptedDevelopment[]> {
  const restrict = process.env.REELLY_RESTRICT_TO_LANDING !== "0";
  const results = restrict
    ? await listProjectsForLandingDevelopers()
    : await listAllProjects();
  return results.map(adaptProject);
}

/** @deprecated kept only to avoid breaking older imports — use listReellyProjects. */
export const listLandingDeveloperProjects = listReellyProjects;

/**
 * GET /api/v2/clients/projects/{id}
 *
 * Returns the full project detail record (overview, amenities, floor
 * plans, payment plans, image galleries, map points, etc.). The response
 * is deliberately typed loosely — detail-page components pick fields
 * defensively because Reelly's optional fields vary by project.
 */
export type ReellyProjectDetail = Record<string, unknown> & {
  id: number | string;
  name: string;
};

export async function getProject(id: string | number): Promise<ReellyProjectDetail> {
  return reellyFetch<ReellyProjectDetail>(
    `/api/v2/clients/projects/${encodeURIComponent(String(id))}?preferred_currency=AED&preferred_area_unit=sqft`
  );
}
