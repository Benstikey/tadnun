"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

function isBusinessHours(): boolean {
  // Morocco is UTC+1 (no DST)
  const now = new Date();
  const utcHour = now.getUTCHours();
  const moroccoHour = (utcHour + 1) % 24;
  const day = now.getUTCDay(); // 0 = Sunday
  const isWeekday = day >= 1 && day <= 5;
  return isWeekday && moroccoHour >= 9 && moroccoHour < 18;
}

export function AvailabilityBadge() {
  const t = useTranslations("contactPage");
  const [available, setAvailable] = useState<boolean | null>(null);

  useEffect(() => {
    setAvailable(isBusinessHours());
  }, []);

  // Render nothing until client hydrates to avoid flash
  if (available === null) return null;

  return (
    <div className="inline-flex items-center gap-2.5 rounded-full border border-border bg-surface px-4 py-2">
      <span className="relative flex h-2.5 w-2.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
      </span>
      <span className="text-sm text-foreground/80">
        {available ? t("availableNow") : t("availableTomorrow")}
      </span>
    </div>
  );
}
