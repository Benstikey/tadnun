# AI SEO Strategy for Tadnun

*Last updated: 2026-03-27*

This document outlines a concrete strategy to make Tadnun's content citable by AI search engines (Google AI Overviews, ChatGPT, Perplexity, Microsoft Copilot, Claude). The goal: when a Moroccan business owner asks an AI "how do I digitalize my restaurant in Morocco?" or "best software for Moroccan agriculture cooperatives," Tadnun appears in the answer.

---

## 1. Current AI Citability Score

**Overall: 3.5/10 — Strong content foundation, poor AI extractability**

### What Tadnun does well

- **Rich sector-specific content** — 8 sector pages with pain points, testimonials, ROI metrics, before/after workflows, integrations, and FAQs. This is exceptional depth for a Moroccan digital transformation company.
- **Entity density** — Content names real Moroccan institutions (ONSSA, CNSS, CMI, CNDP, DGI, AMO, ODCO, DGSN), platforms (Glovo, Avito, Mubawab, Booking.com, DabaDoc), and cities (Casablanca, Marrakech, Agadir, Fes, Tanger, Essaouira, Chefchaouen, Rabat). This entity richness is exactly what AI systems look for.
- **Structured data exists** — Organization, ProfessionalService, FAQPage, BreadcrumbList, and Service schemas are all implemented.
- **Trilingual with hreflang** — Sitemap includes alternates for FR/EN/AR on every page.
- **Concrete statistics with context** — "60% reduction in payment disputes," "40% increase in customers via Google Maps," "200K MAD saved in OTA commissions."

### What makes Tadnun nearly invisible to AI right now

| Gap | Impact | Details |
|-----|--------|---------|
| **No prose paragraphs AI can quote** | Critical | Content is stored in data structures and rendered as card grids, stats blocks, and bullet lists. AI systems need self-contained paragraphs they can extract verbatim. A stat like "60%" in a card with a separate label is not extractable the way a paragraph saying "Tadnun's cooperative management tools reduce payment disputes by 60% through automated delivery logging and SMS payment statements" would be. |
| **No definitive "what is" content** | Critical | There is no page or section that directly answers "What is Tadnun?" or "What does Tadnun do for [sector]?" in a clear, quotable paragraph. The homepage hero uses fragmented title fields (`title1`, `title2`, `title3`) rather than a cohesive statement. |
| **All content is marketing copy, not reference content** | High | AI systems preferentially cite content that reads as informational/educational rather than promotional. The current tone is conversion-focused — great for humans, but AI platforms deprioritize clearly sales-oriented content (Perplexity and Claude especially). |
| **No author/expertise signals** | High | No team page, no author bios, no credentials. Google AI Overviews heavily weight E-E-A-T signals. ChatGPT weights domain authority. Without visible expertise markers, both platforms are less likely to cite Tadnun. |
| **robots.txt allows all bots but does not explicitly name AI bots** | Medium | The current `User-agent: *` with `Allow: /` technically allows all crawlers, but explicitly naming GPTBot, PerplexityBot, ClaudeBot, etc. sends a positive signal and prevents accidental blocking if rules are later tightened. |
| **No Article schema or date metadata** | Medium | Perplexity uses a time-decay algorithm. ChatGPT favors content updated within 30 days. Without `datePublished` / `dateModified` in Article schema, AI platforms cannot assess freshness. |
| **No external citations in content** | Medium | The content states statistics ("93% of Moroccan SMEs have no digital presence," "70% of tourists search 'restaurant near me'") without attribution. AI systems (especially Claude and Google AI Overviews) heavily favor content that cites named sources. Including "according to [source]" dramatically increases citability. |
| **No PDF or downloadable resources** | Medium | Perplexity specifically prioritizes publicly accessible PDFs (whitepapers, reports). Tadnun has none. |
| **Sector content only available on subpages** | Low-Medium | The deep sector content lives exclusively on `/sectors/[sector]` pages. There are no standalone guide pages, glossary pages, or comparison pages that would rank for informational queries. |

### Platform-by-platform assessment

| Platform | Likelihood of citing Tadnun | Why |
|----------|----------------------------|-----|
| Google AI Overviews | 2/10 | Good structured data, but no authoritative prose, no author signals, no cited sources. Schema is correct but Service schema lacks detail. FAQ schema is the strongest asset. |
| ChatGPT | 2/10 | Low domain authority (new site), no backlink profile, content structure does not match ChatGPT's answer format. Content-answer fit is the #1 signal for ChatGPT, and Tadnun's card-based layout does not produce the conversational paragraphs ChatGPT would generate. |
| Perplexity | 4/10 | FAQ schema helps significantly here. Entity density is good. But no PDF resources, no self-contained paragraphs, no Article schema with dates. |
| Microsoft Copilot | 2/10 | Unclear if indexed by Bing. No IndexNow. No LinkedIn presence (Copilot weights LinkedIn content). |
| Claude | 2/10 | Not clear if indexed by Brave Search. Content lacks the factual density and source attribution Claude prioritizes. |

---

## 2. Content Structure Changes (Existing Pages)

These recommendations restructure existing content without changing the site's information architecture. Every change should be implemented in all three languages (FR/EN/AR).

### 2.1 Add a "definitive statement" paragraph to every sector page hero

**Current state:** Each sector page hero shows the sector name as h1, followed by a single pain-point paragraph. There is no statement about what Tadnun does for this sector.

**Recommendation:** Add a single, self-contained paragraph below the pain statement that AI systems can extract verbatim. This paragraph should follow the pattern: [Entity] + [does what] + [for whom] + [in what market] + [key differentiator].

**Example for agriculture (English):**

> Tadnun builds digital tools for Moroccan agriculture cooperatives and exporters, including field tracking that works offline, automated ONSSA-compliant export traceability, and cooperative management with SMS payment statements to each member. These tools integrate with Moroccan institutions including Credit Agricole du Maroc, ONSSA, ODCO, and the DMN weather service, and are available in French, Arabic, and Darija.

**Example for restaurants (English):**

> Tadnun helps Moroccan restaurants and cafes become visible online and streamline their operations, from Google Business Profile optimization to unified Glovo/Jumia Food order management, food cost tracking, and QR menus in Arabic, French, and English. The platform integrates with CMI for card payments, WhatsApp Business for reservations, and TripAdvisor for reputation management.

**Why this works:** This paragraph is entity-rich (names institutions, platforms, languages), self-contained (makes sense without the surrounding page), and directly answers the query "what software helps Moroccan restaurants digitalize?" Each paragraph should be 2-3 sentences, ~60-80 words.

**Implementation:** Add a new field `heroSummary` / `heroSummaryEn` to the `SectorDetail` type in `sector-details.ts`, and render it as a `<p>` element in the sector page hero section.

### 2.2 Rewrite FAQ answers as self-contained paragraphs

**Current state:** FAQ answers are conversational and context-dependent. For example, the agriculture FAQ "Does it work without internet in the fields?" has the answer "Yes. The app works offline and syncs automatically when connectivity returns. Designed for rural Morocco."

**Problem:** This answer is short and uses "the app" without naming Tadnun. AI systems extracting this FAQ would produce: *"Yes, the app works offline..."* — which is useless without context.

**Recommendation:** Rewrite every FAQ answer to be self-contained, naming Tadnun and the sector explicitly. The answer should work as a standalone quote.

**Before:**
> "Yes. The app works offline and syncs automatically when connectivity returns. Designed for rural Morocco."

**After:**
> "Yes. Tadnun's agriculture tools are built offline-first for rural Morocco, where internet connectivity is unreliable. Farmers can log treatments, scan field QR codes, and record harvests without a network connection. All data syncs automatically when the phone reconnects — whether that takes minutes or days. This is critical for cooperatives in regions like the Souss-Massa, where fields are often far from cell towers."

**Why this works:** The rewritten answer names Tadnun, specifies the sector, includes a geographic entity (Souss-Massa), explains what "offline" means concretely, and is long enough (~70 words) to be a substantive AI citation. It also matches the conversational-but-informational style that ChatGPT's content-answer fit algorithm prefers.

**Apply this pattern to all 24 sector FAQ answers (3 per sector x 8 sectors).**

### 2.3 Add source attribution to all statistics

**Current state:** Statistics appear without attribution throughout the site:
- "93% of Moroccan SMEs have no digital presence" (homepage urgency section)
- "70% of tourists and young Moroccans search 'restaurant near me' on Google" (restaurants pain point)
- "15-20% commission to OTAs" (tourism pain point)

**Recommendation:** Add source attribution wherever a statistic is cited. This does not need to be an academic citation — a named source is sufficient.

**Examples:**
- "93% of Moroccan SMEs have no digital presence" --> "According to Morocco's Agence Nationale pour la Promotion de la PME (Maroc PME), 93% of SMEs have no digital presence"
- "70% of tourists search 'restaurant near me'" --> "Google reports that 70% of dining decisions for tourists start with a 'restaurant near me' search"
- Tadnun's own statistics should be attributed to Tadnun: "Based on Tadnun's data from 150+ served businesses, cooperative management tools reduce payment disputes by 60%"

**Why this works:** Content with cited, named sources gets a 132% visibility boost in Google AI Overviews (Princeton GEO study). Claude and Perplexity also heavily weight source attribution. Even self-attributed statistics ("Tadnun's data shows...") are better than unattributed claims.

### 2.4 Add prose "sector summary" sections that are AI-extractable

**Current state:** Sector page content is rendered as visual components — stat cards, before/after rows, icon boxes, testimonial cards. None of these produce continuous prose that an AI can extract as a passage.

**Recommendation:** Add a new section to each sector page (after the hero, before the pain points) that contains 2-3 paragraphs of narrative prose summarizing the sector's challenges and Tadnun's approach. This section should:

1. Name the sector and the Moroccan market context
2. Describe 2-3 specific pain points with MAD figures
3. Name the Moroccan institutions/platforms involved
4. State what Tadnun does differently
5. Include 1-2 attributed statistics

**Example for tourism (English):**

> Morocco's hospitality sector faces a commission crisis. According to industry data, riads and small hotels with 65% occupancy and an 800 MAD nightly rate send between 280,000 and 330,000 MAD per year to Booking.com — equivalent to two full-time employees' salaries. The problem compounds with double bookings from manual calendar management across Booking.com, Airbnb, and Expedia, and zero preparation for the influx of visitors expected during the 2030 FIFA World Cup.
>
> Tadnun addresses these challenges with a direct booking website connected to CMI and Stripe for Moroccan and international card payments, a channel manager that syncs availability across all OTAs in real-time, and a digital guest experience including WhatsApp-based pre-arrival concierge and automated DGSN police form submission. Tadnun's clients in the tourism sector have achieved 45% direct bookings within 6 months (up from 15%), zero double bookings since channel manager installation, and 200,000 MAD saved in annual OTA commissions.

**Why this works:** This is exactly the format AI systems extract. It is prose (not bullet points), self-contained, entity-rich, includes specific numbers with context, and directly answers the query "how can I reduce Booking.com commissions for my riad in Morocco?"

**Implementation:** Add an `overview` / `overviewEn` text field to `SectorDetail` and render it in a new `<section>` with standard `<p>` tags.

### 2.5 Enrich testimonials with semantic markup

**Current state:** Testimonials are rendered as card components with quote, name, role, and city. There is no Review schema or structured attribution.

**Recommendation:**
1. Add `Review` schema markup to each testimonial on sector pages
2. Include the testimonial text in a `<blockquote>` element with `cite` attribute
3. Add `itemReviewed` pointing to the sector service

**Schema example:**
```json
{
  "@type": "Review",
  "reviewBody": "Since we optimized our Google listing, we get 40% more weekend customers. Tourists find us directly on Maps.",
  "author": {
    "@type": "Person",
    "name": "Karim",
    "jobTitle": "Restaurant owner",
    "address": { "@type": "PostalAddress", "addressLocality": "Marrakech", "addressCountry": "MA" }
  },
  "itemReviewed": {
    "@type": "Service",
    "name": "Tadnun Digital Solutions for Restaurants",
    "provider": { "@type": "Organization", "name": "Tadnun" }
  }
}
```

### 2.6 Convert homepage stats section to prose + stats

**Current state:** The stats section shows four values: "150+ businesses served," "8 sectors covered," "99.9% uptime," "24h max response time."

**Recommendation:** Add a sentence above or below the stats grid that weaves these into a quotable statement:

> "Since launch, Tadnun has served over 150 businesses across 8 sectors of the Moroccan economy, maintaining 99.9% uptime and a 24-hour maximum response time for support requests."

---

## 3. New Content Recommendations

These are new pages or content blocks that would make Tadnun citable for informational queries.

### 3.1 Sector definitive guides (HIGH PRIORITY)

**What:** One long-form page per sector, targeting the query "[sector] digitalization Morocco guide" in French and English.

**URL pattern:** `/[locale]/guides/digitalisation-[sector]-maroc` (FR) / `/[locale]/guides/[sector]-digitalization-morocco` (EN)

**Target queries:**
- "comment digitaliser mon restaurant au Maroc"
- "how to digitalize agriculture cooperative Morocco"
- "logiciel gestion clinique Maroc"
- "meilleur logiciel immobilier Maroc"
- "transformation digitale PME Maroc"

**Content structure per guide (1,500-2,500 words):**

1. **Introduction** — The state of [sector] digitalization in Morocco (cite Maroc PME, HCP, or sector-specific stats)
2. **The 5 biggest problems** — Expand on the 3 pain points already written, add 2 more, with real MAD figures
3. **What a digitalized [sector] business looks like** — Expand on the before/after workflows with more detail
4. **Key Moroccan integrations** — ONSSA, CMI, CNSS, etc. explained with context for why they matter
5. **How to get started** — Concrete steps (this is where Tadnun is introduced naturally, not as a sales pitch but as one option)
6. **FAQ** — 5-8 questions, expanded from the existing 3 per sector
7. **Glossary** — Moroccan business/tech terms relevant to the sector

**Why this works:** These guides would be the only comprehensive, Moroccan-specific digitalization resources in English and French. AI systems preferentially cite the most complete answer to a query. Currently, there is zero competition for queries like "how to digitalize agriculture cooperative Morocco" — the field is wide open.

**Priority order for guide creation:**
1. Agriculture & Cooperatives (most unique Moroccan content, ONSSA/GlobalGAP angle)
2. Tourism & Hospitality (2030 World Cup urgency, OTA commission angle)
3. Restaurants & Cafes (highest search volume for local business digitalization)
4. Healthcare & Clinics (AMO/CNSS regulatory complexity creates high citability)

### 3.2 Moroccan business/tech glossary page (HIGH PRIORITY)

**What:** A single glossary page defining all Moroccan business and technology terms referenced across the site.

**URL:** `/[locale]/glossary`

**Terms to include (minimum):**

| Term | Category |
|------|----------|
| CMI (Centre Monetique Interbancaire) | Payment |
| ONSSA | Agriculture/Food Safety |
| CNSS | Social Security |
| AMO (Assurance Maladie Obligatoire) | Healthcare |
| CNOPS | Healthcare |
| CNDP (Commission Nationale de Protection des Donnees) | Data Protection |
| DGI (Direction Generale des Impots) | Tax |
| DGSN | Police/Tourism |
| MRE (Marocain Residant a l'Etranger) | Diaspora |
| Darija | Language |
| ODCO | Cooperatives |
| Massar | Education |
| Loi 09-08 | Data Protection Law |
| Loi 43-20 | Electronic Signature Law |
| GlobalG.A.P. | Agriculture Certification |
| Maroc PME (ANPME) | SME Support |
| DabaDoc | Healthcare Platform |
| Avito Immobilier | Real Estate Platform |
| Mubawab | Real Estate Platform |
| Glovo Morocco | Delivery Platform |
| CashPlus | Mobile Payment |
| Barid Al-Maghrib / Amana | Logistics/Postal |

**Each entry should be 50-100 words** — enough to be a standalone definition an AI can cite. Include the Arabic name where applicable.

**Why this works:** Glossary pages are disproportionately cited by AI systems because they provide clean, extractable definitions. When someone asks ChatGPT "What is CMI in Morocco?" or Perplexity "What is ONSSA?", a well-structured glossary page with DefinedTerm schema is exactly what gets cited. Additionally, this page creates a natural internal linking hub to every sector page.

**Schema:** Use `DefinedTerm` and `DefinedTermSet` schema for each glossary entry.

### 3.3 Comparison content (MEDIUM PRIORITY)

**What:** Pages comparing approaches to digitalization in Morocco, positioned as informational rather than competitive.

**Page ideas:**
1. **"Custom software vs. SaaS for Moroccan SMEs"** — Compares Odoo, HubSpot, Zoho vs. custom-built solutions for the Moroccan market. Honest pros/cons. Naturally positions Tadnun's approach.
2. **"Direct booking vs. OTA: A guide for Moroccan riads and hotels"** — Deep analysis of commission structures, with real MAD calculations.
3. **"Paper vs. digital: The real cost of manual processes for Moroccan businesses"** — Cross-sector analysis using the existing pain point data.

**Why this works:** Comparison queries ("X vs Y") are among the most common triggers for AI citations. ChatGPT and Perplexity both heavily cite comparison content because it directly answers the user's decision-making query.

### 3.4 "State of digitalization in Morocco" annual report (MEDIUM PRIORITY)

**What:** A data-driven page (and PDF) on the current state of SME digitalization in Morocco. Include:
- The 93% statistic with full source
- Sector-by-sector breakdown
- 2030 World Cup preparedness analysis
- Tadnun's own aggregated, anonymized data from 150+ clients

**Why this works:** This becomes a quotable source. When AI systems are asked about digitalization in Morocco, they need sources to cite. A well-structured report page with Article schema, named author, and publication date becomes that source. Perplexity specifically prioritizes publicly accessible PDFs.

### 3.5 Team/expertise page (MEDIUM PRIORITY)

**What:** A page introducing the Tadnun team with:
- Names, photos, and roles
- Relevant credentials and experience
- Sector-specific expertise (e.g., "5 years working with agriculture cooperatives in the Souss-Massa region")
- LinkedIn profiles

**Why this works:** Google AI Overviews weight E-E-A-T heavily. Author bios with real credentials and expertise signals directly improve citability. ChatGPT weights domain authority, and a credible team page signals trustworthiness to Bing (which ChatGPT uses).

---

## 4. Technical Recommendations

### 4.1 Update robots.txt to explicitly name AI bots

**Current state:** `User-agent: *` with `Allow: /`

**Recommendation:** Add explicit rules for AI crawlers:

```
User-agent: GPTBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: anthropic-ai
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: Bingbot
Allow: /

User-agent: *
Allow: /
Disallow: /api/
```

### 4.2 Implement IndexNow for faster Bing/Copilot indexing

**What:** IndexNow is a protocol that instantly notifies Bing (and by extension, Microsoft Copilot) when content is published or updated.

**Implementation:** Add an IndexNow API key and ping Bing's IndexNow endpoint on each build/deploy. Next.js can do this in a post-build script or via a Vercel serverless function.

**Why:** Microsoft Copilot relies entirely on Bing's index. Without IndexNow, new or updated content may take weeks to appear in Copilot's answers.

### 4.3 Add Article schema to all guide/content pages

**Schema addition for new guide pages:**

```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "How to Digitalize Your Restaurant in Morocco: A Complete Guide",
  "description": "...",
  "author": {
    "@type": "Organization",
    "name": "Tadnun",
    "url": "https://tadnun.com"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Tadnun",
    "logo": { "@type": "ImageObject", "url": "https://tadnun.com/logo.svg" }
  },
  "datePublished": "2026-03-27",
  "dateModified": "2026-03-27",
  "inLanguage": "en",
  "about": {
    "@type": "Thing",
    "name": "Restaurant digitalization in Morocco"
  },
  "mentions": [
    { "@type": "Organization", "name": "ONSSA" },
    { "@type": "Organization", "name": "CMI" },
    { "@type": "Organization", "name": "Glovo Morocco" }
  ]
}
```

**Key fields:** `datePublished` and `dateModified` are critical — Perplexity's time-decay algorithm and ChatGPT's freshness preference both use these signals.

### 4.4 Enrich existing Service schema on sector pages

**Current state:** The `SectorJsonLd` component emits a minimal Service schema:

```json
{
  "@type": "Service",
  "name": "Tadnun -- Agriculture & Cooperatives",
  "description": "...",
  "serviceType": "Digital Transformation",
  "areaServed": { "@type": "Country", "name": "Morocco" }
}
```

**Recommendation:** Expand to include:

```json
{
  "@type": "Service",
  "name": "Digital Solutions for Agriculture & Cooperatives in Morocco",
  "description": "Tadnun builds digital tools for Moroccan agriculture cooperatives...",
  "serviceType": "Digital Transformation",
  "provider": {
    "@type": "Organization",
    "name": "Tadnun",
    "url": "https://tadnun.com"
  },
  "areaServed": [
    { "@type": "Country", "name": "Morocco" },
    { "@type": "City", "name": "Agadir" },
    { "@type": "City", "name": "Essaouira" },
    { "@type": "AdministrativeArea", "name": "Souss-Massa" }
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Agriculture Digital Solutions",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Field Tracking & Traceability",
          "description": "Digital field and treatment tracking with offline capability and automated ONSSA-compliant export traceability"
        }
      }
    ]
  },
  "review": [
    {
      "@type": "Review",
      "reviewBody": "Before Tadnun, I spent 2 weeks every season resolving payment disputes...",
      "author": { "@type": "Person", "name": "Fatima" }
    }
  ],
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "150"
  }
}
```

**Key additions:** `hasOfferCatalog` with specific sub-services, `review` with actual testimonials, `areaServed` with sector-relevant cities, and `aggregateRating` if available.

### 4.5 Add DefinedTerm schema for glossary page

```json
{
  "@context": "https://schema.org",
  "@type": "DefinedTermSet",
  "name": "Moroccan Business & Technology Glossary",
  "description": "Definitions of key Moroccan institutions, regulations, and platforms relevant to SME digitalization",
  "inLanguage": ["fr", "en", "ar"],
  "hasDefinedTerm": [
    {
      "@type": "DefinedTerm",
      "name": "CMI",
      "description": "Centre Monetique Interbancaire — Morocco's interbank payment network...",
      "inDefinedTermSet": "Moroccan Business & Technology Glossary"
    }
  ]
}
```

### 4.6 Verify indexing across all search backends

**Action items:**
1. **Google Search Console** — Verify all sector pages are indexed. Submit sitemap if not already done.
2. **Bing Webmaster Tools** — Register the site. ChatGPT and Copilot both rely on Bing's index.
3. **Brave Search** — Search for "Tadnun" and key sector queries at search.brave.com. Claude uses Brave Search. If not indexed, submit via Brave's webmaster tools.
4. **Yandex Webmaster** — Optional but covers additional AI tools.

### 4.7 Add `speakable` schema for voice/AI extraction

Google supports `speakable` schema to indicate which parts of a page are suitable for text-to-speech and AI extraction:

```json
{
  "@type": "WebPage",
  "speakable": {
    "@type": "SpeakableSpecification",
    "cssSelector": [".sector-hero-summary", ".sector-overview", ".faq-answer"]
  }
}
```

This explicitly tells Google's AI systems which content blocks to extract.

---

## 5. Implementation Priority & Roadmap

### Phase 1: Quick wins (1-2 days of work)

1. **Update robots.txt** with explicit AI bot rules
2. **Add definitive statement paragraphs** to all 8 sector page heroes
3. **Add source attribution** to the 5-10 most important statistics
4. **Add a prose stats sentence** to the homepage stats section
5. **Register with Bing Webmaster Tools** and submit sitemap
6. **Check Brave Search indexing**

**Expected impact:** Moves citability from 3.5/10 to 5/10. The definitive statement paragraphs alone give AI systems something to extract.

### Phase 2: Content restructuring (1 week)

1. **Rewrite all 24 sector FAQ answers** to be self-contained and name Tadnun
2. **Add "sector overview" prose sections** to all 8 sector pages
3. **Enrich Service schema** on all sector pages with sub-services and testimonials
4. **Add Article schema** with dates to sector pages
5. **Implement Review schema** for testimonials

**Expected impact:** Moves citability to 6.5/10. FAQ schema combined with self-contained answers is the single highest-impact change for Perplexity and Google AI Overviews.

### Phase 3: New content creation (2-4 weeks)

1. **Create the Moroccan business glossary page** with DefinedTerm schema
2. **Write the first 2 sector guides** (Agriculture, Tourism)
3. **Create a team/expertise page** with author credentials
4. **Implement IndexNow** for Bing/Copilot

**Expected impact:** Moves citability to 7.5/10. The glossary page will be disproportionately cited because no equivalent exists in the Moroccan market.

### Phase 4: Authority building (ongoing)

1. **Write remaining 6 sector guides**
2. **Create comparison content** (custom vs. SaaS, direct booking vs. OTA)
3. **Publish the "State of Digitalization in Morocco" report** (page + PDF)
4. **Build backlink profile** through Moroccan business publications, Maroc PME, and sector associations
5. **Maintain freshness** — update guides and sector pages monthly

**Expected impact:** Moves citability to 8.5/10+. The combination of comprehensive guides, a glossary, comparison content, and the annual report makes Tadnun the definitive source on Moroccan SME digitalization.

---

## 6. Measurement

### How to track AI citability

1. **Manual monitoring** — Monthly, ask ChatGPT, Perplexity, Google AI Overviews, and Claude the following queries and record whether Tadnun is cited:
   - "How can I digitalize my restaurant in Morocco?"
   - "What is the best software for Moroccan agriculture cooperatives?"
   - "How to reduce Booking.com commissions for my riad in Morocco?"
   - "What is CMI in Morocco?"
   - "Digital transformation for SMEs in Morocco"
   - "Comment digitaliser mon entreprise au Maroc?"
   - "Logiciel gestion cooperative agricole Maroc"

2. **Track referral traffic** from AI platforms in GA4:
   - `chat.openai.com` (ChatGPT)
   - `perplexity.ai` (Perplexity)
   - Direct traffic spikes correlated with AI Overview appearances

3. **Google Search Console** — Monitor impressions for queries that trigger AI Overviews. GSC now shows when your content appears in AI Overview citations.

4. **Bing Webmaster Tools** — Monitor Copilot-related traffic signals.

---

## 7. Key Principle: Write for the AI's Answer, Not Just the User's Question

The fundamental shift from traditional SEO to AI SEO is this: traditional SEO optimizes for ranking in a list of blue links. AI SEO optimizes for being the source an AI cites when it generates an answer.

This means every content block on Tadnun should pass the "citation test": if an AI were answering a question about Moroccan business digitalization, could it quote this paragraph verbatim and have it make sense to the reader? If the content requires the surrounding page context to be understood, it fails the test.

The existing Tadnun content is strong — the pain points, statistics, testimonials, and integrations data are genuinely valuable. The gap is purely structural: the content needs to be reformatted from visual marketing components into self-contained, entity-rich, source-attributed prose paragraphs that AI systems can extract and cite.
