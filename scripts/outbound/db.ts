// ============================================================
// Outbound GTM Automation — Supabase Database
// ============================================================

import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { ENV } from "./config";

let _client: SupabaseClient | null = null;

export function getDb(): SupabaseClient {
  if (_client) return _client;

  if (!ENV.SUPABASE_URL || !ENV.SUPABASE_SERVICE_KEY) {
    throw new Error(
      "SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set in .env.local"
    );
  }

  // Use service role key to bypass RLS (automation scripts need full access)
  _client = createClient(ENV.SUPABASE_URL, ENV.SUPABASE_SERVICE_KEY);
  return _client;
}

// --------------- Types ---------------

export interface ProspectRow {
  id: number;
  google_place_id: string;
  name: string;
  sector: string;
  city: string;
  address: string | null;
  phone: string | null;
  website: string | null;
  email: string | null;
  google_rating: number | null;
  google_reviews: number;
  has_website: boolean;
  score: number;
  status: string;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface SequenceEmailRow {
  id: number;
  prospect_id: number;
  step: number;
  template_key: string;
  subject: string;
  body_html: string;
  scheduled_for: string;
  sent_at: string | null;
  status: string;
  resend_id: string | null;
}

// --------------- Prospect Queries ---------------

export async function insertProspect(
  p: Omit<ProspectRow, "id" | "score" | "status" | "notes" | "created_at" | "updated_at">
): Promise<{ inserted: boolean }> {
  const { error } = await getDb()
    .from("prospects")
    .upsert(p, { onConflict: "google_place_id", ignoreDuplicates: true });

  return { inserted: !error };
}

export async function getProspectsToScore(): Promise<ProspectRow[]> {
  const { data } = await getDb()
    .from("prospects")
    .select("*")
    .eq("status", "new");
  return (data as ProspectRow[]) ?? [];
}

export async function getProspectsToEnrich(): Promise<ProspectRow[]> {
  const { data } = await getDb()
    .from("prospects")
    .select("*")
    .eq("status", "scored")
    .gte("score", 60)
    .is("email", null)
    .not("website", "is", null)
    .limit(30);
  return (data as ProspectRow[]) ?? [];
}

export async function getProspectsToEnroll(): Promise<ProspectRow[]> {
  // Get enriched prospects with email that aren't already in a sequence
  const { data: enrolled } = await getDb()
    .from("sequence_emails")
    .select("prospect_id");
  const enrolledIds = new Set((enrolled ?? []).map((r: { prospect_id: number }) => r.prospect_id));

  const { data } = await getDb()
    .from("prospects")
    .select("*")
    .eq("status", "enriched")
    .not("email", "is", null);

  return ((data as ProspectRow[]) ?? []).filter((p) => !enrolledIds.has(p.id));
}

export async function getProspectsWithoutWebsite(): Promise<ProspectRow[]> {
  const { data } = await getDb()
    .from("prospects")
    .select("*")
    .eq("status", "scored")
    .gte("score", 60)
    .is("website", null)
    .limit(100);
  return (data as ProspectRow[]) ?? [];
}

export async function updateProspect(id: number, fields: Partial<ProspectRow>) {
  const { id: _id, created_at: _ca, ...rest } = fields as Record<string, unknown>;
  await getDb().from("prospects").update(rest).eq("id", id);
}

// --------------- Sequence Queries ---------------

export async function insertSequenceEmail(
  e: Omit<SequenceEmailRow, "id" | "sent_at" | "status" | "resend_id">
) {
  await getDb().from("sequence_emails").insert(e);
}

export async function getDueEmails(): Promise<
  (SequenceEmailRow & { prospect_email: string; prospect_name: string })[]
> {
  const { data } = await getDb()
    .from("sequence_emails")
    .select("*, prospects!inner(email, name)")
    .eq("status", "pending")
    .lte("scheduled_for", new Date().toISOString())
    .not("prospects.email", "is", null)
    .order("scheduled_for", { ascending: true })
    .limit(95);

  return ((data ?? []) as Record<string, unknown>[]).map((row) => {
    const prospect = row.prospects as { email: string; name: string };
    return {
      ...(row as unknown as SequenceEmailRow),
      prospect_email: prospect.email,
      prospect_name: prospect.name,
    };
  });
}

export async function markEmailSent(id: number, resendId: string) {
  await getDb()
    .from("sequence_emails")
    .update({ status: "sent", sent_at: new Date().toISOString(), resend_id: resendId })
    .eq("id", id);
}

export async function markEmailFailed(id: number) {
  await getDb()
    .from("sequence_emails")
    .update({ status: "failed" })
    .eq("id", id);
}

// --------------- Activity Log ---------------

export async function logActivity(prospectId: number | null, action: string, details?: string) {
  await getDb()
    .from("activity_log")
    .insert({ prospect_id: prospectId, action, details: details ?? null });
}

// --------------- Scan History ---------------

export async function recordScan(sector: string, city: string, query: string, count: number) {
  await getDb()
    .from("scan_history")
    .insert({ sector, city, query, results_count: count });
}

export async function getLastScan(
  sector: string,
  city: string
): Promise<{ scanned_at: string } | null> {
  const { data } = await getDb()
    .from("scan_history")
    .select("scanned_at")
    .eq("sector", sector)
    .eq("city", city)
    .order("scanned_at", { ascending: false })
    .limit(1)
    .single();
  return data as { scanned_at: string } | null;
}

// --------------- Stats ---------------

export async function getStats() {
  const db = getDb();

  const [totalRes, byStatusRes, bySectorRes, pendingRes, sentRes, failedRes, weekProspRes, weekEmailRes] =
    await Promise.all([
      db.from("prospects").select("*", { count: "exact", head: true }),
      db.rpc("get_status_counts").then((r) => r.data),
      db.rpc("get_sector_counts").then((r) => r.data),
      db.from("sequence_emails").select("*", { count: "exact", head: true }).eq("status", "pending"),
      db.from("sequence_emails").select("*", { count: "exact", head: true }).eq("status", "sent"),
      db.from("sequence_emails").select("*", { count: "exact", head: true }).eq("status", "failed"),
      db.from("prospects").select("*", { count: "exact", head: true }).gte("created_at", new Date(Date.now() - 7 * 86400000).toISOString()),
      db.from("sequence_emails").select("*", { count: "exact", head: true }).eq("status", "sent").gte("sent_at", new Date(Date.now() - 7 * 86400000).toISOString()),
    ]);

  return {
    total: totalRes.count ?? 0,
    byStatus: (byStatusRes ?? []) as { status: string; count: number }[],
    bySector: (bySectorRes ?? []) as { sector: string; count: number }[],
    emailsPending: pendingRes.count ?? 0,
    emailsSent: sentRes.count ?? 0,
    emailsFailed: failedRes.count ?? 0,
    thisWeek: {
      prospected: weekProspRes.count ?? 0,
      emailsSent: weekEmailRes.count ?? 0,
    },
  };
}
