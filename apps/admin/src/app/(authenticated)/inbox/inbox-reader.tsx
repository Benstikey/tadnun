"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import type { InboxEmail } from "@/lib/types";
import { resendEmail, cancelEmail } from "./actions";
import { Mail } from "lucide-react";

const STEP_LABELS: Record<number, string> = { 0: "Ad hoc", 1: "Pain + Proof", 2: "Case Study", 3: "Breakup" };

interface Props {
  email: InboxEmail | null;
}

export function InboxReader({ email }: Props) {
  const router = useRouter();
  const [acting, setActing] = useState(false);

  if (!email) {
    return (
      <div className="flex-1 flex items-center justify-center bg-[var(--background)]">
        <div className="text-center text-[var(--muted)]">
          <Mail size={24} className="mx-auto mb-2 opacity-30" />
          <p className="text-[13px]">Select an email to read</p>
        </div>
      </div>
    );
  }

  async function handleResend() {
    if (!email) return;
    setActing(true);
    const result = await resendEmail(email.id);
    setActing(false);
    if (result.error) alert(result.error);
    else router.refresh();
  }

  async function handleCancel() {
    if (!email) return;
    setActing(true);
    const result = await cancelEmail(email.id);
    setActing(false);
    if (result.error) alert(result.error);
    else router.refresh();
  }

  return (
    <div className="flex-1 flex flex-col bg-[var(--background)] overflow-hidden">
      {/* Header */}
      <div className="bg-[var(--surface)] border-b border-[var(--border)] px-6 py-4 flex-shrink-0">
        <div className="flex items-center gap-2 mb-2">
          <span className={`inline-block w-1.5 h-1.5 rounded-full ${
            email.status === "sent" ? "bg-[var(--foreground)]" : email.status === "failed" ? "bg-[var(--danger)]" : "bg-[var(--border)]"
          }`} />
          <span className="text-[12px] text-[var(--muted)]">{email.status}</span>
          <span className="text-[12px] text-[var(--muted)]">&middot;</span>
          <span className="text-[12px] text-[var(--muted)]">{STEP_LABELS[email.step] ?? `Step ${email.step}`}</span>

          {/* Actions */}
          <div className="ml-auto flex gap-2">
            {email.status === "failed" && (
              <button
                onClick={handleResend}
                disabled={acting}
                className="px-2.5 py-1 text-[12px] font-medium border border-[var(--border)] rounded-md hover:bg-gray-50 disabled:opacity-50"
              >
                Resend
              </button>
            )}
            {email.status === "pending" && (
              <button
                onClick={handleCancel}
                disabled={acting}
                className="px-2.5 py-1 text-[12px] text-[var(--danger)] font-medium border border-[var(--border)] rounded-md hover:bg-gray-50 disabled:opacity-50"
              >
                Cancel
              </button>
            )}
          </div>
        </div>

        <h2 className="text-[15px] font-semibold tracking-tight">{email.subject}</h2>

        <div className="mt-2 text-[13px] text-[var(--muted)] space-y-0.5">
          <p>
            To: <span className="text-[var(--foreground)]">{email.prospect_name}</span>{" "}
            &lt;{email.prospect_email}&gt;
            <span className="ml-2 text-[11px]">{email.prospect_sector} &middot; {email.prospect_city}</span>
          </p>
          <p>From: wassim@tadnun.com</p>
          <p>
            {email.sent_at
              ? `Sent: ${new Date(email.sent_at).toLocaleDateString("en", { weekday: "short", month: "short", day: "numeric", year: "numeric", hour: "2-digit", minute: "2-digit" })}`
              : `Scheduled: ${new Date(email.scheduled_for).toLocaleDateString("en", { weekday: "short", month: "short", day: "numeric", year: "numeric" })}`
            }
          </p>
          {/* Tracking status */}
          {email.sent_at && (
            <div className="flex gap-3 mt-1.5 text-[11px]">
              <span className={email.delivered_at ? "text-[var(--foreground)]" : "text-[var(--muted)]"}>
                {email.delivered_at ? "Delivered" : "Delivery pending"}
              </span>
              {email.opened_at && (
                <span className="text-[var(--foreground)]">
                  Opened{email.open_count > 1 ? ` ${email.open_count}x` : ""} — {new Date(email.opened_at).toLocaleDateString("en", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}
                </span>
              )}
              {email.bounced_at && (
                <span className="text-[var(--danger)]">Bounced</span>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Body — rendered in iframe for style isolation */}
      <div className="flex-1 overflow-hidden">
        <EmailFrame html={email.body_html} key={email.id} />
      </div>
    </div>
  );
}

function EmailFrame({ html }: { html: string }) {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    const doc = iframe.contentDocument;
    if (!doc) return;

    doc.open();
    doc.write(html);
    doc.close();

    // Auto-resize iframe to content height
    const resize = () => {
      if (doc.body) {
        iframe.style.height = doc.body.scrollHeight + 40 + "px";
      }
    };

    // Resize after images load
    resize();
    const images = doc.querySelectorAll("img");
    images.forEach((img) => img.addEventListener("load", resize));

    // Open links in new tab
    doc.querySelectorAll("a").forEach((a) => {
      a.setAttribute("target", "_blank");
      a.setAttribute("rel", "noopener noreferrer");
    });

    // Small delay for fonts to render
    setTimeout(resize, 200);
  }, [html]);

  return (
    <iframe
      ref={iframeRef}
      className="w-full h-full border-0"
      sandbox="allow-same-origin"
      title="Email preview"
    />
  );
}
