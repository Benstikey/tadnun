# Pricing Communication Strategy

*Last updated: 2026-03-27*

## Context

Tadnun has moved from fixed tiers (299/999/2999 MAD/month) to fully custom pricing per project. The translation files (`en.json`, `fr.json`, `ar.json`) still contain the legacy tier structure. The target audience is price-sensitive Moroccan SMEs with <20 employees, where the decision-maker is usually the owner.

**Core pricing tension:** Custom pricing is better for the business (higher margins, right-sized deals) but worse for the buyer's initial comfort (they want a number before they commit to a conversation). The strategy must resolve this tension by making the conversation feel low-risk and the value feel high.

---

## 1. How to Present Custom Pricing on the Website

### 1.1 Value Anchoring Framework

The website already contains powerful cost-of-inaction figures. These must be deployed *before* any pricing discussion to reframe the buyer's mental math.

**Principle:** Never let the buyer's first question be "how much does it cost?" Make their first thought "how much am I losing?"

**Anchor figures already in the content (use aggressively):**

| Pain point | Cost of inaction | Where to deploy |
|------------|-----------------|-----------------|
| Missed ONSSA traceability | 400,000 MAD lost contract | Homepage sectors, agriculture sector page |
| Booking.com commissions | 300,000 MAD/year | Homepage sectors, hospitality sector page |
| Patient no-shows | 2,000 MAD/day (730,000 MAD/year) | Healthcare sector page |
| Food waste | 15-20% weekly revenue | Restaurant sector page |
| Invisible Google presence | Incalculable (tourists walk past) | All sectors |

**Recommended value anchoring copy pattern:**

> "Your digitalization costs less than what you lose in a single month of [specific pain]."

Sector-specific versions:
- Agriculture: "Costs less than one rejected export shipment."
- Hospitality: "Costs less than two months of Booking.com commissions."
- Healthcare: "Costs less than a week of no-show patients."
- Restaurants: "Costs less than a month of food waste."

### 1.2 "Starting From" Signals vs Pure Custom

**Recommendation: Use "adapted to your size" language, not "starting from."**

Reasons:
- "Starting from" with no anchor number creates anxiety ("starting from what?")
- "Starting from" with a number (e.g., 299 MAD) attracts the wrong leads who want the cheapest option and are disappointed when the real price is higher
- "Adapted to your size" signals custom pricing while promising fairness and accessibility

**Replacement language hierarchy:**

| Instead of | Use |
|-----------|-----|
| "Plans starting at 299 MAD/month" | "Pricing adapted to your business size and needs" |
| "Clear pricing, no surprises" | "Transparent pricing, built around your business" |
| Fixed tier cards | Process explanation + trust signals |
| "First month free" | "Free 15-minute discovery call" |

### 1.3 ROI Framing

Every pricing touchpoint should include a concrete ROI comparison. Format:

> "[Tadnun solution] typically costs less than [thing they're already losing]."

**Never state a generic ROI percentage.** Always use sector-specific MAD figures from the product marketing context. The audience responds to concrete Moroccan dirhams, not percentages.

**ROI framing templates by sector:**

- "A cooperative of 50 members loses more in payment disputes per season than our entire solution costs for a year."
- "Your annual Booking.com commissions would pay for Tadnun 10x over."
- "5 no-show patients per day costs you more per month than a complete clinic management system."

### 1.4 Request-a-Quote Flow Optimization

The current contact flow is already well-designed (WhatsApp-first, <1h response, 15-min call, 48h proposal). Optimize it for pricing conversations:

**Current flow (keep):**
1. WhatsApp message or form submission
2. Reply in <1h
3. Free 15-min discovery call
4. Custom proposal within 48h

**Enhancements:**

1. **Rename "Request a quote"** to **"Get your free consultation"** or **"Book a free diagnostic"**
   - "Quote" implies the conversation is about price. "Consultation" implies it's about value.
   - The Arabic CTA "اطلب عرض الأسعار" (request a price offer) should become something like "احصل على استشارة مجانية" (get a free consultation)

2. **Add a pre-qualification question in the form:** "What's your biggest daily challenge?" (already partially there in `formMessage`)
   - This shifts the conversation from "how much?" to "what problem?" before any price discussion

3. **Post-form success message** should reinforce the value conversation:
   - Current: "We'll get back to you within 24h."
   - Better: "We'll get back to you within 24h with a plan tailored to your business. No generic packages."

4. **WhatsApp prefill messages** should lead with the problem:
   - Current: "Hi, I'm interested in digitalizing my business."
   - Better: "Hi, I'd like to understand how Tadnun can help my [sector] business. When can we talk?"

---

## 2. Pricing Page Recommendations

### 2.1 Should There Be a Pricing Page?

**Recommendation: No dedicated pricing page. Replace with a "How It Works" section on the homepage and a strong contact/consultation flow.**

Reasons:
- A pricing page with no numbers frustrates visitors and increases bounce
- A pricing page with "starting from" numbers attracts the wrong leads
- A pricing page with ranges is misleading when projects vary wildly (a Google listing vs a full ERP integration)
- The current site architecture (homepage with sections + sector pages + contact) already handles the conversion journey well

**What to do instead:**

Replace the current `pricing` section on the homepage with a **"How We Work"** or **"Your Investment"** section that covers:

1. **Process transparency** (what they get, not what it costs)
2. **Trust signals** (no hidden fees, DGI-compliant invoicing, no lock-in)
3. **Social proof** (150+ businesses, concrete results)
4. **Clear next step** (free consultation CTA)

### 2.2 What to Show in the Replacement Section

**Section structure (replaces the 3-tier pricing cards):**

```
Eyebrow: YOUR INVESTMENT
Title: Every dirham goes to solving your real problems
Subtitle: No generic packages. We build exactly what your business needs — nothing more, nothing less.

[3 cards — not tiers, but value pillars]

Card 1: "Built for your size"
- We adapt to businesses of 1 person or 50. Your solution matches your reality.
- 80% of our clients have fewer than 20 employees.

Card 2: "No hidden fees"
- The price we agree on is the price you pay. DGI-compliant invoice with every payment.
- Bank transfer or CMI card. Your choice.

Card 3: "No lock-in"
- Cancel anytime. Your data is yours — exported in standard format.
- We earn your trust every month.

[Cost-of-inaction callout]
"What it really costs to stay analog:"
- 400,000 MAD in lost export contracts
- 300,000 MAD/year in commissions sent abroad
- 2,000 MAD/day in empty appointment slots

[CTA]
"Book your free 15-minute consultation"
"We'll tell you honestly whether we can help — and exactly how."
```

### 2.3 Trust Signals Specific to Pricing

These are critical for Moroccan SME owners who have been burned by hidden costs and vague promises:

| Trust signal | Why it matters | Where to place |
|-------------|---------------|----------------|
| "DGI-compliant invoicing" | Moroccan businesses need legitimate invoices for tax deductions | Pricing section, FAQ |
| "No hidden fees — the price we quote is the price you pay" | Direct response to fear of surprise charges | Pricing section, proposal |
| "Cancel anytime, no lock-in" | Fear of being trapped is the #2 objection | Pricing section, FAQ |
| "Your data is yours" | Reduces switching anxiety | FAQ, pricing section |
| "150+ businesses already trust us" | Social proof reduces perceived risk | Near every CTA |
| "Bank transfer or CMI card" | Shows established payment infrastructure | FAQ |
| "Custom proposal within 48h" | Shows professionalism and speed | Contact page, pricing section |

### 2.4 Competitor Price Anchoring

Use competitor pricing to make Tadnun feel like a bargain — without naming specific prices (which may change and create liability).

**Positioning copy:**

> "Foreign SaaS tools like HubSpot or Zoho charge $50-200/user/month — in dollars, not dirhams. They don't speak Darija, don't integrate with CMI, and don't send anyone to train your team."

> "Odoo integrators in Morocco charge enterprise prices for enterprise software. You don't need 200 modules — you need the 5 that actually solve your problem."

> "A local web agency will build you a website. But a website doesn't automate your bookings, manage your stock, or send follow-up messages. We do both."

**Where to deploy:**
- About page "Why Tadnun" section (already partially there in `differenceBody`)
- FAQ: "Why not use HubSpot/Odoo?" (new FAQ item)
- Sector pages: competitor comparison per sector

**Specific anchoring by competitor:**

| Competitor | Their cost (approximate) | Tadnun framing |
|-----------|------------------------|----------------|
| HubSpot CRM | $50-200/user/month (~500-2,000 MAD/user) | "Enterprise pricing for tools that don't even work in Darija" |
| Odoo + integrator | 50,000-200,000 MAD setup + monthly | "Designed for factories, not a 15-table restaurant" |
| Booking.com | 15-20% commission per booking | "You're paying 300,000 MAD/year for a middleman" |
| Local web agency | 5,000-15,000 MAD one-time | "A website is not digitalization" |

---

## 3. Objection Handling for Price

### 3.1 "I can't afford it"

**Root cause:** They're comparing Tadnun's price to their available cash, not to the money they're already losing.

**Response framework (for sales conversations and website copy):**

Step 1 — Validate: "Budget matters. We built Tadnun specifically for businesses your size."

Step 2 — Reframe: "Can I share what we've seen? Most of our clients were already spending more on their problem than our solution costs."

Step 3 — Sector-specific example:
- "Your Booking.com commissions are 300,000 MAD/year. Even reducing them by half pays for Tadnun many times over."
- "If you lose one export contract — 400,000 MAD — that's more than a full year of our solution."
- "5 no-show patients per day at 400 MAD each is 2,000 MAD daily. Our system costs a fraction of that."

Step 4 — De-risk: "And there's no long-term commitment. If it doesn't work, you stop. No questions asked."

**Website copy version (for FAQ or pricing section):**

> "Tadnun is an investment, not an expense. Our clients typically save — or earn — more in the first month than the solution costs. And with no lock-in, you're never stuck."

### 3.2 "How much does it cost?"

**Root cause:** Perfectly natural question. The buyer wants to qualify whether this is even in their range before investing time.

**Response framework:**

Step 1 — Acknowledge: "Great question. I want to give you an honest answer, not a vague one."

Step 2 — Explain why custom: "Every business is different. A Google listing setup is different from a full CRM with inventory management. I don't want to quote you 5,000 MAD and then surprise you with 15,000, or quote 15,000 when your real need is 5,000."

Step 3 — Give a process anchor: "Here's what I can tell you: after our 15-minute call, I'll send you a detailed proposal within 48 hours with exact pricing — no surprises, no negotiation games."

Step 4 — Reassure on range: "What I can say is that 80% of our clients are SMEs with fewer than 20 employees. We don't build enterprise solutions at enterprise prices."

**Do NOT say:** "It depends." This feels evasive. Always explain *why* it depends and what the next step is.

### 3.3 "Why can't you just tell me the price?"

**Root cause:** They suspect you're hiding something. Or they've been burned by companies that quote one number and charge another.

**Response framework:**

Step 1 — Empathize: "I get it. I'd want to know too. Here's why we do it this way."

Step 2 — Honest explanation: "If we posted a fixed price, we'd have to either overcharge small businesses to cover complex projects, or underdeliver on complex projects to meet a low price. Neither is fair."

Step 3 — Transparency commitment: "Here's our promise: one 15-minute call, and within 48 hours you'll have a detailed written proposal with exact pricing. No follow-up sales calls, no pressure. If the price doesn't work, no hard feelings."

Step 4 — Proof: "150+ businesses have been through this process. We keep it simple because we know your time is valuable."

**Website copy version (for FAQ):**

> "Because your business isn't like anyone else's. A one-size-fits-all price would mean you either pay for features you don't need, or don't get the ones you do. One short call and we'll send you an exact, detailed quote within 48h. Simple as that."

---

## 4. Translation File Cleanup

### 4.1 What to Do with Existing Tier Content

The `pricing` section (keys `pricing.tiers.starter`, `pricing.tiers.pro`, `pricing.tiers.premium`) in all three translation files must be replaced entirely. The tier structure with 299/999/2999 MAD is no longer accurate and creates false expectations.

**Files affected:**
- `src/messages/en.json` — lines 188-234 (pricing section)
- `src/messages/fr.json` — lines 188-234 (pricing section)
- `src/messages/ar.json` — lines 188-234 (pricing section)

**Also update:**
- `home.guarantees.price.body` (lines ~152-155 in all files) — remove "299 MAD/month" / "299 DH/mois" reference
- `faq.items.q6` (lines ~268-269 in all files) — update "monthly or annual plans" language
- `faq.items.q4.answer` (lines ~261 in all files) — keep, but ensure "pricing" reference stays generic

### 4.2 Replacement Copy

**English (`en.json`) — pricing section replacement:**

```json
"pricing": {
  "eyebrow": "05",
  "title": "Your investment, built around your business",
  "subtitle": "No generic packages. Every solution is sized to your needs, your sector, and your team.",
  "pillars": {
    "tailored": {
      "icon": "📐",
      "title": "Built for your size",
      "body": "80% of our clients have fewer than 20 employees. We adapt our solutions and pricing to match your reality — not the other way around."
    },
    "transparent": {
      "icon": "📄",
      "title": "No hidden fees",
      "body": "The price we agree on is the price you pay. DGI-compliant invoice with every payment. Bank transfer or CMI card."
    },
    "flexible": {
      "icon": "🔓",
      "title": "No lock-in",
      "body": "Cancel anytime. Your data is yours and we export it in standard format. We earn your trust every month."
    }
  },
  "costOfInaction": {
    "title": "What staying analog really costs",
    "items": {
      "contracts": { "value": "400K MAD", "label": "lost in one missed log entry" },
      "commissions": { "value": "300K MAD/yr", "label": "sent abroad in commissions" },
      "noshows": { "value": "2,000 MAD/day", "label": "in empty appointment slots" }
    }
  },
  "process": {
    "title": "How it works",
    "step1": "Free 15-min call to understand your needs",
    "step2": "Detailed proposal with exact pricing within 48h",
    "step3": "You decide — no pressure, no follow-up sales calls"
  },
  "cta": "Book your free consultation",
  "note": "150+ businesses have already taken this step."
}
```

**French (`fr.json`) — pricing section replacement:**

```json
"pricing": {
  "eyebrow": "05",
  "title": "Votre investissement, construit autour de votre activite",
  "subtitle": "Pas de formule generique. Chaque solution est dimensionnee a vos besoins, votre secteur et votre equipe.",
  "pillars": {
    "tailored": {
      "icon": "📐",
      "title": "Adapte a votre taille",
      "body": "80% de nos clients ont moins de 20 employes. On adapte nos solutions et nos tarifs a votre realite — pas l'inverse."
    },
    "transparent": {
      "icon": "📄",
      "title": "Pas de frais caches",
      "body": "Le prix convenu est le prix que vous payez. Facture conforme DGI a chaque paiement. Virement bancaire ou carte CMI."
    },
    "flexible": {
      "icon": "🔓",
      "title": "Sans engagement",
      "body": "Arretez quand vous voulez. Vos donnees vous appartiennent et on vous les exporte en format standard. On merite votre confiance chaque mois."
    }
  },
  "costOfInaction": {
    "title": "Ce que ca coute vraiment de rester au papier",
    "items": {
      "contracts": { "value": "400K MAD", "label": "perdus pour un seul oubli de traçabilite" },
      "commissions": { "value": "300K MAD/an", "label": "envoyes a l'etranger en commissions" },
      "noshows": { "value": "2 000 MAD/jour", "label": "en rendez-vous manques" }
    }
  },
  "process": {
    "title": "Comment ca marche",
    "step1": "Appel gratuit de 15 min pour comprendre vos besoins",
    "step2": "Proposition detaillee avec tarif exact sous 48h",
    "step3": "Vous decidez — sans pression, sans relance commerciale"
  },
  "cta": "Reserver ma consultation gratuite",
  "note": "150+ entreprises ont deja franchi le pas."
}
```

**Arabic/Darija (`ar.json`) — pricing section replacement:**

```json
"pricing": {
  "eyebrow": "05",
  "title": "الاستثمار ديالك، مبني على النشاط ديالك",
  "subtitle": "بلا عروض جاهزة. كل حل مصمم على قد الاحتياجات ديالك، القطاع ديالك والفريق ديالك.",
  "pillars": {
    "tailored": {
      "icon": "📐",
      "title": "مكيّف على حجمك",
      "body": "80% ديال الزبائن ديالنا عندهم أقل من 20 خدّام. كنكيّفو الحلول والأثمنة على حسب الواقع ديالك — ماشي العكس."
    },
    "transparent": {
      "icon": "📄",
      "title": "بلا مصاريف مخبية",
      "body": "الثمن اللي كنتفقو عليه هو الثمن اللي كتخلص. فاتورة مطابقة لـ DGI مع كل خلاص. تحويل بنكي ولا بطاقة CMI."
    },
    "flexible": {
      "icon": "🔓",
      "title": "بلا التزام",
      "body": "وقف إمتى ما بغيتي. البيانات ديالك هي ديالك وكنصدّروها ليك بصيغة معيارية. كنستحقو الثقة ديالك كل شهر."
    }
  },
  "costOfInaction": {
    "title": "شحال كيكلّفك البقاء في الورق",
    "items": {
      "contracts": { "value": "400 ألف درهم", "label": "خاسرين بسبب نسيان وحدة في التتبع" },
      "commissions": { "value": "300 ألف درهم/عام", "label": "مصيفطة لبرّا في العمولات" },
      "noshows": { "value": "2,000 درهم/نهار", "label": "في مواعيد فارغة" }
    }
  },
  "process": {
    "title": "كيفاش كتمشي",
    "step1": "مكالمة مجانية 15 دقيقة باش نفهمو الاحتياجات ديالك",
    "step2": "عرض مفصّل بالثمن الدقيق خلال 48 ساعة",
    "step3": "نتا اللي كتقرر — بلا ضغط، بلا متابعة تجارية"
  },
  "cta": "احجز الاستشارة المجانية ديالك",
  "note": "كثر من 150 مقاولة دازو من هاد الخطوة."
}
```

**Guarantees section update (`home.guarantees.price.body`):**

| Language | Current | Replacement |
|----------|---------|-------------|
| EN | "Plans starting at 299 MAD/month. No hidden fees, no surprises..." | "Pricing adapted to your business size. No hidden fees, no surprises. We believe digitalization should be accessible, not reserved for big companies." |
| FR | "Des formules a partir de 299 DH/mois. Pas de frais caches..." | "Tarification adaptee a la taille de votre entreprise. Pas de frais caches, pas de surprise. On croit que la digitalisation doit etre accessible, pas reservee aux grandes entreprises." |
| AR | "عروض ابتداءً من 299 درهم/الشهر..." | "أثمنة مكيّفة على حجم المقاولة ديالك. بلا مصاريف مخبية، بلا مفاجآت. كنؤمنو بأن الرقمنة خاصها تكون في المتناول، ماشي محجوزة للشركات الكبيرة." |

**FAQ Q6 update (`faq.items.q6`):**

| Language | Current | Replacement |
|----------|---------|-------------|
| EN | "How does pricing work?" / "Bank transfer or CMI card. Monthly or annual plans (2 months free on annual)..." | "How does pricing work?" / "Every project gets a custom proposal based on your specific needs. We send you exact pricing within 48h of our first call — no guessing, no surprises. Payment by bank transfer or CMI card. DGI-compliant invoice with every payment." |
| FR | "Comment fonctionne la tarification ?" / "Par virement bancaire ou carte CMI. Mensuel ou annuel..." | "Comment fonctionne la tarification ?" / "Chaque projet recoit une proposition sur mesure basee sur vos besoins specifiques. On vous envoie un tarif exact sous 48h apres notre premier appel — pas de devinette, pas de surprise. Paiement par virement bancaire ou carte CMI. Facture conforme DGI a chaque paiement." |
| AR | "كيفاش كتمشي الأثمنة؟" / "بالتحويل البنكي ولا بالبطاقة CMI. شهري ولا سنوي..." | "كيفاش كتمشي الأثمنة؟" / "كل مشروع كياخذ عرض مخصص على حسب الاحتياجات ديالك. كنسيفطو ليك الثمن الدقيق خلال 48 ساعة من أول مكالمة — بلا تخمين، بلا مفاجآت. الخلاص بالتحويل البنكي ولا بالبطاقة CMI. فاتورة مطابقة لـ DGI مع كل خلاص." |

### 4.3 Navigation Update

The nav link labeled "Pricing" / "Tarification" / "الأثمنة" (currently in `faq.categories.pricing`) should be:
- **Keep as a FAQ category label** — pricing questions are still valid FAQ items
- **Do NOT create a standalone /pricing route** — there is no pricing page
- If there's a nav link pointing to a pricing section, redirect it to the homepage investment section or the contact page

---

## 5. Sales Process Pricing

### 5.1 Discovery Call to Proposal Timeline

```
Day 0: First contact (WhatsApp or form)
       └─ Reply within 1 hour (during business hours)
       └─ Book 15-min discovery call

Day 1-2: Discovery call (15 minutes)
         └─ Understand: sector, team size, current tools, main pain points
         └─ Understand: budget expectations (ask "what range feels comfortable?")
         └─ Qualify: is this a fit? Be honest if not.
         └─ Set expectation: "I'll send you a detailed proposal within 48 hours"

Day 2-4: Custom proposal delivered (within 48h of call)
         └─ Sent via email + WhatsApp PDF

Day 4-7: Follow-up
         └─ One WhatsApp message: "Did you have a chance to review? Happy to clarify anything."
         └─ If no response in 7 days: one final follow-up
         └─ If still no response: archive, do not chase further
```

### 5.2 What to Include in Proposals

**Proposal structure (1-2 pages max — these are SME owners, not procurement committees):**

1. **Their Problem (1 paragraph)**
   - Restate what they told you in the discovery call
   - Use their exact words when possible
   - Show you listened

2. **What We'll Build (bullet list)**
   - Specific deliverables, no jargon
   - For each item: what it replaces (paper process, manual step)
   - Integrations included (CMI, WhatsApp, ONSSA, etc.)

3. **Timeline**
   - Start date
   - Key milestones
   - Go-live date
   - "You validate at each step"

4. **Investment (the price)**
   - Total project price
   - Payment structure (see 5.3)
   - What's included: setup, training, first X months of support
   - What's NOT included (be explicit — builds trust)

5. **Trust Signals**
   - "150+ businesses served"
   - 1-2 relevant testimonials from the same sector
   - "No lock-in — cancel anytime after go-live"
   - "DGI-compliant invoice with every payment"

6. **Next Step**
   - "Reply 'OK' on WhatsApp and we start [date]"
   - Make accepting as easy as possible

**Do NOT include:**
- Multi-page technical specs (save for after they say yes)
- Comparison tables against competitors (feels defensive)
- More than one pricing option (decision fatigue — recommend one solution)
- "Terms and conditions" legalese (send separately if needed)

### 5.3 Payment Structure Recommendations

**For projects under 10,000 MAD:**
- 100% upfront before work begins
- Or: 50% upfront, 50% at delivery

**For projects 10,000-30,000 MAD:**
- 40% upfront (to start)
- 30% at midpoint milestone (e.g., staging site ready)
- 30% at go-live

**For projects over 30,000 MAD:**
- 30% upfront
- 30% at midpoint
- 20% at go-live
- 20% after 30 days of live operation (builds trust)

**Ongoing support/hosting:**
- Monthly billing (not annual — reduces commitment anxiety for price-sensitive SMEs)
- Annual billing offered as optional with a modest discount (1 month free, not 2 — the old "2 months free" was too aggressive for a custom pricing model)
- Auto-renewal with 30-day cancellation notice

**Payment methods:**
- Bank transfer (primary — most Moroccan SMEs prefer this)
- CMI card (secondary)
- No cash payments (creates accounting/compliance issues)

**Invoicing:**
- DGI-compliant invoice for every payment
- Invoice sent before or with payment request (not after)
- Include ICE number, company details, and clear line items

---

## 6. Implementation Priority

| Priority | Action | Effort | Impact |
|----------|--------|--------|--------|
| P0 | Update `guarantees.price.body` in all 3 translation files (remove 299 MAD reference) | 15 min | Eliminates false pricing signal |
| P0 | Update `faq.items.q6` in all 3 translation files (remove tier references) | 15 min | Aligns FAQ with reality |
| P1 | Replace `pricing` section in all 3 translation files with new structure | 2-3 hrs | Core messaging change |
| P1 | Update the pricing component to render pillars instead of tier cards | 3-4 hrs | UI implementation |
| P1 | Update `pricing.cta` and `pricing.note` in all 3 files | 15 min | CTA alignment |
| P2 | Add competitor comparison FAQ item in all 3 files | 30 min | Competitor anchoring |
| P2 | Update WhatsApp prefill messages to lead with problem | 15 min | Better lead qualification |
| P2 | Create proposal template (Google Docs or Notion) | 2 hrs | Sales process |
| P3 | Add cost-of-inaction callouts to individual sector pages | 2-3 hrs | Sector-specific value anchoring |
| P3 | A/B test "Book consultation" vs "Request a quote" CTA text | 1 hr setup | Conversion optimization |

---

## 7. Key Principles Summary

1. **Always anchor against loss, never against competitors' prices.** The buyer should think "I'm losing 300K MAD/year" before they think "this costs X MAD."

2. **Custom pricing is a feature, not a limitation.** Frame it as "we don't make you pay for what you don't need" rather than "we can't tell you the price."

3. **Speed eliminates objections.** The 48h proposal timeline is Tadnun's pricing superpower. Most competitors take weeks. Keep this promise sacred.

4. **DGI compliance is a trust signal, not a footnote.** For Moroccan SME owners, a proper invoice means legitimacy. Mention it early and often.

5. **Never hide behind "it depends."** Always explain why it varies and what the concrete next step is to get an exact number.

6. **One call, one proposal, one price.** Don't offer multiple tiers in the proposal. Recommend the right solution and stand behind it.

7. **The WhatsApp channel is the pricing conversation.** Most Moroccan SME owners will ask about price via WhatsApp before filling out a form. Train for this.
