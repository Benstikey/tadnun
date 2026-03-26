export const validSectors = [
  "agriculture", "restaurants", "tourism", "healthcare",
  "retail", "education", "realestate", "logistics",
] as const;

export type SectorKey = (typeof validSectors)[number];

/**
 * Extract and validate sector key from search params (server components).
 * Returns the key if valid, null otherwise.
 */
export function getSectorFromParams(
  searchParams: Record<string, string | string[] | undefined> | undefined
): SectorKey | null {
  if (!searchParams) return null;
  const raw = typeof searchParams.sector === "string" ? searchParams.sector : undefined;
  if (!raw) return null;
  return validSectors.includes(raw as SectorKey) ? (raw as SectorKey) : null;
}
