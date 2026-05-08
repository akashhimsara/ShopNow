Scalable src/ folder structure for ShopNow

Purpose: organize code by responsibility so the app scales cleanly.

- `components/`: Reusable UI building blocks (cards, buttons, layout). Keeps presentation isolated and easy to compose.
- `components/ui/`: Small, generic UI primitives (buttons, inputs, icons) used across the app.
- `lib/`: App-level libraries and singletons (e.g., `prisma.ts`). Central place for backend integrations and utilities.
- `hooks/`: Custom React hooks like `useCart` to share component logic and stateful utilities.
- `types/`: Shared TypeScript types and mappings for consistent typing across server and client code.
- `actions/`: Next.js Server Actions (server-only functions) for fetching/updating data securely.

Usage examples:
- Import a UI primitive: `import { Button } from '@/components';`
- Use the Prisma singleton: `import { prisma } from '@/lib';`

Notes:
- Barrel files (`index.ts`) make imports simpler and reduce long relative paths.
- Keep server-only code (DB calls) inside `actions/` or `lib/` and mark with `'use server'` when applicable.
- Add feature folders (e.g., `features/cart/`) when a domain grows large to colocate components, hooks, and types.
