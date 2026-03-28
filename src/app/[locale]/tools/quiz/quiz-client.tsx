"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { trackEvent } from "@/lib/analytics";

const SECTOR_KEYS = [
  "agriculture", "restaurants", "tourism", "healthcare",
  "retail", "education", "realestate", "logistics",
] as const;

const QUESTION_KEYS = ["q1", "q2", "q3", "q4", "q5", "q6"] as const;
const OPTION_KEYS = ["a", "b", "c", "d"] as const;
const SCORES: Record<string, number[]> = {
  q1: [0, 5, 10, 15],
  q2: [0, 5, 10, 15],
  q3: [0, 5, 10, 15],
  q4: [0, 4, 9, 15],
  q5: [0, 5, 7, 15],
  q6: [0, 5, 10, 15],
};

type ScoreLevel = "critical" | "behind" | "progress" | "leader";

function getLevel(score: number): ScoreLevel {
  if (score <= 25) return "critical";
  if (score <= 50) return "behind";
  if (score <= 75) return "progress";
  return "leader";
}

const LEVEL_COLORS: Record<ScoreLevel, string> = {
  critical: "text-red-600 bg-red-50 border-red-200",
  behind: "text-orange-600 bg-orange-50 border-orange-200",
  progress: "text-amber-600 bg-amber-50 border-amber-200",
  leader: "text-green-600 bg-green-50 border-green-200",
};

const WHATSAPP_NUMBER = "212632431557";

export function QuizClient({ locale }: { locale: string }) {
  const t = useTranslations("quiz");
  const tSectors = useTranslations("sectors.items");

  const [step, setStep] = useState<"intro" | "sector" | "questions" | "results">("intro");
  const [sector, setSector] = useState("");
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const rawScore = answers.reduce((sum, a) => sum + a, 0);
  const normalizedScore = Math.round((rawScore / 90) * 100);
  const level = getLevel(normalizedScore);

  function handleSectorSelect(s: string) {
    setSector(s);
    trackEvent("quiz_sector_selected", { sector: s });
    setStep("questions");
  }

  function handleAnswer() {
    if (selectedOption === null) return;
    const qKey = QUESTION_KEYS[currentQ];
    const score = SCORES[qKey][selectedOption];
    const newAnswers = [...answers, score];
    setAnswers(newAnswers);
    setSelectedOption(null);

    if (currentQ < QUESTION_KEYS.length - 1) {
      setCurrentQ(currentQ + 1);
    } else {
      const total = newAnswers.reduce((s, a) => s + a, 0);
      const finalScore = Math.round((total / 90) * 100);
      trackEvent("quiz_completed", { score: finalScore, sector, level: getLevel(finalScore) });
      setStep("results");
    }
  }

  function handleRetake() {
    setStep("intro");
    setSector("");
    setCurrentQ(0);
    setAnswers([]);
    setSelectedOption(null);
  }

  const whatsappText = encodeURIComponent(
    locale === "fr"
      ? `Bonjour, je viens de faire le test de maturité digitale et j'ai obtenu ${normalizedScore}/100. J'aimerais en discuter.`
      : locale === "ar"
        ? `مرحبا، دوّزت اختبار الجاهزية الرقمية وحصلت على ${normalizedScore}/100. بغيت نهضرو عليه.`
        : `Hi, I just took the Digital Readiness test and scored ${normalizedScore}/100. I'd like to discuss it.`
  );

  // ─── Intro ───
  if (step === "intro") {
    return (
      <section className="mx-auto max-w-2xl px-6 py-24 text-center">
        <p className="text-accent text-[11px] font-mono tracking-[0.2em] uppercase mb-4">
          {locale === "fr" ? "OUTIL GRATUIT" : locale === "ar" ? "أداة مجانية" : "FREE TOOL"}
        </p>
        <h1 className="font-serif italic text-4xl sm:text-5xl tracking-tight text-foreground leading-[1.1]">
          {t("title")}
        </h1>
        <p className="mt-5 text-muted text-lg leading-relaxed max-w-md mx-auto">
          {t("subtitle")}
        </p>
        <button
          onClick={() => {
            trackEvent("quiz_started");
            setStep("sector");
          }}
          className="mt-10 inline-flex items-center justify-center rounded-full bg-foreground px-8 py-3.5 text-sm font-semibold text-background hover:bg-foreground/90 active:scale-[0.97] transition-all hover:-translate-y-px shadow-sm cursor-pointer"
        >
          {t("start")}
        </button>
      </section>
    );
  }

  // ─── Sector Selection ───
  if (step === "sector") {
    return (
      <section className="mx-auto max-w-2xl px-6 py-24">
        <h2 className="font-serif italic text-2xl sm:text-3xl tracking-tight text-foreground text-center">
          {t("sectorQuestion")}
        </h2>
        <div className="mt-10 grid gap-3 sm:grid-cols-2">
          {SECTOR_KEYS.map((key) => (
            <button
              key={key}
              onClick={() => handleSectorSelect(key)}
              className="rounded-xl border border-border bg-surface p-4 text-start text-sm font-medium text-foreground hover:border-foreground/20 hover:bg-surface/80 transition-all cursor-pointer"
            >
              {tSectors(`${key}.name`)}
            </button>
          ))}
          <button
            onClick={() => handleSectorSelect("other")}
            className="rounded-xl border border-border bg-surface p-4 text-start text-sm font-medium text-muted hover:border-foreground/20 hover:bg-surface/80 transition-all cursor-pointer"
          >
            {t("sectorOther")}
          </button>
        </div>
      </section>
    );
  }

  // ─── Questions ───
  if (step === "questions") {
    const qKey = QUESTION_KEYS[currentQ];
    return (
      <section className="mx-auto max-w-2xl px-6 py-24">
        {/* Progress bar */}
        <div className="mb-10">
          <div className="flex items-center justify-between text-[12px] text-muted font-mono mb-2">
            <span>{t("progress", { current: currentQ + 1, total: QUESTION_KEYS.length })}</span>
          </div>
          <div className="h-1.5 rounded-full bg-border/50 overflow-hidden">
            <div
              className="h-full rounded-full bg-accent transition-all duration-500 ease-out"
              style={{ width: `${((currentQ + 1) / QUESTION_KEYS.length) * 100}%` }}
            />
          </div>
        </div>

        <h2 className="font-serif italic text-2xl sm:text-3xl tracking-tight text-foreground">
          {t(`${qKey}.question`)}
        </h2>

        <div className="mt-8 grid gap-3">
          {OPTION_KEYS.map((opt, i) => (
            <button
              key={opt}
              onClick={() => setSelectedOption(i)}
              className={`rounded-xl border p-4 text-start text-sm transition-all cursor-pointer ${
                selectedOption === i
                  ? "border-accent bg-accent/5 text-foreground ring-2 ring-accent/20"
                  : "border-border bg-surface text-foreground/80 hover:border-foreground/20"
              }`}
            >
              {t(`${qKey}.${opt}`)}
            </button>
          ))}
        </div>

        <div className="mt-8 flex justify-end">
          <button
            onClick={handleAnswer}
            disabled={selectedOption === null}
            className="inline-flex items-center justify-center rounded-full bg-foreground px-8 py-3 text-sm font-semibold text-background hover:bg-foreground/90 active:scale-[0.97] transition-all cursor-pointer disabled:opacity-40 disabled:pointer-events-none"
          >
            {currentQ < QUESTION_KEYS.length - 1 ? t("next") : t("seeResults")}
          </button>
        </div>
      </section>
    );
  }

  // ─── Results ───
  return (
    <section className="mx-auto max-w-2xl px-6 py-24">
      {/* Score display */}
      <div className="text-center">
        <div className="inline-flex items-baseline gap-2">
          <span className="text-7xl sm:text-8xl font-serif italic text-foreground tabular-nums">
            {normalizedScore}
          </span>
          <span className="text-2xl text-muted font-serif italic">{t("results.outOf")}</span>
        </div>
        <div className={`mt-4 inline-flex items-center rounded-full border px-4 py-1.5 text-sm font-semibold ${LEVEL_COLORS[level]}`}>
          {t(`results.${level}.label`)}
        </div>
        <p className="mt-4 text-muted text-sm">{t("results.average")}</p>
      </div>

      {/* Description */}
      <div className="mt-8 rounded-2xl border border-border bg-surface p-6">
        <p className="text-foreground text-[15px] leading-relaxed">
          {t(`results.${level}.desc`)}
        </p>
      </div>

      {/* CTA block */}
      <div className="mt-10 rounded-2xl border border-border bg-surface/50 p-8 text-center">
        <h3 className="font-serif italic text-xl text-foreground">
          {t("results.ctaTitle")}
        </h3>
        <p className="mt-2 text-muted text-sm">{t("results.ctaDesc")}</p>
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappText}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent("quiz_whatsapp_clicked", { score: normalizedScore, sector })}
            className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3 text-sm font-semibold text-white hover:bg-[#22c55e] transition-all"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            {t("results.ctaWhatsapp")}
          </a>
          {sector && sector !== "other" && (
            <a
              href={`/${locale}/sectors/${sector}`}
              className="inline-flex items-center gap-2 text-sm font-semibold text-foreground border border-border rounded-full px-5 py-2.5 hover:border-foreground/30 hover:bg-foreground/[0.04] transition-all"
            >
              {t("results.ctaSectors")}
            </a>
          )}
        </div>
      </div>

      {/* Share + retake */}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
        <button
          onClick={() => {
            const shareText = t("results.shareText", { score: normalizedScore });
            const url = `${window.location.origin}/${locale}/tools/quiz`;
            if (navigator.share) {
              navigator.share({ text: shareText, url });
            } else {
              navigator.clipboard.writeText(`${shareText} ${url}`);
            }
            trackEvent("quiz_shared", { score: normalizedScore, sector });
          }}
          className="text-sm font-medium text-muted hover:text-foreground transition-colors cursor-pointer"
        >
          {t("results.shareTitle")}
        </button>
        <span className="text-border">|</span>
        <button
          onClick={handleRetake}
          className="text-sm font-medium text-muted hover:text-foreground transition-colors cursor-pointer"
        >
          {t("results.retake")}
        </button>
      </div>
    </section>
  );
}
