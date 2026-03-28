"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase-browser";
import {
  LayoutDashboard,
  Mail,
  Target,
  FolderKanban,
  Building2,
  FileText,
  LogOut,
  ChevronRight,
} from "lucide-react";

const NAV_ITEMS = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Inbox",
    href: "/inbox",
    icon: Mail,
  },
  {
    label: "Projects",
    href: "/projects",
    icon: FolderKanban,
    children: [
      { label: "All Projects", href: "/projects" },
      { label: "Tasks", href: "/projects/tasks" },
    ],
  },
  {
    label: "Clients",
    href: "/clients",
    icon: Building2,
  },
  {
    label: "Blog",
    href: "/blog",
    icon: FileText,
    children: [
      { label: "All Posts", href: "/blog" },
      { label: "New Post", href: "/blog/new" },
    ],
  },
  {
    label: "Outbound",
    href: "/outbound/prospects",
    icon: Target,
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  }

  return (
    <aside className="w-52 h-screen bg-[var(--surface)] border-r border-[var(--border)] flex flex-col fixed left-0 top-0">
      <div className="px-5 py-4 border-b border-[var(--border)]">
        <h1 className="text-sm font-semibold tracking-tight">Tadnun</h1>
      </div>

      <nav className="flex-1 px-2 py-3 space-y-0.5 overflow-y-auto">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
          const Icon = item.icon;

          return (
            <div key={item.href}>
              <Link
                href={item.children ? item.children[0].href : item.href}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-[13px] transition-colors ${
                  isActive
                    ? "bg-gray-100 text-[var(--foreground)] font-medium"
                    : "text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-gray-50"
                }`}
              >
                <Icon size={15} strokeWidth={isActive ? 2 : 1.5} />
                {item.label}
                {item.children && (
                  <ChevronRight size={12} className={`ml-auto transition-transform ${isActive ? "rotate-90" : ""}`} />
                )}
              </Link>

              {item.children && isActive && (
                <div className="ml-7 mt-0.5 space-y-0.5">
                  {item.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className={`block px-3 py-1 rounded-md text-[13px] transition-colors ${
                        pathname === child.href
                          ? "text-[var(--foreground)] font-medium"
                          : "text-[var(--muted)] hover:text-[var(--foreground)]"
                      }`}
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      <div className="px-2 py-2 border-t border-[var(--border)]">
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-3 py-1.5 rounded-md text-[13px] text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-gray-50 transition-colors w-full"
        >
          <LogOut size={15} strokeWidth={1.5} />
          Sign out
        </button>
      </div>
    </aside>
  );
}
