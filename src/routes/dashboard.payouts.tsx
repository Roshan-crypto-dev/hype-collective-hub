import { createFileRoute } from "@tanstack/react-router";
import { Info, Wallet, Clock, TrendingDown, TrendingUp, Download } from "lucide-react";
import { productImages } from "@/lib/hype-data";

export const Route = createFileRoute("/dashboard/payouts")({
  head: () => ({ meta: [{ title: "Payouts & Earnings — HYPE Seller" }] }),
  component: Payouts,
});

const rows = [
  { d: "18 May, 2026", o: "#HY23891", item: "Jordan 1 Retro High OG", sub: "Mocha", img: productImages.chicago, sale: 28500, comm: 2280, pct: 8, payout: 26220, st: "Paid" },
  { d: "17 May, 2026", o: "#HY23874", item: "Yeezy Foam RNNR", sub: "Sand", img: productImages.yeezy, sale: 12999, comm: 1040, pct: 8, payout: 11959, st: "Processing" },
  { d: "15 May, 2026", o: "#HY23791", item: "Chrome Hearts", sub: "Logo Tee", img: productImages.hoodie, sale: 58000, comm: 5800, pct: 10, payout: 52200, st: "Paid" },
  { d: "14 May, 2026", o: "#HY23725", item: "Louis Vuitton", sub: "Keepall 50", img: productImages.offwhite, sale: 65000, comm: 6500, pct: 10, payout: 58500, st: "Paid" },
  { d: "12 May, 2026", o: "#HY23680", item: "Essentials Hoodie", sub: "Jet Black", img: productImages.hoodie, sale: 9850, comm: 788, pct: 8, payout: 9062, st: "Paid" },
];

function Payouts() {
  return (
    <div>
      <h1 className="font-display text-4xl tracking-tight">Payouts & Earnings</h1>
      <p className="mt-1 text-ink/65">Track your pending payouts & view your payout history.</p>

      <div className="mt-6 grid gap-5 lg:grid-cols-[1fr_1.25fr]">
        {/* Pending */}
        <div className="relative overflow-hidden rounded-2xl bg-[radial-gradient(120%_140%_at_80%_20%,#3a2c14,#0c0b0a_60%)] p-7 text-cream">
          <div className="flex items-center gap-1.5 text-sm text-cream/70">Pending Payout <Info size={13} className="opacity-60" /></div>
          <div className="mt-2 font-display text-[52px] leading-none tracking-[-0.01em]">₹48,720.00</div>
          <div className="mt-4 inline-flex items-center gap-2.5 rounded-full bg-cream/10 px-5 py-2.5 text-sm font-medium ring-1 ring-cream/15">
            <span className="grid h-5 w-5 place-items-center rounded-full bg-amber-bg text-ink"><Clock size={11} /></span>
            3 orders awaiting payout
          </div>
          <p className="mt-4 max-w-xs text-xs text-cream/55">Payouts are processed after authentication & delivery</p>
          <div className="pointer-events-none absolute right-6 top-6 grid h-32 w-40 place-items-center rounded-2xl bg-[radial-gradient(circle_at_60%_40%,#2a2418,#0c0b0a)]">
            <Wallet size={68} className="text-gold" />
          </div>
        </div>

        {/* Commission */}
        <div className="rounded-2xl border border-line-soft bg-cream-2 p-7">
          <h3 className="flex items-center gap-1.5 text-base font-bold">Commission Structure <Info size={13} className="opacity-50" /></h3>
          <div className="mt-4 flex justify-between border-b border-line-soft pb-3 text-[13px] text-ink/55">
            <span>Sale Price</span><span>Commission</span>
          </div>
          {[
            { ic: <TrendingDown size={16} />, l: "Under ₹50,000", v: "7 – 8%" },
            { ic: <TrendingUp size={16} />, l: "Above ₹50,000", v: "10%" },
          ].map((r) => (
            <div key={r.l} className="flex items-center border-b border-line-soft py-5">
              <div className="mr-3.5 grid h-9 w-9 flex-none place-items-center rounded-lg bg-ink text-cream">{r.ic}</div>
              <div className="flex-1 text-[15px]">{r.l}</div>
              <div className="font-display text-lg">{r.v}</div>
            </div>
          ))}
          <p className="mt-3 text-[13px] text-ink/55">Final payout shown after authentication & platform fees.</p>
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-line-soft bg-cream-2 p-7">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold">Payout History</h3>
          <button className="flex items-center gap-2 rounded-lg bg-ink px-4 py-2.5 text-sm font-semibold text-cream"><Download size={15} /> Export CSV</button>
        </div>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[760px] border-collapse">
            <thead>
              <tr className="border-b border-line-soft text-left text-[13px] text-ink/55">
                <th className="px-3 py-3 font-medium">Date</th>
                <th className="px-3 py-3 font-medium">Order #</th>
                <th className="px-3 py-3 font-medium">Item</th>
                <th className="px-3 py-3 font-medium">Sale Price</th>
                <th className="px-3 py-3 font-medium">Commission</th>
                <th className="px-3 py-3 font-medium">Payout</th>
                <th className="px-3 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.o} className="border-b border-line-soft text-sm last:border-none">
                  <td className="px-3 py-4">{r.d}</td>
                  <td className="px-3 py-4">{r.o}</td>
                  <td className="px-3 py-4">
                    <div className="flex items-center gap-3">
                      <img src={r.img} className="h-9 w-9 flex-none rounded-lg object-cover" alt="" />
                      <div><b className="block">{r.item}</b><span className="text-[13px] text-ink/55">{r.sub}</span></div>
                    </div>
                  </td>
                  <td className="px-3 py-4">₹{r.sale.toLocaleString("en-IN")}.00</td>
                  <td className="px-3 py-4 font-semibold text-red">−₹{r.comm.toLocaleString("en-IN")}.00<span className="block text-[12px] font-normal text-ink/45">({r.pct}%)</span></td>
                  <td className="px-3 py-4 font-semibold">₹{r.payout.toLocaleString("en-IN")}.00</td>
                  <td className="px-3 py-4">
                    <span className={`inline-flex rounded-full px-3.5 py-1 text-xs font-semibold ${r.st === "Paid" ? "bg-green text-green-ink" : "bg-amber-bg text-amber-ink"}`}>{r.st}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 flex items-center gap-2 px-3 text-[13px] text-ink/55"><Info size={14} /> Payouts are processed once authentication is completed and the item is delivered to the buyer.</p>
      </div>
    </div>
  );
}
