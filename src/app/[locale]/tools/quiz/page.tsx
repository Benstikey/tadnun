import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { PageShell } from "@/components/page-shell";
import { QuizClient } from "./quiz-client";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://tadnun.com";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "quiz.meta" });
  const pageUrl = `${BASE_URL}/${locale}/tools/quiz`;
  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: pageUrl,
      languages: {
        fr: `${BASE_URL}/fr/tools/quiz`,
        en: `${BASE_URL}/en/tools/quiz`,
        ar: `${BASE_URL}/ar/tools/quiz`,
      },
    },
  };
}

export default async function QuizPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return (
    <PageShell>
      <QuizClient locale={locale} />
    </PageShell>
  );
}
