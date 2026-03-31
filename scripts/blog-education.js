const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://txkcboapwcqzxezauplq.supabase.co',
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function main() {
  const articles = [
    // ─────────────────────────────────────────────────────────────────────────
    // FRENCH VERSION
    // ─────────────────────────────────────────────────────────────────────────
    {
      slug: 'gestion-ecole-privee-maroc-digital',
      locale: 'fr',
      title: 'Gestion école privée au Maroc : comment le digital change vraiment les choses',
      description:
        'Retards de paiement, groupes WhatsApp qui débordent, dossiers papier empilés… Voici comment les écoles privées et centres de formation marocains passent au digital — sans se compliquer la vie.',
      sector: 'education',
      content: `# Gestion école privée au Maroc : comment le digital change vraiment les choses

Si vous dirigez une école privée ou un centre de formation à Casablanca, Marrakech, Fès ou ailleurs au Maroc, vous reconnaissez probablement ce tableau : un groupe WhatsApp de 150 parents qui explose chaque matin, des relances de paiement envoyées à la main, des dossiers d'inscription remplis en papier rangés dans un classeur, et des bulletins de notes qu'un secrétaire tape pendant des heures en fin de trimestre.

Ce n'est pas un problème de taille ou de budget. C'est un problème d'organisation — et c'est exactement là que le digital peut faire la différence, concrètement.

---

## Le groupe WhatsApp : utile mais incontrôlable

Soyons honnêtes : le groupe WhatsApp parents-école a été une vraie avancée. Plus besoin d'envoyer des circulaires papier, les messages arrivent instantanément, tout le monde est connecté.

Mais au bout de quelques semaines, la réalité s'impose. Un parent partage une vidéo non liée. Un autre pose une question privée devant tout le monde. Les annonces importantes se noient dans 200 messages. Un enseignant est ajouté par erreur. Et vous, en tant que directeur, vous passez votre soirée à modérer au lieu de vous reposer.

Ce n'est pas que WhatsApp soit mauvais — c'est qu'il n'a pas été conçu pour gérer la communication entre une école et ses familles.

Un portail parents dédié change complètement la dynamique. Les annonces générales arrivent comme des notifications propres. Les parents peuvent consulter les absences, les notes, les devoirs de leur enfant à tout moment, sans avoir à demander dans un groupe. Les messages privés restent privés. Et vous gardez le contrôle sur ce qui est visible et quand.

Résultat observé dans des établissements qui ont fait la transition : une réduction de plus de 80 % des messages entrants non pertinents, et des parents qui se sentent mieux informés qu'avant.

---

## Les retards de paiement : un problème qui se règle avant d'arriver

La gestion des frais de scolarité est souvent la partie la plus stressante de l'administration scolaire. Vous devez relancer les familles, parfois plusieurs fois, avec toute la diplomatie que ça demande. Certaines familles oublient genuinement, d'autres procrastinent, d'autres encore rencontrent des difficultés passagères.

Le problème, c'est que sans système, tout repose sur vous ou votre secrétaire.

Avec un système de rappels automatiques et de paiement en ligne — via CMI, la plateforme de paiement la plus utilisée au Maroc — la dynamique change. Un rappel est envoyé 5 jours avant l'échéance, puis le jour J, puis 3 jours après si le paiement n'est pas encore effectué. Tout automatiquement, sur WhatsApp ou par SMS, dans la langue préférée de la famille.

Les établissements qui ont mis en place ce type de système observent en moyenne une réduction de 70 % des retards de paiement. Pas parce que les familles ont plus d'argent, mais parce qu'elles sont rappelées au bon moment, de la bonne façon.

Autre avantage : un historique de paiement complet et accessible en temps réel. Plus besoin de feuilles Excel que personne ne comprend sauf vous.

---

## L'inscription : le premier contact avec votre établissement

L'inscription en papier, c'est un moment de friction pour la famille et une source de saisie manuelle pour vous. Un dossier incomplet qui revient trois fois, des photocopies floues, des informations à retranscrire manuellement dans un tableau — tout ça ralentit votre rentrée et crée une première impression peu professionnelle.

Un formulaire d'inscription en ligne change ce premier contact. La famille remplit le dossier depuis chez elle, à Kénitra ou à Tanger, à l'heure qui lui convient. Elle joint directement les pièces justificatives. Vous recevez un dossier complet, déjà structuré.

Et quand une pièce manque, une notification automatique le signale — sans que vous ayez à appeler.

Au-delà du confort, ça vous donne aussi des données : combien de familles ont commencé un dossier sans le terminer ? À quelle étape abandonnent-elles ? Ces informations vous permettent d'améliorer votre processus chaque année.

---

## Les bulletins de notes : 3 jours de travail réduits à quelques heures

En fin de trimestre, la production des bulletins est une opération lourde. Les professeurs transmettent leurs notes par email ou sur papier, une secrétaire les compile dans Word ou Excel, quelqu'un vérifie, on imprime, on signe, on distribue.

Dans un système digitalisé, les enseignants saisissent leurs notes directement dans une interface simple — depuis leur téléphone si nécessaire. Le bulletin est généré automatiquement, avec le nom de l'élève, les matières, les moyennes, les appréciations. Vous validez en un clic. Les parents reçoivent une notification.

Ce qui prenait 3 à 5 jours de travail intensif prend maintenant quelques heures. Et surtout, il n'y a plus d'erreurs de saisie — chaque note vient directement de l'enseignant qui l'a attribuée.

---

## Par où commencer ?

La tentation est de vouloir tout faire en même temps. C'est rarement la bonne approche.

La plupart des établissements qui réussissent leur transition digitale commencent par un seul problème — souvent le paiement ou la communication parents — et construisent à partir de là. Une fois que les équipes sont à l'aise et que les parents font confiance au nouveau canal, on ajoute une brique.

Ce qui compte, c'est que le système soit pensé pour votre établissement, pas l'inverse. Un centre de formation professionnelle à Agadir n'a pas les mêmes besoins qu'un groupe scolaire privé à Rabat.

---

## La question du coût

Une idée reçue fréquente : "le digital, c'est cher". En réalité, le vrai coût est souvent celui du statu quo — les heures passées à relancer des paiements, à modérer des groupes WhatsApp, à ressaisir des données. Ces heures ont une valeur.

Un système bien conçu se rentabilise généralement en moins d'un an scolaire, uniquement sur la réduction des retards de paiement et du temps administratif.

---

Si vous réfléchissez à moderniser la gestion de votre école ou centre de formation, [Tadnun](https://tadnun.com/contact) travaille avec des établissements marocains pour construire exactement ce type de solution — adaptée à votre contexte, à votre taille, et à vos équipes.

Pas de démonstration commerciale, juste un échange pour comprendre votre situation.
`,
      status: 'published',
      published_at: new Date().toISOString(),
    },

    // ─────────────────────────────────────────────────────────────────────────
    // ENGLISH VERSION
    // ─────────────────────────────────────────────────────────────────────────
    {
      slug: 'private-school-management-morocco-en',
      locale: 'en',
      title: 'Private school management in Morocco: what going digital actually looks like',
      description:
        'Late payments, overflowing WhatsApp groups, paper enrollment files, manual grade reports — here is how Moroccan private schools and training centers are solving these problems one step at a time.',
      sector: 'education',
      content: `# Private school management in Morocco: what going digital actually looks like

If you run a private school or training center in Casablanca, Rabat, Marrakech, or anywhere else in Morocco, the following probably sounds familiar: a WhatsApp group with 150 parents that generates dozens of messages before 8am, tuition reminders you send by hand, paper enrollment files stacked in a cabinet, and grade reports that your secretary types out for days at the end of every term.

This is not a size problem or a budget problem. It is an organization problem — and that is exactly where the right digital tools make a real, measurable difference.

---

## The WhatsApp group problem

WhatsApp was genuinely useful when schools first adopted it for parent communication. No more paper circulars, instant delivery, everyone connected. It felt like progress.

But a few months in, the cracks show. A parent shares an unrelated video. Someone asks a private question in front of 149 other families. Important announcements get buried under 200 messages. A teacher gets added by mistake. And you, as the school director, spend your evenings moderating instead of managing.

WhatsApp is not a bad tool — it was just never designed for school-to-family communication at scale.

A dedicated parent portal changes the dynamic entirely. General announcements arrive as clean notifications. Parents can check their child's attendance, grades, and homework any time without asking in a group. Private conversations stay private. You control what is visible and when.

Schools that have made this switch consistently report an over-80% reduction in off-topic incoming messages — and parents who feel more informed than before.

---

## Late payments: solving the problem before it happens

Tuition management is often the most stressful part of running a private school. Chasing families for payment requires diplomacy, persistence, and time — none of which you have in abundance. Some families genuinely forget. Others procrastinate. Some face temporary financial difficulty.

Without a system, all of that falls on you or your secretary.

With automated payment reminders and online payment — integrated with CMI, Morocco's most widely used payment gateway — the dynamic shifts. A reminder goes out five days before the due date, again on the day, and again three days after if payment has not come through. Automatically, via WhatsApp or SMS, in the family's preferred language (Arabic, Darija, or French).

Schools using this kind of setup report an average 70% reduction in late payments. Not because families suddenly have more money, but because they are reminded at the right moment, in the right way.

You also get a real-time payment dashboard. No more Excel files that only one person understands.

---

## Enrollment: your school's first impression

Paper enrollment creates friction for families and manual data entry for your team. An incomplete file that comes back three times, blurry photocopies, information that needs to be retyped into a spreadsheet — all of this slows down your school year start and creates a poor first impression.

An online enrollment form changes that first interaction. Families complete the form from home — in Kenitra, Tangier, or anywhere else — at their own pace. They upload supporting documents directly. You receive a complete, structured file.

When something is missing, an automatic notification flags it — without anyone having to make a phone call.

Beyond the convenience, you gain data: how many families started an enrollment but did not finish? At what step do they drop off? That information lets you improve your process every year.

---

## Grade reports: three days of work reduced to a few hours

End-of-term grade reporting is a heavy operation. Teachers send grades by email or on paper. A secretary compiles everything in Word or Excel. Someone checks it. You print, sign, and distribute.

In a digital system, teachers enter grades directly into a simple interface — from their phone if needed. The report card is generated automatically with the student's name, subjects, averages, and teacher comments. You approve with one click. Parents receive a notification.

What used to take three to five days of intensive work now takes a few hours. And there are no transcription errors, because every grade comes directly from the teacher who assigned it.

---

## Where to start

The temptation is to digitize everything at once. That rarely works.

Most schools that succeed in this transition start with one problem — usually payments or parent communication — and build from there. Once the team is comfortable and parents trust the new channel, you add the next piece.

What matters most is that the system fits your school, not the other way around. A vocational training center in Agadir has different needs from a multi-campus private school group in Rabat.

---

## The cost question

A common assumption: "going digital is expensive." In reality, the real cost is usually the status quo — hours spent chasing payments, moderating WhatsApp groups, re-entering data. Those hours have a value.

A well-designed system typically pays for itself within one school year, based on late payment reduction and administrative time savings alone.

---

If you are thinking about modernizing how your school or training center runs, [Tadnun](https://tadnun.com/contact) works with Moroccan institutions to build exactly this kind of solution — tailored to your context, your size, and your team.

No sales pitch, just a conversation to understand your situation.
`,
      status: 'published',
      published_at: new Date().toISOString(),
    },

    // ─────────────────────────────────────────────────────────────────────────
    // ARABIC (DARIJA-INFORMED MSA) VERSION
    // ─────────────────────────────────────────────────────────────────────────
    {
      slug: 'gestion-ecole-privee-maroc-ar',
      locale: 'ar',
      title: 'تدبير المدرسة الخاصة بالمغرب: كيف يغيّر الرقمي الأمور فعلاً',
      description:
        'تأخر الأداءات، فوضى مجموعات واتساب، ملفات التسجيل الورقية، كشوف النقط اليدوية — إليك كيف تحل المدارس الخاصة ومراكز التكوين المغربية هذه المشكلات خطوة بخطوة.',
      sector: 'education',
      content: `# تدبير المدرسة الخاصة بالمغرب: كيف يغيّر الرقمي الأمور فعلاً

إن كنت تدير مدرسة خاصة أو مركز تكوين في الدار البيضاء أو مراكش أو فاس أو أي مدينة مغربية أخرى، فأنت تعرف جيداً هذا المشهد: مجموعة واتساب تضم 150 ولياً تنفجر بالرسائل قبل الثامنة صباحاً، تذكيرات بالواجبات المالية ترسلها يدوياً، ملفات تسجيل ورقية مكدسة في خزانة، وكشوف نقط يكتبها الكاتب طوال أيام في نهاية كل فصل دراسي.

هذه ليست مشكلة حجم أو ميزانية. إنها مشكلة تنظيم — وهنا بالضبط يمكن للأدوات الرقمية المناسبة أن تُحدث فرقاً حقيقياً وملموساً.

---

## مشكلة مجموعة واتساب

حين بدأت المدارس باعتماد واتساب للتواصل مع أولياء الأمور، كانت خطوة للأمام فعلاً. لا مزيد من المناشير الورقية، والرسائل تصل فوراً، والجميع متواصل.

لكن بعد أسابيع قليلة، تبدأ المشكلات تظهر. ولي أمر يشارك فيديو لا علاقة له بالمدرسة. آخر يطرح سؤالاً شخصياً أمام 149 عائلة. الإعلانات المهمة تضيع وسط مئات الرسائل. معلم يُضاف للمجموعة بالخطأ. وأنت، بوصفك مدير المؤسسة، تقضي أمسياتك في الإشراف على المجموعة عوض الراحة أو التخطيط.

واتساب ليس أداة سيئة — لكنه لم يُصمَّم أصلاً للتواصل المؤسسي بين المدرسة والأسر.

بوابة الأولياء المخصصة تغيّر المعادلة كلياً. الإعلانات العامة تصل كإشعارات منظمة. يمكن للولي الاطلاع على غياب ابنه أو نقطه أو واجباته في أي وقت دون الحاجة للسؤال في المجموعة. الرسائل الخاصة تبقى خاصة. وأنت تتحكم فيما يُعرض ومتى.

المؤسسات التي انتقلت إلى هذا النظام ترصد انخفاضاً يفوق 80% في الرسائل غير الضرورية — مع أولياء يشعرون بأنهم أكثر اطلاعاً من قبل.

---

## تأخر الأداءات: حل المشكلة قبل أن تحدث

تدبير الرسوم الدراسية هو غالباً الجانب الأكثر ضغطاً في الإدارة المدرسية. تتبع المدفوعات وإرسال التذكيرات يستلزمان دبلوماسية ومثابرة ووقتاً — وكلها شحيحة. بعض الأسر تنسى فعلاً، وأخرى تؤجل، وأخرى تمر بضائقة مؤقتة.

دون نظام، كل ذلك يقع على عاتقك أو عاتق كاتب المؤسسة.

مع نظام تذكيرات آلية وأداء إلكتروني — عبر CMI، بوابة الدفع الأكثر استخداماً بالمغرب — يتغير الوضع. تذكير يُرسل قبل خمسة أيام من موعد الاستحقاق، ثم يوم الاستحقاق، ثم بعد ثلاثة أيام إن لم يتم الأداء. كل ذلك تلقائياً، عبر واتساب أو SMS، بلغة الأسرة المفضلة.

المؤسسات التي تعتمد هذا النوع من الأنظمة تُسجّل انخفاضاً بنسبة 70% في الأداءات المتأخرة في المتوسط. ليس لأن الأسر أصبحت تملك مالاً أكثر، بل لأنها تُذكَّر في الوقت المناسب وبالطريقة المناسبة.

كما تحصل على لوحة تتبع مالي في الوقت الحقيقي — لا مزيد من ملفات Excel التي لا يفهمها سواك.

---

## التسجيل: الانطباع الأول عن مؤسستك

التسجيل الورقي يُشكّل عائقاً للأسر ويستلزم إدخالاً يدوياً للبيانات من طرف فريقك. ملف ناقص يعود ثلاث مرات، صور مشوشة، معلومات تحتاج إلى إعادة كتابتها في جدول — كل هذا يُبطئ انطلاقة السنة الدراسية ويترك انطباعاً أولياً غير احترافي.

نموذج التسجيل الإلكتروني يغيّر هذه التجربة الأولى. تملأ الأسرة الملف من بيتها — في القنيطرة أو طنجة أو الرباط — في الوقت الذي يناسبها. وترفق المستندات المطلوبة مباشرة. وتستلم أنت ملفاً كاملاً ومنظماً.

وحين يكون شيء ناقصاً، يُرسَل إشعار تلقائي — دون الحاجة إلى أي مكالمة هاتفية.

إضافة إلى الراحة، تجمع بيانات مفيدة: كم أسرة بدأت ملف تسجيل دون إتمامه؟ في أي خطوة توقفت؟ هذه المعلومات تساعدك على تحسين مسارك كل سنة.

---

## كشوف النقط: ثلاثة أيام عمل تتحول إلى ساعات

إعداد كشوف النقط في نهاية الفصل عملية ثقيلة. الأساتذة يرسلون النقط بالبريد الإلكتروني أو على الورق. الكاتب يجمعها في Word أو Excel. شخص يراجعها. تطبعها وتوقّعها وتوزعها.

في نظام رقمي، يدخل الأستاذ النقط مباشرة في واجهة بسيطة — من هاتفه إن اقتضى الحال. يُولَّد كشف النقط تلقائياً باسم التلميذ والمواد والمعدلات والتعليقات. أنت تصادق عليه بنقرة واحدة. الأسرة تتلقى إشعاراً.

ما كان يستغرق من ثلاثة إلى خمسة أيام من العمل المكثف يستغرق الآن ساعات. ولا أخطاء في النسخ، لأن كل نقطة تأتي مباشرة من الأستاذ الذي منحها.

---

## من أين تبدأ؟

الإغراء الطبيعي هو رقمنة كل شيء دفعة واحدة. لكن هذا نادراً ما ينجح.

معظم المؤسسات التي تنجح في هذا الانتقال تبدأ بمشكلة واحدة — في الغالب الأداءات أو التواصل مع الأولياء — ثم تبني عليها. حين يصبح الفريق مرتاحاً ويثق الأولياء في القناة الجديدة، تُضاف خدمة أخرى.

المهم أن يتكيف النظام مع مؤسستك، لا أن تتكيفي أنت مع النظام. مركز التكوين المهني بأكادير تختلف احتياجاته اختلافاً كبيراً عن مجموعة مدارس خاصة بالرباط.

---

## سؤال التكلفة

افتراض شائع: "الرقمنة مكلفة". في الواقع، التكلفة الحقيقية هي في الغالب تكلفة الوضع القائم — الساعات المقضية في متابعة الأداءات، والإشراف على مجموعات واتساب، وإعادة إدخال البيانات. لهذه الساعات قيمة مالية حقيقية.

نظام مصمم بشكل جيد يُجدي في العادة خلال سنة دراسية واحدة، فقط من خلال تقليص التأخير في الأداءات وتوفير وقت الإدارة.

---

إن كنت تفكر في تحديث طريقة تدبير مدرستك أو مركز تكوينك، فإن [تدنن](https://tadnun.com/contact) يعمل مع مؤسسات مغربية لبناء هذا النوع بالضبط من الحلول — مُكيَّفة مع سياقك وحجمك وفريقك.

لا عرض تجاري، فقط حوار لفهم وضعك.
`,
      status: 'published',
      published_at: new Date().toISOString(),
    },
  ];

  for (const article of articles) {
    const { error } = await supabase
      .from('blog_posts')
      .upsert(article, { onConflict: 'slug' });

    if (error) {
      console.error(`Error inserting ${article.slug}:`, error.message);
    } else {
      console.log(`✓ ${article.slug}`);
    }
  }
}

main();
