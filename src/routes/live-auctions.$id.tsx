import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Minus, Plus, Eye, Users, Info, BadgeCheck, ShieldCheck, Truck, ArrowRight, Heart, ZoomIn, X, ChevronLeft, ChevronRight, Gavel, Share2 } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { liveAuctions, productImages } from "@/lib/hype-data";

function findAuctionItem(id: string) {
  const live = liveAuctions.find((a) => a.id === id);
  if (live) return { name: live.name, image: live.image, price: live.bid, brand: live.brand };
  return { name: "Air Jordan 1 Retro High OG 'Chicago'", image: productImages.chicago, price: 28800, brand: "Nike" };
}

export const Route = createFileRoute("/live-auctions/$id")({
  head: ({ params }) => {
    const item = findAuctionItem(params.id);
    const url = `https://hype-collective-hub.lovable.app/live-auctions/${params.id}`;
    const desc = `Live auction for ${item.name}. Real-time bidding, HYPE-verified, ships in 3–8 days.`;
    return {
      meta: [
        { title: `Live Auction — ${item.name} | HYPE` },
        { name: "description", content: desc },
        { property: "og:title", content: `Live Auction — ${item.name}` },
        { property: "og:description", content: desc },
        { property: "og:type", content: "product" },
        { property: "og:url", content: url },
        { property: "og:image", content: item.image },
        { name: "twitter:image", content: item.image },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: item.name,
            image: [item.image],
            brand: { "@type": "Brand", name: item.brand },
            description: desc,
            offers: {
              "@type": "Offer",
              priceCurrency: "INR",
              price: item.price,
              availability: "https://schema.org/InStock",
              url,
            },
          }),
        },
      ],
    };
  },
  component: AuctionPage,
});


function AuctionPage() {
  return (
    <SiteLayout>
      <div className="bg-cream/60 px-4 py-5 text-sm text-ink/70 sm:px-8">
        <div className="mx-auto max-w-[1440px] overflow-x-auto whitespace-nowrap">
          <Link to="/" className="hover:underline">Home</Link>
          <span className="mx-2 opacity-50">/</span>
          <Link to="/auctions/live" className="hover:underline">Live Auctions</Link>
          <span className="mx-2 opacity-50">/</span>
          <span>Sneakers</span>
          <span className="mx-2 opacity-50">/</span>
          <span className="text-ink">Nike Air Jordan 1 Retro High OG</span>
        </div>
      </div>

      <div className="bg-sand">
        <div className="mx-auto max-w-[1440px] px-4 py-8 sm:px-8 sm:py-10">
          <HeroBlock />
          <DetailBlock />
          <Related />
        </div>
      </div>
    </SiteLayout>
  );
}

const gallery = [
  productImages.chicago,
  productImages.jordan4,
  productImages.offwhite,
  productImages.dunk,
  productImages.yeezy,
];

function MediaGallery({ onZoom }: { onZoom: (i: number) => void }) {
  const [active, setActive] = useState(0);
  return (
    <div className="flex flex-col gap-3 sm:gap-4">
      <div className="relative overflow-hidden rounded-3xl bg-white shadow-[0_40px_80px_-30px_rgba(0,0,0,0.4)]">
        <button
          type="button"
          onClick={() => onZoom(active)}
          className="group block aspect-[4/5] w-full sm:aspect-[4/4.9] lg:min-h-[640px] xl:min-h-[760px]"
          aria-label="Zoom product image"
        >
          <img
            src={gallery[active]}
            alt="Air Jordan 1 Chicago"
            className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
          />
        </button>

        <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-red px-3 py-1 text-xs font-bold text-cream">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cream" /> LIVE
        </span>
        <div className="absolute right-4 top-4 flex flex-col gap-2">
          <button
            type="button"
            onClick={() => onZoom(active)}
            className="grid h-10 w-10 place-items-center rounded-full bg-white/90 text-ink shadow-sm backdrop-blur hover:bg-white"
            aria-label="Zoom"
          >
            <ZoomIn size={16} />
          </button>
          <button
            type="button"
            className="grid h-10 w-10 place-items-center rounded-full bg-white/90 text-ink shadow-sm backdrop-blur hover:bg-white"
            aria-label="Share"
          >
            <Share2 size={16} />
          </button>
        </div>
        <span className="absolute bottom-4 right-4 rounded-full bg-ink/80 px-3 py-1 text-[11px] font-semibold text-cream backdrop-blur">
          {active + 1} / {gallery.length}
        </span>
        <button
          type="button"
          onClick={() => setActive((a) => (a - 1 + gallery.length) % gallery.length)}
          className="absolute left-3 top-1/2 hidden h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-ink shadow-sm hover:bg-white sm:grid"
          aria-label="Previous image"
        >
          <ChevronLeft size={18} />
        </button>
        <button
          type="button"
          onClick={() => setActive((a) => (a + 1) % gallery.length)}
          className="absolute right-3 top-1/2 hidden h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-ink shadow-sm hover:bg-white sm:grid"
          aria-label="Next image"
        >
          <ChevronRight size={18} />
        </button>
      </div>
      <div className="flex gap-2 overflow-x-auto pb-1 sm:gap-3">
        {gallery.map((src, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setActive(i)}
            className={`relative aspect-square h-20 w-20 shrink-0 overflow-hidden rounded-xl border-2 transition sm:h-[88px] sm:w-[88px] ${
              i === active ? "border-ink" : "border-transparent opacity-70 hover:opacity-100"
            }`}
            aria-label={`Show image ${i + 1}`}
          >
            <img src={src} alt="" className="h-full w-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}

function ZoomDialog({ index, onClose, onChange }: { index: number; onClose: () => void; onChange: (i: number) => void }) {
  return (
    <div
      className="fixed inset-0 z-[100] grid place-items-center bg-ink/90 p-4 backdrop-blur"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-cream hover:bg-white/20"
        aria-label="Close zoom"
      >
        <X size={20} />
      </button>
      <button
        type="button"
        onClick={(e) => { e.stopPropagation(); onChange((index - 1 + gallery.length) % gallery.length); }}
        className="absolute left-4 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-cream hover:bg-white/20"
        aria-label="Previous"
      >
        <ChevronLeft size={22} />
      </button>
      <img
        src={gallery[index]}
        alt=""
        onClick={(e) => e.stopPropagation()}
        className="max-h-[90vh] max-w-[92vw] rounded-2xl object-contain"
      />
      <button
        type="button"
        onClick={(e) => { e.stopPropagation(); onChange((index + 1) % gallery.length); }}
        className="absolute right-4 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-cream hover:bg-white/20"
        aria-label="Next"
      >
        <ChevronRight size={22} />
      </button>
    </div>
  );
}

function HeroBlock() {
  const [zoomAt, setZoomAt] = useState<number | null>(null);
  const [wished, setWished] = useState(false);
  return (
    <div className="mb-9 grid grid-cols-1 gap-8 lg:grid-cols-[1.55fr_1fr] lg:gap-12">
      <MediaGallery onZoom={(i) => setZoomAt(i)} />

      <div className="flex flex-col gap-6">
        <div>
          <div className="flex items-center justify-between gap-3">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-green px-3 py-1 text-xs font-bold text-green-ink">
              <span className="h-1.5 w-1.5 rounded-full bg-green-ink" /> LIVE
            </span>
            <button
              type="button"
              onClick={() => setWished((w) => !w)}
              aria-pressed={wished}
              aria-label="Add to wishlist"
              className={`grid h-11 w-11 place-items-center rounded-full border transition ${
                wished ? "border-red bg-red/10 text-red" : "border-line bg-white text-ink hover:border-ink"
              }`}
            >
              <Heart size={18} fill={wished ? "currentColor" : "none"} />
            </button>
          </div>
          <h1 className="mt-4 font-display text-[34px] leading-[0.98] tracking-[-0.02em] sm:text-[48px]">
            Air Jordan 1<br />Retro High OG 'Chicago'
          </h1>
          <div className="mt-4 flex items-center gap-3 text-sm font-semibold">
            Nike
            <span className="inline-flex items-center gap-1 rounded-full bg-green px-2.5 py-0.5 text-[11px] text-green-ink">
              <BadgeCheck size={12} /> HYPE Verified
            </span>
          </div>
          <div className="mt-4 border-y border-line py-3 text-sm text-ink/65">
            <b className="text-ink">Condition:</b> DS &nbsp;|&nbsp; <b className="text-ink">Size:</b> UK 9 / US 10
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-ink/65">
            <span className="inline-flex items-center gap-1.5"><Eye size={14} /> 1,425 Watching</span>
            <span className="inline-flex items-center gap-1.5"><Users size={14} /> 460 Active bidders</span>
          </div>
          <div className="mt-6 flex items-end justify-between gap-6">
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.06em] text-ink/65">Current Bid</div>
              <div className="mt-1 font-display text-[44px] leading-none tracking-[-0.02em] sm:text-[56px]">₹28,800</div>
              <div className="mt-1 text-sm font-semibold text-green-ink">+ ₹500 next minimum bid</div>
            </div>
            <div className="text-right">
              <div className="text-xs font-semibold uppercase tracking-[0.06em] text-ink/65">Ends In</div>
              <div className="mt-1 font-display text-[28px] leading-none tracking-[0.02em] text-red sm:text-[36px]">00:14:21</div>
            </div>
          </div>
        </div>

        <div className="rounded-3xl bg-cream p-5 sm:p-7">
          <h3 className="mb-4 text-base font-semibold">Place Your Bid</h3>
          <div className="mb-2 flex items-center justify-between gap-3">
            <span className="font-display text-[32px] leading-none tracking-[-0.02em] sm:text-[40px]">₹28,800</span>
            <div className="flex gap-2.5">
              <button className="grid h-11 w-11 place-items-center rounded-xl border border-line bg-white"><Minus size={18} /></button>
              <button className="grid h-11 w-11 place-items-center rounded-xl border border-line bg-white"><Plus size={18} /></button>
            </div>
          </div>
          <div className="mb-4 text-sm text-ink/65">Minimum next: <b className="text-ink">₹28,800</b></div>
          <div className="mb-3 flex gap-2.5">
            {["+300", "+500", "+1000"].map((q) => (
              <button key={q} className="flex-1 rounded-full border border-line bg-white py-3 text-sm font-semibold hover:border-ink">{q}</button>
            ))}
          </div>
          <div className="flex gap-2.5">
            <button className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-ink py-4 font-bold tracking-wide text-cream hover:bg-ink/90">
              <Gavel size={16} /> PLACE BID
            </button>
            <button
              type="button"
              onClick={() => setWished((w) => !w)}
              aria-pressed={wished}
              aria-label="Add to wishlist"
              className={`grid h-[52px] w-[52px] shrink-0 place-items-center rounded-full border transition ${
                wished ? "border-red bg-red/10 text-red" : "border-line bg-white text-ink hover:border-ink"
              }`}
            >
              <Heart size={18} fill={wished ? "currentColor" : "none"} />
            </button>
          </div>
          <div className="mt-5 flex items-center">
            {["A","B","C","D","E","F","G"].map((l, i) => (
              <div key={l} className="-ml-2 grid h-7 w-7 place-items-center rounded-full border-2 border-cream text-xs font-bold text-white first:ml-0"
                style={{ background: ["#ef4444","#f59e0b","#eab308","#22c55e","#06b6d4","#3b82f6","#a855f7"][i] }}>
                {l}
              </div>
            ))}
            <span className="ml-3 text-sm font-semibold text-ink/65">+16 bidding now</span>
          </div>
        </div>
      </div>

      {zoomAt !== null && (
        <ZoomDialog index={zoomAt} onClose={() => setZoomAt(null)} onChange={setZoomAt} />
      )}
    </div>
  );
}

function DetailBlock() {
  return (
    <div className="grid grid-cols-1 gap-9 rounded-3xl bg-cream p-5 sm:p-9 lg:grid-cols-[1fr_1.2fr_1fr]">
      {/* Details */}
      <div>
        <h4 className="mb-4 flex items-center gap-1.5 text-sm font-bold">Details <Info size={13} className="opacity-50" /></h4>
        <Metric k="Market" v="₹31,500" strike="₹39,500" />
        <Metric k="Average Sale Price" v="₹28,250" sub="Relative bids to sales" />
        <div className="mb-4">
          <div className="text-xs text-ink/55">Hype Index</div>
          <div className="font-display text-2xl text-green-ink">High</div>
        </div>
        <div className="flex gap-3">
          <div className="flex-1 rounded-xl bg-ink p-4 text-cream">
            <div className="text-xs text-cream/65">Score Badge</div>
            <div className="mt-1 font-display text-xl">₹28,500</div>
          </div>
          <div className="flex-1 rounded-xl bg-ink p-4 text-cream">
            <div className="text-xs text-cream/65">RSID Res</div>
            <div className="mt-1 font-display text-xl">₹32,000</div>
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-line-soft bg-white p-5">
          <h5 className="mb-4 flex items-center gap-1.5 text-sm font-bold">Price Insights <Info size={13} className="opacity-50" /></h5>
          <div className="flex flex-wrap justify-between gap-4 text-xs text-ink/55">
            <div><b className="block font-display text-xl text-ink">₹31,500</b>Market<br /><span className="opacity-60">Low: ₹19,550</span></div>
            <div><b className="block font-display text-xl text-ink">01</b>Hype Index<br /><span className="text-green-ink">▲ ₹2,33,600</span></div>
            <div><b className="block font-display text-xl text-ink">₹28,250</b>Avg sale<br /><span className="opacity-60">Last 30 sales</span></div>
          </div>
          <div className="mt-4 h-1 rounded-full bg-[linear-gradient(90deg,var(--ink)_60%,oklch(0.86_0.022_75)_60%)]" />
          <div className="mt-1.5 flex justify-between text-[11px] text-ink/45">
            <span>19,350</span><span>28,550</span><span>2,34,600</span>
          </div>
        </div>
      </div>

      {/* Bid History */}
      <div>
        <h4 className="mb-4 text-sm font-bold">Bid History</h4>
        <div className="relative rounded-2xl border border-line-soft bg-white p-4">
          <span className="absolute right-3 top-3 rounded-md bg-ink px-2.5 py-1 text-xs font-bold text-cream">₹23,500</span>
          <svg viewBox="0 0 400 160" className="h-[170px] w-full">
            <defs>
              <linearGradient id="g" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="rgb(220,80,70)" stopOpacity="0.3" />
                <stop offset="100%" stopColor="rgb(220,80,70)" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d="M0 130 L60 110 L110 120 L160 90 L220 95 L280 70 L340 50 L400 30 L400 160 L0 160 Z" fill="url(#g)" />
            <path d="M0 130 L60 110 L110 120 L160 90 L220 95 L280 70 L340 50 L400 30" stroke="rgb(220,80,70)" strokeWidth="2" fill="none" />
            {[[60,110],[110,120],[160,90],[220,95],[280,70],[340,50]].map(([x,y],i) => (
              <circle key={i} cx={x} cy={y} r="3" fill="rgb(220,80,70)" />
            ))}
          </svg>
          <div className="mt-1.5 flex justify-between px-1 text-[11px] text-ink/45">
            <span>10:00 AM</span><span>12:00 PM</span><span>02:00 PM</span><span>Now</span>
          </div>
        </div>
        <div className="mt-2">
          {[
            ["Bidder J", "2 mins ago", "₹39,500"],
            ["Bidder G", "5 mins ago", "₹32,550"],
            ["Bidder D", "7 mins ago", "₹28,550"],
            ["Bidder K", "13 mins ago", "₹38,500"],
          ].map(([w, t, a]) => (
            <div key={w} className="flex items-center justify-between border-b border-line-soft py-3.5 text-sm">
              <span className="text-ink/65">{w}</span>
              <span className="text-ink/45">{t}</span>
              <span className="font-bold">{a}</span>
            </div>
          ))}
        </div>
        <a className="mt-3 inline-block border-b-2 border-ink pb-0.5 text-sm font-bold">View All Bids</a>
      </div>

      {/* Seller */}
      <div>
        <h4 className="mb-4 text-sm font-bold">Seller Info</h4>
        <div className="mb-4 flex items-center gap-3">
          <div className="grid h-12 w-12 place-items-center rounded-full bg-ink font-display text-cream">SN</div>
          <div>
            <div className="flex items-center gap-1.5 font-bold">
              SneakerNation <BadgeCheck size={14} className="text-green-ink" />
            </div>
            <div className="text-xs text-ink/55">2/1 ★ 126 waitlisted</div>
          </div>
        </div>
        <div className="mb-4 flex gap-6">
          <div><b className="block font-display text-xl">98%</b><span className="text-[11px] text-ink/55">Items Sold</span></div>
          <div><b className="block font-display text-xl">98%</b><span className="text-[11px] text-ink/55">Positive Feedback</span></div>
          <div><b className="block font-display text-xl">17</b><span className="text-[11px] text-ink/55">Pairings</span></div>
        </div>
        <button className="mb-5 flex w-full items-center justify-center gap-2 rounded-full bg-ink py-3.5 text-sm font-bold text-cream">VIEW PROFILE <ArrowRight size={14} /></button>

        <h5 className="mb-3 mt-4 text-[13px] font-bold">Seller Badge</h5>
        {["Identity Authenticity ✓", "Stocks 3Shipper v1", "Onipaid Lots Included", "Certified Settlements", "Buyer Price Shipping Res"].map((b) => (
          <div key={b} className="flex items-center gap-2.5 py-1 text-[13px] text-ink/65"><ShieldCheck size={14} className="text-green-ink" /> {b}</div>
        ))}

        <h5 className="mb-3 mt-4 text-[13px] font-bold">Shipping & Delivery</h5>
        {["Ships to India", "3–8 day delivery", "All paid lots included", "Verified settlements", "Buyer price shipping fees"].map((b) => (
          <div key={b} className="flex items-center gap-2.5 py-1 text-[13px] text-ink/65"><Truck size={14} className="text-green-ink" /> {b}</div>
        ))}
      </div>
    </div>
  );
}

function Metric({ k, v, strike, sub }: { k: string; v: string; strike?: string; sub?: string }) {
  return (
    <div className="mb-4">
      <div className="text-xs text-ink/55">{k}</div>
      {strike && <div className="text-sm text-ink/40 line-through">{strike}</div>}
      <div className="font-display text-2xl tracking-[-0.01em]">{v}</div>
      {sub && <div className="text-xs text-ink/45">{sub}</div>}
    </div>
  );
}

function Related() {
  const items = liveAuctions.slice(0, 4);
  return (
    <section className="mt-16">
      <h2 className="mb-9 text-center font-display text-3xl tracking-[-0.02em] sm:text-[44px]">You May Also Like</h2>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((a) => (
          <Link key={a.id} to="/live-auctions/$id" params={{ id: a.id }} className="overflow-hidden rounded-2xl border border-line-soft bg-cream">
            <div className="relative">
              <img src={a.image} alt={a.name} loading="lazy" className="aspect-[1/0.92] w-full object-cover" />
              <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-green px-2.5 py-1 text-[11px] font-bold text-green-ink">
                <span className="h-1.5 w-1.5 rounded-full bg-green-ink" /> LIVE
              </span>
            </div>
            <div className="p-4">
              <div className="font-display text-base uppercase">{a.name}</div>
              <div className="mt-2 font-display text-2xl">₹{a.bid.toLocaleString("en-IN")}</div>
              <div className="my-3 flex gap-5 text-[13px] text-ink/65">
                <span className="inline-flex items-center gap-1.5 text-red"><span className="h-2 w-2 rounded-full bg-red" /> {a.endsIn}</span>
                <span className="inline-flex items-center gap-1.5"><Eye size={14} /> {a.watching * 5}</span>
              </div>
              <button className="w-full rounded-full bg-ink py-3.5 text-sm font-semibold text-cream">Place Bid</button>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
