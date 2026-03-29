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
  return `<!DOCTYPE html>
<html lang="fr">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width"></head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; color: #1a1a1a; line-height: 1.6; max-width: 600px; margin: 0 auto; padding: 20px;">
${content}
<div style="margin-top: 32px; padding-top: 16px; border-top: 1px solid #e5e5e5; font-size: 13px; color: #666;">
  <strong>Tadnun</strong> — Solutions digitales pour les entreprises marocaines<br>
  <a href="https://tadnun.com" style="color: #2563eb;">tadnun.com</a><br>
  <span style="font-size: 11px; color: #999;">Si ce message ne vous concerne pas, ignorez-le simplement. Pas de spam, promis.</span>
</div>
</body></html>`;
}

// --------------- Tourism & Hospitality ---------------

const tourism: SectorSequence = {
  step1: {
    subject: "Hébergement à {{city}} — un chiffre qui fait réfléchir",
    bodyHtml: wrapHtml(`
<p>Bonjour,</p>
<p>Je me permets de vous écrire car j'ai remarqué votre établissement à {{city}}.</p>
<p><strong>Saviez-vous que les commissions Booking.com coûtent en moyenne 300 000 MAD par an aux hébergements marocains ?</strong> C'est l'équivalent de deux salaires.</p>
<p>On a aidé des riads à récupérer 40% de leurs réservations en direct — avec un site de réservation propre, le paiement en ligne via CMI, et une synchronisation automatique Booking/Airbnb.</p>
<p>Un exemple : après notre passage, un riad à Marrakech a réduit sa dépendance aux OTA de plus de moitié en 4 mois.</p>
<p>Si ça vous parle, je serais ravi d'en discuter 15 minutes — sans engagement.</p>
<p>Bien cordialement,<br>Wassim</p>
    `),
  },
  step2: {
    subject: "Comment un riad à Marrakech a réduit ses commissions de moitié",
    bodyHtml: wrapHtml(`
<p>Bonjour,</p>
<p>Je vous ai écrit il y a quelques jours au sujet des commissions de réservation. Un cas concret qui pourrait vous intéresser :</p>
<p><strong>Avant :</strong> un riad à Marrakech payait ~280 000 MAD/an en commissions OTA, sans site de réservation directe, double réservations fréquentes.</p>
<p><strong>Après :</strong> site de réservation directe avec paiement CMI, channel manager synchronisé, check-in digital. Résultat : 40% de réservations en direct en 4 mois.</p>
<p>La solution est adaptée à votre taille et votre budget — pas de forfait entreprise surdimensionné.</p>
<p>15 minutes pour voir si ça peut marcher pour vous aussi ?</p>
<p>Wassim</p>
    `),
  },
  step3: {
    subject: "Dernier message — bonne continuation",
    bodyHtml: wrapHtml(`
<p>Bonjour,</p>
<p>Je comprends que le timing n'est peut-être pas le bon — pas de souci.</p>
<p>Si un jour vous cherchez à réduire vos commissions Booking ou à automatiser vos opérations, on est là :</p>
<p>→ <a href="https://tadnun.com/fr/sectors/tourism" style="color: #2563eb;">Nos solutions pour l'hôtellerie</a></p>
<p>Bonne continuation et belle saison à {{city}} !</p>
<p>Wassim</p>
    `),
  },
};

// --------------- Restaurants & Cafés ---------------

const restaurants: SectorSequence = {
  step1: {
    subject: "Restaurant à {{city}} — 40% de clients en plus, c'est possible",
    bodyHtml: wrapHtml(`
<p>Bonjour,</p>
<p>J'ai vu votre restaurant sur Google Maps. Une question rapide : <strong>combien de clients vous trouvent via Google chaque semaine ?</strong></p>
<p>Un restaurateur à Marrakech avait le même profil que vous. Après optimisation de sa fiche Google + système d'avis, il reçoit 40% de clients en plus le weekend. Les touristes le trouvent directement sur Maps.</p>
<p>On a aussi intégré Glovo dans sa cuisine — zéro erreur de commande en 3 mois (avant : 6 commandes perdues par semaine).</p>
<p>Si ça vous intéresse, 15 minutes suffisent pour voir ce qu'on peut faire pour votre restaurant.</p>
<p>Bien cordialement,<br>Wassim</p>
    `),
  },
  step2: {
    subject: "Zéro erreur de commande en 3 mois — voici comment",
    bodyHtml: wrapHtml(`
<p>Bonjour,</p>
<p>Suite à mon message précédent, voici un cas concret :</p>
<p><strong>Samira</strong>, gérante d'un fast-casual à Casablanca, perdait 6 commandes Glovo par semaine pendant le rush. Chaque erreur = un remboursement + un client perdu.</p>
<p><strong>Solution :</strong> toutes les commandes (salle, Glovo, téléphone) arrivent sur un seul écran en cuisine. Résultat : <strong>zéro erreur en 3 mois</strong> + réduction du gaspillage de 12%.</p>
<p>On peut faire la même chose pour vous — adapté à votre taille, votre budget, et vos plateformes.</p>
<p>Intéressé ? Répondez simplement "oui" et je vous envoie les détails.</p>
<p>Wassim</p>
    `),
  },
  step3: {
    subject: "Pas de souci — voici une ressource utile",
    bodyHtml: wrapHtml(`
<p>Bonjour,</p>
<p>Je comprends que vous êtes occupé — c'est le métier !</p>
<p>Si jamais vous cherchez à attirer plus de clients ou simplifier vos opérations, voici notre page dédiée à la restauration :</p>
<p>→ <a href="https://tadnun.com/fr/sectors/restaurants" style="color: #2563eb;">Solutions pour les restaurants</a></p>
<p>Bon service et à bientôt peut-être !</p>
<p>Wassim</p>
    `),
  },
};

// --------------- Agriculture & Cooperatives ---------------

const agriculture: SectorSequence = {
  step1: {
    subject: "Traçabilité agricole — un contrat de 400 000 MAD perdu pour un oubli",
    bodyHtml: wrapHtml(`
<p>Bonjour,</p>
<p>Je me permets de vous écrire car je travaille avec des coopératives agricoles dans la région de {{city}}.</p>
<p><strong>Un agriculteur a oublié de noter un traitement phytosanitaire. Résultat : un contrat export de 400 000 MAD rejeté pour non-conformité ONSSA.</strong></p>
<p>Ça vous est peut-être déjà arrivé — ou vous connaissez quelqu'un à qui c'est arrivé.</p>
<p>On a développé un système de suivi digital des traitements et de traçabilité export qui fonctionne même hors connexion. Chaque membre de la coopérative voit son relevé sur son téléphone.</p>
<p>15 minutes pour en discuter ? Sans engagement.</p>
<p>Bien cordialement,<br>Wassim</p>
    `),
  },
  step2: {
    subject: "Comment une coopérative à Essaouira a éliminé les litiges de paiement",
    bodyHtml: wrapHtml(`
<p>Bonjour,</p>
<p>Suite à mon message précédent, voici l'histoire de <strong>Fatima</strong>, présidente d'une coopérative à Essaouira :</p>
<p><strong>Avant :</strong> 2 semaines chaque saison à résoudre des litiges de paiement avec les membres. Cahiers papier, approximations, tensions.</p>
<p><strong>Après :</strong> chaque membre reçoit son relevé par SMS. Traçabilité ONSSA automatisée. Résultat : <strong>60% de litiges en moins</strong>, zéro rejet export depuis la mise en place.</p>
<p>La solution est conçue pour les coopératives marocaines — interface en darija, fonctionne hors ligne, conforme ONSSA.</p>
<p>Ça pourrait vous intéresser ?</p>
<p>Wassim</p>
    `),
  },
  step3: {
    subject: "Dernier message — bonne récolte",
    bodyHtml: wrapHtml(`
<p>Bonjour,</p>
<p>Je ne veux pas vous déranger davantage. Si un jour la traçabilité ou la gestion de votre coopérative devient un sujet, on est là :</p>
<p>→ <a href="https://tadnun.com/fr/sectors/agriculture" style="color: #2563eb;">Solutions pour l'agriculture</a></p>
<p>Bonne continuation !</p>
<p>Wassim</p>
    `),
  },
};

// --------------- Healthcare & Clinics ---------------

const healthcare: SectorSequence = {
  step1: {
    subject: "Clinique à {{city}} — 2 000 MAD perdus par jour à cause des absences",
    bodyHtml: wrapHtml(`
<p>Bonjour Docteur,</p>
<p>Je me permets de vous écrire car on travaille avec des cliniques privées au Maroc.</p>
<p><strong>4 à 5 patients ne se présentent pas chaque jour — c'est 2 000 MAD de perdus quotidiennement.</strong> Et le temps passé à chercher un dossier papier dans 12 armoires, c'est du temps médical gaspillé.</p>
<p>On a développé un système de rappels automatiques par SMS et WhatsApp qui réduit les absences de plus de 60%. Plus un dossier médical électronique conforme CNDP, avec facturation AMO/CNSS intégrée.</p>
<p>15 minutes pour voir si ça peut vous aider ?</p>
<p>Bien cordialement,<br>Wassim</p>
    `),
  },
  step2: {
    subject: "Dossier patient introuvable ? C'est du passé",
    bodyHtml: wrapHtml(`
<p>Bonjour,</p>
<p>Suite à mon précédent message, un cas qui parlera à tout professionnel de santé :</p>
<p><em>"On a passé 20 minutes à chercher le dossier d'un patient. On ne l'a jamais retrouvé."</em></p>
<p>Avec un dossier médical électronique, chaque consultation est retrouvable en 3 secondes. Les rappels SMS/WhatsApp réduisent les no-shows. La facturation AMO/CNSS se fait en quelques clics.</p>
<p>Le tout conforme CNDP, hébergé au Maroc, interface simple.</p>
<p>Intéressé ? Un simple "oui" suffit.</p>
<p>Wassim</p>
    `),
  },
  step3: {
    subject: "Bonne continuation, Docteur",
    bodyHtml: wrapHtml(`
<p>Bonjour,</p>
<p>Je ne veux pas encombrer votre boîte mail. Si le sujet de la digitalisation de votre clinique se pose un jour :</p>
<p>→ <a href="https://tadnun.com/fr/sectors/healthcare" style="color: #2563eb;">Solutions pour les cliniques</a></p>
<p>Bonne continuation et bonne santé à vos patients !</p>
<p>Wassim</p>
    `),
  },
};

// --------------- Real Estate ---------------

const realestate: SectorSequence = {
  step1: {
    subject: "vos leads avito et mubawab",
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
    subject: "l'acheteur mre est passé à côté",
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
<p>Si le sujet se pose un jour :</p>
<p>→ <a href="https://tadnun.com/fr/sectors/realestate" style="color: #111;">tadnun.com/immobilier</a></p>
<p>Bonne continuation et bonnes ventes à {{city}}.</p>
<p>Wassim</p>
    `),
  },
};

// --------------- Retail & Commerce ---------------

const retail: SectorSequence = {
  step1: {
    subject: "Commerce à {{city}} — 20 clients WhatsApp perdus chaque jour",
    bodyHtml: wrapHtml(`
<p>Bonjour,</p>
<p>Vous recevez probablement 50 messages WhatsApp par jour. Vous en traitez 30 — les 20 autres achètent ailleurs.</p>
<p>On aide les commerces marocains à <strong>ne plus perdre de ventes</strong> : catalogue WhatsApp avec réponses automatiques, POS connecté avec suivi de stock, alertes rupture, paiement mobile CMI.</p>
<p>Un commerçant qu'on accompagne a découvert que son meilleur produit était en rupture depuis 10 jours — il ne le savait même pas.</p>
<p>15 minutes pour voir ce qu'on peut faire pour votre commerce ?</p>
<p>Wassim</p>
    `),
  },
  step2: {
    subject: "Votre meilleur produit est-il en stock en ce moment ?",
    bodyHtml: wrapHtml(`
<p>Bonjour,</p>
<p>Savez-vous exactement combien de chaque produit vous avez en stock là, maintenant ? Si la réponse est "pas vraiment", vous perdez des ventes sans le savoir.</p>
<p>Notre solution connecte votre point de vente, votre stock, et votre catalogue WhatsApp. Quand un produit descend sous le seuil, vous êtes alerté. Quand un client demande un prix sur WhatsApp, la réponse part automatiquement.</p>
<p>Simple, en français et darija, adapté aux commerces marocains.</p>
<p>Ça vous parle ?</p>
<p>Wassim</p>
    `),
  },
  step3: {
    subject: "Bonne continuation",
    bodyHtml: wrapHtml(`
<p>Bonjour,</p>
<p>Pas de souci si ce n'est pas le bon moment. Si un jour vous cherchez à mieux gérer votre stock ou vos ventes :</p>
<p>→ <a href="https://tadnun.com/fr/sectors/retail" style="color: #2563eb;">Solutions pour le commerce</a></p>
<p>Bonnes ventes !</p>
<p>Wassim</p>
    `),
  },
};

// --------------- Education ---------------

const education: SectorSequence = {
  step1: {
    subject: "École à {{city}} — les parents ont encore raté le calendrier ?",
    bodyHtml: wrapHtml(`
<p>Bonjour,</p>
<p>Vous envoyez le calendrier des examens sur WhatsApp — deux heures plus tard, il est noyé sous 150 messages de parents. En novembre, vous passez vos journées à appeler pour les frais de scolarité.</p>
<p>On a développé un <strong>portail parents</strong> avec notes en temps réel, alertes d'absence automatiques, inscription et paiement en ligne avec reçu digital.</p>
<p>Fini les "je n'étais pas au courant" et les "j'ai déjà payé".</p>
<p>15 minutes pour en discuter ?</p>
<p>Wassim</p>
    `),
  },
  step2: {
    subject: "\"J'ai déjà payé\" — comment éliminer ce problème",
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
    subject: "Bonne rentrée",
    bodyHtml: wrapHtml(`
<p>Bonjour,</p>
<p>Si un jour la gestion de votre école devient un sujet :</p>
<p>→ <a href="https://tadnun.com/fr/sectors/education" style="color: #2563eb;">Solutions pour l'éducation</a></p>
<p>Bonne continuation !</p>
<p>Wassim</p>
    `),
  },
};

// --------------- Logistics ---------------

const logistics: SectorSequence = {
  step1: {
    subject: "Livraison à {{city}} — vos clients appellent 40 fois par jour ?",
    bodyHtml: wrapHtml(`
<p>Bonjour,</p>
<p><em>"Les clients m'appellent 40 fois par jour pour savoir où est leur colis. Je n'ai pas de réponse."</em></p>
<p>Si ça vous parle, on peut vous aider. On remplace les bons de livraison papier par un <strong>suivi digital en temps réel</strong> — vos clients suivent leur livraison, vos chauffeurs scannent et confirment.</p>
<p>Moins d'appels, moins de litiges, plus de confiance.</p>
<p>15 minutes pour en discuter ?</p>
<p>Wassim</p>
    `),
  },
  step2: {
    subject: "Du papier au digital — le suivi de livraison simplifié",
    bodyHtml: wrapHtml(`
<p>Bonjour,</p>
<p>Imaginez : chaque colis a un statut en temps réel. Le client reçoit un lien de suivi par SMS. Le chauffeur confirme la livraison en un clic. Fini les appels et les bons papier perdus.</p>
<p>C'est ce qu'on met en place pour des sociétés de transport au Maroc.</p>
<p>Adapté à votre taille — que vous ayez 3 ou 30 véhicules.</p>
<p>Intéressé ?</p>
<p>Wassim</p>
    `),
  },
  step3: {
    subject: "Bonne route",
    bodyHtml: wrapHtml(`
<p>Bonjour,</p>
<p>Si un jour le suivi de vos livraisons devient un sujet :</p>
<p>→ <a href="https://tadnun.com/fr/sectors/logistics" style="color: #2563eb;">Solutions pour la logistique</a></p>
<p>Bonne continuation !</p>
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
