"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { getSectorFromParams } from "@/lib/sector-context";

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

export function ContactForm() {
  const t = useTranslations("contactPage");
  const tSectors = useTranslations("sectors");
  const searchParams = useSearchParams();
  const preselectedSector = getSectorFromParams(
    Object.fromEntries(searchParams.entries())
  ) || "";

  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50/50 p-8 text-center">
        <p className="font-serif italic text-2xl text-foreground">
          {t("formSuccess")}
        </p>
        <p className="mt-2 text-muted text-sm">
          {t("formSuccessMsg")}
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSubmitted(true);
      }}
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
          className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted/60 focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-colors"
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
          className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted/60 focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-colors"
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
          className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-colors"
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
          {t("formMessage")}
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted/60 focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-colors resize-none"
          placeholder={t("formMessagePlaceholder")}
        />
      </div>

      <button
        type="submit"
        className="w-full sm:w-auto inline-flex items-center justify-center rounded-full bg-foreground px-8 py-3 text-sm font-semibold text-background hover:bg-foreground/90 transition-colors cursor-pointer"
      >
        {t("formSend")}
      </button>
    </form>
  );
}
