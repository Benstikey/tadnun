# Site Architecture — Tadnun Expanded Information Architecture

*Created: 2026-03-27*

---

## 1. Current State

```
/{locale}/
├── (home)                        Homepage — hero, sector cards, approach, expertise, FAQ, CTA
├── sectors/                      Sector listing — 8 sector cards
│   └── {sector}/                 Sector detail — pain points, solutions, testimonials, ROI, FAQ
├── approach/                     Methodology — 3-step process (listen, build, support)
├── about/                        Company story
└── contact/                      Contact form + WhatsApp CTA
```

Locales: `fr` (default), `en`, `ar` (RTL)
Sectors: agriculture, restaurants, tourism, healthcare, retail, education, realestate, logistics

---

## 2. Proposed URL Structure

```
/{locale}/
│
├── (home)                                    Homepage (unchanged)
├── sectors/                                  Sector listing (unchanged)
│   └── {sector}/                             Sector detail (enhanced — see internal linking)
│       └── {city}/                           City landing page (programmatic SEO)
│
├── blog/                                     Blog listing — filterable by sector, topic
│   ├── {slug}/                               Individual blog post
│   └── category/{category}/                  Category archive page
│
├── case-studies/                              Case study listing
│   └── {slug}/                               Individual case study
│
├── compare/                                   Comparison hub (optional listing page)
│   ├── tadnun-vs-{competitor}/               "Tadnun vs X" comparison
│   └── {category}-alternatives/              "Best X alternatives in Morocco"
│
├── tools/                                     Free tools hub
│   ├── roi-calculator/                        ROI/savings calculator per sector
│   ├── digital-readiness-quiz/                Self-assessment quiz
│   └── {tool-slug}/                           Future tools
│
├── approach/                                  Methodology (unchanged)
├── about/                                     Company story (unchanged)
└── contact/                                   Contact form + WhatsApp (unchanged)
```

### URL Pattern Details

| Page Type | URL Pattern | Example (FR) |
|-----------|------------|--------------|
| Home | `/{locale}/` | `/fr/` |
| Sector listing | `/{locale}/sectors` | `/fr/sectors` |
| Sector detail | `/{locale}/sectors/{sector}` | `/fr/sectors/agriculture` |
| **City landing** | `/{locale}/sectors/{sector}/{city}` | `/fr/sectors/restaurants/marrakech` |
| Blog listing | `/{locale}/blog` | `/fr/blog` |
| Blog post | `/{locale}/blog/{slug}` | `/fr/blog/tracabilite-export-maroc` |
| Blog category | `/{locale}/blog/category/{category}` | `/fr/blog/category/agriculture` |
| Case study listing | `/{locale}/case-studies` | `/fr/case-studies` |
| Case study detail | `/{locale}/case-studies/{slug}` | `/fr/case-studies/cooperative-argan-essaouira` |
| Comparison | `/{locale}/compare/{slug}` | `/fr/compare/tadnun-vs-odoo` |
| Tool | `/{locale}/tools/{tool-slug}` | `/fr/tools/roi-calculator` |

### Slug Conventions

- Blog slugs: descriptive, keyword-rich, French for `/fr/`, English for `/en/`, transliterated Arabic for `/ar/`
- Case study slugs: `{sector}-{business-type}-{city}` pattern (e.g., `agriculture-cooperative-essaouira`)
- Comparison slugs: either `tadnun-vs-{competitor}` or `{category}-alternatives-maroc`
- City slugs: lowercase city name, no diacritics (`marrakech`, `casablanca`, `agadir`, `tanger`, `fes`, `rabat`, `oujda`, `meknes`, `essaouira`, `chefchaouen`, `kenitra`, `nador`, `el-jadida`, `beni-mellal`)

---

## 3. Navigation Updates

### Current Nav (3 links + CTA)

```
[Logo]   Sectors   Approach   About   [Locale]  [Let's Talk →]
```

### Proposed Nav (4 links + mega-menu + CTA)

```
[Logo]   Solutions ▾   Resources ▾   About   [Locale]  [Let's Talk →]
```

#### Solutions (mega-menu dropdown)

Replaces "Sectors" with a richer dropdown:

```
Solutions
├── By Sector
│   ├── Agriculture & Cooperatives
│   ├── Restaurants & Cafes
│   ├── Tourism & Hotels
│   ├── Healthcare & Clinics
│   ├── Retail & Commerce
│   ├── Education & Training
│   ├── Real Estate
│   └── Logistics & Transport
├── Our Approach  →  /{locale}/approach
└── Free Tools    →  /{locale}/tools
```

#### Resources (dropdown)

New top-level nav item grouping content:

```
Resources
├── Blog              →  /{locale}/blog
├── Case Studies      →  /{locale}/case-studies
└── Comparisons       →  /{locale}/compare
```

#### Mobile Nav

```
Solutions (expandable)
  → View all sectors
  → Agriculture
  → Restaurants
  → ... (all 8)
  → Our Approach
  → Free Tools
Resources (expandable)
  → Blog
  → Case Studies
  → Comparisons
About
[Let's Talk →]
```

### Footer Updates

The footer should expand to include all new sections:

```
Sectors            Resources           Company           Free Tools
Agriculture        Blog                About             ROI Calculator
Restaurants        Case Studies        Approach          Digital Readiness Quiz
Tourism            Comparisons         Contact
Healthcare
Retail
Education
Real Estate
Logistics
```

---

## 4. Internal Linking Strategy

### 4.1 Sector Pages → Content

Each sector detail page (`/{locale}/sectors/{sector}`) should include:

- **Related blog posts** — a "Learn more about {sector}" section at the bottom showing 2-3 blog posts tagged with that sector
- **Related case studies** — a "Success stories" section showing 1-2 case studies from that sector (or the closest match)
- **City links** — if city landing pages exist for that sector, link from the sector page: "See how we help {sector} businesses in {city}"
- **Tool links** — contextual CTA: "Calculate your potential savings" → ROI calculator pre-filled with that sector

### 4.2 Blog Posts → Conversion Pages

Every blog post should include:

- **Sector sidebar/banner** — if the post is sector-tagged, show a contextual CTA linking to the sector page: "See how Tadnun helps {sector} businesses →"
- **Inline CTAs** — 1-2 contextual CTAs within the body linking to contact or the relevant sector page
- **Related posts** — 2-3 related posts at the bottom (same sector or same topic)
- **Tool CTAs** — where relevant, link to the ROI calculator or readiness quiz
- **Author/about blurb** — brief company description with link to `/about`

### 4.3 Case Studies → Sector Pages

Each case study should include:

- **Sector badge** — clickable link back to the sector detail page
- **City reference** — if a city landing page exists, link to it
- **Other case studies** — "More success stories" section with 1-2 other case studies (prefer same sector, fall back to related sectors)
- **Contact CTA** — strong bottom CTA: "Ready for similar results? Let's talk →" linking to `/contact`

### 4.4 Comparison Pages → Contact

Each comparison page should include:

- **Feature comparison table** — factual, fair comparison
- **Sector-specific context** — "For {sector} businesses, Tadnun offers..." linking to the relevant sector page
- **Strong bottom CTA** — "See how Tadnun fits your business → Free 15-min call" linking to `/contact`
- **Related blog posts** — link to blog posts that expand on differentiators

### 4.5 City Landing Pages → Parent Sector

Each city page should include:

- **Breadcrumbs** — `Sectors > {Sector} > {City}` with links
- **Parent sector link** — "See all {sector} solutions →" linking to the sector page
- **Testimonials** — filtered to that city when available (data already includes `city` field in testimonials)
- **Local context** — mention of city-specific integrations or businesses
- **Contact CTA** — "Talk to us about your {city} business →"

### 4.6 Free Tools → Everything

Each tool page should include:

- **Sector selection** — the tool should let users pick their sector, then link to that sector page
- **Results → Contact** — after completing the tool, strong CTA to contact
- **Blog links** — contextual links to blog posts that expand on the results

### 4.7 Cross-Linking Summary Matrix

| From \ To | Sector | Blog | Case Study | Compare | Tool | Contact |
|-----------|--------|------|------------|---------|------|---------|
| **Sector** | Related sectors | Related posts | Sector stories | — | Sector calculator | CTA |
| **Blog** | Sector sidebar | Related posts | Inline mention | Inline link | Inline CTA | Inline CTA |
| **Case Study** | Sector badge | Related posts | More stories | — | — | Strong CTA |
| **Compare** | Sector context | Related posts | — | Related comparisons | — | Strong CTA |
| **Tool** | Results link | Related posts | — | — | Other tools | Results CTA |
| **City** | Parent sector | Local posts | Local stories | — | — | Local CTA |

---

## 5. Page Templates Needed

### 5.1 Blog Listing Page

**Route:** `/{locale}/blog`
**Purpose:** Content hub for SEO long-tail keywords and thought leadership
**Key sections:**
- Featured/latest post (hero card)
- Filter bar: by sector (8 tags) and by topic category
- Post grid (card layout: image, title, excerpt, sector tag, date, read time)
- Pagination or infinite scroll
- Sidebar or top: newsletter signup CTA (future), free tool CTA

**Content model (per post):**
```typescript
interface BlogPost {
  slug: string;                    // URL-friendly identifier
  title: string;                   // per locale
  excerpt: string;                 // per locale, ~160 chars
  body: string;                    // per locale, MDX content
  coverImage: string;              // path to image
  sector: SectorKey | null;        // optional sector tag
  category: BlogCategory;          // topic category
  publishedAt: string;             // ISO date
  updatedAt?: string;              // ISO date
  readingTime: number;             // minutes
  author: string;                  // author name
  seo: { title: string; description: string }; // per locale
}

type BlogCategory =
  | "guides"            // How-to guides for Moroccan businesses
  | "sector-insights"   // Industry-specific analysis
  | "digital-tips"      // Quick practical tips
  | "success-stories"   // Lighter than case studies
  | "moroccan-market"   // Market trends, regulations, opportunities
  | "product-updates";  // Tadnun product news
```

### 5.2 Blog Post Page

**Route:** `/{locale}/blog/{slug}`
**Purpose:** Individual article optimized for SEO and conversion
**Key sections:**
- Article header (title, excerpt, sector badge, date, read time, author)
- Cover image
- MDX body content with inline CTAs
- Sector sidebar CTA (if sector-tagged)
- Related posts (2-3 cards)
- Contact CTA band at bottom
- Structured data: Article schema (JSON-LD)

### 5.3 Blog Category Page

**Route:** `/{locale}/blog/category/{category}`
**Purpose:** Archive page for filtering by topic
**Key sections:**
- Category heading and description
- Post grid (same as blog listing but filtered)
- Cross-links to other categories

### 5.4 Case Study Listing Page

**Route:** `/{locale}/case-studies`
**Purpose:** Social proof hub, sector-filterable
**Key sections:**
- Hero: "150+ businesses transformed" headline
- Filter bar: by sector
- Case study cards (business name, city, sector, headline metric, excerpt)
- Contact CTA band

**Content model (per case study):**
```typescript
interface CaseStudy {
  slug: string;                    // URL-friendly identifier
  businessName: string;            // anonymized if needed
  businessType: string;            // per locale
  city: string;                    // Moroccan city
  sector: SectorKey;               // always sector-tagged
  title: string;                   // per locale — headline result
  excerpt: string;                 // per locale, ~160 chars
  heroStat: { value: string; label: string }; // e.g., "60%" / "reduction in disputes"
  challenge: string;               // per locale
  solution: string;                // per locale
  results: { stat: string; label: string }[]; // per locale
  testimonialQuote?: string;       // per locale
  testimonialName?: string;
  testimonialRole?: string;
  coverImage?: string;
  seo: { title: string; description: string }; // per locale
}
```

### 5.5 Case Study Detail Page

**Route:** `/{locale}/case-studies/{slug}`
**Purpose:** In-depth social proof driving contact conversions
**Key sections:**
- Header (business type, city, sector badge, hero stat)
- Challenge section (the problem before Tadnun)
- Solution section (what we built and how)
- Results section (metric cards with before/after)
- Testimonial quote (full attribution)
- Related case studies (1-2 from same or related sectors)
- Strong contact CTA: "Ready for results like these?"
- Structured data: Article or Case Study schema

### 5.6 Comparison Page Template

**Route:** `/{locale}/compare/{slug}`
**Purpose:** Capture bottom-of-funnel "vs" and "alternatives" search traffic
**Two sub-types:**

#### "Tadnun vs X" Page
- Header (Tadnun logo vs competitor logo)
- Quick verdict summary
- Feature comparison table (10-15 rows)
- Pricing comparison (if public)
- Morocco-specific factors (Darija, CMI, ONSSA, on-site support)
- "Who is X best for?" / "Who is Tadnun best for?"
- Contact CTA

#### "X Alternatives in Morocco" Page
- Header (overview of the category)
- Brief overview of each alternative (including Tadnun)
- Comparison matrix
- "Why Moroccan SMEs choose Tadnun" section
- Contact CTA

**Content model (per comparison):**
```typescript
interface ComparisonPage {
  slug: string;
  type: "vs" | "alternatives";
  title: string;                   // per locale
  metaDescription: string;         // per locale
  competitor?: string;             // for "vs" type
  category?: string;               // for "alternatives" type
  features: {
    name: string;                  // per locale
    tadnun: string;                // per locale — what Tadnun offers
    competitor: string;            // per locale — what competitor offers
  }[];
  verdict: string;                 // per locale
  seo: { title: string; description: string };
}
```

**Initial comparison pages to create:**
- `tadnun-vs-odoo` — primary direct competitor
- `tadnun-vs-freelancers` — local web agencies/freelancers
- `tadnun-vs-hubspot` — foreign SaaS comparison
- `tadnun-vs-zoho` — foreign SaaS comparison
- `logiciel-gestion-pme-maroc` — alternatives roundup ("Best SME software in Morocco")

### 5.7 City Landing Page Template

**Route:** `/{locale}/sectors/{sector}/{city}`
**Purpose:** Programmatic SEO for "{sector} + {city}" queries (e.g., "digitalisation restaurant marrakech")
**Key sections:**
- H1: "{Sector solutions} in {City}" (localized)
- Brief sector intro (reuse from parent sector page, with city-specific angle)
- City-specific pain points (light customization or same as sector)
- Testimonials filtered to that city (from existing `sectorDetails` data)
- Local integrations mentioned
- City-specific stats or context if available
- Breadcrumbs: Home > Sectors > {Sector} > {City}
- Contact CTA with city context: "Talk to us about your {city} business"
- Structured data: LocalBusiness schema with city address

**City x Sector Matrix (Phase 1):**

| City | Agriculture | Restaurants | Tourism | Healthcare | Retail | Real Estate | Logistics | Education |
|------|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
| Casablanca | | x | | x | x | x | x | |
| Marrakech | | x | x | | x | x | | |
| Rabat | | x | | x | | x | | x |
| Agadir | x | x | x | | | | | |
| Tanger | | | x | | x | x | x | |
| Fes | | | x | | x | x | | x |
| Meknes | x | | | | x | | | |
| Oujda | | | | x | | x | | |
| Essaouira | x | | x | | | | | |

This gives roughly 40-50 city landing pages in Phase 1, each with unique H1/title and city-filtered testimonials.

### 5.8 Free Tool Pages

#### ROI Calculator
**Route:** `/{locale}/tools/roi-calculator`
**Purpose:** Lead generation through value demonstration
**How it works:**
1. User selects their sector
2. User inputs basic business metrics (employees, monthly revenue, etc.)
3. Calculator shows estimated savings/gains based on sector benchmarks from existing ROI data
4. Results page shows personalized estimate with CTA: "Get your custom analysis — free 15-min call"
5. Optional: capture email before showing full results

**Key considerations:**
- Use existing `roi` data from `sectorDetails` as benchmark source
- Must work in all 3 locales with MAD currency formatting
- Interactive, client-side component (`"use client"`)

#### Digital Readiness Quiz
**Route:** `/{locale}/tools/digital-readiness-quiz`
**Purpose:** Lead qualification and engagement
**How it works:**
1. 8-10 questions about current digital maturity (paper vs. digital processes, online presence, etc.)
2. Score and category: "Getting Started" / "Partially Digital" / "Ready to Scale"
3. Personalized recommendations per sector
4. CTA: "See what Tadnun can do for your score level"

### 5.9 Tools Hub Page

**Route:** `/{locale}/tools`
**Purpose:** Central listing of all free tools
**Key sections:**
- Hero: "Free tools for Moroccan businesses"
- Tool cards (icon, title, description, CTA button)
- Lightweight — just links to individual tool pages

---

## 6. Priority Order

Ranked by SEO value and conversion potential, accounting for implementation effort.

### Phase 1 — Foundation (Weeks 1-4)

| Priority | Page Type | Why First | SEO Value | Conversion Value | Effort |
|:--------:|-----------|-----------|:---------:|:----------------:|:------:|
| 1 | **Blog infrastructure** (listing + post template) | Content is the engine for all organic growth. Every other page type benefits from blog posts linking to it. | High | Medium | Medium |
| 2 | **5-8 initial blog posts** | Seed content for sector keywords. Target: one post per top-performing sector (agriculture, restaurants, tourism, healthcare). | High | Medium | Medium |
| 3 | **ROI Calculator** | Highest-converting free tool. Uses existing ROI data. Generates qualified leads. | Medium | Very High | Medium |

### Phase 2 — Social Proof (Weeks 5-8)

| Priority | Page Type | Why Now | SEO Value | Conversion Value | Effort |
|:--------:|-----------|---------|:---------:|:----------------:|:------:|
| 4 | **Case study template** (listing + detail) | Existing testimonials can be expanded into full case studies. Strongest conversion asset after direct contact. | Medium | Very High | Medium |
| 5 | **3-4 initial case studies** | One per persona: cooperative president, restaurant owner, riad owner, clinic director. Directly from existing testimonial data. | Medium | Very High | Low |
| 6 | **Comparison pages** (template + 2-3 pages) | Captures bottom-of-funnel "vs" search intent. Start with Tadnun vs Odoo and Tadnun vs freelancers. | High | High | Low |

### Phase 3 — Scale (Weeks 9-14)

| Priority | Page Type | Why Now | SEO Value | Conversion Value | Effort |
|:--------:|-----------|---------|:---------:|:----------------:|:------:|
| 7 | **City landing pages** (template + Phase 1 cities) | Programmatic SEO for long-tail local queries. High volume of "{service} {city}" searches in Morocco. | Very High | Medium | Medium |
| 8 | **Digital Readiness Quiz** | Second free tool for lead qualification. Good for top-of-funnel engagement. | Low | High | Medium |
| 9 | **Nav redesign** (mega-menu) | Once there is enough content to populate Resources dropdown. Doing it earlier would create empty sections. | N/A | Medium | Low |

### Phase 4 — Expand (Ongoing)

| Priority | Page Type | Why Ongoing | SEO Value | Conversion Value | Effort |
|:--------:|-----------|-------------|:---------:|:----------------:|:------:|
| 10 | **Blog cadence** (2-4 posts/month) | Continuous SEO growth. Target new long-tail keywords per sector. | High | Medium | Ongoing |
| 11 | **More case studies** (1-2/month) | As real clients convert, document their results. | Medium | Very High | Low |
| 12 | **More comparison pages** | Expand to Zoho, HubSpot, and "alternatives" roundup pages. | High | High | Low |
| 13 | **More city pages** | Expand matrix to tier-2 cities as content and testimonials grow. | High | Medium | Low |
| 14 | **Additional tools** | Sector-specific calculators (e.g., "Booking.com commission calculator", "food waste cost calculator"). | Medium | High | Medium |

---

## 7. Trilingual Considerations

### URL Strategy

All URLs use the same slugs across locales. Blog posts and case studies use locale-specific slugs for SEO:

```
/fr/blog/tracabilite-export-maroc-guide-complet
/en/blog/morocco-export-traceability-complete-guide
/ar/blog/تتبع-الصادرات-المغرب-دليل-شامل
```

For programmatic pages (sectors, cities, comparisons), use consistent English slugs across all locales to simplify routing:

```
/fr/sectors/agriculture/agadir    ← French content, English slug
/en/sectors/agriculture/agadir    ← English content, English slug
/ar/sectors/agriculture/agadir    ← Arabic content, English slug
```

### Hreflang Tags

Every page must include hreflang alternates for all three locales. The current `sitemap.ts` already implements this pattern with the `alternates.languages` field. Extend this to all new page types.

### RTL Considerations for New Templates

- **Blog post layout**: sidebar CTA must flip to left side in RTL
- **Comparison tables**: column order should remain logical in RTL (Tadnun column always first/prominent)
- **City landing pages**: breadcrumbs must render RTL with proper separator direction
- **Free tools**: form inputs, progress indicators, and result displays must all support RTL
- **Blog category filters**: horizontal filter bar scrolls in correct direction

### Translation Workflow for New Content

- **Blog posts**: write in French first (primary market), then translate to English and Arabic
- **Case studies**: same as blog — French first
- **Comparison pages**: French first, but ensure competitor names remain untranslated
- **City landing pages**: mostly templated content with city name injection — minimal per-locale effort
- **Tool pages**: UI strings go in `messages/{locale}.json`; tool logic is locale-independent

### Translation Key Namespacing

New content types should follow the existing dot-notation pattern:

```json
{
  "blog": {
    "title": "Blog",
    "readMore": "Lire la suite",
    "publishedOn": "Publié le",
    "readingTime": "{minutes} min de lecture",
    "filterBySector": "Filtrer par secteur",
    "allPosts": "Tous les articles",
    "categories": {
      "guides": "Guides",
      "sector-insights": "Analyses sectorielles",
      "digital-tips": "Conseils digitaux",
      "success-stories": "Histoires de réussite",
      "moroccan-market": "Marché marocain",
      "product-updates": "Nouveautés"
    }
  },
  "caseStudies": {
    "title": "Études de cas",
    "challenge": "Le défi",
    "solution": "La solution",
    "results": "Les résultats",
    "moreStories": "Plus d'histoires"
  },
  "compare": {
    "title": "Comparaisons",
    "feature": "Fonctionnalité",
    "verdict": "Notre avis",
    "bestFor": "Idéal pour"
  },
  "tools": {
    "title": "Outils gratuits",
    "roiCalculator": { "title": "Calculateur de ROI", "...": "..." },
    "readinessQuiz": { "title": "Quiz de maturité digitale", "...": "..." }
  },
  "cityLanding": {
    "heroTitle": "Solutions {sector} à {city}",
    "localBusinesses": "Entreprises accompagnées à {city}",
    "talkAbout": "Parlons de votre activité à {city}"
  }
}
```

---

## 8. Technical Implementation Notes

### Content Storage Strategy

Two viable approaches for blog posts and case studies:

**Option A: MDX files in repo (recommended for Phase 1)**
```
src/content/
├── blog/
│   ├── fr/
│   │   └── tracabilite-export-maroc.mdx
│   ├── en/
│   │   └── morocco-export-traceability.mdx
│   └── ar/
│       └── تتبع-الصادرات-المغرب.mdx
├── case-studies/
│   ├── fr/
│   │   └── cooperative-argan-essaouira.mdx
│   └── ...
└── comparisons/
    ├── fr/
    │   └── tadnun-vs-odoo.mdx
    └── ...
```

Benefits: version-controlled, SSG-friendly, no external dependency.

**Option B: Headless CMS (consider for Phase 4)**
When content volume exceeds ~50 posts or when non-developers need to publish.

### Sitemap Extension

The current `sitemap.ts` needs to be extended to dynamically include:
- All blog posts (with `changeFrequency: "weekly"`)
- All case studies (with `changeFrequency: "monthly"`)
- All comparison pages (with `changeFrequency: "monthly"`)
- All city landing pages (with `changeFrequency: "monthly"`)
- All tool pages (with `changeFrequency: "yearly"`)

### Static Generation

All new page types should use `generateStaticParams()` for SSG:
- Blog: generate from MDX file listing
- Case studies: generate from MDX file listing
- Comparisons: generate from MDX file listing
- City pages: generate from a `CITIES_BY_SECTOR` data map
- Tools: static routes, no dynamic params needed

### Structured Data (JSON-LD)

Each new page type needs its own schema. Extend the existing `SectorJsonLd` and `HomeFaqJsonLd` pattern:

| Page Type | Schema Type |
|-----------|------------|
| Blog post | `Article` with `author`, `datePublished`, `image` |
| Blog listing | `CollectionPage` |
| Case study | `Article` (or `CreativeWork`) |
| Comparison | `Article` with `about` |
| City landing | `LocalBusiness` + `Service` |
| ROI Calculator | `WebApplication` |
| Quiz | `WebApplication` |

---

## 9. SEO Keyword Mapping

### Primary Keywords by Page Type

| Page Type | Target Keywords (FR) | Search Intent |
|-----------|---------------------|---------------|
| Sector: agriculture | digitalisation agriculture maroc, logiciel cooperative maroc | Informational → Commercial |
| Sector: restaurants | digitalisation restaurant maroc, fiche google restaurant | Informational → Commercial |
| City: restaurants/marrakech | restaurant digitalisation marrakech, google maps restaurant marrakech | Local commercial |
| Blog: guides | comment digitaliser son entreprise au maroc, tracabilite export maroc | Informational |
| Case study | transformation digitale pme maroc exemple, temoignage digitalisation | Social proof |
| Compare: vs odoo | alternative odoo maroc, odoo vs solution locale maroc | Commercial |
| Compare: alternatives | meilleur logiciel gestion pme maroc | Commercial |
| Tool: ROI calculator | calculer roi digitalisation, combien coute la digitalisation | Transactional |
| Tool: readiness quiz | maturite digitale pme, test digitalisation entreprise | Informational |

---

## 10. Metrics and Success Criteria

### KPIs per Page Type

| Page Type | Primary Metric | Target |
|-----------|---------------|--------|
| Blog | Organic sessions, time on page | 500 sessions/month within 6 months |
| Case studies | Contact form submissions from case study pages | 5% click-through to contact |
| Comparison pages | Organic traffic for "vs" and "alternative" queries | Top 5 ranking within 3 months |
| City landing pages | Local organic traffic | 50 sessions/page/month within 4 months |
| ROI Calculator | Lead captures (email or WhatsApp) | 15% completion-to-contact rate |
| Readiness Quiz | Completions, subsequent contact | 10% completion-to-contact rate |

---

*This document should be updated as the site grows and new content types are considered.*
