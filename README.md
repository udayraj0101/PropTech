# PROPTECH

Real estate intelligence and investment platform for the UAE. Built with Next.js (App Router), TypeScript, Tailwind CSS, and Recharts.

## Structure

```
src/
├── app/            # Next.js App Router (layout, page, globals, route folders)
│   └── api/        # Server-side routes (Reelly proxy, future auth)
├── components/
│   ├── admin/      # Admin console (shell, overview, developments, developers, brokers, ...)
│   ├── auth/       # AuthLogin (role-based), AccessGateway, ExploreCta
│   ├── brand/      # Logo mark + wordmark
│   ├── landing/    # Landing page sections (Hero, Modeller, DevMap, ...)
│   ├── site/       # Header & Footer
│   └── ui/         # Shared primitives (Button, Reveal, SectionHead, Eyebrow, ...)
└── lib/            # Pure utilities + API clients (format, finance, auth, reelly, ...)
```

Docs: [docs/reelly-api.md](docs/reelly-api.md) — Reelly API reference used by the development page.

## Getting started

```powershell
npm install
cp .env.example .env.local   # then edit .env.local and add REELLY_API_KEY
npm run dev
```

Open http://localhost:3000.

## Scripts

| Command             | What it does                   |
| ------------------- | ------------------------------ |
| `npm run dev`       | Start the dev server on :3000  |
| `npm run build`     | Production build               |
| `npm run start`     | Serve the production build     |
| `npm run lint`      | Lint via next lint             |
| `npm run typecheck` | TypeScript strict check        |

## Environment

| Variable            | Required | Notes                                                                 |
| ------------------- | :------: | --------------------------------------------------------------------- |
| `REELLY_API_KEY`    |   yes    | Server-side only. Read inside `/api/projects`. Never exposed to the browser. |
| `REELLY_BASE_URL`   |   no     | Overrides the default `https://api-reelly.up.railway.app`.            |

## Reference parity — Admin pages

Tracking which reference admin routes are ported here. Reference lives at `../project-14642113`.

Legend: ✅ ported · ⏳ pending · 🔌 live API (not seed) · ❌ intentionally skipped

| Reference route                         | Status | Ported file                                                           |
| --------------------------------------- | :----: | --------------------------------------------------------------------- |
| `/access`                               |   ✅   | [src/app/access/page.tsx](src/app/access/page.tsx)                    |
| `/login` (broker sign-in)               |   ✅   | [src/app/login/page.tsx](src/app/login/page.tsx)                      |
| `/admin/login`                          |   ✅   | [src/app/admin/login/page.tsx](src/app/admin/login/page.tsx)          |
| `/admin` (Platform Overview)            |   ✅   | [src/app/admin/page.tsx](src/app/admin/page.tsx)                      |
| `/admin/developments` (Reelly-backed)   |  ✅ 🔌 | [src/app/admin/developments/page.tsx](src/app/admin/developments/page.tsx) · fetches `/api/projects` → Reelly |
| `/admin/developers` (Add / Edit)        |   ✅   | [src/app/admin/developers/page.tsx](src/app/admin/developers/page.tsx) |
| `/admin/brokers` (access management)    |   ✅   | [src/app/admin/brokers/page.tsx](src/app/admin/brokers/page.tsx)      |
| `/admin/developments/new` (add wizard)  |   ❌   | Reelly feeds the list; manual add disabled                            |
| `/admin/developments/[id]` (detail)     |  ✅ 🔌 | [src/app/admin/developments/[id]/page.tsx](src/app/admin/developments/[id]/page.tsx) · fetches `/api/projects/[id]` → Reelly |
| `/admin/map` (Reelly-style split map)   |  ✅ 🔌 | [src/app/admin/map/page.tsx](src/app/admin/map/page.tsx) · react-leaflet + developer markers from Reelly |
| `/admin/map/[id]` (map detail)          |   ⏳   | —                                                                     |
| `/admin/modeller/[id]`                  |   ⏳   | —                                                                     |
| `/admin/results/[id]`                   |   ⏳   | —                                                                     |

## Reference parity — Public + broker + investor pages

| Reference route                 | Status | Notes                                                           |
| ------------------------------- | :----: | --------------------------------------------------------------- |
| `/` landing                     |   ✅   | Full landing with Hero, Modeller, DevMap, …, FinalCTA           |
| `/workspace` (session gate)      |   ✅   | [src/app/workspace/page.tsx](src/app/workspace/page.tsx) · redirects by role |
| `/workspace/explore` (map)       |  ✅ 🔌 | [src/app/workspace/explore/page.tsx](src/app/workspace/explore/page.tsx) · reuses MapExplorer (Reelly) |
| `/workspace/developments` (grid) |  ✅ 🔌 | [src/app/workspace/developments/page.tsx](src/app/workspace/developments/page.tsx) · Reelly card grid |
| `/workspace/developments/[id]`   |  ✅ 🔌 | [src/app/workspace/developments/[id]/page.tsx](src/app/workspace/developments/[id]/page.tsx) · reuses ProjectDetail (Reelly) |
| `/workspace/modeller` (index)    |  ✅ 🔌 | [src/app/workspace/modeller/page.tsx](src/app/workspace/modeller/page.tsx) · pick a Reelly project |
| `/workspace/modeller/[id]`       |  ✅ 🔌 | [src/app/workspace/modeller/[id]/page.tsx](src/app/workspace/modeller/[id]/page.tsx) · sliders + chart, Reelly pre-fills |
| `/workspace/results/[id]`        |  ✅ 🔌 | [src/app/workspace/results/[id]/page.tsx](src/app/workspace/results/[id]/page.tsx) · ROI/IRR + payment plan projection |
| `/workspace/investors` (list)    |   ✅   | [src/app/workspace/investors/page.tsx](src/app/workspace/investors/page.tsx) · broker's client book |
| `/workspace/investors/new`       |   ✅   | Create investor form                                            |
| `/workspace/investors/view`      |   ✅   | Investor detail (incl. investments list)                        |
| `/workspace/investors/edit`      |   ✅   | Edit investor                                                   |
| `/workspace/investors/investment`|   ✅   | Add investment (Development + Unit picker)                      |
| `/workspace/investors/investment-detail` |   ✅   | Investment detail                                      |
| `/workspace/investors/investment-edit`   |   ✅   | Edit investment                                        |
| `/investor/login`               |   ⏳   | Reference uses a separate `InvestorLogin` (not shared `AuthLogin`) |
| `/investor/**` investor portal  |   ⏳   | Not started                                                     |

## Reelly integration

- `/admin/developments` fetches live projects from Reelly on mount.
- Only the four landing-page developers are surfaced (ALDAR, MODON, EAGLE HILLS, AL AIN HOLDING).
- The browser calls `/api/projects` (our own route) — never Reelly directly. This keeps `REELLY_API_KEY` server-side.
- See [docs/reelly-api.md](docs/reelly-api.md) for base URL, auth, known endpoints, response shape, and the roadmap (map markers for `/admin/map` is next).

## Status / caveats

- **No auth backend yet.** Sign-in persists a session via `localStorage` only. The landing access form in `FinalCTA.tsx` simulates success. Swap for a real `/api/auth` endpoint when the backend lands.
- **Admin role guard**: `AdminShell` redirects any session without `role === "admin"` to `/admin/login`.
- **Developer + Broker admin mutations** are in-memory only (seed data in `src/lib/developerData.ts`, `src/lib/brokers.ts`). Refreshing resets state.
- **Development admin is read-only via Reelly** — no local mutation. Toggle / Deactivate / Add actions have been removed accordingly.
