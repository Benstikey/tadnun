import { createClient } from "@/lib/supabase-server";
import type { Prospect } from "@/lib/types";
import { ProspectsTable } from "./prospects-table";

interface PageProps {
  searchParams: Promise<{
    status?: string;
    sector?: string;
    city?: string;
    q?: string;
    page?: string;
  }>;
}

const PAGE_SIZE = 25;

export default async function ProspectsPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const page = Math.max(1, parseInt(params.page ?? "1", 10));
  const supabase = await createClient();

  let query = supabase
    .from("prospects")
    .select("*", { count: "exact" })
    .order("score", { ascending: false })
    .range((page - 1) * PAGE_SIZE, page * PAGE_SIZE - 1);

  if (params.status) query = query.eq("status", params.status);
  if (params.sector) query = query.eq("sector", params.sector);
  if (params.city) query = query.ilike("city", `%${params.city}%`);
  if (params.q) query = query.ilike("name", `%${params.q}%`);

  const { data, count } = await query;
  const prospects = (data as Prospect[]) ?? [];
  const totalPages = Math.ceil((count ?? 0) / PAGE_SIZE);

  // Get distinct values for filters
  const [statusesRes, sectorsRes, citiesRes] = await Promise.all([
    supabase.from("prospects").select("status").limit(1000),
    supabase.from("prospects").select("sector").limit(1000),
    supabase.from("prospects").select("city").limit(1000),
  ]);

  const statuses = [...new Set((statusesRes.data ?? []).map((r: { status: string }) => r.status))].sort();
  const sectors = [...new Set((sectorsRes.data ?? []).map((r: { sector: string }) => r.sector))].sort();
  const cities = [...new Set((citiesRes.data ?? []).map((r: { city: string }) => r.city))].sort();

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-lg font-semibold tracking-tight">Prospects</h1>
        <p className="text-[13px] text-[var(--muted)] mt-0.5">
          {count ?? 0} prospects
          {params.sector ? ` in ${params.sector}` : ""}
          {params.city ? ` — ${params.city}` : ""}
        </p>
      </div>

      <ProspectsTable
        prospects={prospects}
        currentPage={page}
        totalPages={totalPages}
        totalCount={count ?? 0}
        filters={{ statuses, sectors, cities }}
        activeFilters={{
          status: params.status ?? "",
          sector: params.sector ?? "",
          city: params.city ?? "",
          q: params.q ?? "",
        }}
      />
    </div>
  );
}
