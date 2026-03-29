import { getTranslations } from "next-intl/server";
import { PageShell } from "@/components/page-shell";
import { WhatsAppCta } from "@/components/whatsapp-cta";
import { AvailabilityBadge } from "@/components/availability-badge";
import { ContactProcess } from "@/components/contact-process";
import { ContactForm } from "@/components/contact-form";
import { ContactChatPreview } from "@/components/contact-chat-preview";
import { ScrollReveal } from "@/components/scroll-reveal";
import { IconBox } from "@/components/icon-box";
import { getSectorFromParams } from "@/lib/sector-context";
import { sectorDetails } from "@/data/sector-details";
import type { Metadata } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://tadnun.com";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contactPage" });
  const pageUrl = `${BASE_URL}/${locale}/contact`;
  return {
    title: `${t("title1")} ${t("titleAccent")} ${t("title2")} — Tadnun`,
    description: t("subtitle"),
    alternates: {
      canonical: pageUrl,
      languages: { fr: `${BASE_URL}/fr/contact`, en: `${BASE_URL}/en/contact`, ar: `${BASE_URL}/ar/contact` },
    },
  };
}

export default async function ContactPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { locale } = await params;
  const resolvedSearchParams = await searchParams;
  const t = await getTranslations({ locale });

  const sectorKey = getSectorFromParams(resolvedSearchParams);
  const details = sectorKey ? sectorDetails[sectorKey] : null;
  const sectorName = sectorKey ? t(`sectors.items.${sectorKey}.name`) : null;
  const isEn = locale === "en";

  const testimonial = details?.testimonials?.[0] ?? null;

  return (
    <PageShell>
      <div className="mx-auto max-w-6xl px-6 pt-16 pb-12 sm:pt-20 sm:pb-16 lg:pt-28">
        {/* ─── Hero: WhatsApp-first ─── */}
        <section aria-labelledby="contact-heading" className="pt-4 pb-20">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left: headline + CTA */}
            <div className="lg:col-span-7">
              <ScrollReveal>
                <p className="text-accent text-xs font-mono tracking-widest mb-3">
                  {t("contactPage.eyebrow")}
                </p>
                <h1
                  id="contact-heading"
                  className="font-serif italic text-4xl sm:text-5xl lg:text-6xl tracking-tight text-foreground leading-[1.08]"
                >
                  {t("contactPage.title1")}{" "}
                  <span className="text-accent">{t("contactPage.titleAccent")}</span>{" "}
                  {t("contactPage.title2")}
                </h1>
                <p className="mt-5 text-muted text-base sm:text-lg max-w-lg leading-relaxed">
                  {t("contactPage.subtitle")}
                </p>
              </ScrollReveal>

              <ScrollReveal delay={100}>
                <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-5">
                  <WhatsAppCta />
                  <AvailabilityBadge />
                </div>
              </ScrollReveal>

              <ScrollReveal delay={180}>
                <p className="mt-6 text-sm text-muted">
                  {t("contactPage.trustLine")}
                </p>
              </ScrollReveal>

              {/* Sector-specific testimonial */}
              {testimonial && (
                <ScrollReveal delay={250}>
                  <blockquote className="mt-10 max-w-lg border-s-2 border-accent/30 ps-5 py-1">
                    <p className="text-[14px] text-foreground/60 leading-relaxed italic">
                      &ldquo;{locale === "ar" ? testimonial.quoteAr : locale === "en" ? testimonial.quoteEn : testimonial.quote}&rdquo;
                    </p>
                    <cite className="mt-2 block text-[13px] text-foreground not-italic font-medium">
                      {testimonial.name}
                      <span className="text-muted font-normal"> &middot; {locale === "ar" ? testimonial.roleAr : locale === "en" ? testimonial.roleEn : testimonial.role}, {testimonial.city}</span>
                    </cite>
                  </blockquote>
                </ScrollReveal>
              )}
            </div>

            {/* Right: chat preview */}
            <div className="lg:col-span-5 hidden lg:block">
              <ScrollReveal delay={200}>
                <ContactChatPreview />
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* ─── Process: What happens next ─── */}
        <ScrollReveal>
          <ContactProcess />
        </ScrollReveal>

        {/* ─── Secondary: Form + other channels ─── */}
        <section className="mt-20 grid lg:grid-cols-5 gap-8 lg:gap-16 items-center">
          {/* Form */}
          <div className="lg:col-span-3">
            <ScrollReveal>
              <h2 className="font-serif italic text-2xl sm:text-3xl tracking-tight text-foreground mb-6">
                {t("contactPage.formToggle")}
              </h2>
              <ContactForm />
            </ScrollReveal>
          </div>

          {/* Other channels */}
          <div className="lg:col-span-2">
            <ScrollReveal delay={80}>
              <h3 className="font-serif italic text-xl tracking-tight text-foreground mb-5">
                {t("contactPage.secondaryTitle")}
              </h3>
              <div className="space-y-3">
                {/* Email */}
                <a
                  href={`mailto:${t("contactPage.altEmail")}`}
                  className="group flex items-center gap-3 rounded-xl border border-border bg-surface p-4 hover:border-foreground/15 hover:shadow-sm transition-all"
                >
                  <IconBox size="sm" hoverAccent>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="4" width="20" height="16" rx="2" />
                      <path d="M22 7l-10 6L2 7" />
                    </svg>
                  </IconBox>
                  <div>
                    <p className="text-[11px] text-muted uppercase tracking-wider">Email</p>
                    <p className="text-sm text-foreground font-medium">{t("contactPage.altEmail")}</p>
                  </div>
                </a>

                {/* Phone */}
                <a
                  href={`tel:${t("contactPage.altPhone").replace(/\s/g, "")}`}
                  className="group flex items-center gap-3 rounded-xl border border-border bg-surface p-4 hover:border-foreground/15 hover:shadow-sm transition-all"
                >
                  <IconBox size="sm" hoverAccent>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                  </IconBox>
                  <div>
                    <p className="text-[11px] text-muted uppercase tracking-wider">{locale === "ar" ? "التيليفون" : locale === "fr" ? "Téléphone" : "Phone"}</p>
                    <p className="text-sm text-foreground font-medium">{t("contactPage.altPhone")}</p>
                  </div>
                </a>
              </div>

              {/* Trust signals */}
              <div className="mt-5 flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1.5 text-xs text-muted bg-foreground/[0.03] px-3 py-1.5 rounded-full">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  {t("contactPage.basedIn")}
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs text-muted bg-foreground/[0.03] px-3 py-1.5 rounded-full">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  </svg>
                  {t("contactPage.supportLang")}
                </span>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </div>
    </PageShell>
  );
}
