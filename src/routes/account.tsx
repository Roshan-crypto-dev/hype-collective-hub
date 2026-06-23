import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Package, Settings, Heart, LogOut } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { formatINR } from "@/lib/cart-store";

export const Route = createFileRoute("/account")({
  head: () => ({
    meta: [
      { title: "Your Account — HYPE" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AccountPage,
});

const orders = [
  { id: "HYP-841203", date: "Jun 12, 2026", total: 28750, status: "Delivered", item: "Air Jordan 1 'Chicago'" },
  { id: "HYP-839117", date: "May 28, 2026", total: 12999, status: "Shipped", item: "YEEZY Foam RNR 'Sand'" },
  { id: "HYP-835902", date: "May 02, 2026", total: 8499, status: "Pending", item: "FOG Essentials Hoodie" },
];

function AccountPage() {
  const [tab, setTab] = useState<"orders" | "profile" | "addresses">("orders");

  return (
    <SiteLayout>
      <div className="bg-shop-bg">
        <div className="mx-auto max-w-[1100px] px-4 py-12 sm:px-8">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-ink/55">Account</p>
              <h1 className="mt-1 font-display text-4xl">Hey, Arjun.</h1>
            </div>
            <Link to="/login" className="inline-flex items-center gap-2 rounded-full border border-ink/30 px-4 py-2 text-xs font-semibold tracking-[0.14em]">
              <LogOut size={13} /> SIGN OUT
            </Link>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-[220px_1fr]">
            <nav className="h-fit rounded-2xl bg-cream p-2">
              <TabBtn active={tab === "orders"} onClick={() => setTab("orders")} icon={<Package size={15} />} label="Orders" />
              <TabBtn active={tab === "profile"} onClick={() => setTab("profile")} icon={<Settings size={15} />} label="Profile" />
              <TabBtn active={tab === "addresses"} onClick={() => setTab("addresses")} icon={<Settings size={15} />} label="Addresses" />
              <Link to="/wishlist" className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm hover:bg-ink/5">
                <Heart size={15} /> Wishlist
              </Link>
            </nav>

            <div className="rounded-3xl bg-cream p-6 sm:p-8">
              {tab === "orders" && <Orders />}
              {tab === "profile" && <Profile />}
              {tab === "addresses" && <Addresses />}
            </div>
          </div>
        </div>
      </div>
    </SiteLayout>
  );
}

function TabBtn({ active, onClick, icon, label }: { active: boolean; onClick: () => void; icon: React.ReactNode; label: string }) {
  return (
    <button onClick={onClick} className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition ${active ? "bg-ink text-cream" : "hover:bg-ink/5"}`}>
      {icon} {label}
    </button>
  );
}

function Orders() {
  return (
    <div>
      <h2 className="font-display text-2xl">Order history</h2>
      <div className="mt-5 space-y-3">
        {orders.map((o) => (
          <div key={o.id} className="rounded-2xl border border-line bg-white p-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-ink/55">Order {o.id}</div>
                <div className="mt-1 text-sm font-semibold">{o.item}</div>
                <div className="text-xs text-ink/55">{o.date}</div>
              </div>
              <div className="text-right">
                <div className="font-display text-lg">{formatINR(o.total)}</div>
                <StatusPill status={o.status} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function StatusPill({ status }: { status: string }) {
  const cls =
    status === "Delivered" ? "bg-green text-green-ink" :
    status === "Shipped" ? "bg-amber-bg text-amber-ink" :
    "bg-ink/10 text-ink";
  return <span className={`mt-1 inline-block rounded-full px-2.5 py-0.5 text-[10px] font-bold ${cls}`}>{status.toUpperCase()}</span>;
}

function Profile() {
  return (
    <form className="grid gap-4 sm:grid-cols-2">
      <h2 className="font-display text-2xl sm:col-span-2">Profile</h2>
      <Field label="Full name" defaultValue="Arjun Mehta" />
      <Field label="Email" defaultValue="arjun@example.com" />
      <Field label="Phone" defaultValue="+91 98765 43210" />
      <Field label="Username" defaultValue="@arjunhype" />
      <div className="sm:col-span-2">
        <button type="button" className="rounded-full bg-ink px-6 py-2.5 text-xs font-semibold tracking-[0.14em] text-cream">SAVE CHANGES</button>
      </div>
    </form>
  );
}
function Addresses() {
  return (
    <div>
      <h2 className="font-display text-2xl">Saved addresses</h2>
      <div className="mt-4 rounded-2xl border border-line bg-white p-4 text-sm">
        <div className="font-semibold">Arjun Mehta</div>
        <p className="mt-1 text-ink/65">221B Bandra West, Mumbai, Maharashtra 400050<br />+91 98765 43210</p>
      </div>
      <button className="mt-4 rounded-full border border-ink/30 px-5 py-2.5 text-xs font-semibold tracking-[0.14em]">+ ADD ADDRESS</button>
    </div>
  );
}
function Field({ label, defaultValue }: { label: string; defaultValue?: string }) {
  return (
    <label className="flex flex-col gap-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-ink/65">
      {label}
      <input defaultValue={defaultValue} className="rounded-lg border border-line bg-white px-4 py-3 text-sm font-normal normal-case tracking-normal text-ink focus:border-ink focus:outline-none" />
    </label>
  );
}
