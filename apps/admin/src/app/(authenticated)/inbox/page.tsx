import { createClient } from "@/lib/supabase-server";
import type { InboxEmail, InboxCounts } from "@/lib/types";
import { InboxShell } from "./inbox-shell";

interface PageProps {
  searchParams: Promise<{
    filter?: string;
    step?: string;
    q?: string;
    page?: string;
  }>;
}

const PAGE_SIZE = 30;

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim().slice(0, 120);
}

export default async function InboxPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const page = Math.max(1, parseInt(params.page ?? "1", 10));
  const supabase = await createClient();

  // Counts
  const [allRes, sentRes, pendingRes, failedRes, s1Res, s2Res, s3Res] = await Promise.all([
    supabase.from("sequence_emails").select("*", { count: "exact", head: true }),
    supabase.from("sequence_emails").select("*", { count: "exact", head: true }).eq("status", "sent"),
    supabase.from("sequence_emails").select("*", { count: "exact", head: true }).eq("status", "pending"),
    supabase.from("sequence_emails").select("*", { count: "exact", head: true }).eq("status", "failed"),
    supabase.from("sequence_emails").select("*", { count: "exact", head: true }).eq("step", 1),
    supabase.from("sequence_emails").select("*", { count: "exact", head: true }).eq("step", 2),
    supabase.from("sequence_emails").select("*", { count: "exact", head: true }).eq("step", 3),
  ]);

  const counts: InboxCounts = {
    all: allRes.count ?? 0,
    sent: sentRes.count ?? 0,
    scheduled: pendingRes.count ?? 0,
    failed: failedRes.count ?? 0,
    step1: s1Res.count ?? 0,
    step2: s2Res.count ?? 0,
    step3: s3Res.count ?? 0,
  };

  // Emails query
  let query = supabase
    .from("sequence_emails")
    .select("*, prospects:prospect_id(name, email, sector, city)", { count: "exact" })
    .order("scheduled_for", { ascending: false })
    .range((page - 1) * PAGE_SIZE, page * PAGE_SIZE - 1);

  if (params.filter === "sent") query = query.eq("status", "sent");
  else if (params.filter === "scheduled") query = query.eq("status", "pending");
  else if (params.filter === "failed") query = query.eq("status", "failed");

  if (params.step) query = query.eq("step", parseInt(params.step, 10));

  if (params.q) {
    // Search by subject OR by prospect name/email
    const { data: matchingProspects } = await supabase
      .from("prospects")
      .select("id")
      .or(`name.ilike.%${params.q}%,email.ilike.%${params.q}%`);

    const prospectIds = (matchingProspects ?? []).map((p: { id: number }) => p.id);

    if (prospectIds.length > 0) {
      query = query.or(`subject.ilike.%${params.q}%,prospect_id.in.(${prospectIds.join(",")})`);
    } else {
      query = query.ilike("subject", `%${params.q}%`);
    }
  }

  const { data, count } = await query;
  const totalPages = Math.ceil((count ?? 0) / PAGE_SIZE);

  const emails: InboxEmail[] = (data ?? []).map((row: Record<string, unknown>) => {
    const prospect = Array.isArray(row.prospects) ? row.prospects[0] : row.prospects;
    const p = prospect as { name: string; email: string; sector: string; city: string } | null;
    return {
      id: row.id as number,
      prospect_id: row.prospect_id as number,
      step: row.step as number,
      template_key: row.template_key as string,
      subject: row.subject as string,
      body_html: row.body_html as string,
      body_preview: stripHtml(row.body_html as string),
      scheduled_for: row.scheduled_for as string,
      sent_at: row.sent_at as string | null,
      status: row.status as string,
      resend_id: row.resend_id as string | null,
      created_at: row.created_at as string,
      opened_at: row.opened_at as string | null,
      delivered_at: row.delivered_at as string | null,
      bounced_at: row.bounced_at as string | null,
      open_count: (row.open_count as number) ?? 0,
      prospect_name: p?.name ?? "Unknown",
      prospect_email: p?.email ?? "",
      prospect_sector: p?.sector ?? "",
      prospect_city: p?.city ?? "",
    };
  });

  return (
    <InboxShell
      emails={emails}
      counts={counts}
      currentPage={page}
      totalPages={totalPages}
      activeFilter={params.filter ?? "all"}
      activeStep={params.step ?? ""}
      searchQuery={params.q ?? ""}
    />
  );
}
