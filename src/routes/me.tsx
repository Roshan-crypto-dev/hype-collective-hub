import { createFileRoute, Outlet, Link } from "@tanstack/react-router";
import { Bell, CreditCard, Gavel, Heart, MapPin, Settings, Truck, User, type LucideIcon } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { useRole } from "@/lib/role-store";

const NAV: { to: string; label: string; icon: LucideIcon; exact?: boolean }[] = [
  { to: "/me", label: "Overview", icon: User, exact: true },
  { to: "/me/bids", label: "My Bids", icon: Gavel },
  { to: "/me/watchlist", label: "Watchlist", icon: Heart },
  { to: "/me/orders", label: "Orders", icon: Truck },
  { to: "/me/addresses", label: "Addresses", icon: MapPin },
  { to: "/me/payments", label: "Payment methods", icon: CreditCard },
  { to: "/me/notifications", label: "Notifications", icon: Bell },
];

export const Route = createFileRoute("/me")({
  head: () => ({ meta: [{ title: "Account — HYPE" }, { name: "robots", content: "noindex" }] }),
  component: MeLayout,
});

function MeLayout() {
  const { name, initials, role } = useRole();
  return (
    <SiteLayout>
      <div className="bg-sand">
        <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-7 px-4 py-8 sm:px-6 lg:grid-cols-[260px_1fr]">
          <aside className="self-start overflow-hidden rounded-3xl bg-ink p-4 text-cream">
            <div className="flex items-center gap-3 rounded-2xl bg-cream/5 p-3">
              <span className="grid h-12 w-12 place-items-center rounded-full bg-gold text-sm font-bold text-ink">{initials}</span>
              <div className="min-w-0">
                <div className="truncate font-semibold">{name}</div>
                <div className="text-[11px] uppercase tracking-[0.14em] text-cream/55">{role}</div>
              </div>
            </div>
            <nav className="mt-3 flex flex-col">
              {NAV.map((n) => (
                <Link
                  key={n.to}
                  to={n.to}
                  activeOptions={{ exact: n.exact }}
                  className="flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium text-cream/75 transition hover:bg-cream/5 hover:text-cream [&.active]:bg-cream [&.active]:text-ink"
                >
                  <n.icon size={15} /> {n.label}
                </Link>
              ))}
              <Link to="/me/notifications" className="mt-1 flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium text-cream/75 hover:bg-cream/5">
                <Settings size={15} /> Preferences
              </Link>
            </nav>
          </aside>
          <section className="min-w-0"><Outlet /></section>
        </div>
      </div>
    </SiteLayout>
  );
}
