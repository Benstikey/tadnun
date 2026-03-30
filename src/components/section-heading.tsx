import type { ReactNode } from "react";

interface SectionHeadingProps {
  /** Small uppercase label above the title */
  eyebrow?: string;
  /** Main heading text or JSX */
  title: ReactNode;
  /** Optional paragraph below the title */
  subtitle?: string;
  /** Heading element — defaults to h2 */
  as?: "h1" | "h2" | "h3";
  /** HTML id for aria-labelledby linking */
  id?: string;
  /** Size variant */
  size?: "sm" | "md" | "lg" | "xl";
  /** Eyebrow color — accent (default) or muted */
  eyebrowColor?: "accent" | "muted";
  /** Max width on subtitle */
  subtitleMaxWidth?: string;
}

const sizeClasses = {
  sm: "text-2xl sm:text-3xl",
  md: "text-3xl sm:text-4xl",
  lg: "text-3xl sm:text-4xl lg:text-5xl",
  xl: "text-4xl sm:text-5xl lg:text-6xl",
} as const;

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  as: Tag = "h2",
  id,
  size = "md",
  eyebrowColor = "accent",
  subtitleMaxWidth = "max-w-lg",
}: SectionHeadingProps) {
  const eyebrowCls =
    eyebrowColor === "accent"
      ? "text-accent text-[11px] font-mono tracking-[0.2em] uppercase mb-2"
      : "text-background/40 text-[11px] font-mono tracking-[0.2em] uppercase mb-2";

  return (
    <div>
      {eyebrow && <p className={eyebrowCls}>{eyebrow}</p>}
      <Tag
        id={id}
        className={`font-serif italic ${sizeClasses[size]} tracking-tight leading-[1.1]`}
      >
        {title}
      </Tag>
      {subtitle && (
        <p className={`mt-4 text-muted text-base leading-relaxed ${subtitleMaxWidth}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
