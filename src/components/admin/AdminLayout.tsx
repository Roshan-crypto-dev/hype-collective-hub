import { Link, Outlet } from "@tanstack/react-router";
import {
  Activity,
  BadgeCheck,
  Banknote,
  BarChart3,
  Flag,
  Gavel,
  LayoutDashboard,
  Package,
  Settings,
  Shield,
  ShoppingBag,
  Users,
  type LucideIcon,
} from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";

const ADMIN_NAV: { to: string; label: string; icon: LucideIcon; exact?: boolean; section?: string }[] = [
  { to: "/admin", label: "Console", icon: LayoutDashboard, exact: true, section: "Overview" },
  { to: "/admin/analytics", label: "Analytics", icon: BarChart3, section: "Overview" },
  { to: "/admin/users", label: "Users", icon: Users, section: "People" },
  { to: "/admin/sellers", label: "Sellers & KYC", icon: BadgeCheck, section: "People" },
  { to: "/admin/products", label: "Listings", icon: ShoppingBag, section: "Catalog" },
  { to: "/admin/auctions", label: "Auctions", icon: Gavel, section: "Catalog" },
  { to: "/admin/authentication", label: "Authentication Queue", icon: Shield, section: "Catalog" },
  { to: "/admin/orders", label: "Orders", icon: Package, section: "Commerce" },
  { to: "/admin/payouts", label: "Payouts", icon: Banknote, section: "Commerce" },
  { to: "/admin/disputes", label: "Disputes", icon: Activity, section: "Trust" },
  { to: "/admin/moderation", label: "Moderation", icon: Flag, section: "Trust" },
  { to: "/admin/settings", label: "Platform Settings", icon: Settings, section: "System" },
];

export function AdminLayout() {
  const grouped = ADMIN_NAV.reduce<Record<string, typeof ADMIN_NAV>>((acc, item) => {
    const key = item.section ?? "Other";
    (acc[key] ||= []).push(item);
    return acc;
  }, {});

  return (
    <SiteLayout>
      <div className="bg-sand">
        <div className="mx-auto grid max-w-[1500px] grid-cols-1 gap-7 px-4 py-8 sm:px-6 lg:grid-cols-[260px_1fr]">
          <aside className="relative self-start overflow-hidden rounded-3xl bg-ink p-4 text-cream">
            <div className="rounded-2xl bg-red/15 p-4">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-red px-2.5 py-1 text-[11px] font-bold text-cream">
                <Shield size={12} /> Admin Console
              </span>
              <div className="mt-3 font-semibold">HYPE Platform Ops</div>
              <div className="mt-1 text-xs text-cream/65">Restricted access · audit logged</div>
            </div>
            <nav className="mt-4 flex flex-col gap-3">
              {Object.entries(grouped).map(([section, items]) => (
                <div key={section}>
                  <div className="px-3 pb-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-cream/40">{section}</div>
                  {items.map((it) => (
                    <Link
                      key={it.to}
                      to={it.to}
                      activeOptions={{ exact: it.exact }}
                      className="flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium text-cream/75 transition hover:bg-cream/5 hover:text-cream [&.active]:bg-cream [&.active]:text-ink"
                    >
                      <it.icon size={15} /> {it.label}
                    </Link>
                  ))}
                </div>
              ))}
            </nav>
          </aside>
          <section className="min-w-0"><Outlet /></section>
        </div>
      </div>
    </SiteLayout>
  );
}

/* Reusable admin building blocks */

export function AdminHeader({ title, subtitle, action }: { title: string; subtitle?: string; action?: React.ReactNode }) {
  return (
    <header className="mb-6 flex flex-wrap items-end justify-between gap-3">
      <div>
        <h1 className="font-display text-3xl text-ink">{title}</h1>
        {subtitle && <p className="mt-1 text-sm text-ink/60">{subtitle}</p>}
      </div>
      {action}
    </header>
  );
}

export function StatCard({ label, value, hint, tone = "ink" }: { label: string; value: string; hint?: string; tone?: "ink" | "green" | "red" | "gold" }) {
  const toneCls = { ink: "bg-ink text-cream", green: "bg-green text-green-ink", red: "bg-red text-cream", gold: "bg-gold text-ink" }[tone];
  return (
    <div className={`rounded-2xl p-5 ${toneCls}`}>
      <div className="text-[11px] font-bold uppercase tracking-[0.16em] opacity-75">{label}</div>
      <div className="mt-2 font-display text-3xl">{value}</div>
      {hint && <div className="mt-1 text-xs opacity-70">{hint}</div>}
    </div>
  );
}

export function DataCard({ title, action, children }: { title: string; action?: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-line-soft bg-cream p-5">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-display text-lg">{title}</h2>
        {action}
      </div>
      {children}
    </div>
  );
}

export function PillTabs({ tabs, active }: { tabs: string[]; active: string }) {
  return (
    <div className="mb-5 flex flex-wrap gap-2">
      {tabs.map((t) => (
        <button
          key={t}
          className={`rounded-full border px-4 py-1.5 text-xs font-bold uppercase tracking-[0.14em] transition ${
            t === active ? "border-ink bg-ink text-cream" : "border-line bg-white text-ink/65 hover:border-ink"
          }`}
        >
          {t}
        </button>
      ))}
    </div>
  );
}

export function Th({ children }: { children: React.ReactNode }) {
  return <th className="border-b border-line-soft px-3 py-2.5 text-left text-[11px] font-bold uppercase tracking-[0.14em] text-ink/55">{children}</th>;
}
export function Td({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <td className={`border-b border-line-soft/60 px-3 py-3 align-middle text-sm ${className}`}>{children}</td>;
}
export function StatusPill({ tone, children }: { tone: "green" | "amber" | "red" | "ink" | "gold"; children: React.ReactNode }) {
  const t = {
    green: "bg-green text-green-ink",
    amber: "bg-amber-bg text-amber-ink",
    red: "bg-red text-cream",
    ink: "bg-ink/10 text-ink",
    gold: "bg-gold text-ink",
  }[tone];
  return <span className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-bold ${t}`}>{children}</span>;
}


