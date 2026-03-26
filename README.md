# Tadnun

Tadnun is a trilingual digital transformation platform for Moroccan businesses. It helps SMEs across multiple sectors discover tailored digital solutions — from agriculture traceability to restaurant delivery integration to healthcare booking systems.

## Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Architecture

```
src/
├── app/[locale]/       → Locale-routed pages (FR/EN/AR)
├── components/         → Shared UI components
├── data/               → Sector details and relationships
├── i18n/               → Internationalization config
├── messages/           → Translation files (fr.json, en.json, ar.json)
└── middleware.ts       → Locale detection and routing
```

**Stack:** Next.js 16 · React 19 · TypeScript 5 · Tailwind CSS 4 · next-intl

## Pages

- `/` — Homepage with sector overview, stats, and CTAs
- `/about` — Origin story, mission, and 2030 vision
- `/approach` — 3-step methodology (Listen → Build → Grow)
- `/contact` — Contact form and direct contact options
- `/sectors/[sector]` — Detailed sector pages with pain points, solutions, ROI, and FAQs

## Languages

| Language | Code | Direction |
|----------|------|-----------|
| French (default) | `fr` | LTR |
| English | `en` | LTR |
| Arabic / Darija | `ar` | RTL |

## Development

- **Conventional commits** enforced: `feat:`, `fix:`, `refactor:`, `docs:`, `chore:`
- **Deploy target**: Vercel
- **Lint**: `npm run lint`
