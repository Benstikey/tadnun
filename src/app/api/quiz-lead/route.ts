import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

const LEVEL_LABELS: Record<string, string> = {
  critical: "Alerte rouge",
  behind: "En retard",
  progress: "En progrès",
  leader: "Leader digital",
};

const SECTOR_LABELS: Record<string, string> = {
  agriculture: "Agriculture",
  restaurants: "Restauration",
  tourism: "Tourisme & Hôtellerie",
  healthcare: "Santé & Cliniques",
  retail: "Commerce & Retail",
  education: "Éducation & Formation",
  realestate: "Immobilier",
  logistics: "Logistique",
  other: "Autre",
};

export async function POST(req: Request) {
  try {
    const { name, email, sector, score, level } = (await req.json()) as {
      name?: string;
      email?: string;
      sector?: string;
      score?: number;
      level?: string;
    };

    if (!email) return NextResponse.json({ ok: false }, { status: 400 });

    const sectorLabel = SECTOR_LABELS[sector ?? ""] ?? sector ?? "Non précisé";
    const levelLabel = LEVEL_LABELS[level ?? ""] ?? level ?? "—";
    const nameDisplay = name || "Non précisé";

    await resend.emails.send({
      from: "Quiz Tadnun <contact@tadnun.com>",
      to: ["contact@tadnun.com"],
      subject: `Nouveau diagnostic — ${nameDisplay} · ${score}/100`,
      html: `
        <div style="font-family: sans-serif; color: #1a1a1a; max-width: 480px; line-height: 1.6;">
          <h2 style="font-size: 18px; margin-bottom: 16px;">Nouveau diagnostic digital</h2>
          <table style="border-collapse: collapse; width: 100%;">
            <tr><td style="padding: 8px 0; color: #666; width: 120px;">Nom</td><td style="padding: 8px 0; font-weight: 600;">${nameDisplay}</td></tr>
            <tr><td style="padding: 8px 0; color: #666;">Email</td><td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #1a1a1a;">${email}</a></td></tr>
            <tr><td style="padding: 8px 0; color: #666;">Secteur</td><td style="padding: 8px 0;">${sectorLabel}</td></tr>
            <tr><td style="padding: 8px 0; color: #666;">Score</td><td style="padding: 8px 0; font-weight: 700; font-size: 20px;">${score}/100</td></tr>
            <tr><td style="padding: 8px 0; color: #666;">Niveau</td><td style="padding: 8px 0;">${levelLabel}</td></tr>
            <tr><td style="padding: 8px 0; color: #666;">Date</td><td style="padding: 8px 0;">${new Date().toLocaleString("fr-FR", { timeZone: "Africa/Casablanca" })}</td></tr>
          </table>
          <div style="margin-top: 24px; padding: 16px; background: #f5f5f5; border-radius: 8px; font-size: 13px; color: #666;">
            Répondez directement à cet email pour contacter ${nameDisplay}.
          </div>
        </div>
      `,
      replyTo: email,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[quiz-lead]", err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
