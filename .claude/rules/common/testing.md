# Testing — Tadnun

## Level: Moderate
Coverage target: 80% on core logic modules

## What to Test
- **i18n routing**: locale detection, redirects, fallback behavior
- **Sector data**: all sectors have required fields, no missing translations
- **Component rendering**: key components render without errors in all 3 locales
- **Contact form**: validation rules, required fields, error states
- **Utility functions**: any helpers in src/lib/

## What NOT to Test
- Tailwind class strings
- Static page content (trust the translation files)
- Third-party library internals

## Stack (when configured)
- **Unit/Component**: Vitest + React Testing Library
- **E2E**: Playwright for critical user paths (optional, add when needed)

## Run
```bash
npx vitest run          # all tests
npx vitest run --watch  # watch mode
```

## Mock Rules
- Mock external API calls — never hit live services in tests
- Do NOT mock internal modules — test real behavior
- Use MSW (Mock Service Worker) for API mocking when backend is added
