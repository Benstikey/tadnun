# Post-Contact Email Nurture Sequence

*Last updated: 2026-03-27*

---

## 1. Sequence Architecture

### Flow Overview

```
FORM SUBMISSION (Day 0)
  |
  v
[Email 1] Confirmation + What Happens Next        ── Day 0 (immediate)
  |
  v
[Email 2] Sector-Specific Pain Point Mirror        ── Day 1
  |
  v
[Email 3] Social Proof — Testimonial + ROI         ── Day 3
  |
  v
[Email 4] Before/After — What Actually Changes     ── Day 5
  |
  v
[Email 5] Objection Killer (FAQ-based)             ── Day 8
  |
  v
[Email 6] Urgency — 2030 + Competitors             ── Day 11
  |
  v
[Email 7] Final Nudge — Direct Offer               ── Day 14
  |
  v
END OF SEQUENCE
  |
  ├── If replied / booked call → Exit to sales pipeline
  ├── If opened but no reply → Move to monthly newsletter
  └── If no opens at all → Suppress (respect inbox)
```

### Branch Logic

- **Emails 1, 5, 6, 7** are universal (same for all sectors)
- **Emails 2, 3, 4** are sector-specific (8 variants each, matching the sectors from the contact form: agriculture, restaurants, tourism, healthcare, retail, education, realestate, logistics)
- **If sector = "Other" or unselected**, use a generic version with cross-sector proof points

### WhatsApp Integration Points

Every email includes a WhatsApp CTA as the secondary action. The primary CTA is a reply or a calendar link; the WhatsApp link is always present as the "faster" alternative. This reflects the Moroccan preference for WhatsApp over email.

Format: `https://wa.me/212632431557?text={prefilled_message}`

---

## 2. Email-by-Email Specs

---

### Email 1 — Confirmation + What Happens Next

| Field | Value |
|-------|-------|
| **Timing** | Day 0 — Immediate (within 60 seconds of form submission) |
| **Subject** | `{name}, votre demande est bien recue` |
| **Goal** | Confirm receipt, set expectations, establish human tone |
| **From name** | Tadnun (personal variant: "Wassim de Tadnun") |

**Body Outline:**

1. **Opening** — Merci {name}. On a bien recu votre message.
2. **What happens next** — 4 clear steps (mirrors the contactPage process):
   - On etudie votre demande
   - On vous rappelle sous 24h (par WhatsApp ou par telephone)
   - Appel decouverte gratuit de 15 min
   - Proposition personnalisee sous 48h
3. **Human touch** — "On ne va pas vous envoyer un script. On va vous poser des vraies questions sur votre activite."
4. **WhatsApp shortcut** — "Vous preferez qu'on echange plus vite ? Ecrivez-nous directement sur WhatsApp."

**CTA:** Lien WhatsApp avec message pre-rempli: "Bonjour, je viens de remplir le formulaire sur tadnun.com. Je suis dans le secteur {sector}."

**Content source:**
- `contactPage.processTitle` + steps 1-4
- `contactPage.avgResponse` (23 min)
- `contactPage.formSuccessMsg`

---

### Email 2 — Sector-Specific Pain Point Mirror

| Field | Value |
|-------|-------|
| **Timing** | Day 1 (24 hours after submission) |
| **Subject** | Sector-specific (see table below) |
| **Goal** | Show deep understanding of their world — "they get me" moment |
| **From name** | Tadnun |

**Body Outline:**

1. **Opening hook** — A concrete scenario from their sector (use the `quote` field from `sectors.items.{sector}` in en.json — the "customer language" quotes)
2. **3 pain points** — Pulled directly from `sectorDetails.{sector}.painPoints` (title + abbreviated body). Framed as questions: "Est-ce que ca vous parle ?"
3. **Bridge** — "Ce ne sont pas des suppositions. On travaille avec plus de 150 entreprises marocaines dans 8 secteurs."
4. **Soft CTA** — "Repondez a cet email avec un simple 'oui' si vous voulez en discuter."

**CTA (primary):** Reply to this email
**CTA (secondary):** WhatsApp link

**Sector-specific subjects:**

| Sector | Subject Line (FR) |
|--------|-------------------|
| Agriculture | `{name}, un carnet papier a deja coute 400 000 DH a une cooperative` |
| Restaurants | `{name}, vos 25 chaises vides du mardi soir ne sont pas une fatalite` |
| Tourism | `{name}, Booking.com vous prend combien cette annee ?` |
| Healthcare | `{name}, 5 patients absents par jour = 40 000 DH/mois perdus` |
| Retail | `{name}, 20 messages WhatsApp non repondus = 20 ventes perdues` |
| Education | `{name}, le calendrier des examens a encore disparu dans le groupe WhatsApp ?` |
| Real Estate | `{name}, le prospect de lundi a achete chez le concurrent jeudi` |
| Logistics | `{name}, 3 heures de saisie Excel chaque soir — et si on arretait ?` |
| Other/Generic | `{name}, 93% des PME marocaines n'ont aucune presence digitale` |

**Content source:**
- `sectorDetails.{sector}.painPoints` — all 3 pain points per sector
- `sectors.items.{sector}.quote` — opening hook
- `sectors.items.{sector}.pain` — context
- `stats.clients` (150+) and `stats.sectors` (8)

---

### Email 3 — Social Proof (Testimonial + ROI)

| Field | Value |
|-------|-------|
| **Timing** | Day 3 |
| **Subject** | Sector-specific (see table below) |
| **Goal** | Build credibility through peer proof — "someone like me succeeded" |
| **From name** | Tadnun |

**Body Outline:**

1. **Opening** — "Voici ce que dit {testimonial.name}, {testimonial.role} a {testimonial.city} :"
2. **Testimonial block** — Full quote from `sectorDetails.{sector}.testimonials[0]` (use the French version)
3. **ROI stats** — 2-3 key metrics from `sectorDetails.{sector}.roi`, formatted as a simple visual list:
   - {stat} — {label}
   - {stat} — {label}
4. **Second testimonial** — Shorter, from `sectorDetails.{sector}.testimonials[1]` if available
5. **Bridge** — "Ces resultats ne sont pas exceptionnels. C'est ce qu'on fait chaque jour."
6. **CTA** — "15 minutes suffisent pour voir si on peut faire pareil pour vous."

**CTA (primary):** "Reservez votre appel decouverte" (calendar link)
**CTA (secondary):** WhatsApp link

**Sector-specific subjects:**

| Sector | Subject Line (FR) |
|--------|-------------------|
| Agriculture | `Fatima a elimine les litiges de paiement en 1 mois` |
| Restaurants | `Karim recoit 40% de clients en plus depuis Google Maps` |
| Tourism | `Youssef economise 200 000 DH/an en commissions` |
| Healthcare | `Dr. Amina a recupere 25 000 DH/mois en reduisant les absences` |
| Retail | `Rachida a augmente ses ventes de 35% avec WhatsApp` |
| Education | `Mme Bennani a reduit les paiements en retard de 70%` |
| Real Estate | `Amine a triple son taux de conversion en 4 mois` |
| Logistics | `Rachid a reduit ses appels entrants de 65%` |
| Other/Generic | `150+ entreprises marocaines ont deja fait le pas` |

**Content source:**
- `sectorDetails.{sector}.testimonials` — full quotes
- `sectorDetails.{sector}.roi` — top 2-3 stats
- `stats.clients` (150+)

---

### Email 4 — Before/After (What Actually Changes)

| Field | Value |
|-------|-------|
| **Timing** | Day 5 |
| **Subject** | `{name}, voici ce qui change concretement` |
| **Goal** | Make the transformation tangible — from abstract to concrete |
| **From name** | Tadnun |

**Body Outline:**

1. **Opening** — "Pas de promesses vagues. Voici exactement ce qui change pour un {sector_name}."
2. **Before/After table** — 3 rows from `sectorDetails.{sector}.workflows`:

   | Avant | Apres |
   |-------|-------|
   | {before} | {after} |

3. **How we do it** — Brief 3-step summary from `sectorDetails.{sector}.approachSteps` (understand, build, grow)
4. **Price anchor** — "A partir de 299 DH/mois. Premier mois offert."
5. **CTA** — "On vous montre en 15 minutes ce que ca donnerait pour vous."

**CTA (primary):** "Reservez votre diagnostic gratuit" (calendar link)
**CTA (secondary):** WhatsApp link

**Sector-specific subject line variants** (optional per-sector override):

| Sector | Subject Override |
|--------|-----------------|
| Agriculture | `Avant : carnet papier. Apres : 0 rejet a l'export.` |
| Restaurants | `Avant : Glovo dans le chaos. Apres : 0 erreur en 3 mois.` |
| Tourism | `Avant : 15% de reservations directes. Apres : 45%.` |
| Healthcare | `Avant : 15 min pour trouver un dossier. Apres : 30 secondes.` |
| Retail | `Avant : stock a la main. Apres : alerte WhatsApp automatique.` |
| Education | `Avant : 40 appels pour les frais. Apres : rappel automatique.` |
| Real Estate | `Avant : rappel en 48h. Apres : WhatsApp en 5 min.` |
| Logistics | `Avant : 40 appels/jour. Apres : portail de suivi client.` |

**Content source:**
- `sectorDetails.{sector}.workflows` — before/after pairs
- `sectorDetails.{sector}.approachSteps` — the 3-step approach
- `pricing.tiers.starter.price` (299 MAD/mo)
- `pricing.note` (premier mois offert)

---

### Email 5 — Objection Killer

| Field | Value |
|-------|-------|
| **Timing** | Day 8 |
| **Subject** | `{name}, on repond a vos doutes` |
| **Goal** | Pre-empt the top 4 buying objections |
| **From name** | Tadnun |

**Body Outline:**

1. **Opening** — "Beaucoup de nos clients avaient les memes hesitations avant de commencer. Voici les questions qu'on entend le plus :"
2. **4 objections as Q&A blocks** (from product-marketing-context.md objections table):

   **"Je ne suis pas a l'aise avec la technologie"**
   L'interface est aussi simple que WhatsApp. On forme votre equipe sur place, en darija ou en francais, jusqu'a l'autonomie.

   **"Je n'ai pas le budget"**
   Tarification adaptee a votre taille. A partir de 299 DH/mois. Souvent moins cher que ce que l'inefficacite vous coute chaque mois.

   **"Je suis enferme dans un contrat ?"**
   Aucun engagement longue duree. Annulez quand vous voulez. Vos donnees vous appartiennent.

   **"Mon equipe ne va pas l'utiliser"**
   On forme chaque membre de l'equipe sur site, dans leur langue, jusqu'a ce que tout le monde soit a l'aise.

3. **Social proof anchor** — "150+ entreprises ont eu les memes questions. Aujourd'hui, elles gagnent du temps et de l'argent."
4. **CTA** — "Vous avez une question qu'on n'a pas traitee ? Repondez a cet email."

**CTA (primary):** Reply to this email
**CTA (secondary):** WhatsApp link + FAQ page link

**Content source:**
- Product-marketing-context.md — Objections table (5 objections)
- `faq.items.q2` (not tech-savvy)
- `faq.items.q3` (lock-in)
- `faq.items.q4` (small business)
- `expertise.items.simple`, `expertise.items.support`, `expertise.items.price`

---

### Email 6 — Urgency (2030 + Competitors)

| Field | Value |
|-------|-------|
| **Timing** | Day 11 |
| **Subject** | `2030 arrive. Votre entreprise sera-t-elle visible ?` |
| **Goal** | Create urgency without being pushy — external deadline (World Cup) |
| **From name** | Tadnun |

**Body Outline:**

1. **Opening stat** — "93% des PME marocaines n'ont aucune presence digitale."
2. **2030 context** — The World Cup is coming. Millions of visitors will search online. Businesses without digital presence simply won't exist for them.
3. **Competitor framing** — "Pendant que vous hesitez, vos concurrents passent au digital. Pas dans 5 ans — maintenant."
4. **Sector-specific hook** (light customization):
   - Tourism: "Chaque riad sans site de reservation directe perdra des millions de dirhams en 2030."
   - Restaurants: "Les touristes du Mondial chercheront 'restaurant a cote' sur Google. Serez-vous la ?"
   - Other sectors: "La vague digitale touche tous les secteurs. 2030 n'est que l'accelerateur."
5. **Offer** — "15 minutes pour identifier vos 3 plus gros blockers. Gratuit, sans engagement."

**CTA (primary):** "Reservez votre diagnostic gratuit"
**CTA (secondary):** WhatsApp link

**Content source:**
- `urgency.stat1` (93%)
- `urgency.stat2` (2030)
- `urgency.description`
- `urgency.punchline`
- `sectorsPage.ctaBody` (diagnostic in 45 min)

---

### Email 7 — Final Nudge

| Field | Value |
|-------|-------|
| **Timing** | Day 14 |
| **Subject** | `{name}, dernier message de notre part` |
| **Goal** | Final conversion attempt + graceful exit |
| **From name** | Wassim de Tadnun (personal touch for final email) |

**Body Outline:**

1. **Opening** — "{name}, c'est le dernier email de cette serie. On ne veut pas encombrer votre boite."
2. **Quick recap** — What Tadnun does in 2 sentences: "On construit des outils digitaux sur mesure pour les entreprises marocaines. Simples a utiliser, adaptes a votre secteur, avec un support humain en darija et en francais."
3. **Direct offer** — "Si vous etes pret a en discuter, il suffit de repondre a cet email ou de nous ecrire sur WhatsApp. Premier mois offert, sans engagement."
4. **Respect** — "Sinon, aucun probleme. On reste disponibles quand le moment sera le bon."
5. **P.S.** — "P.S. — Vous pouvez aussi nous contacter directement au +212 632 431 557 ou sur contact@tadnun.ma."

**CTA (primary):** "Reservez votre appel decouverte" (calendar link)
**CTA (secondary):** WhatsApp link
**Tertiary:** Direct email + phone number

**Content source:**
- `contactPage.altPhone` (+212 632 431 557)
- `contactPage.altEmail` (contact@tadnun.ma)
- `pricing.note` (premier mois offert)
- `meta.description` — product summary

---

## 3. Sector-Specific Variations

### Variation Matrix

Emails 2, 3, and 4 each have 9 variants (8 sectors + 1 generic). Here is the content mapping for each sector:

#### Agriculture & Cooperatives

| Email | Key Content |
|-------|-------------|
| **Email 2 — Pain Points** | Traceability gap (ONSSA rejection risk), payment disputes between members, water/input waste. Hook quote: "J'ai perdu un contrat parce qu'un agriculteur n'avait pas note quand il avait traite ses arbres." |
| **Email 3 — Social Proof** | Fatima (cooperative president, Essaouira) — payment disputes solved. Hassan (citrus exporter, Agadir) — GlobalGAP saved. ROI: 60% reduction in disputes, 4h/week saved, 0 export rejections. |
| **Email 4 — Before/After** | Paper notebook -> QR scan + auto-sync. Manual Excel shares -> automatic SMS statements. 3-day doc compilation -> 1-click compliant PDF. |

#### Restaurants & Cafes

| Email | Key Content |
|-------|-------------|
| **Email 2 — Pain Points** | Google invisibility, delivery order chaos (Glovo), invisible food waste. Hook quote: "Vendredi soir je refuse 20 personnes. Mardi j'ai 25 chaises vides." |
| **Email 3 — Social Proof** | Karim (restaurateur, Marrakech) — 40% more customers via Google. Samira (fast-casual, Casablanca) — zero delivery errors in 3 months. ROI: 40% customer increase, 95% order accuracy, 12% less waste. |
| **Email 4 — Before/After** | Negative review found 2 weeks late -> instant WhatsApp alert. Chef guesses quantities -> auto-generated supplier orders. Friday overbooked, Tuesday empty -> auto promos to loyal customers. |

#### Tourism & Hospitality

| Email | Key Content |
|-------|-------------|
| **Email 2 — Pain Points** | 15-20% OTA commissions (300K MAD/year to Booking.com), double bookings, zero 2030 prep. Hook quote: "Booking me prend 300 000 DH par an. C'est le salaire de 2 employes." |
| **Email 3 — Social Proof** | Youssef (riad owner, Fes) — 15% to 45% direct bookings, 200K MAD saved. Nadia (boutique hotel, Chefchaouen) — Google rating 4.2 to 4.8. ROI: 45% direct bookings, 0 double bookings, 200K MAD saved/year. |
| **Email 4 — Before/After** | Guest lost in medina -> auto WhatsApp with GPS 48h before. Manual 3-platform updates -> real-time channel manager. Paper police form -> online pre-arrival check-in. |

#### Healthcare & Clinics

| Email | Key Content |
|-------|-------------|
| **Email 2 — Pain Points** | 30% no-show rate (40K MAD/month lost), missing paper files, AMO billing eating time. Hook quote: "On a passe 20 minutes a chercher un dossier patient. On ne l'a jamais trouve." |
| **Email 3 — Social Proof** | Dr. Amina (dentist, Casablanca) — 60% fewer no-shows, 25K MAD/month recovered. Dr. Mehdi (GP, Rabat) — 4h/day saved on AMO billing, 6 more patients/week. ROI: 60% no-show reduction, 4h/day saved, 25K MAD/month gained. |
| **Email 4 — Before/After** | Receptionist calls patients (50% reach) -> auto SMS+WhatsApp (98% reach). Handwritten prescriptions -> electronic with drug database. Manual AMO billing (30% rejections) -> auto coding (<5% rejections). |

#### Retail & Commerce

| Email | Key Content |
|-------|-------------|
| **Email 2 — Pain Points** | Invisible on Google (80% of buyers search online), 50 WhatsApp messages / 30 replies, stock counted by hand. Hook quote: "Mon produit star etait en rupture depuis 10 jours. Je l'ai su quand un client l'a demande." |
| **Email 3 — Social Proof** | Rachida (cosmetics shop, Tangier) — 100% WhatsApp response, 35% sales increase. Omar (textile merchant, Casablanca) — 50 Google reviews in 3 weeks. ROI: 35% sales increase, 100% messages handled, 8% fewer stockouts. |
| **Email 4 — Before/After** | Instagram price question answered 4h later -> WhatsApp bot responds in 10 seconds. Sunday night stock count (3h) -> real-time alerts. End of month cash counting -> automatic daily revenue/margin reports. |

#### Education & Training

| Email | Key Content |
|-------|-------------|
| **Email 2 — Pain Points** | WhatsApp chaos (important info buried), manual enrollment and payment disputes, absences reported 3 weeks late. Hook quote: "En novembre, je passe mes journees a appeler les parents pour les frais." |
| **Email 3 — Social Proof** | Mme Bennani (school director, Fes) — 70% reduction in late payments. M. Alami (training center, Rabat) — eliminated chaotic parent WhatsApp groups. ROI: 70% fewer late payments, 100% parents informed in real-time, 3h/week saved. |
| **Email 4 — Before/After** | Secretary calls 40 parents about late fees -> auto WhatsApp reminder + payment link. 5-minute roll call -> QR scan in 30 seconds. Grades arrive 3 weeks late -> visible as soon as teacher enters them. |

#### Real Estate

| Email | Key Content |
|-------|-------------|
| **Email 2 — Pain Points** | 40-60% of leads lost (no follow-up), listings scattered on 5 platforms, MRE buyers go elsewhere (no virtual tours). Hook quote: "L'acheteur MRE a choisi l'agence qui avait la video 360. Pas la mienne." |
| **Email 3 — Social Proof** | Amine (agency director, Casablanca) — 3x conversion rate, 5-min response time. Leila (agent, Tangier) — 1.8M MAD remote sale via virtual tour. ROI: 3x more conversions, 5-min response (vs 48h), 30% MRE sales. |
| **Email 4 — Before/After** | Avito lead seen 2 days late -> auto WhatsApp in 5 min. Sold property stays on 3 sites -> auto-deactivation. Paper move-in inspection -> digital with timestamped photos + e-signature. |

#### Logistics & Transport

| Email | Key Content |
|-------|-------------|
| **Email 2 — Pain Points** | 3 hours of evening reconciliation, drivers lost in traffic (1-2h/day wasted), clients calling 40 times/day. Hook quote: "Les clients m'appellent 40 fois par jour pour savoir ou est leur colis. Je n'ai aucune reponse." |
| **Email 3 — Social Proof** | Rachid (delivery company, Casablanca) — 65% fewer inbound calls. Mourad (inter-city transporter, Agadir) — 800L fuel/month saved, ROI in 6 weeks. ROI: 65% fewer client calls, 30% more deliveries/driver/day, 800L fuel saved/month. |
| **Email 4 — Before/After** | Dispatcher writes addresses on paper -> optimized route on driver app with GPS. Client calls for tracking -> WhatsApp link with real-time status. Highway breakdown at 8K MAD -> preventive maintenance alert at 800 MAD. |

#### Generic (sector = "Other" or unselected)

| Email | Key Content |
|-------|-------------|
| **Email 2 — Pain Points** | Use the 6 "signs" from `sectorsPage.signs`: managing on paper/WhatsApp, invisible on Google, admin eating time, no real-time financials, losing customers to no follow-up, can't prove compliance. |
| **Email 3 — Social Proof** | Cross-sector highlights: 150+ businesses, 8 sectors. Pick 2 strongest testimonials (Karim — 40% more customers; Dr. Amina — 25K MAD/month recovered). Use generic ROI from `transformation.items`. |
| **Email 4 — Before/After** | Use the 6 universal before/after pairs from `transformation.items` (paper inventory -> real-time stock; phone reservations -> online booking; no Google -> optimized listing; gut-feeling accounting -> dashboards; lost clients -> CRM follow-ups; cash-only -> CMI mobile payment). |

---

## 4. Technical Implementation Notes

### Resend Integration

The existing contact API at `src/app/api/contact/route.ts` already uses Resend. The nurture sequence requires:

#### Option A — Resend Audiences + Broadcast (Simple)

Use Resend's audience/contact management API to:
1. On form submission, add the contact to a Resend audience (tagged by sector)
2. Use Resend's broadcast feature to schedule emails at the correct intervals
3. Track opens and clicks natively via Resend

**Pros:** Minimal code, no external scheduler, native tracking
**Cons:** Less flexibility for conditional logic, Resend broadcasts are still maturing

#### Option B — Cron-based with Vercel (Recommended)

1. **On form submission** (modify `src/app/api/contact/route.ts`):
   - Send the immediate confirmation email (Email 1) via Resend
   - Store the lead in a database (Supabase, PlanetScale, or even Resend contacts API) with:
     - `name`, `contact`, `sector`, `message`
     - `sequenceStep: 1`
     - `nextEmailAt: now + 24h`
     - `unsubscribed: false`
     - `createdAt: now`

2. **Cron endpoint** (`src/app/api/cron/nurture/route.ts`):
   - Runs every hour via Vercel Cron
   - Queries all leads where `nextEmailAt <= now` and `unsubscribed = false`
   - Sends the appropriate email based on `sequenceStep`
   - Updates `sequenceStep` and calculates `nextEmailAt` for the next email
   - Schedule map:
     ```
     Step 1 → Email 1 (Day 0, immediate — sent at submission, not by cron)
     Step 2 → Email 2 (Day 1, nextEmailAt = createdAt + 24h)
     Step 3 → Email 3 (Day 3, nextEmailAt = createdAt + 72h)
     Step 4 → Email 4 (Day 5, nextEmailAt = createdAt + 120h)
     Step 5 → Email 5 (Day 8, nextEmailAt = createdAt + 192h)
     Step 6 → Email 6 (Day 11, nextEmailAt = createdAt + 264h)
     Step 7 → Email 7 (Day 14, nextEmailAt = createdAt + 336h)
     ```
   - After step 7, mark as `sequenceComplete: true`

3. **Email templates** — Store as React Email components in `src/emails/`:
   ```
   src/emails/
   ├── nurture-01-confirmation.tsx
   ├── nurture-02-pain-points.tsx
   ├── nurture-03-social-proof.tsx
   ├── nurture-04-before-after.tsx
   ├── nurture-05-objections.tsx
   ├── nurture-06-urgency.tsx
   ├── nurture-07-final.tsx
   └── components/
       ├── email-header.tsx
       ├── email-footer.tsx
       ├── whatsapp-cta.tsx
       └── unsubscribe-link.tsx
   ```

### Triggering the Sequence

Modify the existing `POST` handler in `src/app/api/contact/route.ts`:

```
Current flow:
  Form → API → Send notification to Wassim → Return success

New flow:
  Form → API → Send notification to Wassim
                  → Send Email 1 (confirmation) to lead
                  → Store lead in DB with sequence metadata
                  → Return success
```

### Unsubscribe Handling

Every email must include an unsubscribe link in the footer. Implementation:

1. Generate a unique unsubscribe token per lead (UUID or signed JWT)
2. Create endpoint: `src/app/api/unsubscribe/route.ts`
   - Accepts `?token={token}`
   - Sets `unsubscribed: true` in the database
   - Returns a simple confirmation page: "Vous avez ete desabonne. Vous ne recevrez plus d'emails de cette serie."
3. Include `List-Unsubscribe` header in all Resend emails (required for deliverability)
4. Resend natively supports one-click unsubscribe headers — use their API parameter

### WhatsApp Integration Points

| Email | WhatsApp Pre-filled Message |
|-------|-----------------------------|
| Email 1 | "Bonjour, je viens de remplir le formulaire sur tadnun.com. Je suis dans le secteur {sector}." |
| Email 2 | "Bonjour, j'ai lu votre email sur les problemes du secteur {sector}. J'aimerais en discuter." |
| Email 3 | "Bonjour, les resultats de {testimonial_name} m'interessent. On peut en parler ?" |
| Email 4 | "Bonjour, je voudrais voir ce que Tadnun peut changer pour mon entreprise." |
| Email 5 | "Bonjour, j'ai une question sur vos services." |
| Email 6 | "Bonjour, je veux preparer mon entreprise pour le digital. Quand peut-on en parler ?" |
| Email 7 | "Bonjour, je suis pret a discuter de mon projet." |

WhatsApp link format: `https://wa.me/212632431557?text={URL_encoded_message}`

### Email Design Guidelines

- **Sender domain:** Use a verified domain (e.g., `noreply@tadnun.ma` or `wassim@tadnun.ma`) — not `onboarding@resend.dev`
- **Template style:** Plain text with minimal formatting. Moroccan SME owners read on phones. Heavy HTML emails look like spam.
- **Maximum 3 images per email** (logo, one contextual image, WhatsApp icon)
- **Always include:** Logo at top, WhatsApp CTA button, unsubscribe link at bottom
- **Language:** French as default. Future enhancement: send in the language the user browsed the site in (detectable via the locale in the form submission URL)
- **Mobile-first:** Over 80% of Moroccan internet usage is mobile. All emails must render perfectly on small screens.

---

## 5. Success Metrics

### Target Benchmarks

| Metric | Target | Industry Benchmark (B2B Services, MENA) | Notes |
|--------|--------|------------------------------------------|-------|
| **Open Rate** | 45-55% | 30-40% | Higher target justified: personalized subject lines, sector-specific content, short sequence |
| **Click Rate** | 8-12% | 3-5% | WhatsApp CTA should outperform standard web CTAs in Morocco |
| **Reply Rate** | 5-8% | 2-3% | Emails 2 and 5 explicitly ask for replies |
| **WhatsApp Click Rate** | 15-20% | N/A (novel) | Primary conversion mechanism for Moroccan audience |
| **Unsubscribe Rate** | < 1% per email | < 0.5% | 7-email sequence is short; should stay low |
| **Conversion to Discovery Call** | 12-18% of leads | 8-12% | Combined email + WhatsApp touchpoints |
| **Sequence Completion Rate** | 70%+ | 50-60% | Short sequence (14 days) helps retention |

### Per-Email Benchmarks

| Email | Expected Open Rate | Expected CTA Click | Key Indicator |
|-------|-------------------|--------------------|----|
| Email 1 (Confirmation) | 70-80% | 25-35% (WhatsApp) | Deliverability baseline |
| Email 2 (Pain Points) | 50-60% | 8-12% (reply) | "They get me" resonance |
| Email 3 (Social Proof) | 45-55% | 10-15% (calendar) | Credibility established |
| Email 4 (Before/After) | 40-50% | 8-12% (calendar) | Transformation clarity |
| Email 5 (Objections) | 40-50% | 6-10% (reply) | Doubt resolution |
| Email 6 (Urgency) | 35-45% | 8-12% (calendar) | Urgency activation |
| Email 7 (Final) | 35-45% | 10-15% (any CTA) | Last-chance conversion |

### Tracking Implementation

1. **Resend analytics** — Native open and click tracking (enabled by default)
2. **UTM parameters** — All links in emails should include:
   - `utm_source=email`
   - `utm_medium=nurture`
   - `utm_campaign=post-contact`
   - `utm_content=email-{number}-{sector}`
3. **WhatsApp tracking** — Use unique shortened URLs per email to track which email drove the WhatsApp click (Resend link tracking or a redirect via your domain)
4. **Conversion attribution** — When a discovery call is booked, record which email (if any) preceded the booking

### Review Cadence

- **Weekly:** Open and click rates per email, unsubscribe rate
- **Monthly:** Conversion to discovery call, WhatsApp engagement, sector-level performance
- **Quarterly:** Full sequence audit — rewrite underperforming emails, test new subject lines

### A/B Testing Plan (Post-Launch)

| Test | Variant A | Variant B | Metric |
|------|-----------|-----------|--------|
| Subject lines | Pain-point focused | Testimonial focused | Open rate |
| CTA placement | WhatsApp as primary | Calendar link as primary | Click rate |
| Email 2 timing | Day 1 | Day 2 | Open + reply rate |
| Sender name | "Tadnun" | "Wassim de Tadnun" | Open + reply rate |
| Email length | Full version | Short version (50% shorter) | Click rate |

---

## Appendix: Email Footer Template (FR)

```
---
Tadnun — La digitalisation pour les entreprises marocaines.
150+ entreprises accompagnees | 8 secteurs | Support en francais et darija

WhatsApp: +212 632 431 557
Email: contact@tadnun.ma
Site: tadnun.com

[Se desabonner de cette serie d'emails]
```
