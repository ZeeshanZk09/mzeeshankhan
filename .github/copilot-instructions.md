<!-- Copilot / AI agent instructions for working in this repo -->

# Copilot instructions — Portfolio (Next.js + TypeScript)

Purpose: Give an AI coding agent the minimal, concrete knowledge to be productive in this codebase.

- **Big picture**: This is a Next.js (App Router) TypeScript portfolio using TailwindCSS, Mongoose (MongoDB), Next-Auth, Cloudinary and a small set of server helpers. The entry layout and global providers live in `src/app/layout.tsx` and wrap app behavior (auth, toast, hydration fixes).

- **How the app is structured**:
  - UI + routes: `src/app/` (App Router) — prefer server components here; client components explicitly use `'use client'`.
  - Reusable UI: `src/components/` (grouped by feature, e.g. `auth`, `layout`, `ui`).
  - Services / business logic: `src/services/` (e.g. `userServices.ts`) — use these from API handlers or server components.
  - Models & DB: `src/models/` and `src/lib/db/connect.ts` (Mongoose connect pattern).
  - Small libs/utilities: `src/lib/utils.ts` (exports `cn(...)` using `clsx` + `tailwind-merge`), `src/utils/*` for hydration and DOM helpers.

- **Server / Client boundary rules**:
  - Server components live in `src/app/*` by default; any file that uses state/hooks or browser APIs must be a client component with `'use client'` at top (see `src/components/auth/ProtectedRoute.tsx`).
  - Keep data fetching and DB access on the server side (`src/services/*` and API routes under `src/app/api` or `src/pages/api`).

- **Auth & headers**:
  - `userServices.getCurrentUser()` expects an `x-user-id` header and `requireAdmin()` checks `x-user-is-admin`. When simulating authenticated requests, set these headers accordingly.
    - Example: set `x-user-id` and optionally `x-user-is-admin` on server-to-server requests.

- **Common patterns to copy / reuse**:
  - CSS class merging: use `cn(...)` from `src/lib/utils.ts` (avoids repetitive class logic).
  - Providers are composed in `src/app/layout.tsx`: `AppProvider` -> `HydrationFix` -> `AuthProvider` -> UI. Use the same provider order when adding pages/components.
  - Protected routes: see `src/components/auth/ProtectedRoute.tsx` — wrap client-only content and rely on `useAuth()`.

- **Integrations & external services**:
  - Cloudinary: `src/lib/cloudinary.ts` and `next-cloudinary` used for image uploads/optimizations.
  - Email/SMS: `nodemailer` and `twilio` are dependencies — search `src` for usages when modifying related flows.

- **Developer workflows (concrete commands)**:
  - Install: `npm install`
  - Dev server: `npm run dev` (Next.js App Router)
  - Build: `npm run build`
  - Start production preview: `npm run start`
  - Lint: `npm run lint`

- **When making changes**:
  - Prefer minimal, focused changes: update a single component or service at a time.
  - If touching auth, update both `src/components/providers/AuthProvider.tsx` and server-side checks in `src/services/userServices.ts`.
  - Respect file grouping: UI in `src/components/*`, data in `src/services/*`, models in `src/models/*`.

- **Files worth checking as examples**:
  - App + providers: [src/app/layout.tsx](src/app/layout.tsx#L1)
  - Auth wrapper: [src/components/auth/ProtectedRoute.tsx](src/components/auth/ProtectedRoute.tsx#L1)
  - Classname util: [src/lib/utils.ts](src/lib/utils.ts#L1)
  - User service (DB + headers): [src/services/userServices.ts](src/services/userServices.ts#L1)

- **What NOT to assume**:
  - There are no automated tests present — do not run or write tests that depend on CI configs that don't exist.
  - Secrets and environment variables are expected but not included; always read `process.env` usages and request values from maintainers before committing changes that require them.

- If anything here is unclear or you want the agent to follow stricter guardrails (PR templates, commit message style, or testing requirements), tell me which rules to add and I'll update this file.
