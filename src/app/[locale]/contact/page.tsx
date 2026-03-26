import { getTranslations } from "next-intl/server";
import { PageShell } from "@/components/page-shell";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { ContactForm } from "@/components/contact-form";
import { getSectorFromParams } from "@/lib/sector-context";
import { sectorDetails } from "@/data/sector-details";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contactPage" });
  return { title: `${t("title")} — Tadnun` };
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
  const isEn = locale === "en";

  const sectorKey = getSectorFromParams(resolvedSearchParams);
  const details = sectorKey ? sectorDetails[sectorKey] : null;
  const sectorName = sectorKey ? t(`sectors.items.${sectorKey}.name`) : null;

  // Breadcrumbs: sector-aware when param exists
  const breadcrumbItems = sectorKey
    ? [
        { label: t("nav.sectors"), href: `/${locale}/#sectors` },
        { label: sectorName!, href: `/${locale}/sectors/${sectorKey}` },
        { label: t("nav.cta") },
      ]
    : [{ label: t("nav.cta") }];

  // Title: sector-specific tagline or generic
  const pageTitle = details
    ? isEn
      ? details.contactTagline.textEn
      : details.contactTagline.text
    : t("contactPage.title");

  // First testimonial from sector data (if available)
  const testimonial = details?.testimonials?.[0] ?? null;

  return (
    <PageShell>
      <section aria-labelledby="contact-heading" className="mx-auto max-w-6xl px-6 pt-20 pb-24">
        <Breadcrumbs items={breadcrumbItems} />

        <div className="grid lg:grid-cols-5 gap-16">
          {/* Form side */}
          <div className="lg:col-span-3">
            <p className="text-accent text-xs font-mono tracking-widest mb-2">
              {t("contactPage.eyebrow")}
            </p>
            <h1 id="contact-heading" className="font-serif italic text-4xl sm:text-5xl tracking-tight text-foreground">
              {pageTitle}
            </h1>
            <p className="mt-4 text-muted max-w-md">
              {t("contactPage.subtitle")}
            </p>
            <div className="mt-10">
              <ContactForm />
            </div>
          </div>

          {/* Alternative contact */}
          <div className="lg:col-span-2 lg:pt-32">
            <div className="rounded-2xl border border-border bg-surface p-8">
              <h2 className="font-medium text-foreground text-base mb-6">
                {t("contactPage.altTitle")}
              </h2>
              <div className="space-y-5">
                <div>
                  <p className="text-xs text-muted uppercase tracking-wider mb-1">Email</p>
                  <a href="mailto:contact@tadnun.ma" className="text-foreground text-sm hover:text-accent transition-colors">
                    {t("contactPage.altEmail")}
                  </a>
                </div>
                <div>
                  <p className="text-xs text-muted uppercase tracking-wider mb-1">WhatsApp</p>
                  <a
                    href="https://wa.me/212600000000"
                    className="inline-flex items-center gap-2 rounded-full border border-success/20 bg-success-light px-5 py-2.5 text-sm text-success hover:bg-success/10 transition-colors"
                  >
                    {t("contactPage.altWhatsapp")}
                  </a>
                </div>
                <p className="text-xs text-muted pt-2">
                  {t("contactPage.altHours")}
                </p>
              </div>

              {/* Sector testimonial */}
              {testimonial && (
                <div className="mt-6 pt-6 border-t border-border">
                  <blockquote className="text-[13px] text-muted italic leading-relaxed">
                    &ldquo;{isEn ? (testimonial.quoteEn ?? testimonial.quote) : testimonial.quote}&rdquo;
                  </blockquote>
                  <p className="mt-3 text-xs text-foreground font-medium">
                    {testimonial.name}
                  </p>
                  <p className="text-xs text-muted">
                    {testimonial.role} &middot; {testimonial.city}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
