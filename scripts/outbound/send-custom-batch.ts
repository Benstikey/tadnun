import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";
import { ENV } from "./config";

const sb = createClient(ENV.SUPABASE_URL, ENV.SUPABASE_SERVICE_KEY);
const resend = new Resend(ENV.RESEND_API_KEY);
const fullKey = process.env.RESEND_FULL_ACCESS_KEY ?? "";

function wrap(content: string): string {
  return `<!DOCTYPE html><html lang="fr"><head><meta charset="utf-8"></head><body style="font-family: sans-serif; color: #1a1a1a; line-height: 1.6; font-size: 14px;">${content}</body></html>`;
}

const leads = [
  {
    id: 1498,
    sector: "events",
    email: "contact@diamant-traiteur.com",
    subject: "coordination événements",
    body: wrap(`<p>Bonjour,</p><p>Vous gérez des mariages, séminaires, galas — chacun avec son équipe, son planning, ses ajustements de dernière minute. La plupart des traiteurs à Casablanca coordonnent tout ça sur WhatsApp et Excel.</p><p>On développe des outils sur mesure pour traiteurs : planning par événement, gestion des équipes, devis et facturation en ligne. Un seul endroit pour tout suivre.</p><p>15 minutes pour voir si ça peut vous aider ?</p><p>Wassim — Tadnun</p>`),
  },
  {
    id: 1492,
    sector: "events",
    email: "maitre-traiteur@maisonouazzani.com",
    subject: "événements d'entreprise",
    body: wrap(`<p>Bonjour,</p><p>Pour un traiteur qui sert autant les mariages privés que les événements d'entreprise, la coordination doit être un casse-tête — chaque client a ses attentes, ses validations, ses échéances.</p><p>On développe des outils de gestion client sur mesure pour des maisons de traiteur au Maroc : portail client pour validations en ligne, planning centralisé, suivi des prestations.</p><p>Ça pourrait vous intéresser ?</p><p>Wassim — Tadnun</p>`),
  },
  {
    id: 1582,
    sector: "photography",
    email: "contact@photographemaroc.com",
    subject: "livraison photos",
    body: wrap(`<p>Bonjour,</p><p>Vous faites de la photo événementielle + architecture + vidéo + drone. Donc beaucoup de livrables, beaucoup de clients, beaucoup de galeries à partager.</p><p>Comment vous livrez les photos aujourd'hui ? WeTransfer, Google Drive ? La plupart des photographes pros au Maroc perdent un temps fou là-dessus.</p><p>On développe des portails client sur mesure : le client voit ses photos, télécharge, valide, paie. Plus pro, plus rapide.</p><p>Ça vous parle ?</p><p>Wassim — Tadnun</p>`),
  },
  {
    id: 1590,
    sector: "photography",
    email: "contact@photographe-casablanca.com",
    subject: "devis corporate",
    body: wrap(`<p>Bonjour,</p><p>Vous travaillez beaucoup avec des entreprises (conférences, séminaires, corporate, immobilier). Chaque client demande un devis personnalisé — et j'imagine que ça prend du temps.</p><p>On développe des outils sur mesure pour des photographes pros au Maroc : devis instantané en ligne, planning, CRM client, suivi des projets récurrents.</p><p>Intéressé d'en discuter ?</p><p>Wassim — Tadnun</p>`),
  },
  {
    id: 1606,
    sector: "printing",
    email: "Imprimeriemoderne@outlook.fr",
    subject: "commandes rentrée scolaire",
    body: wrap(`<p>Bonjour,</p><p>Vous faites beaucoup de cahiers scolaires et fournitures — donc à la rentrée, vos commandes explosent et doivent toutes être traitées rapidement.</p><p>Comment vous gérez les commandes grosses quantités aujourd'hui ? Si c'est téléphone + Excel, vous perdez probablement des commandes pendant le rush.</p><p>On développe des plateformes de commande B2B sur mesure : les écoles commandent en ligne, vous suivez tout sur un écran, pas d'erreurs.</p><p>Ça mérite 15 min ?</p><p>Wassim — Tadnun</p>`),
  },
  {
    id: 1602,
    sector: "printing",
    email: "grpandalous@gmail.com",
    subject: "devis en ligne",
    body: wrap(`<p>Bonjour,</p><p>Vous proposez beaucoup de produits — cartes visites, flyers, packaging, habillage véhicule. Chaque demande client = un devis à faire à la main, j'imagine.</p><p>On développe des configurateurs de devis en ligne pour des imprimeries : le client choisit, voit le prix instantanément, commande. Zéro aller-retour, plus de ventes.</p><p>Ça vous parle ?</p><p>Wassim — Tadnun</p>`),
  },
  {
    id: 1563,
    sector: "veterinary",
    email: "hello@veterinairecasablanca.ma",
    subject: "rappels vaccins",
    body: wrap(`<p>Bonjour,</p><p>Vous faites des urgences 24/7 — mais la vraie fidélisation d'une clinique vétérinaire, c'est les rappels de vaccins et check-ups annuels. Beaucoup de cliniques perdent des clients juste parce qu'ils oublient de les relancer.</p><p>On développe des outils sur mesure : dossier patient digital, rappels automatiques par SMS, prise de RDV en ligne. Adapté aux cliniques marocaines.</p><p>Ça vous intéresse ?</p><p>Wassim — Tadnun</p>`),
  },
  {
    id: 1540,
    sector: "carrental",
    email: "support@loxa-drive.com",
    subject: "gestion multi-agences",
    body: wrap(`<p>Bonjour,</p><p>Vous avez des agences à Marrakech, Casablanca et Tanger. Donc une flotte répartie, des réservations dans les 3 villes, des transferts à coordonner. Sans outil central, c'est vite le chaos.</p><p>On développe des plateformes de gestion flotte sur mesure : vue centralisée des véhicules, disponibilités temps réel, transferts inter-agences, réservations automatiques.</p><p>Ça mérite une discussion ?</p><p>Wassim — Tadnun</p>`),
  },
  {
    id: 1518,
    sector: "carrental",
    email: "book@maroccarrental.com",
    subject: "taux de conversion",
    body: wrap(`<p>Bonjour,</p><p>Vous affichez des prix dès 150 MAD/jour — un argument fort pour attirer des clients. Mais le vrai enjeu, c'est de convertir les visiteurs du site en réservations réelles.</p><p>On a aidé des agences de location au Maroc à passer d'un site vitrine à une vraie plateforme de réservation : paiement en ligne CMI, confirmations auto, livraison planifiée. Résultat : 2-3x plus de réservations directes.</p><p>Intéressé ?</p><p>Wassim — Tadnun</p>`),
  },
  {
    id: 1427,
    sector: "beauty",
    email: "contact@thepremiumbarbershop.ma",
    subject: "clients récurrents",
    body: wrap(`<p>Bonjour,</p><p>Un barbershop haut de gamme, ça vit des clients récurrents — ceux qui reviennent toutes les 3 semaines. Comment vous les rappelez aujourd'hui ? Si c'est pas automatisé, vous en perdez beaucoup.</p><p>On développe des outils sur mesure : carte fidélité digitale, rappels automatiques SMS, réservation en ligne, historique client. Adapté aux salons premium au Maroc.</p><p>Ça vous parle ?</p><p>Wassim — Tadnun</p>`),
  },
  {
    id: 1431,
    sector: "beauty",
    email: "contact@beautymirror.ma",
    subject: "planning coiffure + spa",
    body: wrap(`<p>Bonjour,</p><p>Vous proposez coiffure + esthétique + hammam + spa — donc des plannings qui se chevauchent, plusieurs équipes, des clientes qui réservent plusieurs soins en une visite.</p><p>Comment vous gérez ce puzzle aujourd'hui ? Cahier papier ou WhatsApp, j'imagine.</p><p>On développe des outils de planning sur mesure pour des centres multi-services au Maroc : réservation en ligne multi-soins, gestion équipes, rappels auto.</p><p>15 minutes pour en parler ?</p><p>Wassim — Tadnun</p>`),
  },
  {
    id: 691,
    sector: "restaurants",
    email: "ytohotel@hotmail.com",
    subject: "clients hôtel + restaurant",
    body: wrap(`<p>Bonjour,</p><p>Vous avez un hôtel boutique avec un restaurant — deux business liés mais souvent gérés séparément. Les clients qui réservent une chambre devraient être vos meilleurs clients du resto. Encore faut-il leur parler.</p><p>On développe des outils sur mesure : CRM client hôtel/resto unifié, campagnes automatiques (apéro de bienvenue, petit déj, dîner), programme fidélité.</p><p>Ça vous intéresse ?</p><p>Wassim — Tadnun</p>`),
  },
  {
    id: 644,
    sector: "restaurants",
    email: "event@anatolia.ma",
    subject: "réservations et fidélité",
    body: wrap(`<p>Bonjour,</p><p>Un steakhouse premium, ça se distingue par l'expérience — et ça commence avant même que le client arrive : réservation fluide, préférences mémorisées, suivi personnalisé.</p><p>On développe des outils sur mesure pour des restaurants haut de gamme au Maroc : réservation en ligne, historique client (préférences, allergies, occasions spéciales), programme fidélité.</p><p>Ça pourrait vous parler ?</p><p>Wassim — Tadnun</p>`),
  },
];

async function main() {
  let sent = 0;
  let failed = 0;
  const sentItems: { resendId: string; prospectId: number; email: string }[] = [];

  for (const lead of leads) {
    await sb.from("prospects").update({ email: lead.email, status: "enrolled" }).eq("id", lead.id);

    const { data: seqData } = await sb
      .from("sequence_emails")
      .insert({
        prospect_id: lead.id,
        step: 1,
        template_key: `custom_${lead.sector}`,
        subject: lead.subject,
        body_html: lead.body,
        status: "scheduled",
        scheduled_for: new Date().toISOString(),
      })
      .select()
      .single();

    const result = await resend.emails.send({
      from: `${ENV.SENDER_NAME} <${ENV.SENDER_EMAIL}>`,
      to: [lead.email],
      replyTo: ENV.REPLY_TO_EMAIL,
      subject: lead.subject,
      html: lead.body,
    });

    if (result.error) {
      console.log("FAILED:", lead.email, "-", result.error.message);
      if (seqData?.id) await sb.from("sequence_emails").update({ status: "failed" }).eq("id", seqData.id);
      failed++;
    } else {
      const resendId = result.data!.id;
      if (seqData?.id) {
        await sb
          .from("sequence_emails")
          .update({ status: "sent", sent_at: new Date().toISOString(), resend_id: resendId })
          .eq("id", seqData.id);
      }
      console.log(`${sent + 1}. ${lead.email} - ${lead.subject} (${lead.sector})`);
      sentItems.push({ resendId, prospectId: lead.id, email: lead.email });
      sent++;
    }

    await new Promise((r) => setTimeout(r, 3000));
  }

  console.log(`\nSent: ${sent} | Failed: ${failed}`);

  if (fullKey && sentItems.length > 0) {
    console.log("\nWaiting 20s for bounce check...");
    await new Promise((r) => setTimeout(r, 20000));

    let bounced = 0;
    for (const s of sentItems) {
      const res = await fetch(`https://api.resend.com/emails/${s.resendId}`, {
        headers: { Authorization: `Bearer ${fullKey}` },
      });
      if (res.ok) {
        const data = (await res.json()) as { last_event?: string };
        if (data.last_event === "bounced") {
          console.log("BOUNCED:", s.email);
          await sb.from("prospects").update({ email: null, status: "scored" }).eq("id", s.prospectId);
          await sb.from("sequence_emails").update({ status: "cancelled" }).eq("prospect_id", s.prospectId).in("status", ["pending", "scheduled"]);
          bounced++;
        } else {
          console.log("OK:", s.email, "-", data.last_event);
        }
      }
    }
    if (bounced > 0) console.log(`\nCleaned ${bounced} bounced prospects`);
    else console.log("\nNo bounces!");
  }
}

main().catch(console.error);