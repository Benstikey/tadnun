const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://txkcboapwcqzxezauplq.supabase.co',
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function main() {
  const articles = [
    {
      slug: "crm-immobilier-agence-maroc",
      locale: "fr",
      title: "CRM immobilier agence Maroc : comment arrêter de perdre vos leads dans WhatsApp",
      description: "Découvrez comment les agences immobilières marocaines multiplient leur taux de conversion par 3 grâce à un CRM adapté : capture automatique depuis Avito et Mubawab, relances automatisées, visites virtuelles pour les MRE et matching intelligent de biens.",
      sector: "realestate",
      content: `# CRM immobilier agence Maroc : comment arrêter de perdre vos leads dans WhatsApp

Vous publiez un bien sur Avito le matin. En deux heures, vous avez 15 messages WhatsApp, 4 appels manqués et 3 DM Facebook. Le lendemain, vous n'avez rappelé qu'un seul prospect. Les 17 autres ? Perdus quelque part entre les notifications et les urgences de la journée.

Ce scénario, chaque directeur d'agence immobilière au Maroc le connaît. Et il coûte cher — pas seulement en commission perdue, mais en réputation, en temps et en énergie.

## Le vrai problème : vos leads vivent dans dix endroits à la fois

L'immobilier marocain s'est digitalisé à toute vitesse. Avito, Mubawab, les groupes Facebook, Instagram, les portails d'annonces locaux — vos biens sont partout, et c'est une bonne chose. Le problème, c'est que les leads qui en découlent arrivent dans des canaux disparates, et aucun outil ne les centralise.

Résultat concret : un prospect qui a envoyé un message sur Avito à 9h du matin et qui n'a pas été rappelé avant 16h a très probablement déjà visité un autre bien avec une agence concurrente. Dans un marché aussi réactif que Casablanca, Marrakech ou Tanger, **5 minutes de délai de rappel** séparent une commission d'un contact perdu.

Et la situation est encore plus complexe avec les acheteurs MRE (Marocains Résidant à l'Étranger). Ces clients, souvent en France, en Italie ou en Espagne, représentent un segment à fort pouvoir d'achat — mais ils ne peuvent pas se déplacer pour chaque visite. Sans système de suivi structuré et sans visite virtuelle, vous perdez ces ventes avant même qu'elles commencent.

## Ce que fait un CRM immobilier bien configuré

Un CRM (Customer Relationship Management) adapté à une agence immobilière marocaine, ce n'est pas un simple tableur en ligne ou un agenda partagé. C'est un système qui travaille pour vous, même quand vous êtes en rendez-vous.

### 1. Capture automatique des leads depuis tous vos canaux

Chaque message entrant depuis Avito, Mubawab, votre site, votre page Facebook ou votre profil Instagram est automatiquement créé comme fiche prospect dans votre CRM. Nom, numéro, source, bien consulté, heure de contact — tout est enregistré sans aucune saisie manuelle.

Vous ne perdez plus rien entre les cracks.

### 2. Relances automatisées et séquences de suivi

Un prospect qui n'a pas répondu à votre premier appel reçoit automatiquement un SMS de relance une heure plus tard, puis un message WhatsApp le lendemain. Vous définissez la séquence une seule fois ; le CRM l'exécute pour chaque nouveau lead.

Les agences qui adoptent ce système constatent en moyenne **un taux de conversion multiplié par 3** dans les trois premiers mois — non pas parce qu'elles ont plus de leads, mais parce qu'elles cessent d'en perdre.

### 3. Matching intelligent de biens

Quand un nouveau bien entre dans votre portefeuille, le CRM identifie automatiquement les prospects dans votre base qui correspondent aux critères : budget, superficie, quartier, type de bien. Vous envoyez une notification ciblée en un clic, au lieu de fouiller dans vos conversations WhatsApp.

### 4. Visites virtuelles pour les acheteurs MRE

C'est sans doute la fonctionnalité la plus impactante pour les agences travaillant avec la diaspora marocaine. Une visite virtuelle 3D bien produite permet à un acheteur basé à Lyon ou à Barcelone de visiter un appartement à Agdal ou à Bourgogne comme s'il était sur place.

Certaines agences marocaines signent aujourd'hui **100% de leurs ventes MRE à distance** — promesse de vente, versement des arrhes via CMI, signature notariale en procuration. Le parcours complet, sans que l'acheteur n'ait à prendre l'avion avant la remise des clés.

## Ce que ça change concrètement pour votre agence

Voici ce que les agences immobilières marocaines qui ont digitalisé leur processus de vente observent dans leurs chiffres :

- **Délai de premier contact** : de plusieurs heures à moins de 5 minutes grâce aux alertes et à l'attribution automatique des leads
- **Taux de conversion lead → visite** : en hausse de 40 à 60% avec les relances automatisées
- **Taux de conversion visite → offre** : amélioré par un meilleur historique de la relation (le négociateur sait ce que le client a déjà vu, ce qu'il a aimé, ses objections passées)
- **Ventes MRE** : de quasi-inexistantes à un segment rentable grâce aux visites virtuelles et au suivi structuré

## L'objection qu'on entend souvent : "Mes agents ne vont pas utiliser un CRM"

C'est une préoccupation légitime. La vérité, c'est que les CRM complexes et mal adaptés sont effectivement abandonnés au bout de deux semaines.

La clé, c'est d'adopter un outil conçu pour le quotidien d'une agence marocaine — pas un logiciel américain traduit en français avec des modules inutiles. Un bon CRM immobilier pour le marché marocain s'intègre dans les habitudes existantes : WhatsApp reste l'outil de communication principal, mais les conversations y sont archivées automatiquement dans la fiche client. L'agent travaille comme avant, mais sans rien perdre.

## Par où commencer ?

La transformation digitale d'une agence immobilière ne se fait pas en un jour, et elle n'a pas besoin de l'être. Une approche progressive fonctionne très bien :

1. **Semaine 1-2** : Audit de vos sources de leads actuelles et mise en place de la capture automatique
2. **Semaine 3-4** : Configuration des séquences de relance pour les nouvelles demandes
3. **Mois 2** : Intégration du matching de biens et formation des agents
4. **Mois 3** : Déploiement des visites virtuelles pour le segment MRE

Chaque étape génère des résultats mesurables avant de passer à la suivante.

## Pour aller plus loin

Si vous dirigez une agence immobilière au Maroc et que vous sentez que votre croissance est freinée par des processus manuels et des leads perdus, la bonne nouvelle c'est que la solution n'est pas hors de portée.

Chez Tadnun, nous concevons des outils digitaux sur mesure pour les agences marocaines — CRM, visites virtuelles, automatisations, intégration avec les portails locaux. Pas de logiciel standard déguisé, pas de promesses vagues : une solution construite autour de votre façon de travailler.

Prenez contact avec nous pour un diagnostic gratuit de votre process actuel. On vous dit honnêtement ce qui peut être amélioré et combien ça peut rapporter.`,
      status: "published",
      published_at: new Date().toISOString(),
    },
    {
      slug: "real-estate-crm-morocco-en",
      locale: "en",
      title: "Real Estate CRM Morocco: How to Stop Losing Leads in WhatsApp",
      description: "Learn how Moroccan real estate agencies are tripling their conversion rates with the right CRM setup — automatic lead capture from Avito and Mubawab, automated follow-ups, virtual tours for MRE buyers, and smart property matching.",
      sector: "realestate",
      content: `# Real Estate CRM Morocco: How to Stop Losing Leads in WhatsApp

You list a property on Avito in the morning. Within two hours, you have 15 WhatsApp messages, 4 missed calls, and 3 Facebook DMs. By the next day, you've called back one prospect. The other 17? Buried somewhere between notifications and daily urgencies.

Every real estate agency director in Morocco knows this story. And it's expensive — not just in lost commission, but in reputation, time, and energy.

## The Real Problem: Your Leads Live in Ten Different Places

Morocco's real estate market has gone digital fast. Avito, Mubawab, Facebook groups, Instagram, local listing portals — your properties are everywhere, which is great. The problem is that the leads they generate arrive through fragmented channels, and no single tool brings them together.

The practical consequence: a prospect who messaged you on Avito at 9 a.m. and didn't hear back until 4 p.m. has very likely already visited a property with a competing agency. In a reactive market like Casablanca, Marrakech, or Tangier, **a 5-minute callback window** is the difference between a deal and a lost contact.

The situation is even more complex with MRE buyers — Moroccans living abroad. These clients, often based in France, Italy, or Spain, represent a high-value segment with strong purchasing power. But they can't fly in for every viewing. Without a structured follow-up system and virtual tours, you're losing those sales before they even begin.

## What a Well-Configured Real Estate CRM Actually Does

A CRM built for a Moroccan real estate agency isn't just a shared spreadsheet or an online calendar. It's a system that works for you, even when you're in a showing.

### 1. Automatic Lead Capture from All Your Channels

Every inbound message from Avito, Mubawab, your website, Facebook page, or Instagram profile is automatically created as a prospect record in your CRM. Name, phone number, source, property viewed, contact time — all logged with no manual entry.

Nothing falls through the cracks.

### 2. Automated Follow-Up Sequences

A prospect who didn't answer your first call automatically receives an SMS follow-up one hour later, then a WhatsApp message the next day. You configure the sequence once; the CRM runs it for every new lead.

Agencies that implement this system see an average **3x increase in conversion rate** within the first three months — not because they have more leads, but because they stop losing the ones they already have.

### 3. Smart Property Matching

When a new property enters your portfolio, the CRM automatically identifies prospects in your database who match the criteria: budget, size, neighborhood, property type. You send a targeted notification in one click, instead of digging through WhatsApp threads.

### 4. Virtual Tours for MRE Buyers

This is arguably the highest-impact feature for agencies working with the Moroccan diaspora. A well-produced 3D virtual tour allows a buyer based in Lyon or Barcelona to tour an apartment in Agdal or Bourgogne as if they were standing in it.

Some Moroccan agencies are now closing **100% of their MRE sales remotely** — sale agreements, deposit payments via CMI, notarial signing by proxy. The complete transaction, without the buyer stepping on a plane before key handover.

## What This Looks Like in Real Numbers

Here's what Moroccan real estate agencies that have digitized their sales process observe in their figures:

- **Time to first contact**: from several hours down to under 5 minutes, thanks to alerts and automatic lead assignment
- **Lead-to-viewing conversion rate**: up 40–60% with automated follow-ups
- **Viewing-to-offer conversion rate**: improved through richer relationship history (the agent knows what the client has already seen, what they liked, and their past objections)
- **MRE sales**: from near zero to a profitable segment through virtual tours and structured follow-up

## The Objection We Hear Most: "My Agents Won't Use a CRM"

This is a legitimate concern. Overly complex, poorly adapted CRMs really do get abandoned after two weeks.

The key is choosing a tool designed for the daily reality of a Moroccan agency — not an American software product with a French interface and dozens of useless modules. A good real estate CRM for the Moroccan market integrates into existing habits: WhatsApp stays the primary communication tool, but conversations are automatically archived in the client record. Agents work the way they already do — but without losing anything.

## Where to Start

Digitizing a real estate agency doesn't happen overnight, and it doesn't need to. A phased approach works well:

1. **Weeks 1–2**: Audit your current lead sources and set up automatic capture
2. **Weeks 3–4**: Configure follow-up sequences for new inquiries
3. **Month 2**: Integrate property matching and train your agents
4. **Month 3**: Roll out virtual tours for the MRE segment

Each phase delivers measurable results before moving to the next.

## Taking the Next Step

If you run a real estate agency in Morocco and feel that manual processes and lost leads are holding back your growth, the good news is that the solution is within reach.

At Tadnun, we design custom digital tools for Moroccan agencies — CRM, virtual tours, automations, integration with local portals. No off-the-shelf software in disguise, no vague promises: a solution built around the way you actually work.

Reach out for a free audit of your current process. We'll give you an honest assessment of what can be improved and what it could mean for your revenue.`,
      status: "published",
      published_at: new Date().toISOString(),
    },
    {
      slug: "crm-immobilier-agence-maroc-ar",
      locale: "ar",
      title: "CRM ديال الإيموبيليي فالمغرب: كيفاش تبطل تخسر العملاء فواتساب",
      description: "اعرف كيفاش الوكالات العقارية فالمغرب كتضاعف معدل التحويل ديالها بثلاثة مرات بفضل CRM مناسب — جمع أوتوماتيكي للـ leads من Avito و Mubawab، ريلانسات أوتوماتيكية، زيارات افتراضية للمغاربة المقيمين بالخارج، ومطابقة ذكية للعقارات.",
      sector: "realestate",
      content: `# CRM ديال الإيموبيليي فالمغرب: كيفاش تبطل تخسر العملاء فواتساب

تنشر عقار على Avito فالصباح. فجوج ساعات عندك 15 رسالة فواتساب، 4 مكالمات فايتة، و3 رسائل فداسبوك. من الغد، رجعت لواحد بصح. المية وسبعطاش كالاخرين؟ ضاعوا بين النوتيفيكاشيونات وزحمة اليوم.

هاد الموقف، كل مدير وكالة عقارية فالمغرب عارفو. وكيكلف غالي — ماشي غير فالعمولة اللي فاتك، بل فالوقت والسمعة والطاقة.

## المشكلة الحقيقية: العملاء ديالك فعشر بلايص

القطاع العقاري فالمغرب تطور بزربة على المستوى الرقمي. Avito، Mubawab، groupes Facebook، Instagram، المواقع المحلية — العقارات ديالك فبلاصات بزاف، وهاد الشي مزيان. المشكلة هي أن الـ leads الجايين من هاد القنوات كيوصلو بشكل مبعثر، وما كاينش أداة واحدة كتجمعهم.

النتيجة العملية: شي عميل بعثلك رسالة فـ Avito الساعة 9 فالصباح وما رجعتيلوش قبل 4 بعد الظهر، على الغالب هو دير زيارة مع وكالة خرى. فسوق ريياكتيف بحال كازا ومراكش وطنجة، **5 دقائق** هي الفرق بين صفقة مكسبة وعميل ضايع.

والموقف أصعب مع المغاربة المقيمين بالخارج (MRE). هاد العملاء — اللي كانو فرنسا أو إيطاليا أو إسبانيا — عندهم قدرة شرائية قوية، ولكنهم ما يقدروش يجيو لكل زيارة. من غير نظام متابعة منظم وزيارات افتراضية، كتخسر هاد البيعات قبل ما تبدا.

## شنو كيدير CRM عقاري مزيان مضبوط

CRM مناسب لوكالة عقارية مغربية ماشي غير تيبل مشترك أو أجندة أونلاين. هو نظام كيخدم بدالك، حتى وأنت فموعد.

### 1. جمع أوتوماتيكي للـ leads من جميع القنوات

كل رسالة وصلتك من Avito أو Mubawab أو موقعك أو صفحة داسبوك أو حساب Instagram كتتسجل أوتوماتيك كملف عميل فالـ CRM. الاسم، الرقم، المصدر، العقار اللي شاف، وقت التواصل — كلشي يتسجل بلا ما تكتب حاجة بيدك.

ما غادي يضيع عليك والو.

### 2. ريلانسات أوتوماتيكية وسيكوونسات متابعة

العميل اللي ما جاوبش على أول مكالمة كيوصلو SMS أوتوماتيك بعد ساعة، وبعدها رسالة واتساب من الغد. أنت تضبط السيكووينس مرة وحدة؛ الـ CRM كيديرها على كل lead جديد.

الوكالات اللي تبنات هاد النظام كتشوف فالغالب **زيادة تلاثة مرات فمعدل التحويل** خلال أول ثلاثة أشهر — ماشي لأن عندهم leads أكثر، بل لأنهم بطلو يخسرو اللي عندهم.

### 3. مطابقة ذكية للعقارات

ملي يدخل عقار جديد لبورتافوليو ديالك، الـ CRM كيتعرف أوتوماتيك على العملاء فقاعدة البيانات اللي كيوافقو للمعايير: البودجي، المساحة، الحي، نوع العقار. كتبعث إشعار مستهدف بكليك وحدة، عوض ما تقلب فمحادثات واتساب.

### 4. زيارات افتراضية للـ MRE

هاد الميزة هي لعله الأقوى للوكالات اللي كتخدم مع الجالية المغربية. زيارة افتراضية 3D مزيانة كتخلي مشتري ساكن فليون أو برشلونة يزور شقة فأكدال ولا فبورقون كأنو واقف فيها.

بعض الوكالات المغربية دابا كتسد **100% من بيعات المغاربة المقيمين بالخارج عن بعد** — عقد البيع، دفع العربون عبر CMI، التوقيع الموثق بالوكالة. المسار الكامل، من غير ما المشتري يأخد الطيارة قبل تسليم المفاتيح.

## شنو هاد الأرقام كتقول بالملموس

هاكدا كتشوف الوكالات العقارية المغربية اللي رقمنت عملية البيع ديالها:

- **وقت أول تواصل**: من بزاف دساعات لأقل من 5 دقائق، بفضل النبيهات والتعيين الأوتوماتيكي للـ leads
- **معدل التحويل من lead لزيارة**: زاد 40 إلى 60% بفضل الريلانسات الأوتوماتيكية
- **معدل التحويل من زيارة لعرض**: تحسن بسبب تاريخ علاقة أغنى مع العميل — الوكيل كيعرف شنو شاف العميل، شنو عجبو، وعلاش تردد
- **بيعات MRE**: من قريب الصفر لسيقمان مربح بفضل الزيارات الافتراضية والمتابعة المنظمة

## الاعتراض اللي كنسمعو ديما: "المستشارين ديالي ما غاديش يستعملو CRM"

هاد القلق مشروع. CRM معقد وما كيوافقش الواقع، بالفعل كيتهجر بعد جوج أسابيع.

المفتاح هو تختار أداة مبنية للواقع اليومي ديال وكالة مغربية — ماشي برنامج أمريكي مترجم بالفرنسية مع موديولات ما خصكوش. CRM عقاري مزيان للسوق المغربي كيندمج فالعادات الموجودة: واتساب يبقى أداة التواصل الأساسية، ولكن المحادثات كتتأرشف أوتوماتيك فملف العميل. المستشار كيخدم كما كان — ولكن من غير ما يخسر حاجة.

## من فين تبدا

الرقمنة ديال وكالة عقارية ما كتتدارش فنهار، وما محتاجاش تكون هكدا. نهج تدريجي كيخدم بزاف مزيان:

1. **الأسبوع 1–2**: أوديت للمصادر الحالية ديال الـ leads وإعداد الجمع الأوتوماتيكي
2. **الأسبوع 3–4**: ضبط سيكووينسات الريلانس للطلبات الجديدة
3. **الشهر 2**: إدماج المطابقة الذكية للعقارات وتكوين المستشارين
4. **الشهر 3**: نشر الزيارات الافتراضية لسيقمان MRE

كل مرحلة كتعطي نتائج قابلة للقياس قبل ما تنتقل للمرحلة الجاية.

## باش تمشي بعيد

إذا كنت تدير وكالة عقارية فالمغرب وكتحس بأن البروسيسات اليدوية والـ leads الضايعة كتعيق النمو ديالك، البشرى هي أن الحل مو بعيد.

فـ Tadnun، كنبنيو حلول رقمية على القياس للوكالات المغربية — CRM، زيارات افتراضية، أوتوماتيزاشيون، إدماج مع البورتالات المحلية. ماشي برنامج قياسي مقنع، ماشي وعود فارغة: حل مبني حول طريقة الخدمة ديالك.

تواصل معانا لتشخيص مجاني ديال البروسيس الحالي ديالك. غاديين نعطيوك تقييم صادق لما يمكن تحسينه وعلاش ممكن يتحول لمداخيل.`,
      status: "published",
      published_at: new Date().toISOString(),
    },
  ];

  for (const a of articles) {
    const { error } = await supabase.from('blog_posts').upsert(a, { onConflict: 'slug' });
    if (error) console.error(`Error: ${a.slug}:`, error.message);
    else console.log(`✓ ${a.slug}`);
  }
}

main();
