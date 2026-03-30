import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/page-shell";
import { ScrollReveal } from "@/components/scroll-reveal";
import { SectionHeading } from "@/components/section-heading";
import { CtaBand } from "@/components/cta-band";
import { SectorJsonLd } from "@/components/json-ld";
import { sectorDetails } from "@/data/sector-details";
import { getCityData, cities } from "@/data/cities";
import { validSectors, type SectorKey } from "@/lib/sector-context";
import { routing } from "@/i18n/routing";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://tadnun.com";

export function generateStaticParams() {
  const params: { locale: string; sector: string; city: string }[] = [];
  for (const locale of routing.locales) {
    for (const sector of validSectors) {
      for (const city of cities) {
        if (city.strongSectors.includes(sector)) {
          params.push({ locale, sector, city: city.slug });
        }
      }
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; sector: string; city: string }>;
}): Promise<Metadata> {
  const { locale, sector, city: citySlug } = await params;
  const cityData = getCityData(citySlug);
  if (!cityData || !validSectors.includes(sector as SectorKey)) return {};

  const t = await getTranslations({ locale, namespace: "sectors.items" });
  const sectorName = t(`${sector}.name`);
  const title =
    locale === "ar"
      ? `${sectorName} ${cityData.nameAr} — تدنون`
      : locale === "fr"
        ? `${sectorName} a ${cityData.name} — Tadnun`
        : `${sectorName} in ${cityData.name} — Tadnun`;

  const description =
    locale === "fr"
      ? `Tadnun accompagne les entreprises de ${sectorName.toLowerCase()} a ${cityData.name}. Solutions digitales sur mesure, integrations locales et support en darija.`
      : locale === "ar"
        ? `تدنون كترافق المقاولات ديال ${sectorName} في ${cityData.nameAr}. حلول رقمية مخصصة، ربط محلي ودعم بالدارجة.`
        : `Tadnun helps ${sectorName.toLowerCase()} businesses in ${cityData.name}. Custom digital solutions, local integrations, and Darija support.`;

  const pageUrl = `${BASE_URL}/${locale}/sectors/${sector}/${citySlug}`;
  return {
    title,
    description,
    alternates: {
      canonical: pageUrl,
      languages: {
        fr: `${BASE_URL}/fr/sectors/${sector}/${citySlug}`,
        en: `${BASE_URL}/en/sectors/${sector}/${citySlug}`,
        ar: `${BASE_URL}/ar/sectors/${sector}/${citySlug}`,
      },
    },
  };
}

export default async function SectorCityPage({
  params,
}: {
  params: Promise<{ locale: string; sector: string; city: string }>;
}) {
  const { locale, sector, city: citySlug } = await params;
  const cityData = getCityData(citySlug);
  if (!cityData || !validSectors.includes(sector as SectorKey)) notFound();
  if (!cityData.strongSectors.includes(sector)) notFound();

  const t = await getTranslations({ locale });
  const isEn = locale === "en";
  const isAr = locale === "ar";
  const details = sectorDetails[sector as SectorKey];
  const sectorName = t(`sectors.items.${sector}.name`);
  const cityName = isAr ? cityData.nameAr : cityData.name;
  const cityContext = isEn ? cityData.contextEn : isAr ? cityData.contextAr : cityData.context;

  const faqItems = details.faq.map((f) => ({
    question: isEn ? f.qEn : f.q,
    answer: isEn ? f.aEn : f.a,
  }));

  return (
    <PageShell>
      <SectorJsonLd
        locale={locale}
        sectorSlug={sector}
        sectorName={`${sectorName} — ${cityName}`}
        sectorDescription={t(`sectors.items.${sector}.solution`)}
        faqItems={faqItems}
      />

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-6 pt-20 pb-16">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-[12px] text-muted mb-8">
          <a href={`/${locale}`} className="hover:text-foreground transition-colors">
            {t("common.home")}
          </a>
          <span className="text-border">/</span>
          <a href={`/${locale}/sectors`} className="hover:text-foreground transition-colors">
            {t("nav.sectors")}
          </a>
          <span className="text-border">/</span>
          <a href={`/${locale}/sectors/${sector}`} className="hover:text-foreground transition-colors">
            {sectorName}
          </a>
          <span className="text-border">/</span>
          <span className="text-foreground/70">{cityName}</span>
        </nav>

        <ScrollReveal>
          <p className="text-accent text-[11px] font-mono tracking-[0.2em] uppercase mb-5">
            {sectorName} — {cityName}
          </p>
          <h1 className="font-serif italic text-4xl sm:text-5xl tracking-tight text-foreground leading-[1.1]">
            {isEn
              ? `Digital transformation for ${sectorName.toLowerCase()} in ${cityName}`
              : isAr
                ? `التحول الرقمي ل${sectorName} في ${cityName}`
                : `Transformation digitale pour ${sectorName.toLowerCase()} a ${cityName}`}
          </h1>
          <p className="mt-6 text-muted text-lg leading-relaxed max-w-2xl">
            {t(`sectors.items.${sector}.pain`)}
          </p>
        </ScrollReveal>
      </section>

      <div className="border-t border-border" />

      {/* City context */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <ScrollReveal>
          <div className="grid sm:grid-cols-3 gap-6">
            <div className="rounded-xl border border-border bg-surface p-5">
              <span className="block text-2xl font-serif italic text-foreground">{cityData.population}</span>
              <span className="mt-1 block text-[13px] text-muted">
                {isEn ? "Population" : isAr ? "عدد السكان" : "Population"}
              </span>
            </div>
            <div className="sm:col-span-2 rounded-xl border border-border bg-surface p-5">
              <p className="text-[15px] text-foreground/80 leading-relaxed">{cityContext}</p>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* ROI Stats */}
      <section className="border-y border-border">
        <div className="mx-auto max-w-6xl px-6 py-10 grid grid-cols-2 sm:grid-cols-4 gap-8">
          {details.roi.map((r, i) => (
            <div key={i}>
              <p className="text-2xl sm:text-3xl font-serif italic text-foreground tabular-nums">{r.stat}</p>
              <p className="mt-1.5 text-[13px] text-muted leading-snug">{isEn ? r.labelEn : r.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pain Points */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <SectionHeading
          eyebrow={t("sectorPage.realityEyebrow")}
          title={isEn
            ? `The reality for ${sectorName.toLowerCase()} in ${cityName}`
            : isAr
              ? `واقع ${sectorName} في ${cityName}`
              : `La realite de ${sectorName.toLowerCase()} a ${cityName}`}
        />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {details.painPoints.map((p, i) => (
            <ScrollReveal key={i} delay={i * 60}>
              <div className="rounded-2xl border border-border bg-surface p-6 h-full">
                <h3 className="font-semibold text-foreground text-[15px]">
                  {isEn ? p.titleEn : p.title}
                </h3>
                <p className="mt-3 text-muted text-[14px] leading-relaxed">
                  {isEn ? p.bodyEn : p.body}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      {details.testimonials.length > 0 && (
        <section className="bg-foreground/[0.02] border-y border-border">
          <div className="mx-auto max-w-6xl px-6 py-16">
            <div className="grid gap-8 sm:grid-cols-2">
              {details.testimonials.map((t, i) => (
                <ScrollReveal key={i} delay={i * 80}>
                  <blockquote className="rounded-2xl border border-border bg-surface p-6 h-full">
                    <p className="text-foreground/60 text-[15px] leading-relaxed italic">
                      &ldquo;{locale === "ar" ? t.quoteAr : locale === "en" ? t.quoteEn : t.quote}&rdquo;
                    </p>
                    <cite className="mt-4 block text-[13px] text-muted not-italic">
                      {t.name}, {locale === "ar" ? t.roleAr : locale === "en" ? t.roleEn : t.role} — {t.city}
                    </cite>
                  </blockquote>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Integrations */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <SectionHeading
          eyebrow={t("sectorPage.ecosystemEyebrow")}
          title={t("sectorPage.ecosystemTitle")}
        />
        <p className="mt-3 text-muted text-base leading-relaxed max-w-xl">
          {t("sectorPage.ecosystemDesc")}
        </p>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {details.integrations.map((integ, i) => (
            <ScrollReveal key={i} delay={i * 40}>
              <div className="rounded-xl border border-border bg-surface p-5">
                <h3 className="font-semibold text-foreground text-[14px]">{integ.name}</h3>
                <p className="mt-1.5 text-muted text-[13px] leading-relaxed">
                  {isEn ? integ.descEn : integ.desc}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <div className="section-divide" />

      <CtaBand
        titleKey="sectorPage.ctaTitle"
        ctaKey="sectorPage.ctaButton"
        descKey="sectorPage.ctaDesc"
        sectorKey={sector}
      />
    </PageShell>
  );
}
