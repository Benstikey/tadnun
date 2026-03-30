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
<p>Wassim<br>Fondateur, Tadnun</p>
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
<p>Wassim<br>Fondateur, Tadnun</p>
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
<p>Wassim<br>Fondateur, Tadnun</p>
    `),
  },
};

// --------------- Restaurants & Cafés ---------------

const restaurants: SectorSequence = {
  step1: {
    subject: "tables vides",
    bodyHtml: wrapHtml(`
<p>Bonjour,</p>
<p>Vendredi soir vous refusez du monde. Mardi vous avez des tables vides. Ce décalage, la plupart des restaurants à {{city}} le vivent — et la fiche Google Maps est souvent la raison.</p>
<p>Un restaurateur à Marrakech avait exactement ce problème. Après avoir optimisé sa fiche et mis en place un vrai système d'avis, il reçoit ses clients en semaine aussi. Les touristes le trouvent directement sur Maps au lieu d'aller chez le voisin avec plus d'avis.</p>
<p>Ça mérite 15 minutes ?</p>
<p>Wassim<br>Fondateur, Tadnun</p>
    `),
  },
  step2: {
    subject: "erreurs de commande",
    bodyHtml: wrapHtml(`
<p>Bonjour,</p>
<p>Samira gère un fast-casual à Casablanca. Pendant le rush, elle perdait des commandes Glovo chaque semaine — erreurs, remboursements, clients qui ne reviennent pas.</p>
<p>On a centralisé toutes ses commandes (salle, Glovo, téléphone) sur un seul écran en cuisine. Résultat : zéro erreur en trois mois et moins de gaspillage.</p>
<p>Si vous utilisez Glovo ou d'autres plateformes, ça pourrait vous parler. Intéressé ?</p>
<p>Wassim<br>Fondateur, Tadnun</p>
    `),
  },
  step3: {
    subject: "dernier message",
    bodyHtml: wrapHtml(`
<p>Bonjour,</p>
<p>Je comprends que c'est le rush permanent — pas de souci.</p>
<p>Juste un chiffre : en 2030, le Maroc attend plus de 5 millions de visiteurs pour la Coupe du Monde. Ces touristes vont chercher où manger sur Google Maps. Les restaurants qui y seront bien référencés vont remplir leurs tables. Les autres non.</p>
<p>Si le sujet se pose un jour : tadnun.com/fr/sectors/restaurants</p>
<p>Bon service à {{city}}.</p>
<p>Wassim<br>Fondateur, Tadnun</p>
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
<p>Wassim<br>Fondateur, Tadnun</p>
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
<p>Wassim<br>Fondateur, Tadnun</p>
    `),
  },
  step3: {
    subject: "dernier message",
    bodyHtml: wrapHtml(`
<p>Bonjour,</p>
<p>Je ne veux pas vous déranger davantage. Si un jour la traçabilité ou la gestion de votre coopérative devient un sujet :</p>
<p>tadnun.com/fr/sectors/agriculture</p>
<p>Bonne récolte.</p>
<p>Wassim<br>Fondateur, Tadnun</p>
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
<p>Wassim<br>Fondateur, Tadnun</p>
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
<p>Wassim<br>Fondateur, Tadnun</p>
    `),
  },
  step3: {
    subject: "dernier message",
    bodyHtml: wrapHtml(`
<p>Bonjour,</p>
<p>Je ne veux pas encombrer votre boîte mail. Si le sujet de la digitalisation de votre clinique se pose un jour :</p>
<p>tadnun.com/fr/sectors/healthcare</p>
<p>Bonne continuation.</p>
<p>Wassim<br>Fondateur, Tadnun</p>
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
<p>Wassim<br>Fondateur, Tadnun</p>
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
<p>Wassim<br>Fondateur, Tadnun</p>
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
<p>Wassim<br>Fondateur, Tadnun</p>
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
<p>Wassim<br>Fondateur, Tadnun</p>
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
<p>Wassim<br>Fondateur, Tadnun</p>
    `),
  },
  step3: {
    subject: "dernier message",
    bodyHtml: wrapHtml(`
<p>Bonjour,</p>
<p>Pas de souci si ce n'est pas le bon moment. Si un jour vous cherchez à mieux gérer votre stock ou vos ventes :</p>
<p>tadnun.com/fr/sectors/retail</p>
<p>Bonnes ventes.</p>
<p>Wassim<br>Fondateur, Tadnun</p>
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
<p>Wassim<br>Fondateur, Tadnun</p>
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
<p>Wassim<br>Fondateur, Tadnun</p>
    `),
  },
  step3: {
    subject: "dernier message",
    bodyHtml: wrapHtml(`
<p>Bonjour,</p>
<p>Si un jour la gestion de votre école devient un sujet :</p>
<p>tadnun.com/fr/sectors/education</p>
<p>Bonne continuation.</p>
<p>Wassim<br>Fondateur, Tadnun</p>
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
<p>Wassim<br>Fondateur, Tadnun</p>
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
<p>Wassim<br>Fondateur, Tadnun</p>
    `),
  },
  step3: {
    subject: "dernier message",
    bodyHtml: wrapHtml(`
<p>Bonjour,</p>
<p>Si un jour le suivi de vos livraisons devient un sujet :</p>
<p>tadnun.com/fr/sectors/logistics</p>
<p>Bonne route.</p>
<p>Wassim<br>Fondateur, Tadnun</p>
    `),
  },
};

// --------------- Template Registry ---------------

// --------------- General Services (spa, salon, fitness, car rental, etc.) ---------------

const general: SectorSequence = {
  step1: {
    subject: "visibilité Google",
    bodyHtml: wrapHtml(`
<p>Bonjour,</p>
<p>Quand un client à {{city}} cherche votre type de service sur Google, est-ce qu'il vous trouve — ou est-ce qu'il tombe sur votre concurrent ?</p>
<p>La plupart des commerces à {{city}} gèrent encore leurs réservations par téléphone et WhatsApp. Pendant ce temps, ceux qui ont un système de réservation en ligne et une fiche Google optimisée captent les clients à leur place.</p>
<p>On accompagne plus de 150 entreprises marocaines là-dessus. Ça mérite 15 minutes ?</p>
<p>Wassim<br>Fondateur, Tadnun</p>
    `),
  },
  step2: {
    subject: "votre concurrent",
    bodyHtml: wrapHtml(`
<p>Bonjour,</p>
<p>Votre concurrent à {{city}} a probablement le même service que vous. La différence, c'est que les clients le trouvent en premier sur Google, réservent en ligne en 30 secondes, et reçoivent un rappel automatique la veille.</p>
<p>Vous, vous êtes encore en train de répondre aux appels et aux messages WhatsApp un par un.</p>
<p>On met en place exactement ça pour des entreprises marocaines — réservation en ligne, fiche Google, rappels automatiques. Adapté à votre taille.</p>
<p>Intéressé ?</p>
<p>Wassim<br>Fondateur, Tadnun</p>
    `),
  },
  step3: {
    subject: "dernier message",
    bodyHtml: wrapHtml(`
<p>Bonjour,</p>
<p>Je comprends que ce n'est peut-être pas le moment — pas de souci.</p>
<p>Avec 2030 et les millions de visiteurs attendus au Maroc, les entreprises à {{city}} qui seront visibles en ligne et qui auront automatisé leurs réservations auront un avantage énorme sur les autres.</p>
<p>Si le sujet se pose un jour : tadnun.com</p>
<p>Bonne continuation.</p>
<p>Wassim<br>Fondateur, Tadnun</p>
    `),
  },
};

// --------------- Tech / Digital Agencies ---------------

const tech: SectorSequence = {
  step1: {
    subject: "gestion interne",
    bodyHtml: wrapHtml(`
<p>Bonjour,</p>
<p>Vous aidez vos clients à se digitaliser — mais côté interne, comment vous gérez vos projets et vos clients ? Excel, WhatsApp, Trello ?</p>
<p>On développe des outils sur mesure pour des entreprises marocaines — CRM, portails clients, gestion de projets. Pas du SaaS générique, mais des solutions adaptées à votre façon de travailler.</p>
<p>Ça mérite un échange ?</p>
<p>Wassim<br>Fondateur, Tadnun</p>
    `),
  },
  step2: {
    subject: "portail client",
    bodyHtml: wrapHtml(`
<p>Bonjour,</p>
<p>Vos clients vous envoient des messages WhatsApp pour suivre l'avancement de leur projet. Vous passez du temps à répondre au lieu de produire.</p>
<p>Un portail client où ils voient l'avancement en temps réel, valident les livrables et retrouvent leurs factures — ça change tout. C'est ce qu'on met en place pour des entreprises au Maroc.</p>
<p>Intéressé ?</p>
<p>Wassim<br>Fondateur, Tadnun</p>
    `),
  },
  step3: {
    subject: "dernier message",
    bodyHtml: wrapHtml(`
<p>Bonjour,</p>
<p>Pas de souci si ce n'est pas le moment. Si un jour vous cherchez à structurer votre gestion interne ou à offrir un portail à vos clients :</p>
<p>tadnun.com</p>
<p>Bonne continuation.</p>
<p>Wassim<br>Fondateur, Tadnun</p>
    `),
  },
};

// --------------- Architecture / BTP ---------------

const architecture: SectorSequence = {
  step1: {
    subject: "suivi de chantier",
    bodyHtml: wrapHtml(`
<p>Bonjour,</p>
<p>Entre les plans, les clients, les artisans et les délais — comment vous suivez tout ça aujourd'hui ? La plupart des cabinets d'architecture au Maroc jonglent entre WhatsApp, email et carnets.</p>
<p>On développe des outils de suivi de projet sur mesure pour des entreprises marocaines. Un seul endroit pour vos projets, vos clients et vos échéances.</p>
<p>Intéressé ?</p>
<p>Wassim<br>Fondateur, Tadnun</p>
    `),
  },
  step2: {
    subject: "échéances projet",
    bodyHtml: wrapHtml(`
<p>Bonjour,</p>
<p>Un retard de chantier, c'est souvent un artisan qui n'a pas été relancé à temps ou un client qui n'a pas validé un plan. Pas un problème technique — un problème de suivi.</p>
<p>On met en place des outils de gestion de projet avec relances automatiques, validation en ligne et suivi des échéances. Adapté aux cabinets marocains, pas un logiciel enterprise surdimensionné.</p>
<p>Ça vous parle ?</p>
<p>Wassim<br>Fondateur, Tadnun</p>
    `),
  },
  step3: {
    subject: "dernier message",
    bodyHtml: wrapHtml(`
<p>Bonjour,</p>
<p>Si un jour la gestion de vos projets et de vos clients devient un sujet :</p>
<p>tadnun.com</p>
<p>Bonne continuation.</p>
<p>Wassim<br>Fondateur, Tadnun</p>
    `),
  },
};

// --------------- Manufacturing / Printing ---------------

const manufacturing: SectorSequence = {
  step1: {
    subject: "commandes et suivi",
    bodyHtml: wrapHtml(`
<p>Bonjour,</p>
<p>Combien de commandes passent par téléphone et WhatsApp chaque jour ? Et combien de fois un client rappelle pour demander où en est sa commande ?</p>
<p>On a développé des outils de gestion de commandes et de suivi de production pour des entreprises marocaines. Le client suit sa commande en ligne, vous gérez tout sur un seul écran.</p>
<p>Ça vous parle ?</p>
<p>Wassim<br>Fondateur, Tadnun</p>
    `),
  },
  step2: {
    subject: "suivi de production",
    bodyHtml: wrapHtml(`
<p>Bonjour,</p>
<p>Un client appelle pour savoir si sa commande est prête. Votre équipe arrête ce qu'elle fait pour vérifier. Multiplié par dix appels par jour, c'est du temps de production perdu.</p>
<p>Avec un suivi en ligne, le client voit l'avancement sans vous appeler. Vous produisez, il est informé. C'est ce qu'on met en place pour des entreprises au Maroc.</p>
<p>Intéressé ?</p>
<p>Wassim<br>Fondateur, Tadnun</p>
    `),
  },
  step3: {
    subject: "dernier message",
    bodyHtml: wrapHtml(`
<p>Bonjour,</p>
<p>Si un jour le suivi de vos commandes ou de votre production devient un sujet :</p>
<p>tadnun.com</p>
<p>Bonne continuation.</p>
<p>Wassim<br>Fondateur, Tadnun</p>
    `),
  },
};

// --------------- Accounting / Fiduciaire ---------------

const accounting: SectorSequence = {
  step1: {
    subject: "échéances fiscales",
    bodyHtml: wrapHtml(`
<p>Bonjour,</p>
<p>Entre les déclarations DGI, les échéances CNSS et les dossiers clients — comment vous vous assurez que rien ne passe entre les mailles ?</p>
<p>On développe des outils de gestion sur mesure pour des cabinets marocains. Suivi des échéances, portail client, rappels automatiques. Fini les oublis.</p>
<p>15 minutes pour en discuter ?</p>
<p>Wassim<br>Fondateur, Tadnun</p>
    `),
  },
  step2: {
    subject: "portail client",
    bodyHtml: wrapHtml(`
<p>Bonjour,</p>
<p>Vos clients vous appellent pour savoir où en est leur dossier. Vous passez du temps à répondre au lieu de travailler dessus.</p>
<p>Un portail où chaque client voit l'état de ses déclarations, dépose ses documents et retrouve ses factures — ça change la relation. C'est ce qu'on met en place pour des cabinets au Maroc.</p>
<p>Intéressé ?</p>
<p>Wassim<br>Fondateur, Tadnun</p>
    `),
  },
  step3: {
    subject: "dernier message",
    bodyHtml: wrapHtml(`
<p>Bonjour,</p>
<p>Si un jour la gestion de vos dossiers clients ou de vos échéances devient un sujet :</p>
<p>tadnun.com</p>
<p>Bonne continuation.</p>
<p>Wassim<br>Fondateur, Tadnun</p>
    `),
  },
};

// --------------- Legal / Avocats ---------------

const legal: SectorSequence = {
  step1: {
    subject: "dossiers clients",
    bodyHtml: wrapHtml(`
<p>Bonjour,</p>
<p>Un cabinet d'avocats à {{city}} gère des dizaines de dossiers en parallèle — audiences, délais, pièces, relances. La plupart font ça entre des classeurs et des rappels WhatsApp.</p>
<p>On développe des outils de gestion de dossiers sur mesure pour des professionnels marocains. Chaque dossier, chaque échéance, chaque document — au même endroit.</p>
<p>Intéressé ?</p>
<p>Wassim<br>Fondateur, Tadnun</p>
    `),
  },
  step2: {
    subject: "audiences et délais",
    bodyHtml: wrapHtml(`
<p>Bonjour,</p>
<p>Oublier une audience ou un délai de procédure, ça arrive — et ça coûte cher. Le problème, ce n'est pas la compétence, c'est l'outil de suivi.</p>
<p>On met en place des systèmes de gestion avec alertes automatiques, suivi des échéances et historique complet de chaque dossier. Adapté aux cabinets marocains.</p>
<p>Ça vous parle ?</p>
<p>Wassim<br>Fondateur, Tadnun</p>
    `),
  },
  step3: {
    subject: "dernier message",
    bodyHtml: wrapHtml(`
<p>Bonjour,</p>
<p>Si un jour la gestion de vos dossiers ou de vos échéances devient un sujet :</p>
<p>tadnun.com</p>
<p>Bonne continuation.</p>
<p>Wassim<br>Fondateur, Tadnun</p>
    `),
  },
};

// --------------- Lab / Analyses médicales ---------------

const lab: SectorSequence = {
  step1: {
    subject: "résultats patients",
    bodyHtml: wrapHtml(`
<p>Bonjour,</p>
<p>Vos patients appellent pour savoir si leurs résultats sont prêts ? Et votre équipe passe du temps à chercher des dossiers au lieu de faire des analyses ?</p>
<p>On a développé des portails de résultats en ligne et des outils de gestion pour des structures médicales au Maroc. Le patient consulte ses résultats en ligne, vous gagnez du temps.</p>
<p>Ça mérite 15 minutes ?</p>
<p>Wassim<br>Fondateur, Tadnun</p>
    `),
  },
  step2: {
    subject: "appels patients",
    bodyHtml: wrapHtml(`
<p>Bonjour,</p>
<p>Chaque appel pour demander "mes résultats sont prêts ?" interrompt votre équipe. Multiplié par vingt appels par jour, c'est du temps perdu.</p>
<p>Un portail en ligne où le patient reçoit un SMS quand ses résultats sont disponibles et les consulte lui-même — ça libère votre équipe. C'est ce qu'on met en place pour des laboratoires au Maroc.</p>
<p>Intéressé ?</p>
<p>Wassim<br>Fondateur, Tadnun</p>
    `),
  },
  step3: {
    subject: "dernier message",
    bodyHtml: wrapHtml(`
<p>Bonjour,</p>
<p>Si un jour la gestion de vos résultats patients ou de votre labo devient un sujet :</p>
<p>tadnun.com</p>
<p>Bonne continuation.</p>
<p>Wassim<br>Fondateur, Tadnun</p>
    `),
  },
};

// --------------- Call Center ---------------

const callcenter: SectorSequence = {
  step1: {
    subject: "performance agents",
    bodyHtml: wrapHtml(`
<p>Bonjour,</p>
<p>Comment vous suivez la performance de vos agents aujourd'hui ? Tableaux Excel, rapports manuels ?</p>
<p>On développe des dashboards et des outils de reporting sur mesure pour des entreprises marocaines. Données en temps réel, sans ressaisie manuelle.</p>
<p>Intéressé ?</p>
<p>Wassim<br>Fondateur, Tadnun</p>
    `),
  },
  step2: {
    subject: "reporting temps réel",
    bodyHtml: wrapHtml(`
<p>Bonjour,</p>
<p>Un rapport qui arrive une semaine après les faits ne sert à rien. Vous avez besoin de voir ce qui se passe maintenant — pas la semaine dernière.</p>
<p>On met en place des dashboards en temps réel connectés à vos outils existants. Pas de ressaisie, pas d'Excel. C'est ce qu'on fait pour des entreprises au Maroc.</p>
<p>Ça vous parle ?</p>
<p>Wassim<br>Fondateur, Tadnun</p>
    `),
  },
  step3: {
    subject: "dernier message",
    bodyHtml: wrapHtml(`
<p>Bonjour,</p>
<p>Si un jour le reporting ou la gestion de vos équipes devient un sujet :</p>
<p>tadnun.com</p>
<p>Bonne continuation.</p>
<p>Wassim<br>Fondateur, Tadnun</p>
    `),
  },
};

const SEQUENCES: Record<string, SectorSequence> = {
  tourism,
  restaurants,
  agriculture,
  healthcare,
  realestate,
  retail,
  education,
  logistics,
  tech,
  architecture,
  manufacturing,
  accounting,
  legal,
  lab,
  callcenter,
  // General sectors
  wellness: general,
  fitness: general,
  beauty: general,
  events: general,
  carrental: general,
  auto: general,
  veterinary: general,
  photography: general,
  printing: general,
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
