# Free Tool Strategy — Tadnun

*Created: 2026-03-27*

---

## The Problem This Solves

The marketing psychology audit identified a critical conversion gap: the site jumps from "read about us" to "contact us via WhatsApp or form." For tech-hesitant Moroccan SME owners, this is too large a psychological leap. There are no micro-commitment steps between passive browsing and active contact.

A free interactive tool bridges this gap by:
1. Creating a micro-commitment (answering questions, entering data)
2. Providing immediate value (a personalized result)
3. Generating leads through email capture
4. Priming visitors for the full sales conversation

---

## 1. Tool Evaluation

### 1.1 Digital Readiness Quiz

**Concept:** 5-7 questions about current business operations. Returns a personalized digitalization score (0-100) with sector-specific recommendations.

| Dimension | Assessment |
|-----------|------------|
| **Build effort** | 2-3 days. Client-side only. No backend needed. Quiz logic is a weighted scoring formula in TypeScript. |
| **Lead gen potential** | **Very high.** The quiz creates personal investment (answering questions about YOUR business), and the result feels personalized. Email gate before full results has proven 30-50% capture rates in similar tools. The "score" format triggers social comparison and sharing. |
| **Shareability** | **Excellent.** "I scored 28/100 on digital readiness" is inherently shareable on WhatsApp and LinkedIn. The score creates social currency (both for those who score well and those who use a low score as a call for help). In Morocco's relationship-driven business culture, sharing a result with a peer is natural. |
| **SEO value** | **Moderate.** The quiz page itself can target "test digitalisation entreprise Maroc" and similar queries. The results page (if indexable with generic ranges) adds topical authority. The tool earns backlinks from business blogs and chambers of commerce. |
| **Moroccan market fit** | **Strong.** Self-assessment is non-threatening. The visitor discovers their own problem rather than being told they have one (consistency principle). The WhatsApp analogy ("as simple as answering a few questions") works. |

**Verdict: Best overall choice. Highest lead gen + shareability + lowest effort.**

---

### 1.2 ROI Calculator

**Concept:** Select your sector and business size, input current costs (rent, commissions, waste, labor hours). The calculator shows estimated annual savings from digitalization.

| Dimension | Assessment |
|-----------|------------|
| **Build effort** | 3-4 days. Requires sector-specific financial models with credible assumptions. Each of the 8 sectors needs its own calculation logic. Assumptions must be defensible. |
| **Lead gen potential** | **High.** The output ("You could save 180,000 MAD/year") is a powerful anchor that makes Tadnun's pricing feel trivial by comparison. Email gate works well here because the "full report" feels valuable. |
| **Shareability** | **Good.** "My restaurant is losing 180,000 MAD/year" is shareable, but slightly less viral than a score because it requires explaining context. Owners may hesitate to share financial data publicly. |
| **SEO value** | **Good.** Targets "calcul ROI digitalisation" and "combien coute la digitalisation restaurant Maroc" queries. Calculator tools earn backlinks. |
| **Moroccan market fit** | **Medium-high.** Price-sensitive audience will engage with savings figures. However, if assumptions feel wrong ("there is no way I waste that much"), trust erodes. The financial inputs may feel intrusive for a first interaction. |

**Verdict: Strong second choice. Best for visitors further down the funnel who already know they want to digitalize. Consider building as the second tool after the quiz.**

---

### 1.3 Sector Diagnostic Checklist

**Concept:** A sector-specific interactive checklist. Check off what you currently have (Google listing, POS system, online booking, CRM, etc.). The checklist reveals gaps and scores your digital maturity.

| Dimension | Assessment |
|-----------|------------|
| **Build effort** | 2 days. Simple checkbox UI. Requires defining 10-15 checklist items per sector (content effort, not engineering effort). |
| **Lead gen potential** | **Medium.** Less personal than a quiz (checking boxes feels less invested than answering questions). The result ("You have 3 out of 12 tools") is informative but less emotionally compelling than a readiness score. |
| **Shareability** | **Low.** A checklist completion is not inherently shareable. "I checked 3 out of 12 boxes" has no social currency. |
| **SEO value** | **Good.** "Checklist digitalisation restaurant Maroc" is a real query. The checklist format is link-worthy for business resources pages. |
| **Moroccan market fit** | **Medium.** Simple to understand. But the binary nature (have/don't have) may feel judgmental rather than helpful. No nuance for "we sort of do this manually." |

**Verdict: Weakest standalone option. The quiz subsumes this functionality with better UX and lead gen. Could work as a downloadable PDF lead magnet instead.**

---

### 1.4 Cost of Inaction Calculator

**Concept:** Input your sector and a few operational details. The calculator shows how much money you lose per month/year by not digitalizing, based on sector benchmarks (waste, missed customers, manual labor hours, commission leakage).

| Dimension | Assessment |
|-----------|------------|
| **Build effort** | 3-4 days. Similar to ROI calculator but framed around losses rather than savings. Needs credible benchmark data per sector. |
| **Lead gen potential** | **High.** Loss aversion is the strongest psychological lever on the Tadnun site (rated 9/10 in the audit). Showing a visitor their personal loss figure ("You are losing approximately 12,500 MAD per month") is visceral. Email gate to get the "full breakdown" works well. |
| **Shareability** | **Medium.** "I'm losing 150,000 MAD/year" is alarming but owners may not want to share their losses publicly. More likely to be shared privately via WhatsApp to a business partner: "Look at this, we need to do something." |
| **SEO value** | **Good.** Targets "combien perd une entreprise sans digitalisation" and similar problem-aware queries. |
| **Moroccan market fit** | **Medium.** The loss framing is powerful, but if the numbers feel inflated or generic, it backfires. "You are losing 150,000 MAD/year" from a company trying to sell you something can feel manipulative if not grounded in credible methodology. |

**Verdict: High emotional impact but higher trust risk. Better as a module within the quiz results (show the cost of inaction based on their score) than as a standalone tool.**

---

### Evaluation Summary

| Tool | Build Effort | Lead Gen | Shareability | SEO | Market Fit | **Overall** |
|------|-------------|----------|--------------|-----|------------|-------------|
| Digital Readiness Quiz | 2-3 days | Very High | Excellent | Moderate | Strong | **1st** |
| ROI Calculator | 3-4 days | High | Good | Good | Medium-High | **2nd** |
| Cost of Inaction Calculator | 3-4 days | High | Medium | Good | Medium | **3rd** |
| Sector Diagnostic Checklist | 2 days | Medium | Low | Good | Medium | **4th** |

**Recommendation:** Build the Digital Readiness Quiz first. Incorporate cost-of-inaction figures into the quiz results. Plan the ROI Calculator as a future second tool for visitors deeper in the funnel.

---

## 2. Recommended Tool: Digital Readiness Quiz — Full Specification

### 2.1 Concept

**Name (FR):** "Test de Maturite Digitale" / **Name (EN):** "Digital Readiness Score" / **Name (AR):** "اختبار الجاهزية الرقمية"

**Tagline (FR):** "En 2 minutes, decouvrez ou en est votre entreprise."
**Tagline (EN):** "In 2 minutes, discover where your business stands."

**Format:** 7 questions, one per screen, with a progress bar. Sector selection first, then 6 operational questions. Client-side scoring. Results page with score, interpretation, sector-specific recommendations, and cost-of-inaction estimate.

**URL:** `/{locale}/tools/quiz`

---

### 2.2 Questions

#### Question 0: Sector Selection (not scored)

**FR:** "Dans quel secteur exercez-vous ?"
**EN:** "What sector is your business in?"

Options: The 8 sectors (Agriculture, Restaurants, Tourism, Healthcare, Retail, Education, Real Estate, Logistics) + "Other"

*Purpose: Routes to sector-specific results. Not scored.*

---

#### Question 1: Online Visibility

**FR:** "Comment les clients vous trouvent-ils aujourd'hui ?"
**EN:** "How do customers find you today?"

| Option | FR | EN | Score |
|--------|----|----|-------|
| A | Bouche a oreille uniquement | Word of mouth only | 0 |
| B | Reseaux sociaux (Facebook, Instagram) | Social media (Facebook, Instagram) | 5 |
| C | Fiche Google, reseaux sociaux | Google listing + social media | 10 |
| D | Site web, Google, reseaux sociaux, avis en ligne | Website, Google, social media, online reviews | 15 |

*Why this question: Online visibility is the most universal pain point (93% of SMEs have no digital presence). It establishes the visitor's baseline immediately.*

---

#### Question 2: Customer Management

**FR:** "Comment gerez-vous vos clients et vos contacts ?"
**EN:** "How do you manage customers and contacts?"

| Option | FR | EN | Score |
|--------|----|----|-------|
| A | Dans ma tete ou sur papier | In my head or on paper | 0 |
| B | Carnets de contacts WhatsApp | WhatsApp contact lists | 5 |
| C | Fichier Excel ou Google Sheets | Excel or Google Sheets | 10 |
| D | CRM ou logiciel dedie | CRM or dedicated software | 15 |

*Why this question: Customer management reveals operational maturity. The WhatsApp option is specifically Moroccan — it validates their current behavior before showing the gap.*

---

#### Question 3: Booking / Orders / Scheduling

**FR:** "Comment vos clients reservent ou commandent ?"
**EN:** "How do customers book or order from you?"

| Option | FR | EN | Score |
|--------|----|----|-------|
| A | Par telephone ou en personne uniquement | By phone or in person only | 0 |
| B | Via WhatsApp | Via WhatsApp | 5 |
| C | Via une plateforme tierce (Booking, Glovo, Doctolib...) | Via a third-party platform (Booking, Glovo, etc.) | 10 |
| D | Systeme de reservation/commande en ligne sur mon propre site | Online booking/ordering on my own site | 15 |

*Why this question: Booking/ordering flow is the operational core for 6 of 8 sectors. The progression from phone to own platform maps directly to Tadnun's service tiers.*

---

#### Question 4: Financial Tracking

**FR:** "Comment suivez-vous vos revenus et vos depenses ?"
**EN:** "How do you track income and expenses?"

| Option | FR | EN | Score |
|--------|----|----|-------|
| A | Je ne suis pas precisement | I don't track precisely | 0 |
| B | Cahier ou carnet | Paper notebook | 4 |
| C | Excel ou Google Sheets | Excel or Google Sheets | 9 |
| D | Logiciel de comptabilite ou caisse enregistreuse connectee | Accounting software or connected POS | 15 |

*Why this question: Financial visibility is a universal pain point. "I don't track precisely" is an honest option that many will select — it validates their reality without judgment.*

---

#### Question 5: Team Coordination

**FR:** "Comment communiquez-vous avec votre equipe ?"
**EN:** "How do you coordinate with your team?"

| Option | FR | EN | Score |
|--------|----|----|-------|
| A | A l'oral, au jour le jour | Verbally, day to day | 0 |
| B | Groupe WhatsApp | WhatsApp group | 5 |
| C | Tableaux ou planning papier | Paper boards or schedules | 7 |
| D | Outil digital (planning en ligne, application dediee) | Digital tool (online scheduler, dedicated app) | 15 |

*Why this question: Team coordination reveals internal process maturity. Most Moroccan SMEs will answer A or B, which normalizes their situation.*

---

#### Question 6: Data and Compliance

**FR:** "Comment stockez-vous les donnees de votre activite (clients, stock, documents) ?"
**EN:** "How do you store business data (clients, inventory, documents)?"

| Option | FR | EN | Score |
|--------|----|----|-------|
| A | Papier, classeurs, cahiers | Paper, binders, notebooks | 0 |
| B | Telephone (photos, notes, WhatsApp) | Phone (photos, notes, WhatsApp) | 5 |
| C | Fichiers sur ordinateur (Word, Excel) | Computer files (Word, Excel) | 10 |
| D | Systeme cloud securise avec sauvegardes | Secure cloud system with backups | 15 |

*Why this question: Data storage maps to compliance risk (ONSSA, CNDP, AMO) and directly relates to Tadnun's core offering. The "phone" option is uniquely Moroccan — many owners run their entire business from their smartphone.*

---

### 2.3 Scoring Logic

**Maximum score:** 90 (6 questions x 15 max each)
**Normalized to 0-100:** `(rawScore / 90) * 100`, rounded to nearest integer.

#### Score Ranges

| Range | Label (FR) | Label (EN) | Label (AR) | Color | Icon |
|-------|-----------|-----------|-----------|-------|------|
| 0-25 | Alerte rouge | Critical Gap | فجوة حرجة | Red (#DC2626) | Warning triangle |
| 26-50 | En retard | Falling Behind | متأخر | Orange (#EA580C) | Clock |
| 51-75 | En progres | Getting There | في تقدم | Amber (#D97706) | Rising chart |
| 76-100 | Leader digital | Digital Leader | رائد رقمي | Green (#16A34A) | Star |

#### Expected Distribution

Based on the target audience (Moroccan SMEs, 93% with no digital presence), the expected score distribution is:

- **0-25 (Critical Gap):** ~45% of quiz takers — these are the core leads
- **26-50 (Falling Behind):** ~35% — strong leads, some digital but fragmented
- **51-75 (Getting There):** ~15% — warm leads, looking to optimize
- **76-100 (Digital Leader):** ~5% — unlikely to be core customers, but may refer others

This means ~80% of quiz takers will receive a score that naturally leads to Tadnun's services.

---

### 2.4 Results Page

#### Structure (top to bottom)

**1. Score Display**
- Large animated score number (count-up from 0 to their score)
- Score label and color-coded badge
- One-line interpretation
- Comparison bar: "Vous etes [au-dessus de / en dessous de] la moyenne marocaine (estimated average: 18/100)"

**2. Per-Question Breakdown (visible without email)**
- 6 mini-cards, one per question dimension
- Each shows: dimension name, their answer, and a one-sentence recommendation
- Color-coded: red/orange/green based on that question's score

**3. Email Gate (before full results)**
- Transition line: "Voulez-vous recevoir votre rapport complet avec des recommandations personnalisees pour votre secteur ?"
- Single email field + "Envoyer mon rapport" button
- Trust line: "Gratuit, sans engagement. Nous ne partageons jamais votre email."
- Skip option: small text link "Continuer sans email" (shows sector recommendations but no personalized report delivery)

**4. Sector-Specific Recommendations (after email or skip)**
- 3 concrete recommendations based on sector + weakest dimensions
- Each recommendation links to relevant Tadnun service or sector page
- Cost-of-inaction estimate based on sector benchmarks (see section 2.6)

**5. CTA Block**
- Primary: "Discutons de votre score — 15 min, gratuit, sans engagement" (links to WhatsApp with prefilled message including their score)
- Secondary: "Voir les solutions pour [leur secteur]" (links to sector detail page)
- WhatsApp prefill: "Bonjour, je viens de faire le test de maturite digitale et j'ai obtenu {score}/100. J'aimerais en discuter."

**6. Social Sharing**
- Shareable score card (see section 2.8)
- WhatsApp share button (primary — this is Morocco)
- LinkedIn share button (secondary — for more digital-savvy owners)
- Copy link button

---

### 2.5 Per-Score Recommendations

#### 0-25: Critical Gap

**Headline (FR):** "Votre entreprise fonctionne en mode analogique. Vous perdez de l'argent, des clients et du temps chaque jour — sans le savoir."
**Headline (EN):** "Your business runs in analog mode. You are losing money, customers, and time every day — without realizing it."

**Tone:** Urgent but empathetic. Never condescending. "This is not your fault — the tools weren't available. Now they are."

**Recommended Tadnun services:**
1. **Starter Plan (299 MAD/month):** Google Maps listing, one-page website, WhatsApp Business setup — "the digital basics that make you visible."
2. **Free diagnostic call:** "In 15 minutes, we'll identify your 3 biggest blockers and what they're costing you."

**Cost-of-inaction framing:** "Businesses at this level lose an average of [sector-specific figure] MAD per year in missed opportunities."

---

#### 26-50: Falling Behind

**Headline (FR):** "Vous avez commence, mais vos outils ne se parlent pas. Des donnees se perdent entre WhatsApp, Excel et le papier."
**Headline (EN):** "You've started, but your tools don't talk to each other. Data gets lost between WhatsApp, Excel, and paper."

**Tone:** Acknowledging progress while showing the gap. "You're ahead of 93% of Moroccan businesses. Now let's connect the dots."

**Recommended Tadnun services:**
1. **Pro Plan (999 MAD/month):** Connected POS/CRM, booking system, analytics dashboard — "turn your scattered tools into one system."
2. **Sector-specific integration:** Based on their sector, highlight the most relevant integration (CMI for retail, Google Business for restaurants, ONSSA for agriculture).

**Cost-of-inaction framing:** "Businesses at this level waste [sector-specific figure] hours per week on manual tasks that could be automated."

---

#### 51-75: Getting There

**Headline (FR):** "Vous avez les bases. Il manque l'integration, l'automatisation et les donnees en temps reel pour passer au niveau superieur."
**Headline (EN):** "You have the foundations. What's missing is integration, automation, and real-time data to reach the next level."

**Tone:** Congratulatory and strategic. "You're in the top 20% of Moroccan SMEs. Here's what separates good from great."

**Recommended Tadnun services:**
1. **Pro or Premium Plan:** Advanced integrations, analytics, automation — "the tools that separate growing businesses from plateauing ones."
2. **Specific optimization:** Based on weakest dimension, suggest the targeted solution (e.g., if financial tracking is weak, suggest connected POS with real-time margins).

---

#### 76-100: Digital Leader

**Headline (FR):** "Impressionnant. Votre entreprise est en avance sur 95% du marche marocain. Voyons comment aller encore plus loin."
**Headline (EN):** "Impressive. Your business is ahead of 95% of the Moroccan market. Let's see how to push even further."

**Tone:** Respectful, peer-level. "You're already doing well. We can help you do even better — or help businesses in your network catch up."

**Recommended Tadnun services:**
1. **Premium Plan (2,999 MAD/month):** Custom integrations, dedicated app, strategy consulting — "optimization at scale."
2. **Referral:** "Know a business owner who scored lower? Share the quiz and help them catch up." (This turns high-scorers into distribution channels.)

---

### 2.6 Sector-Specific Content

Each sector modifies the results page with:

#### Sector benchmarks (shown in results)

| Sector | Cost-of-Inaction Anchor (annual) | Primary Metric |
|--------|----------------------------------|----------------|
| Agriculture | 400,000 MAD (lost export contracts) | Export rejection rate |
| Restaurants | 180,000 MAD (food waste + missed customers) | Google visibility score |
| Tourism | 300,000 MAD (OTA commissions) | Direct booking ratio |
| Healthcare | 480,000 MAD (no-shows + billing delays) | No-show rate |
| Retail | 120,000 MAD (stockouts + missed sales) | Inventory accuracy |
| Education | 60,000 MAD (late fee collection + admin time) | Fee collection rate |
| Real Estate | 240,000 MAD (lost leads + missed follow-ups) | Lead response time |
| Logistics | 150,000 MAD (manual data entry + disputes) | Delivery accuracy |

#### Sector-specific question adaptations

The quiz questions are universal, but the results page interprets each answer through the sector lens:

- **Agriculture Q3 (Booking/Orders):** Reframed as "How do buyers and exporters place orders?"
- **Tourism Q1 (Online Visibility):** Emphasizes OTA dependency and direct booking potential
- **Healthcare Q6 (Data Storage):** Highlights CNDP compliance and patient record risks
- **Logistics Q4 (Financial Tracking):** Emphasizes delivery proof and dispute resolution

#### Sector-specific recommendations

Each sector gets 3 tailored recommendations on the results page. These are pulled from the existing sector detail data in `src/data/sector-details.ts`, specifically the `whyUs` and `integrations` fields. This ensures consistency between the quiz results and the sector pages.

---

### 2.7 Email Gate Strategy

**Approach: Partial reveal, then gate.**

The visitor sees:
1. Their score (visible immediately after completing the quiz)
2. The score interpretation and comparison to Moroccan average (visible)
3. Per-question breakdown as color-coded mini-cards (visible)

The visitor needs an email to unlock:
4. Full sector-specific recommendations
5. Personalized cost-of-inaction estimate
6. PDF report delivered to their inbox

**Why this approach works:**
- The visitor has already invested 2 minutes answering questions (sunk cost)
- They can see their score, which is enough to create curiosity
- The gate comes after value is delivered, not before (reciprocity)
- The "skip" option respects autonomy (reduces reactance) while still capturing most emails
- The PDF report gives a tangible reason to provide the email

**Email capture fields:**
- Email (required)
- Name (optional — pre-filled if they provide it, makes the report feel personalized)
- Phone (optional — "Pour recevoir aussi vos recommandations sur WhatsApp")

**Post-capture actions:**
1. Deliver the PDF report via Resend API (reuse existing infrastructure at `/api/contact/route.ts` pattern)
2. Send internal notification to Tadnun team with lead details (score, sector, weakest dimensions)
3. Add to email nurture sequence (adapt the existing 7-email sequence from `.agents/email-sequence.md` with quiz-specific opener)
4. Push dataLayer event for GTM tracking

---

### 2.8 Social Sharing — Shareable Score Card

**Design:** A rectangular card (1200x630px for OG/LinkedIn, 1080x1080 for WhatsApp/Instagram) containing:

- Tadnun logo (top left)
- Score as large number with color-coded background
- Score label ("Leader Digital" / "En retard" etc.)
- One-line interpretation
- "Testez votre score sur tadnun.ma/tools/quiz"
- Clean, editorial aesthetic consistent with site design (warm, light, no flashy elements)

**Generation:** Client-side canvas rendering or pre-designed SVG templates with dynamic score insertion. No server-side image generation needed for V1 — use an OG image template with score in the URL query parameter that gets rendered by a lightweight edge function.

**Share copy (pre-filled):**
- **WhatsApp (FR):** "J'ai fait le Test de Maturite Digitale de Tadnun et j'ai obtenu {score}/100. Et toi, ou en est ton entreprise ? {url}"
- **LinkedIn (FR):** "Je viens de tester la maturite digitale de mon entreprise : {score}/100. 93% des PME marocaines n'ont aucune presence digitale. Ou en etes-vous ? {url}"

---

## 3. Technical Implementation

### 3.1 Architecture

```
src/app/[locale]/tools/quiz/
├── page.tsx              Server Component — page metadata, quiz container
├── quiz-client.tsx       "use client" — quiz state machine, question flow, scoring
├── quiz-questions.ts     Question data (FR/EN/AR) + scoring weights
├── quiz-results.tsx      "use client" — results display, email gate, sharing
├── quiz-score-card.tsx   "use client" — shareable score card component
└── quiz-types.ts         TypeScript interfaces

src/app/api/quiz/
└── route.ts              POST — receives quiz results + email, sends report via Resend, pushes to internal notification

src/messages/
├── fr.json               + "quiz" namespace with all FR strings
├── en.json               + "quiz" namespace with all EN strings
└── ar.json               + "quiz" namespace with all AR strings (RTL-tested)
```

### 3.2 State Management

Client-side only. No database needed.

```typescript
interface QuizState {
  currentStep: number;          // 0 = sector, 1-6 = questions, 7 = results
  sector: string | null;
  answers: Record<number, number>; // questionIndex -> score
  totalScore: number;
  normalizedScore: number;      // 0-100
  email: string | null;
  hasSubmittedEmail: boolean;
}
```

State managed via `useReducer` in the quiz client component. No external state library needed.

### 3.3 Scoring Function

```typescript
function calculateScore(answers: Record<number, number>): {
  raw: number;
  normalized: number;
  level: 'critical' | 'behind' | 'getting-there' | 'leader';
  weakestDimensions: string[];
} {
  const maxScore = 90; // 6 questions x 15 max
  const raw = Object.values(answers).reduce((sum, score) => sum + score, 0);
  const normalized = Math.round((raw / maxScore) * 100);

  const level =
    normalized <= 25 ? 'critical' :
    normalized <= 50 ? 'behind' :
    normalized <= 75 ? 'getting-there' : 'leader';

  // Identify the 2 weakest dimensions for targeted recommendations
  const dimensions = ['visibility', 'customers', 'booking', 'finance', 'team', 'data'];
  const sorted = dimensions
    .map((dim, i) => ({ dim, score: answers[i + 1] ?? 0 }))
    .sort((a, b) => a.score - b.score);
  const weakestDimensions = sorted.slice(0, 2).map(d => d.dim);

  return { raw, normalized, level, weakestDimensions };
}
```

### 3.4 GTM / DataLayer Integration

Push events at key moments for analytics:

```typescript
// Quiz started
window.dataLayer?.push({
  event: 'quiz_start',
  quiz_sector: selectedSector,
});

// Question answered
window.dataLayer?.push({
  event: 'quiz_answer',
  quiz_question: questionIndex,
  quiz_answer_score: answerScore,
});

// Quiz completed (results viewed)
window.dataLayer?.push({
  event: 'quiz_complete',
  quiz_score: normalizedScore,
  quiz_level: scoreLevel,
  quiz_sector: selectedSector,
  quiz_weakest_1: weakestDimensions[0],
  quiz_weakest_2: weakestDimensions[1],
});

// Email captured
window.dataLayer?.push({
  event: 'quiz_email_capture',
  quiz_score: normalizedScore,
  quiz_sector: selectedSector,
});

// CTA clicked (WhatsApp or sector page)
window.dataLayer?.push({
  event: 'quiz_cta_click',
  quiz_cta_type: 'whatsapp' | 'sector_page' | 'contact',
  quiz_score: normalizedScore,
});
```

### 3.5 Email Delivery via Resend

Reuse the existing Resend integration pattern from `src/app/api/contact/route.ts`:

**New endpoint:** `POST /api/quiz`

**Payload:**
```typescript
interface QuizSubmission {
  email: string;
  name?: string;
  phone?: string;
  sector: string;
  score: number;
  level: string;
  weakestDimensions: string[];
  answers: Record<number, number>;
}
```

**Actions on submission:**
1. Send personalized results email to the visitor (HTML email with score, sector recommendations, CTA to book a call)
2. Send internal notification to the Tadnun team (same format as contact form notification, with quiz-specific data)
3. Return `{ success: true }` to the client

### 3.6 RTL Support

All quiz components must be tested in Arabic (RTL):
- Progress bar fills right-to-left
- Question and answer text aligned correctly
- Score card layout mirrors properly
- Share copy uses Arabic text
- All numeric displays remain LTR (numbers are always LTR in Arabic)

### 3.7 Mobile-First Design

Given that the target audience primarily uses smartphones:
- Full-screen quiz on mobile (one question fills the viewport)
- Large tap targets for answer options (minimum 48px touch area)
- Swipe gestures between questions (optional enhancement)
- Score card optimized for WhatsApp sharing dimensions
- No horizontal scrolling at any breakpoint

---

## 4. Distribution and Promotion

### 4.1 On-Site Placement

#### Homepage (secondary CTA)
- Position: Below the hero section, above the sectors grid
- Format: Horizontal banner with warm background
- Copy (FR): "En 2 minutes, decouvrez ou en est votre entreprise."
- CTA: "Faire le test gratuit"
- Design: Subtle, editorial — not a popup, not a sticky bar. A natural content block that invites exploration.

#### Sector Pages (sidebar/inline)
- Position: After the pain points section, before the solutions section
- Format: Compact card within the content flow
- Copy (FR): "Ou en est votre [secteur] ? Faites le test en 2 minutes."
- Sector-specific: Pre-selects their sector when they click through
- URL: `/{locale}/tools/quiz?sector={sector}`

#### Sectors Listing Page
- Position: Within or after the "Sound familiar?" signs section
- Format: Interactive prompt alongside the self-identification checklist
- Copy: "Check the signs that apply? Get your exact score."

#### Contact Page (alternative first step)
- Position: Above the contact form, as a lower-commitment alternative
- Copy (FR): "Pas encore pret a nous contacter ? Commencez par decouvrir votre score."
- This gives hesitant visitors something to do instead of bouncing.

#### Navigation
- Add "Free Quiz" or "Test Gratuit" as a subtle nav item or as a highlight badge next to "Contact"
- Mobile: Include in the hamburger menu with a "NEW" badge for launch period

### 4.2 Social Media Campaigns

#### Launch Campaign (Week 1-2)

**WhatsApp Status / Broadcast:**
- Share the quiz link with existing contacts
- Pre-filled message: "93% des entreprises marocaines n'ont aucune presence digitale. Et vous ? Faites le test en 2 minutes."

**LinkedIn (Tadnun company page + founder personal):**
- Post 1: "We built a free tool for Moroccan businesses to measure their digital readiness. 2 minutes, no signup. What's your score?" + quiz link
- Post 2: Aggregate stats after 100 completions: "After 100 Moroccan businesses took our quiz, the average score was X/100. Here's what we learned." (This creates a content loop — quiz generates data, data generates content, content drives more quiz completions.)
- Post 3: Sector-specific insights: "Moroccan restaurants scored an average of X/100 on digital readiness. The biggest gap? Online visibility."

**Facebook / Instagram:**
- Carousel post: Each slide shows one quiz question with a poll/slider
- Story format: "Swipe to answer" with each question as a slide, ending with "Get your real score at tadnun.ma"

#### Ongoing Content (Monthly)

- Monthly "state of digital readiness" posts using aggregated quiz data
- Sector spotlights: "How did agriculture cooperatives score this month?"
- Score improvement stories: "Business X went from 15/100 to 72/100 in 6 months with Tadnun"

### 4.3 Paid Advertising

#### Google Ads
- **Keywords:** "digitalisation entreprise maroc," "test digitalisation," "maturite digitale PME"
- **Ad copy:** "Ou en est votre entreprise ? Test gratuit en 2 min. Resultat personnalise par secteur."
- **Landing page:** Direct to quiz page (not homepage)
- **Budget:** Start with 50 MAD/day, measure cost per quiz completion and cost per email capture

#### Meta Ads (Facebook/Instagram)
- **Targeting:** Moroccan business owners, 30-55, interests in business management, entrepreneurship, specific sectors
- **Format:** Lead generation objective (but driving to quiz, not a lead form)
- **Creative:** Score card visual with "What's your score?" hook
- **Budget:** Start with 100 MAD/day, optimize for quiz completions

#### LinkedIn Ads (lower priority, higher cost)
- **Targeting:** Morocco, SME owners, sector-specific job titles
- **Format:** Sponsored content linking to quiz
- **Budget:** Test with 200 MAD/day for 2 weeks, measure ROI

### 4.4 Partnership Distribution

- **CRI (Centre Regional d'Investissement):** Share the quiz as a resource for entrepreneurs in their network
- **CGEM / associations professionnelles:** Position the quiz as a "free digital audit" tool for their members
- **Incubators / accelerators:** Offer the quiz as part of their startup assessment toolkit
- **Accountants and fiduciaires:** They advise SMEs daily — the quiz gives them a tool to recommend digitalization

### 4.5 Email Signature and Collateral

- Add quiz link to Tadnun team email signatures: "Test gratuit: Ou en est votre entreprise ? [link]"
- Include in post-contact-form "while you wait" content
- Include as PS in the nurture email sequence

---

## 5. Success Metrics

### 5.1 Primary KPIs

| Metric | Target (Month 1) | Target (Month 3) | Measurement |
|--------|-------------------|-------------------|-------------|
| Quiz completions | 200 | 500/month | GTM event `quiz_complete` |
| Completion rate (start to finish) | 70% | 75% | `quiz_complete` / `quiz_start` |
| Email capture rate | 35% | 45% | `quiz_email_capture` / `quiz_complete` |
| Quiz-to-contact rate | 8% | 12% | Contact form or WhatsApp within 7 days of quiz / `quiz_complete` |
| Quiz-to-paid conversion | 2% | 5% | Paid clients who took quiz / total quiz completions (tracked via CRM tag) |

### 5.2 Secondary KPIs

| Metric | Target | Measurement |
|--------|--------|-------------|
| Average score | Track (expect ~22/100) | Aggregate from dataLayer |
| Score distribution by sector | Track | Segment by `quiz_sector` |
| Share rate | 10% of completions | `quiz_share` event |
| Time to complete | < 2 minutes | Timestamp difference `quiz_start` to `quiz_complete` |
| Email open rate (report email) | 60% | Resend analytics |
| Drop-off per question | Track | Identify which question causes abandonment |

### 5.3 Funnel Visualization

```
Site visitors                    100%
  |
  v
Quiz page views                  ~15% (of homepage visitors)
  |
  v
Quiz started (Q0 answered)       ~80% (of quiz page views)
  |
  v
Quiz completed (all Qs)          ~70% (of quiz starts)
  |
  v
Email captured                   ~35% (of completions)
  |
  v
Contact within 7 days            ~8% (of completions)
  |
  v
Paid client                      ~2% (of completions)
```

### 5.4 Break-Even Analysis

Assuming 50 MAD/day ad spend (1,500 MAD/month) driving traffic to the quiz:
- At 100 MAD CPC and 70% completion rate: ~10.5 completions/day from ads
- At 35% email capture: ~3.7 emails/day from ads
- At 8% conversion to contact: ~0.84 contacts/day from ads
- At 2% conversion to paid: ~6.3 new clients/month from ads alone
- At an average contract value of 999 MAD/month x 12 months = ~11,988 MAD LTV
- Break-even at < 1 client/month from ads

This does not account for organic quiz completions (on-site + social + referral), which should represent 60-70% of total completions after month 2.

---

## 6. Implementation Roadmap

### Phase 1: MVP (Days 1-3)

- [ ] Build quiz question flow with progress bar (client-side)
- [ ] Implement scoring logic and results page
- [ ] Create all FR translations (EN and AR in Phase 2)
- [ ] Add email gate with Resend integration
- [ ] Basic GTM dataLayer events (start, complete, email capture)
- [ ] Mobile-first responsive design
- [ ] Add quiz link to homepage (secondary CTA banner)

### Phase 2: Polish and Distribute (Days 4-7)

- [ ] EN and AR translations (RTL testing for AR)
- [ ] Shareable score card generation
- [ ] WhatsApp and LinkedIn share buttons
- [ ] Add quiz CTAs to sector pages and contact page
- [ ] SEO meta tags and OG image for quiz page
- [ ] Launch social media campaign (organic)
- [ ] Add quiz link to email signatures and nurture sequence

### Phase 3: Optimize (Weeks 2-4)

- [ ] Analyze drop-off data per question — rewrite or reorder if needed
- [ ] A/B test email gate placement (before vs. after recommendations)
- [ ] A/B test CTA copy on homepage quiz banner
- [ ] Launch paid ads (Google + Meta) targeting quiz page
- [ ] Create first "state of digital readiness" content piece from quiz data
- [ ] Track quiz-to-conversion attribution in CRM

### Phase 4: Expand (Month 2+)

- [ ] Build ROI Calculator as second tool (`/{locale}/tools/roi-calculator`)
- [ ] Create `/tools` hub page listing all free tools
- [ ] Add quiz retake functionality ("Take the quiz again in 3 months to track progress")
- [ ] Personalized follow-up emails based on weakest dimensions
- [ ] Partner distribution (CRI, CGEM, incubators)

---

## 7. Content Requirements (Translation Work)

### New translation keys needed

The quiz requires a new `quiz` namespace in each language file with approximately 80-100 keys:

- 7 question texts + 28 answer option texts (4 per question)
- 4 score level labels + 4 score level descriptions
- 8 sector-specific recommendation blocks (3 recommendations each = 24)
- UI strings: progress, buttons, email gate, sharing, etc. (~20 keys)
- Results page headings and body copy (~15 keys)

**Priority:** FR first (default locale, majority of traffic), EN second, AR third (requires RTL testing pass).

---

## 8. Risk Mitigation

| Risk | Mitigation |
|------|------------|
| Quiz feels too generic / not Moroccan | Every answer option references Moroccan reality (WhatsApp, paper notebooks, CMI). Sector benchmarks use MAD figures. Results reference local integrations (ONSSA, CNSS). |
| Low completion rate | Keep to 7 questions max. One question per screen. Progress bar visible at all times. Each question takes <15 seconds. |
| Email gate kills the experience | Show the score and mini-breakdown before the gate. Gate only the full sector recommendations and PDF. Provide a skip option. |
| Score feels meaningless or arbitrary | Anchor against the Moroccan average (18/100 estimate). Show where they rank relative to their sector. Make the per-question breakdown actionable. |
| Privacy concerns (data collection) | Quiz runs entirely client-side. No data stored unless they voluntarily provide email. Explicit "we never share your email" messaging. CNDP-aligned data practices. |
| Arabic RTL bugs | Dedicated RTL testing pass. Progress bar, score display, and card layouts must all mirror correctly. Numbers remain LTR. |
| Ad spend with no return | Start with minimal budget (50 MAD/day). Measure cost per email and cost per contact for 2 weeks before scaling. Organic distribution should carry the majority of traffic. |

---

*This document is a strategy specification. No code changes have been made. Implementation begins with Phase 1 as outlined above.*
