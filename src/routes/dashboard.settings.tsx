import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/dashboard/settings")({
  head: () => ({ meta: [{ title: "Account Settings — HYPE Seller" }] }),
  component: Settings,
});

function Settings() {
  const [tab, setTab] = useState<"profile" | "payouts" | "notifications" | "shipping">("profile");
  const tabs = [
    { id: "profile", label: "Store Profile" },
    { id: "payouts", label: "Payouts" },
    { id: "notifications", label: "Notifications" },
    { id: "shipping", label: "Shipping" },
  ] as const;

  return (
    <div className="space-y-6">
      <header>
        <h1 className="font-display text-4xl tracking-tight">Account Settings</h1>
        <p className="mt-1 text-ink/65">Manage your store profile, payouts and notifications.</p>
      </header>

      <div className="flex flex-wrap gap-1 border-b border-line">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`relative px-4 py-2.5 text-sm font-semibold ${tab === t.id ? "text-ink" : "text-ink/55 hover:text-ink"}`}
          >
            {t.label}
            {tab === t.id && <span className="absolute inset-x-2 -bottom-px h-0.5 bg-ink" />}
          </button>
        ))}
      </div>

      {tab === "profile" && <Profile />}
      {tab === "payouts" && <Payouts />}
      {tab === "notifications" && <Notifications />}
      {tab === "shipping" && <Shipping />}
    </div>
  );
}

function Card({ title, desc, children }: { title: string; desc?: string; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl border border-line bg-cream p-6">
      <h2 className="font-display text-xl">{title}</h2>
      {desc && <p className="mt-1 text-sm text-ink/60">{desc}</p>}
      <div className="mt-5 space-y-4">{children}</div>
    </section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.14em] text-ink/55">{label}</span>
      {children}
    </label>
  );
}

const input = "w-full rounded-xl border border-line bg-cream-2/60 px-4 py-2.5 text-sm focus:border-ink focus:bg-cream focus:outline-none";

function Profile() {
  return (
    <Card title="Store profile" desc="Public info shown to buyers on your storefront.">
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Store name"><input className={input} defaultValue="HYPE India Store" /></Field>
        <Field label="Handle"><input className={input} defaultValue="@hype.india" /></Field>
        <Field label="Contact email"><input className={input} type="email" defaultValue="store@hype.in" /></Field>
        <Field label="Phone"><input className={input} defaultValue="+91 98xxxxxx00" /></Field>
      </div>
      <Field label="Bio">
        <textarea rows={3} className={input} defaultValue="Authenticated grails out of Mumbai. Same-day pickups across BLR, DEL, BOM." />
      </Field>
      <div className="flex justify-end pt-2">
        <button className="rounded-xl bg-ink px-5 py-2.5 text-sm font-semibold text-cream hover:bg-ink/90">Save changes</button>
      </div>
    </Card>
  );
}

function Payouts() {
  return (
    <Card title="Bank account" desc="Payouts run every Tuesday for orders delivered 5+ days ago.">
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Account holder"><input className={input} defaultValue="HYPE Retail Pvt Ltd" /></Field>
        <Field label="IFSC"><input className={input} defaultValue="HDFC0000123" /></Field>
        <Field label="Account number"><input className={input} defaultValue="••••••••4421" /></Field>
        <Field label="GSTIN"><input className={input} defaultValue="27ABCDE1234F1Z5" /></Field>
      </div>
      <div className="rounded-xl border border-line-soft bg-cream-2 p-4 text-sm text-ink/70">
        Next payout: <b className="text-ink">₹48,720</b> on Tue 2 Jul.
      </div>
    </Card>
  );
}

function Notifications() {
  const items = [
    { k: "New bid on my listing", e: true, s: true },
    { k: "Auction ending in 1 hour", e: true, s: false },
    { k: "Order placed", e: true, s: true },
    { k: "Payout processed", e: true, s: false },
    { k: "Weekly performance digest", e: false, s: false },
  ];
  return (
    <Card title="Notifications" desc="Choose how you want to hear from us.">
      <table className="w-full text-sm">
        <thead className="text-left text-[11px] uppercase tracking-[0.14em] text-ink/55">
          <tr><th className="pb-2">Event</th><th className="pb-2 text-center">Email</th><th className="pb-2 text-center">SMS</th></tr>
        </thead>
        <tbody className="divide-y divide-line-soft">
          {items.map((i) => (
            <tr key={i.k}>
              <td className="py-3">{i.k}</td>
              <td className="py-3 text-center"><input type="checkbox" defaultChecked={i.e} className="h-4 w-4 accent-ink" /></td>
              <td className="py-3 text-center"><input type="checkbox" defaultChecked={i.s} className="h-4 w-4 accent-ink" /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
}

function Shipping() {
  return (
    <Card title="Shipping defaults" desc="Used as defaults when you create a new listing.">
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Pickup pincode"><input className={input} defaultValue="400001" /></Field>
        <Field label="Handling time"><input className={input} defaultValue="1–2 business days" /></Field>
        <Field label="Default carrier"><input className={input} defaultValue="Delhivery Express" /></Field>
        <Field label="Returns window"><input className={input} defaultValue="3 days post-delivery" /></Field>
      </div>
    </Card>
  );
}
