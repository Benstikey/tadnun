export type SectorDetail = {
  painPoints: { title: string; titleEn: string; body: string; bodyEn: string }[];
  testimonials: { quote: string; quoteEn: string; quoteAr: string; name: string; role: string; roleEn: string; roleAr: string; city: string }[];
  integrations: { name: string; desc: string; descEn: string }[];
  roi: { stat: string; label: string; labelEn: string }[];
  workflows: { before: string; beforeEn: string; after: string; afterEn: string }[];
  faq: { q: string; qEn: string; a: string; aEn: string }[];
  approachSteps: {
    understand: { body: string; bodyEn: string };
    build: { body: string; bodyEn: string };
    grow: { body: string; bodyEn: string };
  };
  whyUs: { title: string; titleEn: string; body: string; bodyEn: string }[];
  contactTagline: { text: string; textEn: string };
};

export const sectorDetails: Record<string, SectorDetail> = {
  agriculture: {
    painPoints: [
      { title: "Tracabilite inexistante", titleEn: "No traceability", body: "Sans systeme de suivi, chaque lot exporte est un risque. Un seul traitement non documente peut faire rejeter une cargaison entiere a la frontiere europeenne — et c'est votre cooperative qui paye.", bodyEn: "Without a tracking system, every exported lot is a risk. A single undocumented treatment can get an entire shipment rejected at the EU border — and your cooperative pays the price." },
      { title: "Conflits de paiement entre membres", titleEn: "Payment disputes between members", body: "Quand les livraisons sont notees sur papier, les desaccords sont inevitables. Des membres quittent la cooperative, la confiance s'erode, et la productivite chute.", bodyEn: "When deliveries are tracked on paper, disagreements are inevitable. Members leave the cooperative, trust erodes, and productivity drops." },
      { title: "Gaspillage d'eau et d'intrants", titleEn: "Water and input waste", body: "Sans donnees de consommation par parcelle, vous irriguez a l'aveugle. L'aquifere du Souss-Massa est en stress critique — et votre facture d'eau double tous les 3 ans.", bodyEn: "Without per-field consumption data, you irrigate blindly. The Souss-Massa aquifer is critically stressed — and your water bill doubles every 3 years." },
    ],
    testimonials: [
      { quote: "Avant Tadnun, je perdais 2 semaines chaque saison à résoudre des litiges de paiement avec les membres. Maintenant, chacun voit son relevé sur son téléphone.", quoteEn: "Before Tadnun, I spent 2 weeks every season resolving payment disputes with members. Now everyone can see their statement on their phone.", quoteAr: "قبل تدنون، كنت كنضيّع أسبوعين كل موسم باش نحل مشاكل الخلاص مع الأعضاء. دابا كل واحد كيشوف كشف حسابو فالتيليفون.", name: "Fatima", role: "Présidente de coopérative d'argan", roleEn: "Argan cooperative president", roleAr: "رئيسة تعاونية الأركان", city: "Essaouira" },
      { quote: "On a failli perdre notre certification GlobalGAP parce qu'un agriculteur n'avait pas noté ses traitements. Avec le suivi digital, c'est automatique.", quoteEn: "We almost lost our GlobalGAP certification because one farmer hadn't logged his treatments. With digital tracking, it's automatic.", quoteAr: "كنّا غادي نخسرو شهادة GlobalGAP حيت فلاح واحد ما سجّلش المعالجات ديالو. مع التتبع الرقمي، ولّا أوتوماتيك.", name: "Hassan", role: "Exportateur d'agrumes", roleEn: "Citrus exporter", roleAr: "مصدّر حوامض", city: "Agadir" },
    ],
    integrations: [
      { name: "ONSSA", desc: "Conformite phytosanitaire et generation automatique des certificats d'export", descEn: "Phytosanitary compliance and automatic export certificate generation" },
      { name: "Credit Agricole du Maroc", desc: "Virements automatiques aux membres et rapprochement bancaire", descEn: "Automatic member transfers and bank reconciliation" },
      { name: "DMN (Meteo Nationale)", desc: "Alertes gel, chaleur et pluie en temps reel sur vos parcelles", descEn: "Real-time frost, heat, and rain alerts for your fields" },
      { name: "Capteurs IoT sol", desc: "Monitoring d'humidite et pilotage intelligent de l'irrigation goutte-a-goutte", descEn: "Soil moisture monitoring and smart drip irrigation control" },
      { name: "GlobalG.A.P.", desc: "Documentation automatisee pour maintenir votre certification sans effort", descEn: "Automated documentation to maintain your certification effortlessly" },
      { name: "ODCO", desc: "Rapports annuels et bilans conformes aux exigences des cooperatives", descEn: "Annual reports and statements compliant with cooperative requirements" },
    ],
    roi: [
      { stat: "60%", label: "de reduction des litiges de paiement", labelEn: "reduction in payment disputes" },
      { stat: "4h", label: "gagnees par semaine sur la paperasse", labelEn: "saved per week on paperwork" },
      { stat: "25%", label: "de reduction du gaspillage d'eau", labelEn: "reduction in water waste" },
      { stat: "0", label: "rejet a l'export depuis la mise en place", labelEn: "export rejections since implementation" },
    ],
    workflows: [
      { before: "L'agriculteur note les traitements sur un carnet", beforeEn: "Farmer logs treatments in a paper notebook", after: "Scan QR de la parcelle, 3 taps sur le telephone, synchronisation automatique", afterEn: "Scan field QR code, 3 taps on phone, automatic sync" },
      { before: "Le tresorier calcule les parts a la main sur Excel", beforeEn: "Treasurer calculates shares by hand in Excel", after: "Repartition automatique basee sur les pesees enregistrees — SMS a chaque membre", afterEn: "Automatic split based on recorded weights — SMS to each member" },
      { before: "L'exportateur compile les documents de tracabilite en 3 jours", beforeEn: "Exporter compiles traceability docs over 3 days", after: "PDF conforme genere en 1 clic, QR code sur chaque palette", afterEn: "Compliant PDF generated in 1 click, QR code on every pallet" },
    ],
    faq: [
      { q: "Est-ce que ca marche sans internet dans les champs ?", qEn: "Does it work without internet in the fields?", a: "Oui. L'application fonctionne hors ligne et synchronise automatiquement des que le reseau revient. Concue pour les zones rurales marocaines.", aEn: "Yes. The app works offline and syncs automatically when connectivity returns. Designed for rural Morocco." },
      { q: "Nos agriculteurs ne sont pas a l'aise avec la technologie.", qEn: "Our farmers aren't comfortable with technology.", a: "L'interface utilise des icones et la saisie vocale en darija. On forme chaque membre sur le terrain. Si vous savez envoyer un message vocal sur WhatsApp, vous savez utiliser notre outil.", aEn: "The interface uses icons and Darija voice input. We train every member on-site. If you can send a WhatsApp voice message, you can use our tool." },
      { q: "Combien ca coute pour une cooperative de 50 membres ?", qEn: "How much does it cost for a 50-member cooperative?", a: "On adapte le tarif a la taille de votre cooperative. Contactez-nous pour un devis gratuit — souvent c'est moins cher que ce que vous perdez en litiges chaque saison.", aEn: "We adapt pricing to your cooperative's size. Contact us for a free quote — it's often less than what you lose in disputes each season." },
    ],
    approachSteps: {
      understand: { body: "On visite vos parcelles et votre cooperative pour comprendre vos flux, vos besoins de certification et votre chaine d'export.", bodyEn: "We visit your fields and cooperative to understand your workflows, certification needs, and export chain." },
      build: { body: "On deploie le suivi digital des parcelles, la tracabilite automatisee et la gestion cooperative — le tout fonctionnel hors ligne.", bodyEn: "We deploy digital field tracking, automated traceability, and cooperative management — all working offline." },
      grow: { body: "On vous accompagne pour maintenir vos certifications, optimiser l'irrigation et ouvrir de nouveaux marches d'export.", bodyEn: "We help you maintain certifications, optimize irrigation, and open new export markets." },
    },
    whyUs: [
      { title: "Hors ligne d'abord", titleEn: "Offline-first", body: "Nos outils fonctionnent sans internet — concus pour les realites du terrain marocain.", bodyEn: "Our tools work without internet — built for the realities of Moroccan farmland." },
      { title: "Conformite ONSSA integree", titleEn: "ONSSA compliance built-in", body: "La documentation phytosanitaire se genere automatiquement a partir de vos donnees de terrain.", bodyEn: "Phytosanitary documentation is auto-generated from your field data." },
      { title: "Interface en darija", titleEn: "Darija interface", body: "Icones, saisie vocale et SMS — pas besoin de savoir lire ou ecrire pour utiliser le systeme.", bodyEn: "Icons, voice input, and SMS — no reading or writing skills needed to use the system." },
    ],
    contactTagline: { text: "Tracez vos recoltes.", textEn: "Let's trace your harvests." },
  },
  restaurants: {
    painPoints: [
      { title: "Invisible sur Google", titleEn: "Invisible on Google", body: "70% des touristes et jeunes Marocains cherchent 'restaurant a cote' sur Google avant de sortir. Si vous n'apparaissez pas — avec des avis, des photos, un menu — vous n'existez pas pour eux.", bodyEn: "70% of tourists and young Moroccans search 'restaurant near me' on Google before going out. If you don't show up — with reviews, photos, a menu — you don't exist to them." },
      { title: "Commandes livraison dans le chaos", titleEn: "Delivery orders in chaos", body: "La tablette Glovo sonne, le telephone aussi, un client WhatsApp envoie une commande. Le cashier ecrit tout a la main. Resultat : commandes oubliees, clients furieux, note Glovo qui chute.", bodyEn: "The Glovo tablet buzzes, the phone rings, a WhatsApp customer sends an order. The cashier writes everything by hand. Result: missed orders, angry customers, Glovo rating dropping." },
      { title: "Gaspillage alimentaire invisible", titleEn: "Invisible food waste", body: "Vous jetez 15-20% de vos achats chaque semaine sans le savoir. Sans suivi des couts matiere, votre marge reelle est peut-etre 7 points en dessous de ce que vous pensez.", bodyEn: "You throw away 15-20% of your purchases every week without knowing it. Without food cost tracking, your real margin might be 7 points below what you think." },
    ],
    testimonials: [
      { quote: "Depuis qu'on a notre fiche Google optimisée, on reçoit 40% de clients en plus le week-end. Les touristes nous trouvent directement sur Maps.", quoteEn: "Since we optimized our Google listing, we get 40% more customers on weekends. Tourists find us directly on Maps.", quoteAr: "من بعد ما حسّنا فيشة Google ديالنا، ولّينا كنستاقبلو 40% زيادة فالويكاند. السيّاح كيلقاونا مباشرة فـ Maps.", name: "Karim", role: "Restaurateur", roleEn: "Restaurant owner", roleAr: "صاحب مطعم", city: "Marrakech" },
      { quote: "On perdait 6 commandes Glovo par semaine à cause du rush. Maintenant tout arrive sur un seul écran en cuisine. Zéro erreur depuis 3 mois.", quoteEn: "We were losing 6 Glovo orders a week because of the rush. Now everything comes to one screen in the kitchen. Zero errors for 3 months.", quoteAr: "كنّا كنخسرو 6 طلبات Glovo فالسيمانة بسبب الضغط. دابا كلشي كيوصل لشاشة وحدة فالكوزينة. صفر غلط من 3 شهور.", name: "Samira", role: "Gérante de fast-casual", roleEn: "Fast-casual manager", roleAr: "مديرة مطعم", city: "Casablanca" },
    ],
    integrations: [
      { name: "Glovo & Jumia Food", desc: "Reception centralisee de toutes les commandes livraison sur un seul ecran", descEn: "Centralized reception of all delivery orders on one screen" },
      { name: "Google Business Profile API", desc: "Gestion automatisee de votre fiche, reponses aux avis, et publications", descEn: "Automated listing management, review responses, and posts" },
      { name: "CMI (Centre Monetique)", desc: "Paiement par carte bancaire marocaine et internationale, sans et avec contact", descEn: "Moroccan and international card payments, contactless included" },
      { name: "TripAdvisor & TheFork", desc: "Synchronisation des avis et gestion de la reputation en ligne", descEn: "Review sync and online reputation management" },
      { name: "Instagram Graph API", desc: "Publication automatique du plat du jour et des offres speciales", descEn: "Automatic posting of daily specials and promotions" },
      { name: "WhatsApp Business API", desc: "Confirmation de reservation, rappels, et prise de commande automatisee", descEn: "Booking confirmation, reminders, and automated ordering" },
      { name: "Fournisseurs (Marche de gros)", desc: "Commandes automatiques basees sur les previsions de consommation", descEn: "Automatic orders based on consumption forecasts" },
    ],
    roi: [
      { stat: "40%", label: "d'augmentation de la clientele via Google Maps", labelEn: "increase in customers via Google Maps" },
      { stat: "95%", label: "de precision des commandes livraison", labelEn: "delivery order accuracy" },
      { stat: "12%", label: "de reduction du gaspillage alimentaire", labelEn: "reduction in food waste" },
      { stat: "3x", label: "plus d'avis Google en 3 mois", labelEn: "more Google reviews in 3 months" },
    ],
    workflows: [
      { before: "Un client laisse un avis negatif — vous le decouvrez 2 semaines plus tard", beforeEn: "A customer leaves a negative review — you discover it 2 weeks later", after: "Alerte WhatsApp instantanee + modele de reponse professionnel en 1 clic", afterEn: "Instant WhatsApp alert + professional response template in 1 click" },
      { before: "Le chef estime les quantites au feeling — 20% de perte", beforeEn: "Chef estimates quantities by gut feeling — 20% waste", after: "Commandes fournisseurs auto-generees selon les ventes de la semaine precedente", afterEn: "Supplier orders auto-generated based on last week's sales" },
      { before: "Vendredi soir surbooke, mardi soir vide", beforeEn: "Friday night overbooked, Tuesday night empty", after: "Promotions 'soiree calme' envoyees automatiquement aux clients fideles", afterEn: "Quiet night promos automatically sent to loyal customers" },
    ],
    faq: [
      { q: "Je n'ai pas le temps de gerer un systeme en plus de mon restaurant.", qEn: "I don't have time to manage a system on top of my restaurant.", a: "C'est justement le but : on automatise ce qui vous prend du temps. La configuration initiale prend 1 semaine, puis le systeme tourne tout seul. Vous recevez juste les rapports.", aEn: "That's exactly the point: we automate what takes your time. Initial setup takes 1 week, then the system runs itself. You just receive reports." },
      { q: "Glovo prend deja une commission. Ca va me couter encore plus ?", qEn: "Glovo already takes a commission. Will this cost me even more?", a: "Au contraire. En reduisant les erreurs de commande et le gaspillage, nos clients recuperent l'investissement en moins de 2 mois. Et on vous aide a developper les commandes directes via WhatsApp — sans commission.", aEn: "On the contrary. By reducing order errors and waste, our clients recoup the investment in under 2 months. And we help you develop direct orders via WhatsApp — commission-free." },
      { q: "Mon personnel ne parle pas francais, seulement darija.", qEn: "My staff only speaks Darija, not French.", a: "L'interface est disponible en arabe et en darija. Les formations se font sur place dans la langue de votre equipe. On ne part pas tant que tout le monde est a l'aise.", aEn: "The interface is available in Arabic and Darija. Training is done on-site in your team's language. We don't leave until everyone is comfortable." },
    ],
    approachSteps: {
      understand: { body: "On mange chez vous, on observe votre service, vos flux de commande et vos points de friction.", bodyEn: "We eat at your restaurant, observe your service, order flow, and friction points." },
      build: { body: "On cree votre fiche Google, connecte Glovo, installe la caisse et le menu digital — tout en une semaine.", bodyEn: "We create your Google listing, connect Glovo, install POS and digital menu — all in one week." },
      grow: { body: "On optimise vos avis, reduit votre gaspillage et equilibre vos tables entre jours pleins et jours creux.", bodyEn: "We optimize your reviews, reduce waste, and balance your tables between busy and quiet days." },
    },
    whyUs: [
      { title: "Google Maps en 48h", titleEn: "Google Maps in 48h", body: "Votre fiche optimisee avec photos pro, menu et avis — visible des touristes en 2 jours.", bodyEn: "Your optimized listing with pro photos, menu, and reviews — visible to tourists in 2 days." },
      { title: "Glovo + cuisine connectes", titleEn: "Glovo + kitchen connected", body: "Toutes les commandes (Glovo, telephone, sur place) sur un seul ecran cuisine. Zero erreur.", bodyEn: "All orders (Glovo, phone, dine-in) on one kitchen screen. Zero errors." },
      { title: "On parle restauration", titleEn: "We speak food service", body: "Fiches techniques, ratio cout matiere, gestion du gaspillage — on connait vos metrics.", bodyEn: "Recipe cards, food cost ratios, waste tracking — we know your metrics." },
    ],
    contactTagline: { text: "Remplissons vos tables.", textEn: "Let's fill your tables." },
  },
  tourism: {
    painPoints: [
      { title: "15-20% de commission aux OTA", titleEn: "15-20% commission to OTAs", body: "Pour un riad a 800 DH la nuit avec 65% d'occupation, ca represente 280,000 a 330,000 DH par an envoyes a Booking.com. C'est le salaire de 2 employes.", bodyEn: "For a riad at 800 MAD/night with 65% occupancy, that's 280,000-330,000 MAD per year sent to Booking.com. That's 2 employees' salaries." },
      { title: "Doubles reservations regulieres", titleEn: "Regular double bookings", body: "Vous mettez a jour Booking manuellement, puis Airbnb, puis Expedia. A 10h15, quelqu'un reserve sur Booking avant que vous n'ayez ferme Airbnb. Resultat : annulation, mauvaise note, client perdu.", bodyEn: "You update Booking manually, then Airbnb, then Expedia. At 10:15, someone books on Booking before you close Airbnb. Result: cancellation, bad rating, lost guest." },
      { title: "Zero preparation pour 2030", titleEn: "Zero preparation for 2030", body: "La Coupe du Monde arrive. Des millions de visiteurs chercheront un hebergement en ligne. Si vous n'avez pas de site de reservation directe, de paiement international et de presence multilingue — vous serez invisible.", bodyEn: "The World Cup is coming. Millions of visitors will search for accommodation online. If you don't have a direct booking site, international payment, and multilingual presence — you'll be invisible." },
    ],
    testimonials: [
      { quote: "En 6 mois, on est passé de 15% à 45% de réservations directes. On a économisé presque 200 000 DH en commissions cette année.", quoteEn: "In 6 months, we went from 15% to 45% direct bookings. We saved almost 200,000 MAD in commissions this year.", quoteAr: "ف 6 شهور، دزنا من 15% ل 45% حجوزات مباشرة. وفّرنا تقريباً 200,000 درهم فالعمولات هاد العام.", name: "Youssef", role: "Propriétaire de riad", roleEn: "Riad owner", roleAr: "مول رياض", city: "Fès" },
      { quote: "Les clients adorent le message WhatsApp pré-arrivée avec le plan pour trouver le riad dans la médina. Notre note Google est passée de 4.2 à 4.8.", quoteEn: "Guests love the pre-arrival WhatsApp message with directions to find the riad in the medina. Our Google rating went from 4.2 to 4.8.", quoteAr: "الزبائن كيعجبهم رسالة WhatsApp قبل ما يوصلو مع الخريطة باش يلقاو الرياض فالمدينة. تقييم Google ديالنا طلع من 4.2 ل 4.8.", name: "Nadia", role: "Gérante d'hôtel boutique", roleEn: "Boutique hotel manager", roleAr: "مديرة فندق", city: "Chefchaouen" },
    ],
    integrations: [
      { name: "Booking.com Channel Manager", desc: "Synchronisation en temps reel des disponibilites et tarifs", descEn: "Real-time availability and rate sync" },
      { name: "Airbnb & Expedia API", desc: "Gestion multi-canaux depuis un calendrier unique", descEn: "Multi-channel management from a single calendar" },
      { name: "CMI + Stripe", desc: "Paiement en ligne pour cartes marocaines et internationales", descEn: "Online payment for Moroccan and international cards" },
      { name: "DGSN (Fiche de police)", desc: "Pre-remplissage digital de la fiche de police obligatoire", descEn: "Digital pre-fill of the mandatory police registration form" },
      { name: "Google Hotel Ads", desc: "Apparaissez a cote de Booking dans les resultats Google", descEn: "Appear alongside Booking in Google search results" },
      { name: "WhatsApp Business API", desc: "Concierge automatise, confirmation de reservation, guide local", descEn: "Automated concierge, booking confirmation, local guide" },
      { name: "TripAdvisor", desc: "Collecte d'avis automatisee et gestion de la reputation", descEn: "Automated review collection and reputation management" },
    ],
    roi: [
      { stat: "45%", label: "de reservations directes en 6 mois (vs 15% avant)", labelEn: "direct bookings in 6 months (vs 15% before)" },
      { stat: "0", label: "double reservation depuis l'installation du channel manager", labelEn: "double bookings since channel manager installation" },
      { stat: "200K DH", label: "economises en commissions OTA par an", labelEn: "saved in OTA commissions per year" },
      { stat: "+0.6", label: "points sur la note Google moyenne", labelEn: "points on average Google rating" },
    ],
    workflows: [
      { before: "Le client arrive perdu dans la medina, stresse", beforeEn: "Guest arrives lost in the medina, stressed", after: "WhatsApp auto 48h avant avec GPS, video du chemin, et code WiFi", afterEn: "Auto WhatsApp 48h before with GPS pin, path video, and WiFi code" },
      { before: "Mise a jour manuelle de 3 plateformes apres chaque reservation", beforeEn: "Manual update of 3 platforms after each booking", after: "Channel manager synchronise tout en temps reel — une seule interface", afterEn: "Channel manager syncs everything in real-time — single interface" },
      { before: "Fiche de police remplie a la main a l'arrivee", beforeEn: "Police form filled by hand at arrival", after: "Le client remplit le formulaire en ligne avant d'arriver — check-in en 2 min", afterEn: "Guest fills the form online before arriving — 2-min check-in" },
    ],
    faq: [
      { q: "Booking.com va me penaliser si j'ai un site de reservation directe ?", qEn: "Will Booking.com penalize me for having a direct booking site?", a: "Non. Vous restez sur Booking, mais avec un markup de 15% pour compenser la commission. Votre site direct est toujours le moins cher — les clients malins reservent chez vous.", aEn: "No. You stay on Booking, but with a 15% markup to offset commission. Your direct site is always cheapest — smart guests book with you." },
      { q: "Je n'ai que 5 chambres, c'est trop petit pour un channel manager ?", qEn: "I only have 5 rooms — is that too small for a channel manager?", a: "C'est exactement la taille ideale. Avec 5 chambres, une seule double reservation peut ruiner votre semaine. Le channel manager protege chaque nuit.", aEn: "That's exactly the ideal size. With 5 rooms, a single double booking can ruin your week. The channel manager protects every night." },
      { q: "Comment je me prepare pour la Coupe du Monde 2030 ?", qEn: "How do I prepare for the 2030 World Cup?", a: "On a un pack dedie : site multilingue (6 langues), paiement international, Google Hotel Ads, et WhatsApp multilingue. Idealement, commencez maintenant — vos concurrents le font deja.", aEn: "We have a dedicated package: multilingual site (6 languages), international payment, Google Hotel Ads, and multilingual WhatsApp. Ideally, start now — your competitors already are." },
    ],
    approachSteps: {
      understand: { body: "On analyse vos canaux de reservation, votre taux de commission OTA et votre parcours client de l'arrivee au depart.", bodyEn: "We analyze your booking channels, OTA commission rate, and guest journey from arrival to checkout." },
      build: { body: "On lance votre site de reservation directe, connecte le channel manager et digitalise le check-in et la conciergerie.", bodyEn: "We launch your direct booking site, connect the channel manager, and digitalize check-in and concierge." },
      grow: { body: "On augmente vos reservations directes, ameliore vos avis et vous prepare pour le flux touristique de 2030.", bodyEn: "We increase your direct bookings, improve your reviews, and prepare you for the 2030 tourist wave." },
    },
    whyUs: [
      { title: "Expertise channel management", titleEn: "Channel management expertise", body: "Booking, Airbnb, Expedia synchronises en temps reel — plus jamais de double reservation.", bodyEn: "Booking, Airbnb, Expedia synced in real-time — never a double booking again." },
      { title: "Pret pour 2030", titleEn: "World Cup 2030 ready", body: "Site multilingue, paiements internationaux et Google Hotel Ads — pret pour des millions de visiteurs.", bodyEn: "Multilingual site, international payments, and Google Hotel Ads — ready for millions of visitors." },
      { title: "ROI reservation directe", titleEn: "Direct booking ROI", body: "Nos clients recuperent en moyenne 30% de reservations en direct la premiere annee.", bodyEn: "Our clients recover an average of 30% in direct bookings in the first year." },
    ],
    contactTagline: { text: "Arretez d'envoyer de l'argent a Amsterdam.", textEn: "Let's stop sending money to Amsterdam." },
  },
  healthcare: {
    painPoints: [
      { title: "30% de rendez-vous non honores", titleEn: "30% no-show rate", body: "Sans rappels automatiques, 4 a 5 patients ne viennent pas chaque jour. A 400 DH la consultation, c'est 2,000 DH par jour — 40,000 DH par mois — qui partent en fumee.", bodyEn: "Without automatic reminders, 4-5 patients don't show up every day. At 400 MAD per consultation, that's 2,000 MAD per day — 40,000 MAD per month — going up in smoke." },
      { title: "Dossiers papier introuvables", titleEn: "Missing paper records", body: "8,000 dossiers dans 12 armoires. Quand un patient revient apres 2 ans, la receptionniste cherche 15 minutes — et parfois le dossier a tout simplement disparu.", bodyEn: "8,000 files in 12 cabinets. When a patient returns after 2 years, the receptionist searches for 15 minutes — and sometimes the file has simply disappeared." },
      { title: "La facturation AMO devore votre temps", titleEn: "AMO billing eats your time", body: "Avec la generalisation de la couverture sociale, vous passez plus de temps a remplir des formulaires CNSS/CNOPS qu'a soigner des patients. Et les rejets de remboursement s'accumulent.", bodyEn: "With the expansion of social coverage, you spend more time filling CNSS/CNOPS forms than treating patients. And reimbursement rejections pile up." },
    ],
    testimonials: [
      { quote: "Les no-shows ont baissé de 60% en un mois juste avec les rappels WhatsApp. Ça représente 25 000 DH de revenus récupérés chaque mois.", quoteEn: "No-shows dropped 60% in one month just with WhatsApp reminders. That's 25,000 MAD in recovered revenue every month.", quoteAr: "الغيابات نقصو ب 60% فشهر واحد غير بالتذكيرات ديال WhatsApp. هادشي كيمثّل 25,000 درهم كل شهر مسترجعين.", name: "Dr. Amina", role: "Dentiste", roleEn: "Dentist", roleAr: "طبيبة أسنان", city: "Casablanca" },
      { quote: "Avant, on passait 4 heures par jour sur la facturation AMO. Maintenant c'est automatisé — je peux voir 6 patients de plus par semaine.", quoteEn: "We used to spend 4 hours a day on AMO billing. Now it's automated — I can see 6 more patients per week.", quoteAr: "كنّا كنقضيو 4 ساعات فالنهار على فاتورات AMO. دابا ولّات أوتوماتيك — كنقدر نشوف 6 مرضى زيادة فالسيمانة.", name: "Dr. Mehdi", role: "Médecin généraliste", roleEn: "General practitioner", roleAr: "طبيب عام", city: "Rabat" },
    ],
    integrations: [
      { name: "AMO / CNSS / CNOPS", desc: "Facturation et teletransmission conformes aux nomenclatures marocaines", descEn: "Billing and teletransmission compliant with Moroccan nomenclatures" },
      { name: "CNDP (Protection des donnees)", desc: "Hebergement et traitement des donnees patients conforme a la loi 09-08", descEn: "Patient data hosting and processing compliant with law 09-08" },
      { name: "DabaDoc", desc: "Synchronisation du profil medecin et des disponibilites", descEn: "Doctor profile and availability sync" },
      { name: "Pharmacopee marocaine", desc: "Base de donnees des medicaments pour ordonnances electroniques", descEn: "Drug database for electronic prescriptions" },
      { name: "Laboratoires d'analyses", desc: "Reception automatique des resultats dans le dossier patient", descEn: "Automatic reception of results in patient records" },
      { name: "SMS & WhatsApp Gateway", desc: "Rappels de rendez-vous et communication patient automatisee", descEn: "Appointment reminders and automated patient communication" },
    ],
    roi: [
      { stat: "60%", label: "de reduction des rendez-vous non honores", labelEn: "reduction in no-show appointments" },
      { stat: "4h/jour", label: "economisees sur la facturation et l'administratif", labelEn: "saved daily on billing and admin" },
      { stat: "25K DH", label: "de revenus supplementaires par mois (reduction no-shows)", labelEn: "additional monthly revenue (no-show reduction)" },
      { stat: "30s", label: "pour retrouver n'importe quel dossier patient", labelEn: "to find any patient record" },
    ],
    workflows: [
      { before: "La receptionniste appelle chaque patient la veille — atteint 50%", beforeEn: "Receptionist calls each patient the day before — reaches 50%", after: "SMS + WhatsApp automatiques a 48h et 3h — taux de rappel 98%", afterEn: "Automatic SMS + WhatsApp at 48h and 3h — 98% reminder rate" },
      { before: "Le medecin ecrit l'ordonnance a la main — illisible pour le pharmacien", beforeEn: "Doctor writes prescription by hand — illegible for pharmacist", after: "Ordonnance electronique avec base de donnees des medicaments — zero erreur", afterEn: "Electronic prescription with drug database — zero errors" },
      { before: "Facturation AMO saisie manuellement — 30% de rejets", beforeEn: "AMO billing entered manually — 30% rejection rate", after: "Codage automatique conforme — rejets tombes a moins de 5%", afterEn: "Automatic compliant coding — rejections dropped to under 5%" },
    ],
    faq: [
      { q: "Est-ce conforme a la protection des donnees medicales au Maroc ?", qEn: "Is this compliant with medical data protection in Morocco?", a: "Absolument. Nos systemes sont conformes a la loi 09-08 et aux exigences de la CNDP. Les donnees sont hebergees sur des serveurs securises avec chiffrement de bout en bout.", aEn: "Absolutely. Our systems comply with law 09-08 and CNDP requirements. Data is hosted on secure servers with end-to-end encryption." },
      { q: "Je suis seul dans mon cabinet, c'est adapte ?", qEn: "I'm alone in my practice — is this adapted?", a: "C'est concu pour ca. Un medecin seul beneficie encore plus de l'automatisation — rappels, dossiers, facturation. Vous recuperez du temps pour ce qui compte : vos patients.", aEn: "It's designed for that. A solo practitioner benefits even more from automation — reminders, records, billing. You reclaim time for what matters: your patients." },
      { q: "Combien de temps pour migrer mes dossiers papier ?", qEn: "How long to migrate my paper records?", a: "On ne migre pas tout d'un coup. Les nouveaux patients sont digitaux immediatement. Les anciens dossiers sont numerises progressivement quand le patient revient. Zero perturbation.", aEn: "We don't migrate everything at once. New patients are digital immediately. Old records are digitized progressively when patients return. Zero disruption." },
    ],
    approachSteps: {
      understand: { body: "On observe votre cabinet pendant une journee : flux patients, gestion des dossiers, facturation AMO et temps administratif.", bodyEn: "We observe your practice for a day: patient flow, records management, AMO billing, and admin time." },
      build: { body: "On installe le dossier medical electronique, la prise de RDV en ligne et la facturation AMO automatisee.", bodyEn: "We install electronic medical records, online appointment booking, and automated AMO billing." },
      grow: { body: "On reduit vos no-shows, accelere vos remboursements et vous aide a developper votre patientele en ligne.", bodyEn: "We reduce your no-shows, speed up reimbursements, and help grow your patient base online." },
    },
    whyUs: [
      { title: "Conforme CNDP", titleEn: "CNDP compliant", body: "Chiffrement, consentement patient, journal d'acces — vos donnees de sante sont protegees.", bodyEn: "Encryption, patient consent, access logs — your health data is protected." },
      { title: "AMO/CNSS automatise", titleEn: "AMO/CNSS automated", body: "Codage des actes, generation des bordereaux et suivi des remboursements — fini les rejets.", bodyEn: "Procedure coding, claim generation, and reimbursement tracking — no more rejections." },
      { title: "Rappels qui marchent", titleEn: "Reminders that work", body: "SMS + WhatsApp automatiques qui reduisent les absences de 60% en moyenne.", bodyEn: "Automatic SMS + WhatsApp that reduce no-shows by 60% on average." },
    ],
    contactTagline: { text: "Videz vos salles d'attente, pas votre patience.", textEn: "Let's empty your waiting room, not your patience." },
  },
  retail: {
    painPoints: [
      { title: "Invisible pour 80% des acheteurs", titleEn: "Invisible to 80% of buyers", body: "Les jeunes commercants de Fes vous trouvaient par bouche-a-oreille. Maintenant ils cherchent sur Google — et ne vous trouvent pas. Votre concurrent d'en face, lui, a 200 avis.", bodyEn: "Young merchants from Fes used to find you by word of mouth. Now they search Google — and can't find you. Your competitor across the street has 200 reviews." },
      { title: "50 messages WhatsApp, 30 reponses", titleEn: "50 WhatsApp messages, 30 replies", body: "Chaque message non repondu est une vente perdue. A 200 DH de panier moyen et 20 messages rates par jour, c'est 120,000 DH par mois qui vous echappe.", bodyEn: "Every unanswered message is a lost sale. At 200 MAD average basket and 20 missed messages per day, that's 120,000 MAD per month slipping away." },
      { title: "Stock compte a la main", titleEn: "Stock counted by hand", body: "Votre produit star est en rupture depuis 10 jours — vous ne le savez pas jusqu'a ce qu'un client le demande. Pendant ce temps, 50 unites d'un produit lent prennent la poussiere.", bodyEn: "Your best seller has been out of stock for 10 days — you don't know until a customer asks. Meanwhile, 50 units of a slow mover gather dust." },
    ],
    testimonials: [
      { quote: "Depuis le catalogue WhatsApp automatisé, je réponds à 100% des messages. Mes ventes ont augmenté de 35% en 2 mois.", quoteEn: "Since the automated WhatsApp catalog, I reply to 100% of messages. My sales increased 35% in 2 months.", quoteAr: "من بعد كاتالوغ WhatsApp الأوتوماتيك، كنجاوب على 100% ديال الرسائل. المبيعات زادو ب 35% ف شهرين.", name: "Rachida", role: "Propriétaire de boutique cosmétique", roleEn: "Cosmetics shop owner", roleAr: "صاحبة بوتيك تجميل", city: "Tanger" },
      { quote: "Je ne savais même pas que Google Business Profile existait. En 3 semaines, on a eu 50 avis et les clients mentionnent Google en arrivant.", quoteEn: "I didn't even know Google Business Profile existed. In 3 weeks, we got 50 reviews and customers mention Google when they walk in.", quoteAr: "ما كنتش عارف حتى أن Google Business Profile كاين. ف 3 سيمانات، جمعنا 50 تقييم والزبائن كيقولو لقيناكم فـ Google.", name: "Omar", role: "Commerçant textile", roleEn: "Textile merchant", roleAr: "تاجر نسيج", city: "Casablanca" },
    ],
    integrations: [
      { name: "CMI & CashPlus", desc: "Terminal de paiement pour cartes marocaines et paiement mobile", descEn: "Payment terminal for Moroccan cards and mobile payment" },
      { name: "WhatsApp Business API", desc: "Catalogue produits, reponses automatiques, et liens de paiement", descEn: "Product catalog, auto-replies, and payment links" },
      { name: "Instagram & Facebook Shop", desc: "Vente directe depuis vos reseaux sociaux avec suivi des commandes", descEn: "Direct selling from your social media with order tracking" },
      { name: "Amana (Barid Al-Maghrib)", desc: "Expedition nationale avec suivi automatique et notification client", descEn: "National shipping with automatic tracking and customer notification" },
      { name: "DGI (Facturation electronique)", desc: "Factures et tickets conformes a la reglementation fiscale marocaine", descEn: "Invoices and receipts compliant with Moroccan tax regulations" },
      { name: "Scanner code-barres", desc: "Gestion de stock par scan — entrees, sorties, inventaire en temps reel", descEn: "Stock management by scan — in, out, real-time inventory" },
    ],
    roi: [
      { stat: "35%", label: "d'augmentation des ventes avec WhatsApp automatise", labelEn: "sales increase with automated WhatsApp" },
      { stat: "100%", label: "des messages clients traites (vs 60% avant)", labelEn: "of customer messages handled (vs 60% before)" },
      { stat: "8%", label: "de reduction des ruptures de stock", labelEn: "reduction in stockouts" },
      { stat: "50+", label: "avis Google en 3 semaines", labelEn: "Google reviews in 3 weeks" },
    ],
    workflows: [
      { before: "Un client demande le prix sur Instagram — reponse 4h plus tard", beforeEn: "Customer asks price on Instagram — reply 4h later", after: "Bot WhatsApp envoie le catalogue avec prix et lien de paiement en 10 secondes", afterEn: "WhatsApp bot sends catalog with price and payment link in 10 seconds" },
      { before: "Comptage du stock le dimanche soir — 3 heures a la main", beforeEn: "Stock count on Sunday night — 3 hours by hand", after: "Stock en temps reel — alerte WhatsApp quand un produit passe sous le seuil", afterEn: "Real-time stock — WhatsApp alert when a product drops below threshold" },
      { before: "Fin du mois : on compte les billets et on espere", beforeEn: "End of month: count the bills and hope", after: "Rapport quotidien automatique : revenus, marges, produits vendus", afterEn: "Automatic daily report: revenue, margins, products sold" },
    ],
    faq: [
      { q: "Je fais tout en especes, je ne peux pas passer au digital.", qEn: "I do everything in cash — I can't go digital.", a: "Pas besoin de tout changer d'un coup. Notre caisse trace meme les ventes en especes. Vous gardez le cash, mais vous avez enfin de la visibilite sur vos chiffres.", aEn: "No need to change everything at once. Our POS tracks even cash sales. You keep the cash, but finally have visibility on your numbers." },
      { q: "Je n'ai que 50 produits, c'est trop petit ?", qEn: "I only have 50 products — is that too small?", a: "C'est parfait pour commencer. Le catalogue WhatsApp se configure en 1 heure. Vous commencez a vendre en ligne des le lendemain.", aEn: "That's perfect to start. The WhatsApp catalog is set up in 1 hour. You start selling online the very next day." },
      { q: "Ca va me prendre combien de temps par jour ?", qEn: "How much time will it take me per day?", a: "Moins de temps qu'avant. Le systeme automatise les reponses, les rappels et les rapports. Vous gagnez du temps — vous n'en perdez pas.", aEn: "Less than before. The system automates replies, reminders, and reports. You save time — you don't lose it." },
    ],
    approachSteps: {
      understand: { body: "On passe une journee dans votre boutique : comment vous vendez, gerez le stock, communiquez avec les clients.", bodyEn: "We spend a day in your shop: how you sell, manage stock, communicate with customers." },
      build: { body: "On cree votre presence Google, connecte WhatsApp Business, installe la caisse et le suivi de stock.", bodyEn: "We create your Google presence, connect WhatsApp Business, install POS and inventory tracking." },
      grow: { body: "On lance votre boutique en ligne, optimise vos canaux sociaux et automatise les relances clients.", bodyEn: "We launch your online shop, optimize your social channels, and automate customer follow-ups." },
    },
    whyUs: [
      { title: "Multi-canal unifie", titleEn: "Unified multi-channel", body: "Boutique, site web, Instagram, WhatsApp — un seul stock, une seule caisse, zero confusion.", bodyEn: "Shop, website, Instagram, WhatsApp — one stock, one POS, zero confusion." },
      { title: "WhatsApp-native", titleEn: "WhatsApp-native", body: "Catalogue, commandes et relances automatiques via WhatsApp — le canal que vos clients utilisent deja.", bodyEn: "Catalog, orders, and auto follow-ups via WhatsApp — the channel your customers already use." },
      { title: "A partir de 299 DH/mois", titleEn: "From 299 MAD/month", body: "Des formules adaptees aux petits commerces. Pas besoin d'un budget de grande surface.", bodyEn: "Plans designed for small shops. No big-box budget needed." },
    ],
    contactTagline: { text: "Vendons partout.", textEn: "Let's sell everywhere." },
  },
  education: {
    painPoints: [
      { title: "WhatsApp = chaos", titleEn: "WhatsApp = chaos", body: "Vous envoyez le calendrier des examens — il disparait sous 150 messages de parents qui discutent du parking. Les informations importantes ne passent plus.", bodyEn: "You send the exam calendar — it disappears under 150 parent messages about parking. Important information no longer gets through." },
      { title: "Inscription et paiement manuels", titleEn: "Manual enrollment and payment", body: "Chaque septembre, c'est le meme cirque. Files d'attente, formulaires papier, photocopies. Et en novembre, vous courez apres 40 familles pour les frais en retard.", bodyEn: "Every September, it's the same circus. Queues, paper forms, photocopies. And in November, you're chasing 40 families for late fees." },
      { title: "Absences signalees trop tard", titleEn: "Absences reported too late", body: "Les parents apprennent que leur enfant a seche 5 jours... trois semaines apres. Sans suivi en temps reel, vous perdez la confiance des familles.", bodyEn: "Parents learn their child skipped 5 days... three weeks later. Without real-time tracking, you lose families' trust." },
    ],
    testimonials: [
      { quote: "Les paiements en retard ont chuté de 70% depuis qu'on envoie les rappels automatiques par WhatsApp. Les parents apprécient la transparence.", quoteEn: "Late payments dropped 70% since we started sending automatic WhatsApp reminders. Parents appreciate the transparency.", quoteAr: "التأخر فالخلاص نقص ب 70% من بعد ما بدينا نصيفطو تذكيرات أوتوماتيك ب WhatsApp. الوالدين كيقدّرو الشفافية.", name: "Mme Bennani", role: "Directrice d'école privée", roleEn: "Private school director", roleAr: "مديرة مدرسة خاصة", city: "Fès" },
      { quote: "On a éliminé les groupes WhatsApp parents. Maintenant les annonces passent par le portail — les parents lisent, personne ne peut polluer.", quoteEn: "We eliminated the parent WhatsApp groups. Now announcements go through the portal — parents read them, nobody can spam.", quoteAr: "حيّدنا قروبات WhatsApp ديال الوالدين. دابا الإعلانات كتمشي عبر البورتال — الوالدين كيقراو، حد ما يقدر يلوّث.", name: "M. Alami", role: "Fondateur de centre de formation", roleEn: "Training center founder", roleAr: "مؤسس مركز تكوين", city: "Rabat" },
    ],
    integrations: [
      { name: "CMI Paiement", desc: "Paiement en ligne des frais de scolarite par carte ou virement", descEn: "Online tuition payment by card or transfer" },
      { name: "WhatsApp Business API", desc: "Notifications d'absence, rappels de paiement, et annonces officielles", descEn: "Absence notifications, payment reminders, and official announcements" },
      { name: "Massar (MEN)", desc: "Compatibilite avec le systeme national de gestion scolaire", descEn: "Compatibility with the national school management system" },
      { name: "Systeme NFC/QR", desc: "Pointage de presence automatise a l'entree de chaque classe", descEn: "Automated attendance tracking at each classroom entrance" },
      { name: "Hebergement video", desc: "Plateforme e-learning avec cours video, quiz et suivi", descEn: "E-learning platform with video courses, quizzes, and tracking" },
      { name: "Generation de certificats", desc: "Diplomes et attestations generes automatiquement a la completion", descEn: "Diplomas and certificates auto-generated upon completion" },
    ],
    roi: [
      { stat: "70%", label: "de reduction des paiements en retard", labelEn: "reduction in late payments" },
      { stat: "100%", label: "des parents informes en temps reel des absences", labelEn: "of parents informed of absences in real-time" },
      { stat: "3h", label: "gagnees par semaine sur l'administration", labelEn: "saved per week on admin" },
      { stat: "0", label: "litige 'j'ai deja paye' depuis les recus digitaux", labelEn: "'I already paid' disputes since digital receipts" },
    ],
    workflows: [
      { before: "La secretaire appelle 40 parents pour les frais en retard", beforeEn: "Secretary calls 40 parents about late fees", after: "Rappel WhatsApp automatique le 25 du mois + lien de paiement en ligne", afterEn: "Auto WhatsApp reminder on the 25th + online payment link" },
      { before: "L'enseignant passe 5 minutes a faire l'appel", beforeEn: "Teacher spends 5 minutes on roll call", after: "Scan QR a l'entree — presence enregistree en 30 secondes, parents alertes", afterEn: "QR scan at entrance — attendance logged in 30 seconds, parents alerted" },
      { before: "Les notes arrivent aux parents 3 semaines apres l'examen", beforeEn: "Grades reach parents 3 weeks after the exam", after: "Notes visibles sur le portail des la saisie par l'enseignant", afterEn: "Grades visible on portal as soon as teacher enters them" },
    ],
    faq: [
      { q: "C'est compatible avec Massar ?", qEn: "Is it compatible with Massar?", a: "Oui. Notre systeme exporte les donnees dans un format compatible Massar. Vous n'avez pas besoin de saisir les informations deux fois.", aEn: "Yes. Our system exports data in Massar-compatible format. You don't need to enter information twice." },
      { q: "Les parents vont-ils vraiment utiliser un portail ?", qEn: "Will parents actually use a portal?", a: "Les notifications arrivent par WhatsApp — pas besoin de telecharger une app. Le parent clique sur le lien et voit les notes. C'est aussi simple qu'ouvrir un message.", aEn: "Notifications arrive via WhatsApp — no app to download. The parent clicks the link and sees grades. It's as simple as opening a message." },
      { q: "On est un petit centre de formation, pas une ecole. C'est adapte ?", qEn: "We're a small training center, not a school. Is it adapted?", a: "Absolument. Nos outils s'adaptent : inscription en ligne, paiement, e-learning, certificats. Que vous ayez 20 ou 2,000 apprenants.", aEn: "Absolutely. Our tools adapt: online enrollment, payment, e-learning, certificates. Whether you have 20 or 2,000 learners." },
    ],
    approachSteps: {
      understand: { body: "On rencontre la direction et les enseignants pour comprendre vos processus d'inscription, communication et suivi.", bodyEn: "We meet management and teachers to understand your enrollment, communication, and tracking processes." },
      build: { body: "On deploie le portail parents, le paiement en ligne, le pointage digital et les alertes automatiques.", bodyEn: "We deploy the parent portal, online payment, digital attendance, and automatic alerts." },
      grow: { body: "On lance la plateforme e-learning, ameliore le taux de recouvrement et automatise les rapports.", bodyEn: "We launch the e-learning platform, improve collection rates, and automate reporting." },
    },
    whyUs: [
      { title: "Compatible Massar", titleEn: "Massar compatible", body: "Synchronisation avec le systeme national — pas de double saisie pour votre administration.", bodyEn: "Syncs with the national system — no double entry for your admin staff." },
      { title: "SMS d'abord", titleEn: "SMS-first", body: "Les notifications arrivent par SMS — fonctionne sur tous les telephones, meme les plus simples.", bodyEn: "Notifications arrive by SMS — works on every phone, even the most basic ones." },
      { title: "Modules au choix", titleEn: "Pick your modules", body: "Commencez avec le pointage, ajoutez le paiement plus tard. Vous payez que ce que vous utilisez.", bodyEn: "Start with attendance, add payment later. You only pay for what you use." },
    ],
    contactTagline: { text: "Connectons votre ecole.", textEn: "Let's connect your school." },
  },
  realestate: {
    painPoints: [
      { title: "40-60% de leads perdus", titleEn: "40-60% of leads lost", body: "Un prospect appelle lundi pour un appartement a 2M DH. Personne ne rappelle. Jeudi, il achete chez le concurrent. Sans CRM, chaque lead oublie est une commission perdue.", bodyEn: "A prospect calls Monday about a 2M MAD apartment. Nobody calls back. Thursday, they buy from the competitor. Without a CRM, every forgotten lead is a lost commission." },
      { title: "Annonces dispersees sur 5 plateformes", titleEn: "Listings scattered across 5 platforms", body: "Vous publiez le meme bien sur Avito, Mubawab, Sarouty, Facebook. Quand il est vendu, vous oubliez de le retirer sur 2 d'entre eux. Appels inutiles, temps perdu.", bodyEn: "You post the same property on Avito, Mubawab, Sarouty, Facebook. When it sells, you forget to remove it from 2 of them. Wasted calls, wasted time." },
      { title: "Les MRE achetent ailleurs", titleEn: "Diaspora buyers go elsewhere", body: "Un Marocain a Paris veut acheter a Tanger. Il demande une visite virtuelle — vous envoyez 5 photos WhatsApp. Il achete chez l'agence qui avait une video 360.", bodyEn: "A Moroccan in Paris wants to buy in Tangier. They ask for a virtual tour — you send 5 WhatsApp photos. They buy from the agency that had a 360 video." },
    ],
    testimonials: [
      { quote: "Depuis le CRM, on rappelle chaque prospect en moins de 5 minutes. Notre taux de conversion a triplé en 4 mois.", quoteEn: "Since the CRM, we call back every prospect in under 5 minutes. Our conversion rate tripled in 4 months.", quoteAr: "من بعد CRM، كنردّو على كل بروسبكت فأقل من 5 دقائق. معدل التحويل تضاعف 3 مرات ف 4 شهور.", name: "Amine", role: "Directeur d'agence immobilière", roleEn: "Real estate agency director", roleAr: "مدير وكالة عقارية", city: "Casablanca" },
      { quote: "Un MRE à Lyon a acheté un appartement à 1.8M DH entièrement à distance grâce à la visite virtuelle. Avant, on aurait perdu cette vente.", quoteEn: "A Moroccan expat in Lyon bought a 1.8M MAD apartment entirely remotely thanks to the virtual tour. Before, we would have lost that sale.", quoteAr: "واحد MRE فليون شرى شقة ب 1.8 مليون درهم كاملة عن بعد بفضل الزيارة الافتراضية. قبل، كنّا غادي نخسرو هاد البيعة.", name: "Leila", role: "Agent immobilier", roleEn: "Real estate agent", roleAr: "وكيلة عقارية", city: "Tanger" },
    ],
    integrations: [
      { name: "Avito Immobilier", desc: "Publication et mise a jour automatique de vos annonces", descEn: "Automatic listing publication and updates" },
      { name: "Mubawab & Sarouty", desc: "Diffusion multi-plateforme depuis une seule interface", descEn: "Multi-platform distribution from a single interface" },
      { name: "Facebook Marketplace", desc: "Publication croisee de vos biens avec suivi des leads", descEn: "Cross-posting of your properties with lead tracking" },
      { name: "Matterport / Ricoh Theta", desc: "Creation et hebergement de visites virtuelles 360 immersives", descEn: "Creation and hosting of immersive 360 virtual tours" },
      { name: "Loi 43-20 (Signature electronique)", desc: "Compromis et mandats signes electroniquement en conformite", descEn: "Sales agreements and mandates signed electronically in compliance" },
      { name: "CMI Paiement", desc: "Encaissement en ligne des arrhes et acomptes", descEn: "Online collection of deposits and down payments" },
    ],
    roi: [
      { stat: "3x", label: "plus de conversions grace au suivi automatique", labelEn: "more conversions thanks to automatic follow-up" },
      { stat: "5 min", label: "de temps de reponse moyen (vs 48h avant)", labelEn: "average response time (vs 48h before)" },
      { stat: "30%", label: "des ventes proviennent desormais de la diaspora (MRE)", labelEn: "of sales now come from diaspora (MRE) buyers" },
      { stat: "0", label: "appel pour un bien deja vendu", labelEn: "calls about already-sold properties" },
    ],
    workflows: [
      { before: "Un lead Avito arrive — l'agent le voit 2 jours plus tard", beforeEn: "An Avito lead comes in — agent sees it 2 days later", after: "WhatsApp auto en 5 min + attribution a l'agent de zone", afterEn: "Auto WhatsApp in 5 min + assignment to zone agent" },
      { before: "Le bien est vendu — l'annonce reste sur 3 sites pendant 2 semaines", beforeEn: "Property is sold — listing stays on 3 sites for 2 weeks", after: "Changement de statut = desactivation automatique partout", afterEn: "Status change = automatic deactivation everywhere" },
      { before: "L'etat des lieux est un formulaire papier — disputes a la sortie", beforeEn: "Move-in inspection is a paper form — disputes at move-out", after: "Etat des lieux digital avec photos horodatees et signature electronique", afterEn: "Digital inspection with timestamped photos and electronic signature" },
    ],
    faq: [
      { q: "Je suis agent independant, pas une agence. C'est pour moi ?", qEn: "I'm an independent agent, not an agency. Is this for me?", a: "Justement. En tant qu'independant, chaque lead compte encore plus. Le CRM vous fait gagner 2h par jour et ne laisse aucun prospect tomber.", aEn: "Exactly. As an independent, every lead matters even more. The CRM saves you 2h per day and lets no prospect slip through." },
      { q: "Les visites virtuelles, ca coute cher ?", qEn: "Are virtual tours expensive?", a: "L'investissement dans la camera se rentabilise des la premiere vente MRE. On peut aussi proposer le service en prestation ponctuelle pour vos biens premium.", aEn: "The camera investment pays for itself from the first MRE sale. We can also offer the service as a one-off for your premium properties." },
      { q: "La signature electronique a-t-elle une valeur legale au Maroc ?", qEn: "Does electronic signature have legal value in Morocco?", a: "Oui. La loi 43-20 sur les services de confiance reconnait la signature electronique. Nos outils sont conformes et produisent des documents juridiquement valables.", aEn: "Yes. Law 43-20 on trust services recognizes electronic signatures. Our tools are compliant and produce legally valid documents." },
    ],
    approachSteps: {
      understand: { body: "On analyse vos sources de leads, votre processus de suivi et les plateformes que vous utilisez deja.", bodyEn: "We analyze your lead sources, follow-up process, and the platforms you already use." },
      build: { body: "On installe le CRM immobilier, la diffusion multi-plateforme et les visites virtuelles 3D.", bodyEn: "We install the real estate CRM, multi-platform listing syndication, and 3D virtual tours." },
      grow: { body: "On automatise vos relances, augmente votre taux de conversion et capte les acheteurs MRE.", bodyEn: "We automate your follow-ups, increase your conversion rate, and capture MRE buyers." },
    },
    whyUs: [
      { title: "Avito + Mubawab connectes", titleEn: "Avito + Mubawab connected", body: "Publiez une fois, diffusez partout. Modification du prix ? Mis a jour sur toutes les plateformes.", bodyEn: "Post once, publish everywhere. Price change? Updated on all platforms." },
      { title: "Visites 3D pour les MRE", titleEn: "3D tours for MRE buyers", body: "Les Marocains de l'etranger visitent a distance et reservent par signature electronique.", bodyEn: "Moroccans abroad visit remotely and reserve with electronic signature." },
      { title: "CRM qui relance pour vous", titleEn: "CRM that follows up for you", body: "Chaque lead recoit un WhatsApp en 5 minutes. Plus personne ne tombe dans l'oubli.", bodyEn: "Every lead gets a WhatsApp in 5 minutes. No one falls through the cracks." },
    ],
    contactTagline: { text: "Ne perdons plus un seul lead.", textEn: "Let's never lose a lead again." },
  },
  logistics: {
    painPoints: [
      { title: "3 heures de reconciliation chaque soir", titleEn: "3 hours of reconciliation every evening", body: "80 livraisons par jour, bons papier froisses. Le dispatacher rentre tout dans Excel le soir. Quand un client conteste — aucune preuve.", bodyEn: "80 deliveries per day, crumpled paper slips. The dispatcher enters everything in Excel at night. When a client disputes — no proof." },
      { title: "Chauffeurs perdus dans le trafic", titleEn: "Drivers lost in traffic", body: "Sans optimisation, chaque chauffeur perd 1 a 2 heures par jour dans les embouteillages de Casablanca. Sur 10 chauffeurs, ca fait 10 a 20 heures gaspillees quotidiennement.", bodyEn: "Without optimization, each driver loses 1-2 hours per day in Casablanca traffic. Across 10 drivers, that's 10-20 hours wasted daily." },
      { title: "Clients qui appellent 40 fois par jour", titleEn: "Clients calling 40 times a day", body: "Vos clients n'ont aucune visibilite sur leurs colis. Ils appellent, vous appelez le chauffeur, le chauffeur ne repond pas. Boucle de frustration pour tout le monde.", bodyEn: "Your clients have zero visibility on their packages. They call you, you call the driver, the driver doesn't answer. Frustration loop for everyone." },
    ],
    testimonials: [
      { quote: "Le portail de suivi client a réduit nos appels entrants de 65%. Mes 2 standardistes peuvent enfin faire autre chose.", quoteEn: "The client tracking portal reduced our incoming calls by 65%. My 2 receptionists can finally do other things.", quoteAr: "بورتال تتبع الزبائن نقّص المكالمات الداخلة ب 65%. الاستقبال ديالي ولّاو يقدرو يديرو حوايج أخرى.", name: "Rachid", role: "Directeur de société de livraison", roleEn: "Delivery company director", roleAr: "مدير شركة توصيل", city: "Casablanca" },
      { quote: "L'optimisation d'itinéraires nous fait économiser 800 litres de gasoil par mois. Le système s'est remboursé en 6 semaines.", quoteEn: "Route optimization saves us 800 liters of diesel per month. The system paid for itself in 6 weeks.", quoteAr: "تحسين المسارات كيوفّر لينا 800 لتر ديال الگازوال فالشهر. السيستيم رجّع ثمنو ف 6 سيمانات.", name: "Mourad", role: "Transporteur inter-villes", roleEn: "Inter-city transporter", roleAr: "ناقل بين المدن", city: "Agadir" },
    ],
    integrations: [
      { name: "GPS & OBD-II", desc: "Geolocalisation en temps reel et telemetrie vehicule (vitesse, consommation)", descEn: "Real-time geolocation and vehicle telemetry (speed, consumption)" },
      { name: "Google Maps Directions API", desc: "Calcul d'itineraires optimaux avec trafic en temps reel", descEn: "Optimal route calculation with real-time traffic" },
      { name: "WhatsApp Business API", desc: "Notifications automatiques a chaque etape de la livraison", descEn: "Automatic notifications at each delivery stage" },
      { name: "Plateformes e-commerce", desc: "Webhooks pour reception automatique des commandes a livrer", descEn: "Webhooks for automatic reception of orders to deliver" },
      { name: "Cartes carburant", desc: "Suivi des depenses carburant par vehicule et par chauffeur", descEn: "Fuel expense tracking per vehicle and driver" },
      { name: "Scanner code-barres/QR", desc: "Scan des colis a chaque etape — preuve irrefutable de la chaine", descEn: "Package scan at each stage — irrefutable chain of custody proof" },
    ],
    roi: [
      { stat: "65%", label: "de reduction des appels clients entrants", labelEn: "reduction in inbound client calls" },
      { stat: "30%", label: "de livraisons en plus par chauffeur par jour", labelEn: "more deliveries per driver per day" },
      { stat: "800L", label: "de carburant economises par mois (10 vehicules)", labelEn: "of fuel saved per month (10 vehicles)" },
      { stat: "0", label: "litige de livraison non resolu grace aux preuves GPS/photo", labelEn: "unresolved delivery disputes thanks to GPS/photo proof" },
    ],
    workflows: [
      { before: "Le dispatacher ecrit les adresses sur une feuille pour le chauffeur", beforeEn: "Dispatcher writes addresses on a sheet for the driver", after: "Tournee optimisee envoyee sur l'appli chauffeur — navigation GPS integree", afterEn: "Optimized route sent to driver app — GPS navigation included" },
      { before: "Le client appelle pour savoir ou est son colis", beforeEn: "Client calls to ask where their package is", after: "Lien de suivi WhatsApp avec statut en temps reel et heure estimee", afterEn: "WhatsApp tracking link with real-time status and estimated time" },
      { before: "Panne sur l'autoroute — reparation d'urgence a 8,000 DH", beforeEn: "Breakdown on the highway — emergency repair at 8,000 MAD", after: "Alerte maintenance preventive a 500 km — entretien planifie a 800 DH", afterEn: "Preventive maintenance alert at 500 km — planned service at 800 MAD" },
    ],
    faq: [
      { q: "Mes chauffeurs vont-ils accepter d'etre traces par GPS ?", qEn: "Will my drivers accept being GPS tracked?", a: "C'est presente comme un outil d'aide, pas de surveillance. Le GPS les aide a trouver les adresses et optimise leur journee. La plupart des chauffeurs apprecient apres 1 semaine.", aEn: "It's presented as an aid tool, not surveillance. GPS helps them find addresses and optimize their day. Most drivers appreciate it after 1 week." },
      { q: "J'ai seulement 3 vehicules. C'est rentable ?", qEn: "I only have 3 vehicles. Is it worth it?", a: "Avec 3 vehicules, une seule panne evitee grace a la maintenance preventive rembourse 6 mois d'abonnement. Et l'optimisation d'itineraires economise du carburant des le premier jour.", aEn: "With 3 vehicles, a single avoided breakdown through preventive maintenance pays for 6 months of subscription. And route optimization saves fuel from day one." },
      { q: "Comment ca s'integre avec les boutiques en ligne qui m'envoient des colis ?", qEn: "How does it integrate with online shops that send me packages?", a: "On se connecte aux principales plateformes e-commerce marocaines. Les commandes arrivent automatiquement dans votre systeme — plus de saisie manuelle.", aEn: "We connect to major Moroccan e-commerce platforms. Orders arrive automatically in your system — no more manual entry." },
    ],
    approachSteps: {
      understand: { body: "On monte dans vos camions, on observe le dispatching et on analyse vos flux de livraison et de retour.", bodyEn: "We ride in your trucks, observe dispatching, and analyze your delivery and return flows." },
      build: { body: "On deploie le GPS, l'optimisation de tournees, la preuve de livraison digitale et le portail client.", bodyEn: "We deploy GPS tracking, route optimization, digital proof of delivery, and the client portal." },
      grow: { body: "On reduit vos couts carburant, elimine les litiges et vous connecte aux plateformes e-commerce.", bodyEn: "We reduce fuel costs, eliminate disputes, and connect you to e-commerce platforms." },
    },
    whyUs: [
      { title: "GPS grade professionnel", titleEn: "Professional-grade GPS", body: "Boitiers Teltonika concus pour les conditions marocaines. Remplacement sous 48h en cas de panne.", bodyEn: "Teltonika devices built for Moroccan conditions. 48h replacement if one fails." },
      { title: "Preuve irrefutable", titleEn: "Irrefutable proof", body: "Photo, signature, GPS et horodatage a chaque livraison. Les litiges disparaissent.", bodyEn: "Photo, signature, GPS, and timestamp on every delivery. Disputes disappear." },
      { title: "ROI mesurable", titleEn: "Measurable ROI", body: "25% d'economie carburant, 70% de pannes en moins. Le systeme se rentabilise en 3 mois.", bodyEn: "25% fuel savings, 70% fewer breakdowns. The system pays for itself in 3 months." },
    ],
    contactTagline: { text: "Livrons sans stress.", textEn: "Let's deliver stress-free." },
  },
};
