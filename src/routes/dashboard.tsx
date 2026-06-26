import { createFileRoute, Outlet, Link, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Home, List, Plus, Package, Wallet, BarChart3, Settings, BadgeCheck, Star, Lock } from "lucide-react";
import { useRole } from "@/lib/role-store";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Seller Dashboard — HYPE" },
      { name: "description", content: "Manage your listings, orders, payouts and analytics from your HYPE seller dashboard." },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: DashboardLayout,
});

const items: { to: string; label: string; icon: typeof Home; exact?: boolean }[] = [
  { to: "/dashboard", label: "Overview", icon: Home, exact: true },
  { to: "/dashboard/listings", label: "My Listings", icon: List },
  { to: "/dashboard/create-listing", label: "Create Listing", icon: Plus },
  { to: "/dashboard/orders", label: "Orders & Shipments", icon: Package },
  { to: "/dashboard/payouts", label: "Payouts & Earnings", icon: Wallet },
  { to: "/dashboard/analytics", label: "Analytics", icon: BarChart3 },
  { to: "/dashboard/settings", label: "Account Settings", icon: Settings },
];

function DashboardLayout() {
  const { role } = useRole();
  const navigate = useNavigate();
  const allowed = role === "seller" || role === "admin";

  useEffect(() => {
    if (!allowed) {
      const t = setTimeout(() => navigate({ to: "/auth/login" }), 1500);
      return () => clearTimeout(t);
    }
  }, [allowed, navigate]);

  if (!allowed) {
    return (
      <SiteLayout>
        <div className="mx-auto flex min-h-[60vh] max-w-md flex-col items-center justify-center px-6 text-center">
          <Lock className="mb-4 text-ink/50" size={32} />
          <h1 className="font-display text-3xl uppercase tracking-tight">Seller area</h1>
          <p className="mt-3 text-sm text-ink/65">
            You need a seller account to access the dashboard. Redirecting to sign-in…
          </p>
          <Link to="/auth/login" className="mt-6 inline-flex bg-ink px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-cream">
            Sign in
          </Link>
        </div>
      </SiteLayout>
    );
  }

  return (
    <SiteLayout>
      <div className="bg-sand">
        <div className="mx-auto grid max-w-[1500px] grid-cols-1 gap-7 px-6 py-8 lg:grid-cols-[260px_1fr]">
          <aside className="relative self-start overflow-hidden rounded-3xl bg-ink p-4 text-cream">
            <div className="rounded-2xl bg-cream/5 p-4">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-green px-2.5 py-1 text-[11px] font-bold text-green-ink">
                <BadgeCheck size={12} /> Verified seller
              </span>
              <div className="mt-3 font-semibold">HYPE India Store</div>
              <div className="mt-1 flex items-center gap-1.5 text-sm text-cream/70"><Star size={13} className="text-gold" fill="currentColor" /> 4.9</div>
            </div>
            <nav className="mt-4 flex flex-col">
              {items.map((it) => (
                <Link
                  key={it.to}
                  to={it.to}
                  activeOptions={{ exact: it.exact }}
                  className="flex items-center gap-3 rounded-xl px-3.5 py-3 text-sm font-medium text-cream/75 transition hover:bg-cream/5 hover:text-cream [&.active]:bg-cream [&.active]:text-ink"
                >
                  <it.icon size={16} /> {it.label}
                </Link>
              ))}
            </nav>
            <div className="pointer-events-none absolute bottom-6 left-0 right-0 select-none text-center font-display text-7xl text-cream/[0.07]">HYPE</div>
          </aside>
          <section><Outlet /></section>
        </div>
      </div>
    </SiteLayout>
  );
}
