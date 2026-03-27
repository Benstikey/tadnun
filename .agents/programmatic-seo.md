# Programmatic SEO Strategy — Tadnun

*Created: 2026-03-27*

---

## Executive Summary

Tadnun currently has **39 indexed URLs** (13 unique pages x 3 locales). This strategy adds **336 Sector x City pages** as the primary pSEO template, scaling from 39 to **375 URLs** — a 10x increase in indexable surface area targeting high-intent, low-competition local keywords in French, English, and Arabic.

**Why this works for Tadnun specifically:**
- Moroccan SME owners search locally: "digitalisation restaurant Marrakech," not "digitalisation restaurant"
- Competition for `{service} + {city}` keywords in Morocco is near-zero in French
- The existing sector data (pain points, solutions, integrations, ROI, testimonials) provides a strong content foundation to extend with city-specific data
- Next.js SSG with `generateStaticParams()` makes this technically trivial

**Expected impact:** 2-5x organic traffic within 6 months of Phase 1 deployment, targeting long-tail keywords with high purchase intent and near-zero competition.

---

## 1. Page Template Evaluation

### Template A: Sector x City (RECOMMENDED)

**URL pattern:** `/{locale}/sectors/{sector}/{city}`
**Example:** `/fr/sectors/restaurants/marrakech`
**Scale:** 8 sectors x 14 cities = 112 pages x 3 locales = **336 URLs**

| Criterion | Score | Notes |
|-----------|-------|-------|
| Keyword volume | High | Every sector + city combo has search demand (tested below) |
| Competition | Very low | No Moroccan competitor does this systematically |
| Content uniqueness | Achievable | Cities have genuinely different economic profiles and business landscapes |
| Implementation effort | Low | Extends existing `[sector]` dynamic route with `[city]` subroute |
| Conversion intent | High | User searching "digitalisation restaurant Marrakech" is ready to act locally |
| Internal linking | Natural | Parent sector page links down to city pages; city pages link across sectors |

**Verdict: Best effort-to-value ratio. Implement first.**

### Template B: Service x City

**URL pattern:** `/{locale}/services/{service}/{city}`
**Example:** `/fr/services/crm-immobilier/casablanca`
**Scale:** ~5 services per sector x 14 cities = ~560 pages x 3 locales = **1,680 URLs**

| Criterion | Score | Notes |
|-----------|-------|-------|
| Keyword volume | Medium | More specific, smaller per-page volume |
| Competition | Very low | Same advantage as Template A |
| Content uniqueness | Difficult | Hard to differentiate "CRM immobilier Casablanca" from "CRM immobilier Rabat" — thin content risk |
| Implementation effort | High | Requires new data model for services, new page template, service taxonomy |
| Conversion intent | High | Very specific intent, but audience is smaller |
| Internal linking | Moderate | Harder to link naturally from existing sector pages |

**Verdict: Defer to Phase 3. The granularity creates thin content risk, and the content model is harder to differentiate per city. Better to add service pages as a flat structure (`/services/{service}`) first, then consider city variants only for high-volume services.**

### Template C: Sector x Integration (Not recommended)

**URL pattern:** `/{locale}/sectors/{sector}/integrations/{integration}`
**Example:** `/fr/sectors/agriculture/integrations/onssa`
**Scale:** ~6 integrations per sector x 8 sectors = ~48 pages x 3 locales = 144 URLs

**Verdict: Skip. Integration pages work better as sections within existing sector pages. Standalone pages would be thin and have no search volume for queries like "integration ONSSA logiciel." These are B2B technical details, not user search queries.**

---

## 2. Content Model — Sector x City Pages

### 2.1 Page Structure

Each Sector x City page follows this template:

```
H1: {Sector} digital a {City} — Solutions sur mesure
    (e.g., "Digitalisation des restaurants a Marrakech")

1. Hero + Definitive Statement Paragraph (unique per city+sector)
2. City Context Block (unique per city)
   - Business density in this sector
   - City economic profile relevant to sector
   - Local challenges specific to this city
3. Pain Points (inherited from parent sector, with city-specific examples)
4. Solutions Overview (inherited from parent sector)
5. Local Integrations (inherited + city-specific additions)
6. City-Specific Testimonial or Case Reference (unique per city)
7. ROI Metrics (inherited from parent, contextualized to city scale)
8. FAQ (2-3 inherited from parent + 1-2 city-specific)
9. CTA: "Contactez-nous a {City}" with WhatsApp link
10. Related: Other sectors in this city + Same sector in nearby cities
```

### 2.2 Content Uniqueness Strategy

The thin content trap is the primary risk. Here is how each section achieves genuine uniqueness:

| Section | Source | Uniqueness mechanism |
|---------|--------|---------------------|
| H1 + meta title/description | Generated | City name + sector-specific keyword variation |
| Hero paragraph | Written per city-sector pair | 60-80 words referencing city-specific economic context, named local businesses/areas, and city-specific pain |
| City context block | City data file | Population, number of businesses in sector, economic specialty, named neighborhoods/zones (e.g., Gueliz for Marrakech retail, Ain Diab for Casablanca restaurants) |
| Pain points | 70% inherited, 30% city-localized | Inherited pain point titles; body text adds city-specific example or statistic where available |
| Solutions | 100% inherited | Same solution cards as parent sector page |
| Integrations | 90% inherited + city additions | Add city-specific partners where relevant (e.g., Marjane for Casablanca retail, Souk el Had for Agadir agriculture) |
| Testimonial / case | Unique per city OR "nearest city" fallback | Real testimonial if available; otherwise a scenario-based example specific to the city |
| FAQ | 2 inherited + 1-2 city-specific | City-specific FAQs address local concerns (e.g., "Does this work in the medina?" for Fes/Marrakech, "Can it handle seasonal tourism?" for Agadir/Essaouira) |
| CTA | City-customized | WhatsApp pre-filled with city name; local phone prefix where applicable |
| Internal links | Algorithmically generated | Cross-links to same sector in neighboring cities + other sectors in same city |

### 2.3 Minimum Unique Content Per Page

**Hard rule: At least 40% of visible text content must be unique to this specific city-sector combination.** This means:

- Hero paragraph: ~80 words (unique)
- City context block: ~150 words (unique)
- Pain point city examples: ~100 words across 3 pain points (unique additions)
- City-specific testimonial or scenario: ~60 words (unique)
- City-specific FAQ(s): ~100 words (unique)
- CTA with city name: ~20 words (unique)

**Total unique content per page: ~510 words minimum**
**Total inherited content per page: ~600-800 words**
**Total page content: ~1,100-1,300 words**

This ratio keeps pages substantive while making inherited content reuse economically viable.

### 2.4 Content Differentiation by City Tier

Not all cities get the same depth. Tier the effort:

| Tier | Cities | Content depth | Unique words |
|------|--------|--------------|-------------|
| Tier 1 (Major) | Casablanca, Rabat, Marrakech | Full unique hero, 2+ city-specific FAQs, named neighborhoods, local business references, full city context | 600+ unique words |
| Tier 2 (Strong) | Tanger, Fes, Agadir | Full unique hero, 1-2 city-specific FAQs, city context, economic specialty reference | 500+ unique words |
| Tier 3 (Secondary) | Meknes, Oujda, Kenitra, Tetouan | Unique hero, 1 city-specific FAQ, city context | 400+ unique words |
| Tier 4 (Emerging) | Safi, El Jadida, Nador, Beni Mellal | Unique hero, city context, shared regional FAQ | 350+ unique words |

---

## 3. City-Specific Data Model

### 3.1 City Data Structure

Create `src/data/cities.ts`:

```typescript
export interface CityData {
  slug: string;                    // URL slug: "casablanca", "el-jadida"
  name: {
    fr: string;                    // "Casablanca"
    en: string;                    // "Casablanca"
    ar: string;                    // "الدار البيضاء"
  };
  region: string;                  // "Casablanca-Settat"
  population: number;              // 3,710,000 (metro)
  tier: 1 | 2 | 3 | 4;
  economicProfile: {
    fr: string;                    // 2-3 sentence description
    en: string;
    ar: string;
  };
  sectorRelevance: Record<string, {
    businessCount: string;         // "4,200+" or "~800"
    keyAreas: string[];            // Named neighborhoods/zones
    localContext: {
      fr: string;                  // 2-3 sentences of sector-specific city context
      en: string;
      ar: string;
    };
    localFaq?: {
      q: { fr: string; en: string; ar: string };
      a: { fr: string; en: string; ar: string };
    }[];
  }>;
  nearestCities: string[];         // Slugs of 2-3 geographically nearby cities
}
```

### 3.2 City Data — All 14 Cities

Below is the data to populate for each city, organized by economic relevance to Tadnun's 8 sectors:

#### Casablanca (Tier 1)
- **Population:** 3.7M metro
- **Economic profile:** Morocco's economic capital. Largest concentration of SMEs, headquarters of most banks and multinationals. 60% of Morocco's industrial output. Major port city.
- **Strongest sectors:** Retail (largest consumer market), Healthcare (most clinics/labs), Real Estate (highest transaction volume), Logistics (port + highway hub), Restaurants (3,500+ registered establishments)
- **Key areas:** Maarif (retail/restaurants), Ain Diab (upscale dining), Ain Sebaa (industrial/logistics), Hay Hassani (healthcare), Anfa (real estate), Derb Omar (wholesale/retail)
- **Unique data points:**
  - Home to CMI headquarters (payment integration advantage)
  - 40% of Morocco's CNSS-registered businesses
  - Casablanca Finance City zone (real estate + logistics)

#### Rabat (Tier 1)
- **Population:** 1.9M metro (with Sale)
- **Economic profile:** Administrative capital. High concentration of government employees, embassies, and international organizations. Growing tech hub (Rabat Technopolis).
- **Strongest sectors:** Healthcare (university hospital + private clinics), Education (universities + training centers), Real Estate (administrative city growth), Restaurants (diplomatic/expat dining)
- **Key areas:** Agdal (restaurants/retail), Hassan (institutional), Hay Riad (modern commercial), Sale (emerging commercial), Technopolis (education/tech)
- **Unique data points:**
  - Rabat-Sale-Kenitra region is 2nd largest economy
  - High proportion of insured patients (government employees) — AMO billing relevance
  - UNESCO World Heritage medina (tourism potential)

#### Marrakech (Tier 1)
- **Population:** 1.3M metro
- **Economic profile:** Morocco's tourism capital. 2.5M+ tourist arrivals annually. Massive hospitality sector. Growing as a digital nomad and remote work hub. 2030 World Cup host city.
- **Strongest sectors:** Tourism (1,800+ riads/hotels), Restaurants (tourism-driven dining), Real Estate (MRE + foreign investment), Retail (artisanal/souk commerce)
- **Key areas:** Medina (riads/traditional restaurants), Gueliz (modern retail/restaurants), Hivernage (upscale hotels), Palmeraie (luxury real estate), Sidi Ghanem (industrial/creative zone)
- **Unique data points:**
  - Highest Booking.com commission payments in Morocco
  - 12,000+ Google Maps-listed restaurants and cafes
  - MRE real estate purchases concentrated here and Tanger
  - 2030 World Cup = urgent digitalization timeline

#### Tanger (Tier 2)
- **Population:** 1.2M metro
- **Economic profile:** Northern gateway. Tanger Med port (largest in Africa). Free trade zone. Strong industrial base. Growing tourism via cruise ships and MRE summer visitors.
- **Strongest sectors:** Logistics (Tanger Med port + free zone), Tourism (cruise + MRE summer), Real Estate (MRE investment hotspot), Restaurants (seasonal tourism + growing local scene)
- **Key areas:** Tanger Med industrial zone, Tanger Ville (tourism/restaurants), Tanger City Center (retail), Malabata (real estate), Boukhalef (logistics/industrial)
- **Unique data points:**
  - Tanger Med handles 7M+ containers/year — logistics digitalization demand
  - 300,000+ MRE visitors every summer — seasonal tourism pressure
  - Free zone companies need international-standard digital tools
  - 2030 World Cup host city

#### Fes (Tier 2)
- **Population:** 1.2M metro
- **Economic profile:** Cultural and spiritual capital. UNESCO medina. Traditional craftsmanship hub. University city (oldest university in the world). Growing medical tourism.
- **Strongest sectors:** Tourism (heritage tourism, medina riads), Education (Al Quaraouiyine university legacy, training centers), Healthcare (medical tourism potential), Retail (artisanal commerce)
- **Key areas:** Fes el-Bali medina (traditional tourism/crafts), Ville Nouvelle (modern retail/healthcare), Route Sefrou (logistics), Ain Chkef (new development/real estate)
- **Unique data points:**
  - UNESCO medina creates unique logistics challenges (no vehicle access — delivery digitalization)
  - Traditional crafts sector could benefit from digital marketplace/export tools
  - Riad owners face same OTA commission problem as Marrakech but with less tech adoption

#### Agadir (Tier 2)
- **Population:** 600K metro (with Inezgane)
- **Economic profile:** Agriculture capital of Morocco (Souss-Massa plain). Major fishing port. Beach tourism destination. Post-earthquake modern city with good infrastructure.
- **Strongest sectors:** Agriculture (citrus, vegetables, argan — export-oriented), Tourism (beach tourism, European charter flights), Restaurants (tourism + fishing-fresh seafood), Logistics (agricultural export chain)
- **Key areas:** Souss-Massa plain (agriculture), Port (fishing/logistics), Founty/marina (tourism/restaurants), Ait Melloul (wholesale/agriculture trading), Inezgane (commercial hub)
- **Unique data points:**
  - Souss-Massa produces 60% of Morocco's citrus exports
  - ONSSA compliance is most critical here (export volume)
  - Water stress is acute — irrigation digitalization has highest ROI here
  - 2nd most visited beach destination after Marrakech

#### Meknes (Tier 3)
- **Population:** 630K
- **Economic profile:** Agricultural hinterland city. Olive oil and wine production. Military garrison city. Growing as an affordable alternative to Fes for tourism.
- **Strongest sectors:** Agriculture (olives, grains, wine), Retail (regional commercial hub), Education (Moulay Ismail University), Healthcare (regional hospital center)
- **Key areas:** Ville Nouvelle (commercial center), Hamria (traditional market), Industrial zone (agriculture processing), Ain Karma (new development)
- **Unique data points:**
  - Olive oil cooperatives are prime Tadnun clients
  - Meknes-Tafilalet agricultural region is Morocco's breadbasket
  - Growing wine tourism (Chateau Roslane, Domaine de la Zouina)

#### Oujda (Tier 3)
- **Population:** 500K
- **Economic profile:** Eastern gateway to Algeria. Border trade hub. MRE community (France, Belgium). Agricultural plain. Renewable energy zone (Midelt-Oujda solar corridor).
- **Strongest sectors:** Real Estate (MRE investment from Europe), Retail (border commerce), Healthcare (regional medical center), Logistics (border trade)
- **Key areas:** Centre-ville (commercial), Angad (border zone logistics), Oujda Technopole (emerging), Jerada (mining adjacent)
- **Unique data points:**
  - MRE population creates demand for virtual property tours
  - Border economy = cash-heavy → digitalization of payments is a pain point
  - University town with 50,000+ students (education sector opportunity)

#### Kenitra (Tier 3)
- **Population:** 430K
- **Economic profile:** Industrial city. Renault-Nissan factory (automotive hub). Atlantic Coast position. Growing as a Rabat satellite city.
- **Strongest sectors:** Logistics (automotive supply chain), Retail (growing consumer market), Agriculture (Gharb plain — rice, sugar), Healthcare (underserved for its size)
- **Key areas:** Atlantic Free Zone (industrial/logistics), Mehdia (tourism potential), Centre-ville (retail), Gharb agricultural zone
- **Unique data points:**
  - Automotive supply chain demands digital logistics tracking
  - One of Morocco's fastest-growing cities
  - Gharb plain agriculture is water-intensive — irrigation digitalization need

#### Tetouan (Tier 3)
- **Population:** 380K
- **Economic profile:** Northern city near Ceuta (Spanish enclave). Tourism (Mediterranean beaches). Artisanal heritage (UNESCO medina). Cross-border commerce.
- **Strongest sectors:** Tourism (Mediterranean coast, Cabo Negro, M'diq), Restaurants (coastal seafood), Retail (border commerce), Real Estate (MRE from Spain)
- **Key areas:** Medina (UNESCO heritage), Cabo Negro-M'diq (beach tourism), Martil (growing resort), Centre-ville (commercial)
- **Unique data points:**
  - Spanish-speaking market (proximity to Ceuta and Spain)
  - Summer tourism surge from MRE in Spain
  - Cross-border commerce with Ceuta creates logistics opportunities

#### Safi (Tier 4)
- **Population:** 310K
- **Economic profile:** Fishing port (sardines). Phosphate industry (OCP). Ceramics tradition. 2030 World Cup host city — massive investment incoming.
- **Strongest sectors:** Logistics (fishing port + phosphate export), Agriculture (surrounding plains), Restaurants (fishing-fresh seafood), Tourism (emerging — World Cup boost)
- **Key areas:** Port zone (fishing/logistics), Industrial zone (OCP), Medina (ceramics/tourism), New development zones (World Cup infrastructure)
- **Unique data points:**
  - 2030 World Cup host city — everything needs to be digitalized before 2030
  - Fishing cooperatives mirror agriculture cooperative needs
  - Ceramics artisans could use digital export and marketplace tools

#### El Jadida (Tier 4)
- **Population:** 220K
- **Economic profile:** Portuguese heritage city (UNESCO). Beach tourism. Agricultural hinterland (Doukkala plain). Growing as a Casablanca weekend escape.
- **Strongest sectors:** Tourism (heritage + beach), Agriculture (Doukkala plain), Restaurants (seafood + tourism), Real Estate (Casablanca overflow investment)
- **Key areas:** Cite Portugaise (heritage tourism), Mazagan resort zone, Sidi Bouzid (beach tourism), Doukkala agricultural plain
- **Unique data points:**
  - Weekend escape from Casablanca → seasonal restaurant demand
  - Mazagan resort created a luxury hospitality cluster
  - Agricultural Doukkala plain has similar needs to Souss-Massa but less developed

#### Nador (Tier 4)
- **Population:** 180K
- **Economic profile:** Rif region. Nador West Med port (under construction — will be Morocco's 2nd mega-port). Large MRE community (Netherlands, Belgium, Germany). Marchica lagoon development.
- **Strongest sectors:** Logistics (Nador West Med port — future), Real Estate (MRE investment + Marchica development), Retail (commercial hub for Rif region), Tourism (emerging — Marchica lagoon)
- **Key areas:** Centre-ville (commercial), Marchica (new development), Selouane (logistics), Beni Ensar (border with Melilla)
- **Unique data points:**
  - Nador West Med port will create massive logistics digitalization demand
  - MRE community (Netherlands/Germany) expects digital-first service
  - Marchica development is a major real estate opportunity

#### Beni Mellal (Tier 4)
- **Population:** 210K
- **Economic profile:** Agricultural hub (Tadla-Azilal plain). Olive and sugar production. University city. Gateway to Central Atlas mountains.
- **Strongest sectors:** Agriculture (Tadla plain — irrigated agriculture), Healthcare (regional hospital), Education (Sultan Moulay Slimane University), Retail (regional commercial center)
- **Key areas:** Centre-ville (commercial), Fkih Ben Salah (agricultural trading), Azilal (mountain tourism potential), Day/Oulad Ayad (agriculture)
- **Unique data points:**
  - Tadla agricultural plain uses extensive irrigation — digitalization of water management is critical
  - University creates education sector opportunity
  - Relatively underserved by tech companies — first-mover advantage

---

## 4. Target Keywords

### 4.1 Keyword Matrix — Sector x City (French, primary)

Keywords are organized by template. French is the primary target language (80%+ of Moroccan search volume for business queries). English captures expat and international searches. Arabic captures a smaller but growing segment.

#### Agriculture

| Keyword (FR) | City | Est. Monthly Volume | Competition | Intent |
|--------------|------|-------------------|-------------|--------|
| digitalisation agriculture Agadir | Agadir | 50-100 | Very low | High intent |
| tracabilite ONSSA Agadir | Agadir | 20-50 | None | High intent |
| logiciel cooperative agricole Maroc | National | 100-200 | Low | High intent |
| gestion cooperative Meknes | Meknes | 10-30 | None | High intent |
| suivi parcelles agricoles Souss Massa | Agadir | 10-30 | None | High intent |
| tracabilite export fruits Casablanca | Casablanca | 10-20 | None | High intent |
| gestion cooperative argan Essaouira | Regional | 10-20 | None | High intent |

#### Restaurants

| Keyword (FR) | City | Est. Monthly Volume | Competition | Intent |
|--------------|------|-------------------|-------------|--------|
| digitalisation restaurant Marrakech | Marrakech | 50-100 | Very low | High intent |
| fiche Google restaurant Casablanca | Casablanca | 30-70 | Low | High intent |
| logiciel gestion restaurant Maroc | National | 100-200 | Low | High intent |
| menu QR restaurant Marrakech | Marrakech | 20-50 | Very low | High intent |
| integration Glovo restaurant Casablanca | Casablanca | 10-30 | None | High intent |
| caisse enregistreuse restaurant Tanger | Tanger | 10-30 | Very low | High intent |
| gestion commande livraison Rabat | Rabat | 10-20 | None | High intent |

#### Tourism

| Keyword (FR) | City | Est. Monthly Volume | Competition | Intent |
|--------------|------|-------------------|-------------|--------|
| site reservation directe riad Marrakech | Marrakech | 30-70 | Low | High intent |
| channel manager hotel Maroc | National | 50-100 | Low | High intent |
| alternative Booking.com riad Fes | Fes | 20-50 | Very low | High intent |
| digitalisation riad Marrakech | Marrakech | 20-50 | Very low | High intent |
| check-in digital hotel Tanger | Tanger | 10-20 | None | High intent |
| reservation directe hotel Agadir | Agadir | 20-40 | Very low | High intent |
| preparation Coupe du Monde 2030 hotel | National | 50-100 | Low | Medium intent |

#### Healthcare

| Keyword (FR) | City | Est. Monthly Volume | Competition | Intent |
|--------------|------|-------------------|-------------|--------|
| logiciel cabinet medical Casablanca | Casablanca | 50-100 | Low | High intent |
| gestion rendez-vous clinique Rabat | Rabat | 30-50 | Low | High intent |
| facturation AMO automatique | National | 30-70 | Low | High intent |
| dossier medical electronique Maroc | National | 50-100 | Low | High intent |
| rappel SMS patient Casablanca | Casablanca | 10-30 | None | High intent |
| logiciel dentiste Marrakech | Marrakech | 10-30 | Very low | High intent |

#### Real Estate

| Keyword (FR) | City | Est. Monthly Volume | Competition | Intent |
|--------------|------|-------------------|-------------|--------|
| CRM immobilier Casablanca | Casablanca | 30-70 | Low | High intent |
| logiciel immobilier Maroc | National | 100-200 | Low | High intent |
| visite virtuelle immobilier Marrakech | Marrakech | 20-50 | Very low | High intent |
| gestion leads immobilier Tanger | Tanger | 10-30 | None | High intent |
| diffusion annonces Avito Mubawab auto | National | 20-50 | Very low | High intent |
| logiciel agence immobiliere Rabat | Rabat | 20-40 | Low | High intent |

#### Retail

| Keyword (FR) | City | Est. Monthly Volume | Competition | Intent |
|--------------|------|-------------------|-------------|--------|
| caisse connectee commerce Casablanca | Casablanca | 20-50 | Very low | High intent |
| gestion stock boutique Maroc | National | 50-100 | Low | High intent |
| catalogue WhatsApp commerce Marrakech | Marrakech | 10-30 | None | High intent |
| fiche Google commerce Rabat | Rabat | 10-30 | None | High intent |
| paiement CMI boutique Tanger | Tanger | 10-20 | None | High intent |

#### Education

| Keyword (FR) | City | Est. Monthly Volume | Competition | Intent |
|--------------|------|-------------------|-------------|--------|
| logiciel gestion ecole Casablanca | Casablanca | 30-70 | Low | High intent |
| plateforme e-learning Maroc | National | 100-200 | Medium | High intent |
| inscription en ligne ecole Rabat | Rabat | 20-50 | Very low | High intent |
| gestion absences ecole Marrakech | Marrakech | 10-20 | None | High intent |
| portail parents ecole privee | National | 20-50 | Low | High intent |

#### Logistics

| Keyword (FR) | City | Est. Monthly Volume | Competition | Intent |
|--------------|------|-------------------|-------------|--------|
| logiciel livraison Casablanca | Casablanca | 30-70 | Low | High intent |
| suivi colis Maroc logiciel | National | 50-100 | Medium | Mixed intent |
| optimisation itineraire livraison Tanger | Tanger | 10-20 | None | High intent |
| bon de livraison digital Casablanca | Casablanca | 10-30 | None | High intent |
| gestion flotte transport Maroc | National | 20-50 | Low | High intent |

### 4.2 Keyword Mapping to Page Templates

Each Sector x City page targets a primary keyword cluster:

```
Primary:     "{solution/sector} {city}"
             e.g., "digitalisation restaurant Marrakech"

Secondary:   "{specific tool} {sector} {city}"
             e.g., "menu QR restaurant Marrakech"

Long-tail:   "{pain point} {sector} {city}"
             e.g., "gaspillage alimentaire restaurant Marrakech solution"

Brand:       "Tadnun {sector} {city}"
             e.g., "Tadnun restaurants Marrakech"
```

### 4.3 Meta Title & Description Templates

**French (primary):**
```
Title:       {Sector} digital a {City} | Solutions Tadnun
             e.g., "Restaurants digitaux a Marrakech | Solutions Tadnun"
             Max 60 chars

Description: {Pain point hook}. Tadnun accompagne les {sector} de {City}:
             {2-3 solutions}. Devis gratuit en 48h.
             e.g., "Invisible sur Google Maps ? Tadnun accompagne les restaurants
             de Marrakech : fiche Google, integration Glovo, menu QR et caisse
             connectee. Devis gratuit en 48h."
             Max 155 chars
```

**English:**
```
Title:       {Sector} Digital Solutions in {City} | Tadnun
Description: {Pain point hook}. Tadnun helps {sector} in {City} go digital:
             {2-3 solutions}. Free quote in 48h.
```

**Arabic:**
```
Title:       حلول رقمية لـ{sector} في {city} | تدنون
Description: {Pain point hook}. تدنون تساعد {sector} في {city}:
             {2-3 solutions}. عرض سعر مجاني خلال 48 ساعة.
```

---

## 5. Implementation Plan

### Phase 1: Top 6 Cities x Top 4 Sectors = 24 pages (x 3 locales = 72 URLs)

**Timeline:** 2-3 weeks
**Priority sectors:** Restaurants, Tourism, Agriculture, Healthcare (highest search volume + best content depth)
**Priority cities:** Casablanca, Rabat, Marrakech, Tanger, Fes, Agadir (Tier 1 + Tier 2)

#### Step 1: Data Layer (Week 1)

1. **Create `src/data/cities.ts`** — City data for all 14 cities following the interface defined above. Start with Tier 1-2 cities with full data; stub Tier 3-4 with minimal data.

2. **Create `src/data/city-sector-content.ts`** — Per city-sector unique content:
   ```typescript
   export interface CitySectorContent {
     heroStatement: { fr: string; en: string; ar: string };
     localContext: { fr: string; en: string; ar: string };
     painPointLocalizations: {
       index: number;  // which parent pain point to localize
       cityExample: { fr: string; en: string; ar: string };
     }[];
     localTestimonial?: {
       quote: { fr: string; en: string; ar: string };
       name: string;
       role: { fr: string; en: string; ar: string };
     };
     localFaqs: {
       q: { fr: string; en: string; ar: string };
       a: { fr: string; en: string; ar: string };
     }[];
   }

   // Keyed as `${sector}-${city}`
   export const citySectorContent: Record<string, CitySectorContent> = { ... };
   ```

3. **Extend `src/lib/sector-context.ts`** — Add `validCities` constant and `CitySlug` type.

#### Step 2: Page Template (Week 1-2)

4. **Create `src/app/[locale]/sectors/[sector]/[city]/page.tsx`** — The city landing page. This page:
   - Uses `generateStaticParams()` to generate all sector-city combinations
   - Fetches data from `cities.ts`, `city-sector-content.ts`, and `sector-details.ts`
   - Renders the template defined in section 2.1
   - Includes `generateMetadata()` with proper title, description, and hreflang alternates
   - Includes structured data (LocalBusiness, Service, FAQPage, BreadcrumbList)

5. **Add `generateStaticParams()`:**
   ```typescript
   export function generateStaticParams() {
     const params = [];
     for (const sector of validSectors) {
       for (const city of validCities) {
         params.push({ sector, city });
       }
     }
     return params;
   }
   ```

6. **Create supporting components** (keep each under 200 lines):
   - `src/components/city-context-block.tsx` — City economic profile + sector business density
   - `src/components/city-sector-hero.tsx` — Hero with definitive statement
   - `src/components/nearby-cities.tsx` — "Same sector in nearby cities" links
   - `src/components/city-sectors.tsx` — "Other sectors in this city" links

#### Step 3: Sitemap & Internal Linking (Week 2)

7. **Extend `src/app/sitemap.ts`:**
   ```typescript
   // City landing pages
   for (const sector of SECTORS) {
     for (const city of CITIES) {
       for (const locale of LOCALES) {
         entries.push({
           url: `${BASE_URL}/${locale}/sectors/${sector}/${city}`,
           lastModified: new Date(),
           changeFrequency: "monthly",
           priority: 0.6,
           alternates: {
             languages: Object.fromEntries(
               LOCALES.map((l) => [l, `${BASE_URL}/${l}/sectors/${sector}/${city}`])
             ),
           },
         });
       }
     }
   }
   ```

8. **Add internal links from parent sector pages:**
   - On each `/{locale}/sectors/{sector}` page, add a "Find us in your city" section with links to all city sub-pages
   - Use city tier to order: Tier 1 cities first, with a "See all cities" expander

9. **Add internal links from city pages:**
   - "Other sectors in {City}" section at the bottom links to sibling sector-city pages
   - "Nearby cities" section links to the same sector in neighboring cities
   - Breadcrumb: Home > Sectors > {Sector} > {City}

#### Step 4: Structured Data (Week 2)

10. **Add JSON-LD per city page:**
    - `LocalBusiness` schema with city-specific address area
    - `Service` schema with sector-specific service description
    - `FAQPage` schema with the page's FAQ entries
    - `BreadcrumbList` schema matching the breadcrumb trail
    - `Organization` schema referencing parent Tadnun entity

### Phase 2: Expand to 14 Cities x 8 Sectors = 112 pages (x 3 locales = 336 URLs)

**Timeline:** 4-6 weeks after Phase 1 launch
**Prerequisite:** Phase 1 pages are indexed and showing initial ranking signals

1. **Expand city data** — Complete Tier 3 and Tier 4 city data in `cities.ts`
2. **Write city-sector content** — Follow the same template for remaining 88 city-sector pairs
3. **Add remaining 4 sectors:** Retail, Education, Real Estate, Logistics
4. **Content quality review** — Ensure every page meets the minimum 40% unique content threshold
5. **Monitor for thin content signals** — Check Google Search Console for "Crawled — currently not indexed" pages and improve content for any flagged pages

### Phase 3: Service Pages (Future)

**Timeline:** After Phase 2 is indexed and performing
**Scope:** Flat service pages at `/{locale}/services/{service}` (not city-specific initially)
**Examples:**
- `/fr/services/fiche-google-maps` (cross-sector)
- `/fr/services/channel-manager-hotel`
- `/fr/services/crm-immobilier`
- `/fr/services/facturation-amo`
- `/fr/services/tracabilite-onssa`

These service pages aggregate content from multiple sectors, targeting service-specific keywords. City variants would only be added for services with proven search volume.

---

## 6. Risk Mitigation

### 6.1 Thin Content Prevention

| Risk | Mitigation |
|------|-----------|
| City pages that are just the parent page with a city name swapped in | Enforce 40% unique content minimum (510+ unique words). Code-level validation: if `citySectorContent[key]` is missing or has fewer than 3 fields populated, the page should 404 instead of rendering a thin page. |
| Google deindexing pages as "duplicate" | Each page's `<title>`, `<meta description>`, `<h1>`, hero paragraph, and city context block must all be genuinely unique. Never template these with just a city name swap. |
| All city pages for one sector looking the same | Vary the lead pain point per city based on `sectorRelevance` data. Casablanca restaurants lead with Glovo integration; Marrakech restaurants lead with Google Maps visibility for tourists; Fes restaurants lead with medina-specific challenges. |
| Orphan pages with no internal links | Every city page must have: (a) link from parent sector page, (b) links from 2+ sibling city pages, (c) breadcrumb back to sector and home. Validate in sitemap. |

### 6.2 Canonical Strategy

```
Canonical URL = self-referencing
  /{locale}/sectors/{sector}/{city} → canonical: /{locale}/sectors/{sector}/{city}

Hreflang alternates (one per locale):
  <link rel="alternate" hreflang="fr" href="/fr/sectors/{sector}/{city}" />
  <link rel="alternate" hreflang="en" href="/en/sectors/{sector}/{city}" />
  <link rel="alternate" hreflang="ar" href="/ar/sectors/{sector}/{city}" />
  <link rel="alternate" hreflang="x-default" href="/fr/sectors/{sector}/{city}" />
```

**Do NOT canonical city pages to their parent sector page.** Each city page targets a different keyword and has unique content. Self-referencing canonicals only.

### 6.3 Quality Thresholds — Hard Rules

Before any city page goes live, it must pass these checks:

| Check | Threshold | Action if failed |
|-------|-----------|-----------------|
| Unique word count | >= 350 words unique to this city-sector pair | Page renders 404 until content is added |
| Hero paragraph | >= 60 words, mentions city name and a city-specific detail | Block deployment |
| City context block | >= 100 words with population + sector business count | Block deployment |
| At least 1 city-specific FAQ | Present | Fall back to regional FAQ if unavailable |
| Meta title contains city name | Always | Automated via template |
| Meta description is unique | Not identical to any other page | Automated via template |
| Internal links | >= 3 inbound internal links (parent + 2 siblings) | Add before launch |
| Structured data validates | Test with Google Rich Results Test | Fix before launch |

### 6.4 Monitoring Plan

| Metric | Tool | Frequency | Action threshold |
|--------|------|-----------|-----------------|
| Indexed pages | Google Search Console | Weekly | If <60% of submitted URLs are indexed after 30 days, investigate thin content |
| Average position per city page | GSC | Bi-weekly | If a page has 0 impressions after 60 days, upgrade content or noindex |
| Clicks per page | GSC | Monthly | Pages with <5 clicks/month after 90 days need content refresh |
| Crawl budget | GSC crawl stats | Monthly | If crawl rate drops, check for soft-404s or excessive similar pages |
| Duplicate content flags | GSC "Pages" report | Weekly | Any "Duplicate without user-selected canonical" = immediate fix |
| Core Web Vitals | GSC CWV report | Monthly | pSEO pages should not degrade site-wide CWV scores |

### 6.5 Escape Hatch

If after 90 days, more than 30% of Phase 1 city pages are "Crawled — currently not indexed":

1. **Do not add Phase 2 pages.** Fix Phase 1 first.
2. **Audit**: Compare indexed vs. non-indexed pages. Identify the content gap.
3. **Options**: (a) Add 200+ unique words to failing pages, (b) merge low-performing city pages into regional pages (e.g., "Northern Morocco" instead of individual Tetouan, Tanger, Nador pages), (c) noindex the weakest pages and focus link equity on strong ones.

---

## 7. Internal Linking Architecture

### 7.1 Link Flow

```
Homepage
  └── Sectors listing page
        └── Sector detail page (e.g., /sectors/restaurants)
              ├── City page: /sectors/restaurants/casablanca
              ├── City page: /sectors/restaurants/marrakech
              ├── City page: /sectors/restaurants/fes
              └── ...
                    ├── Cross-sector: /sectors/tourism/marrakech (same city, different sector)
                    ├── Nearby city: /sectors/restaurants/fes (same sector, nearby city)
                    └── Parent: /sectors/restaurants (breadcrumb up)
```

### 7.2 Contextual Link Rules

1. **Parent sector page** must link to top 6 city pages with anchor text: "Digitalisation {sector} a {City}"
2. **City pages** must link to parent sector with anchor text: "{Sector} au Maroc — tous les details"
3. **City pages** link to 2-3 nearby cities: "Vous etes a {nearby city}? Decouvrez nos solutions {sector}"
4. **City pages** link to 2-3 related sectors in the same city: "Autres secteurs a {City}"
5. **Blog posts** (when created per content-strategy.md) should link to relevant city pages: "En savoir plus sur la digitalisation {sector} a {City}"

### 7.3 Footer / Sitewide Links

Do NOT add city pages to the main navigation or footer. They are discovery pages reached via:
- Organic search (primary)
- Parent sector page links (secondary)
- Blog post contextual links (tertiary)
- Sitemap (crawl discovery)

---

## 8. Content Production Workflow

### 8.1 Writing Process Per City-Sector Page

1. **Research** (15 min): Look up city economic data, local business landscape for this sector, any local news or developments
2. **Write hero paragraph** (10 min): 60-80 words, entity-rich, self-contained, mentions city by name
3. **Write city context block** (15 min): Population, business count, economic specialization, named neighborhoods
4. **Write pain point localizations** (15 min): 2-3 city-specific examples or statistics added to inherited pain points
5. **Write/select testimonial** (5 min): Real if available, scenario-based if not (label as scenario, not fake testimonial)
6. **Write city-specific FAQ(s)** (10 min): 1-2 questions specific to this city's context
7. **Translate to EN and AR** (20 min per language): Not machine-translate — adapt for natural reading
8. **Review against quality thresholds** (5 min): Check all boxes from section 6.3

**Total time per page: ~1.5 hours** (French original) + **~40 min** (EN + AR translations)
**Phase 1 total: 24 pages x ~2.5 hours = ~60 hours of content work**

### 8.2 Content Scaling Strategy

For Phase 2 (88 additional pages), consider:
- AI-assisted first drafts with human review and localization
- City data templates that auto-populate population and sector relevance
- Batch production by city (write all 8 sectors for one city at once — city research is shared)
- Translation memory for repeated phrases across city pages

---

## 9. Expected Outcomes

### 9.1 Traffic Projections (Conservative)

| Phase | New URLs | Est. monthly organic sessions (6 months post-launch) |
|-------|----------|------------------------------------------------------|
| Current state | 39 | Baseline (low — no pSEO) |
| Phase 1 (72 URLs) | +72 | +200-500 sessions/month |
| Phase 2 (336 URLs total) | +264 | +500-1,500 sessions/month |

These are conservative estimates based on:
- Low competition (near-zero for most `{sector} + {city}` keywords in Morocco)
- French-language search volume is modest but high-intent
- Each page targets 3-5 long-tail keywords
- Average position expectation: top 5 for 60% of targeted keywords within 6 months

### 9.2 Conversion Impact

City-specific pages should convert at a higher rate than generic sector pages because:
- The visitor sees their city name, which builds local trust
- The page addresses city-specific pain points they recognize
- The CTA is localized ("Contactez-nous a Marrakech")
- The testimonial/case is from their city or a nearby city

**Expected conversion rate:** 2-4% (contact form or WhatsApp click) vs. 1-2% on generic sector pages.

### 9.3 Success Metrics (6 months post Phase 1)

| Metric | Target |
|--------|--------|
| Pages indexed | >= 80% of submitted URLs |
| Average position for target keywords | Top 10 for 50%+ of primary keywords |
| Organic sessions from city pages | 200+ per month |
| Leads from city pages | 5-10 per month |
| No thin content warnings in GSC | Zero |

---

## 10. Relationship to Other Strategies

This pSEO strategy is designed to work in concert with:

- **Content Strategy** (`content-strategy.md`): Blog posts link to city pages; city pages link to relevant blog posts. Blog creates topical authority that lifts city page rankings.
- **AI SEO Strategy** (`ai-seo-strategy.md`): City page hero paragraphs should follow the "definitive statement" format recommended there — entity-rich, self-contained, quotable by AI systems.
- **Site Architecture** (`site-architecture.md`): City pages are already planned as `/{locale}/sectors/{sector}/{city}` in the architecture doc. This strategy provides the detailed content model and implementation plan.
- **Competitor Alternatives** (`competitor-alternatives.md`): Comparison pages can link to city pages for local context ("Why Tadnun beats Odoo for restaurants in Marrakech").

---

## Appendix A: Priority Matrix — Phase 1 Pages

The 24 Phase 1 pages, ranked by expected search volume and conversion potential:

| Rank | Sector | City | Primary Keyword (FR) | Priority Reason |
|------|--------|------|---------------------|-----------------|
| 1 | Restaurants | Marrakech | digitalisation restaurant Marrakech | Highest tourism volume + restaurant density |
| 2 | Tourism | Marrakech | reservation directe riad Marrakech | Massive OTA commission pain, 2030 urgency |
| 3 | Restaurants | Casablanca | gestion restaurant Casablanca | Largest city, most restaurants |
| 4 | Healthcare | Casablanca | logiciel cabinet medical Casablanca | Highest clinic density, AMO adoption |
| 5 | Agriculture | Agadir | tracabilite agriculture Agadir | Export agriculture capital |
| 6 | Tourism | Fes | digitalisation riad Fes | Heritage tourism, riad concentration |
| 7 | Healthcare | Rabat | gestion clinique Rabat | Government employees = high AMO billing |
| 8 | Restaurants | Tanger | restaurant digital Tanger | Growing food scene + MRE summer tourism |
| 9 | Real Estate | Casablanca | CRM immobilier Casablanca | Highest transaction volume |
| 10 | Tourism | Agadir | hotel digital Agadir | Beach tourism + charter flights |
| 11 | Agriculture | Meknes | cooperative agricole Meknes | Olive cooperatives concentration |
| 12 | Restaurants | Rabat | digitalisation restaurant Rabat | Expat/diplomatic dining market |
| 13 | Tourism | Tanger | hotel digital Tanger | Cruise tourism + 2030 host city |
| 14 | Healthcare | Marrakech | logiciel dentiste Marrakech | Tourist medical services growing |
| 15 | Restaurants | Fes | restaurant digital Fes | Medina dining + heritage tourism |
| 16 | Agriculture | Casablanca | logiciel agri-business Casablanca | Agri-tech HQs and trading houses |
| 17 | Restaurants | Agadir | restaurant digital Agadir | Seafood tourism |
| 18 | Healthcare | Tanger | gestion clinique Tanger | Growing medical infrastructure |
| 19 | Tourism | Rabat | hotel digital Rabat | Administrative tourism |
| 20 | Agriculture | Rabat | agriculture digitale Rabat | Policy/institutional agriculture |
| 21 | Healthcare | Fes | cabinet medical digital Fes | University hospital ecosystem |
| 22 | Tourism | Casablanca | hotel digital Casablanca | Business tourism |
| 23 | Healthcare | Agadir | clinique digitale Agadir | Underserved medical market |
| 24 | Agriculture | Tanger | agriculture digitale Tanger | Northern plain agriculture |

## Appendix B: Content Example — Restaurants x Marrakech

Below is a draft content outline for the highest-priority city page to illustrate the template in action:

**URL:** `/fr/sectors/restaurants/marrakech`
**H1:** Digitalisation des restaurants a Marrakech
**Meta title:** Restaurants digitaux a Marrakech | Solutions Tadnun
**Meta description:** Invisible sur Google Maps pour les touristes ? Tadnun accompagne les restaurants de Marrakech : fiche Google, integration Glovo, menu QR trilingue et caisse connectee. Devis gratuit.

**Hero paragraph (unique):**
> Marrakech accueille plus de 2,5 millions de touristes par an, et 70% d'entre eux cherchent "restaurant a cote" sur Google avant de sortir. Pourtant, la majorite des restaurants de Gueliz, de la medina et de l'Hivernage n'apparaissent pas dans ces recherches — ou apparaissent sans photos, sans menu et sans avis. Tadnun aide les restaurateurs de Marrakech a devenir visibles en ligne, a gerer les commandes Glovo et WhatsApp sur un seul ecran, et a reduire le gaspillage alimentaire grace au suivi digital des couts matiere.

**City context block (unique):**
> Marrakech compte plus de 12,000 restaurants et cafes recenses, des tables gastronomiques de Gueliz aux grillades de Jemaa el-Fna. La ville est le premier marche de restauration touristique du Maroc : les restaurants qui apparaissent dans le top 3 de Google Maps captent 60% des clients de passage. Avec la Coupe du Monde 2030, le flux touristique va exploser — les restaurants sans presence digitale, sans reservation en ligne et sans menu trilingue (francais, anglais, arabe) resteront invisibles face a cette vague.

**City-specific pain point localization (added to inherited pain point "Invisible on Google"):**
> A Marrakech, la competition est particulierement feroce : le Cafe des Epices a 2,400 avis Google, le Nomad en a 3,100. Si votre restaurant a moins de 50 avis et pas de photos professionnelles, les touristes ne vous verront jamais — meme si vous etes a 50 metres.

**City-specific FAQ:**
> Q: Mon restaurant est dans la medina — est-ce que la livraison Glovo fonctionne ?
> A: Oui. Tadnun configure des points de collecte adaptes a la medina de Marrakech, ou les livreurs Glovo ne peuvent pas acceder en scooter. On definit un point GPS precis a l'entree de votre derb et on l'integre dans le systeme. Vos commandes arrivent, meme dans les ruelles les plus etroites.
