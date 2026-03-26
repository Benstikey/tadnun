"use client";

import { useState } from "react";
import { useLocale } from "next-intl";
import { useSearchParams } from "next/navigation";

const sectorOptions = [
  { value: "agriculture", fr: "Agriculture & Cooperatives", en: "Agriculture & Cooperatives" },
  { value: "restaurants", fr: "Restaurants & Cafes", en: "Restaurants & Cafes" },
  { value: "tourism", fr: "Tourisme & Hotellerie", en: "Tourism & Hospitality" },
  { value: "healthcare", fr: "Sante & Cliniques", en: "Healthcare & Clinics" },
  { value: "retail", fr: "Commerce & Detail", en: "Retail & Commerce" },
  { value: "education", fr: "Education & Formation", en: "Education & Training" },
  { value: "realestate", fr: "Immobilier", en: "Real Estate" },
  { value: "logistics", fr: "Logistique & Transport", en: "Logistics & Transport" },
  { value: "other", fr: "Autre", en: "Other" },
];

export function ContactForm() {
  const locale = useLocale();
  const isFr = locale === "fr";
  const searchParams = useSearchParams();
  const preselectedSector = searchParams.get("sector") || "";

  const [submitted, setSubmitted] = useState(false);

  return submitted ? (
    <div className="rounded-2xl border border-emerald-200 bg-emerald-50/50 p-10 text-center">
      <p className="font-serif italic text-2xl text-foreground">
        {isFr ? "Merci !" : "Thank you!"}
      </p>
      <p className="mt-3 text-muted">
        {isFr
          ? "Nous vous recontacterons dans les 24h."
          : "We'll get back to you within 24h."}
      </p>
    </div>
  ) : (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSubmitted(true);
      }}
      className="space-y-5"
    >
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-foreground mb-1.5">
          {isFr ? "Nom complet" : "Full name"}
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          className="w-full rounded-lg border border-border bg-surface px-4 py-3 text-sm text-foreground placeholder:text-muted/60 focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-colors"
          placeholder={isFr ? "Votre nom" : "Your name"}
        />
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1.5">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="w-full rounded-lg border border-border bg-surface px-4 py-3 text-sm text-foreground placeholder:text-muted/60 focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-colors"
            placeholder="vous@exemple.ma"
          />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-1.5">
            {isFr ? "Telephone" : "Phone"}
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            className="w-full rounded-lg border border-border bg-surface px-4 py-3 text-sm text-foreground placeholder:text-muted/60 focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-colors"
            placeholder="+212 6XX XXX XXX"
          />
        </div>
      </div>

      <div>
        <label htmlFor="sector" className="block text-sm font-medium text-foreground mb-1.5">
          {isFr ? "Votre secteur" : "Your sector"}
        </label>
        <select
          id="sector"
          name="sector"
          defaultValue={preselectedSector}
          className="w-full rounded-lg border border-border bg-surface px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-colors"
        >
          <option value="">{isFr ? "Selectionnez un secteur" : "Select a sector"}</option>
          {sectorOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {isFr ? opt.fr : opt.en}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-foreground mb-1.5">
          {isFr ? "Parlez-nous de votre projet" : "Tell us about your project"}
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          className="w-full rounded-lg border border-border bg-surface px-4 py-3 text-sm text-foreground placeholder:text-muted/60 focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-colors resize-none"
          placeholder={
            isFr
              ? "Quels sont vos principaux defis ? Qu'aimeriez-vous digitaliser ?"
              : "What are your main challenges? What would you like to digitalize?"
          }
        />
      </div>

      <button
        type="submit"
        className="w-full sm:w-auto inline-flex items-center justify-center rounded-full bg-accent px-10 py-3.5 text-sm font-semibold text-white shadow-sm shadow-accent/20 hover:shadow-lg hover:shadow-accent/25 hover:bg-accent/90 transition-all hover:-translate-y-px cursor-pointer"
      >
        {isFr ? "Envoyer" : "Send"}
      </button>

      <p className="text-xs text-muted">
        {isFr
          ? "Premier appel de decouverte gratuit. Sans engagement."
          : "First discovery call is free. No commitment."}
      </p>
    </form>
  );
}
