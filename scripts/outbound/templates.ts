// ============================================================
// Outbound GTM Automation — Email Templates
// ============================================================
// 3-touch sequences per sector, written in French (primary business language)
// Personalization tokens: {{name}}, {{city}}, {{sector_name}}

export interface EmailTemplate {
  subject: string;
  bodyHtml: string;
}

export interface SectorSequence {
  step1: EmailTemplate; // Pain + Proof
  step2: EmailTemplate; // Case Study
  step3: EmailTemplate; // Breakup
}

function renderTemplate(template: EmailTemplate, vars: Record<string, string>): EmailTemplate {
  let subject = template.subject;
  let bodyHtml = template.bodyHtml;
  for (const [key, val] of Object.entries(vars)) {
    subject = subject.replaceAll(`{{${key}}}`, val);
    bodyHtml = bodyHtml.replaceAll(`{{${key}}}`, val);
  }
  return { subject, bodyHtml };
}

// --------------- Base Wrapper ---------------

function wrapHtml(content: string): string {
  // Keep it plain — no branding footer, no links, no disclaimers.
  // Gmail sends styled/branded emails to Promotions tab.
  // Plain text-like HTML lands in Primary.
  return `<!DOCTYPE html>
<html lang="fr">
<head><meta charset="utf-8"></head>
<body style="font-family: sans-serif; color: #1a1a1a; line-height: 1.6; font-size: 14px;">
${content}
</body></html>`;
}

// --------------- Tourism & Hospitality ---------------

const tourism: SectorSequence = {
  step1: {
    subject: "commissions Booking",
    bodyHtml: wrapHtml(`
<p>Bonjour,</p>
<p>Question directe : combien vous coûte Booking.com par an ? Pour la plupart des hébergements à {{city}}, c'est entre 200 000 et 300 000 MAD. Deux salaires qui partent à Amsterdam.</p>
<p>On a aidé des riads à récupérer 40% de leurs réservations en direct — site de réservation propre, paiement CMI, synchronisation automatique avec Booking et Airbnb pour éviter les doubles réservations.</p>
<p>Un riad à Marrakech a réduit sa dépendance aux OTA de moitié en 4 mois.</p>
<p>Ça mérite 15 minutes ?</p>
<p>Wassim</p>
    `),
  },
  step2: {
    subject: "réservations directes",
    bodyHtml: wrapHtml(`
<p>Bonjour,</p>
<p>Un cas concret : un riad à Marrakech payait ~280 000 MAD/an en commissions OTA. Pas de site de réservation directe, des doubles réservations fréquentes, des clients qui ne revenaient jamais en direct.</p>
<p>Aujourd'hui : site de réservation avec paiement CMI, channel manager synchronisé, check-in digital. 40% de réservations en direct en 4 mois.</p>
<p>Adapté à votre taille et votre budget — pas un logiciel enterprise surdimensionné.</p>
<p>Ça peut marcher pour vous aussi ?</p>
<p>Wassim</p>
    `),
  },
  step3: {
    subject: "dernier message",
    bodyHtml: wrapHtml(`
<p>Bonjour,</p>
<p>Je comprends que le timing n'est peut-être pas le bon — pas de souci.</p>
<p>Avec 2030 qui approche, les hébergements à {{city}} qui auront un site de réservation directe et un channel manager auront un avantage énorme sur ceux qui dépendent encore à 100% des OTA.</p>
<p>Si le sujet se pose un jour : tadnun.com/fr/sectors/tourism</p>
<p>Belle saison à {{city}}.</p>
<p>Wassim</p>
    `),
  },
};

// --------------- Restaurants & Cafés ---------------

const restaurants: SectorSequence = {
  step1: {
    subject: "fiche Google Maps",
    bodyHtml: wrapHtml(`
<p>Bonjour,</p>
<p>Question rapide : combien de clients vous trouvent via Google Maps chaque semaine ?</p>
<p>Un restaurateur à Marrakech avait le même profil que vous. Après optimisation de sa fiche Google et mise en place d'un système d'avis, il reçoit 40% de clients en plus le weekend. Les touristes le trouvent directement sur Maps.</p>
<p>On a aussi intégré Glovo dans sa cuisine — zéro erreur de commande en 3 mois (avant : 6 commandes perdues par semaine).</p>
<p>15 minutes pour voir ce qu'on peut faire ?</p>
<p>Wassim</p>
    `),
  },
  step2: {
    subject: "commandes Glovo",
    bodyHtml: wrapHtml(`
<p>Bonjour,</p>
<p>Samira, gérante d'un fast-casual à Casablanca, perdait 6 commandes Glovo par semaine pendant le rush. Chaque erreur = un remboursement + un client perdu.</p>
<p>Aujourd'hui : toutes les commandes (salle, Glovo, téléphone) arrivent sur un seul écran en cuisine. Zéro erreur en 3 mois, réduction du gaspillage de 12%.</p>
<p>On peut faire la même chose pour vous — adapté à votre taille et vos plateformes.</p>
<p>Intéressé ? Répondez simplement "oui".</p>
<p>Wassim</p>
    `),
  },
  step3: {
    subject: "dernier message",
    bodyHtml: wrapHtml(`
<p>Bonjour,</p>
<p>Je comprends que vous êtes occupé — c'est le métier.</p>
<p>Avec 2030 et les 5 millions de visiteurs attendus, les restaurants à {{city}} qui seront visibles sur Google Maps et connectés aux plateformes de livraison auront un avantage énorme.</p>
<p>Si le sujet se pose un jour : tadnun.com/fr/sectors/restaurants</p>
<p>Bon service.</p>
<p>Wassim</p>
    `),
  },
};

// --------------- Agriculture & Cooperatives ---------------

const agriculture: SectorSequence = {
  step1: {
    subject: "traçabilité ONSSA",
    bodyHtml: wrapHtml(`
<p>Bonjour,</p>
<p>Un agriculteur a oublié de noter un traitement phytosanitaire. Résultat : un contrat export de 400 000 MAD rejeté pour non-conformité ONSSA.</p>
<p>Ça vous est peut-être déjà arrivé — ou vous connaissez quelqu'un à qui c'est arrivé.</p>
<p>On a développé un système de suivi digital des traitements et de traçabilité export qui fonctionne même hors connexion. Chaque membre de la coopérative voit son relevé sur son téléphone.</p>
<p>15 minutes pour en discuter ?</p>
<p>Wassim</p>
    `),
  },
  step2: {
    subject: "litiges coopérative",
    bodyHtml: wrapHtml(`
<p>Bonjour,</p>
<p>Fatima, présidente d'une coopérative à Essaouira, passait 2 semaines chaque saison à résoudre des litiges de paiement avec les membres. Cahiers papier, approximations, tensions.</p>
<p>Aujourd'hui : chaque membre reçoit son relevé par SMS. Traçabilité ONSSA automatisée. 60% de litiges en moins, zéro rejet export depuis la mise en place.</p>
<p>Interface en darija, fonctionne hors ligne, conforme ONSSA.</p>
<p>Ça pourrait vous intéresser ?</p>
<p>Wassim</p>
    `),
  },
  step3: {
    subject: "dernier message",
    bodyHtml: wrapHtml(`
<p>Bonjour,</p>
<p>Je ne veux pas vous déranger davantage. Si un jour la traçabilité ou la gestion de votre coopérative devient un sujet :</p>
<p>tadnun.com/fr/sectors/agriculture</p>
<p>Bonne récolte.</p>
<p>Wassim</p>
    `),
  },
};

// --------------- Healthcare & Clinics ---------------

const healthcare: SectorSequence = {
  step1: {
    subject: "no-shows patients",
    bodyHtml: wrapHtml(`
<p>Bonjour Docteur,</p>
<p>4 à 5 patients ne se présentent pas chaque jour — c'est 2 000 MAD de perdus quotidiennement. Et le temps passé à chercher un dossier papier dans 12 armoires, c'est du temps médical gaspillé.</p>
<p>On a mis en place un système de rappels automatiques par SMS et WhatsApp qui réduit les absences de plus de 60%. Plus un dossier médical électronique conforme CNDP, avec facturation AMO/CNSS intégrée.</p>
<p>15 minutes pour voir si ça peut vous aider ?</p>
<p>Wassim</p>
    `),
  },
  step2: {
    subject: "dossiers patients",
    bodyHtml: wrapHtml(`
<p>Bonjour,</p>
<p>"On a passé 20 minutes à chercher le dossier d'un patient. On ne l'a jamais retrouvé."</p>
<p>Avec un dossier médical électronique, chaque consultation est retrouvable en 3 secondes. Les rappels SMS/WhatsApp réduisent les no-shows. La facturation AMO/CNSS se fait en quelques clics.</p>
<p>Conforme CNDP, hébergé au Maroc, interface simple.</p>
<p>Intéressé ? Un simple "oui" suffit.</p>
<p>Wassim</p>
    `),
  },
  step3: {
    subject: "dernier message",
    bodyHtml: wrapHtml(`
<p>Bonjour,</p>
<p>Je ne veux pas encombrer votre boîte mail. Si le sujet de la digitalisation de votre clinique se pose un jour :</p>
<p>tadnun.com/fr/sectors/healthcare</p>
<p>Bonne continuation.</p>
<p>Wassim</p>
    `),
  },
};

// --------------- Real Estate ---------------

const realestate: SectorSequence = {
  step1: {
    subject: "leads Avito et Mubawab",
    bodyHtml: wrapHtml(`
<p>Bonjour,</p>
<p>Question rapide : sur les 30 leads que vous recevez chaque semaine entre Avito, Mubawab, Facebook et WhatsApp — combien sont rappelés dans l'heure ?</p>
<p>La plupart des agences à {{city}} en traitent la moitié. L'autre moitié achète chez le concurrent qui a décroché plus vite.</p>
<p>Et quand un MRE à Paris demande une visite virtuelle, il reçoit 5 photos WhatsApp. Il va voir l'agence qui a une vraie visite 3D.</p>
<p>On a mis en place un outil pour des agences marocaines qui centralise tous les leads (Avito, Mubawab, Facebook, appels) dans un seul écran, avec relances automatiques. Résultat : <strong>2x plus de leads traités, zéro oubli de rappel.</strong></p>
<p>Ça mérite 15 minutes ?</p>
<p>Wassim</p>
    `),
  },
  step2: {
    subject: "acheteurs MRE",
    bodyHtml: wrapHtml(`
<p>Bonjour,</p>
<p>Un chiffre qui fait réfléchir : <strong>les MRE représentent 30% des transactions immobilières au Maroc.</strong> Ils cherchent depuis Paris, Bruxelles ou Montréal — et ils achètent à l'agence qui leur donne une visite virtuelle, pas 5 photos floues sur WhatsApp.</p>
<p>Avec 2030 qui approche, la demande MRE va exploser. Les agences à {{city}} qui n'ont pas de visite 3D et de portail client en ligne vont perdre ce marché au profit de celles qui l'ont.</p>
<p>On aide des agences à mettre ça en place — visites virtuelles, publication centralisée sur toutes les plateformes, CRM avec suivi complet de chaque prospect. Adapté à votre taille, pas un logiciel géant surdimensionné.</p>
<p>Ça vous parle ?</p>
<p>Wassim</p>
    `),
  },
  step3: {
    subject: "dernier message",
    bodyHtml: wrapHtml(`
<p>Bonjour,</p>
<p>Je comprends que le timing n'est peut-être pas le bon — pas de souci.</p>
<p>Avant de clore : avec la Coupe du Monde 2030 au Maroc, la demande immobilière va changer de dimension. Les agences qui auront un CRM, des visites 3D et une présence multi-plateforme auront un avantage énorme.</p>
<p>Si le sujet se pose un jour : tadnun.com/fr/sectors/realestate</p>
<p>Bonne continuation et bonnes ventes à {{city}}.</p>
<p>Wassim</p>
    `),
  },
};

// --------------- Retail & Commerce ---------------

const retail: SectorSequence = {
  step1: {
    subject: "messages WhatsApp",
    bodyHtml: wrapHtml(`
<p>Bonjour,</p>
<p>Vous recevez probablement 50 messages WhatsApp par jour. Vous en traitez 30 — les 20 autres achètent ailleurs.</p>
<p>Un commerçant qu'on accompagne a découvert que son meilleur produit était en rupture depuis 10 jours. Il ne le savait même pas.</p>
<p>On a mis en place un catalogue WhatsApp avec réponses automatiques, un POS connecté avec suivi de stock et alertes rupture, et le paiement mobile CMI.</p>
<p>15 minutes pour voir ce qu'on peut faire ?</p>
<p>Wassim</p>
    `),
  },
  step2: {
    subject: "rupture de stock",
    bodyHtml: wrapHtml(`
<p>Bonjour,</p>
<p>Savez-vous exactement combien de chaque produit vous avez en stock là, maintenant ? Si la réponse est "pas vraiment", vous perdez des ventes sans le savoir.</p>
<p>On connecte votre point de vente, votre stock et votre catalogue WhatsApp. Quand un produit descend sous le seuil, vous êtes alerté. Quand un client demande un prix sur WhatsApp, la réponse part automatiquement.</p>
<p>Simple, en français et darija.</p>
<p>Ça vous parle ?</p>
<p>Wassim</p>
    `),
  },
  step3: {
    subject: "dernier message",
    bodyHtml: wrapHtml(`
<p>Bonjour,</p>
<p>Pas de souci si ce n'est pas le bon moment. Si un jour vous cherchez à mieux gérer votre stock ou vos ventes :</p>
<p>tadnun.com/fr/sectors/retail</p>
<p>Bonnes ventes.</p>
<p>Wassim</p>
    `),
  },
};

// --------------- Education ---------------

const education: SectorSequence = {
  step1: {
    subject: "parents et WhatsApp",
    bodyHtml: wrapHtml(`
<p>Bonjour,</p>
<p>Vous envoyez le calendrier des examens sur WhatsApp — deux heures plus tard, il est noyé sous 150 messages de parents. En novembre, vous passez vos journées à appeler pour les frais de scolarité.</p>
<p>On a développé un portail parents avec notes en temps réel, alertes d'absence automatiques, inscription et paiement en ligne avec reçu digital.</p>
<p>Fini les "je n'étais pas au courant" et les "j'ai déjà payé".</p>
<p>15 minutes pour en discuter ?</p>
<p>Wassim</p>
    `),
  },
  step2: {
    subject: "frais de scolarité",
    bodyHtml: wrapHtml(`
<p>Bonjour,</p>
<p>Chaque année, c'est la même histoire : 15 parents affirment avoir déjà payé les frais. Vous perdez des heures à vérifier.</p>
<p>Avec un système d'inscription et de paiement en ligne, chaque transaction génère un reçu digital. Plus de discussion, plus d'ambiguïté.</p>
<p>Le portail parents affiche les notes, les absences et le calendrier en temps réel. En darija et en français.</p>
<p>Intéressé ?</p>
<p>Wassim</p>
    `),
  },
  step3: {
    subject: "dernier message",
    bodyHtml: wrapHtml(`
<p>Bonjour,</p>
<p>Si un jour la gestion de votre école devient un sujet :</p>
<p>tadnun.com/fr/sectors/education</p>
<p>Bonne continuation.</p>
<p>Wassim</p>
    `),
  },
};

// --------------- Logistics ---------------

const logistics: SectorSequence = {
  step1: {
    subject: "suivi livraisons",
    bodyHtml: wrapHtml(`
<p>Bonjour,</p>
<p>"Les clients m'appellent 40 fois par jour pour savoir où est leur colis. Je n'ai pas de réponse."</p>
<p>Si ça vous parle, on peut vous aider. On remplace les bons de livraison papier par un suivi digital en temps réel — vos clients suivent leur livraison, vos chauffeurs scannent et confirment.</p>
<p>Moins d'appels, moins de litiges, plus de confiance.</p>
<p>15 minutes pour en discuter ?</p>
<p>Wassim</p>
    `),
  },
  step2: {
    subject: "bons de livraison",
    bodyHtml: wrapHtml(`
<p>Bonjour,</p>
<p>Chaque colis a un statut en temps réel. Le client reçoit un lien de suivi par SMS. Le chauffeur confirme la livraison en un clic. Fini les appels et les bons papier perdus.</p>
<p>C'est ce qu'on met en place pour des sociétés de transport au Maroc.</p>
<p>Adapté à votre taille — que vous ayez 3 ou 30 véhicules.</p>
<p>Intéressé ?</p>
<p>Wassim</p>
    `),
  },
  step3: {
    subject: "dernier message",
    bodyHtml: wrapHtml(`
<p>Bonjour,</p>
<p>Si un jour le suivi de vos livraisons devient un sujet :</p>
<p>tadnun.com/fr/sectors/logistics</p>
<p>Bonne route.</p>
<p>Wassim</p>
    `),
  },
};

// --------------- Template Registry ---------------

const SEQUENCES: Record<string, SectorSequence> = {
  tourism,
  restaurants,
  agriculture,
  healthcare,
  realestate,
  retail,
  education,
  logistics,
};

export function getSequenceForSector(sector: string): SectorSequence | null {
  return SEQUENCES[sector] ?? null;
}

export function renderEmail(
  template: EmailTemplate,
  prospect: { name: string; city: string; sector: string }
): EmailTemplate {
  const sectorNames: Record<string, string> = {
    tourism: "l'hôtellerie",
    restaurants: "la restauration",
    agriculture: "l'agriculture",
    healthcare: "la santé",
    realestate: "l'immobilier",
    retail: "le commerce",
    education: "l'éducation",
    logistics: "la logistique",
  };

  return renderTemplate(template, {
    name: prospect.name,
    city: prospect.city,
    sector_name: sectorNames[prospect.sector] ?? prospect.sector,
  });
}
