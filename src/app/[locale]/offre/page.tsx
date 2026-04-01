import type { Metadata } from "next";
import { PageShell } from "@/components/page-shell";
import { OffreHero } from "@/components/offre/offre-hero";
import { PainAgitation } from "@/components/offre/pain-agitation";
import { OffrePillars } from "@/components/offre/offre-pillars";
import { CaseStudies } from "@/components/offre/case-studies";
import { ComparisonTable } from "@/components/offre/comparison-table";
import { ProcessSteps } from "@/components/offre/process-steps";
import { PricingTransparency } from "@/components/offre/pricing-transparency";
import { FinalCta } from "@/components/offre/final-cta";

export const metadata: Metadata = {
  title: "Offre Digitalisation — Tadnun",
  description:
    "Outils digitaux sur mesure pour les entreprises marocaines. Presence en ligne, operations, integrations CMI/CNSS/ONSSA. 150+ entreprises accompagnees.",
  robots: { index: false, follow: false },
};

export default function OffrePage() {
  return (
    <PageShell>
      <OffreHero />
      <PainAgitation />
      <div className="section-divide" />
      <OffrePillars />
      <CaseStudies />
      <div className="section-divide" />
      <ComparisonTable />
      <div className="section-divide" />
      <ProcessSteps />
      <PricingTransparency />
      <FinalCta />
    </PageShell>
  );
}
