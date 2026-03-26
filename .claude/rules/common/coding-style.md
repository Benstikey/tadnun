# Coding Style — Tadnun

## File Size
- Components: max 200 lines — split into sub-components
- Pages: max 250 lines — extract sections into components
- Data files: no strict limit, but group logically

## Naming
- Files: kebab-case (`contact-form.tsx`, `sector-details.ts`)
- Components: PascalCase (`ContactForm`, `SectorFaq`)
- Functions/variables: camelCase
- Constants: SCREAMING_SNAKE_CASE for true constants, camelCase for derived values
- Translation keys: dot-separated namespace (`hero.title`, `sectors.agriculture.name`)

## TypeScript
- Strict mode always — no `any` unless absolutely unavoidable
- Prefer `interface` for object shapes, `type` for unions/intersections
- Export types from the file where they're defined
- Props interfaces named `[Component]Props`

## Components
- Server Components by default
- `"use client"` only for: event handlers, hooks, browser APIs
- One component per file (small helpers in same file OK)
- Props destructured in function signature

## Tailwind
- Utility classes directly — no @apply in components
- Responsive: mobile-first (`sm:`, `md:`, `lg:`)
- Color tokens: `foreground`, `background`, `surface`, `accent`, `muted`, `border`
- Consistent spacing rhythm: 4, 6, 8, 10, 12, 16, 20, 24

## Imports
- Group: React/Next → third-party → local components → local utils → types
- Use `@/` path alias for all src/ imports
