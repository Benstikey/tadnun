interface StatCardProps {
  label: string;
  value: string | number;
  subvalue?: string;
}

export function StatCard({ label, value, subvalue }: StatCardProps) {
  return (
    <div className="border border-[var(--border)] rounded-lg p-4 bg-[var(--surface)]">
      <p className="text-xs text-[var(--muted)] uppercase tracking-wide">{label}</p>
      <p className="text-2xl font-semibold mt-1 tracking-tight">{value}</p>
      {subvalue && <p className="text-xs text-[var(--muted)] mt-0.5">{subvalue}</p>}
    </div>
  );
}
