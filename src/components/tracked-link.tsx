"use client";

import { trackEvent } from "@/lib/analytics";

/**
 * An anchor tag that fires a tracking event on click.
 * Use this in Server Components where you can't add onClick directly.
 */
export function TrackedLink({
  href,
  event,
  params,
  className,
  children,
}: {
  href: string;
  event: string;
  params?: Record<string, string | number | boolean | undefined>;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      onClick={() => trackEvent(event, params)}
      className={className}
    >
      {children}
    </a>
  );
}
