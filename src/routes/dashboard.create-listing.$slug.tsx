import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";
import { productImages } from "@/lib/hype-data";

export const Route = createFileRoute("/dashboard/create-listing/$slug")({
  head: ({ params }) => ({ meta: [{ title: `Select size — ${params.slug} | HYPE` }] }),
  component: SelectSize,
});

const sizes = [
  ["US W 5", "Ask"], ["US W 5.5", "₹5,700"], ["US W 6", "₹5,350"], ["US W 6.5", "₹5,350"],
  ["US W 7", "₹950"], ["US W 7.5", "₹4,300"], ["US W 8", "₹5,900"], ["US W 8.5", "₹7,100"],
  ["US W 9", "₹6,700"], ["US W 9.5", "₹5,900"], ["US W 10", "Ask"], ["US W 10.5", "Ask"],
  ["US W 11", "Ask"], ["US W 11.5", "Ask"], ["US W 12", "Ask"], ["US W 12.5", "Ask"],
  ["US W 13", "Ask"], ["US W 14", "Ask"],
];

function SelectSize() {
  return (
    <div>
      <Link to="/dashboard/create-listing" className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-ink/70 hover:text-ink">
        <ChevronLeft size={16} /> Create listing
      </Link>
      <div className="grid gap-10 lg:grid-cols-2">
        <div>
          <h1 className="font-display text-[34px] uppercase leading-[1] tracking-[-0.02em]">
            Nike Shox Z Calistra<br />Pale Ivory Oatmeal <span className="text-ink/55">(Women's)</span>
          </h1>
          <div className="mt-6 overflow-hidden rounded-2xl bg-gradient-to-br from-white to-[oklch(0.93_0.018_240)]">
            <img src={productImages.dunk} alt="" className="w-full object-contain" />
          </div>
        </div>
        <div>
          <h2 className="font-display text-2xl">Select Size</h2>
          <div className="mt-4 flex flex-wrap gap-2 text-[13px] font-semibold">
            <span className="text-ink/55">Highest Bids</span>
            {["US W","US M","UK","CM","KR","EU"].map((t,i) => (
              <button key={t} className={`rounded-full px-3.5 py-1.5 ${i===0?"bg-ink text-cream":""}`}>{t}</button>
            ))}
          </div>
          <div className="mt-5 grid grid-cols-4 gap-3">
            {sizes.map(([s, p]) => (
              <button key={s} className="rounded-xl bg-cream-2 px-3 py-5 text-center transition hover:ring-2 hover:ring-ink">
                <div className="font-semibold">{s}</div>
                <div className={`mt-1 text-sm ${p === "Ask" ? "text-ink/50" : "text-green-ink"}`}>{p}</div>
              </button>
            ))}
          </div>
          <div className="mt-10 flex items-center justify-between">
            <Link to="/dashboard/create-listing" className="rounded-full border border-ink/30 px-6 py-3 text-sm font-semibold">Cancel</Link>
            <Link to="/dashboard/create-listing/$slug/details" params={{ slug: "nike-shox" }} className="inline-flex items-center gap-2 rounded-full bg-ink px-7 py-3.5 text-sm font-bold text-cream">
              Next step →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
