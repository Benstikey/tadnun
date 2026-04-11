import { ImageResponse } from "next/og";
import { readFileSync } from "fs";
import { join } from "path";

export const alt = "Tadnun — Digital Transformation for Moroccan Businesses";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const fraunces = readFileSync(
    join(process.cwd(), "src", "fonts", "Fraunces-Italic.ttf")
  );
  const jakarta = readFileSync(
    join(process.cwd(), "src", "fonts", "PlusJakartaSans-Medium.ttf")
  );

  const accent = "#d4453b";
  const fg = "#1a1a1a";
  const muted = "#6b6560";
  const bg = "#faf9f7";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: bg,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Warm radial glow */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            backgroundImage:
              "radial-gradient(ellipse 70% 50% at 50% 45%, rgba(212,69,59,0.04) 0%, transparent 100%)",
          }}
        />

        {/* Inner frame */}
        <div
          style={{
            position: "absolute",
            top: 20,
            left: 20,
            right: 20,
            bottom: 20,
            border: "1.5px solid rgba(212,69,59,0.1)",
            borderRadius: 16,
            display: "flex",
          }}
        />

        {/* ── ZELLIGE PATTERN: TOP-RIGHT CLUSTER ── */}
        <div
          style={{
            position: "absolute",
            top: -55,
            right: 35,
            width: 200,
            height: 200,
            background: "rgba(212,69,59,0.035)",
            border: "1.5px solid rgba(212,69,59,0.065)",
            transform: "rotate(45deg)",
            borderRadius: 6,
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 15,
            right: 155,
            width: 100,
            height: 100,
            background: "rgba(212,69,59,0.025)",
            border: "1px solid rgba(212,69,59,0.055)",
            transform: "rotate(45deg)",
            borderRadius: 4,
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 85,
            right: 35,
            width: 50,
            height: 50,
            background: "rgba(212,69,59,0.02)",
            border: "1px solid rgba(212,69,59,0.045)",
            transform: "rotate(45deg)",
            borderRadius: 3,
            display: "flex",
          }}
        />

        {/* ── ZELLIGE PATTERN: BOTTOM-LEFT CLUSTER ── */}
        <div
          style={{
            position: "absolute",
            bottom: -45,
            left: 55,
            width: 165,
            height: 165,
            background: "rgba(212,69,59,0.03)",
            border: "1.5px solid rgba(212,69,59,0.06)",
            transform: "rotate(45deg)",
            borderRadius: 5,
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 35,
            left: -15,
            width: 80,
            height: 80,
            background: "rgba(212,69,59,0.025)",
            border: "1px solid rgba(212,69,59,0.05)",
            transform: "rotate(45deg)",
            borderRadius: 3,
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 100,
            left: 45,
            width: 40,
            height: 40,
            background: "rgba(212,69,59,0.02)",
            border: "1px solid rgba(212,69,59,0.04)",
            transform: "rotate(45deg)",
            borderRadius: 2,
            display: "flex",
          }}
        />

        {/* ── ACCENT DOTS ── */}
        <div
          style={{
            position: "absolute",
            top: 68,
            left: 68,
            width: 8,
            height: 8,
            background: accent,
            borderRadius: 100,
            opacity: 0.15,
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 98,
            left: 40,
            width: 5,
            height: 5,
            background: accent,
            borderRadius: 100,
            opacity: 0.1,
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 88,
            right: 105,
            width: 7,
            height: 7,
            background: accent,
            borderRadius: 100,
            opacity: 0.12,
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 118,
            right: 58,
            width: 4,
            height: 4,
            background: accent,
            borderRadius: 100,
            opacity: 0.08,
            display: "flex",
          }}
        />

        {/* ── ZELLIGE STAR ACCENTS ── */}
        <svg
          width="28"
          height="28"
          viewBox="0 0 28 28"
          style={{ position: "absolute", top: 52, right: 225 }}
        >
          <path
            d="M14 2L16.5 11.5L26 14L16.5 16.5L14 26L11.5 16.5L2 14L11.5 11.5Z"
            fill={accent}
            opacity="0.06"
          />
        </svg>
        <svg
          width="18"
          height="18"
          viewBox="0 0 28 28"
          style={{ position: "absolute", bottom: 175, left: 185 }}
        >
          <path
            d="M14 2L16.5 11.5L26 14L16.5 16.5L14 26L11.5 16.5L2 14L11.5 11.5Z"
            fill={accent}
            opacity="0.05"
          />
        </svg>

        {/* ── CENTER CONTENT ── */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "100%",
            position: "relative",
          }}
        >
          {/* Eyebrow */}
          <div
            style={{
              fontFamily: "PlusJakartaSans",
              fontSize: 13,
              letterSpacing: "0.3em",
              color: accent,
              marginBottom: 24,
            }}
          >
            DIGITAL TRANSFORMATION
          </div>

          {/* Brand name */}
          <div
            style={{
              fontFamily: "Fraunces",
              fontStyle: "italic",
              fontSize: 104,
              color: fg,
              lineHeight: 1,
              letterSpacing: "-0.03em",
            }}
          >
            Tadnun
          </div>

          {/* Red separator */}
          <div
            style={{
              width: 56,
              height: 3,
              background: accent,
              borderRadius: 2,
              marginTop: 32,
              marginBottom: 32,
              display: "flex",
            }}
          />

          {/* Tagline */}
          <div
            style={{
              fontFamily: "PlusJakartaSans",
              fontSize: 22,
              color: muted,
              letterSpacing: "-0.01em",
            }}
          >
            Custom Digital Solutions for Moroccan Businesses
          </div>
        </div>

        {/* URL at bottom */}
        <div
          style={{
            position: "absolute",
            bottom: 32,
            left: 0,
            right: 0,
            display: "flex",
            justifyContent: "center",
            fontFamily: "PlusJakartaSans",
            fontSize: 12,
            letterSpacing: "0.2em",
            color: muted,
            opacity: 0.45,
          }}
        >
          TADNUN.COM
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Fraunces",
          data: fraunces,
          style: "italic" as const,
          weight: 600 as const,
        },
        {
          name: "PlusJakartaSans",
          data: jakarta,
          style: "normal" as const,
          weight: 500 as const,
        },
      ],
    }
  );
}
