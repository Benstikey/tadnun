"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { getSectorFromParams } from "@/lib/sector-context";
import { trackEvent } from "@/lib/analytics";

const sectorKeys = [
  "agriculture",
  "restaurants",
  "tourism",
  "healthcare",
  "retail",
  "education",
  "realestate",
  "logistics",
] as const;

/* ── Animated checkmark SVG ── */
function SuccessCheck() {
  const [drawn, setDrawn] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setDrawn(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-success/10 transition-transform duration-500 ease-out"
      style={{ transform: drawn ? "scale(1)" : "scale(0.6)" }}
    >
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path
          d="M6 14.5l6 6L22 8"
          stroke="var(--success)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="32"
          strokeDashoffset={drawn ? "0" : "32"}
          style={{ transition: "stroke-dashoffset 0.5s cubic-bezier(0.65, 0, 0.35, 1) 0.2s" }}
        />
      </svg>
    </div>
  );
}

export function ContactForm() {
  const t = useTranslations("contactPage");
  const tSectors = useTranslations("sectors");
  const searchParams = useSearchParams();
  const preselectedSector = getSectorFromParams(
    Object.fromEntries(searchParams.entries())
  ) || "";

  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSending(true);
    setError("");

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      contact: (form.elements.namedItem("contact") as HTMLInputElement).value,
      sector: (form.elements.namedItem("sector") as HTMLSelectElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Failed to send");
      trackEvent("contact_form_submitted", { sector: data.sector || "none" });
      setSubmitted(true);
    } catch {
      setError(t("formError"));
    } finally {
      setSending(false);
    }
  }

  if (submitted) {
    return (
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50/50 p-8 text-center animate-[fadeScale_0.4s_ease-out]">
        <SuccessCheck />
        <p className="font-serif italic text-2xl text-foreground">
          {t("formSuccess")}
        </p>
        <p className="mt-2 text-muted text-sm">
          {t("formSuccessMsg")}
        </p>
        <a
          href={`https://wa.me/212632431557`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-2.5 text-sm font-semibold text-white hover:bg-[#22c55e] transition-all"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          {t("formSuccessWhatsapp")}
        </a>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 rounded-2xl border border-border bg-surface p-6"
    >
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-foreground mb-1.5">
          {t("formName")}
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          className="w-full rounded-lg border border-border bg-background px-4 py-3.5 text-sm text-foreground placeholder:text-muted/60 focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent/60 focus:shadow-[0_0_0_3px_rgba(212,69,59,0.06)] transition-all duration-200"
          placeholder={t("formNamePlaceholder")}
        />
      </div>

      <div>
        <label htmlFor="contact" className="block text-sm font-medium text-foreground mb-1.5">
          {t("formContact")}
        </label>
        <input
          type="text"
          id="contact"
          name="contact"
          required
          className="w-full rounded-lg border border-border bg-background px-4 py-3.5 text-sm text-foreground placeholder:text-muted/60 focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent/60 focus:shadow-[0_0_0_3px_rgba(212,69,59,0.06)] transition-all duration-200"
          placeholder={t("formContactPlaceholder")}
        />
      </div>

      <div>
        <label htmlFor="sector" className="block text-sm font-medium text-foreground mb-1.5">
          {t("formSector")}
        </label>
        <select
          id="sector"
          name="sector"
          defaultValue={preselectedSector}
          className="w-full rounded-lg border border-border bg-background px-4 py-3.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent/60 focus:shadow-[0_0_0_3px_rgba(212,69,59,0.06)] transition-all duration-200"
        >
          <option value="">{t("formSectorPlaceholder")}</option>
          {sectorKeys.map((key) => (
            <option key={key} value={key}>
              {tSectors(`items.${key}.name`)}
            </option>
          ))}
          <option value="other">{t("sectorOther")}</option>
        </select>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-foreground mb-1.5">
          {t("formMessage")} <span className="text-muted font-normal">({t("formOptional")})</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          className="w-full rounded-lg border border-border bg-background px-4 py-3.5 text-sm text-foreground placeholder:text-muted/60 focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent/60 focus:shadow-[0_0_0_3px_rgba(212,69,59,0.06)] transition-all duration-200 resize-none"
          placeholder={t("formMessagePlaceholder")}
        />
      </div>

      {error && (
        <p className="text-sm text-red-600 bg-red-50 rounded-lg px-4 py-2">
          {error}
        </p>
      )}

      <div>
        <button
          type="submit"
          disabled={sending}
          className="w-full sm:w-auto inline-flex items-center justify-center rounded-full bg-foreground px-8 py-3 text-sm font-semibold text-background hover:bg-foreground/90 active:scale-[0.97] transition-all duration-150 cursor-pointer hover:-translate-y-px hover:shadow-lg hover:shadow-foreground/10 disabled:opacity-60 disabled:pointer-events-none"
        >
          {sending ? (
            <span className="inline-flex items-center gap-2">
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" className="opacity-25" />
                <path d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" fill="currentColor" className="opacity-75" />
              </svg>
              {t("formSending")}
            </span>
          ) : (
            t("formSend")
          )}
        </button>
        <p className="mt-3 text-[12px] text-muted">
          {t("formTrust")}
        </p>
      </div>
    </form>
  );
}
