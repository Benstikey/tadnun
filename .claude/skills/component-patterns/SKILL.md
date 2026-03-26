# Component Patterns — Tadnun

Reference for consistent component architecture across the project.

## Page Pattern

```tsx
// src/app/[locale]/[page]/page.tsx — Server Component
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { PageShell } from "@/components/page-shell";

export async function generateMetadata({ params }: { params: { locale: string } }) {
  const t = await getTranslations({ locale: params.locale, namespace: "meta" });
  return { title: t("pageTitle"), description: t("pageDescription") };
}

export default function PageName() {
  const t = useTranslations("namespace");
  return (
    <PageShell>
      {/* Page content — sections as separate components */}
    </PageShell>
  );
}
```

## Client Component Pattern

```tsx
// "use client" — only when hooks/interactivity needed
"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

interface ComponentProps {
  variant?: "default" | "compact";
}

export function Component({ variant = "default" }: ComponentProps) {
  const t = useTranslations("namespace");
  // ...
}
```

## Animated Section Pattern

```tsx
import { ScrollReveal } from "@/components/scroll-reveal";

// Wrap sections that should animate on scroll
<ScrollReveal>
  <section className="py-20 border-t border-border">
    {/* Content */}
  </section>
</ScrollReveal>
```

## Sector Page Pattern

Sector pages use dynamic routing with `[sector]` param.
Data comes from `src/data/sector-details.ts`.

```tsx
// Access sector data
import { sectorDetails } from "@/data/sector-details";
const details = sectorDetails[sector as keyof typeof sectorDetails];
```

## i18n Pattern

```tsx
// Server Component — use getTranslations
const t = await getTranslations({ locale, namespace: "page" });

// Client Component — use useTranslations
const t = useTranslations("page");

// Accessing nested keys
t("hero.title")
t("sectors.agriculture.name")
```

## CTA Pattern

```tsx
import { CtaBand } from "@/components/cta-band";

// Uses translation keys from ctaBand namespace
<CtaBand messageKey="default" />  // ctaBand.default.*
<CtaBand messageKey="about" />    // ctaBand.about.*
```

## Tailwind Tokens

Use semantic tokens, not raw colors:
- `text-foreground` — primary text
- `bg-background` — page background
- `bg-surface` — cards, elevated areas
- `text-accent` / `bg-accent` — CTAs, highlights
- `text-muted` — secondary text
- `border-border` — borders, dividers
