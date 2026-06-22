import { createFileRoute, Link } from "@tanstack/react-router";
import { Search, TrendingUp } from "lucide-react";
import { productImages } from "@/lib/hype-data";

export const Route = createFileRoute("/dashboard/create-listing/")({
  head: () => ({ meta: [{ title: "Create Listing — HYPE Seller" }] }),
  component: CreateListing,
});

const trending = [
  { id: "mocha", name: "Jordan 1 Retro High", sub: "Mocha", price: "₹24,500 avg.", tag: "High Demand", img: productImages.chicago },
  { id: "dunk-panda", name: "Nike Dunk Low", sub: "Panda", price: "₹15,800 avg.", tag: "High Demand", img: productImages.dunk },
  { id: "yeezy-beluga", name: "Yeezy 350 V2", sub: "Beluga", price: "₹18,900 avg.", tag: "Selling Fast", img: productImages.yeezy },
  { id: "nb-9060", name: "New Balance 9060", sub: "Grey", price: "₹22,100 avg.", tag: "High Demand", img: productImages.dunk },
  { id: "samba-green", name: "Adidas Samba OG", sub: "Green", price: "₹12,900 avg.", tag: "Trending", img: productImages.gazelle },
];

const tagClass: Record<string, string> = {
  "High Demand": "bg-amber-bg text-amber-ink",
  "Selling Fast": "bg-[oklch(0.88_0.09_25)] text-[oklch(0.4_0.18_25)]",
  Trending: "bg-[oklch(0.88_0.07_270)] text-[oklch(0.4_0.12_270)]",
};

function CreateListing() {
  return (
    <div>
      <h1 className="font-display text-4xl tracking-tight">List Your Next Drop</h1>
      <p className="mt-1 text-ink/65">Start by searching the product you want to sell.</p>

      <div className="mt-6 rounded-2xl bg-cream-2 p-6">
        <div className="flex gap-3">
          <div className="flex flex-1 items-center gap-3 rounded-xl bg-white px-5 py-4 text-[15px] text-ink/45">
            <Search size={18} /> Search sneakers, brands, SKU or collections
          </div>
          <button className="rounded-xl bg-ink px-10 font-semibold text-cream">Search</button>
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-3 text-sm">
          <span className="text-ink/60">Popular searches:</span>
          {["Jordan 1", "Apple", "Rolex", "New Balance 9060", "Corteiz", "Travis Scott"].map((p) => (
            <button key={p} className="rounded-full border border-line bg-white px-4 py-2 font-medium hover:border-ink">{p}</button>
          ))}
        </div>
      </div>

      <h2 className="mt-10 flex items-center gap-2 font-display text-2xl"><TrendingUp size={22} className="text-green-ink" /> Trending Right Now</h2>
      <p className="mt-1 text-sm text-ink/60">Most listed sneakers this week</p>

      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {[...trending, ...trending, ...trending].map((t, i) => (
          <Link key={i} to="/dashboard/create-listing/$slug" params={{ slug: t.id }} className="rounded-2xl border border-line-soft bg-cream-2 p-3.5 transition hover:bg-cream">
            <img src={t.img} alt={t.name} className="aspect-[1/0.82] w-full rounded-lg object-cover" />
            <div className="mt-3 font-semibold">{t.name}</div>
            <div className="text-[13px] text-ink/55">{t.sub}</div>
            <div className="mt-2 font-display">{t.price}</div>
            <span className={`mt-3 inline-block rounded-full px-2.5 py-1 text-[11px] font-semibold ${tagClass[t.tag]}`}>{t.tag}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
