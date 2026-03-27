import type { ReactNode } from "react";

interface IconBoxProps {
  children: ReactNode;
  /** Size variant */
  size?: "sm" | "md" | "lg";
  /** Shape — rounded-lg (default) or full circle */
  shape?: "rounded" | "circle";
  /** Whether to animate on parent group hover */
  hoverAccent?: boolean;
  className?: string;
}

const sizeClasses = {
  sm: "w-9 h-9",
  md: "w-10 h-10",
  lg: "w-11 h-11",
} as const;

const shapeClasses = {
  rounded: "rounded-xl",
  circle: "rounded-full",
} as const;

export function IconBox({
  children,
  size = "md",
  shape = "rounded",
  hoverAccent = false,
  className = "",
}: IconBoxProps) {
  const hover = hoverAccent
    ? "group-hover:bg-accent/8 group-hover:text-accent/60 group-hover:scale-110 transition-all duration-200"
    : "transition-colors";

  return (
    <div
      className={`${sizeClasses[size]} ${shapeClasses[shape]} bg-foreground/[0.04] flex items-center justify-center text-foreground/50 shrink-0 ${hover} ${className}`}
    >
      {children}
    </div>
  );
}
