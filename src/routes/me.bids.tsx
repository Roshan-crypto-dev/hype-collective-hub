import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/me/bids")({ component: Page });

const BIDS = [
  { item: "Yeezy 350 V2 Beluga", id: "yeezy-beluga", my: 24500, top: 25200, status: "outbid" },
  { item: "Nike Dunk Low Panda", id: "dunk-panda", my: 18500, top: 18500, status: "leading" },
  { item: "AJ4 University Blue", id: "jordan4-uni", my: 27000, top: 28750, status: "outbid" },
  { item: "Off-White AJ1", id: "offwhite-aj1", my: 30000, top: 28000, status: "won" },
];

function Page() {
  return (
    <>
      <h1 className="mb-6 font-display text-3xl">My Bids</h1>
      <div className="overflow-hidden rounded-2xl border border-line-soft bg-cream">
        <table className="w-full">
          <thead>
            <tr className="text-left text-[11px] uppercase tracking-[0.14em] text-ink/55">
              <th className="px-4 py-3">Item</th><th className="px-4 py-3">My bid</th><th className="px-4 py-3">Top bid</th><th className="px-4 py-3">Status</th><th className="px-4 py-3"> </th>
            </tr>
          </thead>
          <tbody>
            {BIDS.map((b) => (
              <tr key={b.id} className="border-t border-line-soft">
                <td className="px-4 py-3 font-semibold">{b.item}</td>
                <td className="px-4 py-3">₹{b.my.toLocaleString("en-IN")}</td>
                <td className="px-4 py-3 font-semibold">₹{b.top.toLocaleString("en-IN")}</td>
                <td className="px-4 py-3">
                  {b.status === "leading" && <span className="rounded-full bg-green px-2.5 py-1 text-[11px] font-bold text-green-ink">Leading</span>}
                  {b.status === "outbid" && <span className="rounded-full bg-red px-2.5 py-1 text-[11px] font-bold text-cream">Outbid</span>}
                  {b.status === "won" && <span className="rounded-full bg-gold px-2.5 py-1 text-[11px] font-bold text-ink">Won — pay now</span>}
                </td>
                <td className="px-4 py-3"><Link to="/live-auctions/$id" params={{ id: b.id }} className="text-xs font-bold uppercase tracking-[0.14em] hover:underline">View →</Link></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
