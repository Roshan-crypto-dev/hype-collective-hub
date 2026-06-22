import { createFileRoute, Outlet, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Home, List, Plus, Package, Wallet, BarChart3, Settings, BadgeCheck, Star } from "lucide-react";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Seller Dashboard — HYPE" },
      { name: "description", content: "Manage your listings, orders, payouts and analytics from your HYPE seller dashboard." },
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
