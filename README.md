# Slotwise

Slotwise is a local-first appointment scheduler scaffold built from the PRD in `C:\Users\DAVID\Downloads\appointment-scheduler-prd.md`.

The scaffold includes a host dashboard, appointment type setup, weekly availability editor, public booking page with calendar-style slot selection, mocked calendar/email providers, Prisma data model, Vitest coverage, and Playwright smoke tests.

## Stack

- Next.js App Router with TypeScript
- Tailwind CSS with shadcn-style local primitives
- Prisma and PostgreSQL schema
- Zod validation
- Mocked Nylas-shaped calendar provider
- Mocked Resend-shaped email provider
- Vitest and Playwright

## Getting started

```bash
pnpm install
pnpm dev
```

Open `http://localhost:3000` for the host dashboard or `http://localhost:3000/book/strategy-call` for the public booking flow.

## Database

The Prisma schema is in `prisma/schema.prisma`. A local Postgres service is available through Docker:

```bash
docker compose up -d
pnpm prisma:generate
```

Copy `.env.example` to `.env` when you are ready to use real environment variables. `prisma.config.ts` includes a local fallback URL so `pnpm prisma:generate` works before `.env` exists.

## Verification

```bash
pnpm lint
pnpm test
pnpm prisma:generate
pnpm build
pnpm test:e2e
```

Install Playwright browsers once before the E2E suite:

```bash
pnpm exec playwright install chromium
```

## Integration notes

Calendar and email integrations are intentionally mocked for this MVP scaffold. Real providers should implement the interfaces in `src/lib/providers/calendar.ts` and `src/lib/providers/email.ts`, with Nylas as the planned calendar adapter path.
