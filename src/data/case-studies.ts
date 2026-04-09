export interface CaseStudy {
  slug: string;
  sector: string;
  client: {
    name: string;
    role: { fr: string; en: string; ar: string };
    city: string;
  };
  title: { fr: string; en: string; ar: string };
  description: { fr: string; en: string; ar: string };
  problem: { fr: string; en: string; ar: string };
  solution: { fr: string[]; en: string[]; ar: string[] };
  results: { value: string; label: { fr: string; en: string; ar: string } }[];
  timeline: { fr: string; en: string; ar: string };
  quote: { fr: string; en: string; ar: string };
}

export const caseStudies: CaseStudy[] = [
  {
    slug: "restaurant-google-maps-marrakech",
    sector: "restaurants",
    client: {
      name: "Karim",
      role: { fr: "Restaurateur", en: "Restaurant owner", ar: "صاحب مطعم" },
      city: "Marrakech",
    },
    title: {
      fr: "Comment un restaurant à Marrakech a gagné 40% de clients en plus grâce à Google Maps",
      en: "How a Marrakech restaurant gained 40% more customers through Google Maps",
      ar: "كيفاش مطعم فمراكش زاد 40% فالعملاء بفضل Google Maps",
    },
    description: {
      fr: "Un restaurant de 15 ans, invisible sur Google, transformé en destination touristique incontournable.",
      en: "A 15-year-old restaurant, invisible on Google, transformed into a must-visit tourist destination.",
      ar: "مطعم عمرو 15 عام، ما كانش باين فـ Google، ولّا وجهة سياحية ما يمكنش تفوّتها.",
    },
    problem: {
      fr: "Karim gère un restaurant de cuisine marocaine depuis 15 ans à Marrakech. Excellente cuisine, emplacement correct dans la médina. Mais zéro présence en ligne. Pas de fiche Google, pas d'avis, pas de photos. Les touristes passaient devant et allaient chez le voisin qui avait 300 avis et des photos de tajines fumants. Vendredi soir, il refusait 20 personnes. Mardi, 25 chaises vides.",
      en: "Karim has been running a Moroccan restaurant for 15 years in Marrakech. Excellent food, decent location in the medina. But zero online presence. No Google listing, no reviews, no photos. Tourists walked past and went to the competitor with 300 reviews and photos of steaming tagines. Friday night, he'd turn away 20 people. Tuesday, 25 empty chairs.",
      ar: "كريم كيدير مطعم ديال الطبخ المغربي من 15 عام فمراكش. الماكلة ممتازة، البلاصة مزيانة فالمدينة القديمة. ولكن حتى حضور رقمي. لا فيشة Google، لا تقييمات، لا تصاور. السيّاح كيدوزو قدّامو وكيمشيو عند الجار اللي عندو 300 تقييم وتصاور ديال الطاجينات. نهار الجمعة، كيرفض 20 واحد. نهار الثلاثاء، 25 كرسي خاوية.",
    },
    solution: {
      fr: [
        "Optimisation complète de la fiche Google Maps (photos professionnelles, description, horaires, catégorie précise)",
        "Système de collecte d'avis automatique par WhatsApp après chaque visite",
        "Menu QR code avec réservation en ligne intégrée",
        "Intégration Glovo avec écran centralisé en cuisine",
        "Suivi du gaspillage alimentaire et des coûts matière",
      ],
      en: [
        "Complete Google Maps listing optimization (professional photos, description, hours, precise category)",
        "Automated review collection system via WhatsApp after each visit",
        "QR code menu with integrated online reservations",
        "Glovo integration with centralized kitchen display",
        "Food waste and cost tracking system",
      ],
      ar: [
        "تحسين كامل لفيشة Google Maps (تصاور احترافية، وصف، أوقات، تصنيف دقيق)",
        "نظام جمع التقييمات أوتوماتيك عبر واتساب بعد كل زيارة",
        "قائمة QR مع حجز أونلاين مدمج",
        "ربط Glovo مع شاشة مركزية فالكوزينة",
        "تتبع هدر الطعام وتكاليف المواد",
      ],
    },
    results: [
      { value: "+40%", label: { fr: "de clients le week-end", en: "weekend customers", ar: "عملاء فالويكند" } },
      { value: "3×", label: { fr: "plus d'avis Google en 3 mois", en: "more Google reviews in 3 months", ar: "تقييمات Google أكثر في 3 شهور" } },
      { value: "0", label: { fr: "erreur de commande depuis 3 mois", en: "order errors for 3 months", ar: "أخطاء فالطلبات من 3 شهور" } },
      { value: "−12%", label: { fr: "de gaspillage alimentaire", en: "food waste reduction", ar: "تخفيض فهدر الطعام" } },
    ],
    timeline: { fr: "2 semaines", en: "2 weeks", ar: "أسبوعين" },
    quote: {
      fr: "Depuis qu'on a notre fiche Google optimisée, on reçoit 40% de clients en plus le week-end. Les touristes nous trouvent directement sur Maps.",
      en: "Since we optimized our Google listing, we get 40% more customers on weekends. Tourists find us directly on Maps.",
      ar: "من بعد ما حسّنا فيشة Google ديالنا، ولّينا كنستاقبلو 40% زيادة فالويكاند. السيّاح كيلقاونا مباشرة فـ Maps.",
    },
  },
  {
    slug: "riad-reservations-directes-fes",
    sector: "tourism",
    client: {
      name: "Nadia",
      role: { fr: "Propriétaire de riad", en: "Riad owner", ar: "مالكة رياض" },
      city: "Fès",
    },
    title: {
      fr: "Comment un riad à Fès a économisé 200 000 DH/an en réduisant sa dépendance à Booking.com",
      en: "How a Fes riad saved 200,000 MAD/year by reducing its Booking.com dependency",
      ar: "كيفاش رياض ففاس وفّر 200,000 درهم/سنة بتقليل الاعتماد على Booking.com",
    },
    description: {
      fr: "Un riad de charme qui versait 300 000 DH/an en commissions. Aujourd'hui, 45% de ses réservations sont en direct.",
      en: "A boutique riad paying 300,000 MAD/year in commissions. Today, 45% of bookings are direct.",
      ar: "رياض كان كيخلص 300,000 درهم/سنة كوميسيون. اليوم، 45% ديال الحجوزات مباشرة.",
    },
    problem: {
      fr: "Nadia gère un riad de 8 chambres dans la médina de Fès. 85% de ses réservations passaient par Booking.com — à 15-20% de commission. C'est 300 000 DH par an envoyés à Amsterdam. Le salaire de deux employés. En plus, les doubles réservations entre Booking et Airbnb cassaient régulièrement sa note. Et le check-in se faisait encore avec un carnet à la réception.",
      en: "Nadia runs an 8-room riad in the Fes medina. 85% of her bookings came through Booking.com — at 15-20% commission. That's 300,000 MAD per year sent to Amsterdam. Two employees' salaries. On top of that, double bookings between Booking and Airbnb regularly hurt her rating. And check-in was still done with a notebook at reception.",
      ar: "نادية كتدير رياض فيه 8 بيوت فالمدينة القديمة ديال فاس. 85% ديال الحجوزات كانو كيدوزو من Booking.com — بكوميسيون 15-20%. يعني 300,000 درهم فالعام كتمشي لأمستردام. صالير ديال جوج خدّامين. زيد على هادشي، الحجوزات المزدوجة بين Booking و Airbnb كانت كتخلي النوطة ديالها تنزل. وكان الشيك-إن مازال بالكارني فالريسيبسيون.",
    },
    solution: {
      fr: [
        "Site de réservation directe avec paiement CMI intégré",
        "Channel manager pour synchroniser les disponibilités Booking + Airbnb en temps réel",
        "Programme de fidélité WhatsApp pour les clients récurrents (code promo réservation directe)",
        "Check-in digital avec envoi automatique des infos avant l'arrivée",
        "Concierge WhatsApp pour les recommandations locales",
      ],
      en: [
        "Direct booking website with integrated CMI payment",
        "Channel manager to sync Booking + Airbnb availability in real time",
        "WhatsApp loyalty program for returning guests (direct booking promo code)",
        "Digital check-in with automatic pre-arrival info",
        "WhatsApp concierge for local recommendations",
      ],
      ar: [
        "موقع حجز مباشر مع دفع CMI مدمج",
        "مدير القنوات باش يزامن الأماكن المتاحة بين Booking و Airbnb فالوقت الحقيقي",
        "برنامج ولاء واتساب للعملاء اللي كيرجعو (كود بروموسيون حجز مباشر)",
        "شيك-إن رقمي مع إرسال أوتوماتيكي ديال المعلومات قبل الوصول",
        "كونسييرج واتساب للتوصيات المحلية",
      ],
    },
    results: [
      { value: "45%", label: { fr: "de réservations directes (vs 15% avant)", en: "direct bookings (vs 15% before)", ar: "حجوزات مباشرة (مقابل 15% قبل)" } },
      { value: "200K DH", label: { fr: "économisés par an en commissions", en: "saved per year in commissions", ar: "وفّرناهم فالعام فالكوميسيون" } },
      { value: "9.2", label: { fr: "note Booking maintenue", en: "Booking rating maintained", ar: "نوطة Booking محفوظة" } },
      { value: "0", label: { fr: "double réservation depuis la mise en place", en: "double bookings since launch", ar: "حجوزات مزدوجة من الإطلاق" } },
    ],
    timeline: { fr: "3 semaines", en: "3 weeks", ar: "3 أسابيع" },
    quote: {
      fr: "Booking me prenait 300 000 DH par an. C'est le salaire de deux employés. Maintenant, presque la moitié de mes réservations sont en direct.",
      en: "Booking was taking 300,000 MAD per year from me. That's two employees' salaries. Now almost half my bookings are direct.",
      ar: "Booking كان كياخد مني 300,000 درهم فالعام. هادا صالير ديال جوج خدّامين. دابا تقريبا نص الحجوزات ديالي مباشرة.",
    },
  },
  {
    slug: "clinique-no-shows-casablanca",
    sector: "healthcare",
    client: {
      name: "Dr. Amina",
      role: { fr: "Directrice de clinique", en: "Clinic director", ar: "مديرة عيادة" },
      city: "Casablanca",
    },
    title: {
      fr: "Comment une clinique à Casablanca a récupéré 25 000 DH/mois en réduisant les no-shows de 60%",
      en: "How a Casablanca clinic recovered 25,000 MAD/month by reducing no-shows by 60%",
      ar: "كيفاش عيادة فالدار البيضاء سترجعات 25,000 درهم/شهر بتخفيض المواعيد الفارغة 60%",
    },
    description: {
      fr: "Une clinique qui perdait 480 000 DH/an en créneaux vides. Des rappels automatiques ont tout changé.",
      en: "A clinic losing 480,000 MAD/year to empty slots. Automated reminders changed everything.",
      ar: "عيادة كانت كتخسر 480,000 درهم/سنة فمواعيد فارغة. التذكيرات الأوتوماتيكية بدّلات كلشي.",
    },
    problem: {
      fr: "Dr. Amina gère une clinique pluridisciplinaire à Casablanca. Chaque jour, 4 à 5 patients ne se présentent pas. Sans prévenir, sans annuler. C'est 2 000 DH par jour de consultations perdues — 40 000 DH par mois, presque 480 000 DH par an. La secrétaire passait 2 heures par jour à appeler les patients pour confirmer les rendez-vous. Certains ne décrochaient pas. Et 8 000 dossiers papier dans 12 armoires rendaient chaque consultation plus lente.",
      en: "Dr. Amina runs a multi-specialty clinic in Casablanca. Every day, 4-5 patients don't show up. Without warning, without canceling. That's 2,000 MAD per day in lost consultations — 40,000 MAD per month, nearly 480,000 MAD per year. The receptionist spent 2 hours daily calling patients to confirm appointments. Some didn't answer. And 8,000 paper files in 12 cabinets made every consultation slower.",
      ar: "الدكتورة أمينة كتدير عيادة متعددة التخصصات فالدار البيضاء. كل يوم، 4-5 مرضى ما كيجيوش. بلا ما يعلمو، بلا ما يلغيو. يعني 2,000 درهم فاليوم ديال استشارات ضايعة — 40,000 درهم فالشهر، تقريبا 480,000 درهم فالعام. السكريتيرة كانت كتقضي ساعتين فاليوم كتعيّط للمرضى باش تأكد المواعيد. شي وحدين ما كيجاوبوش. و 8,000 ملف ورقي في 12 خزانة كيخلّيو كل استشارة أبطأ.",
    },
    solution: {
      fr: [
        "Prise de rendez-vous en ligne (le patient choisit lui-même son créneau)",
        "Rappels automatiques par SMS 48h avant + WhatsApp 2h avant",
        "Option de report en 1 clic (sans appeler)",
        "Liste d'attente automatique (un créneau annulé se remplit tout seul)",
        "Dossiers médicaux électroniques conformes CNDP",
      ],
      en: [
        "Online appointment booking (patients choose their own slot)",
        "Automated reminders via SMS 48h before + WhatsApp 2h before",
        "One-click rescheduling (no need to call)",
        "Automatic waitlist (canceled slots fill themselves)",
        "CNDP-compliant electronic medical records",
      ],
      ar: [
        "حجز مواعيد أونلاين (المريض كيختار الكرينو بوحدو)",
        "تذكيرات أوتوماتيكية عبر SMS 48 ساعة قبل + واتساب ساعتين قبل",
        "إعادة جدولة بكليك واحد (بلا ما تعيّط)",
        "لائحة انتظار أوتوماتيكية (الكرينو الملغي كيتعمّر بوحدو)",
        "ملفات طبية إلكترونية متوافقة مع CNDP",
      ],
    },
    results: [
      { value: "−60%", label: { fr: "de no-shows", en: "no-shows", ar: "مواعيد فارغة" } },
      { value: "+25K DH", label: { fr: "récupérés par mois", en: "recovered per month", ar: "مسترجعين كل شهر" } },
      { value: "−2h", label: { fr: "d'appels téléphoniques par jour", en: "of phone calls per day", ar: "ديال المكالمات فاليوم" } },
      { value: "100%", label: { fr: "des dossiers digitalisés", en: "of files digitized", ar: "ديال الملفات رقمية" } },
    ],
    timeline: { fr: "4 semaines", en: "4 weeks", ar: "4 أسابيع" },
    quote: {
      fr: "On perdait presque un demi-million de dirhams par an sur des chaises vides. Un simple SMS de rappel a tout changé.",
      en: "We were losing nearly half a million dirhams a year on empty chairs. A simple reminder SMS changed everything.",
      ar: "كنّا كنخسرو تقريبا نص مليون درهم فالعام على كراسي خاوية. SMS بسيط ديال التذكير بدّل كلشي.",
    },
  },
  {
    slug: "commerce-whatsapp-tanger",
    sector: "retail",
    client: {
      name: "Youssef",
      role: { fr: "Gérant de boutique", en: "Shop manager", ar: "مسيّر محل" },
      city: "Tanger",
    },
    title: {
      fr: "Comment une boutique à Tanger a augmenté ses ventes de 35% en automatisant WhatsApp",
      en: "How a Tangier shop increased sales by 35% by automating WhatsApp",
      ar: "كيفاش محل فطنجة زاد 35% فالمبيعات بأتمتة واتساب",
    },
    description: {
      fr: "Un commerce qui perdait 60% de ses prospects WhatsApp. L'automatisation a transformé chaque message en vente potentielle.",
      en: "A shop losing 60% of its WhatsApp prospects. Automation turned every message into a potential sale.",
      ar: "محل كان كيخسر 60% ديال العملاء المحتملين على واتساب. الأتمتة حوّلات كل رسالة لفرصة بيع.",
    },
    problem: {
      fr: "Youssef gère une boutique de prêt-à-porter à Tanger. Depuis qu'il a mis son catalogue sur WhatsApp, il reçoit 50+ messages par jour. Le problème : il ne peut pas répondre à tous. Entre les clients en magasin, les commandes à préparer et les messages qui s'accumulent, il estime perdre 40-60% de ses prospects. Les clients écrivent, attendent, et finissent par aller ailleurs.",
      en: "Youssef runs a clothing shop in Tangier. Since he put his catalog on WhatsApp, he gets 50+ messages a day. The problem: he can't respond to all of them. Between in-store customers, orders to prepare, and messages piling up, he estimates losing 40-60% of his prospects. Customers write, wait, and end up going elsewhere.",
      ar: "يوسف كيدير محل ديال الملابس فطنجة. من بعد ما حط الكاتالوغ ديالو على واتساب، كيوصلو 50+ رسالة فاليوم. المشكل: ما يقدرش يجاوب على كلشي. بين العملاء فالمحل، الطلبات اللي خاص يجهزهم، والرسائل اللي كتكمل تتراكم، كيحسب أنه كيخسر 40-60% ديال العملاء المحتملين. الناس كتكتب، كتسنّا، وكتمشي لعند شي حد آخر.",
    },
    solution: {
      fr: [
        "WhatsApp Business API avec réponses automatiques intelligentes",
        "Catalogue digital avec prix et disponibilité en temps réel",
        "Système de labels pour qualifier les prospects (nouveau, en attente, VIP)",
        "Relances automatiques pour les paniers abandonnés",
        "Tableau de bord centralisé pour suivre toutes les conversations",
      ],
      en: [
        "WhatsApp Business API with smart automated responses",
        "Digital catalog with real-time pricing and availability",
        "Label system to qualify prospects (new, pending, VIP)",
        "Automated follow-ups for abandoned carts",
        "Centralized dashboard to track all conversations",
      ],
      ar: [
        "واتساب بيزنس API مع ردود أوتوماتيكية ذكية",
        "كاتالوغ رقمي مع أسعار وتوفر فالوقت الحقيقي",
        "نظام تصنيف باش تأهل العملاء المحتملين (جديد، في الانتظار، VIP)",
        "متابعات أوتوماتيكية للسلات المتروكة",
        "لوحة تحكم مركزية باش تتبع كل المحادثات",
      ],
    },
    results: [
      { value: "+35%", label: { fr: "de ventes", en: "in sales", ar: "فالمبيعات" } },
      { value: "100%", label: { fr: "des messages traités automatiquement", en: "of messages handled automatically", ar: "ديال الرسائل متعاملة آليا" } },
      { value: "<2min", label: { fr: "temps de réponse moyen", en: "average response time", ar: "متوسط وقت الاستجابة" } },
      { value: "3×", label: { fr: "plus de clients récurrents", en: "more returning customers", ar: "عملاء متكررين أكثر" } },
    ],
    timeline: { fr: "10 jours", en: "10 days", ar: "10 أيام" },
    quote: {
      fr: "Avant, je ratais la moitié de mes messages. Maintenant, chaque client reçoit une réponse en moins de 2 minutes, même quand je suis avec quelqu'un en magasin.",
      en: "Before, I was missing half my messages. Now every customer gets a response in under 2 minutes, even when I'm with someone in the store.",
      ar: "قبل، كنفوّت نص الرسائل ديالي. دابا كل عميل كيتجاوب في أقل من دقيقتين، حتى ملي كنكون مع شي حد فالمحل.",
    },
  },
  {
    slug: "cooperative-paiements-essaouira",
    sector: "agriculture",
    client: {
      name: "Fatima",
      role: { fr: "Présidente de coopérative d'argan", en: "Argan cooperative president", ar: "رئيسة تعاونية الأركان" },
      city: "Essaouira",
    },
    title: {
      fr: "Comment une coopérative à Essaouira a réduit ses litiges de paiement de 60%",
      en: "How an Essaouira cooperative reduced payment disputes by 60%",
      ar: "كيفاش تعاونية فالصويرة خفّضات نزاعات الدفع بـ 60%",
    },
    description: {
      fr: "47 membres, un carnet papier et des conflits chaque saison. Le digital a restauré la confiance.",
      en: "47 members, a paper notebook, and conflicts every season. Digital tools restored trust.",
      ar: "47 عضو، كارني ديال الورق ونزاعات كل موسم. الرقمنة رجّعات الثقة.",
    },
    problem: {
      fr: "Fatima préside une coopérative d'argan de 47 membres près d'Essaouira. Tous les paiements étaient notés dans un carnet — certaines pages arrachées, des montants barrés et réécrits. Chaque saison, elle passait 2 semaines à résoudre des litiges de paiement. Chaque membre pensait qu'on lui devait plus. La confiance s'érodait, et des membres commençaient à quitter la coopérative. En parallèle, un audit ONSSA a failli leur coûter leur certification d'export parce que la traçabilité des traitements n'était pas documentée.",
      en: "Fatima leads a 47-member argan cooperative near Essaouira. All payments were tracked in a notebook — some pages torn, amounts crossed out and rewritten. Every season, she spent 2 weeks resolving payment disputes. Every member thought they were owed more. Trust was eroding, and members were starting to leave. Meanwhile, an ONSSA audit nearly cost them their export certification because treatment traceability wasn't documented.",
      ar: "فاطمة رئيسة تعاونية الأركان فيها 47 عضو قريب من الصويرة. كل المدفوعات كانو مكتوبين فكارني — شي صفحات مقطوعين، مبالغ مشطوبة ومعاودين الكتابة. كل موسم، كانت كتقضي أسبوعين كتحل نزاعات الدفع. كل عضو كيحسب أنهم خاصهم يعطيوه أكثر. الثقة كانت كتنقص، وأعضاء بداو كيخرجو من التعاونية. فنفس الوقت، تفتيش ONSSA كان غادي يكلّفهم شهادة التصدير حيت تتبع المعالجات ما كانش موثق.",
    },
    solution: {
      fr: [
        "Système de gestion coopérative avec relevé de compte par SMS pour chaque membre",
        "Suivi digital des parcelles et traitements (fonctionne hors ligne)",
        "Traçabilité automatisée pour la conformité ONSSA et GlobalGAP",
        "Répartition automatique des revenus basée sur les pesées enregistrées",
        "Rapports annuels conformes ODCO générés automatiquement",
      ],
      en: [
        "Cooperative management system with SMS account statements for each member",
        "Digital field and treatment tracking (works offline)",
        "Automated traceability for ONSSA and GlobalGAP compliance",
        "Automatic revenue distribution based on recorded weights",
        "ODCO-compliant annual reports generated automatically",
      ],
      ar: [
        "نظام تسيير التعاونية مع كشف حساب عبر SMS لكل عضو",
        "تتبع رقمي ديال القطع والمعالجات (كيخدم بلا إنترنت)",
        "تتبع أوتوماتيكي للامتثال ديال ONSSA و GlobalGAP",
        "توزيع أوتوماتيكي ديال المداخيل على حساب الأوزان المسجلة",
        "تقارير سنوية متوافقة مع ODCO كتتولّد أوتوماتيك",
      ],
    },
    results: [
      { value: "−60%", label: { fr: "de litiges de paiement", en: "payment disputes", ar: "نزاعات الدفع" } },
      { value: "0", label: { fr: "rejet export depuis la mise en place", en: "export rejections since launch", ar: "رفض تصدير من الإطلاق" } },
      { value: "4h", label: { fr: "gagnées par semaine sur la paperasse", en: "saved per week on paperwork", ar: "مربوحين فالسيمانة على الورق" } },
      { value: "100%", label: { fr: "des membres avec relevé digital", en: "of members with digital statements", ar: "ديال الأعضاء عندهم كشف رقمي" } },
    ],
    timeline: { fr: "3 semaines", en: "3 weeks", ar: "3 أسابيع" },
    quote: {
      fr: "Avant Tadnun, je perdais 2 semaines chaque saison à résoudre des litiges de paiement avec les membres. Maintenant, chacun voit son relevé sur son téléphone.",
      en: "Before Tadnun, I spent 2 weeks every season resolving payment disputes with members. Now everyone can see their statement on their phone.",
      ar: "قبل تدنون، كنت كنضيّع أسبوعين كل موسم باش نحل مشاكل الخلاص مع الأعضاء. دابا كل واحد كيشوف كشف حسابو فالتيليفون.",
    },
  },
  {
    slug: "immobilier-leads-casablanca",
    sector: "realestate",
    client: {
      name: "Omar",
      role: { fr: "Agent immobilier", en: "Real estate agent", ar: "وكيل عقاري" },
      city: "Casablanca",
    },
    title: {
      fr: "Comment un agent immobilier à Casablanca a triplé son taux de conversion",
      en: "How a Casablanca real estate agent tripled his conversion rate",
      ar: "كيفاش وكيل عقاري فالدار البيضاء ضرب معدل التحويل ديالو ب 3",
    },
    description: {
      fr: "Un agent qui perdait 60% de ses leads faute de suivi. La centralisation et l'automatisation ont tout changé.",
      en: "An agent losing 60% of leads due to no follow-up. Centralization and automation changed everything.",
      ar: "وكيل كان كيخسر 60% ديال العملاء المحتملين بسبب عدم المتابعة. التمركز والأتمتة بدّلو كلشي.",
    },
    problem: {
      fr: "Omar est agent immobilier indépendant à Casablanca. Il publie des annonces sur Avito, Mubawab, Facebook, et reçoit des demandes par WhatsApp. Plus de 30 messages par jour. Mais avec un seul téléphone pour tout gérer, il n'en traitait que la moitié. Les 15 autres ? Le temps qu'il réponde (souvent 48h plus tard), le prospect avait déjà signé ailleurs. Dans l'immobilier marocain, le premier qui répond gagne le deal.",
      en: "Omar is an independent real estate agent in Casablanca. He posts listings on Avito, Mubawab, Facebook, and gets inquiries via WhatsApp. Over 30 messages a day. But with one phone to manage everything, he only handled half. The other 15? By the time he responded (often 48h later), the prospect had already signed elsewhere. In Moroccan real estate, the first to respond wins the deal.",
      ar: "عمر وكيل عقاري مستقل فالدار البيضاء. كينشر إعلانات على Avito وMubawab وFacebook، وكيوصلو طلبات عبر واتساب. أكثر من 30 رسالة فاليوم. ولكن بتيليفون واحد باش يدير كلشي، كان كيتعامل غير مع النص. الـ 15 الأخرين؟ الوقت اللي كيجاوب (غالبا 48 ساعة بعد)، العميل المحتمل كيكون سينيا مع شي حد آخر. فالعقار المغربي، اللول اللي كيجاوب هو اللي كيربح الديل.",
    },
    solution: {
      fr: [
        "Tableau de bord centralisant TOUS les canaux (Avito, Mubawab, WhatsApp, Facebook)",
        "Réponse automatique instantanée avec les informations du bien",
        "Scoring des prospects (sérieux vs curieux) pour prioriser le suivi",
        "Relances automatiques à J+1 et J+3 pour les prospects non convertis",
        "CRM immobilier avec historique de chaque prospect",
      ],
      en: [
        "Dashboard centralizing ALL channels (Avito, Mubawab, WhatsApp, Facebook)",
        "Instant automated response with property details",
        "Prospect scoring (serious vs curious) to prioritize follow-up",
        "Automated follow-ups at D+1 and D+3 for unconverted prospects",
        "Real estate CRM with full prospect history",
      ],
      ar: [
        "لوحة تحكم كتجمع كل القنوات (Avito، Mubawab، واتساب، فيسبوك)",
        "رد أوتوماتيكي فوري مع معلومات العقار",
        "تنقيط العملاء المحتملين (جديين vs فضوليين) باش تحدد الأولويات",
        "متابعات أوتوماتيكية فـ J+1 و J+3 للعملاء اللي ما تحولوش",
        "CRM عقاري مع تاريخ كامل ديال كل عميل محتمل",
      ],
    },
    results: [
      { value: "3×", label: { fr: "taux de conversion", en: "conversion rate", ar: "معدل التحويل" } },
      { value: "<5min", label: { fr: "temps de réponse (vs 48h avant)", en: "response time (vs 48h before)", ar: "وقت الاستجابة (مقابل 48 ساعة قبل)" } },
      { value: "0", label: { fr: "prospect oublié", en: "forgotten prospects", ar: "عميل محتمل منسي" } },
      { value: "+40%", label: { fr: "de rendez-vous terrain pris", en: "more site visits booked", ar: "زيادة فالمواعيد الميدانية" } },
    ],
    timeline: { fr: "2 semaines", en: "2 weeks", ar: "أسبوعين" },
    quote: {
      fr: "Le premier qui répond gagne. Avant, je mettais 48 heures. Maintenant, chaque prospect reçoit une réponse en moins de 5 minutes.",
      en: "The first to respond wins. Before, I took 48 hours. Now every prospect gets a response in under 5 minutes.",
      ar: "اللول اللي كيجاوب هو اللي كيربح. قبل، كنت كناخد 48 ساعة. دابا كل عميل محتمل كيتجاوب في أقل من 5 دقائق.",
    },
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((cs) => cs.slug === slug);
}

export function getCaseStudySlugs(): string[] {
  return caseStudies.map((cs) => cs.slug);
}
