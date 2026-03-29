"use client";

import { useState, useCallback, useEffect } from "react";
import type { InboxEmail, InboxCounts } from "@/lib/types";
import { InboxSidebar } from "./inbox-sidebar";
import { InboxList } from "./inbox-list";
import { InboxReader } from "./inbox-reader";
import { ComposeModal } from "./compose-modal";

interface Props {
  emails: InboxEmail[];
  counts: InboxCounts;
  currentPage: number;
  totalPages: number;
  activeFilter: string;
  activeStep: string;
  searchQuery: string;
}

export function InboxShell({ emails, counts, currentPage, totalPages, activeFilter, activeStep, searchQuery }: Props) {
  const [selectedId, setSelectedId] = useState<number | null>(emails[0]?.id ?? null);
  const [composing, setComposing] = useState(false);

  const selectedEmail = emails.find((e) => e.id === selectedId) ?? null;

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (composing) return;
    const idx = emails.findIndex((em) => em.id === selectedId);
    if (e.key === "ArrowDown" && idx < emails.length - 1) {
      setSelectedId(emails[idx + 1].id);
      e.preventDefault();
    } else if (e.key === "ArrowUp" && idx > 0) {
      setSelectedId(emails[idx - 1].id);
      e.preventDefault();
    } else if (e.key === "Escape") {
      setSelectedId(null);
    }
  }, [emails, selectedId, composing]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return (
    <div className="flex h-[calc(100vh-48px)] -m-6 overflow-hidden">
      <InboxSidebar
        counts={counts}
        activeFilter={activeFilter}
        activeStep={activeStep}
      />

      <InboxList
        emails={emails}
        selectedId={selectedId}
        onSelect={setSelectedId}
        onCompose={() => setComposing(true)}
        currentPage={currentPage}
        totalPages={totalPages}
        searchQuery={searchQuery}
      />

      <InboxReader email={selectedEmail} />

      {composing && <ComposeModal onClose={() => setComposing(false)} />}
    </div>
  );
}
