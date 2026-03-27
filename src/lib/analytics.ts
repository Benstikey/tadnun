/**
 * Push a custom event to the GTM dataLayer.
 * Safe to call server-side (no-ops when window is undefined).
 */
export function trackEvent(
  eventName: string,
  params?: Record<string, string | number | boolean | undefined>,
) {
  if (typeof window === "undefined") return;

  const w = window as typeof window & { dataLayer?: Record<string, unknown>[] };
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push({ event: eventName, ...params });
}
