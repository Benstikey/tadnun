# A/B Test Plan — Tadnun

*Created: 2026-03-27*
*Analytics: GTM (GTM-MPT7HMNM) + GA4 (G-W1D7NNYKQE)*
*Existing events: `contact_form_submitted`, `whatsapp_cta_clicked`, `faq_opened`*
*Conversion definition: WhatsApp click OR form submission*

---

## Traffic Assumptions

Based on a pre-revenue Moroccan B2B site with 8 sector pages, estimated monthly traffic:
- Homepage: ~1,500–2,500 sessions/month
- Sector pages (combined): ~800–1,500 sessions/month (~100–200 per sector)
- Contact page: ~400–800 sessions/month
- Overall site conversion rate (estimated baseline): 2–4%

All sample size calculations assume 80% statistical power, 95% confidence, two-tailed test, and a baseline conversion rate of 3% unless noted otherwise. Minimum detectable effect (MDE) is calibrated conservatively — we need large lifts (30%+ relative) to reach significance at these traffic levels.

---

## Test 1: Hero CTA Hierarchy — Validate the Current Swap

**Priority: 1 (run first)**

### Hypothesis

The current hero CTA order (primary: "Let's talk" linking to `/contact`, secondary: "Explore sectors" linking to `/sectors`) may not be optimal. The audience — Moroccan SME owners who are not yet solution-aware — may convert better if the lower-commitment action ("Explore sectors") is primary, because they need to see sector-specific pain points before they are ready to talk. Alternatively, the direct CTA may work because WhatsApp culture in Morocco makes "Let's talk" feel low-friction. We need data to validate which hierarchy drives more total conversions downstream.

### Control vs Variant

| Element | Control (current) | Variant |
|---------|-------------------|---------|
| Primary CTA | "Let's talk" (dark filled button, links to `/contact`) | "Explore sectors" (dark filled button, links to `/sectors`) |
| Secondary CTA | "Explore sectors" (outlined button) | "Let's talk" (outlined button) |
| Styling | No change to button styles — only swap positions and visual weight | Same |

### Primary Metric

- **Total site conversions per homepage session** — measured as the session-level rate of (`whatsapp_cta_clicked` OR `contact_form_submitted`) for users who entered via the homepage. This captures the full downstream effect regardless of which CTA they clicked first.

### Secondary Metrics

- Hero CTA click-through rate (primary vs secondary button)
- Contact page arrival rate from homepage
- Sectors page arrival rate from homepage
- Bounce rate on homepage

### Sample Size Needed

- Baseline homepage conversion rate: ~3%
- MDE: 40% relative lift (3% to 4.2%)
- Required: ~3,400 sessions per variant = ~6,800 total
- **Duration: 3–4 months** at 1,500–2,500 sessions/month

### Implementation

**GTM-based (no code changes).**

1. Create a GTM variable using a random number (1–100) stored in a first-party cookie (`_tadnun_test1`) to persist the assignment across sessions.
2. Use a GTM Custom HTML tag to swap the hero CTA button classes and href attributes on DOM ready for variant users (cookie value 51–100).
3. Fire a `dl_experiment_viewed` dataLayer event with `experiment_id: "hero_cta_v1"` and `variant: "control"` or `"swap"`.
4. Create a GA4 audience segment per variant to measure downstream conversion.

Alternatively, if DOM manipulation feels brittle: implement as a code-based split using a `useExperiment("hero_cta_v1")` hook that reads the cookie and conditionally renders the CTA order. This is cleaner but requires a deploy.

### Expected Impact

- Conservative: +15–25% relative increase in homepage-to-conversion rate
- The variant may increase sector page visits but delay conversion; the control may produce faster but fewer conversions
- Net effect likely modest — the real learning is understanding the audience's readiness level

### Risks

- Small sample size means this test may take months to reach significance
- Mitigate by committing to a fixed runtime (12 weeks) and accepting directional results if significance is not reached

---

## Test 2: Contact Form Field Count — 4 Fields vs 2 Fields

**Priority: 2 (run second)**

### Hypothesis

The current contact form has 4 fields: name, phone/email, sector (dropdown), and message (optional textarea). Moroccan SME owners are busy, often on mobile, and culturally prefer WhatsApp over forms. Reducing the form to just 2 fields (name + WhatsApp number) will significantly increase form completion rate because:
- It mirrors the simplicity of the WhatsApp interaction the page already promotes
- It removes the cognitive load of choosing a sector and composing a message
- The "WhatsApp number" framing (instead of generic "phone or email") is more familiar to the target persona
- Sector and details can be gathered in the follow-up conversation

### Control vs Variant

| Element | Control (current) | Variant |
|---------|-------------------|---------|
| Field 1 | Full name (required) | Full name (required) |
| Field 2 | Phone or email (required, generic placeholder) | WhatsApp number (required, placeholder: `+212 6XX XXX XXX`) |
| Field 3 | Sector dropdown (optional, 9 options) | Removed |
| Field 4 | Message textarea (optional) | Removed |
| Submit button copy | "Get my free consultation" | "Message me on WhatsApp" |
| Trust line | "Free, no commitment. We reply within 24h." | "We'll WhatsApp you within 1 hour." |
| Form height | ~380px | ~200px |

### Primary Metric

- **Form submission rate** — `contact_form_submitted` events / contact page sessions

### Secondary Metrics

- Lead quality score (post-test, manual — did the shorter form produce less qualified leads?)
- WhatsApp CTA click rate (does a simpler form cannibalize WhatsApp clicks or complement them?)
- Total contact page conversion rate (form + WhatsApp combined)
- Time from page load to form submission

### Sample Size Needed

- Baseline form submission rate on contact page: ~8% (estimated — most visitors choose WhatsApp)
- MDE: 50% relative lift (8% to 12%)
- Required: ~1,100 sessions per variant = ~2,200 total
- **Duration: 3–5 months** at 400–800 contact page sessions/month

### Implementation

**Code-based (recommended over GTM for form changes).**

1. Create a utility `getExperimentVariant("form_fields_v1")` that reads/sets a cookie with 50/50 split.
2. In `contact-form.tsx`, conditionally render the 2-field or 4-field version based on variant assignment.
3. Pass `variant: "control"` or `"short"` as a parameter in the `contact_form_submitted` event.
4. Add a new event: `contact_form_started` (fires on first field focus) to measure form engagement rate.
5. The API endpoint `/api/contact` must handle the reduced payload (sector and message become optional/null).

### Expected Impact

- Conservative: +30–50% relative increase in form submission rate
- Risk: lead quality may decrease — the business loses sector pre-qualification and project context
- Net revenue impact depends on whether the sales team can qualify via WhatsApp follow-up (likely yes, given current workflow)

### Risks

- Shorter form may attract lower-intent submissions (tire-kickers)
- Mitigate by tracking lead-to-call conversion rate post-test
- If quality drops significantly, consider a middle ground: 3 fields (name, WhatsApp, sector)

---

## Test 3: Sector Page CTA Copy — Generic vs Sector-Specific

**Priority: 3 (run third)**

### Hypothesis

The bottom-of-page CTA on each sector page currently uses generic copy: "Ready to transform your business?" with a "CONTACT US" button. This copy doesn't leverage the sector context the user just spent time reading. Sector-specific CTA copy that mirrors the exact pain point and solution language from that page will feel more relevant and convert at a higher rate because:
- It maintains the momentum of the page narrative (pain → solution → specific action)
- It signals that Tadnun actually understands THIS sector, not just "business" in general
- The specificity reduces perceived risk ("they know my industry")

### Control vs Variant

| Element | Control (current, all sectors) | Variant (per-sector, examples below) |
|---------|-------------------------------|--------------------------------------|
| **CTA heading** | "Ready to transform your business?" | Agriculture: "Ready to stop losing export contracts?" |
| | | Restaurants: "Ready to fill those empty Tuesday tables?" |
| | | Tourism: "Ready to stop paying 20% to Booking.com?" |
| | | Healthcare: "Ready to eliminate patient no-shows?" |
| | | Retail: "Ready to know your real margins?" |
| | | Education: "Ready to end the WhatsApp chaos with parents?" |
| | | Real Estate: "Ready to never lose a lead again?" |
| | | Logistics: "Ready to stop answering 'where's my package?'" |
| **CTA description** | "First discovery call is free. No commitment." | Agriculture: "We've helped cooperatives achieve 0 export rejections. Let's see what's possible for yours." |
| | | Restaurants: "We've helped restaurants get 40% more customers via Google. 15 minutes to see if we can do the same for you." |
| | | (Pattern: proof point from that sector + low-commitment offer) |
| **Button text** | "CONTACT US" | "Book my free {sector} diagnostic" |
| **Secondary button** | "Our approach" | Unchanged |

### Primary Metric

- **Sector page CTA click-through rate** — clicks on the bottom CTA / sector page sessions

### Secondary Metrics

- Contact page arrival rate from sector pages
- Total conversion rate for sector page visitors (form + WhatsApp)
- Per-sector CTA performance (identify which sectors respond most to specificity)

### Sample Size Needed

- Baseline CTA click rate on sector pages: ~5% (estimated)
- MDE: 50% relative lift (5% to 7.5%)
- Required: ~2,600 sessions per variant = ~5,200 total across all sector pages combined
- **Duration: 4–6 months** at 800–1,500 sector page sessions/month

### Implementation

**Code-based.**

1. Add new translation keys per sector: `sectorPage.ctaTitleSpecific.{sectorKey}`, `sectorPage.ctaDescSpecific.{sectorKey}`, `sectorPage.ctaButtonSpecific.{sectorKey}` in all 3 language files.
2. In the sector page component, use the experiment variant cookie to choose between `ctaTitle` (generic) and `ctaTitleSpecific.{sectorKey}` (specific).
3. Fire `sector_cta_clicked` event with `sector`, `variant`, and `cta_type: "bottom"` parameters.
4. Track downstream conversion (contact page visit + actual form/WhatsApp conversion).

### Expected Impact

- Conservative: +25–40% relative increase in CTA click-through rate
- Likely varies by sector — sectors with strong emotional pain points (agriculture export risk, tourism commission bleed) will see the biggest lift
- This test also generates learnings about which pain-point framings resonate most per sector

### Risks

- Requires 24 new translation strings (8 sectors x 3 languages) — significant content effort
- Start with French only (primary language) and expand if results are positive
- Generic copy is "safe" — if sector-specific copy is poorly written, it could underperform

---

## Test 4: Social Proof Stats Bar Position

**Priority: 4 (run fourth)**

### Hypothesis

The social proof stats bar (150+ businesses, 8 sectors, 99.9% uptime, 24h response) currently sits below the sectors grid on the homepage — after significant scrolling. Moving it directly below the hero (above the fold on desktop, just below on mobile) will increase trust earlier in the visit and improve the hero CTA click-through rate because:
- First-time visitors from Morocco have high skepticism about digital services ("is this real?")
- The stats answer the implicit question "has anyone actually used this?" before the visitor commits to scrolling
- Social proof placed near the primary CTA has consistently shown conversion lifts in B2B contexts

### Control vs Variant

| Element | Control (current) | Variant |
|---------|-------------------|---------|
| Stats bar position | After sectors grid (3rd section on page) | Directly below the hero section (1st section after hero) |
| Stats bar content | Unchanged (150+ clients, 8 sectors, 99.9% uptime, 24h support) | Unchanged |
| Stats bar styling | Unchanged (`border-y border-border bg-surface/30`) | Unchanged |
| Sectors grid | Appears after stats bar | Appears in place where stats bar used to be |

### Primary Metric

- **Homepage-to-contact-page navigation rate** — sessions that reach `/contact` from the homepage

### Secondary Metrics

- Hero CTA click-through rate
- Scroll depth on homepage (does earlier social proof encourage deeper engagement or satisfy curiosity?)
- Bounce rate
- Time on page

### Sample Size Needed

- Baseline homepage-to-contact rate: ~15% (estimated)
- MDE: 20% relative lift (15% to 18%)
- Required: ~3,500 sessions per variant = ~7,000 total
- **Duration: 3–5 months** at 1,500–2,500 sessions/month

### Implementation

**GTM-based (DOM reordering) or code-based.**

GTM approach:
1. Use a Custom HTML tag to move the stats bar `<section>` node to appear directly after the hero section in the DOM.
2. Fire `dl_experiment_viewed` with `experiment_id: "stats_position_v1"`.

Code-based approach (preferred for layout shifts):
1. In `src/app/[locale]/page.tsx`, use the experiment cookie to conditionally render the stats section either after the hero or after the sectors grid.
2. This avoids layout shift / flash-of-original-content issues that the GTM approach may cause.

### Expected Impact

- Conservative: +10–15% relative increase in homepage-to-contact navigation
- This is a positional change, not a content change — the ceiling for impact is lower
- But for a trust-deficit audience (Moroccan SME owners skeptical of digital agencies), early social proof matters more than in typical Western B2B

### Risks

- Moving the stats bar up could break the narrative flow: hero (what we do) → sectors (for whom) → proof (why trust us)
- The variant order — hero → proof → sectors — front-loads trust but delays relevance
- If the test is neutral, it confirms the current narrative order is fine

---

## Test 5: Contact Page — WhatsApp vs Form Prominence

**Priority: 5 (run fifth)**

### Hypothesis

The current contact page layout gives WhatsApp strong above-the-fold prominence (hero-level placement with the green CTA button) and pushes the form below the fold under a "Send a written message" heading. This is a deliberate WhatsApp-first design. However, some visitors — particularly those arriving from Google search, those in a research mindset, or those who prefer asynchronous communication — may convert better with the form more prominent. Testing a layout where both options have equal visual weight above the fold will reveal the true preference split and may capture conversions currently lost to the fold.

### Control vs Variant

| Element | Control (current) | Variant |
|---------|-------------------|---------|
| **Above the fold** | WhatsApp CTA (hero-level, with chat preview visual) | Two-column layout: Left = WhatsApp CTA with brief description, Right = Inline contact form (compact, 2–3 fields) |
| **Hero headline** | "One WhatsApp message, and we're off." | "Choose how you'd like to connect." |
| **WhatsApp CTA** | Primary, hero-sized green button | Equal-weight green button in left column |
| **Contact form** | Below fold, under "Send a written message" | Above fold, in right column, equal visual weight |
| **Chat preview** | Large visual on right side of hero | Removed (space given to form) |
| **Process steps** | Below hero | Below the two-column CTA area |
| **Secondary channels** | Email/phone cards below form | Condensed into a single line below both options |

### Primary Metric

- **Total contact page conversion rate** — (`whatsapp_cta_clicked` + `contact_form_submitted`) / contact page sessions

### Secondary Metrics

- WhatsApp click rate (does it decrease when sharing space with the form?)
- Form submission rate (does above-fold placement increase it?)
- Channel preference split (what % chooses WhatsApp vs form?)
- Conversion by traffic source (organic search vs. direct vs. sector page referral)

### Sample Size Needed

- Baseline total contact page conversion rate: ~25% (WhatsApp + form combined, estimated)
- MDE: 20% relative lift (25% to 30%)
- Required: ~1,700 sessions per variant = ~3,400 total
- **Duration: 5–8 months** at 400–800 contact page sessions/month

### Implementation

**Code-based (required — significant layout change).**

1. Create `contact-page-variant.tsx` as an alternative layout component.
2. In `src/app/[locale]/contact/page.tsx`, use the experiment cookie to render either the current layout or the variant.
3. Both variants must work in all 3 languages and pass RTL testing.
4. Ensure both variants fire the same events (`whatsapp_cta_clicked`, `contact_form_submitted`) with a `layout_variant` parameter.
5. Add `contact_page_scroll_depth` event to understand if the current below-fold form is even seen.

### Expected Impact

- Conservative: +10–20% relative increase in total contact page conversion rate
- The variant may redistribute conversions from WhatsApp to form without increasing total — which is still a useful learning
- The variant may particularly help non-Moroccan visitors (diaspora, international partners) who are less WhatsApp-native

### Risks

- This is the most complex test to implement (new layout, RTL, 3 languages)
- It requires the most traffic to reach significance
- The current WhatsApp-first design is a strong brand statement — diluting it may hurt brand perception even if conversions rise slightly
- Consider running this test last, after the simpler tests have produced learnings

---

## Run Order and Timeline

| Test | Priority | Traffic source | Est. duration | Dependencies |
|------|----------|---------------|---------------|--------------|
| 1. Hero CTA hierarchy | 1 | Homepage | 12 weeks | None |
| 2. Form field count | 2 | Contact page | 12–16 weeks | None (can run in parallel with Test 1 — different pages) |
| 3. Sector CTA copy | 3 | Sector pages | 16–24 weeks | Translation content needed first |
| 4. Stats bar position | 4 | Homepage | 12–16 weeks | Must run AFTER Test 1 concludes (same page) |
| 5. WhatsApp vs form layout | 5 | Contact page | 20–32 weeks | Must run AFTER Test 2 concludes (same page) |

**Parallelization:** Tests 1 and 2 can run simultaneously (different pages, no interaction). Test 3 can also run in parallel with 1 and 2 (different pages). Tests 4 and 5 must wait for their respective page's prior test to conclude.

**Realistic timeline to complete all 5:** ~9–12 months, given traffic levels.

---

## Shared Infrastructure Needed

Before running any test, set up the following:

### 1. Experiment Assignment Cookie

A utility function that:
- Generates a 50/50 split on first visit
- Stores the assignment in a first-party cookie (`_tadnun_exp_{id}`) with 90-day expiry
- Returns `"control"` or `"variant"` consistently for the same user
- Works server-side (for SSG pages) or client-side

### 2. Experiment Tracking Events

Standard dataLayer events for all tests:
- `experiment_viewed` — fires on page load with `experiment_id` and `variant`
- `experiment_converted` — fires on conversion with `experiment_id` and `variant`
- Map these to GA4 custom dimensions in GTM

### 3. GA4 Reporting

- Create a Looker Studio dashboard or GA4 Explore report per active experiment
- Track: variant, sessions, conversions, conversion rate, and statistical significance
- Use a Bayesian significance calculator (or the GA4 built-in comparison if available)

### 4. Kill Switch

- A simple mechanism to force all users to a specific variant if a test is clearly harmful
- Can be as simple as a URL parameter override (`?force_variant=control`) or a Vercel environment variable

---

## Success Criteria

A test is considered successful if:
1. It reaches 95% statistical significance (p < 0.05), OR
2. It runs for the full planned duration and shows a consistent directional trend (>80% probability of being better)

After each test:
- Document results in this file
- Ship the winning variant as the new default
- Update translation files and component code to remove the experiment branching
- Share learnings with the team before designing the next test

---

## Results Log

*(To be filled as tests complete)*

| Test | Start | End | Winner | Lift | Confidence | Notes |
|------|-------|-----|--------|------|------------|-------|
| 1 | — | — | — | — | — | — |
| 2 | — | — | — | — | — | — |
| 3 | — | — | — | — | — | — |
| 4 | — | — | — | — | — | — |
| 5 | — | — | — | — | — | — |
