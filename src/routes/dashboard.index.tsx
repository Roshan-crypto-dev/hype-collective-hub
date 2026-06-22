import { createFileRoute, Link } from "@tanstack/react-router";
import { Eye, Package, Wallet, BarChart3 } from "lucide-react";

export const Route = createFileRoute("/dashboard/")({
  head: () => ({ meta: [{ title: "Overview — Seller Dashboard | HYPE" }] }),
  component: Overview,
});

function Overview() {
  const stats = [
    { k: "Active Listings", v: "12", icon: Eye },
    { k: "Pending Pickups", v: "04", icon: Package },
    { k: "Pending Payout", v: "₹48,720", icon: Wallet },
    { k: "30-day Sales", v: "₹2.1L", icon: BarChart3 },
  ];
  const quick = [
    { to: "/dashboard/create-listing", label: "Create a Listing", desc: "Search the catalog and list a new drop." },
    { to: "/dashboard/orders", label: "Orders & Shipments", desc: "Track pickups, authentication and delivery." },
    { to: "/dashboard/payouts", label: "Payouts & Earnings", desc: "View pending and historical payouts." },
  ];
  return (
    <div>
      <h1 className="font-display text-4xl tracking-tight">Welcome back.</h1>
      <p className="mt-1 text-ink/65">Here's how HYPE India Store is performing this week.</p>

      <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.k} className="rounded-2xl bg-ink p-6 text-cream">
            <div className="flex items-center gap-2.5 text-[13px] text-cream/70"><s.icon size={16} /> {s.k}</div>
            <div className="mt-3 font-display text-4xl">{s.v}</div>
          </div>
        ))}
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        {quick.map((q) => (
          <Link key={q.to} to={q.to} className="rounded-2xl bg-cream-2 p-6 transition hover:bg-cream">
            <div className="font-display text-xl">{q.label}</div>
            <p className="mt-2 text-sm text-ink/65">{q.desc}</p>
            <div className="mt-4 text-sm font-bold underline underline-offset-4">Open →</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
