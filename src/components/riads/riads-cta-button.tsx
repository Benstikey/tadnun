import { useLocale } from "next-intl";

interface Props {
  label: string;
  variant?: "primary" | "outline";
}

export function RiadsCtaButton({ label, variant = "primary" }: Props) {
  const locale = useLocale();
  const href = `/${locale}/contact?sector=tourism`;

  if (variant === "outline") {
    return (
      <a
        href={href}
        className="group inline-flex items-center gap-2 text-sm font-semibold text-foreground border border-border rounded-full px-6 py-3 hover:border-foreground/30 hover:bg-foreground/[0.04] transition-all"
      >
        {label}
        <svg width="13" height="13" viewBox="0 0 16 16" fill="none" className="rtl:-scale-x-100 transition-transform group-hover:translate-x-0.5">
          <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </a>
    );
  }

  return (
    <a
      href={href}
      className="group inline-flex items-center gap-2 rounded-full bg-accent text-white px-8 py-3.5 text-[14px] font-semibold shadow-lg shadow-accent/20 hover:shadow-xl hover:shadow-accent/30 active:scale-[0.97] transition-all duration-200 hover:-translate-y-0.5"
    >
      {label}
      <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="rtl:-scale-x-100 transition-transform duration-200 group-hover:translate-x-0.5">
        <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </a>
  );
}
