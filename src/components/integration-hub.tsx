"use client";

import { useEffect, useRef, useState } from "react";
import type { IconType } from "react-icons";
import {
  SiSlack,
  SiWhatsapp,
  SiN8N,
  SiStripe,
  SiShopify,
  SiGoogle,
  SiMoodle,
  SiHubspot,
  SiNotion,
  SiZapier,
  SiBookingdotcom,
  SiUbereats,
  SiOdoo,
  SiGoogleclassroom,
  SiMailchimp,
  SiCalendly,
  SiQuickbooks,
  SiWoocommerce,
  SiTrello,
  SiAirtable,
} from "react-icons/si";

/* ── Tool registry ── */
interface ToolDef {
  name: string;
  icon: IconType;
  color: string;
  category: string;
}

const ALL_TOOLS: Record<string, ToolDef> = {
  slack:        { name: "Slack",          icon: SiSlack,            color: "#4A154B", category: "communication" },
  whatsapp:     { name: "WhatsApp",       icon: SiWhatsapp,         color: "#25D366", category: "communication" },
  n8n:          { name: "n8n",            icon: SiN8N,              color: "#EA4B71", category: "automation" },
  zapier:       { name: "Zapier",         icon: SiZapier,           color: "#FF4A00", category: "automation" },
  stripe:       { name: "Stripe",         icon: SiStripe,           color: "#635BFF", category: "payments" },
  shopify:      { name: "Shopify",        icon: SiShopify,          color: "#7AB55C", category: "ecommerce" },
  woocommerce:  { name: "WooCommerce",    icon: SiWoocommerce,      color: "#96588A", category: "ecommerce" },
  google:       { name: "Google",         icon: SiGoogle,           color: "#4285F4", category: "discovery" },
  booking:      { name: "Booking.com",    icon: SiBookingdotcom,    color: "#003580", category: "reservations" },
  ubereats:     { name: "Uber Eats",      icon: SiUbereats,         color: "#06C167", category: "delivery" },
  hubspot:      { name: "HubSpot",        icon: SiHubspot,          color: "#FF7A59", category: "crm" },
  moodle:       { name: "Moodle",         icon: SiMoodle,           color: "#F98012", category: "education" },
  classroom:    { name: "Classroom",      icon: SiGoogleclassroom,  color: "#0F9D58", category: "education" },
  notion:       { name: "Notion",         icon: SiNotion,           color: "#000000", category: "productivity" },
  odoo:         { name: "Odoo",           icon: SiOdoo,             color: "#714B67", category: "erp" },
  mailchimp:    { name: "Mailchimp",      icon: SiMailchimp,        color: "#FFE01B", category: "marketing" },
  calendly:     { name: "Calendly",       icon: SiCalendly,         color: "#006BFF", category: "scheduling" },
  quickbooks:   { name: "QuickBooks",     icon: SiQuickbooks,       color: "#2CA01C", category: "accounting" },
  trello:       { name: "Trello",         icon: SiTrello,           color: "#0052CC", category: "productivity" },
  airtable:     { name: "Airtable",       icon: SiAirtable,         color: "#18BFFF", category: "data" },
};

/* ── Sector-specific tool selections ── */
const SECTOR_TOOLS: Record<string, string[]> = {
  agriculture:  ["whatsapp", "n8n", "odoo", "google", "stripe", "airtable", "zapier", "slack"],
  restaurants:  ["ubereats", "stripe", "google", "whatsapp", "slack", "n8n", "mailchimp", "booking"],
  tourism:      ["booking", "google", "whatsapp", "stripe", "calendly", "slack", "n8n", "hubspot"],
  healthcare:   ["calendly", "whatsapp", "slack", "hubspot", "google", "n8n", "notion", "stripe"],
  retail:       ["shopify", "stripe", "google", "whatsapp", "mailchimp", "n8n", "hubspot", "slack"],
  education:    ["moodle", "classroom", "whatsapp", "notion", "slack", "stripe", "n8n", "calendly"],
  realestate:   ["hubspot", "whatsapp", "google", "calendly", "slack", "n8n", "notion", "stripe"],
  logistics:    ["n8n", "slack", "google", "airtable", "whatsapp", "zapier", "odoo", "trello"],
};

const DEFAULT_TOOLS = ["slack", "whatsapp", "n8n", "stripe", "google", "hubspot", "shopify", "moodle"];

/* ── Props ── */
interface IntegrationHubProps {
  integrations: { name: string; desc: string }[];
  connectedLabel: string;
  sectorKey?: string;
}

export function SectorIntegrationHub({ integrations, connectedLabel, sectorKey }: IntegrationHubProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) { setActive(true); return; }

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setActive(true); observer.unobserve(el); } },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const toolKeys = sectorKey && SECTOR_TOOLS[sectorKey]
    ? SECTOR_TOOLS[sectorKey]
    : DEFAULT_TOOLS;

  const orbitTools = toolKeys.slice(0, 8).map((k) => ALL_TOOLS[k]).filter(Boolean);
  const orbitRadius = 155;

  return (
    <div ref={ref} className="flex flex-col items-center gap-12">
      {/* ── Orbital visual (sm+) ── */}
      <div
        className="hidden sm:block relative"
        style={{ width: orbitRadius * 2 + 140, height: orbitRadius * 2 + 140 }}
      >
        {/* Outer orbit ring */}
        <div
          className="absolute inset-8 rounded-full border border-dashed transition-all duration-1000"
          style={{ borderColor: active ? "var(--color-border, rgba(0,0,0,0.08))" : "transparent" }}
        />
        {/* Inner glow ring */}
        <div
          className="absolute rounded-full transition-all duration-1000"
          style={{
            inset: orbitRadius - 10,
            border: "1px solid",
            borderColor: active ? "rgba(192, 57, 43, 0.08)" : "transparent",
            borderRadius: "50%",
          }}
        />

        {/* Center hub — Tadnun */}
        <div
          className="absolute top-1/2 left-1/2 z-20 w-[72px] h-[72px] rounded-2xl bg-accent flex flex-col items-center justify-center shadow-xl shadow-accent/20 transition-all duration-700"
          style={{
            opacity: active ? 1 : 0,
            transform: active
              ? "translate(-50%, -50%) scale(1) rotate(0deg)"
              : "translate(-50%, -50%) scale(0.5) rotate(-10deg)",
          }}
        >
          <span className="font-serif italic text-white text-xl leading-none">T</span>
          <span className="text-white/50 text-[6px] font-semibold tracking-[0.15em] mt-0.5">TADNUN</span>
        </div>

        {/* Connecting lines + integration nodes */}
        {orbitTools.map((tool, i) => {
          const angle = ((360 / orbitTools.length) * i - 90) * (Math.PI / 180);
          const cx = orbitRadius * Math.cos(angle);
          const cy = orbitRadius * Math.sin(angle);
          const center = orbitRadius + 70;
          const Icon = tool.icon;

          return (
            <div key={tool.name}>
              {/* Line from center to node */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
                <line
                  x1={center} y1={center}
                  x2={center + cx} y2={center + cy}
                  stroke={active ? tool.color : "transparent"}
                  strokeWidth="1"
                  strokeDasharray="3 5"
                  opacity="0.25"
                  style={{ transition: `all 0.8s ease ${300 + i * 80}ms` }}
                />
                {/* Pulse dot */}
                {active && (
                  <circle r="2" fill={tool.color} opacity="0.5">
                    <animateMotion
                      dur={`${2.5 + i * 0.2}s`}
                      repeatCount="indefinite"
                      path={`M${center},${center} L${center + cx},${center + cy}`}
                    />
                  </circle>
                )}
              </svg>

              {/* Node */}
              <div
                className="absolute z-10 flex flex-col items-center gap-1"
                style={{
                  left: center + cx,
                  top: center + cy,
                  opacity: active ? 1 : 0,
                  transform: active
                    ? "translate(-50%, -50%) scale(1)"
                    : "translate(-50%, -50%) scale(0.3)",
                  transition: `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${300 + i * 100}ms`,
                }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center shadow-md bg-surface border border-border/60"
                >
                  <Icon size={22} color={tool.color} />
                </div>
                <span className="text-[9px] text-foreground/50 font-medium mt-0.5">{tool.name}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Mobile: grid layout ── */}
      <div className="sm:hidden space-y-6">
        <div className="flex justify-center">
          <div
            className="w-14 h-14 rounded-xl bg-accent flex flex-col items-center justify-center shadow-lg shadow-accent/20 transition-all duration-700"
            style={{ opacity: active ? 1 : 0 }}
          >
            <span className="font-serif italic text-white text-base leading-none">T</span>
          </div>
        </div>
        <div className="grid grid-cols-4 gap-4">
          {orbitTools.map((tool, i) => {
            const Icon = tool.icon;
            return (
              <div
                key={tool.name}
                className="flex flex-col items-center gap-1.5 transition-all"
                style={{
                  opacity: active ? 1 : 0,
                  transform: active ? "translateY(0)" : "translateY(8px)",
                  transition: `all 0.5s ease ${200 + i * 60}ms`,
                }}
              >
                <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-surface border border-border/60 shadow-sm">
                  <Icon size={18} color={tool.color} />
                </div>
                <span className="text-[8px] text-foreground/50 font-medium text-center leading-tight">{tool.name}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── "Connected via Tadnun" ── */}
      <div
        className="text-center transition-all"
        style={{ opacity: active ? 1 : 0, transition: "opacity 0.6s ease 1.4s" }}
      >
        <span className="inline-flex items-center gap-3 text-[11px] text-muted font-mono tracking-wider uppercase">
          <span className="w-8 h-px bg-border" />
          {connectedLabel}
          <span className="w-8 h-px bg-border" />
        </span>
      </div>

      {/* ── Integration detail cards (sector-specific data) ── */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 w-full">
        {integrations.map((integ, i) => {
          // Try to match to a known tool for the icon
          const matchedKey = Object.keys(ALL_TOOLS).find((k) =>
            integ.name.toLowerCase().includes(ALL_TOOLS[k].name.toLowerCase()) ||
            ALL_TOOLS[k].name.toLowerCase().includes(integ.name.toLowerCase().split(" ")[0])
          );
          const tool = matchedKey ? ALL_TOOLS[matchedKey] : null;

          return (
            <div
              key={i}
              className="flex items-start gap-3 rounded-xl border border-border/60 bg-surface/50 px-4 py-3 transition-all"
              style={{
                opacity: active ? 1 : 0,
                transition: `opacity 0.5s ease ${900 + i * 60}ms`,
              }}
            >
              {tool ? (
                <div className="w-7 h-7 rounded-lg flex items-center justify-center bg-surface border border-border/40 shrink-0 mt-0.5">
                  <tool.icon size={14} color={tool.color} />
                </div>
              ) : (
                <div className="w-7 h-7 rounded-lg flex items-center justify-center bg-foreground/[0.05] shrink-0 mt-0.5">
                  <span className="text-[8px] font-bold text-foreground/40">{integ.name.slice(0, 2).toUpperCase()}</span>
                </div>
              )}
              <div className="min-w-0">
                <p className="text-foreground text-[12px] font-medium leading-tight">{integ.name}</p>
                <p className="text-muted text-[11px] leading-snug mt-0.5">{integ.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
