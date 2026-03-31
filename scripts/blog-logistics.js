/**
 * Inserts trilingual blog article about logistics digitalization in Morocco.
 * Usage: node scripts/blog-logistics.js
 * Requires: NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in environment
 */

const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://txkcboapwcqzxezauplq.supabase.co',
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function main() {
  const articles = [
    {
      slug: "gestion-livraison-transport-maroc",
      locale: "fr",
      title: "Gestion livraison transport Maroc : comment le digital transforme vos opérations",
      description: "Bons de livraison papier, clients qui appellent sans arrêt, Excel pour planifier les tournées — voici comment les entreprises de transport marocaines passent au digital et récupèrent leur rentabilité.",
      sector: "logistics",
      content: `## Le quotidien d'un transporteur marocain en 2025

Vous gérez une flotte à Casablanca. Il est 9h du matin, et votre téléphone sonne déjà pour la troisième fois. Un client à Tanger veut savoir où est sa livraison. Votre chauffeur est quelque part sur l'autoroute A3, mais vous n'en savez pas plus.

C'est le paradoxe du transport marocain aujourd'hui : un secteur dynamique, des routes qui s'améliorent, des volumes en hausse — mais des outils qui n'ont pas évolué depuis dix ans. Bons de livraison en papier, planification des tournées sur Excel, preuves de livraison contestées faute de signature digitale. Et derrière tout ça, une équipe administrative qui passe ses journées à répondre au téléphone plutôt qu'à optimiser les opérations.

## Les vrais problèmes qui coûtent cher

### 65 % de vos appels entrants sont évitables

Dans la plupart des entreprises de transport que nous accompagnons, près de 65 % des appels entrants posent une seule question : "Où est ma livraison ?" Ce n'est pas un problème de service client — c'est un problème d'information. Quand le client n'a aucun moyen de suivre sa commande par lui-même, il appelle. C'est logique.

Le résultat concret : une assistante administrative mobilisée plusieurs heures par jour uniquement pour rassurer des clients qui pourraient se rassurer seuls.

### Excel n'est pas un logiciel de routage

Planifier des tournées sur Excel, c'est comme naviguer au compas quand le GPS existe. Ça marche, jusqu'au jour où un chauffeur tombe malade, qu'un client déplace sa livraison à 8h du matin, ou qu'il faut absorber le pic de Ramadan en gérant 40 % de commandes en plus sur les mêmes ressources.

Un routage manuel sur l'axe Casablanca–Agadir avec dix adresses à livrer dans les médinas de Marrakech ou d'Essaouira peut coûter 800 litres de carburant supplémentaires par mois en détours inutiles. Ce n'est pas une estimation — c'est une moyenne mesurée chez nos clients avant et après déploiement d'un outil d'optimisation.

### Les litiges sans preuve numérique

Livraison contestée, client qui affirme ne pas avoir reçu son colis, chauffeur qui dit le contraire. Sans preuve digitale — photo, signature électronique, horodatage GPS — vous perdez systématiquement ces litiges ou vous passez des heures à les résoudre manuellement.

Dans le dernier mile en médina, où les adresses sont imprécises et les accès compliqués, ce problème est encore plus aigu. Un bon de livraison papier taché ou incomplet ne protège personne.

## Ce que le digital change concrètement

### Un portail de suivi pour vos clients

L'outil le plus simple et le plus impactant : donner à chaque client un lien de suivi en temps réel. Plus besoin d'appeler. La livraison est en route, le chauffeur est à 20 minutes, la signature a été capturée à 14h32. Le client sait tout, sans solliciter votre équipe.

Résultat direct : une réduction de 65 % des appels entrants constatée dès les premières semaines. Votre équipe administrative peut enfin se concentrer sur des tâches à valeur ajoutée.

### L'optimisation de tournées adaptée au terrain marocain

Un logiciel de routage ne se contente pas de calculer le chemin le plus court. Il intègre les contraintes réelles : horaires de livraison imposés par vos clients, restrictions d'accès dans les médinas, trafic de l'axe Casablanca–Tanger aux heures de pointe, pics de charge lors du Ramadan ou des fêtes.

Nos clients constatent en moyenne 800 litres de carburant économisés par mois après optimisation des tournées — soit une économie directe entre 8 000 et 12 000 DH mensuels selon le prix du gasoil.

### La preuve de livraison digitale

Chaque livraison est documentée : photo du colis déposé, signature électronique du destinataire, coordonnées GPS, heure exacte. Tout est archivé et consultable en quelques secondes. En cas de litige, vous avez une réponse en trente secondes, pas en trois jours.

Pour les livraisons en dernière tranche — particulièrement complexes dans les centres-villes et les médinas — cette traçabilité devient un avantage commercial que vous pouvez mettre en avant auprès de vos donneurs d'ordre.

### Le tableau de bord flotte

Visibilité en temps réel sur l'ensemble de votre flotte : position des véhicules, statut des livraisons, taux de complétion par chauffeur, kilomètres parcourus, incidents déclarés. Pas pour surveiller vos équipes, mais pour prendre de meilleures décisions opérationnelles — affecter le bon chauffeur, réaffecter une livraison en cas de problème, identifier les tournées les moins rentables.

## Le retour sur investissement en chiffres

Ce n'est pas un argumentaire commercial abstrait. Voici ce que nous mesurons chez nos clients dans le secteur transport :

- **6 semaines** : délai moyen pour atteindre le ROI complet (économies carburant + temps administratif récupéré)
- **65 %** de réduction des appels entrants
- **800 litres/mois** d'économie carburant moyenne
- **0 litige non documenté** après déploiement de la preuve digitale

Ces chiffres varient selon la taille de la flotte et la complexité des opérations, mais la tendance est constante.

## Le contexte marocain : des spécificités à ne pas ignorer

La digitalisation du transport au Maroc ne se fait pas à copier-coller depuis un modèle européen. Quelques réalités locales à intégrer :

- **L'adressage imprécis** dans les villes secondaires et les médinas exige des outils capables de géolocaliser sur photo ou point GPS plutôt que sur adresse postale.
- **Le Ramadan** génère des pics de 40 à 60 % sur certaines catégories. Un système bien configuré anticipe et réorganise les tournées en conséquence.
- **Les axes Casablanca–Tanger et Casablanca–Agadir** concentrent l'essentiel du trafic longue distance. L'optimisation sur ces corridors a un impact direct et immédiat.
- **La connectivité mobile** s'est considérablement améliorée. Vos chauffeurs ont un smartphone. L'application chauffeur est la pièce centrale du dispositif.

## Par où commencer ?

La bonne nouvelle : vous n'avez pas besoin de tout changer en même temps. La plupart de nos déploiements commencent par un seul module — souvent le suivi client ou la preuve de livraison — et s'étendent progressivement selon les besoins.

Nous construisons des solutions sur mesure, adaptées à votre flotte, vos clients et vos contraintes opérationnelles. Pas un logiciel générique importé, mais un outil pensé pour le terrain marocain.

Si vous gérez une flotte de livraison et que vous reconnaissez l'un de ces problèmes dans votre quotidien, discutons-en. Un premier échange suffit souvent pour identifier les deux ou trois actions qui changeront le plus rapidement votre rentabilité.`,
      status: "published",
      published_at: new Date().toISOString(),
    },
    {
      slug: "delivery-management-logistics-morocco-en",
      locale: "en",
      title: "Delivery management software Morocco: how digital tools are reshaping transport operations",
      description: "Paper delivery slips, constant 'where is my package' calls, Excel routing — here's how Moroccan transport companies are going digital and winning back their margins.",
      sector: "logistics",
      content: `## A typical morning for a Moroccan transport manager

It's 9am in Casablanca. Your phone has already rung twice. A client in Tangier wants to know where their shipment is. Your driver is somewhere on the A3 highway — you know that much, and not much more.

This is the central paradox of Moroccan logistics in 2025: a sector with growing volumes, improving infrastructure, and real commercial ambition — running on tools that haven't changed in a decade. Paper delivery slips. Excel route planning. Disputed deliveries with no digital proof. And an admin team spending the better part of their day answering the phone instead of improving operations.

## The real problems — and what they actually cost

### 65% of inbound calls ask the same question

In most transport companies we work with, close to 65% of inbound calls are asking one thing: "Where is my delivery?" That's not a customer service problem. It's an information problem. When customers have no way to track their own orders, they call. It's rational.

The practical result: your administrative staff is tied up for hours each day reassuring customers who could reassure themselves — if only you gave them the tools to do so.

### Excel was never a routing engine

Planning delivery rounds on Excel is like navigating with a paper map when GPS exists. It works — until a driver calls in sick, a customer reschedules at 8am, or Ramadan hits and you're managing 40% more orders on the same resources with the same number of vehicles.

Manual routing on the Casablanca–Agadir corridor, with ten stops scattered across medinas in Marrakech or Essaouira, can waste 800 liters of fuel per month in unnecessary detours. That's not an estimate — it's an average measured across our clients before and after deploying a route optimization tool.

### Disputed deliveries with no proof

A customer claims they didn't receive their package. Your driver says otherwise. Without digital proof — a photo, an e-signature, a GPS timestamp — you either lose the dispute or spend hours resolving it manually.

In last-mile delivery inside medinas, where addresses are imprecise and access is complicated, this problem is especially acute. A crumpled paper delivery slip protects no one.

## What digital tools actually change

### A real-time tracking portal for your customers

The simplest, highest-impact tool: give every customer a live tracking link. No more calls asking where their order is. The delivery is en route, the driver is 20 minutes away, the signature was captured at 2:32pm. The customer knows everything — without contacting your team.

Direct result: a 65% reduction in inbound calls, typically visible within the first few weeks of rollout. Your admin team can finally focus on work that actually adds value.

### Route optimization built for Moroccan terrain

Good routing software doesn't just find the shortest path. It integrates real constraints: customer delivery windows, access restrictions in medinas, traffic patterns on the Casablanca–Tangier corridor during peak hours, and surge volumes during Ramadan or Eid.

Our clients see an average of 800 liters of fuel saved per month after route optimization — a direct monthly saving of 8,000 to 12,000 MAD depending on diesel prices.

### Digital proof of delivery

Every delivery is documented: a photo of the dropped package, the recipient's electronic signature, GPS coordinates, and the exact timestamp. Everything is archived and searchable in seconds. When a dispute arises, you have an answer in thirty seconds, not three days.

For last-mile deliveries — especially challenging in city centers and medinas — this traceability becomes a commercial differentiator you can actively sell to your major clients.

### The fleet management dashboard

Real-time visibility across your entire fleet: vehicle positions, delivery statuses, completion rates by driver, kilometers traveled, reported incidents. Not to micromanage your team, but to make better operational decisions — assign the right driver, reassign a delivery when something goes wrong, identify the least profitable routes.

## ROI in concrete numbers

This isn't abstract marketing. Here's what we measure with clients in the transport sector:

- **6 weeks**: average time to full ROI (fuel savings + recovered admin time)
- **65%** reduction in inbound customer calls
- **800 liters/month** average fuel saving
- **Zero undocumented disputes** after digital proof of delivery is deployed

Numbers vary by fleet size and operational complexity, but the direction is consistent.

## The Moroccan context: specifics that matter

Digitalization in Moroccan logistics doesn't work by importing a European playbook unchanged. Local realities to account for:

- **Imprecise addressing** in secondary cities and medinas requires tools that can geolocate by photo or GPS pin rather than street address.
- **Ramadan** drives 40–60% volume spikes in some categories. A well-configured system anticipates this and reorganizes routes accordingly.
- **The Casablanca–Tangier and Casablanca–Agadir corridors** concentrate the bulk of long-haul traffic. Optimization on these routes delivers immediate, measurable impact.
- **Mobile connectivity** has improved significantly. Your drivers have smartphones. The driver app is the operational backbone of any digital deployment.

## Where to start

The good news: you don't need to change everything at once. Most of our deployments start with a single module — usually customer tracking or digital proof of delivery — and expand from there based on what delivers the most value.

We build custom solutions adapted to your fleet, your clients, and your operational constraints. Not an off-the-shelf import, but tools designed for the Moroccan terrain.

If you run a delivery fleet and you recognize any of these problems in your day-to-day, let's talk. A first conversation is usually enough to identify two or three changes that will move the needle fastest.`,
      status: "published",
      published_at: new Date().toISOString(),
    },
    {
      slug: "gestion-livraison-transport-maroc-ar",
      locale: "ar",
      title: "تدبير التوصيل والنقل بالمغرب: كيف يغير الرقمي عمليات شركات الشحن",
      description: "وصولات ورقية، مكالمات لا تنتهي من الزبناء، تخطيط يدوي للطرق — هكذا بدأت شركات النقل المغربية تتبنى الرقمي وترجع هامش الربح.",
      sector: "logistics",
      content: `## الصباح الحقيقي لمسير شركة نقل مغربية

الساعة 9 دالصباح فكازا. الهاتف رن ثلاث مرات قبل ما تشرب قهوتك. زبون فطنجة كيسول على شحنتو. السائق كيمشي فالطريق السيار — هذا كل ما تعرفه.

هاد هو التناقض الكبير ديال قطاع النقل بالمغرب فعام 2025: قطاع فيه حركة متزايدة، بنية تحتية كتتحسن، وطموح تجاري واضح — ولكن كيشتغل بأدوات ما تبدلاتش منذ عشر سنوات. وصولات توصيل ورقية، تخطيط الطرق على Excel، وخلافات مع الزبناء بلا دليل رقمي. وفالنهاية، فريق إداري كيقضي نهاره كيجاوب على التليفون عوض ما يحسن العمليات.

## المشاكل الحقيقية — وكاش تكلف بزاف

### 65 في المئة من مكالماتك جواب ليها سهل

فمعظم شركات النقل لي كنتعاملو معاها، قريب من 65 في المئة من المكالمات الواردة كيطرحو سؤال واحد: "فين توصيلتي؟" هاد مشي مشكلة خدمة زبناء — هادي مشكلة معلومات. ملي ما عندش الزبون أي طريقة يتبع بيها طلبيتو بنفسو، كيتصل. هاد شي طبيعي.

النتيجة العملية: المساعدة الإدارية مشغولة ساعات فالنهار باش تطمن زبناء كانو قادرين يطمنو راسهم — لو كان عندهم الأداة المناسبة.

### Excel مش برنامج تخطيط طرق

تخطيط الطرود على Excel بحال ما تمشي بالخريطة الورقية وGPS موجود. كيخدم — حتى يمرض سائق، أو يبدل زبون وقت التوصيل فالتمانية ديالصباح، أو تجي رمضان وعندك 40 في المئة زيادة فالطلبيات على نفس الموارد.

التخطيط اليدوي فمحور الدار البيضاء–أكادير مع عشر عناوين فالمدن العتيقة ديال مراكش أو الصويرة ممكن يكلف 800 ليتر من الكاز زيادة فالشهر بسبب المسارات غير المُحسَّنة. هاد مشي تقدير — هاد معدل مقاس عند زبناءنا قبل وبعد استخدام أداة التحسين.

### خلافات التوصيل بلا دليل

زبون كيقول ما وصلاتوش الطرد. السائق كيقول وصلات. بلا دليل رقمي — صورة، توقيع إلكتروني، وقت GPS — إما كتخسر الخلاف أو كتقضي ساعات باش تحلو يدوياً.

فالتوصيل الأخير داخل المدن العتيقة، فين العناوين مبهمة والوصول صعب، هاد المشكل كيزيد حدة. وصل توصيل ورقي مطوي ومبلل ما كيحمي حتى واحد.

## شنو كيبدل الرقمي فالواقع

### بوابة متابعة لزبناءك فالوقت الحقيقي

الأداة الأبسط والأكثر تأثيراً: عطي لكل زبون رابط متابعة مباشر. ما عادش كيتصل يسول. التوصيلة فالطريق، السائق على بعد 20 دقيقة، التوقيع تسجل فالساعة 2:32 ديالعشية. الزبون كيعرف كل شي — بلا ما يتصل بفريقك.

النتيجة المباشرة: تخفيض بـ 65 في المئة فالمكالمات الواردة، وهاد الشي واضح فالأسابيع الأولى بعد الاعتماد. فريقك الإداري يقدر أخيراً يتركز على الشغل لي عندو قيمة حقيقية.

### تحسين المسارات مناسب للميدان المغربي

برنامج التوجيه الجيد مكيحسبش غير أقصر طريق. كيدخل فيه القيود الحقيقية: أوقات التوصيل لي كيطلبها الزبناء، قيود الوصول فالمدن العتيقة، ازدحام محور الدار البيضاء–طنجة فساعات الذروة، وارتفاع الطلب فرمضان أو العيد.

زبناءنا كيوفرو فالمعدل 800 ليتر ديالكاز فالشهر بعد تحسين المسارات — اقتصاد مباشر بين 8,000 و12,000 درهم فالشهر حسب سعر الكاز.

### دليل التوصيل الرقمي

كل توصيلة مُوثَّقة: صورة للطرد المُسلَّم، توقيع إلكتروني من المستلم، إحداثيات GPS، والوقت بالضبط. كل شي مخزَّن وكيتقدر توصلو فثوانٍ. ملي تجي خلاف، عندك جواب فثلاثين ثانية مش فثلاثة أيام.

فالتوصيل الأخير — الصعب بشكل خاص داخل المدن والمدن العتيقة — هاد التتبع يتحول لميزة تجارية تقدر تبرزها لزبناءك الكبار.

### لوحة متابعة الأسطول

رؤية فالوقت الحقيقي على كامل أسطولك: موقع السيارات، حالة التوصيلات، نسبة الإنجاز عند كل سائق، الكيلومترات المقطوعة، الحوادث المُبلَّغ عنها. مش باش تراقب فريقك، ولكن باش تاخذ قرارات عملية أحسن — تعيين السائق المناسب، إعادة توزيع توصيلة ملي تجري مشكلة، تحديد الطرود الأقل ربحية.

## العائد على الاستثمار بأرقام ملموسة

هاد مشي كلام تسويقي فارغ. هاد الأرقام لي كنقيسوها عند زبناءنا فقطاع النقل:

- **6 أسابيع**: الوقت المتوسط للوصول للعائد الكامل على الاستثمار (توفير الكاز + استرجاع الوقت الإداري)
- **65 في المئة** تخفيض فالمكالمات الواردة
- **800 ليتر فالشهر** توفير متوسط فالكاز
- **صفر خلافات غير موثقة** بعد اعتماد دليل التوصيل الرقمي

هاد الأرقام كتتغير حسب حجم الأسطول وتعقيد العمليات، ولكن الاتجاه ثابت.

## السياق المغربي: خصوصيات ما تتجاهلش

الرقمنة فالنقل بالمغرب ما تخدمش بنقل نموذج أوروبي مباشرة. واقعيات محلية خاص تحسب ليها:

- **العناوين الغير دقيقة** فالمدن الصغيرة والمدن العتيقة تحتاج أدوات تقدر تحدد الموقع بالصورة أو النقطة الجغرافية عوض العنوان البريدي.
- **رمضان** كيولد ارتفاع 40 إلى 60 في المئة فبعض الفئات. نظام كيف خص كيستبق هاد الشي وكيعيد تنظيم المسارات.
- **محوري الدار البيضاء–طنجة والدار البيضاء–أكادير** فيهم أكثر من نصف النقل بعيد المدى. التحسين على هاد المحاور عندو تأثير مباشر وقابل للقياس.
- **الاتصال بالموبايل** تحسن بزاف. سائقينك عندهم سمارتفون. تطبيق السائق هو المحور الأساسي لأي نشر رقمي.

## فاش تبدأ؟

البشارة الزينة: ما محتاجش تبدل كل شي فنفس الوقت. معظم مشاريعنا كتبدأ بموديل واحد — غالباً متابعة الزبناء أو دليل التوصيل الرقمي — وكتتوسع من هناك حسب ما كيعطي أكبر قيمة.

كنبنيو حلول على المقاس، متكيفة مع أسطولك، زبناءك، وقيودك التشغيلية. مشي برنامج جاهز مستورد، ولكن أداة مفكَّر فيها للميدان المغربي.

إلا كتدير أسطول توصيل وعرفت راسك فحتى واحدة من هاد المشاكل، خلينا نتكلمو. شي محادثة أولى غالباً تكفي باش نحددو جوج أو ثلاثة تغييرات لي غتبدل أكثر شي فمعدل الربح ديالك.`,
      status: "published",
      published_at: new Date().toISOString(),
    },
  ];

  for (const a of articles) {
    const { error } = await supabase.from('blog_posts').upsert(a, { onConflict: 'slug' });
    if (error) console.error(`Error inserting ${a.slug}:`, error.message);
    else console.log(`✓ ${a.slug}`);
  }
}

main();
