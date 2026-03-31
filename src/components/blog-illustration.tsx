/**
 * Sector-specific abstract illustrations for blog cards.
 * Pure SVG — no image files, zero load time, scales perfectly.
 * Each sector gets a unique geometric composition inspired by
 * Moroccan zellige patterns + the sector's visual identity.
 */

const SECTOR_VISUALS: Record<string, (props: { className?: string }) => React.ReactElement> = {
  agriculture: ({ className }) => (
    <svg viewBox="0 0 200 140" fill="none" className={className}>
      {/* Field rows */}
      <path d="M20 90 Q50 70 80 90 Q110 110 140 90 Q170 70 190 90" stroke="currentColor" strokeWidth="1" opacity="0.1" />
      <path d="M20 100 Q50 80 80 100 Q110 120 140 100 Q170 80 190 100" stroke="currentColor" strokeWidth="1" opacity="0.07" />
      <path d="M20 110 Q50 90 80 110 Q110 130 140 110 Q170 90 190 110" stroke="currentColor" strokeWidth="1" opacity="0.05" />
      {/* Sun */}
      <circle cx="155" cy="35" r="18" fill="var(--accent, #d4453b)" opacity="0.12" />
      <circle cx="155" cy="35" r="12" fill="var(--accent, #d4453b)" opacity="0.08" />
      {/* Sprout */}
      <path d="M70 85 Q70 60 85 50" stroke="currentColor" strokeWidth="1.5" opacity="0.15" fill="none" />
      <path d="M70 75 Q55 65 60 50" stroke="currentColor" strokeWidth="1.5" opacity="0.12" fill="none" />
      <circle cx="70" cy="86" r="2" fill="currentColor" opacity="0.12" />
    </svg>
  ),

  restaurants: ({ className }) => (
    <svg viewBox="0 0 200 140" fill="none" className={className}>
      {/* Plate */}
      <ellipse cx="100" cy="80" rx="50" ry="14" stroke="currentColor" strokeWidth="1" opacity="0.1" />
      <ellipse cx="100" cy="78" rx="40" ry="10" stroke="currentColor" strokeWidth="0.8" opacity="0.07" />
      {/* Steam wisps */}
      <path d="M85 55 Q83 45 88 38" stroke="var(--accent, #d4453b)" strokeWidth="1.2" opacity="0.15" strokeLinecap="round" fill="none" />
      <path d="M100 50 Q98 40 103 32" stroke="var(--accent, #d4453b)" strokeWidth="1.2" opacity="0.12" strokeLinecap="round" fill="none" />
      <path d="M115 55 Q113 45 118 38" stroke="var(--accent, #d4453b)" strokeWidth="1.2" opacity="0.1" strokeLinecap="round" fill="none" />
      {/* Star rating dots */}
      <circle cx="75" cy="108" r="2.5" fill="var(--accent, #d4453b)" opacity="0.2" />
      <circle cx="87" cy="108" r="2.5" fill="var(--accent, #d4453b)" opacity="0.2" />
      <circle cx="99" cy="108" r="2.5" fill="var(--accent, #d4453b)" opacity="0.2" />
      <circle cx="111" cy="108" r="2.5" fill="var(--accent, #d4453b)" opacity="0.15" />
      <circle cx="123" cy="108" r="2.5" fill="currentColor" opacity="0.06" />
    </svg>
  ),

  tourism: ({ className }) => (
    <svg viewBox="0 0 200 140" fill="none" className={className}>
      {/* Archway — riad / medina door */}
      <path d="M65 120 L65 55 Q65 30 100 30 Q135 30 135 55 L135 120" stroke="currentColor" strokeWidth="1.2" opacity="0.12" />
      <path d="M75 120 L75 60 Q75 40 100 40 Q125 40 125 60 L125 120" stroke="currentColor" strokeWidth="0.8" opacity="0.08" />
      {/* Zellige star at top */}
      <path d="M100 48 L103 54 L109 54 L104 58 L106 64 L100 60 L94 64 L96 58 L91 54 L97 54 Z" fill="var(--accent, #d4453b)" opacity="0.15" />
      {/* Steps */}
      <line x1="70" y1="120" x2="130" y2="120" stroke="currentColor" strokeWidth="0.8" opacity="0.08" />
      <line x1="60" y1="125" x2="140" y2="125" stroke="currentColor" strokeWidth="0.8" opacity="0.06" />
    </svg>
  ),

  healthcare: ({ className }) => (
    <svg viewBox="0 0 200 140" fill="none" className={className}>
      {/* Pulse line */}
      <path d="M20 75 L60 75 L70 55 L80 95 L90 65 L100 80 L110 75 L180 75" stroke="var(--accent, #d4453b)" strokeWidth="1.2" opacity="0.15" strokeLinecap="round" strokeLinejoin="round" />
      {/* Cross */}
      <rect x="93" y="30" width="14" height="40" rx="2" fill="currentColor" opacity="0.06" />
      <rect x="80" y="43" width="40" height="14" rx="2" fill="currentColor" opacity="0.06" />
      {/* Clock — appointment */}
      <circle cx="155" cy="100" r="16" stroke="currentColor" strokeWidth="0.8" opacity="0.08" />
      <line x1="155" y1="100" x2="155" y2="90" stroke="currentColor" strokeWidth="1" opacity="0.1" />
      <line x1="155" y1="100" x2="163" y2="103" stroke="currentColor" strokeWidth="1" opacity="0.1" />
    </svg>
  ),

  retail: ({ className }) => (
    <svg viewBox="0 0 200 140" fill="none" className={className}>
      {/* Storefront */}
      <rect x="50" y="50" width="100" height="65" rx="2" stroke="currentColor" strokeWidth="1" opacity="0.1" />
      {/* Awning */}
      <path d="M45 50 Q62 38 80 50 Q97 38 115 50 Q132 38 155 50" stroke="var(--accent, #d4453b)" strokeWidth="1.2" opacity="0.15" fill="none" />
      {/* Door */}
      <rect x="85" y="80" width="30" height="35" rx="1" stroke="currentColor" strokeWidth="0.8" opacity="0.08" />
      {/* Window */}
      <rect x="58" y="62" width="20" height="15" rx="1" stroke="currentColor" strokeWidth="0.8" opacity="0.07" />
      <rect x="122" y="62" width="20" height="15" rx="1" stroke="currentColor" strokeWidth="0.8" opacity="0.07" />
      {/* Phone notification */}
      <rect x="155" y="28" width="24" height="40" rx="4" stroke="currentColor" strokeWidth="0.8" opacity="0.1" />
      <circle cx="167" cy="33" r="3" fill="var(--accent, #d4453b)" opacity="0.2" />
    </svg>
  ),

  education: ({ className }) => (
    <svg viewBox="0 0 200 140" fill="none" className={className}>
      {/* Book */}
      <path d="M60 95 L100 80 L140 95" stroke="currentColor" strokeWidth="1.2" opacity="0.12" fill="none" />
      <path d="M60 95 L60 55 Q80 45 100 55 L100 80" stroke="currentColor" strokeWidth="1" opacity="0.1" fill="none" />
      <path d="M140 95 L140 55 Q120 45 100 55 L100 80" stroke="currentColor" strokeWidth="1" opacity="0.1" fill="none" />
      {/* Lines on page */}
      <line x1="70" y1="65" x2="95" y2="60" stroke="currentColor" strokeWidth="0.6" opacity="0.06" />
      <line x1="72" y1="72" x2="93" y2="67" stroke="currentColor" strokeWidth="0.6" opacity="0.05" />
      {/* Graduation cap */}
      <path d="M100 30 L125 42 L100 54 L75 42 Z" fill="currentColor" opacity="0.06" />
      <line x1="125" y1="42" x2="125" y2="58" stroke="currentColor" strokeWidth="0.8" opacity="0.08" />
      <circle cx="125" cy="60" r="2" fill="var(--accent, #d4453b)" opacity="0.15" />
    </svg>
  ),

  realestate: ({ className }) => (
    <svg viewBox="0 0 200 140" fill="none" className={className}>
      {/* Buildings skyline */}
      <rect x="40" y="55" width="25" height="65" stroke="currentColor" strokeWidth="0.8" opacity="0.08" />
      <rect x="70" y="35" width="30" height="85" stroke="currentColor" strokeWidth="0.8" opacity="0.1" />
      <rect x="105" y="50" width="22" height="70" stroke="currentColor" strokeWidth="0.8" opacity="0.07" />
      <rect x="132" y="60" width="28" height="60" stroke="currentColor" strokeWidth="0.8" opacity="0.09" />
      {/* Windows */}
      {[45, 55, 65].map((y) => (
        <g key={y}>
          <rect x="76" y={y} width="7" height="5" fill="currentColor" opacity="0.05" />
          <rect x="87" y={y} width="7" height="5" fill="currentColor" opacity="0.05" />
        </g>
      ))}
      {/* Pin */}
      <circle cx="85" cy="25" r="6" fill="var(--accent, #d4453b)" opacity="0.15" />
      <circle cx="85" cy="25" r="2.5" fill="white" opacity="0.6" />
    </svg>
  ),

  logistics: ({ className }) => (
    <svg viewBox="0 0 200 140" fill="none" className={className}>
      {/* Route line */}
      <path d="M30 100 Q60 60 100 70 Q140 80 170 40" stroke="var(--accent, #d4453b)" strokeWidth="1.2" opacity="0.12" strokeDasharray="4 3" fill="none" />
      {/* Waypoints */}
      <circle cx="30" cy="100" r="4" fill="currentColor" opacity="0.1" />
      <circle cx="100" cy="70" r="4" fill="currentColor" opacity="0.08" />
      <circle cx="170" cy="40" r="5" fill="var(--accent, #d4453b)" opacity="0.15" />
      {/* Package */}
      <rect x="82" y="90" width="20" height="18" rx="1.5" stroke="currentColor" strokeWidth="0.8" opacity="0.1" />
      <line x1="82" y1="96" x2="102" y2="96" stroke="currentColor" strokeWidth="0.6" opacity="0.07" />
      <line x1="92" y1="90" x2="92" y2="108" stroke="currentColor" strokeWidth="0.6" opacity="0.07" />
      {/* Truck */}
      <rect x="140" y="85" width="28" height="16" rx="2" stroke="currentColor" strokeWidth="0.8" opacity="0.1" />
      <rect x="130" y="90" width="12" height="11" rx="1" stroke="currentColor" strokeWidth="0.8" opacity="0.08" />
      <circle cx="140" cy="104" r="3.5" stroke="currentColor" strokeWidth="0.8" opacity="0.1" />
      <circle cx="160" cy="104" r="3.5" stroke="currentColor" strokeWidth="0.8" opacity="0.1" />
    </svg>
  ),
};

/** Fallback for articles without a sector */
function DefaultIllustration({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 140" fill="none" className={className}>
      {/* Zellige-inspired pattern */}
      <path d="M100 30 L120 50 L100 70 L80 50 Z" stroke="currentColor" strokeWidth="1" opacity="0.1" />
      <path d="M100 50 L110 60 L100 70 L90 60 Z" fill="var(--accent, #d4453b)" opacity="0.08" />
      <circle cx="100" cy="55" r="2" fill="var(--accent, #d4453b)" opacity="0.15" />
      {/* Abstract lines */}
      <line x1="40" y1="95" x2="160" y2="95" stroke="currentColor" strokeWidth="0.6" opacity="0.06" />
      <line x1="50" y1="105" x2="150" y2="105" stroke="currentColor" strokeWidth="0.6" opacity="0.05" />
      <line x1="60" y1="115" x2="140" y2="115" stroke="currentColor" strokeWidth="0.6" opacity="0.04" />
    </svg>
  );
}

export function BlogIllustration({
  sector,
  className = "w-full h-full text-foreground",
}: {
  sector?: string | null;
  className?: string;
}) {
  const Visual = sector && SECTOR_VISUALS[sector] ? SECTOR_VISUALS[sector] : DefaultIllustration;
  return <Visual className={className} />;
}
