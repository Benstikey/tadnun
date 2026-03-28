"use client";

import { useState, useEffect } from "react";

const TARGET = new Date("2030-06-13T00:00:00+01:00"); // World Cup 2030 kick-off (approx.)

interface CountdownLabels {
  days: string;
  hours: string;
  minutes: string;
}

export function Countdown({ labels }: { labels: CountdownLabels }) {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(id);
  }, []);

  const diff = TARGET.getTime() - now.getTime();
  if (diff <= 0) return null;

  const days = Math.floor(diff / 86_400_000);
  const hours = Math.floor((diff % 86_400_000) / 3_600_000);
  const minutes = Math.floor((diff % 3_600_000) / 60_000);

  return (
    <div className="flex items-center gap-3 sm:gap-4">
      <Unit value={days} label={labels.days} />
      <Separator />
      <Unit value={hours} label={labels.hours} />
      <Separator />
      <Unit value={minutes} label={labels.minutes} />
    </div>
  );
}

function Unit({ value, label }: { value: number; label: string }) {
  return (
    <div className="text-center">
      <span className="block text-3xl sm:text-4xl font-serif italic text-accent tabular-nums leading-none">
        {value.toLocaleString()}
      </span>
      <span className="mt-1.5 block text-[10px] sm:text-[11px] uppercase tracking-wider text-background/40">
        {label}
      </span>
    </div>
  );
}

function Separator() {
  return <span className="text-background/20 text-2xl font-light -mt-3">:</span>;
}
