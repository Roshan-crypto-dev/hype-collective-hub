import { createFileRoute, Link } from "@tanstack/react-router";
import { Plus, Search, MoreVertical, Eye, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import { shopItems } from "@/lib/hype-data";

export const Route = createFileRoute("/dashboard/listings")({
  head: () => ({ meta: [{ title: "My Listings — HYPE Seller" }] }),
  component: Listings,
});

type Status = "Active" | "Draft" | "Sold" | "Paused";

const rows: Array<{ id: string; title: string; img: string; price: number; status: Status; views: number; watch: number; updated: string }> = shopItems.slice(0, 8).map((s, i) => ({
  id: s.id,
  title: s.title,
  img: s.image,
  price: s.price,
  status: (["Active", "Active", "Draft", "Active", "Sold", "Paused", "Active", "Active"] as Status[])[i],
  views: 120 + i * 47,
  watch: 12 + i * 5,
  updated: `${i + 1}d ago`,
}));

const tabs: Array<Status | "All"> = ["All", "Active", "Draft", "Sold", "Paused"];

function Listings() {
  const [tab, setTab] = useState<(typeof tabs)[number]>("All");
  const [q, setQ] = useState("");
  const filtered = rows.filter((r) => (tab === "All" || r.status === tab) && r.title.toLowerCase().includes(q.toLowerCase()));

  return (
    <div className="space-y-5">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-display text-4xl tracking-tight">My Listings</h1>
          <p className="mt-1 text-ink/65">{rows.filter((r) => r.status === "Active").length} active · {rows.length} total</p>
        </div>
        <Link to="/dashboard/create-listing" className="inline-flex items-center gap-2 rounded-xl bg-ink px-4 py-2.5 text-sm font-semibold text-cream hover:bg-ink/90">
          <Plus size={16} /> New listing
        </Link>
      </header>

      <div className="flex flex-wrap items-center gap-3">
        <div className="flex gap-1 rounded-full border border-line bg-cream p-1">
          {tabs.map((t) => (
            <button key={t} onClick={() => setTab(t)} className={`rounded-full px-3.5 py-1.5 text-xs font-semibold ${tab === t ? "bg-ink text-cream" : "text-ink/65 hover:text-ink"}`}>
              {t}
            </button>
          ))}
        </div>
        <label className="ml-auto flex items-center gap-2 rounded-full border border-line bg-cream px-4 py-2 text-sm">
          <Search size={14} className="opacity-60" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search listings" className="w-48 bg-transparent focus:outline-none" />
        </label>
      </div>

      <div className="overflow-hidden rounded-2xl border border-line bg-cream">
        <table className="w-full text-sm">
          <thead className="bg-cream-2 text-left text-[11px] uppercase tracking-[0.14em] text-ink/55">
            <tr>
              <th className="px-4 py-3">Item</th>
              <th className="px-4 py-3">Price</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-right">Views</th>
              <th className="px-4 py-3 text-right">Watch</th>
              <th className="px-4 py-3">Updated</th>
              <th className="px-2 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-line-soft">
            {filtered.map((r) => (
              <tr key={r.id} className="hover:bg-cream-2/60">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <img src={r.img} alt="" className="h-12 w-12 rounded-md object-cover" />
                    <span className="font-medium">{r.title}</span>
                  </div>
                </td>
                <td className="px-4 py-3 font-mono">₹{r.price.toLocaleString("en-IN")}</td>
                <td className="px-4 py-3">
                  <StatusPill s={r.status} />
                </td>
                <td className="px-4 py-3 text-right font-mono">{r.views}</td>
                <td className="px-4 py-3 text-right font-mono">{r.watch}</td>
                <td className="px-4 py-3 text-ink/65">{r.updated}</td>
                <td className="px-2 py-3">
                  <div className="flex items-center justify-end gap-1 text-ink/60">
                    <button className="grid h-8 w-8 place-items-center rounded-full hover:bg-cream-2" aria-label="View"><Eye size={14} /></button>
                    <button className="grid h-8 w-8 place-items-center rounded-full hover:bg-cream-2" aria-label="Edit"><Pencil size={14} /></button>
                    <button className="grid h-8 w-8 place-items-center rounded-full hover:bg-cream-2" aria-label="Delete"><Trash2 size={14} /></button>
                    <button className="grid h-8 w-8 place-items-center rounded-full hover:bg-cream-2" aria-label="More"><MoreVertical size={14} /></button>
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr><td colSpan={7} className="px-4 py-12 text-center text-ink/55">No listings match.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function StatusPill({ s }: { s: Status }) {
  const map: Record<Status, string> = {
    Active: "bg-green/15 text-green",
    Draft: "bg-ink/8 text-ink/70",
    Sold: "bg-gold/20 text-gold-ink",
    Paused: "bg-red/15 text-red",
  };
  return <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${map[s]}`}>{s}</span>;
}
