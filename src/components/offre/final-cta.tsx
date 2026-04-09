import { useTranslations } from "next-intl";
import { ScrollReveal } from "@/components/scroll-reveal";

const WHATSAPP_NUMBER = "212632431557";

export function FinalCta() {
  const t = useTranslations("offre.finalCta");

  const prefill = encodeURIComponent(t("whatsappPrefill"));
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${prefill}`;

  return (
    <section className="bg-foreground text-background py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <ScrollReveal>
          <p className="text-accent text-[11px] font-mono tracking-[0.2em] uppercase mb-4">
            {t("eyebrow")}
          </p>
          <h2 className="font-serif italic text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-[1.1]">
            {t.rich("title", {
              accent: (chunks) => <span className="text-accent">{chunks}</span>,
              br: () => <br />,
            })}
          </h2>
          <p className="mt-6 text-background/50 text-base sm:text-lg leading-relaxed max-w-xl mx-auto">
            {t("subtitle")}
          </p>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <div className="mt-10 flex flex-col items-center gap-5">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2.5 rounded-full bg-[#25D366] px-10 py-4.5 text-base font-semibold text-white shadow-lg shadow-[#25D366]/20 hover:shadow-xl hover:shadow-[#25D366]/30 hover:bg-[#22c55e] hover:-translate-y-px transition-all active:scale-[0.97]"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 shrink-0">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              {t("cta")}
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="opacity-70 group-hover:translate-x-0.5 transition-transform rtl:-scale-x-100">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>

            <div className="flex flex-col sm:flex-row items-center gap-3 text-background/40 text-[13px]">
              <span>contact@tadnun.ma</span>
              <span className="hidden sm:inline">·</span>
              <span>+212 632 431 557</span>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={400}>
          <div className="mt-16 pt-10 border-t border-background/10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-background/30 text-[13px]">
            {["bar1", "bar2", "bar3", "bar4", "bar5"].map((key) => (
              <span key={key}>{t(key)}</span>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
