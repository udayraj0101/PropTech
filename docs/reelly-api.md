# Reelly API — Local Reference

Internal notes on the Reelly API endpoints relevant to PROPTECH. Pulled from
<https://docs.reelly.ai> while building the development page integration. Keep this
file updated as new endpoints are brought in.

## Base URL

```
https://api-reelly.up.railway.app
```

Override at runtime via `REELLY_BASE_URL` env var (optional).

## Authentication

All requests require a header:

```
X-API-Key: <your-key>
```

The key is read server-side from `REELLY_API_KEY` (see `.env.example`). Never prefix
with `NEXT_PUBLIC_` — exposing the key to the browser would leak it.

The browser never calls Reelly directly. All reads go through our server-side proxy
in `src/app/api/projects/route.ts`, which:

1. Loads `REELLY_API_KEY` from the environment.
2. Calls Reelly via `src/lib/reelly.ts`.
3. Filters to the 4 landing-page developers.
4. Returns a normalized JSON payload to the client.

## Default query parameters (we send)

| Parameter             | Our default | Why                                       |
| --------------------- | ----------- | ----------------------------------------- |
| `preferred_currency`  | `AED`       | Local market                              |
| `preferred_area_unit` | `sqft`      | Local convention                          |
| `limit`               | `20`        | Reelly 500s on `limit=all`; we paginate   |
| `offset`              | walks       | Our `listAllProjects` increments by 20    |

### Pagination

Reelly's own docs mention `limit=all`, but requesting it (and `limit=100`, and even
the default limit of 20) consistently returns `500 Internal Server Error` with a
blank HTML body in our testing. We therefore always paginate at **20 items per call**
via `src/lib/reelly.ts::listAllProjects`, which:

1. Issues `GET /api/v2/clients/projects?limit=20&offset=0`.
2. Follows the response's `next` cursor when present; otherwise walks `offset` by 20.
3. Stops when a short page (< 20 items) is returned, or after `REELLY_MAX_PAGES` (50)
   as a safety cap.

If Reelly recovers and `limit=all` becomes reliable, we can swap `listAllProjects`
for a single-shot call — no caller changes required.

## Endpoints we currently use

### GET /api/v2/clients/projects

List all projects available to the client. Supports filtering, sorting, pagination.

**Query parameters** (subset — see Reelly docs for full list):

| Param                 | Type    | Notes                                                                    |
| --------------------- | ------- | ------------------------------------------------------------------------ |
| `limit`               | int\|"all" | Default `20`, use `all` for everything                              |
| `offset`              | int     | Pagination offset                                                        |
| `ordering`            | string  | `id`, `name`, `price`, `size`, dates, `status`; prefix with `-` for desc |
| `country`             | string  | Case-insensitive substring                                               |
| `region`              | string  | Case-insensitive substring                                               |
| `districts`           | string  | CSV of district IDs                                                      |
| `developer`           | int\|string | Developer id / slug (see developers endpoint)                        |
| `sale_status`         | string  |                                                                          |
| `construction_status` | string  |                                                                          |
| `preferred_currency`  | string  | `AED` or `USD`                                                           |
| `preferred_area_unit` | string  | `m2` or `sqft`                                                           |
| `language`            | string  | Localization code; default `en-us`                                       |

**Response** (paginated):

```json
{
  "count": 123,
  "next":  "https://.../projects?offset=20",
  "previous": null,
  "results": [
    {
      "id": 1,
      "name": "...",
      "developer": { "name": "ALDAR", ... },
      "area": { "name": "..." },
      "city": "Abu Dhabi",
      "property_type": "Apartment",
      "min_price": 1400000,
      "available_price": 1550000,
      "completion_date": "Q4 2027",
      "payment_plan": "60/40",
      "main_photo": "https://..."
    }
  ]
}
```

Field names vary across responses — our adapter in `src/lib/reelly.ts` (`adaptProject`)
reads them defensively.

### GET /api/v2/clients/projects/{id}

Single project detail. Includes geographic data, pricing, construction/sale status,
developer details, media assets, units, amenities, and payment plans.

**Path parameters:**

| Param | Type | Notes                 |
| ----- | ---- | --------------------- |
| `id`  | int  | Unique project id     |

**Common query parameters:**

| Param                 | Type   | Notes                                 |
| --------------------- | ------ | ------------------------------------- |
| `format`              | string | `json` (default) or `xml`             |
| `language`            | string | Default `en-us`                       |
| `preferred_area_unit` | string | `m2` or `sqft` (default `sqft`)       |
| `preferred_currency`  | string | `AED` or `USD` (default `AED`)        |
| `property_type`       | string | `standard` (default) or `commercial`  |

### GET /api/v2/clients/developers

List all developers on the platform.

**Query parameters:**

| Param       | Type   | Notes                                   |
| ----------- | ------ | --------------------------------------- |
| `format`    | string | `json` or `xml`                         |
| `country`   | string | Case-insensitive substring              |
| `region`    | string | Case-insensitive substring              |
| `districts` | string | CSV of district IDs                     |
| `slug_name` | string | Case-insensitive substring              |

Response includes name, website, logo, contact information, office locations, and
operational status (active, inactive, archived).

### GET /api/v2/clients/developers/{id}

Single developer with offices, projects, and contact details.

**Path parameters:**

| Param | Type | Notes               |
| ----- | ---- | ------------------- |
| `id`  | int  | Developer id         |

**Query parameters:**

| Param    | Type   | Notes                     |
| -------- | ------ | ------------------------- |
| `format` | string | `json` (default) or `xml` |

## Endpoints to investigate next

- **Map markers / clustered map data** — exact slug TBC. 404s on
  `/reference/map_markers`, `/reference/projects_map`, `/reference/map_projects`,
  `/reference/projects_map_list`. Needed before porting `/admin/map`. Check Reelly
  docs navigation when API quota is clear.
- **Units** per project (likely nested under the project retrieve response, but a
  dedicated endpoint may exist).
- **Districts / areas** master list.
- **Countries / regions** master list (for filter dropdowns).

## Our code

| File                                        | Role                                                               |
| ------------------------------------------- | ------------------------------------------------------------------ |
| `.env.example` / `.env.local`               | Where `REELLY_API_KEY` is set                                      |
| `src/lib/reelly.ts`                         | Server-only client, project list fetcher, `adaptProject` normalizer |
| `src/app/api/projects/route.ts`             | `GET /api/projects` proxy — filtered to 4 landing-page developers  |
| `src/components/admin/DevelopmentsAdmin.tsx`| Admin page that consumes `/api/projects`                           |
| `src/components/admin/ReellyProjectsTable.tsx` | Table rendering adapted project rows                             |

## Troubleshooting

| Symptom                                                     | Cause / fix                                                           |
| ----------------------------------------------------------- | --------------------------------------------------------------------- |
| `/admin/developments` shows "Reelly API key not configured" | Add `REELLY_API_KEY=...` to `.env.local` and restart `npm run dev`    |
| HTTP 502 with upstream status 500                           | Reelly itself returned 500. See **known outage** below.               |
| HTTP 429 from Reelly                                        | Rate-limited. Retry after a short wait; our server already caches 60s |
| Zero projects for a known developer                         | Compare the exact `developer` name string in Reelly to the allowlist in `LANDING_DEVELOPERS` — matching is case/space-insensitive but spelling must be identical |

## Known upstream outage (observed 2026-10-28)

Reelly's project-list and developer-list endpoints are currently returning
`500 Internal Server Error` with an empty HTML body for our tenant key, regardless of
query parameters, `limit`, or trailing-slash handling. Verified via direct curl —
same 500 with every URL variant tried.

- Not a client-side bug — our server reaches Reelly and the HTTP exchange completes.
- The admin UI surfaces this as "Reelly API is currently returning 500 — upstream
  issue" so it's distinguishable from a config problem.
- When Reelly recovers, no code change is needed: our pagination will start returning
  real data automatically on next request.
