import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/page-shell";
import { SolutionIcon } from "@/components/icons";
import { SectorFaq } from "@/components/sector-faq";
import { RelatedSectors } from "@/components/related-sectors";
import { ScrollReveal } from "@/components/scroll-reveal";
import { AnimatedStat, ApproachTimeline } from "@/components/visuals";
import { BeforeAfterRow } from "@/components/before-after-row";
import { SectorIntegrationHub } from "@/components/integration-hub";
import { SectionHeading } from "@/components/section-heading";
import { IconBox } from "@/components/icon-box";
import { SectorJsonLd } from "@/components/json-ld";
import { sectorDetails } from "@/data/sector-details";
import { cities } from "@/data/cities";
import { validSectors, type SectorKey } from "@/lib/sector-context";
import type { Metadata } from "next";

const sectorSolutions: Record<SectorKey, { iconKey: string; name: string; nameFr: string; desc: string; descFr: string; features: string[]; featuresFr: string[] }[]> = {
  agriculture: [
    { iconKey: "map", name: "Field Tracking", nameFr: "Suivi des parcelles", desc: "Track every field, treatment, and harvest from your phone — even offline.", descFr: "Suivez chaque parcelle, traitement et recolte depuis votre telephone — meme hors ligne.", features: ["GPS field mapping", "Treatment & input logging", "Offline sync", "Harvest recording per lot"], featuresFr: ["Cartographie GPS des parcelles", "Enregistrement des traitements", "Synchronisation hors ligne", "Suivi des recoltes par lot"] },
    { iconKey: "clipboard", name: "Export Traceability", nameFr: "Tracabilite export", desc: "Auto-generate ONSSA and EU-compliant traceability documents per shipment.", descFr: "Generez automatiquement les documents de tracabilite conformes ONSSA et UE.", features: ["Automatic compliance PDFs", "QR code per crate/lot", "GlobalGAP ready", "Phytosanitary chain-of-custody"], featuresFr: ["PDF de conformite automatiques", "QR code par caisse/lot", "Compatible GlobalGAP", "Chaine de traitement phytosanitaire"] },
    { iconKey: "users", name: "Cooperative Management", nameFr: "Gestion cooperative", desc: "End disputes — every member sees their deliveries, contributions, and payments.", descFr: "Fini les conflits — chaque membre voit ses livraisons, contributions et paiements.", features: ["Member delivery logging with photo", "Automatic revenue split", "SMS payment notifications", "Transparency dashboard"], featuresFr: ["Enregistrement des livraisons avec photo", "Repartition automatique des revenus", "Notifications de paiement par SMS", "Tableau de bord transparent"] },
    { iconKey: "droplet", name: "Irrigation & Inputs", nameFr: "Irrigation & intrants", desc: "Know exactly what each field costs and consumes. Stop wasting water and money.", descFr: "Sachez exactement ce que chaque parcelle coute et consomme. Arretez de gaspiller.", features: ["Soil moisture monitoring", "Cost-per-kilo tracking", "Weather alerts (DMN)", "Irrigation scheduling"], featuresFr: ["Suivi d'humidite du sol", "Cout par kilo par parcelle", "Alertes meteo (DMN)", "Planification d'irrigation"] },
    { iconKey: "trending-up", name: "Market Prices", nameFr: "Prix du marche", desc: "Daily wholesale prices from major souks, direct to your phone. No more middleman guessing.", descFr: "Prix de gros quotidiens des grands marches, direct sur votre telephone.", features: ["SMS price alerts", "Multi-souk comparison", "Cooperative selling platform", "Historical price trends"], featuresFr: ["Alertes prix par SMS", "Comparaison multi-marches", "Plateforme de vente cooperative", "Historique des prix"] },
  ],
  restaurants: [
    { iconKey: "map-pin", name: "Google Business Setup", nameFr: "Fiche Google Maps", desc: "Be visible when tourists search 'restaurant near me'. Get reviews that drive foot traffic.", descFr: "Soyez visible quand les touristes cherchent 'restaurant a cote'. Les avis attirent les clients.", features: ["Profile creation & optimization", "Professional food photography", "QR code review system", "Negative review templates"], featuresFr: ["Creation et optimisation du profil", "Photos professionnelles des plats", "Systeme d'avis par QR code", "Modeles de reponse aux avis negatifs"] },
    { iconKey: "truck", name: "Delivery Integration", nameFr: "Integration livraison", desc: "Glovo, Jumia Food, and WhatsApp orders — all on one screen, straight to the kitchen.", descFr: "Glovo, Jumia Food et commandes WhatsApp — tout sur un ecran, direct en cuisine.", features: ["Unified order dashboard", "Kitchen display system", "Auto-print tickets by station", "Delivery vs. dine-in analytics"], featuresFr: ["Tableau de commandes unifie", "Ecran cuisine (KDS)", "Impression auto par poste", "Analyse livraison vs. sur place"] },
    { iconKey: "calendar", name: "Online Reservations", nameFr: "Reservation en ligne", desc: "Stop overbooking Fridays and wasting Tuesdays. Balance your tables automatically.", descFr: "Arretez le surbooking du vendredi et les mardis vides. Equilibrez vos tables.", features: ["Booking via Google, Instagram, WhatsApp", "Confirmation SMS 3h before", "No-show tracking", "Quiet-night promotions"], featuresFr: ["Reservation via Google, Instagram, WhatsApp", "SMS de confirmation 3h avant", "Suivi des no-shows", "Promotions soirees calmes"] },
    { iconKey: "smartphone", name: "QR Menu & POS", nameFr: "Menu QR & caisse", desc: "Digital menu in Arabic/French/English. Connected POS that tracks every sale.", descFr: "Menu digital en arabe/francais/anglais. Caisse connectee qui trace chaque vente.", features: ["Bilingual QR menu", "Tablet POS with CMI payment", "Daily revenue reports", "Employee meal tracking"], featuresFr: ["Menu QR bilingue", "Caisse tablette avec paiement CMI", "Rapports de revenus quotidiens", "Suivi des repas employes"] },
    { iconKey: "pie-chart", name: "Food Cost Tracking", nameFr: "Suivi gaspillage", desc: "See exactly how much food — and money — goes in the trash every week.", descFr: "Voyez exactement combien de nourriture — et d'argent — part a la poubelle.", features: ["Daily delivery logging", "Theoretical vs. actual usage", "Weekly waste reports", "Auto purchase orders"], featuresFr: ["Enregistrement des livraisons", "Usage theorique vs. reel", "Rapports de gaspillage hebdo", "Commandes fournisseurs auto"] },
  ],
  tourism: [
    { iconKey: "building", name: "Direct Booking Site", nameFr: "Site reservation directe", desc: "Stop giving 15-20% to Booking.com. Your own booking engine with online payment.", descFr: "Arretez de donner 15-20% a Booking.com. Votre propre moteur de reservation.", features: ["Booking engine with CMI + Stripe", "Best price guarantee badge", "Google Hotel Ads integration", "WhatsApp booking confirmation"], featuresFr: ["Moteur de reservation CMI + Stripe", "Badge meilleur prix garanti", "Integration Google Hotel Ads", "Confirmation par WhatsApp"] },
    { iconKey: "refresh", name: "Channel Manager", nameFr: "Channel manager", desc: "Sync Booking.com, Airbnb, and Expedia from one calendar. No more double bookings.", descFr: "Synchronisez Booking, Airbnb et Expedia depuis un calendrier. Plus de doublons.", features: ["Real-time availability sync", "Automatic OTA markup", "Centralized guest inbox", "Rate management"], featuresFr: ["Synchronisation en temps reel", "Majoration OTA automatique", "Boite de reception centralisee", "Gestion des tarifs"] },
    { iconKey: "message-circle", name: "Digital Guest Experience", nameFr: "Experience client digitale", desc: "From pre-arrival medina directions to digital check-in and WhatsApp concierge.", descFr: "Des directions pre-arrivee au check-in digital et concierge WhatsApp.", features: ["Pre-arrival WhatsApp message", "Digital police fiche", "Branded city guide", "Post-stay review request"], featuresFr: ["Message WhatsApp pre-arrivee", "Fiche de police digitale", "Guide ville personnalise", "Demande d'avis post-sejour"] },
    { iconKey: "globe", name: "World Cup 2030 Package", nameFr: "Pack Coupe du Monde 2030", desc: "Multilingual site, digital payments, and online booking — ready for millions of visitors.", descFr: "Site multilingue, paiements digitaux et reservation en ligne — pret pour 2030.", features: ["4-language website", "International payment gateway", "Multi-language WhatsApp auto-replies", "Google Hotel Ads presence"], featuresFr: ["Site en 4 langues", "Passerelle de paiement internationale", "Reponses auto WhatsApp multilingues", "Presence Google Hotel Ads"] },
  ],
  healthcare: [
    { iconKey: "calendar", name: "Smart Scheduling", nameFr: "Rendez-vous intelligents", desc: "Reduce no-shows by 60% with automated SMS and WhatsApp reminders.", descFr: "Reduisez les absences de 60% avec des rappels SMS et WhatsApp automatiques.", features: ["Online booking portal", "48h + 3h reminders", "One-click reschedule", "Waitlist auto-fill"], featuresFr: ["Portail de reservation en ligne", "Rappels a 48h et 3h", "Report en un clic", "Liste d'attente automatique"] },
    { iconKey: "file-text", name: "Electronic Records", nameFr: "Dossiers electroniques", desc: "All patient history on one screen. Searchable by name, phone, or CIN. CNDP compliant.", descFr: "Tout l'historique patient sur un ecran. Recherche par nom, telephone ou CIN.", features: ["Patient timeline view", "Digital prescriptions", "Lab result integration", "CNDP data compliance"], featuresFr: ["Vue chronologique patient", "Ordonnances digitales", "Integration resultats labo", "Conformite CNDP"] },
    { iconKey: "credit-card", name: "AMO/CNSS Billing", nameFr: "Facturation AMO/CNSS", desc: "Auto-code procedures, generate compliant claims, track reimbursements.", descFr: "Codage automatique, generation de factures conformes, suivi des remboursements.", features: ["Nomenclature nationale coding", "Claim status tracking", "Rejected claim alerts", "60-day follow-up automation"], featuresFr: ["Codage nomenclature nationale", "Suivi statut des reclamations", "Alertes reclamations rejetees", "Relance auto a 60 jours"] },
    { iconKey: "search", name: "Online Presence", nameFr: "Presence en ligne", desc: "Show up when patients search for your specialty + city on Google.", descFr: "Apparaissez quand un patient cherche votre specialite + ville sur Google.", features: ["Google Business optimization", "DabaDoc profile", "One-page booking website", "Review generation system"], featuresFr: ["Optimisation Google Business", "Profil DabaDoc", "Site one-page avec reservation", "Systeme de generation d'avis"] },
  ],
  retail: [
    { iconKey: "map-pin", name: "Google & Social Presence", nameFr: "Presence Google & reseaux", desc: "Be found online. Google Maps listing, Instagram shop, WhatsApp catalog.", descFr: "Soyez trouvable en ligne. Google Maps, Instagram Shop, catalogue WhatsApp.", features: ["Google Business setup", "Instagram Shop integration", "WhatsApp Business catalog", "Product photography service"], featuresFr: ["Creation fiche Google", "Integration Instagram Shop", "Catalogue WhatsApp Business", "Service photo produits"] },
    { iconKey: "shopping-bag", name: "Connected POS", nameFr: "Caisse connectee", desc: "Track every sale — even cash. Know your real revenue, margins, and best sellers.", descFr: "Tracez chaque vente — meme en especes. Connaissez vos vrais revenus et marges.", features: ["Tablet/phone POS app", "Cash + CMI card payments", "Daily revenue reports", "Best seller analytics"], featuresFr: ["Appli caisse tablette/telephone", "Especes + paiement CMI", "Rapports de revenus quotidiens", "Analyse des meilleurs produits"] },
    { iconKey: "package", name: "Inventory Management", nameFr: "Gestion de stock", desc: "Stop counting by hand. Barcode scanning, low-stock alerts, auto reorder.", descFr: "Arretez de compter a la main. Scan code-barres, alertes rupture et commandes auto.", features: ["Barcode/QR scanning", "Low-stock WhatsApp alerts", "Dead stock reports", "Supplier order generation"], featuresFr: ["Scan code-barres/QR", "Alertes rupture WhatsApp", "Rapports stock dormant", "Generation commandes fournisseurs"] },
    { iconKey: "message-square", name: "Social Commerce", nameFr: "Vente sociale", desc: "Turn WhatsApp and Instagram messages into tracked sales with auto-replies.", descFr: "Transformez vos messages WhatsApp et Instagram en ventes tracees.", features: ["WhatsApp Business API", "Auto-replies for FAQs", "Conversation-to-sale tracking", "Order confirmation messages"], featuresFr: ["API WhatsApp Business", "Reponses auto aux questions frequentes", "Suivi conversation > vente", "Messages de confirmation de commande"] },
  ],
  education: [
    { iconKey: "smartphone", name: "Parent Portal", nameFr: "Portail parents", desc: "Replace WhatsApp chaos with a dedicated space for grades, attendance, and announcements.", descFr: "Remplacez le chaos WhatsApp par un espace dedie pour les notes, absences et annonces.", features: ["One-way announcements", "Read receipts per parent", "Teacher messaging with office hours", "Document center"], featuresFr: ["Annonces a sens unique", "Accuses de lecture par parent", "Messagerie enseignant avec horaires", "Centre de documents"] },
    { iconKey: "credit-card", name: "Online Enrollment & Payment", nameFr: "Inscription & paiement en ligne", desc: "Digital enrollment forms, document upload, and automated fee reminders.", descFr: "Formulaires d'inscription digitaux, telechargement de documents et rappels de frais.", features: ["Digital enrollment forms", "Online payment (CMI, virement)", "Automated monthly reminders", "Digital receipts"], featuresFr: ["Formulaires d'inscription digitaux", "Paiement en ligne (CMI, virement)", "Rappels mensuels automatiques", "Recus digitaux"] },
    { iconKey: "graduation-cap", name: "E-Learning Platform", nameFr: "Plateforme e-learning", desc: "One place for courses, videos, quizzes, and certificates.", descFr: "Un seul endroit pour cours, videos, quiz et certificats.", features: ["Course pages with materials", "Video hosting", "Progress tracking", "Certificate generation"], featuresFr: ["Pages de cours avec supports", "Hebergement video", "Suivi de progression", "Generation de certificats"] },
    { iconKey: "check-square", name: "Digital Attendance", nameFr: "Presence digitale", desc: "30-second attendance via tablet. Instant parent alerts.", descFr: "Presence en 30 secondes via tablette. Alertes parents instantanees.", features: ["Tap-to-mark roster", "Real-time parent SMS/app alert", "Monthly absence reports", "Pattern detection"], featuresFr: ["Liste de presence par tap", "Alerte SMS/app parent en temps reel", "Rapports d'absences mensuels", "Detection de tendances"] },
  ],
  realestate: [
    { iconKey: "trending-up", name: "Real Estate CRM", nameFr: "CRM immobilier", desc: "Never lose a lead again. Auto-import from Avito, Mubawab, Facebook.", descFr: "Ne perdez plus un seul prospect. Import auto depuis Avito, Mubawab, Facebook.", features: ["Multi-channel lead capture", "5-minute auto WhatsApp response", "Pipeline view per agent", "Performance tracking"], featuresFr: ["Capture de leads multi-canaux", "Reponse WhatsApp auto en 5 min", "Vue pipeline par agent", "Suivi de performance"] },
    { iconKey: "globe", name: "Multi-Platform Listings", nameFr: "Diffusion multi-plateforme", desc: "Post once, publish everywhere. Auto-remove when sold.", descFr: "Publiez une fois, diffusez partout. Retrait auto a la vente.", features: ["Avito, Mubawab, Sarouty, Facebook", "Auto-deactivation on sale", "Lead source attribution", "Photo hosting & templates"], featuresFr: ["Avito, Mubawab, Sarouty, Facebook", "Desactivation auto a la vente", "Attribution source de leads", "Hebergement photos & modeles"] },
    { iconKey: "eye", name: "Virtual Tours", nameFr: "Visites virtuelles", desc: "360-degree tours for diaspora buyers.", descFr: "Visites 360 pour les acheteurs MRE.", features: ["360-degree Matterport tours", "Video walkthroughs", "Live video call viewings", "WhatsApp shareable links"], featuresFr: ["Visites 360 Matterport", "Videos de visite", "Visites en appel video live", "Liens partageables WhatsApp"] },
    { iconKey: "building", name: "Property Management", nameFr: "Gestion locative", desc: "Digital leases, automated rent reminders.", descFr: "Baux digitaux, rappels de loyer automatiques.", features: ["Digital lease storage", "Rent reminder SMS on the 25th", "Payment tracking dashboard", "Digital etat des lieux with photos"], featuresFr: ["Stockage des baux numeriques", "Rappel loyer SMS le 25", "Tableau de suivi des paiements", "Etat des lieux digital avec photos"] },
  ],
  logistics: [
    { iconKey: "smartphone", name: "Digital Proof of Delivery", nameFr: "Bon de livraison digital", desc: "Signature, photo, GPS stamp. Irrefutable proof.", descFr: "Signature, photo, localisation GPS. Preuve irrefutable.", features: ["Signature capture on phone", "Photo of delivered goods", "GPS + timestamp", "Auto reconciliation with invoices"], featuresFr: ["Capture de signature sur telephone", "Photo des marchandises livrees", "GPS + horodatage", "Reconciliation auto avec factures"] },
    { iconKey: "map", name: "Route Optimization", nameFr: "Optimisation d'itineraires", desc: "30% more stops per day. Less traffic, more deliveries.", descFr: "30% de stops en plus par jour. Moins de bouchons, plus de livraisons.", features: ["Traffic-aware sequencing", "Turn-by-turn driver app", "Real-time fleet map", "Actual vs. planned comparison"], featuresFr: ["Sequencage selon le trafic", "Appli chauffeur GPS", "Carte flotte en temps reel", "Comparaison prevu vs. reel"] },
    { iconKey: "truck", name: "Fleet Management", nameFr: "Gestion de flotte", desc: "Preventive maintenance, fuel tracking, driver scoring.", descFr: "Maintenance preventive, suivi carburant, score chauffeur.", features: ["Maintenance scheduling by mileage", "Fuel consumption per vehicle", "Driver behavior scoring", "Total cost of ownership"], featuresFr: ["Planification entretien au kilometrage", "Consommation par vehicule", "Score de conduite", "Cout total par vehicule"] },
    { iconKey: "package", name: "Client Tracking Portal", nameFr: "Portail suivi client", desc: "Customers stop calling. Real-time tracking with notifications.", descFr: "Vos clients arretent d'appeler. Suivi en temps reel avec notifications.", features: ["Live status page per package", "SMS/WhatsApp at each status change", "Estimated delivery window", "Delivery photo sent to customer"], featuresFr: ["Page de suivi en temps reel", "SMS/WhatsApp a chaque etape", "Fenetre de livraison estimee", "Photo de livraison envoyee au client"] },
  ],
};

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://tadnun.com";

export async function generateMetadata({ params }: { params: Promise<{ locale: string; sector: string }> }): Promise<Metadata> {
  const { locale, sector } = await params;
  if (!validSectors.includes(sector as SectorKey)) return {};
  const t = await getTranslations({ locale, namespace: "sectors.items" });
  const pageUrl = `${BASE_URL}/${locale}/sectors/${sector}`;
  return {
    title: `${t(`${sector}.name`)} — Tadnun`,
    description: t(`${sector}.solution`),
    alternates: {
      canonical: pageUrl,
      languages: { fr: `${BASE_URL}/fr/sectors/${sector}`, en: `${BASE_URL}/en/sectors/${sector}`, ar: `${BASE_URL}/ar/sectors/${sector}` },
    },
  };
}

export default async function SectorPage({ params }: { params: Promise<{ locale: string; sector: string }> }) {
  const { sector, locale } = await params;
  if (!validSectors.includes(sector as SectorKey)) notFound();

  const t = await getTranslations({ locale });
  const isEn = locale === "en";
  const solutions = sectorSolutions[sector as SectorKey];
  const details = sectorDetails[sector as SectorKey];
  const sectorName = t(`sectors.items.${sector}.name`);

  return (
    <PageShell>
        <SectorJsonLd
          locale={locale}
          sectorSlug={sector}
          sectorName={sectorName}
          sectorDescription={t(`sectors.items.${sector}.solution`)}
          faqItems={details.faq.map((f) => ({
            question: isEn ? f.qEn : f.q,
            answer: isEn ? f.aEn : f.a,
          }))}
        />
        {/* Hero */}
        <section aria-labelledby="sector-heading" className="mx-auto max-w-6xl px-6 pt-24 pb-16">
          <h1 id="sector-heading" className="font-serif italic text-4xl sm:text-6xl leading-[1.1] tracking-tight text-foreground">
            {sectorName}
          </h1>
          <p className="mt-6 text-foreground/70 text-lg leading-relaxed max-w-2xl">
            {t(`sectors.items.${sector}.pain`)}
          </p>
        </section>

        <div className="border-t border-border" />

        {/* ROI Stats */}
        <section className="border-b border-border">
          <div className="mx-auto max-w-6xl px-6 py-10 grid grid-cols-2 sm:grid-cols-4 gap-8">
            {details.roi.map((r, i) => (
              <div key={i}>
                <p className="text-2xl sm:text-3xl font-serif italic text-foreground font-tabular"><AnimatedStat value={r.stat} /></p>
                <p className="mt-1.5 text-[13px] text-muted leading-snug">{isEn ? r.labelEn : r.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Pain Points */}
        <section aria-labelledby="reality-heading" className="mx-auto max-w-6xl px-6 pt-20 pb-24">
          <SectionHeading
            eyebrow={t("sectorPage.realityEyebrow")}
            title={t("sectorPage.realityTitle")}
            id="reality-heading"
          />
          <div className="mt-14 space-y-10">
            {details.painPoints.map((p, i) => (
              <div key={i} className="max-w-2xl">
                <h3 className="text-foreground font-medium text-lg">{isEn ? p.titleEn : p.title}</h3>
                <p className="mt-2 text-muted text-[15px] leading-relaxed">{isEn ? p.bodyEn : p.body}</p>
              </div>
            ))}
          </div>

          {/* Testimonial */}
          <div className="mt-16 grid sm:grid-cols-2 gap-6">
            {details.testimonials.map((tst, i) => (
              <div key={i} className="rounded-2xl border border-border bg-surface p-7">
                <p className="text-foreground/70 text-[14px] italic leading-relaxed">
                  &ldquo;{isEn ? (tst.quoteEn || tst.quote) : tst.quote}&rdquo;
                </p>
                <div className="mt-4 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-foreground/10 flex items-center justify-center text-foreground/40 text-xs font-medium">
                    {tst.name[0]}
                  </div>
                  <div>
                    <p className="text-foreground text-sm font-medium">{tst.name}</p>
                    <p className="text-muted text-xs">{tst.role}, {tst.city}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* How we work with [sector] */}
          <div className="mt-24">
            <ScrollReveal>
              <SectionHeading
                eyebrow={t("approach.eyebrow")}
                title={t("sectorPage.howWeWork", { sector: sectorName.toLowerCase() })}
              />
            </ScrollReveal>

            <ApproachTimeline
              steps={(["understand", "build", "grow"] as const).map((step) => ({
                num: t(`approach.steps.${step}.num`),
                title: t(`approach.steps.${step}.title`),
                body: isEn
                  ? details.approachSteps[step].bodyEn
                  : details.approachSteps[step].body,
              }))}
            />
          </div>
        </section>

        <div className="border-t border-border" />

        {/* Process Transformation */}
        <section aria-labelledby="transformation-heading" className="mx-auto max-w-6xl px-6 py-24">
          <SectionHeading
            eyebrow={t("sectorPage.beforeAfterEyebrow")}
            title={t("sectorPage.beforeAfterTitle")}
            id="transformation-heading"
          />
          <div className="mt-14 space-y-4">
            {details.workflows.map((w, i) => (
              <BeforeAfterRow
                key={i}
                before={isEn ? w.beforeEn : w.before}
                after={isEn ? w.afterEn : w.after}
                delay={i * 120}
              />
            ))}
          </div>
        </section>

        <div className="border-t border-border" />

        {/* Solutions */}
        <section aria-labelledby="solutions-heading" className="mx-auto max-w-6xl px-6 py-24">
          <SectionHeading
            eyebrow={t("sectorPage.solutionsEyebrow")}
            title={t("sectorPage.solutionsTitle")}
            id="solutions-heading"
          />
          <div className="mt-14 grid gap-6 sm:grid-cols-2">
            {solutions.map((sol, i) => (
              <div key={i} className="rounded-2xl border border-border bg-surface p-7 flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <IconBox size="sm">
                    <SolutionIcon iconKey={sol.iconKey} size={20} />
                  </IconBox>
                  <h3 className="font-semibold text-foreground text-base">{isEn ? sol.name : sol.nameFr}</h3>
                </div>
                <p className="text-foreground/70 text-[14px] leading-relaxed">{isEn ? sol.desc : sol.descFr}</p>
                <ul className="mt-auto space-y-1.5">
                  {(isEn ? sol.features : sol.featuresFr).map((f, j) => (
                    <li key={j} className="flex items-start gap-2 text-[13px] text-foreground/65">
                      <span className="text-accent mt-0.5 shrink-0">&#x2713;</span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <div className="border-t border-border" />

        {/* Why Tadnun for [sector] */}
        <section aria-labelledby="why-heading" className="mx-auto max-w-6xl px-6 py-24">
          <ScrollReveal>
            <h2 id="why-heading" className="font-serif italic text-3xl sm:text-4xl tracking-tight text-foreground">
              {t("sectorPage.whyTadnunFor", { sector: sectorName.toLowerCase() })}
            </h2>
          </ScrollReveal>
          <div className="mt-14 grid sm:grid-cols-2 gap-6">
            {details.whyUs.map((item, i) => (
              <ScrollReveal key={i} delay={i * 100}>
                <div className="rounded-2xl border border-border bg-surface p-7">
                  <h3 className="font-semibold text-foreground text-base">
                    {isEn ? item.titleEn : item.title}
                  </h3>
                  <p className="mt-2 text-muted text-[15px] leading-relaxed">
                    {isEn ? item.bodyEn : item.body}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>

        <div className="border-t border-border" />

        {/* Integration Ecosystem */}
        <section aria-labelledby="ecosystem-heading" className="mx-auto max-w-6xl px-6 pt-24 pb-20">
          <SectionHeading
            eyebrow={t("sectorPage.ecosystemEyebrow")}
            title={t("sectorPage.ecosystemTitle")}
            subtitle={t("sectorPage.ecosystemDesc")}
            id="ecosystem-heading"
          />
          <div className="mt-14">
            <SectorIntegrationHub
              integrations={details.integrations.map((integ) => ({
                name: integ.name,
                desc: isEn ? integ.descEn : integ.desc,
              }))}
              connectedLabel={t("sectorPage.connectedVia")}
              sectorKey={sector}
            />
          </div>
        </section>

        <div className="border-t border-border" />

        {/* FAQ */}
        <section aria-labelledby="sector-faq-heading" className="mx-auto max-w-6xl px-6 py-24">
          <SectionHeading
            eyebrow={t("sectorPage.faqEyebrow")}
            title={t("sectorPage.faqTitle")}
            id="sector-faq-heading"
          />
          <div className="mt-14">
            <SectorFaq items={details.faq} isFr={!isEn} />
          </div>
        </section>

        <div className="border-t border-border" />

        {/* Related Sectors */}
        <RelatedSectors currentSector={sector} />

        {/* City links */}
        {(() => {
          const sectorCities = cities.filter((c) => c.strongSectors.includes(sector));
          if (sectorCities.length === 0) return null;
          const isAr = locale === "ar";
          return (
            <section className="mx-auto max-w-6xl px-6 py-16">
              <p className="text-[11px] font-mono tracking-[0.2em] text-accent uppercase mb-4">
                {locale === "fr" ? "PAR VILLE" : isAr ? "حسب المدينة" : "BY CITY"}
              </p>
              <h2 className="font-serif italic text-2xl tracking-tight text-foreground">
                {locale === "fr" ? `${sectorName} dans votre ville` : isAr ? `${sectorName} في مدينتك` : `${sectorName} in your city`}
              </h2>
              <div className="mt-6 flex flex-wrap gap-3">
                {sectorCities.map((city) => (
                  <a
                    key={city.slug}
                    href={`/${locale}/sectors/${sector}/${city.slug}`}
                    className="inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-sm text-foreground/70 hover:text-foreground hover:border-foreground/20 hover:bg-foreground/[0.03] transition-all"
                  >
                    {isAr ? city.nameAr : city.name}
                    <svg width="12" height="12" viewBox="0 0 16 16" fill="none" className="opacity-40 rtl:-scale-x-100">
                      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </a>
                ))}
              </div>
            </section>
          );
        })()}

        {/* CTA */}
        <div className="border-t border-border" />
        <section aria-labelledby="sector-cta-heading" className="mx-auto max-w-6xl px-6 py-24">
          <h2 id="sector-cta-heading" className="font-serif italic text-3xl sm:text-4xl tracking-tight text-foreground max-w-xl">
            {t("sectorPage.ctaTitle")}
          </h2>
          <p className="mt-4 text-muted max-w-md text-base leading-relaxed">
            {t("sectorPage.ctaDesc")}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a href={`/${locale}/contact?sector=${sector}`} className="inline-flex items-center justify-center rounded-full bg-accent px-8 py-3.5 text-sm font-semibold text-white shadow-sm shadow-accent/20 hover:shadow-lg hover:shadow-accent/25 hover:bg-accent/90 active:scale-[0.97] transition-all hover:-translate-y-px">
              {t("sectorPage.ctaButton")}
            </a>
            <a href={`/${locale}/approach?sector=${sector}`} className="group inline-flex items-center gap-2 rounded-full border border-border bg-surface px-8 py-3.5 text-sm text-foreground/70 hover:text-foreground hover:border-foreground/20 hover:shadow-sm transition-all">
              {t("sectorPage.approachButton")}
              <span className="group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform rtl:-scale-x-100">&rarr;</span>
            </a>
          </div>
        </section>
    </PageShell>
  );
}
