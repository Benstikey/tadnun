# CLAUDE.md — Tadnun
# Digital transformation platform for Moroccan businesses
# Stack: Next.js 16 | React 19 | TypeScript 5 | Tailwind CSS 4 | next-intl

@AGENTS.md

---

## WHAT THIS PROJECT DOES

Tadnun is a trilingual (FR/EN/AR) marketing website that helps Moroccan SMEs
discover and adopt digital transformation solutions tailored to their sector.
It serves as a conversion-focused lead generation site — visitors find their
sector, understand the pain points solved, and reach out via the contact form.

**Users:** Moroccan business owners and decision-makers across multiple sectors
**Core loop:** Discover sector → Read pain points & solutions → Contact Tadnun
**Deployment:** Vercel (SSG/static)

---

## ARCHITECTURE

```
src/messages/ (FR/EN/AR JSON)
       ↓
next-intl middleware → locale routing
       ↓
src/app/[locale]/     → Pages (SSG)
       ↓
src/components/       → Shared UI
src/data/             → Sector details, relationships
       ↓
Vercel CDN → User
```

---

## DIRECTORY MAP

```
src/
├── app/[locale]/          Locale-routed pages (home, about, approach, contact, sectors/[sector])
├── components/            Shared UI (nav, footer, forms, visuals, scroll-reveal)
├── data/                  Sector details, related-sectors mapping
├── i18n/                  Routing config, request handler, navigation helpers
├── messages/              Translation JSON files (fr.json, en.json, ar.json)
├── lib/                   Utilities (added as needed)
└── middleware.ts          next-intl locale detection
```

---

## NON-NEGOTIABLE RULES

1. All secrets in .env.local — never inline, never commit
2. TypeScript strict mode — type everything
3. Components max 200 lines — extract into sub-components when exceeded
4. Server Components by default — `"use client"` only when interactivity required
5. Read before writing — always read existing code before modifying
6. Read `node_modules/next/dist/docs/` before using any Next.js API (v16 breaking changes)
7. Conventional commits enforced: `feat:`, `fix:`, `refactor:`, `docs:`, `chore:`, `test:`
8. Ask before significant decisions — never assume the user's intent

---

## DOMAIN RULES (Moroccan Market)

- All content must work in 3 languages: French (default), English, Arabic/Darija
- Arabic requires RTL layout — test every component in RTL mode
- Sectors are extensible — never hardcode sector lists; treat current sectors as a subset
- Moroccan-specific integrations (ONSSA, CMI, CNSS, DGSN) must be accurate
- Cultural sensitivity — respect local business context and terminology

---

## COMPONENT PATTERNS

- Data fetching in Server Components — never useEffect for initial data
- Translations via `useTranslations()` from next-intl
- Animations via `ScrollReveal` wrapper (Intersection Observer)
- Tailwind classes directly — no CSS modules or styled-components
- Font stack: Plus Jakarta Sans (body) + Fraunces (headings) + Noto Sans Arabic (AR)

---

## TESTING

**Level:** Moderate — core logic coverage
**Run:** `npx vitest run` (when configured)
**What to test:** i18n routing, sector data integrity, component rendering
**Mock rule:** Mock external services, never mock internal modules

---

## AGENT DELEGATION

| Agent | When to use |
|-------|-------------|
| planner | Before any new feature or page |
| code-reviewer | After 50+ lines changed |
| ux-reviewer | After any UI/visual changes |
| refactor-cleaner | When a file exceeds 300 lines |
| tdd-guide | New utilities or data processing |

## MODEL SELECTION

- **Sonnet** → Component building, styling, content, translations (90%)
- **Opus** → Architecture decisions, complex logic, code review
- **Haiku** → File reading, quick searches, subagent exploration

---

## MULTI-MODEL WORKFLOW (Claude Code + Gemini)

- **Claude Code**: Primary for architecture decisions, complex logic,
  code review, and anything requiring deep reasoning
- **Gemini**: Fast generation, boilerplate, repetitive transforms,
  documentation drafts
- **Handoff pattern**: Use Claude for design → Gemini for implementation
  → Claude for review
- **Context sharing**: Keep CLAUDE.md updated so both models have
  the same project context at all times

---

## CRITICAL WARNINGS

1. **RTL bugs**: Arabic layout can break any component — always verify with `dir="rtl"`
2. **Large files**: `visuals.tsx` (691 lines) needs splitting — extract each visual into its own file
3. **SEO**: Trilingual content needs proper hreflang tags, sitemap, and structured data
4. **Next.js 16**: APIs differ from training data — always check docs first
