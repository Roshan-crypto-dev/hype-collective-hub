import { createFileRoute, Link } from "@tanstack/react-router";
import { Eye, Gavel } from "lucide-react";
import { liveAuctions } from "@/lib/hype-data";
import { formatINR } from "@/lib/cart-store";

export const Route = createFileRoute("/auctions/")({ component: AuctionsList });

export function AuctionGrid({ items, badge }: { items: typeof liveAuctions; badge?: string }) {
  if (items.length === 0) {
    return <div className="grid place-items-center rounded-2xl bg-cream p-16 text-center font-display text-2xl">No auctions in this window</div>;
  }
  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {items.map((a) => (
        <Link
          key={a.id}
          to="/live-auctions/$id"
          params={{ id: a.id }}
          className="group overflow-hidden rounded-2xl bg-ink text-cream shadow-[0_10px_24px_-16px_rgba(0,0,0,0.4)] transition hover:-translate-y-0.5"
        >
          <div className="relative aspect-square">
            <img src={a.image} alt={a.name} loading="lazy" className="h-full w-full object-cover transition group-hover:scale-[1.02]" />
            <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-red px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-cream">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cream" /> {badge ?? "Live"}
            </span>
            <span className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-black/55 px-2.5 py-1 text-[11px] text-cream">
              <Eye size={12} /> {a.watching} watching
            </span>
            <span className="absolute right-3 top-3 rounded-full bg-cream px-2.5 py-1 text-[11px] font-bold text-ink">{a.endsIn}</span>
          </div>
          <div className="p-4">
            <h3 className="min-h-[40px] text-[15px] font-semibold leading-snug">{a.name}</h3>
            <div className="mt-1 text-xs text-cream/55">{a.brand} · {a.size} · {a.condition}</div>
            <div className="mt-3 flex items-end justify-between">
              <div>
                <div className="text-[10px] uppercase tracking-[0.14em] text-cream/55">Current bid</div>
                <div className="font-display text-lg">{formatINR(a.bid)}</div>
              </div>
              <span className="inline-flex items-center gap-1 rounded-full bg-gold px-3 py-1.5 text-[11px] font-bold text-ink"><Gavel size={12} /> BID</span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

function AuctionsList() {
  return <AuctionGrid items={liveAuctions} />;
}
