"use client";

interface SectorSvgProps {
  size?: number;
  strokeWidth?: number;
  className?: string;
}

/* ── Agriculture — Olive branch with fruit ── */
export function OliveBranch({ size = 24, className }: SectorSvgProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      {/* Main branch — gentle curve */}
      <path
        d="M4 20C6 16 10 10 20 4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      {/* Leaf pair 1 */}
      <path
        d="M8 15c-1.5-1-1.2-3.2.5-3.5 1.7-.3 2.8 1.5 1.5 3"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11 14.5c1.5-.8 3.2-.2 3 1.5-.2 1.7-2.2 2-3.2.8"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Leaf pair 2 */}
      <path
        d="M13 10c-1.2-1.2-.6-3 1-3.2 1.6-.2 2.5 1.5 1.4 2.8"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.5 10.5c1.3-1 3-.5 3 1s-1.8 2.2-3 1.2"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Olive fruit */}
      <ellipse
        cx="9.5"
        cy="11.5"
        rx="1.2"
        ry="1.5"
        transform="rotate(-20 9.5 11.5)"
        stroke="currentColor"
        strokeWidth="1.3"
        fill="currentColor"
      />
      <ellipse
        cx="14.5"
        cy="7.5"
        rx="1.1"
        ry="1.4"
        transform="rotate(-30 14.5 7.5)"
        stroke="currentColor"
        strokeWidth="1.3"
        fill="currentColor"
      />
    </svg>
  );
}

/* ── Restaurants — Tagine pot ── */
export function Tagine({ size = 24, className }: SectorSvgProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      {/* Conical lid */}
      <path
        d="M5 17C5 17 7 9 12 5c5 4 7 12 7 12"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Lid knob */}
      <circle cx="12" cy="4" r="1" fill="currentColor" />
      {/* Base plate */}
      <path
        d="M3 17h18"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M4 17c0 1.5 1.5 3 8 3s8-1.5 8-3"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Steam wisps */}
      <path
        d="M10 2.5c0-.8.5-1 .5-1"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
      />
      <path
        d="M14 2c0-.6.4-.8.4-.8"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
      />
    </svg>
  );
}

/* ── Tourism — Moroccan keyhole arch ── */
export function RiadArch({ size = 24, className }: SectorSvgProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      {/* Outer arch frame */}
      <path
        d="M5 21V8a7 7 0 0 1 14 0v13"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Inner keyhole — horseshoe arch + narrow passage */}
      <path
        d="M9 21v-5.5a3 3 0 0 1 6 0V21"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Decorative zellige detail at apex */}
      <circle cx="12" cy="6" r="0.8" fill="currentColor" />
      <circle cx="10" cy="7.5" r="0.5" fill="currentColor" />
      <circle cx="14" cy="7.5" r="0.5" fill="currentColor" />
      {/* Ground line */}
      <path
        d="M3 21h18"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

/* ── Healthcare — Crescent + pulse ── */
export function CrescentPulse({ size = 24, className }: SectorSvgProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      {/* Crescent moon — Moroccan identity */}
      <path
        d="M7 4a7 7 0 1 0 0 12 5.5 5.5 0 0 1 0-12Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Heartbeat / pulse line running through */}
      <path
        d="M2 14h4l1.5-3 2 6 2-8 1.5 5H22"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ── Retail — Moroccan lantern (fanous) ── */
export function SoukLantern({ size = 24, className }: SectorSvgProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      {/* Hanging hook */}
      <path
        d="M12 1v2"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      {/* Top cap */}
      <path
        d="M9 3h6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      {/* Lantern body — onion/diamond shape */}
      <path
        d="M9 3c-1 2-2 5-2 8 0 2 .8 3.5 2 4.5.8.7 1.8 1 3 1s2.2-.3 3-1c1.2-1 2-2.5 2-4.5 0-3-1-6-2-8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Decorative geometric pattern — zellige-inspired */}
      <path
        d="M10 7l2 2.5L14 7"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10 11l2 2.5 2-2.5"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Bottom finial */}
      <path
        d="M12 16.5V19"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <circle cx="12" cy="20" r="1" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  );
}

/* ── Education — Book with Moroccan star ── */
export function BookStar({ size = 24, className }: SectorSvgProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      {/* Open book */}
      <path
        d="M2 19V7c0-1 .8-2 2-2 2 0 5 .5 8 2.5C14.5 5.5 18 5 20 5c1.2 0 2 1 2 2v12"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Center spine */}
      <path
        d="M12 7.5V19"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      {/* Bottom binding curve */}
      <path
        d="M2 19c2.5.8 6 1.5 10 0 4 1.5 7.5.8 10 0"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* 5-pointed Moroccan star — pentagram */}
      <path
        d="M12 1l.9 2.8h2.9l-2.35 1.7.9 2.8L12 6.6l-2.35 1.7.9-2.8L8.2 3.8h2.9z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ── Real Estate — Minaret with arch ── */
export function Minaret({ size = 24, className }: SectorSvgProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      {/* Tower body */}
      <path
        d="M8 21V7l4-5 4 5v14"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Tier divisions */}
      <path d="M8 12h8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M8 7.5h8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      {/* Arch window */}
      <path
        d="M10.5 21v-4a1.5 1.5 0 0 1 3 0v4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Upper arch window (smaller) */}
      <path
        d="M11 12v-1.5a1 1 0 0 1 2 0V12"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Finial at top */}
      <circle cx="12" cy="1.5" r="0.8" fill="currentColor" />
      {/* Ground */}
      <path d="M5 21h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      {/* Flanking low building */}
      <path
        d="M3 21v-5h5M16 21v-5h5"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ── Logistics — Cargo ship with route ── */
export function CargoRoute({ size = 24, className }: SectorSvgProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      {/* Ship hull */}
      <path
        d="M2 16l2 3h16l2-3"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Ship deck / cabin */}
      <path
        d="M6 16v-4h12v4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Cargo containers */}
      <rect x="8" y="8" width="3.5" height="4" rx="0.5" stroke="currentColor" strokeWidth="1.2" />
      <rect x="12.5" y="8" width="3.5" height="4" rx="0.5" stroke="currentColor" strokeWidth="1.2" />
      {/* Mast / antenna */}
      <path d="M12 8V5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      {/* Trade route — dashed curve */}
      <path
        d="M1 22c3-2 7-4 11-4s8 2 11 4"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        strokeDasharray="2 2.5"
      />
      {/* Route dots — origin & destination */}
      <circle cx="3" cy="21" r="1" fill="currentColor" />
      <circle cx="21" cy="21" r="1" fill="currentColor" />
    </svg>
  );
}
