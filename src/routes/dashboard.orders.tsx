import { createFileRoute } from "@tanstack/react-router";
import { Package, Truck, ShieldCheck, CheckCircle2, XCircle, Info, ChevronDown, ArrowRight } from "lucide-react";
import { productImages } from "@/lib/hype-data";

export const Route = createFileRoute("/dashboard/orders")({
  head: () => ({ meta: [{ title: "Orders & Shipments — HYPE Seller" }] }),
  component: Orders,
});

function Orders() {
  const stats = [
    { k: "Active Orders", v: "02", sub: "Live orders being processed", icon: Package },
    { k: "Pending Pickup", v: "04", sub: "Awaiting courier pickup", icon: Truck },
    { k: "In Authentication", v: "08", sub: "Being verified by HYPE", icon: ShieldCheck },
    { k: "Completed", v: "126", sub: "Successfully delivered", icon: CheckCircle2 },
    { k: "Cancelled", v: "02", sub: "Orders cancelled / refunded", icon: XCircle },
  ];

  return (
    <div>
      <h1 className="font-display text-4xl tracking-tight">Orders & Shipments</h1>
      <p className="mt-1 text-ink/65">Track pickups, authentication progress and completed orders.</p>

      <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-5">
        {stats.map((s) => (
          <div key={s.k} className="rounded-2xl bg-ink p-5 text-cream">
            <div className="flex items-center gap-2 text-[13px] text-cream/80"><s.icon size={18} /> {s.k}</div>
            <div className="mt-3 font-display text-[44px] leading-none">{s.v}</div>
            <div className="mt-2 text-xs text-cream/55">{s.sub}</div>
          </div>
        ))}
      </div>

      <div className="mt-7 flex flex-wrap items-center gap-3">
        {["Pending Pickup", "In Authentication", "Completed", "Cancelled"].map((t, i) => (
          <button key={t} className={`rounded-full px-6 py-3 text-sm font-semibold ${i === 0 ? "bg-ink text-cream" : "text-ink/65"}`}>{t}</button>
        ))}
        <button className="ml-auto flex items-center gap-3 rounded-xl border border-line bg-cream-2 px-4 py-3 text-sm font-medium">Sort by: Newest <ChevronDown size={13} /></button>
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-[1fr_360px]">
        <div className="space-y-4">
          {[3, 11].map((hr) => (
            <div key={hr} className="rounded-2xl border border-line-soft bg-cream-2 p-7">
              <h3 className="font-display text-xl">Pickup Scheduled</h3>
              <div className="mt-2 font-semibold text-red">Pickup in {hr} hrs</div>
              <p className="mt-3 text-sm text-ink/60">Courier partner will collect and verify packaging.</p>
              <button className="mt-4 rounded-lg bg-ink px-6 py-3 text-sm font-semibold text-cream">Track Pickup</button>
            </div>
          ))}
        </div>

        <aside className="self-start rounded-2xl border border-line-soft bg-cream-2 p-6">
          <h3 className="font-display text-xl">Shipment Insights</h3>
          <Block k="Next Payout (Est.)" v="₹42,800" sub="Expected on 24 May, 2026" />
          <Block k="Avg Authentication Time" v="1.8 days" sub="−0.3 days vs last 30 days" greenSub />
          <div className="border-t border-line-soft py-4">
            <div className="text-sm text-ink/65">Fastest Sold Item</div>
            <div className="mt-2 flex items-center gap-3">
              <img src={productImages.jordan4} alt="" className="h-12 w-12 flex-none rounded-lg object-cover" />
              <div>
                <b className="block text-[15px]">Jordan 4 Retro<br />Military Black</b>
                <span className="text-[13px] text-ink/45">Sold in 28 mins</span>
              </div>
            </div>
          </div>
          <Block k="Pending Deadlines" v="2 Pickups in < 12 hrs" />
          <button className="mt-2 w-full rounded-lg bg-ink py-3 text-sm font-semibold text-cream">View Deadlines</button>
          <div className="mt-5 border-t border-line-soft pt-5">
            <b className="block text-[15px]">Need Help?</b>
            <p className="mt-1.5 text-sm leading-snug text-ink/65">Visit our Help Center for guides and shipping best practices.</p>
            <a className="mt-3 inline-flex items-center gap-2 text-sm font-bold">Go to Help Center <ArrowRight size={14} /></a>
          </div>
        </aside>
      </div>
    </div>
  );
}

function Block({ k, v, sub, greenSub }: { k: string; v: string; sub?: string; greenSub?: boolean }) {
  return (
    <div className="border-t border-line-soft py-4">
      <div className="flex items-center gap-1.5 text-sm text-ink/65">{k} <Info size={13} className="opacity-50" /></div>
      <div className="mt-1 font-display text-[26px] leading-tight">{v}</div>
      {sub && <div className={`text-[13px] ${greenSub ? "font-semibold text-green-ink" : "text-ink/45"}`}>{sub}</div>}
    </div>
  );
}
