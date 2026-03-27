import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Fraunces, Noto_Sans_Arabic } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";
import { Analytics } from "@vercel/analytics/next";
import { JsonLd } from "@/components/json-ld";
import "./globals.css";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://tadnun.ma";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-playfair",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

const notoArabic = Noto_Sans_Arabic({
  variable: "--font-arabic",
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
});

type Locale = (typeof routing.locales)[number];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  const pageUrl = `${BASE_URL}/${locale}`;

  return {
    metadataBase: new URL(BASE_URL),
    title: {
      default: t("title"),
      template: `%s — Tadnun`,
    },
    description: t("description"),
    keywords: [
      "digital transformation Morocco",
      "digitalisation Maroc",
      "التحول الرقمي المغرب",
      "Moroccan business software",
      "logiciel entreprise Maroc",
      "Tadnun",
      "تدنون",
      "Morocco SME digitalization",
      "digitalisation PME Maroc",
    ],
    authors: [{ name: "Tadnun", url: BASE_URL }],
    creator: "Tadnun",
    publisher: "Tadnun",
    formatDetection: {
      email: false,
      telephone: false,
    },

    // Open Graph
    openGraph: {
      type: "website",
      siteName: "Tadnun",
      title: t("title"),
      description: t("description"),
      url: pageUrl,
      locale: locale === "ar" ? "ar_MA" : locale === "fr" ? "fr_MA" : "en",
      images: [
        {
          url: `${BASE_URL}/og-image.png`,
          width: 1200,
          height: 630,
          alt: "Tadnun — Digital Transformation for Moroccan Businesses",
        },
      ],
    },

    // Twitter Card
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
      images: [`${BASE_URL}/og-image.png`],
    },

    // Hreflang alternates for all locales
    alternates: {
      canonical: pageUrl,
      languages: {
        fr: `${BASE_URL}/fr`,
        en: `${BASE_URL}/en`,
        ar: `${BASE_URL}/ar`,
        "x-default": `${BASE_URL}/fr`,
      },
    },

    // Verification (add when you have search console)
    // verification: {
    //   google: "your-google-verification-code",
    // },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  const messages = (await import(`../../messages/${locale}.json`)).default;

  return (
    <html
      lang={locale}
      dir={locale === "ar" ? "rtl" : "ltr"}
      className={`${jakarta.variable} ${fraunces.variable} ${notoArabic.variable} antialiased`}
    >
      <body className="min-h-screen flex flex-col">
        <JsonLd locale={locale} />
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
        <Analytics />
      </body>
    </html>
  );
}
