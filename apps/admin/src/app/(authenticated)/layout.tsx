import { Sidebar } from "@/components/sidebar";

export default function AuthenticatedLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 ml-52 p-6">{children}</main>
    </div>
  );
}
