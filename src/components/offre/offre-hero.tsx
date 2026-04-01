import { useTranslations } from "next-intl";
import { ScrollReveal } from "@/components/scroll-reveal";

const WHATSAPP_NUMBER = "212632431557";

export function OffreHero() {
  const t = useTranslations("offre.hero");

  const prefill = encodeURIComponent(t("whatsappPrefill"));
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${prefill}`;

  return (
    <section className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28 lg:pt-48 lg:pb-32">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-accent/[0.04] rounded-full blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-4xl px-6 text-center">
        <ScrollReveal>
          <p className="text-accent text-[11px] font-mono tracking-[0.25em] uppercase mb-6">
            {t("eyebrow")}
          </p>

          <h1 className="font-serif italic tracking-tight leading-[1.05]">
            {t.rich("title", {
              accent: (chunks) => <span className="text-accent">{chunks}</span>,
            })}
          </h1>

          <p className="mt-6 text-muted text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2.5 rounded-full bg-[#25D366] px-8 py-4 text-base font-semibold text-white shadow-sm shadow-[#25D366]/20 hover:shadow-lg hover:shadow-[#25D366]/25 hover:bg-[#22c55e] hover:-translate-y-px transition-all active:scale-[0.97]"
            >
              <WhatsAppIcon className="w-5 h-5 shrink-0" />
              {t("cta")}
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="opacity-70 group-hover:translate-x-0.5 transition-transform rtl:-scale-x-100">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <span className="text-muted text-sm">{t("responseTime")}</span>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={400}>
          <div className="mt-16 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-muted/60 text-[13px]">
            {["trust1", "trust2", "trust3", "trust4"].map((key, i) => (
              <span key={key}>
                {i > 0 && <span className="hidden sm:inline text-border me-8">|</span>}
                {t(key)}
              </span>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}
