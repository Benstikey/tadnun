import { createClient } from "@/lib/supabase-server";
import { EmailsTable } from "./emails-table";

interface PageProps {
  searchParams: Promise<{
    status?: string;
    step?: string;
    page?: string;
  }>;
}

const PAGE_SIZE = 25;

export default async function EmailsPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const page = Math.max(1, parseInt(params.page ?? "1", 10));
  const supabase = await createClient();

  let query = supabase
    .from("sequence_emails")
    .select(`
      *,
      prospects:prospect_id (name, email, sector, city)
    `, { count: "exact" })
    .order("scheduled_for", { ascending: false })
    .range((page - 1) * PAGE_SIZE, page * PAGE_SIZE - 1);

  if (params.status) query = query.eq("status", params.status);
  if (params.step) query = query.eq("step", parseInt(params.step, 10));

  const { data, count } = await query;
  const totalPages = Math.ceil((count ?? 0) / PAGE_SIZE);

  // Transform the joined data
  const emails = (data ?? []).map((row: Record<string, unknown>) => {
    const prospect = row.prospects as { name: string; email: string; sector: string; city: string } | null;
    return {
      id: row.id as number,
      prospect_id: row.prospect_id as number,
      step: row.step as number,
      subject: row.subject as string,
      body_html: row.body_html as string,
      scheduled_for: row.scheduled_for as string,
      sent_at: row.sent_at as string | null,
      status: row.status as string,
      prospect_name: prospect?.name ?? "Unknown",
      prospect_email: prospect?.email ?? "",
      prospect_sector: prospect?.sector ?? "",
      prospect_city: prospect?.city ?? "",
    };
  });

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-xl font-semibold tracking-tight">Email Sequences</h1>
        <p className="text-sm text-[var(--muted)] mt-1">{count ?? 0} total emails</p>
      </div>

      <EmailsTable
        emails={emails}
        currentPage={page}
        totalPages={totalPages}
        totalCount={count ?? 0}
        activeFilters={{
          status: params.status ?? "",
          step: params.step ?? "",
        }}
      />
    </div>
  );
}
