import { Nav } from "./nav";
import { Footer } from "./footer";

export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col flex-1 bg-background font-sans">
      <Nav />
      <main id="main-content" className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}
