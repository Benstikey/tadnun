/**
 * Sector-specific editorial illustrations for blog cards.
 * Rich, layered SVG compositions — Moroccan-inspired geometry
 * meets editorial magazine aesthetics.
 */

import type React from "react";

function Agriculture({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 200" fill="none" className={className}>
      {/* Background pattern — terraced fields */}
      <path d="M0 160 Q100 130 200 150 Q300 170 400 140 L400 200 L0 200 Z" fill="currentColor" opacity="0.03" />
      <path d="M0 170 Q100 145 200 160 Q300 175 400 155 L400 200 L0 200 Z" fill="currentColor" opacity="0.025" />
      <path d="M0 180 Q100 160 200 175 Q300 185 400 170 L400 200 L0 200 Z" fill="currentColor" opacity="0.02" />

      {/* Zellige-inspired sun */}
      <g transform="translate(310, 50)">
        <circle r="28" fill="var(--accent, #d4453b)" opacity="0.08" />
        <circle r="20" fill="var(--accent, #d4453b)" opacity="0.06" />
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
          <line
            key={angle}
            x1="0" y1="0"
            x2={Math.cos(angle * Math.PI / 180) * 38}
            y2={Math.sin(angle * Math.PI / 180) * 38}
            stroke="var(--accent, #d4453b)"
            strokeWidth="0.6"
            opacity="0.1"
          />
        ))}
      </g>

      {/* Argan tree — stylized */}
      <g transform="translate(100, 60)">
        <line x1="0" y1="80" x2="0" y2="30" stroke="currentColor" strokeWidth="2.5" opacity="0.12" />
        <line x1="0" y1="50" x2="-20" y2="30" stroke="currentColor" strokeWidth="1.5" opacity="0.1" />
        <line x1="0" y1="45" x2="18" y2="25" stroke="currentColor" strokeWidth="1.5" opacity="0.1" />
        <circle cx="0" cy="20" r="25" fill="currentColor" opacity="0.04" />
        <circle cx="-15" cy="28" r="15" fill="currentColor" opacity="0.035" />
        <circle cx="14" cy="22" r="16" fill="currentColor" opacity="0.03" />
        {/* Fruit dots */}
        <circle cx="-8" cy="18" r="2.5" fill="var(--accent, #d4453b)" opacity="0.2" />
        <circle cx="6" cy="25" r="2" fill="var(--accent, #d4453b)" opacity="0.15" />
        <circle cx="2" cy="12" r="2" fill="var(--accent, #d4453b)" opacity="0.18" />
      </g>

      {/* Field rows with detail */}
      <g opacity="0.08">
        <path d="M20 145 Q60 135 100 140 Q140 145 180 138" stroke="currentColor" strokeWidth="1.2" />
        <path d="M20 155 Q60 145 100 150 Q140 155 180 148" stroke="currentColor" strokeWidth="1" />
        <path d="M200 140 Q240 130 280 135 Q320 140 360 132" stroke="currentColor" strokeWidth="1.2" />
        <path d="M200 150 Q240 140 280 145 Q320 150 360 142" stroke="currentColor" strokeWidth="1" />
      </g>

      {/* Cooperative badge */}
      <g transform="translate(220, 85)">
        <rect x="-35" y="-18" width="70" height="36" rx="18" fill="currentColor" fillOpacity="0.04" stroke="currentColor" strokeWidth="0.6" strokeOpacity="0.08" />
        <text x="0" y="5" textAnchor="middle" fontSize="9" fontFamily="system-ui" fill="currentColor" opacity="0.15" fontWeight="600">COOP</text>
      </g>

      {/* Scattered dots — seeds */}
      {[
        [50, 120], [70, 135], [150, 125], [170, 140], [250, 115], [280, 130],
        [330, 120], [350, 135], [190, 145], [85, 110],
      ].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="1.5" fill="currentColor" opacity={0.04 + (i % 3) * 0.02} />
      ))}
    </svg>
  );
}

function Restaurants({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 200" fill="none" className={className}>
      {/* Ground plane */}
      <rect x="0" y="170" width="400" height="30" fill="currentColor" opacity="0.02" />
      <line x1="0" y1="170" x2="400" y2="170" stroke="currentColor" strokeWidth="0.5" opacity="0.06" />

      {/* ── Google Maps card (center piece) ── */}
      <g transform="translate(130, 18)">
        {/* Card container */}
        <rect x="0" y="0" width="140" height="145" rx="10" fill="currentColor" fillOpacity="0.03" stroke="currentColor" strokeWidth="1" strokeOpacity="0.08" />
        {/* Map area with streets */}
        <rect x="6" y="6" width="128" height="75" rx="6" fill="currentColor" opacity="0.02" />
        {/* Street grid */}
        <line x1="6" y1="40" x2="134" y2="40" stroke="currentColor" strokeWidth="0.5" opacity="0.05" />
        <line x1="6" y1="55" x2="134" y2="55" stroke="currentColor" strokeWidth="0.4" opacity="0.04" />
        <line x1="50" y1="6" x2="50" y2="81" stroke="currentColor" strokeWidth="0.5" opacity="0.05" />
        <line x1="95" y1="6" x2="95" y2="81" stroke="currentColor" strokeWidth="0.4" opacity="0.04" />
        {/* Diagonal avenue */}
        <line x1="6" y1="20" x2="90" y2="81" stroke="currentColor" strokeWidth="0.6" opacity="0.04" />
        {/* Map pin — terracotta */}
        <g transform="translate(70, 32)">
          <path d="M0 -14 C-8 -14 -12 -8 -12 -3 C-12 5 0 14 0 14 C0 14 12 5 12 -3 C12 -8 8 -14 0 -14Z" fill="var(--accent, #d4453b)" fillOpacity="0.3" />
          <path d="M0 -14 C-8 -14 -12 -8 -12 -3 C-12 5 0 14 0 14 C0 14 12 5 12 -3 C12 -8 8 -14 0 -14Z" stroke="var(--accent, #d4453b)" strokeWidth="1" strokeOpacity="0.5" fill="none" />
          <circle cx="0" cy="-4" r="4" fill="white" fillOpacity="0.5" />
        </g>
        {/* Secondary pins */}
        <circle cx="30" cy="30" r="3" fill="currentColor" fillOpacity="0.08" />
        <circle cx="110" cy="60" r="3" fill="currentColor" fillOpacity="0.08" />
        <circle cx="120" cy="25" r="2.5" fill="currentColor" fillOpacity="0.06" />

        {/* Business info area */}
        <g transform="translate(12, 90)">
          {/* Restaurant name placeholder */}
          <rect x="0" y="0" width="80" height="7" rx="2" fill="currentColor" opacity="0.08" />
          {/* Category */}
          <rect x="0" y="12" width="50" height="5" rx="1.5" fill="currentColor" opacity="0.04" />
          {/* Star rating row */}
          <g transform="translate(0, 24)">
            {[0, 1, 2, 3, 4].map((i) => (
              <polygon
                key={i}
                points={`${i * 13 + 5},0 ${i * 13 + 6.8},3.5 ${i * 13 + 10.5},3.8 ${i * 13 + 7.5},6.5 ${i * 13 + 8.3},10 ${i * 13 + 5},8 ${i * 13 + 1.7},10 ${i * 13 + 2.5},6.5 ${i * 13 - 0.5},3.8 ${i * 13 + 3.2},3.5`}
                fill="var(--accent, #d4453b)"
                fillOpacity={i < 4 ? 0.3 : 0.08}
              />
            ))}
            <text x="70" y="8" fontSize="8" fill="currentColor" opacity="0.2" fontWeight="600">4.6</text>
            <text x="84" y="8" fontSize="7" fill="currentColor" opacity="0.12">(287)</text>
          </g>
          {/* Open / hours */}
          <g transform="translate(0, 40)">
            <circle cx="3" cy="3" r="3" fill="#22c55e" fillOpacity="0.25" />
            <rect x="10" y="0.5" width="35" height="5" rx="1.5" fill="currentColor" opacity="0.04" />
          </g>
        </g>
      </g>

      {/* ── Phone with Google search (left side) ── */}
      <g transform="translate(30, 30)">
        <rect x="0" y="0" width="52" height="100" rx="8" fill="currentColor" fillOpacity="0.03" stroke="currentColor" strokeWidth="0.8" strokeOpacity="0.08" />
        {/* Notch */}
        <rect x="16" y="2" width="20" height="4" rx="2" fill="currentColor" opacity="0.04" />
        {/* Search bar */}
        <rect x="5" y="12" width="42" height="12" rx="6" fill="currentColor" opacity="0.03" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.06" />
        <text x="12" y="21" fontSize="5.5" fill="currentColor" opacity="0.12">restaurant nearby</text>
        {/* Search icon */}
        <circle cx="42" cy="18" r="3" stroke="currentColor" strokeWidth="0.6" strokeOpacity="0.1" fill="none" />
        {/* Result cards */}
        {[0, 1, 2].map((i) => (
          <g key={i} transform={`translate(5, ${30 + i * 22})`}>
            <rect x="0" y="0" width="42" height="18" rx="3" fill="currentColor" fillOpacity={i === 0 ? "0.04" : "0.02"} stroke={i === 0 ? "var(--accent, #d4453b)" : "currentColor"} strokeWidth="0.5" strokeOpacity={i === 0 ? 0.2 : 0.04} />
            <rect x="3" y="3" width="24" height="3.5" rx="1" fill="currentColor" opacity={i === 0 ? 0.1 : 0.05} />
            <rect x="3" y="9" width="16" height="2.5" rx="1" fill="currentColor" opacity="0.03" />
            {i === 0 && <rect x="3" y="13" width="10" height="2" rx="1" fill="var(--accent, #d4453b)" fillOpacity="0.12" />}
          </g>
        ))}
      </g>

      {/* ── Review bubble (right side) ── */}
      <g transform="translate(290, 25)">
        <rect x="0" y="0" width="90" height="60" rx="8" fill="currentColor" fillOpacity="0.03" stroke="currentColor" strokeWidth="0.8" strokeOpacity="0.07" />
        {/* Bubble tail */}
        <path d="M20 60 L15 70 L30 60" fill="currentColor" fillOpacity="0.03" stroke="currentColor" strokeWidth="0.8" strokeOpacity="0.07" />
        {/* Stars row */}
        <g transform="translate(8, 10)">
          {[0, 1, 2, 3, 4].map((i) => (
            <polygon
              key={i}
              points={`${i * 11 + 4},0 ${i * 11 + 5.5},3 ${i * 11 + 8.5},3.2 ${i * 11 + 6},5.2 ${i * 11 + 6.7},8.2 ${i * 11 + 4},6.5 ${i * 11 + 1.3},8.2 ${i * 11 + 2},5.2 ${i * 11 - 0.5},3.2 ${i * 11 + 2.5},3`}
              fill="var(--accent, #d4453b)"
              fillOpacity={0.3}
            />
          ))}
        </g>
        {/* Review text lines */}
        <rect x="8" y="25" width="70" height="4" rx="1.5" fill="currentColor" opacity="0.06" />
        <rect x="8" y="33" width="55" height="4" rx="1.5" fill="currentColor" opacity="0.04" />
        <rect x="8" y="41" width="40" height="4" rx="1.5" fill="currentColor" opacity="0.03" />
      </g>

      {/* ── Camera / photo icon (right bottom) ── */}
      <g transform="translate(310, 105)">
        <rect x="0" y="8" width="52" height="40" rx="5" fill="currentColor" fillOpacity="0.03" stroke="currentColor" strokeWidth="0.8" strokeOpacity="0.06" />
        {/* Lens */}
        <circle cx="26" cy="28" r="12" stroke="currentColor" strokeWidth="0.8" strokeOpacity="0.08" fill="none" />
        <circle cx="26" cy="28" r="7" stroke="currentColor" strokeWidth="0.6" strokeOpacity="0.06" fill="currentColor" fillOpacity="0.02" />
        {/* Flash */}
        <rect x="16" y="5" width="20" height="6" rx="3" fill="currentColor" fillOpacity="0.04" />
        {/* Photo count badge */}
        <circle cx="48" cy="12" r="8" fill="var(--accent, #d4453b)" fillOpacity="0.2" />
        <text x="48" y="15" textAnchor="middle" fontSize="7" fill="var(--accent, #d4453b)" fillOpacity="0.6" fontWeight="700">+12</text>
      </g>

      {/* ── Tagine silhouette (bottom left, subtle) ── */}
      <g transform="translate(45, 140)">
        <path d="M-18 25 Q0 -8 18 25" stroke="currentColor" strokeWidth="0.8" opacity="0.06" fill="currentColor" fillOpacity="0.015" />
        <ellipse cx="0" cy="28" rx="22" ry="4" fill="currentColor" opacity="0.025" />
        <circle cx="0" cy="3" r="2.5" fill="var(--accent, #d4453b)" opacity="0.1" />
      </g>

      {/* ── Zellige corner detail ── */}
      <g transform="translate(360, 170)" opacity="0.05">
        <path d="M0 0 L10 -10 L20 0 L10 10 Z" stroke="currentColor" strokeWidth="0.8" />
        <path d="M20 0 L30 -10 L40 0 L30 10 Z" stroke="currentColor" strokeWidth="0.8" />
      </g>

      {/* ── Connecting dotted lines between elements ── */}
      <line x1="82" y1="65" x2="130" y2="55" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 3" opacity="0.05" />
      <line x1="270" y1="55" x2="290" y2="50" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 3" opacity="0.05" />
      <line x1="335" y1="85" x2="335" y2="105" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 3" opacity="0.05" />
    </svg>
  );
}

function Tourism({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 200" fill="none" className={className}>
      {/* Riad archway — large, centered */}
      <g transform="translate(200, 20)">
        {/* Outer arch */}
        <path d="M-60 165 L-60 70 Q-60 10 0 10 Q60 10 60 70 L60 165" stroke="currentColor" strokeWidth="1.5" opacity="0.1" />
        {/* Inner arch */}
        <path d="M-45 165 L-45 75 Q-45 25 0 25 Q45 25 45 75 L45 165" stroke="currentColor" strokeWidth="1" opacity="0.07" />
        {/* Keyhole detail */}
        <circle cx="0" cy="55" r="12" stroke="currentColor" strokeWidth="0.8" opacity="0.06" />
        <rect x="-4" y="55" width="8" height="20" fill="currentColor" opacity="0.04" />

        {/* Zellige star — 8-pointed */}
        <g transform="translate(0, 42)">
          {[0, 45, 90, 135].map((angle) => (
            <rect
              key={angle}
              x="-3.5" y="-10"
              width="7" height="20"
              rx="1"
              fill="var(--accent, #d4453b)"
              opacity="0.1"
              transform={`rotate(${angle})`}
            />
          ))}
          <circle r="3" fill="var(--accent, #d4453b)" opacity="0.2" />
        </g>

        {/* Courtyard tiles — floor pattern */}
        <g transform="translate(0, 150)" opacity="0.04">
          {[-40, -20, 0, 20, 40].map((x) => (
            <path key={x} d={`M${x} 0 L${x + 10} -10 L${x + 20} 0 L${x + 10} 10 Z`} stroke="currentColor" strokeWidth="0.6" />
          ))}
        </g>
      </g>

      {/* Palm tree — left */}
      <g transform="translate(60, 40)">
        <line x1="0" y1="140" x2="5" y2="40" stroke="currentColor" strokeWidth="2" opacity="0.07" />
        <path d="M5 45 Q-20 20 -35 30" stroke="currentColor" strokeWidth="1.2" opacity="0.06" fill="none" />
        <path d="M5 42 Q20 15 35 25" stroke="currentColor" strokeWidth="1.2" opacity="0.06" fill="none" />
        <path d="M5 40 Q-10 10 -25 18" stroke="currentColor" strokeWidth="1" opacity="0.05" fill="none" />
        <path d="M5 38 Q15 8 28 15" stroke="currentColor" strokeWidth="1" opacity="0.05" fill="none" />
      </g>

      {/* Booking.com price tag — crossed out */}
      <g transform="translate(330, 60)">
        <rect x="-25" y="-12" width="50" height="24" rx="4" fill="currentColor" fillOpacity="0.04" stroke="currentColor" strokeWidth="0.7" strokeOpacity="0.08" />
        <text x="0" y="4" textAnchor="middle" fontSize="10" fill="currentColor" opacity="0.12" fontWeight="600">15%</text>
        <line x1="-20" y1="0" x2="20" y2="0" stroke="var(--accent, #d4453b)" strokeWidth="1.5" opacity="0.25" />
      </g>

      {/* Stars scattered */}
      {[[30, 30], [350, 30], [370, 100], [50, 160]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="1" fill="currentColor" opacity={0.06 + i * 0.01} />
      ))}
    </svg>
  );
}

function Healthcare({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 200" fill="none" className={className}>
      {/* ECG/Pulse line — spans full width */}
      <path
        d="M0 110 L80 110 L95 110 L105 80 L115 140 L125 60 L135 120 L145 100 L155 110 L400 110"
        stroke="var(--accent, #d4453b)"
        strokeWidth="1.5"
        opacity="0.15"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Faded echo */}
      <path
        d="M0 110 L80 110 L95 110 L105 80 L115 140 L125 60 L135 120 L145 100 L155 110 L400 110"
        stroke="var(--accent, #d4453b)"
        strokeWidth="3"
        opacity="0.04"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Stethoscope — abstract */}
      <g transform="translate(70, 45)">
        <circle cx="0" cy="0" r="18" stroke="currentColor" strokeWidth="1.2" opacity="0.08" />
        <circle cx="0" cy="0" r="10" fill="currentColor" opacity="0.03" />
        <path d="M12 -14 Q40 -30 50 -10 Q55 5 40 10" stroke="currentColor" strokeWidth="1" opacity="0.07" fill="none" />
        <path d="M-12 -14 Q-30 -35 -20 -45" stroke="currentColor" strokeWidth="1" opacity="0.06" fill="none" />
      </g>

      {/* Phone with WhatsApp reminder */}
      <g transform="translate(300, 30)">
        <rect x="-22" y="0" width="44" height="72" rx="8" fill="currentColor" fillOpacity="0.04" stroke="currentColor" strokeWidth="0.8" strokeOpacity="0.08" />
        <rect x="-18" y="8" width="36" height="52" rx="3" fill="currentColor" opacity="0.015" />
        {/* Chat bubble */}
        <rect x="-14" y="14" width="28" height="18" rx="6" fill="#25D366" opacity="0.12" />
        <text x="0" y="26" textAnchor="middle" fontSize="7" fill="#25D366" opacity="0.3" fontWeight="500">RDV 14h</text>
        {/* Checkmark */}
        <path d="M-4 38 L0 42 L8 34" stroke="currentColor" strokeWidth="1.2" opacity="0.1" strokeLinecap="round" strokeLinejoin="round" />
      </g>

      {/* Calendar grid */}
      <g transform="translate(210, 50)" opacity="0.06">
        {[0, 1, 2, 3, 4].map((col) =>
          [0, 1, 2].map((row) => (
            <rect
              key={`${col}-${row}`}
              x={col * 16}
              y={row * 14}
              width="12"
              height="10"
              rx="1.5"
              fill="currentColor"
              opacity={col === 2 && row === 1 ? 0.3 : 0.15}
            />
          ))
        )}
        {/* Highlight one cell */}
        <rect x={2 * 16} y={1 * 14} width="12" height="10" rx="1.5" fill="var(--accent, #d4453b)" opacity="0.2" />
      </g>

      {/* Moroccan cross pattern */}
      <g transform="translate(50, 150)" opacity="0.04">
        <rect x="-2" y="-8" width="4" height="16" fill="currentColor" />
        <rect x="-8" y="-2" width="16" height="4" fill="currentColor" />
      </g>
    </svg>
  );
}

function Retail({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 200" fill="none" className={className}>
      {/* Souk/market stalls perspective */}
      <g opacity="0.06">
        <rect x="30" y="60" width="80" height="100" rx="2" stroke="currentColor" strokeWidth="1" />
        <rect x="120" y="50" width="80" height="110" rx="2" stroke="currentColor" strokeWidth="1" />
        <rect x="210" y="55" width="80" height="105" rx="2" stroke="currentColor" strokeWidth="1" />
        <rect x="300" y="65" width="80" height="95" rx="2" stroke="currentColor" strokeWidth="1" />
      </g>

      {/* Awnings */}
      <path d="M25 60 Q50 48 75 60 Q100 48 115 60" stroke="var(--accent, #d4453b)" strokeWidth="1.2" opacity="0.12" />
      <path d="M115 50 Q140 38 165 50 Q190 38 205 50" stroke="var(--accent, #d4453b)" strokeWidth="1.2" opacity="0.1" />
      <path d="M205 55 Q230 43 255 55 Q280 43 295 55" stroke="var(--accent, #d4453b)" strokeWidth="1.2" opacity="0.08" />
      <path d="M295 65 Q320 53 345 65 Q370 53 385 65" stroke="var(--accent, #d4453b)" strokeWidth="1.2" opacity="0.06" />

      {/* Product shelves */}
      {[80, 95, 110, 125].map((y, i) => (
        <g key={y} opacity={0.04 - i * 0.005}>
          <line x1="135" y1={y} x2="185" y2={y} stroke="currentColor" strokeWidth="0.6" />
          {[140, 152, 164, 176].map((x) => (
            <rect key={x} x={x} y={y - 8} width="8" height="8" rx="1" fill="currentColor" opacity="0.4" />
          ))}
        </g>
      ))}

      {/* WhatsApp catalog — floating phone */}
      <g transform="translate(340, 95)">
        <rect x="-20" y="-30" width="40" height="65" rx="7" fill="currentColor" fillOpacity="0.04" stroke="currentColor" strokeWidth="0.8" strokeOpacity="0.1" />
        {/* Product grid on phone */}
        {[[-12, -20], [2, -20], [-12, -6], [2, -6]].map(([x, y], i) => (
          <rect key={i} x={x} y={y} width="12" height="12" rx="2" fill="currentColor" opacity={0.04 + i * 0.01} />
        ))}
        {/* WhatsApp green */}
        <circle cx="14" cy="-26" r="5" fill="#25D366" opacity="0.2" />
      </g>

      {/* QR code — stylized */}
      <g transform="translate(55, 100)" opacity="0.06">
        {[0, 1, 2, 3, 4, 5].map((row) =>
          [0, 1, 2, 3, 4, 5].map((col) => {
            const filled = (row + col) % 3 !== 1;
            return filled ? (
              <rect key={`${row}-${col}`} x={col * 5} y={row * 5} width="4" height="4" fill="currentColor" />
            ) : null;
          })
        )}
      </g>

      {/* Coin / payment symbol */}
      <g transform="translate(260, 130)">
        <circle r="12" stroke="currentColor" strokeWidth="0.8" opacity="0.07" />
        <text x="0" y="4" textAnchor="middle" fontSize="10" fill="currentColor" opacity="0.08" fontWeight="700">DH</text>
      </g>
    </svg>
  );
}

function Education({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 200" fill="none" className={className}>
      {/* Notebook / open book — large, centered */}
      <g transform="translate(200, 85)">
        {/* Spine */}
        <line x1="0" y1="-45" x2="0" y2="55" stroke="currentColor" strokeWidth="1.5" opacity="0.1" />
        {/* Left page */}
        <path d="M-80 55 L-80 -40 Q-40 -50 0 -45 L0 55 Z" fill="currentColor" fillOpacity="0.025" stroke="currentColor" strokeWidth="0.8" strokeOpacity="0.07" />
        {/* Right page */}
        <path d="M80 55 L80 -40 Q40 -50 0 -45 L0 55 Z" fill="currentColor" fillOpacity="0.02" stroke="currentColor" strokeWidth="0.8" strokeOpacity="0.06" />
        {/* Lines on left page */}
        {[-25, -15, -5, 5, 15, 25, 35].map((y) => (
          <line key={y} x1="-65" y1={y} x2="-10" y2={y - 2} stroke="currentColor" strokeWidth="0.4" opacity="0.05" />
        ))}
        {/* Checkmarks on right page — grading */}
        {[-20, -5, 10, 25].map((y, i) => (
          <g key={y}>
            <line x1="15" y1={y} x2="55" y2={y} stroke="currentColor" strokeWidth="0.4" opacity="0.05" />
            <path
              d={`M60 ${y - 3} L63 ${y} L68 ${y - 6}`}
              stroke={i < 3 ? "var(--accent, #d4453b)" : "currentColor"}
              strokeWidth="1"
              opacity={i < 3 ? 0.2 : 0.06}
              fill="none"
              strokeLinecap="round"
            />
          </g>
        ))}
      </g>

      {/* Graduation cap — floating top right */}
      <g transform="translate(330, 35)">
        <path d="M0 0 L30 12 L0 24 L-30 12 Z" fill="currentColor" opacity="0.06" />
        <line x1="30" y1="12" x2="30" y2="30" stroke="currentColor" strokeWidth="0.8" opacity="0.08" />
        <circle cx="30" cy="32" r="2.5" fill="var(--accent, #d4453b)" opacity="0.2" />
        <rect x="-8" y="-6" width="16" height="6" fill="currentColor" opacity="0.04" />
      </g>

      {/* Parent notification — phone */}
      <g transform="translate(65, 40)">
        <rect x="-16" y="0" width="32" height="52" rx="5" fill="currentColor" fillOpacity="0.035" stroke="currentColor" strokeWidth="0.7" strokeOpacity="0.07" />
        {/* Message bubbles */}
        <rect x="-10" y="10" width="20" height="10" rx="4" fill="#25D366" opacity="0.1" />
        <rect x="-10" y="24" width="16" height="10" rx="4" fill="currentColor" opacity="0.04" />
        {/* Bell icon */}
        <circle cx="12" cy="4" r="4" fill="var(--accent, #d4453b)" opacity="0.18" />
      </g>

      {/* Calendar — enrollment */}
      <g transform="translate(335, 120)" opacity="0.05">
        <rect x="0" y="0" width="45" height="40" rx="3" stroke="currentColor" strokeWidth="1" />
        <line x1="0" y1="10" x2="45" y2="10" stroke="currentColor" strokeWidth="0.6" />
        {[0, 1, 2, 3, 4].map((col) =>
          [0, 1, 2].map((row) => (
            <rect key={`${col}-${row}`} x={3 + col * 8.5} y={14 + row * 9} width="6" height="6" rx="1" fill="currentColor" opacity="0.4" />
          ))
        )}
      </g>
    </svg>
  );
}

function RealEstate({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 200" fill="none" className={className}>
      {/* Casablanca skyline — layered buildings */}
      <g>
        {/* Background buildings */}
        <rect x="20" y="80" width="35" height="100" fill="currentColor" opacity="0.025" />
        <rect x="60" y="60" width="45" height="120" fill="currentColor" opacity="0.03" />
        <rect x="110" y="70" width="30" height="110" fill="currentColor" opacity="0.025" />
        <rect x="145" y="45" width="50" height="135" fill="currentColor" opacity="0.035" />
        <rect x="200" y="55" width="40" height="125" fill="currentColor" opacity="0.03" />
        <rect x="245" y="75" width="35" height="105" fill="currentColor" opacity="0.025" />
        <rect x="285" y="50" width="45" height="130" fill="currentColor" opacity="0.032" />
        <rect x="335" y="65" width="50" height="115" fill="currentColor" opacity="0.028" />

        {/* Windows — scattered on buildings */}
        {[
          [70, 75], [70, 90], [70, 105], [85, 75], [85, 90], [85, 105],
          [155, 60], [155, 75], [155, 90], [170, 60], [170, 75], [170, 90],
          [295, 65], [295, 80], [295, 95], [310, 65], [310, 80], [310, 95],
        ].map(([x, y], i) => (
          <rect key={i} x={x} y={y} width="8" height="6" fill="currentColor" opacity="0.04" rx="0.5" />
        ))}
      </g>

      {/* Hassan II minaret silhouette — landmark */}
      <g transform="translate(170, 10)">
        <rect x="-6" y="0" width="12" height="50" fill="currentColor" opacity="0.06" />
        <rect x="-10" y="40" width="20" height="6" fill="currentColor" opacity="0.04" />
        <path d="M-3 0 L0 -10 L3 0" fill="currentColor" opacity="0.06" />
      </g>

      {/* Location pin — red, prominent */}
      <g transform="translate(310, 30)">
        <path d="M0 28 L-12 10 Q-16 0 -12 -8 Q-6 -18 0 -18 Q6 -18 12 -8 Q16 0 12 10 Z" fill="var(--accent, #d4453b)" opacity="0.12" />
        <circle cx="0" cy="-4" r="5" fill="white" opacity="0.5" />
      </g>

      {/* Virtual tour icon */}
      <g transform="translate(65, 35)">
        <circle r="16" stroke="currentColor" strokeWidth="0.8" opacity="0.07" />
        {/* 360 arrows */}
        <path d="M-10 -4 Q-10 -12 0 -12 Q10 -12 10 -4" stroke="currentColor" strokeWidth="0.8" opacity="0.1" fill="none" />
        <path d="M8 -6 L10 -4 L8 -2" stroke="currentColor" strokeWidth="0.8" opacity="0.1" fill="none" />
        <text x="0" y="8" textAnchor="middle" fontSize="7" fill="currentColor" opacity="0.1" fontWeight="600">360°</text>
      </g>

      {/* Ground line */}
      <line x1="0" y1="180" x2="400" y2="180" stroke="currentColor" strokeWidth="0.6" opacity="0.04" />
    </svg>
  );
}

function Logistics({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 200" fill="none" className={className}>
      {/* Morocco map outline — abstract route */}
      <path
        d="M50 140 Q80 100 120 110 Q160 120 200 90 Q240 60 280 80 Q320 100 350 60"
        stroke="var(--accent, #d4453b)"
        strokeWidth="1.5"
        opacity="0.12"
        strokeDasharray="6 4"
        fill="none"
        strokeLinecap="round"
      />
      {/* Route glow */}
      <path
        d="M50 140 Q80 100 120 110 Q160 120 200 90 Q240 60 280 80 Q320 100 350 60"
        stroke="var(--accent, #d4453b)"
        strokeWidth="4"
        opacity="0.04"
        fill="none"
        strokeLinecap="round"
      />

      {/* City waypoints */}
      <g>
        <circle cx="50" cy="140" r="6" fill="currentColor" opacity="0.07" />
        <text x="50" y="158" textAnchor="middle" fontSize="7" fill="currentColor" opacity="0.1">Agadir</text>

        <circle cx="120" cy="110" r="5" fill="currentColor" opacity="0.06" />
        <text x="120" y="128" textAnchor="middle" fontSize="7" fill="currentColor" opacity="0.08">Marrakech</text>

        <circle cx="200" cy="90" r="6" fill="currentColor" opacity="0.07" />
        <text x="200" y="108" textAnchor="middle" fontSize="7" fill="currentColor" opacity="0.1">Casa</text>

        <circle cx="280" cy="80" r="5" fill="currentColor" opacity="0.06" />
        <text x="280" y="98" textAnchor="middle" fontSize="7" fill="currentColor" opacity="0.08">Rabat</text>

        <circle cx="350" cy="60" r="7" fill="var(--accent, #d4453b)" opacity="0.15" />
        <text x="350" y="78" textAnchor="middle" fontSize="7" fill="currentColor" opacity="0.12" fontWeight="600">Tanger</text>
      </g>

      {/* Delivery truck — detailed */}
      <g transform="translate(230, 40)">
        {/* Cab */}
        <rect x="0" y="0" width="22" height="18" rx="3" fill="currentColor" fillOpacity="0.05" stroke="currentColor" strokeWidth="0.8" strokeOpacity="0.1" />
        {/* Windshield */}
        <rect x="2" y="3" width="8" height="10" rx="1" fill="currentColor" opacity="0.03" />
        {/* Cargo */}
        <rect x="24" y="-5" width="35" height="23" rx="2" fill="currentColor" fillOpacity="0.04" stroke="currentColor" strokeWidth="0.8" strokeOpacity="0.08" />
        {/* Wheels */}
        <circle cx="10" cy="22" r="4" fill="currentColor" opacity="0.08" />
        <circle cx="10" cy="22" r="1.5" fill="white" opacity="0.3" />
        <circle cx="48" cy="22" r="4" fill="currentColor" opacity="0.08" />
        <circle cx="48" cy="22" r="1.5" fill="white" opacity="0.3" />
      </g>

      {/* Package */}
      <g transform="translate(155, 50)">
        <rect x="0" y="0" width="22" height="20" rx="2" fill="currentColor" fillOpacity="0.04" stroke="currentColor" strokeWidth="0.8" strokeOpacity="0.08" />
        <line x1="0" y1="7" x2="22" y2="7" stroke="currentColor" strokeWidth="0.5" opacity="0.05" />
        <line x1="11" y1="0" x2="11" y2="20" stroke="currentColor" strokeWidth="0.5" opacity="0.05" />
        {/* Checkmark on package */}
        <path d="M6 12 L9 15 L16 8" stroke="var(--accent, #d4453b)" strokeWidth="1" opacity="0.2" fill="none" strokeLinecap="round" />
      </g>

      {/* Fuel gauge */}
      <g transform="translate(60, 45)">
        <circle r="14" stroke="currentColor" strokeWidth="0.7" opacity="0.06" />
        <path d="M-8 5 Q0 -12 8 5" stroke="currentColor" strokeWidth="0.6" opacity="0.08" fill="none" />
        <line x1="0" y1="0" x2="4" y2="-8" stroke="var(--accent, #d4453b)" strokeWidth="1" opacity="0.15" strokeLinecap="round" />
        <text x="0" y="10" textAnchor="middle" fontSize="5" fill="currentColor" opacity="0.08">-800L</text>
      </g>
    </svg>
  );
}

function DefaultIllustration({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 200" fill="none" className={className}>
      {/* Zellige pattern — tiled diamonds */}
      <g transform="translate(200, 100)">
        {/* Central star */}
        {[0, 45, 90, 135].map((angle) => (
          <rect
            key={angle}
            x="-4" y="-16"
            width="8" height="32"
            rx="1"
            fill="currentColor"
            opacity="0.04"
            transform={`rotate(${angle})`}
          />
        ))}
        <circle r="5" fill="var(--accent, #d4453b)" opacity="0.1" />

        {/* Orbiting diamonds */}
        {[0, 60, 120, 180, 240, 300].map((angle) => {
          const x = Math.cos(angle * Math.PI / 180) * 60;
          const y = Math.sin(angle * Math.PI / 180) * 40;
          return (
            <path
              key={angle}
              d={`M${x} ${y - 8} L${x + 8} ${y} L${x} ${y + 8} L${x - 8} ${y} Z`}
              stroke="currentColor"
              strokeWidth="0.6"
              opacity="0.06"
            />
          );
        })}

        {/* Connecting lines */}
        {[0, 60, 120, 180, 240, 300].map((angle) => {
          const x = Math.cos(angle * Math.PI / 180) * 60;
          const y = Math.sin(angle * Math.PI / 180) * 40;
          return (
            <line key={`l-${angle}`} x1="0" y1="0" x2={x} y2={y} stroke="currentColor" strokeWidth="0.4" opacity="0.04" />
          );
        })}
      </g>

      {/* Corner flourishes */}
      <path d="M20 20 Q40 20 40 40" stroke="currentColor" strokeWidth="0.6" opacity="0.05" fill="none" />
      <path d="M380 20 Q360 20 360 40" stroke="currentColor" strokeWidth="0.6" opacity="0.05" fill="none" />
      <path d="M20 180 Q40 180 40 160" stroke="currentColor" strokeWidth="0.6" opacity="0.05" fill="none" />
      <path d="M380 180 Q360 180 360 160" stroke="currentColor" strokeWidth="0.6" opacity="0.05" fill="none" />
    </svg>
  );
}

function Business({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 200" fill="none" className={className}>
      {/* Ground */}
      <rect x="0" y="172" width="400" height="28" fill="currentColor" opacity="0.02" />
      <line x1="0" y1="172" x2="400" y2="172" stroke="currentColor" strokeWidth="0.5" opacity="0.06" />

      {/* ── Central calculator / balance sheet ── */}
      <g transform="translate(140, 12)">
        <rect x="0" y="0" width="120" height="155" rx="8" fill="currentColor" fillOpacity="0.03" stroke="currentColor" strokeWidth="1" strokeOpacity="0.08" />
        {/* Header bar */}
        <rect x="0" y="0" width="120" height="24" rx="8" fill="currentColor" fillOpacity="0.03" />
        <rect x="0" y="12" width="120" height="12" fill="currentColor" fillOpacity="0.03" />
        <text x="60" y="16" textAnchor="middle" fontSize="7" fill="currentColor" opacity="0.12" fontWeight="600" letterSpacing="1">COÛT vs ROI</text>
        {/* Divider */}
        <line x1="60" y1="30" x2="60" y2="145" stroke="currentColor" strokeWidth="0.5" opacity="0.06" />
        {/* Left column — Costs (red tinted) */}
        <text x="30" y="38" textAnchor="middle" fontSize="5.5" fill="var(--accent, #d4453b)" fillOpacity="0.4" fontWeight="600">COÛTS</text>
        {[0, 1, 2, 3, 4].map((i) => (
          <g key={`cost-${i}`} transform={`translate(8, ${45 + i * 19})`}>
            <rect x="0" y="0" width="44" height="14" rx="3" fill="var(--accent, #d4453b)" fillOpacity={0.04 - i * 0.005} stroke="var(--accent, #d4453b)" strokeWidth="0.5" strokeOpacity={0.08 - i * 0.01} />
            <rect x="4" y="3.5" width={22 - i * 2} height="3" rx="1" fill="currentColor" opacity={0.06 - i * 0.008} />
            <text x="40" y="10" textAnchor="end" fontSize="5" fill="var(--accent, #d4453b)" fillOpacity={0.25 - i * 0.03}>{["8K", "3K", "2K", "1.5K", "500"][i]}</text>
          </g>
        ))}
        {/* Right column — Returns (green tinted) */}
        <text x="90" y="38" textAnchor="middle" fontSize="5.5" fill="#22c55e" fillOpacity="0.45" fontWeight="600">ROI</text>
        {[0, 1, 2, 3, 4].map((i) => (
          <g key={`roi-${i}`} transform={`translate(68, ${45 + i * 19})`}>
            <rect x="0" y="0" width="44" height="14" rx="3" fill="#22c55e" fillOpacity={0.04 - i * 0.005} stroke="#22c55e" strokeWidth="0.5" strokeOpacity={0.08 - i * 0.01} />
            <rect x="4" y="3.5" width={26 - i * 3} height="3" rx="1" fill="currentColor" opacity={0.06 - i * 0.008} />
            <text x="40" y="10" textAnchor="end" fontSize="5" fill="#22c55e" fillOpacity={0.3 - i * 0.03}>{["15K", "12K", "8K", "5K", "3K"][i]}</text>
          </g>
        ))}
        {/* Bottom total row */}
        <line x1="8" y1="141" x2="112" y2="141" stroke="currentColor" strokeWidth="0.5" opacity="0.06" />
        <text x="30" y="152" textAnchor="middle" fontSize="7" fill="var(--accent, #d4453b)" fillOpacity="0.3" fontWeight="700">15K</text>
        <text x="90" y="152" textAnchor="middle" fontSize="7" fill="#22c55e" fillOpacity="0.35" fontWeight="700">43K</text>
      </g>

      {/* ── Rising bar chart (left) ── */}
      <g transform="translate(25, 55)">
        {/* Axis */}
        <line x1="0" y1="0" x2="0" y2="100" stroke="currentColor" strokeWidth="0.5" opacity="0.06" />
        <line x1="0" y1="100" x2="85" y2="100" stroke="currentColor" strokeWidth="0.5" opacity="0.06" />
        {/* Bars — ascending */}
        {[0, 1, 2, 3, 4].map((i) => {
          const h = 20 + i * 18;
          return (
            <g key={`bar-${i}`}>
              <rect x={5 + i * 16} y={100 - h} width="11" height={h} rx="2"
                fill={i < 2 ? "var(--accent, #d4453b)" : "#22c55e"}
                fillOpacity={0.08 + i * 0.03}
              />
            </g>
          );
        })}
        {/* Trend line */}
        <polyline points="10,80 26,65 42,48 58,28 74,8" stroke="var(--accent, #d4453b)" strokeWidth="1" strokeOpacity="0.15" fill="none" strokeLinecap="round" />
        {/* Arrow at end */}
        <polygon points="74,5 78,12 70,12" fill="var(--accent, #d4453b)" fillOpacity="0.15" />
        {/* Labels */}
        <text x="10" y="112" fontSize="4.5" fill="currentColor" opacity="0.08">M1</text>
        <text x="42" y="112" fontSize="4.5" fill="currentColor" opacity="0.08">M6</text>
        <text x="74" y="112" fontSize="4.5" fill="currentColor" opacity="0.08">M12</text>
      </g>

      {/* ── Dirham coin (right) ── */}
      <g transform="translate(315, 30)">
        <circle r="28" fill="currentColor" fillOpacity="0.025" stroke="currentColor" strokeWidth="1" strokeOpacity="0.06" />
        <circle r="22" fill="none" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.05" />
        <text x="0" y="2" textAnchor="middle" fontSize="14" fill="currentColor" opacity="0.08" fontWeight="600">DH</text>
        <text x="0" y="12" textAnchor="middle" fontSize="5" fill="currentColor" opacity="0.06">MAD</text>
      </g>

      {/* ── Comparison options (right, stacked) ── */}
      <g transform="translate(285, 80)">
        {["Odoo", "SaaS", "Custom", "Tadnun"].map((label, i) => (
          <g key={label} transform={`translate(0, ${i * 22})`}>
            <rect x="0" y="0" width="85" height="17" rx="4"
              fill={i === 3 ? "var(--accent, #d4453b)" : "currentColor"}
              fillOpacity={i === 3 ? 0.06 : 0.02}
              stroke={i === 3 ? "var(--accent, #d4453b)" : "currentColor"}
              strokeWidth="0.6"
              strokeOpacity={i === 3 ? 0.2 : 0.05}
            />
            <text x="8" y="11.5" fontSize="6" fill={i === 3 ? "var(--accent, #d4453b)" : "currentColor"} fillOpacity={i === 3 ? 0.5 : 0.12} fontWeight={i === 3 ? "600" : "400"}>{label}</text>
            {/* Price range bar */}
            <rect x={42} y="5.5" width={[30, 25, 40, 20][i]} height="6" rx="2"
              fill={i === 3 ? "var(--accent, #d4453b)" : "currentColor"}
              fillOpacity={i === 3 ? 0.12 : 0.04}
            />
            {i === 3 && <path d="M78 5 L82 8.5 L78 12" stroke="var(--accent, #d4453b)" strokeWidth="1" strokeOpacity="0.3" fill="none" strokeLinecap="round" />}
          </g>
        ))}
      </g>

      {/* ── Zellige corner ── */}
      <g transform="translate(360, 172)" opacity="0.05">
        <path d="M0 0 L10 -10 L20 0 L10 10 Z" stroke="currentColor" strokeWidth="0.8" />
        <path d="M20 0 L30 -10 L40 0 L30 10 Z" stroke="currentColor" strokeWidth="0.8" />
      </g>

      {/* Connecting dotted lines */}
      <line x1="110" y1="105" x2="140" y2="90" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 3" opacity="0.04" />
      <line x1="260" y1="90" x2="285" y2="95" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 3" opacity="0.04" />
      <line x1="315" y1="58" x2="315" y2="80" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 3" opacity="0.04" />
    </svg>
  );
}

const SECTOR_VISUALS: Record<string, (props: { className?: string }) => React.ReactElement> = {
  agriculture: Agriculture,
  restaurants: Restaurants,
  tourism: Tourism,
  healthcare: Healthcare,
  retail: Retail,
  education: Education,
  realestate: RealEstate,
  logistics: Logistics,
  business: Business,
};

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
