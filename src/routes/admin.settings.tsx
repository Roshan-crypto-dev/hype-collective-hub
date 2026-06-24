import { createFileRoute } from "@tanstack/react-router";
import { AdminHeader, DataCard } from "@/components/admin/AdminLayout";

export const Route = createFileRoute("/admin/settings")({ component: Page });

function Row({ label, hint, value }: { label: string; hint?: string; value: React.ReactNode }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line-soft py-3 last:border-none">
      <div>
        <div className="font-semibold">{label}</div>
        {hint && <div className="text-xs text-ink/55">{hint}</div>}
      </div>
      <div>{value}</div>
    </div>
  );
}

function Page() {
  return (
    <>
      <AdminHeader title="Platform Settings" subtitle="Fees · policies · feature flags · banners" />
      <div className="grid gap-5 lg:grid-cols-2">
        <DataCard title="Fees & commission">
          <Row label="Buyer fee" hint="Charged on top of bid / price" value={<input defaultValue="3.5%" className="w-20 rounded-md border border-line px-3 py-1.5 text-sm" />} />
          <Row label="Seller commission" hint="Platform take rate" value={<input defaultValue="11%" className="w-20 rounded-md border border-line px-3 py-1.5 text-sm" />} />
          <Row label="Authentication fee" hint="Per item" value={<input defaultValue="₹499" className="w-24 rounded-md border border-line px-3 py-1.5 text-sm" />} />
          <Row label="Payout threshold" value={<input defaultValue="₹1,000" className="w-24 rounded-md border border-line px-3 py-1.5 text-sm" />} />
        </DataCard>
        <DataCard title="Feature flags">
          <Row label="Live auctions" hint="Realtime bidding surface" value={<Toggle on />} />
          <Row label="Buy-now alongside auction" value={<Toggle on />} />
          <Row label="Promoted listings" value={<Toggle />} />
          <Row label="Bulk CSV upload (seller)" value={<Toggle on />} />
          <Row label="Crypto checkout" hint="Experimental" value={<Toggle />} />
        </DataCard>
        <DataCard title="Trust & safety">
          <Row label="Auto-hold high-risk orders" value={<Toggle on />} />
          <Row label="Require 2FA for sellers" value={<Toggle on />} />
          <Row label="Shadow ban threshold" value={<input defaultValue="3 reports" className="w-32 rounded-md border border-line px-3 py-1.5 text-sm" />} />
        </DataCard>
        <DataCard title="Site banner">
          <textarea defaultValue="Free shipping on orders above ₹25,000 · Authenticated by HYPE" className="w-full rounded-lg border border-line p-3 text-sm" rows={3} />
          <div className="mt-2 flex justify-end gap-2">
            <button className="rounded-full border border-line px-4 py-1.5 text-xs font-bold uppercase tracking-[0.14em]">Reset</button>
            <button className="rounded-full bg-ink px-4 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-cream">Save</button>
          </div>
        </DataCard>
      </div>
    </>
  );
}

function Toggle({ on }: { on?: boolean }) {
  return (
    <span className={`relative inline-block h-6 w-11 rounded-full transition ${on ? "bg-green" : "bg-ink/15"}`}>
      <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-cream shadow transition ${on ? "left-[22px]" : "left-0.5"}`} />
    </span>
  );
}
