/**
 * Tadnun — Niche blog articles insertion script
 * 6 topics × 3 languages (FR / EN / AR) = 18 articles
 *
 * Usage:
 *   SUPABASE_SERVICE_ROLE_KEY=your_key node scripts/blog-niche.js
 *
 * Requires NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY
 * (reads from env or falls back to hardcoded project URL)
 */

require('dotenv').config({ path: '.env.local' });

const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://txkcboapwcqzxezauplq.supabase.co',
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// ─────────────────────────────────────────────────────────────────────────────
// ARTICLES
// ─────────────────────────────────────────────────────────────────────────────

const articles = [

  // ═══════════════════════════════════════════════════════════════════════════
  // ARTICLE 1 — RIAD & COMMISSIONS BOOKING
  // ═══════════════════════════════════════════════════════════════════════════

  {
    slug: 'reduire-commissions-booking-riad',
    locale: 'fr',
    title: 'Comment réduire les commissions Booking.com pour votre riad',
    description: 'Votre riad reverse 15 à 20% à Booking à chaque réservation. Voici comment bâtir un canal direct et garder cette marge chez vous.',
    sector: 'tourism',
    status: 'published',
    published_at: new Date('2025-11-10').toISOString(),
    content: `## Ce que vous payez vraiment chaque mois

Prenons un exemple concret. Votre riad à Marrakech affiche un tarif moyen de 900 MAD la nuit. Sur 20 réservations par mois, cela représente 18 000 MAD de chiffre d'affaires. Avec une commission Booking.com à 17%, vous leur reversez 3 060 MAD — chaque mois, toute l'année.

Sur douze mois, c'est plus de 36 000 MAD partis dans les caisses d'une entreprise néerlandaise. De quoi financer une belle rénovation, recruter un assistant, ou simplement respirer.

Le problème, c'est que beaucoup de propriétaires de riads se sentent prisonniers de la plateforme. Elle apporte de la visibilité, certes. Mais cette dépendance a un coût réel, et il est temps de le réduire.

## Pourquoi les voyageurs réservent en direct (quand on leur facilite la tâche)

Les clients qui séjournent dans votre riad vous font déjà confiance. S'ils reviennent, ou s'ils recommandent votre établissement à leur entourage, la réservation passe encore par Booking — et vous payez à nouveau.

Pourtant, la plupart des voyageurs préfèrent réserver directement s'ils savent comment le faire, et si vous leur offrez une petite raison de le faire : un transfert depuis l'aéroport de Marrakech-Menara inclus, un petit-déjeuner maison offert, une réduction de 5% sur le tarif affiché.

Le problème n'est pas la motivation du client. C'est l'absence d'un canal direct simple et rassurant.

## Les trois briques d'un canal de réservation directe

**1. Un moteur de réservation sur votre propre site**

Il en existe des accessibles et sans commission mensuelle élevée (Lodgify, Beds24, ou un développement sur-mesure). L'essentiel : le client doit pouvoir choisir ses dates, voir les disponibilités en temps réel, et payer en ligne en quelques clics — par carte ou via CMI pour les clients marocains.

**2. Une page Google "établissement" bien tenue**

Beaucoup de clients cherchent votre riad sur Google après l'avoir trouvé sur Booking. Si votre fiche Google Business Profile est à jour, avec un lien direct vers votre site, vous interceptez cette intention avant qu'elle retourne vers la plateforme.

**3. Un email de post-séjour automatique**

À la fin de chaque séjour, un email simple : "Merci pour votre visite. Pour votre prochain séjour ou pour vos amis, réservez directement sur notre site et bénéficiez de [l'avantage X]." Ce message coûte presque rien à envoyer et peut transformer un client Booking en client direct pour la vie.

## Combien ça prend de mettre ça en place ?

Un site de riad avec moteur de réservation intégré, une fiche Google soignée, et une séquence d'emails automatiques : c'est un projet de quelques semaines, pas de plusieurs mois. Le retour sur investissement se calcule en nombre de réservations directes nécessaires pour amortir le développement — souvent moins de dix.

## Ce que vous ne perdez pas

Attention : il ne s'agit pas de quitter Booking du jour au lendemain. La plateforme reste utile pour remplir les périodes creuses, attirer de nouveaux clients, et maintenir votre visibilité internationale. L'objectif est de réduire votre dépendance, pas de couper le cordon d'un coup.

Visez 30 à 40% de réservations directes dans un premier temps. C'est atteignable en six mois avec les bons outils.

---

Chez Tadnun, nous aidons les riads et maisons d'hôtes du Maroc à construire leurs outils numériques : site de réservation, gestion des disponibilités, emails automatiques. Si vous souhaitez en parler sans engagement, [contactez-nous](/contact).
`,
  },

  {
    slug: 'reduce-booking-commissions-riad-en',
    locale: 'en',
    title: 'How to reduce Booking.com commissions for your riad',
    description: 'Your riad pays 15–20% to Booking on every reservation. Here is how to build a direct booking channel and keep that margin for yourself.',
    sector: 'tourism',
    status: 'published',
    published_at: new Date('2025-11-10').toISOString(),
    content: `## What you are actually paying every month

Let's put a number on it. Your riad in Marrakech charges an average of 900 MAD per night. With 20 bookings a month, that's 18,000 MAD in revenue — and at a 17% Booking.com commission, you hand over 3,060 MAD of it. Every single month.

Over a year, that's more than 36,000 MAD going to a Dutch company. Money that could go toward a renovation, a part-time hire, or simply more breathing room.

Many riad owners feel trapped. The platform brings visibility, and that's real. But the dependency has a hard cost, and it is worth reducing it deliberately.

## Why guests book direct — when you make it easy

The guests who stay at your riad already trust you. When they come back, or refer a friend, that next booking still flows through Booking.com. You pay again.

Most travellers would happily book direct if they knew how — and if there's a small reason to do so: a complimentary transfer from Marrakech-Menara airport, a home-cooked breakfast, a 5% discount off the displayed rate. The motivation is there. What's missing is a simple, trustworthy direct channel.

## Three building blocks of a direct booking channel

**1. A booking engine on your own website**

There are affordable options with no hefty monthly fees (Lodgify, Beds24, or a custom build). What matters: guests should be able to pick dates, see live availability, and pay in a few clicks — by card or via CMI for Moroccan guests.

**2. A well-maintained Google Business Profile**

Many guests search for your riad by name on Google after finding it on Booking. If your profile is up to date with a link to your website, you catch that intent before it loops back to the platform.

**3. An automated post-stay email**

After every checkout: a simple message — "Thank you for your stay. For your next visit or to refer a friend, book directly on our site and enjoy [benefit X]." It costs almost nothing to send and can turn a Booking.com guest into a lifetime direct customer.

## How long does it take?

A riad website with an integrated booking engine, a polished Google profile, and an automated email sequence: that's a project of a few weeks, not months. The payback period in direct bookings is usually fewer than ten reservations.

## What you do not lose

The goal is not to abandon Booking.com overnight. The platform still fills slow periods, attracts first-time guests, and maintains your international reach. The aim is to reduce dependence, not cut the cord entirely.

Start by targeting 30–40% direct bookings within six months. That is very achievable with the right tools in place.

---

At Tadnun, we help riads and guesthouses across Morocco build their digital toolkit: booking sites, availability management, automated emails. If you'd like to talk it through, [get in touch](/contact).
`,
  },

  {
    slug: 'reduire-commissions-booking-riad-ar',
    locale: 'ar',
    title: 'كيفاش تنقص من عمولة Booking.com ديال الرياض ديالك',
    description: 'الرياض ديالك كيدفع 15 حتى 20% لـ Booking في كل حجز. شوف كيفاش تبني قناة حجز مباشر وتخلي هاد الفلوس عندك.',
    sector: 'tourism',
    status: 'published',
    published_at: new Date('2025-11-10').toISOString(),
    content: `## شحال كتخسر كل شهر؟

خلينا نحسبو مع بعض. الرياض ديالك فمراكش عنده سعر متوسط 900 درهم الليلة. مع 20 حجز فالشهر، هذا 18,000 درهم. وبعمولة Booking.com ب 17%، كتعطيهم 3,060 درهم — كل شهر، من غير ما تتوقف.

فعام كامل، هذا أكثر من 36,000 درهم مشاو لشركة في هولندا. فلوس كان يمكنها تتحول لتجديد، أو توظيف، أو على الأقل راحة بال.

المشكل أن بزاف دمصحاب الرياض كيحسو بلي هم محبوسين. Booking كتجيب الضيوف، هذا صحيح. ولكن هاد الاعتماد عليها عنده ثمن حقيقي.

## علاش الضيوف كيحجزو مباشر — إلا سهلت عليهم

الضيوف اللي نزلو عندك بالفعل واثقين فيك. إلا رجعو مرة ثانية ولا أرسلو صحابهم، الحجز كيمر على Booking — وكتدفع العمولة من جديد.

الأغلبية دالضيوف كيفضلو يحجزو مباشر إلا عرفو كيفاش، وإلا عطيتهم سبب بسيط: ترانسفير من مطار مراكش المنارة، فطور بيتي، أو خصم 5% على السعر المعروض. الرغبة موجودة. اللي ناقص هو قناة مباشرة سهلة وموثوقة.

## تلاتة دعائم لقناة حجز مباشر

**1. محرك حجز في الموقع ديالك**

كاينين خيارات بأسعار معقولة بلا رسوم شهرية غالية (Lodgify، Beds24، أو تطوير خاص). المهم: الضيف يختار التواريخ، يشوف التوفر في الوقت الحقيقي، ويخلص بكليك — بكارطة أو عبر CMI للمغاربة.

**2. صفحة Google Business Profile محطوطة مزيان**

بزاف من الضيوف كيقلبو على الرياض ديالك بالاسم في Google بعدما لقاوه في Booking. إلا صفحتك محدثة مع رابط للموقع ديالك، كتاخد هاد الزيارة قبل ما ترجع لـ Booking.

**3. إيميل أوتوماتيكي بعد الإقامة**

فآخر كل إقامة: رسالة بسيطة — "شكراً على زيارتكم. للحجز الجاي أو لأصحابكم، احجزو مباشر في الموقع ديالنا واستفادو من [الميزة X]." هاد الرسالة ما تكلف تقريباً والش، وتقدر تحول ضيف Booking لزبون دائم.

## شحال كتاخد هاد الأمور؟

موقع رياض مع محرك حجز، صفحة Google محطوطة مزيان، وإيميلات أوتوماتيكية: هذا مشروع ديال أسابيع مش شهور. ويرجع عليك من أول عشر حجوزات مباشرة.

## واش كتخسر شي حاجة؟

الهدف ماشي تخرج من Booking فاليوم. المنصة باقي مفيدة لملء فترات الركود وجلب ضيوف جدد. الهدف هو تنقص الاعتماد عليها، مش تقطعها دفعة وحدة.

ابدأ بـ 30 حتى 40% حجوزات مباشرة في ستة أشهر. هذا ممكن بالأدوات الصحيحة.

---

عند Tadnun، كنساعدو الرياضات والمنازل السياحية في المغرب على بناء أدواتهم الرقمية: موقع حجز، تسيير التوفر، إيميلات أوتوماتيكية. إلا بغيتي تتكلمو معنا بلا التزام، [تواصل معنا](/contact).
`,
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // ARTICLE 2 — PAIEMENT EN LIGNE CMI
  // ═══════════════════════════════════════════════════════════════════════════

  {
    slug: 'paiement-en-ligne-commercant-maroc-cmi',
    locale: 'fr',
    title: 'Paiement en ligne pour commerçants marocains : guide CMI',
    description: 'Accepter les paiements par carte au Maroc passe par le CMI. Voici comment fonctionne le processus, les coûts réels et comment s\'intégrer à votre boutique.',
    sector: 'retail',
    status: 'published',
    published_at: new Date('2025-11-15').toISOString(),
    content: `## Pourquoi le paiement en ligne est devenu incontournable

Un client entre sur votre site, choisit un article, et au moment de payer, il n'y a pas de solution de paiement en ligne. Il ferme l'onglet. Cette vente est perdue.

Ce scénario se répète des dizaines de fois par semaine pour des commerçants marocains qui ont fait l'effort de créer un site ou une boutique en ligne, mais n'ont pas franchi le dernier kilomètre : accepter le paiement par carte.

La bonne nouvelle : c'est devenu nettement plus accessible. Le CMI (Centre Monétique Interbancaire) est la passerelle officielle pour les paiements par carte au Maroc, et plusieurs intégrations existent pour relier votre boutique à ce système.

## Comment fonctionne le CMI

Le CMI est un organisme créé par les banques marocaines pour gérer les transactions par carte entre commerçants et clients. Quand un client paye sur votre site avec une carte Visa ou Mastercard marocaine, la transaction passe par le CMI.

Pour accepter ces paiements, vous devez signer un contrat de commerce électronique (CCE) avec votre banque. C'est votre banque — Attijariwafa, CIH, BMCE, Banque Populaire, ou autre — qui joue le rôle d'intermédiaire et vous relie au CMI.

Le processus en quatre étapes :
1. Vous demandez un contrat CCE à votre banque
2. Votre banque approuve et vous transmet les identifiants CMI
3. Vous (ou votre développeur) intégrez la passerelle CMI dans votre site
4. Les paiements s'encaissent directement sur votre compte bancaire

## Les coûts réels

Les frais varient selon votre banque, mais voici ce à quoi vous attendre :

- **Commission par transaction** : entre 1,5% et 2,5% du montant selon votre banque et votre volume
- **Abonnement mensuel** : souvent entre 100 et 200 MAD selon les établissements
- **Frais d'activation** : parfois entre 500 et 1 500 MAD à l'ouverture, parfois offerts

Ces chiffres sont indicatifs. Négociez avec votre banque, surtout si vous avez déjà un compte professionnel actif.

## Les délais à anticiper

Le processus d'activation prend généralement de 2 à 4 semaines. Votre banque doit valider votre activité, vérifier votre site (il doit avoir des mentions légales, une politique de retour, et une adresse physique), puis transmettre les accès.

Prévoyez ce délai dans votre planning — surtout si vous lancez une boutique pour une saison précise (Ramadan, rentrée scolaire).

## L'intégration technique

Une fois les identifiants reçus, votre boutique doit être connectée à l'API CMI. Si vous utilisez WooCommerce ou PrestaShop, des plugins existent. Pour un site sur-mesure, un développeur peut intégrer l'API directement.

Points importants :
- Le paiement doit se faire sur une page HTTPS sécurisée
- Le client ne doit jamais quitter votre site pour une interface non branded
- Prévoyez une page de confirmation de paiement claire, avec récapitulatif de la commande

## Et pour les paiements en espèces ?

Le paiement à la livraison (cash on delivery) reste très courant au Maroc. Proposez les deux options : paiement en ligne et paiement à la livraison. Certains clients préfèrent d'abord tester, puis passent au paiement en ligne une fois en confiance.

---

Chez Tadnun, nous accompagnons les commerçants marocains de Casablanca, Rabat, Fès et Tanger dans la création de boutiques en ligne complètes — avec intégration CMI, gestion des stocks, et suivi des commandes. [Discutons de votre projet](/contact).
`,
  },

  {
    slug: 'online-payment-moroccan-merchants-cmi-en',
    locale: 'en',
    title: 'Online payments for Moroccan merchants: a CMI guide',
    description: 'Accepting card payments in Morocco goes through CMI. Here is how the process works, what it costs, and how to connect it to your online store.',
    sector: 'retail',
    status: 'published',
    published_at: new Date('2025-11-15').toISOString(),
    content: `## Why online payment is no longer optional

A customer lands on your website, picks a product, and finds no way to pay online. They close the tab. That sale is gone.

This happens dozens of times a week for Moroccan merchants who have done the hard work of building an online presence but have not completed the last step: accepting card payments.

The good news is that this has become much more accessible. CMI (Centre Monétique Interbancaire) is the official card payment gateway in Morocco, and several integrations exist to connect your store to it.

## How CMI works

CMI is an institution created by Moroccan banks to manage card transactions between merchants and customers. When a customer pays on your site with a Moroccan Visa or Mastercard, the transaction flows through CMI.

To accept these payments, you need to sign an e-commerce contract (CCE) with your bank. Your bank — Attijariwafa, CIH, BMCE, Banque Populaire, or another — acts as the intermediary between you and CMI.

The four-step process:
1. Request a CCE contract from your bank
2. Your bank approves and sends you your CMI credentials
3. You (or your developer) integrate the CMI gateway into your site
4. Payments land directly in your bank account

## Real costs

Fees vary by bank, but here is what to expect:

- **Per-transaction commission**: between 1.5% and 2.5% depending on your bank and volume
- **Monthly subscription**: often 100–200 MAD depending on the institution
- **Activation fee**: sometimes 500–1,500 MAD at opening, sometimes waived

These are indicative figures. Negotiate with your bank, especially if you already have an active business account with them.

## Timelines to plan for

Activation typically takes 2–4 weeks. Your bank needs to validate your business, check your website (it must have legal notices, a returns policy, and a physical address), then transmit your access credentials.

Build this into your launch timeline — especially if you are opening a store for a specific season like Ramadan or the back-to-school period.

## The technical integration

Once you have your credentials, your store needs to connect to the CMI API. If you use WooCommerce or PrestaShop, plugins are available. For a custom site, a developer can integrate the API directly.

Key points:
- Payment must take place on a secure HTTPS page
- The customer should never leave your site for an unbranded interface
- Plan a clear order confirmation page with a full order summary

## What about cash payments?

Cash on delivery remains very common in Morocco. Offer both options: online card payment and cash on delivery. Some customers prefer to test the experience first, then switch to online payment once trust is established.

---

At Tadnun, we help merchants in Casablanca, Rabat, Fès and Tanger build complete online stores — with CMI integration, inventory management, and order tracking. [Let's talk about your project](/contact).
`,
  },

  {
    slug: 'paiement-en-ligne-commercant-maroc-cmi-ar',
    locale: 'ar',
    title: 'الدفع أونلاين للتجار المغاربة: دليل CMI',
    description: 'باش تقبل الدفع بالكارطة فالمغرب، خاصك تمر على CMI. شوف كيفاش يخدم النظام، شحال يكلف، وكيفاش تربطه بالمتجر ديالك.',
    sector: 'retail',
    status: 'published',
    published_at: new Date('2025-11-15').toISOString(),
    content: `## علاش الدفع أونلاين ما بقاش اختياري

زبون دخل للموقع ديالك، ختار منتوج، ولقا ما كاينش طريقة للدفع أونلاين. سكر الطاب. هاد البيعة راحت.

هاد الشي كيوقع عشرات المرات فالأسبوع مع تجار مغاربة خدمو بزاف باش يبنو موجودية ديجيتال، ولكن ما كملوش الخطوة الأخيرة: قبول الدفع بالكارطة.

الخبر الزين هو بلي الأمور صارت أسهل بكتير. CMI (Centre Monétique Interbancaire) هو البوابة الرسمية للدفع بالكارطة فالمغرب، وكاينين عدة طرق لربط المتجر ديالك به.

## كيفاش يخدم CMI

CMI هو مؤسسة أسستها البنوك المغربية لتسيير معاملات الكارطة بين التجار والزبناء. ملي زبون كيخلص فالموقع ديالك بكارطة Visa أو Mastercard مغربية، المعاملة كتمر على CMI.

باش تقبل هاد المدفوعات، خاصك تعقد اتفاقية تجارة إلكترونية (CCE) مع البنك ديالك. بنكك — Attijariwafa، CIH، BMCE، البنك الشعبي، أو غيره — كيخدم بحيث وسيط بينك وبين CMI.

أربع خطوات:
1. اطلب عقد CCE من البنك ديالك
2. البنك يوافق ويعطيك بيانات دخول CMI
3. نت (أو المطور ديالك) تربط بوابة CMI بالموقع ديالك
4. المدفوعات كتوصل مباشرة للحساب البنكي ديالك

## التكاليف الحقيقية

الرسوم كتختلف حسب البنك، ولكن هاكاك بلي تتوقعه:

- **عمولة على كل معاملة**: بين 1.5% و 2.5% حسب البنك والحجم
- **اشتراك شهري**: غالباً بين 100 و 200 درهم
- **رسوم التفعيل**: أحياناً بين 500 و 1,500 درهم، وأحياناً مجانية

هاد الأرقام تقريبية. تفاوض مع البنك ديالك، خاصة إلا عندك حساب مهني نشيط.

## المدد اللي خاصك تحسب ليها

التفعيل كياخد عادةً من أسبوعين لأربعة أسابيع. البنك خاصه يتحقق من نشاطك، يفحص الموقع ديالك (خاصو يكون فيه ذكر قانوني، سياسة إرجاع، وعنوان حقيقي)، ثم يرسل لك بيانات الدخول.

حسب هاد المدة فالتخطيط ديالك — خاصة إلا كتلانص متجر لموسم معين بحال رمضان أو الدخول المدرسي.

## الربط التقني

ملي وصلك بيانات الدخول، المتجر ديالك خاصه يتربط بـ API ديال CMI. إلا كتستخدم WooCommerce أو PrestaShop، كاينين إضافات جاهزة. لموقع خاص، مطور يقدر يربط الـ API مباشرة.

نقاط مهمة:
- الدفع خاصه يكون فصفحة HTTPS آمنة
- الزبون ما خاصوش يخرج من الموقع ديالك لصفحة أخرى
- دير صفحة تأكيد طلب واضحة مع ملخص الطلب

## وواش نخليو الدفع بالكاش؟

الدفع عند التسليم باقي شائع بزاف فالمغرب. عرض الاثنين: الدفع أونلاين والدفع عند التسليم. بعض الزبناء يفضلو يجربو أولاً، ثم يبدلو للدفع أونلاين ملي يثقو.

---

عند Tadnun، كنساعدو التجار فالدارالبيضاء، الرباط، فاس وطنجة على بناء متاجر أونلاين كاملة — مع ربط CMI، تسيير المخزون، وتتبع الطلبيات. [حدثونا على مشروعكم](/contact).
`,
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // ARTICLE 3 — COOPÉRATIVE AGRICOLE
  // ═══════════════════════════════════════════════════════════════════════════

  {
    slug: 'gestion-cooperative-agricole-papier-digital',
    locale: 'fr',
    title: 'Gestion coopérative agricole : du papier au digital',
    description: 'Adhérents, livraisons, paiements sur des cahiers. Il existe une meilleure façon. Voici comment les coopératives agricoles marocaines passent au numérique.',
    sector: 'agriculture',
    status: 'published',
    published_at: new Date('2025-11-20').toISOString(),
    content: `## Le quotidien d'un président de coopérative

Il est 7h du matin. Vous êtes à Agadir, et les premières camionnettes arrivent avec les productions de la semaine. Vous notez à la main le poids de chaque adhérent dans un cahier. Plus tard, vous reportez ces chiffres dans un tableau Excel. Le vendredi, vous calculez les paiements un par un, et le samedi vous prenez du temps pour appeler chaque membre pour lui annoncer son montant.

Si une livraison a été mal notée, si un adhérent conteste un chiffre, ou si vous êtes absent un jour, tout s'arrête ou se complique.

Ce scénario est celui de dizaines de coopératives agricoles au Maroc — des coopératives arganières du Souss, aux coopératives laitières de la région de Fès, en passant par les coopératives d'agrumes du Gharb. Le papier a fonctionné pendant longtemps. Mais il a ses limites.

## Les vrais coûts du papier

On pense rarement au coût du papier en termes monétaires, mais il est réel :

- **Temps de saisie** : 3 à 5 heures par semaine pour une coopérative de 40 adhérents, rien que pour noter et reporter les données
- **Erreurs de calcul** : une erreur dans un paiement crée de la méfiance qui peut durer des mois
- **Pertes d'information** : un cahier abîmé, une page déchirée, et l'historique d'un adhérent disparaît
- **Absence de suivi** : impossible de savoir rapidement qui a livré quoi, sur quelle période, et quel est le cumul annuel par adhérent

## Ce que permet un outil numérique simple

Nous ne parlons pas d'un système complexe. Une application web simple, accessible sur téléphone ou tablette, peut transformer le quotidien d'une coopérative sans formation lourde.

**Enregistrement des livraisons** : le responsable saisit le nom de l'adhérent, le poids ou la quantité, et la date. En trente secondes.

**Calcul automatique des paiements** : en fin de semaine ou de mois, le système calcule le montant dû à chaque adhérent selon le barème défini. Pas d'erreur, pas de recalcul.

**Fiche adhérent** : chaque membre peut voir son historique de livraisons et de paiements — sur son téléphone ou imprimé sur une seule page.

**Rapports pour les organismes** : l'ONCA, la CNCA, ou vos partenaires bancaires demandent parfois des états de situation. Un rapport peut être généré en un clic.

## La question du changement

Le vrai frein n'est pas technique. C'est humain. Beaucoup de présidents de coopératives ont peur que les membres ne comprennent pas, ou que la transition soit trop complexe.

En pratique, les outils les plus efficaces sont ceux qui ressemblent à ce que les gens font déjà — mais en mieux. La saisie dans une application sur téléphone n'est pas plus difficile que noter sur un cahier. Et si quelque chose ne va pas, un appel suffit pour corriger.

## Par où commencer

Commencez par cartographier vos données actuelles : combien d'adhérents, quels types de livraisons, quel rythme de paiement. Ensuite, identifiez les trois ou quatre tâches qui vous coûtent le plus de temps chaque semaine. Un outil numérique bien conçu doit d'abord résoudre ces tâches-là, et seulement celles-là.

---

Tadnun travaille avec des coopératives agricoles à travers le Maroc pour concevoir des outils de gestion adaptés à leur réalité — sans jargon technique, sans sur-complexité. Si vous souhaitez en discuter, [contactez-nous](/contact).
`,
  },

  {
    slug: 'agricultural-cooperative-management-digital-en',
    locale: 'en',
    title: 'Agricultural cooperative management: from paper to digital',
    description: 'Members, deliveries, payments tracked in notebooks. There is a better way. Here is how Moroccan agricultural cooperatives are making the shift to digital tools.',
    sector: 'agriculture',
    status: 'published',
    published_at: new Date('2025-11-20').toISOString(),
    content: `## A cooperative president's morning

It's 7am in Agadir. The first trucks are pulling in with the week's harvest. You write each member's delivery weight by hand in a notebook. Later you copy the figures into a spreadsheet. On Friday you calculate payments one by one. Saturday you call each member to give them their amount.

If a delivery was recorded wrong, if a member disputes a figure, or if you are away for a day, everything stalls or unravels.

This is the daily reality of dozens of agricultural cooperatives across Morocco — from argan cooperatives in the Souss, to dairy cooperatives near Fès, to citrus cooperatives in the Gharb. Paper has worked for a long time. But it has its limits.

## The real cost of paper

It is easy to overlook the cost of paper-based systems, but it is real:

- **Data entry time**: 3–5 hours per week for a 40-member cooperative, just for recording and transferring data
- **Calculation errors**: one payment mistake creates distrust that can linger for months
- **Information loss**: a damaged notebook or a torn page and a member's full history is gone
- **No visibility**: impossible to quickly answer — who delivered what, over which period, and what is each member's annual total?

## What a simple digital tool enables

This is not about complex systems. A simple web app, accessible on a phone or tablet, can transform cooperative management without heavy training.

**Logging deliveries**: the manager enters the member's name, weight or quantity, and date. Thirty seconds.

**Automatic payment calculation**: at week or month end, the system calculates what each member is owed based on your defined rate. No errors, no recalculation.

**Member ledger**: each member can see their delivery and payment history — on their phone or printed on one page.

**Reports for institutions**: ONCA, CNCA, or banking partners sometimes request status reports. One click generates them.

## The real obstacle is not technical

The main barrier is not technological. It is human. Many cooperative presidents worry that members will not understand, or that the transition will be too disruptive.

In practice, the most effective tools are those that look like what people already do — but better. Entering data in a phone app is no harder than writing in a notebook. And if something goes wrong, a phone call is enough to fix it.

## Where to start

Begin by mapping your current data: how many members, what types of deliveries, what payment rhythm. Then identify the three or four tasks that cost you the most time each week. A well-designed digital tool should solve those tasks first, and only those.

---

Tadnun works with agricultural cooperatives across Morocco to design management tools suited to their actual reality — no technical jargon, no over-engineering. If you'd like to talk it through, [get in touch](/contact).
`,
  },

  {
    slug: 'gestion-cooperative-agricole-papier-digital-ar',
    locale: 'ar',
    title: 'تسيير التعاونية الفلاحية: من الورق للديجيتال',
    description: 'المنخرطين، التسليمات، المدفوعات في دفاتر. كاين طريقة أحسن. شوف كيفاش التعاونيات الفلاحية المغربية كتبدل للرقمي.',
    sector: 'agriculture',
    status: 'published',
    published_at: new Date('2025-11-20').toISOString(),
    content: `## صباح رئيس التعاونية

الساعة 7 دالصباح فأكادير. الكاميونيتات الأولى كتوصل بإنتاج الأسبوع. كتكتب بيدك وزن كل منخرط في دفتر. من بعد كتنقل الأرقام لـ Excel. نهار الجمعة كتحسب المدفوعات واحد واحد. السبت كتتصل بكل عضو باش تخبره بالمبلغ ديالو.

إلا كانت تسليمة مكتوبة غلط، أو منخرط نازع رقم، أو كنتي غايب يوم، كل شي كيتوقف أو كيتعقد.

هاد الواقع هو ديال عشرات التعاونيات الفلاحية فالمغرب — من تعاونيات الأركان فالسوس، لتعاونيات الحليب قرب فاس، لتعاونيات الحوامض فالغرب. الورق خدم مدة. ولكن عنده حدوده.

## التكلفة الحقيقية للورق

بزاف دالناس ما يفكروش في تكلفة الورق، ولكنها حقيقية:

- **وقت الإدخال**: 3 لـ 5 ساعات فالأسبوع لتعاونية ب 40 منخرط، فقط لتسجيل ونقل البيانات
- **أخطاء الحساب**: خطأ واحد في دفع كيخلق شك يدوم شهور
- **ضياع المعلومات**: دفتر متلف أو صفحة ممزقة والتاريخ ديال المنخرط كيضيع
- **غياب الرؤية**: مستحيل تجاوب بسرعة — منو سلم شنو، فأي مدة، وشحال هو المجموع السنوي لكل منخرط؟

## واش يمكن يدير أداة رقمية بسيطة

ما كنتكلموش على أنظمة معقدة. تطبيق ويب بسيط، ولوج به من الهاتف أو التابلت، يقدر يبدل تسيير التعاونية بدون تكوين ثقيل.

**تسجيل التسليمات**: المسؤول يدخل اسم المنخرط، الوزن أو الكمية، والتاريخ. ثلاثين ثانية.

**حساب المدفوعات أوتوماتيكي**: فنهاية الأسبوع أو الشهر، النظام يحسب المبلغ المستحق لكل منخرط حسب السعر المحدد. بلا أخطاء.

**ملف المنخرط**: كل عضو يقدر يشوف تاريخ التسليمات والمدفوعات ديالو — من الهاتف أو مطبوع في صفحة وحدة.

**تقارير للمؤسسات**: ONCA أو البنوك الشريكة أحياناً كيطلبو بيانات. تقرير كيتولد بكليك وحد.

## العائق الحقيقي مو تقني

العائق الكبير ماشي تقنوجي. هو بشري. بزاف من رؤساء التعاونيات خايفين بلي الأعضاء ما يفهموش، أو بلي التحول يكون صعب.

فالعملية، الأدوات الأكثر فاعلية هي اللي تشبه ما كيخدمو الناس بالفعل — ولكن أحسن. إدخال بيانات في تطبيق ما هو أصعب من الكتابة في دفتر. وإلا كان فيها شي خطأ، اتصال واحد يكفي لتصحيحه.

## من أين تبدأ؟

ابدأ بجرد بياناتك الحالية: شحال من منخرط، أنواع التسليمات، إيقاع الدفع. ثم حدد تلاتة أو أربعة مهام كتاخد عندك أكثر وقت كل أسبوع. أداة رقمية مصممة مزيان خاصها تحل هاد المهام أولاً، وهما فقط.

---

Tadnun كيخدم مع تعاونيات فلاحية في جميع أنحاء المغرب لتصميم أدوات تسيير ملائمة لواقعهم — بلا مصطلحات تقنية، بلا تعقيد زائد. إلا بغيتي تتكلمو معنا، [تواصل معنا](/contact).
`,
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // ARTICLE 4 — RAPPELS WHATSAPP CABINET MÉDICAL
  // ═══════════════════════════════════════════════════════════════════════════

  {
    slug: 'rappels-whatsapp-cabinet-medical',
    locale: 'fr',
    title: 'Rappels automatiques WhatsApp pour cabinets médicaux',
    description: 'Un patient absent, c\'est 15 à 30 minutes de revenue perdu. Les rappels WhatsApp automatiques réduisent les no-shows de façon simple et efficace.',
    sector: 'healthcare',
    status: 'published',
    published_at: new Date('2025-11-25').toISOString(),
    content: `## Le problème des rendez-vous non honorés

Un dentiste à Casablanca pratique en moyenne 8 rendez-vous par jour. Si deux patients ne se présentent pas sans prévenir, c'est 25% de sa journée perdu — sans possibilité de remplir ces créneaux au dernier moment.

Sur une semaine, c'est 10 rendez-vous manqués. Sur un mois, 40. Si chaque consultation vaut 300 MAD en moyenne, c'est 12 000 MAD de chiffre d'affaires qui disparaît — non pas parce que les patients ne veulent pas venir, mais souvent parce qu'ils ont simplement oublié.

Ce n'est pas un problème de mauvaise foi. C'est un problème d'oubli. Et l'oubli se résout facilement.

## Pourquoi WhatsApp est plus efficace que les SMS ou les appels

La plupart des Marocains vérifient WhatsApp plusieurs fois par heure. Les messages y sont lus, répondus, et remarqués d'une façon que les SMS ou les appels téléphoniques n'atteignent pas toujours.

Un message WhatsApp envoyé la veille du rendez-vous, et un deuxième le matin même : c'est suffisant pour réduire les no-shows de 30 à 50% selon les retours de cabinets qui ont adopté ce système.

Le contenu du message n'a pas besoin d'être sophistiqué. Quelque chose comme : *"Bonjour M. Benchekroun, rappel de votre rendez-vous avec Dr. Amrani demain à 10h00. Répondez OUI pour confirmer ou appelez le [numéro] pour reprogrammer."*

## Comment fonctionne l'automatisation

L'idée n'est pas de taper ces messages à la main. C'est justement l'inverse.

Le système fonctionne ainsi :
1. Vous (ou votre secrétaire) créez le rendez-vous dans votre agenda — logiciel ou simple tableau
2. Le système lit automatiquement les rendez-vous du lendemain et du surlendemain
3. Il envoie les messages WhatsApp aux patients concernés selon le modèle défini
4. Les confirmations sont notées dans l'agenda

Pour les cabinets utilisant un logiciel de gestion de rendez-vous, l'intégration est directe. Pour ceux qui travaillent encore sur Excel ou Google Sheets, une synchronisation est possible.

## Ce qu'il faut savoir sur WhatsApp Business

Pour envoyer des messages automatisés à grande échelle, vous avez besoin de l'API WhatsApp Business — différente de l'application classique. Elle nécessite un numéro dédié (souvent une SIM séparée ou un numéro virtuel) et passe par un prestataire approuvé par Meta.

Le coût des messages varie, mais pour les volumes d'un cabinet standard (10 à 30 messages par jour), il reste très raisonnable — souvent moins de 200 MAD par mois tout compris.

## Au-delà des rappels

Une fois le système en place, il devient facile d'ajouter d'autres automatisations : confirmation de prise de rendez-vous par message, message de suivi 48h après une procédure, rappel pour les rendez-vous annuels de contrôle. Chaque message est une opportunité de maintenir le lien avec vos patients sans effort manuel.

## À Rabat, Casablanca ou Fès

Quelle que soit votre ville, le principe est le même. La mise en place prend quelques jours et ne nécessite pas de changer votre façon de travailler — juste d'y ajouter une couche d'automatisation discrète et efficace.

---

Tadnun aide les cabinets médicaux, dentaires et paramédicaux à mettre en place des rappels automatiques WhatsApp et des outils de gestion de rendez-vous adaptés. [Discutons de votre cabinet](/contact).
`,
  },

  {
    slug: 'whatsapp-reminders-medical-clinic-en',
    locale: 'en',
    title: 'WhatsApp automatic reminders for medical clinics',
    description: 'One no-show is 15 to 30 minutes of lost revenue. Automated WhatsApp reminders reduce missed appointments simply and effectively.',
    sector: 'healthcare',
    status: 'published',
    published_at: new Date('2025-11-25').toISOString(),
    content: `## The no-show problem

A dentist in Casablanca sees an average of 8 patients a day. If two patients do not show up without notice, that's 25% of the day lost — with no chance of filling those slots at the last minute.

Over a week, that's 10 missed appointments. Over a month, 40. If each consultation averages 300 MAD, that's 12,000 MAD in revenue gone — not because patients don't want to come, but often because they simply forgot.

This is not a problem of bad intentions. It is a problem of forgetting. And forgetting is easy to solve.

## Why WhatsApp outperforms SMS or phone calls

Most Moroccans check WhatsApp several times an hour. Messages there are read, answered, and noticed in a way that SMS or phone calls do not always achieve.

A WhatsApp message sent the evening before the appointment, and a second one the morning of: that is enough to reduce no-shows by 30–50% based on feedback from clinics that have adopted this approach.

The message content does not need to be sophisticated. Something like: *"Hello Mr. Benchekroun, reminder of your appointment with Dr. Amrani tomorrow at 10:00am. Reply YES to confirm or call [number] to reschedule."*

## How the automation works

The idea is not to type these messages by hand. It is precisely the opposite.

The system works like this:
1. You (or your receptionist) create the appointment in your calendar — software or a simple spreadsheet
2. The system automatically reads tomorrow's and the day after's appointments
3. It sends WhatsApp messages to the relevant patients based on your defined template
4. Confirmations are noted in the calendar

For clinics using appointment management software, the integration is direct. For those still working in Excel or Google Sheets, synchronisation is possible.

## What to know about WhatsApp Business

To send automated messages at scale, you need the WhatsApp Business API — different from the standard app. It requires a dedicated number (often a separate SIM or virtual number) and goes through a Meta-approved provider.

Message costs vary, but for a standard clinic's volume (10–30 messages per day), they remain very reasonable — often under 200 MAD per month all in.

## Beyond reminders

Once the system is in place, it becomes easy to add further automations: appointment booking confirmation, a follow-up message 48 hours after a procedure, reminders for annual check-up appointments. Each message is an opportunity to stay connected with patients without manual effort.

## In Rabat, Casablanca or Fès

Whatever your city, the principle is the same. Setup takes a few days and does not require changing how you work — just adding a quiet, effective automation layer on top of it.

---

Tadnun helps medical, dental, and paramedical practices set up WhatsApp automatic reminders and appointment management tools. [Let's talk about your clinic](/contact).
`,
  },

  {
    slug: 'rappels-whatsapp-cabinet-medical-ar',
    locale: 'ar',
    title: 'تذكيرات واتساب الأوتوماتيكية للعيادات الطبية',
    description: 'مريض غائب معناه 15 لـ 30 دقيقة مدخول ضايع. تذكيرات واتساب الأوتوماتيكية كتنقص من الغيابات بطريقة بسيطة وفعالة.',
    sector: 'healthcare',
    status: 'published',
    published_at: new Date('2025-11-25').toISOString(),
    content: `## مشكلة الغيابات بلا إخبار

طبيب أسنان فالدارالبيضاء كيشوف في المتوسط 8 مرضى فاليوم. إلا جوج ما جاوش بلا ما يخبروه، هذا 25% من يومه ضايع — بلا فرصة لملء هاد الأوقات فاللحظة الأخيرة.

فأسبوع، هذا 10 مواعيد فايتة. فشهر، 40. إلا كل كشف متوسطه 300 درهم، هذا 12,000 درهم من المدخول راح — ماشي لأن المرضى ما يبغوش يجيو، ولكن غالباً لأنهم نساو.

هذا مو مشكل نية سيئة. هذا مشكل نسيان. والنسيان سهل يتحل.

## علاش واتساب أفضل من SMS أو المكالمات

الأغلبية دالمغاربة كيشوفو واتساب عدة مرات فالساعة. الرسائل فيه كتتقرأ وتتجاوب وتلفت الانتباه بطريقة مختلفة على SMS أو المكالمات.

رسالة واتساب كتوصل قبل الموعد بيوم، وثانية فالصباح ديال نفس اليوم: هذا يكفي لتنقيص الغيابات من 30 لـ 50% حسب العيادات اللي جربات هاد النظام.

محتوى الرسالة ما خاصوش يكون معقد. حاجة بحال: *"مرحباً السيد بنشقرون، تذكير بموعدكم مع الدكتور العمراني غداً في الساعة 10 صباحاً. جاوبو بنعم للتأكيد أو اتصلو بـ [رقم] لتغيير الموعد."*

## كيفاش يخدم الأوتوماتيك

الفكرة ماشي تكتب هاد الرسائل بيدك. على العكس.

النظام يخدم هكذا:
1. نت (أو السكريتيرة ديالك) كتخلقو الموعد في أجنداتكم — برنامج أو جدول بسيط
2. النظام كيقرأ أوتوماتيكياً مواعيد الغد وبعد الغد
3. كيرسل رسائل واتساب للمرضى المعنيين حسب النموذج المحدد
4. التأكيدات كتتسجل في الأجندة

للعيادات اللي كتستخدم برنامج تسيير مواعيد، الربط مباشر. لاللي باقيين يخدمو مع Excel أو Google Sheets، المزامنة ممكنة.

## شنو تعرف على WhatsApp Business

باش ترسل رسائل أوتوماتيكية على نطاق واسع، خاصك API ديال WhatsApp Business — مختلف على التطبيق العادي. يحتاج رقم مخصص (SIM منفصلة أو رقم افتراضي) ويمر على مزود معتمد من Meta.

تكلفة الرسائل كتتفاوت، ولكن لحجم عيادة عادية (10 لـ 30 رسالة فاليوم)، تبقى معقولة جداً — غالباً أقل من 200 درهم فالشهر كل شي داخل.

## أكثر من مجرد تذكيرات

ملي يكون النظام في مكانه، سهل تزيد أوتوماتيكيات أخرى: تأكيد الحجز برسالة، رسالة متابعة 48 ساعة بعد إجراء، تذكيرات للمواعيد السنوية. كل رسالة هي فرصة للبقاء قريب من المرضى بلا جهد يدوي.

## فالرباط، الدارالبيضاء أو فاس

مهما كانت المدينة ديالك، المبدأ واحد. الإعداد كياخد أياماً معدودة وما يحتاجش تغيير طريقة عملك — فقط إضافة طبقة أوتوماتيكية هادية وفعالة فوقيها.

---

Tadnun كيساعد العيادات الطبية، طب الأسنان، والخدمات شبه الطبية على تنصيب تذكيرات واتساب الأوتوماتيكية وأدوات تسيير المواعيد. [حدثونا على العيادة ديالك](/contact).
`,
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // ARTICLE 5 — VISITE VIRTUELLE IMMOBILIER MRE
  // ═══════════════════════════════════════════════════════════════════════════

  {
    slug: 'visite-virtuelle-immobilier-mre',
    locale: 'fr',
    title: 'Visite virtuelle immobilier : vendre aux MRE à distance',
    description: 'Des centaines de milliers de Marocains résidant à l\'étranger veulent investir au Maroc. La visite virtuelle est la clé pour conclure ces ventes à distance.',
    sector: 'realestate',
    status: 'published',
    published_at: new Date('2025-12-01').toISOString(),
    content: `## Un marché qui achète sans voir

Chaque année, des dizaines de milliers de Marocains résidant à l'étranger (MRE) investissent dans l'immobilier au Maroc. Que ce soit pour un appartement à Casablanca, une villa à Tanger, ou un bien locatif à Agadir, ces acheteurs ont un point commun : ils n'ont souvent pas la possibilité de visiter en personne avant de prendre leur décision.

Pour un agent immobilier ou un promoteur, ignorer ce segment est une erreur. Pour les atteindre efficacement, il faut leur donner la capacité de visiter à distance — et cela passe par la visite virtuelle.

## Ce qu'est une visite virtuelle (et ce qu'elle n'est pas)

Une visite virtuelle n'est pas une simple galerie de photos. C'est une expérience interactive en 360° qui permet à l'acheteur de naviguer dans le bien depuis son écran — voir chaque pièce, les dimensions, l'orientation, les finitions.

Concrètement : vous fournissez un lien. L'acheteur à Paris, Lyon ou Bruxelles ouvre ce lien depuis son téléphone ou son ordinateur, et se balade dans l'appartement comme s'il y était.

Les outils pour créer ces visites existent à différents niveaux de prix : des solutions professionnelles avec caméra 360° (Matterport, Ricoh Theta), jusqu'à des solutions plus accessibles avec un bon smartphone et des applications dédiées.

## Ce que gagne l'agent immobilier

**Moins de visites inutiles** : les prospects qui ont fait une visite virtuelle arrivent en visite physique beaucoup plus qualifiés. Ils savent déjà ce qu'ils veulent confirmer en vrai.

**Des clients distants convertis** : un MRE en France ne peut pas facilement prendre un avion pour voir dix appartements. Mais il peut en visiter dix virtuellement en une soirée, et identifier celui qu'il veut.

**Un support de vente permanent** : contrairement à une visite physique, la visite virtuelle est disponible 24h/24. Un prospect à Montréal peut la consulter à 2h du matin, heure locale.

## Comment intégrer les visites virtuelles dans votre activité

L'outil seul ne suffit pas. Il faut l'intégrer dans votre processus commercial :

1. **Faites la visite virtuelle tôt** : dès qu'un bien est disponible, créez la visite. Ne la réservez pas aux biens "premium" — chaque bien mérite sa présentation.
2. **Partagez-la dans votre communication** : WhatsApp, votre site web, vos annonces Avito ou Mubawab. Le lien doit être facile à trouver.
3. **Suivez avec un appel vidéo** : après la visite virtuelle, proposez un appel WhatsApp ou Zoom pour répondre aux questions. C'est à ce moment que la vente se joue souvent.
4. **Facilitez la signature à distance** : pour un MRE, la signature d'un compromis peut se faire par procuration. Accompagnez le client dans cette démarche administrative — c'est souvent ce qui bloque.

## Les villes les plus recherchées par les MRE

Casablanca, Tanger, et Marrakech concentrent l'essentiel des achats immobiliers des MRE. Mais Agadir, Rabat et Fès gagnent du terrain. Si vous opérez dans ces villes, le marché MRE est devant vous.

---

Tadnun accompagne les agences immobilières dans la création de leur présence numérique : sites web, intégration de visites virtuelles, formulaires de contact multilingues. [Parlons de votre agence](/contact).
`,
  },

  {
    slug: 'virtual-tour-real-estate-mre-en',
    locale: 'en',
    title: 'Virtual property tours: selling to the Moroccan diaspora remotely',
    description: 'Hundreds of thousands of Moroccans living abroad want to invest in Morocco. Virtual tours are the key to closing those sales at a distance.',
    sector: 'realestate',
    status: 'published',
    published_at: new Date('2025-12-01').toISOString(),
    content: `## A market that buys without seeing

Every year, tens of thousands of Moroccans living abroad (MRE) invest in Moroccan real estate. Whether it's an apartment in Casablanca, a villa in Tanger, or a rental property in Agadir, these buyers share one trait: they often cannot visit in person before making their decision.

For a real estate agent or developer, ignoring this segment is a missed opportunity. To reach them effectively, you need to give them the ability to visit remotely — and that means virtual tours.

## What a virtual tour is (and is not)

A virtual tour is not a photo gallery. It is an interactive 360° experience that lets buyers navigate the property from their screen — seeing every room, the dimensions, the orientation, the finishes.

In practice: you share a link. The buyer in Paris, London, or Brussels opens it on their phone or computer and walks through the apartment as if they were there.

Tools to create these tours exist at different price points: professional solutions with a 360° camera (Matterport, Ricoh Theta), down to more accessible options using a good smartphone and dedicated apps.

## What the real estate agent gains

**Fewer wasted in-person visits**: prospects who have completed a virtual tour arrive at physical visits far more qualified. They already know what they want to verify in person.

**Converted remote buyers**: an MRE in France cannot easily fly over to see ten apartments. But they can visit ten virtually in an evening and identify the one they want.

**A 24/7 sales asset**: unlike a physical visit, the virtual tour is available around the clock. A prospect in Montreal can browse at 2am local time.

## How to integrate virtual tours into your business

The tool alone is not enough. It needs to be embedded in your sales process:

1. **Create the tour early**: as soon as a property is available, build the tour. Do not reserve it for "premium" listings — every property deserves its presentation.
2. **Share it in your communications**: WhatsApp, your website, your Avito or Mubawab listings. The link should be easy to find.
3. **Follow up with a video call**: after the virtual tour, offer a WhatsApp or Zoom call to answer questions. This is often where the sale is made or lost.
4. **Make remote signing easy**: for an MRE, signing a purchase agreement can be done by proxy. Guide the client through this administrative step — it is often what holds things up.

## The cities most sought by MRE buyers

Casablanca, Tanger, and Marrakech attract the bulk of MRE real estate purchases. But Agadir, Rabat, and Fès are gaining ground. If you operate in any of these cities, the MRE market is right in front of you.

---

Tadnun helps real estate agencies build their digital presence: websites, virtual tour integration, multilingual contact forms. [Let's talk about your agency](/contact).
`,
  },

  {
    slug: 'visite-virtuelle-immobilier-mre-ar',
    locale: 'ar',
    title: 'الجولة الافتراضية للعقار: بيع للمغاربة المقيمين بالخارج من بعيد',
    description: 'مئات الآلاف من المغاربة المقيمين بالخارج بغاو يستثمرو فالمغرب. الجولة الافتراضية هي المفتاح لإتمام هاد البيوعات من بعيد.',
    sector: 'realestate',
    status: 'published',
    published_at: new Date('2025-12-01').toISOString(),
    content: `## سوق كيشري بلا ما يشوف

كل عام، عشرات الآلاف من المغاربة المقيمين بالخارج (MRE) كيستثمرو في العقار المغربي. سواء شقة فالدارالبيضاء، فيلا فطنجة، أو عقار للكراء فأكادير، هؤلاء المشترين عندهم نقطة مشتركة: غالباً ما يقدروش يزورو فشخص قبل القرار.

لوكيل عقاري أو مطور، تجاهل هاد السوق هو خسارة حقيقية. باش توصل إليهم فعلياً، خاصك تعطيهم القدرة على الزيارة من بعيد — وهذا معناه الجولات الافتراضية.

## شنو هي الجولة الافتراضية (وشنو ماهيش)

الجولة الافتراضية ماشي ألبوم صور. هي تجربة تفاعلية 360° كتخلي المشتري يتجول في العقار من شاشته — يشوف كل غرفة، الأبعاد، التوجه، التشطيبات.

عملياً: كتشارك رابط. المشتري فباريس، لندن، أو بروكسل يفتحه من الهاتف أو الحاسوب، ويتمشى في الشقة كأنه فيها.

كاينين أدوات لخلق هاد الجولات بأسعار مختلفة: حلول احترافية بكاميرا 360° (Matterport، Ricoh Theta)، لحلول أسهل وصولاً بسمارتفون مزيان وتطبيقات مخصصة.

## شنو يكسب وكيل العقار

**زيارات ميدانية أقل ضياعاً**: المشترين اللي عملو جولة افتراضية كيوصلو للزيارة الحقيقية أكثر تأهيلاً. عارفين بالفعل شنو يبغو يتأكدو منه.

**مشترين من بعيد تحولو**: MRE فرنسا ما يقدرش يطير بسهولة يشوف عشر شقق. ولكن يقدر يزور عشرة افتراضياً في ليلة وحدة ويختار اللي يبغاه.

**أصل مبيعات دائم**: على خلاف الزيارة الحقيقية، الجولة الافتراضية متاحة 24/24. مشتري محتمل فمونتريال يقدر يتفرج عليها الساعة 2 فالصباح بالتوقيت المحلي.

## كيفاش تدمج الجولات الافتراضية في نشاطك

الأداة وحدها ما تكفيش. خاصها تتدمج في عملية البيع ديالك:

1. **دير الجولة بكري**: ملي يكون العقار متاح، ولج الجولة. ما تحفظهاش للعقارات "بريميوم" — كل عقار يستحق عرضه.
2. **شاركها في تواصلك**: واتساب، موقعك، إعلانات Avito أو Mubawab. الرابط خاصه يكون سهل اللقاء.
3. **تابع بمكالمة فيديو**: بعد الجولة الافتراضية، اقترح مكالمة واتساب أو Zoom للإجابة على الأسئلة. هنا غالباً كتتقرر البيعة.
4. **سهل التوقيع من بعيد**: لـ MRE، توقيع عقد بيع يمكن يكون بتوكيل. ارشد الزبون في هاد الخطوة الإدارية — هي غالباً اللي كتوقف الأمور.

## المدن الأكثر طلباً من طرف MRE

الدارالبيضاء، طنجة، ومراكش كتجمع معظم مشتريات MRE العقارية. ولكن أكادير، الرباط، وفاس كيكسبو أرضية. إلا كتخدم في أي من هاد المدن، سوق MRE في وجهك.

---

Tadnun كيساعد الوكالات العقارية على بناء حضورها الرقمي: مواقع ويب، دمج الجولات الافتراضية، نماذج تواصل بعدة لغات. [حدثونا على الوكالة ديالك](/contact).
`,
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // ARTICLE 6 — INSCRIPTION EN LIGNE ÉCOLE PRIVÉE
  // ═══════════════════════════════════════════════════════════════════════════

  {
    slug: 'inscription-en-ligne-ecole-privee',
    locale: 'fr',
    title: 'Inscription en ligne école privée : fini les files d\'attente',
    description: 'Dossiers papier, files au secrétariat, appels pour confirmer les places. Il existe une façon plus simple de gérer les inscriptions scolaires.',
    sector: 'education',
    status: 'published',
    published_at: new Date('2025-12-05').toISOString(),
    content: `## La rentrée vue de la direction

Chaque année en juillet et août, le secrétariat d'une école privée à Casablanca, Rabat, ou Fès se transforme en salle des urgences. Les parents font la queue avec leurs dossiers papier. Les secrétaires saisissent les informations manuellement. Le directeur passe ses journées à répondre aux appels — "est-ce que la place de mon enfant est confirmée ?"

C'est épuisant pour l'équipe. C'est frustrant pour les parents. Et surtout, c'est inutilement complexe pour quelque chose qui peut être géré autrement.

L'inscription en ligne n'est pas réservée aux grandes institutions. C'est un outil accessible à toute école privée, quelle que soit sa taille.

## Ce que gagne l'école

**Moins de travail manuel** : les données des familles sont saisies une fois, par les parents eux-mêmes, dans un formulaire structuré. Pas de ressaisie, pas d'erreurs de transcription.

**Un suivi en temps réel** : le directeur ou le secrétariat voit à tout moment combien de dossiers sont complets, combien sont en attente, combien de places restent pour chaque niveau.

**Des documents centralisés** : photos d'identité, bulletins scolaires, certificat de vaccination — tout est uploadé en ligne et classé automatiquement par élève.

**Moins d'appels entrants** : quand les parents reçoivent un email de confirmation automatique avec le statut de leur dossier, ils n'ont pas besoin d'appeler pour vérifier.

## Ce que gagnent les parents

La famille d'un élève de CE2 à Marrakech ne devrait pas prendre une demi-journée de congé pour déposer un dossier. Avec un formulaire en ligne, elle complète le dossier depuis son téléphone un soir après le dîner, envoie les documents scannés, et reçoit un accusé de réception immédiat.

Si quelque chose manque, le système le signale automatiquement. Si la place est confirmée, un email ou un message WhatsApp l'annonce sans délai.

## Comment fonctionne un système d'inscription en ligne

Le processus est simple :

1. **Un formulaire structuré** avec les informations requises (identité de l'élève, informations des parents, niveau souhaité, documents à fournir)
2. **Upload des documents** directement dans le formulaire
3. **Paiement des frais d'inscription** en ligne, optionnel mais pratique
4. **Tableau de bord administratif** pour l'école : suivi des dossiers, validation, liste d'attente
5. **Notifications automatiques** aux familles à chaque étape

La complexité technique reste faible. Ce type de système peut être mis en place en quelques semaines et ne nécessite aucun logiciel lourd.

## La question de la liste d'attente

Un bon système d'inscription en ligne doit aussi gérer les refus avec dignité. Quand une classe est pleine, les parents s'inscrivent automatiquement sur liste d'attente et sont notifiés si une place se libère. C'est bien plus respectueux que de laisser quelqu'un revenir plusieurs fois pour s'entendre dire "pas encore".

## Quelle échelle ?

Ce type d'outil est pertinent pour une école de 100 élèves comme pour une institution de 800. La différence est simplement dans les fonctionnalités activées. Pour une petite école, un formulaire Google Forms couplé à un tableau de suivi peut déjà représenter un grand progrès. Pour une école plus grande, une plateforme dédiée apporte plus de rigueur et de professionnalisme.

---

Tadnun aide les écoles privées marocaines à moderniser leur gestion administrative : inscription en ligne, gestion des paiements, communication avec les familles. [Discutons de votre établissement](/contact).
`,
  },

  {
    slug: 'online-enrollment-private-school-en',
    locale: 'en',
    title: 'Online enrollment for private schools: no more waiting lines',
    description: 'Paper dossiers, queues at the secretariat, calls to confirm spots. There is a simpler way to manage school enrollment.',
    sector: 'education',
    status: 'published',
    published_at: new Date('2025-12-05').toISOString(),
    content: `## Back-to-school season from the director's view

Every July and August, the secretariat of a private school in Casablanca, Rabat, or Fès turns into a triage room. Parents queue with paper dossiers. Staff manually enter information. The director spends the day answering calls — "is my child's place confirmed?"

It is exhausting for the team. It is frustrating for parents. And above all, it is unnecessarily complex for something that can be managed differently.

Online enrollment is not reserved for large institutions. It is an accessible tool for any private school, regardless of size.

## What the school gains

**Less manual work**: family data is entered once, by the parents themselves, through a structured form. No re-entry, no transcription errors.

**Real-time visibility**: the director or secretariat can see at any moment how many dossiers are complete, how many are pending, how many spots remain for each year level.

**Centralised documents**: identity photos, school reports, vaccination certificates — everything is uploaded online and automatically filed by student.

**Fewer inbound calls**: when parents receive an automatic confirmation email with their dossier status, they do not need to call to check.

## What parents gain

A family in Marrakech should not need to take half a day off work to drop off a paper dossier. With an online form, they complete the enrollment from their phone one evening after dinner, upload scanned documents, and receive an immediate acknowledgement.

If something is missing, the system flags it automatically. If the spot is confirmed, an email or WhatsApp message announces it without delay.

## How an online enrollment system works

The process is straightforward:

1. **A structured form** with required information (student identity, parent details, desired year level, documents needed)
2. **Document upload** directly within the form
3. **Online payment of registration fees** — optional but convenient
4. **Admin dashboard** for the school: dossier tracking, validation, waiting list management
5. **Automatic notifications** to families at each stage

The technical complexity remains low. This type of system can be set up in a few weeks and requires no heavy software.

## Handling waiting lists with care

A good online enrollment system must also handle rejections gracefully. When a class is full, parents are automatically placed on a waiting list and notified when a spot opens. This is far more respectful than asking someone to come back multiple times only to be told "not yet."

## What scale does this suit?

This type of tool works equally well for a 100-student school and an 800-student institution. The difference is simply in which features are activated. For a small school, a Google Forms enrollment form paired with a tracking spreadsheet can already represent a significant step forward. For a larger school, a dedicated platform brings more rigour and professionalism.

---

Tadnun helps Moroccan private schools modernise their administrative operations: online enrollment, payment management, family communication. [Let's talk about your school](/contact).
`,
  },

  {
    slug: 'inscription-en-ligne-ecole-privee-ar',
    locale: 'ar',
    title: 'التسجيل أونلاين للمدارس الخاصة: خلصنا من طوابير الانتظار',
    description: 'ملفات ورقية، طوابير أمام الأمانة، اتصالات لتأكيد الأماكن. كاين طريقة أبسط لتسيير تسجيلات المدرسة.',
    sector: 'education',
    status: 'published',
    published_at: new Date('2025-12-05').toISOString(),
    content: `## الدخول المدرسي من منظور الإدارة

كل عام فيوليوز وغشت، الأمانة ديال مدرسة خاصة فالدارالبيضاء، الرباط، أو فاس كتتحول لغرفة طوارئ. الآباء كيصفو بملفاتهم الورقية. المستخدمون كيدخلو المعلومات يدوياً. المدير كيقضي يومه يرد على الاتصالات — "واش مكانة ولدي مؤكدة؟"

هذا متعب للفريق. مزعج للآباء. وقبل كل شي، معقد بلا سبب لشي يمكن تسييره بطريقة أخرى.

التسجيل أونلاين ماشي محصور في المؤسسات الكبيرة. هو أداة في متناول أي مدرسة خاصة، مهما كان حجمها.

## شنو تكسب المدرسة

**عمل يدوي أقل**: بيانات العائلة كتتدخل مرة وحدة، من طرف الآباء أنفسهم، في استمارة منظمة. بلا إعادة إدخال، بلا أخطاء.

**رؤية في الوقت الحقيقي**: المدير أو الأمانة يشوفو في أي لحظة شحال من ملف كامل، كم منها في الانتظار، وكم مكان باقي لكل مستوى.

**وثائق مركزية**: صور الهوية، بطاقات التنقيط، شهادة التلقيح — كل شي يتحمل أونلاين ويتصنف أوتوماتيكياً حسب كل تلميذ.

**اتصالات واردة أقل**: ملي كيتلقاو الآباء إيميل تأكيد أوتوماتيكي مع حالة الملف ديالهم، ما يحتاجوش يتصلو للتأكد.

## شنو يكسب الآباء

عائلة فمراكش ما خاصهاش تاخد نصف يوم عطلة باش تودي ملفاً ورقياً. مع استمارة أونلاين، كيكملو التسجيل من الهاتف في ليلة بعد العشاء، يحملو الوثائق الممسوحة، ويتلقاو إيصالاً فورياً.

إلا كان فيها ناقص، النظام يشير إليه أوتوماتيكياً. إلا تأكد المكان، إيميل أو رسالة واتساب تعلن بدون تأخير.

## كيفاش يخدم نظام التسجيل أونلاين

العملية بسيطة:

1. **استمارة منظمة** بالمعلومات المطلوبة (هوية التلميذ، بيانات الآباء، المستوى المطلوب، الوثائق اللازمة)
2. **تحميل الوثائق** مباشرة في الاستمارة
3. **دفع رسوم التسجيل** أونلاين — اختياري ولكن مريح
4. **لوحة تحكم إدارية** للمدرسة: تتبع الملفات، التحقق، قائمة الانتظار
5. **إشعارات أوتوماتيكية** للعائلات في كل مرحلة

التعقيد التقني يبقى منخفضاً. هاد النوع من الأنظمة يمكن تنصيبه فأسابيع معدودة ولا يحتاج برامج ثقيلة.

## التسيير اللائق لقوائم الانتظار

نظام تسجيل أونلاين مزيان خاصه يتسير الرفض باحترام. ملي تمتلئ قسم، الآباء أوتوماتيكياً يتوضعو في قائمة الانتظار وكيتلقاو إشعاراً إلا تحرر مكان. هاد الأمر أكثر احتراماً بكتير من إجبار شخص على الرجوع عدة مرات ليسمع "مازال".

## لأي حجم مناسب؟

هاد النوع من الأدوات مناسب لمدرسة 100 تلميذ كما لمؤسسة 800 تلميذ. الفرق هو فقط في المزايا المفعلة. لمدرسة صغيرة، استمارة Google Forms مع جدول تتبع يمكن تكون بالفعل خطوة كبيرة للأمام. لمدرسة أكبر، منصة مخصصة تجيب أكثر من صرامة واحترافية.

---

Tadnun كيساعد المدارس الخاصة المغربية على تحديث تسييرها الإداري: تسجيل أونلاين، تسيير المدفوعات، التواصل مع العائلات. [حدثونا على مؤسستكم](/contact).
`,
  },

];

// ─────────────────────────────────────────────────────────────────────────────
// MAIN
// ─────────────────────────────────────────────────────────────────────────────

async function main() {
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    console.error('Error: SUPABASE_SERVICE_ROLE_KEY is not set.');
    console.error('Run: SUPABASE_SERVICE_ROLE_KEY=your_key node scripts/blog-niche.js');
    process.exit(1);
  }

  console.log(`Inserting ${articles.length} articles into blog_posts...\n`);

  let ok = 0;
  let errors = 0;

  for (const a of articles) {
    const { error } = await supabase
      .from('blog_posts')
      .upsert(a, { onConflict: 'slug' });

    if (error) {
      console.error(`✗ ${a.slug}: ${error.message}`);
      errors++;
    } else {
      console.log(`✓ ${a.slug}`);
      ok++;
    }
  }

  console.log(`\nDone: ${ok} upserted, ${errors} errors.`);
}

main();
