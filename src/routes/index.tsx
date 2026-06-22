import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Bookmark, Users, Wallet, TrendingUp, ArrowRight, ChevronDown, ChevronLeft, ChevronRight, ClipboardList, Gavel, Package, Zap } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import heroShoe from "@/assets/hero-shoe.jpg";
import { liveAuctions } from "@/lib/hype-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "HYPE — Bid. Win. Repeat. India's First Live Auction Marketplace" },
      { name: "description", content: "Real-time live auctions for sneakers, apparel and collectibles. Authenticated by HYPE. Place bids, win drops, repeat." },
      { property: "og:title", content: "HYPE — Bid. Win. Repeat." },
      { property: "og:description", content: "Real-time live auctions for sneakers, apparel and collectibles. Authenticated by HYPE." },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <SiteLayout>
      <Hero />
      <StatsBar />
      <MarketStrip />
      <HowItWorks />
      <MarketMoves />
      <StayAhead />
    </SiteLayout>
  );
}

/* ---------------- HERO ---------------- */
function Hero() {
  return (
    <section className="bg-sand-hero">
      <div className="mx-auto grid max-w-[1440px] grid-cols-1 items-center gap-8 px-8 pb-12 pt-14 lg:grid-cols-[1.15fr_1fr_1fr]">
        <div>
          <h1 className="font-display text-[clamp(64px,7.5vw,124px)] uppercase leading-[0.84] tracking-[-0.045em] text-ink">
            Bid.<br />Win.<br />Repeat.
          </h1>
          <p className="mt-7 max-w-[340px] text-lg leading-snug text-ink/65">
            India's first live auction marketplace for hype culture.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/shop" className="group inline-flex items-center gap-2 bg-ink px-7 py-4 text-xs font-semibold tracking-[0.16em] text-cream">
              BROWSE AUCTIONS <ArrowUpRight size={14} className="transition group-hover:translate-x-0.5" />
            </Link>
            <Link to="/sell" className="inline-flex items-center gap-2 border border-ink px-7 py-4 text-xs font-semibold tracking-[0.16em] text-ink">
              SELL WITH US
            </Link>
          </div>
        </div>

        <div className="relative flex h-[440px] items-end justify-center lg:h-[520px]">
          <img
            src={heroShoe}
            alt="Air Jordan 1 Retro High OG Mocha on a sandstone plinth"
            width={1280}
            height={1280}
            className="h-full w-auto object-contain drop-shadow-[0_30px_40px_rgba(60,40,15,0.35)]"
          />
        </div>

        <div className="lg:pl-2">
          <div className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-ink/70">
            <span className="h-2 w-2 animate-pulse rounded-full bg-red" />
            Live Auction
          </div>
          <h2 className="mt-4 font-display text-[34px] uppercase leading-[0.98] tracking-[-0.02em]">
            Air Jordan 1<br />Retro High OG<br />'Mocha'
          </h2>
          <div className="mt-6">
            <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-ink/55">Current Bid</div>
            <div className="mt-1 flex items-start gap-2">
              <span className="font-display text-[52px] leading-none tracking-[-0.02em]">₹18,500</span>
              <ArrowUpRight size={18} className="mt-2 text-ink/60" />
            </div>
            <div className="mt-1 text-sm font-semibold text-gold">+ ₹300</div>
          </div>
          <div className="mt-5">
            <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-ink/55">Ends In</div>
            <div className="mt-1 flex items-end gap-4 font-display text-[40px] leading-none">
              <span>02</span><span className="opacity-50">:</span><span>14</span><span className="opacity-50">:</span><span>33</span>
            </div>
            <div className="mt-1 flex gap-9 text-[10px] font-bold uppercase tracking-[0.18em] text-ink/55">
              <span>Hr</span><span>Min</span><span>Sec</span>
            </div>
          </div>
          <div className="mt-7 flex gap-3">
            <Link to="/live-auctions/$id" params={{ id: "mocha" }} className="group inline-flex items-center gap-2 bg-ink px-6 py-3.5 text-xs font-bold tracking-[0.14em] text-cream">
              PLACE BID <ArrowUpRight size={14} />
            </Link>
            <button className="flex h-[50px] w-[50px] items-center justify-center border border-ink">
              <Bookmark size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- STATS BAR ---------------- */
function StatsBar() {
  return (
    <section className="border-t border-ink/15 bg-sand-hero">
      <div className="mx-auto flex max-w-[1440px] flex-wrap items-center px-8 py-7">
        <Stat icon={<TrendingUp size={26} />} value="12" label="Live Auctions" />
        <Stat icon={<Users size={26} />} value="1.2K" label="Users Watching" />
        <Stat icon={<Wallet size={26} />} value="₹2.4 CR+" label="Total Volume" />
        <button className="ml-auto inline-flex items-center gap-3 font-display text-[15px] uppercase tracking-[0.08em]">
          <TrendingUp size={16} /> Market Pulse <ArrowRight size={16} />
        </button>
      </div>
    </section>
  );
}
function Stat({ icon, value, label }: { icon: React.ReactNode; value: string; label: string }) {
  return (
    <div className="flex items-center gap-4 border-r border-ink/15 px-12 first:pl-0">
      <div className="text-ink/80">{icon}</div>
      <div>
        <div className="font-display text-3xl leading-none">{value}</div>
        <div className="mt-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-ink/55">{label}</div>
      </div>
    </div>
  );
}

/* ---------------- MARKET STRIP (dark) ---------------- */
function MarketStrip() {
  const filters = [
    ["Category", "Sneakers"],
    ["Status", "Live"],
    ["Price", "Any"],
    ["Ending", "Anytime"],
    ["Sort by", "Ending Soon"],
  ];
  return (
    <section className="bg-ink py-10 text-cream">
      <div className="mx-auto flex max-w-[1440px] flex-wrap items-end gap-6 px-8">
        {filters.map(([l, v], i) => (
          <div key={l} className={`px-6 ${i === 0 ? "pl-0" : "border-l border-cream/15"}`}>
            <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-cream/55">{l}</div>
            <div className="mt-1.5 flex items-center gap-2 font-display text-lg">
              {v.toUpperCase()} <ChevronDown size={13} className="opacity-70" />
            </div>
          </div>
        ))}
        <div className="ml-auto flex gap-3">
          <button className="grid h-10 w-10 place-items-center rounded-full border border-cream/35"><ChevronLeft size={16} /></button>
          <button className="grid h-10 w-10 place-items-center rounded-full border border-cream/35"><ChevronRight size={16} /></button>
        </div>
      </div>

      <div className="mx-auto mt-7 grid max-w-[1440px] grid-cols-2 gap-4 px-8 sm:grid-cols-3 lg:grid-cols-6">
        {liveAuctions.map((a) => (
          <Link
            key={a.id}
            to="/live-auctions/$id"
            params={{ id: a.id }}
            className="group"
          >
            <div className="relative overflow-hidden rounded-xl bg-cream">
              <img src={a.image} alt={a.name} width={400} height={368} loading="lazy" className="aspect-[1/0.92] w-full object-cover transition group-hover:scale-[1.03]" />
              <span className="absolute right-2.5 top-2.5 rounded bg-cream px-2 py-1 text-[10px] font-bold tracking-[0.1em] text-ink">LIVE</span>
            </div>
            <div className="mt-3 text-sm font-semibold">{a.name}</div>
            <div className="mt-2 flex items-center justify-between font-display">
              <span className="text-lg">₹{a.bid.toLocaleString("en-IN")}</span>
              <span className={`text-base ${a.endsIn.startsWith("00") ? "text-red" : "text-gold"}`}>{a.endsIn}</span>
            </div>
            <div className="mt-2.5 flex justify-between border-t border-cream/15 pt-2.5 text-[10px] uppercase tracking-[0.05em] text-cream/55">
              <span>{a.watching} watching</span>
              <span>{a.size} • {a.condition}</span>
            </div>
          </Link>
        ))}
      </div>

      <div className="mx-auto mt-7 max-w-[1440px] px-8">
        <div className="relative h-[3px] rounded bg-cream/15">
          <span className="absolute left-0 top-0 h-full w-1/3 rounded bg-cream" />
        </div>
      </div>
    </section>
  );
}

/* ---------------- HOW IT WORKS ---------------- */
function HowItWorks() {
  const steps = [
    { n: "01", t: "List", d: "List your authentic item in minutes.", icon: <ClipboardList size={28} /> },
    { n: "02", t: "Bid", d: "Real-time bidding decides the price.", icon: <Gavel size={28} /> },
    { n: "03", t: "Own", d: "Highest bid wins. We authenticate & deliver.", icon: <Package size={28} /> },
  ];
  return (
    <section className="bg-cream py-20">
      <div className="mx-auto max-w-[1440px] px-8">
        <h2 className="mb-12 font-display text-[34px] uppercase tracking-[-0.01em]">How It Works</h2>
        <div className="flex flex-col items-center gap-8 lg:flex-row lg:gap-2">
          {steps.map((s, i) => (
            <div key={s.n} className="contents">
              <div className="flex items-center gap-6">
                <div className={`grid place-items-center rounded-full border border-ink/40 ${i === 1 ? "h-[104px] w-[104px]" : "h-[78px] w-[78px]"}`}>
                  {s.icon}
                </div>
                <div>
                  <div className="font-display text-3xl leading-none">{s.n}</div>
                  <div className="mt-1.5 text-[11px] font-bold uppercase tracking-[0.16em]">{s.t}</div>
                  <p className="mt-2 max-w-[170px] text-sm leading-snug text-ink/60">{s.d}</p>
                </div>
              </div>
              {i < steps.length - 1 && (
                <div className="flex-1 text-ink/40 lg:flex lg:justify-center"><ArrowRight size={40} /></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- MARKET MOVES TICKER ---------------- */
function MarketMoves() {
  const items = [
    "Nike Dunk Low sold for ₹19,200",
    "Yeezy 350 Beluga highest bid ₹25,500",
    "Supreme Tee sold for ₹8,500",
    "Off-White Air Jordan 1 new bid ₹83,200",
  ];
  return (
    <section className="border-t border-ink/15 bg-cream py-6">
      <div className="mx-auto flex max-w-[1440px] items-center gap-5 px-8">
        <div className="flex flex-none items-center gap-2.5 font-display text-sm uppercase tracking-[0.08em]">
          <Zap size={16} className="text-gold" /> Market Moves
        </div>
        <div className="ticker-mask flex flex-1 items-center gap-4 overflow-hidden whitespace-nowrap text-sm text-ink/70">
          {items.map((it, i) => (
            <span key={i} className="flex items-center gap-4">
              {it}
              <span className="text-ink/30">•</span>
            </span>
          ))}
        </div>
        <button className="flex flex-none items-center gap-2 border-l border-ink/15 pl-6 font-display text-[13px] uppercase tracking-[0.1em]">
          View Market <ArrowRight size={16} />
        </button>
      </div>
    </section>
  );
}

/* ---------------- STAY AHEAD ---------------- */
function StayAhead() {
  return (
    <section className="bg-ink py-16 text-cream">
      <div className="mx-auto flex max-w-[1440px] flex-col items-start justify-between gap-8 px-8 lg:flex-row lg:items-center">
        <div>
          <h2 className="font-display text-[40px] uppercase tracking-[-0.02em]">Stay Ahead of the Drop.</h2>
          <p className="mt-2 text-cream/65">Get updates on exclusive drops and live auctions.</p>
        </div>
        <form className="flex w-full max-w-[560px]">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 border border-cream/30 border-r-0 bg-transparent px-5 py-4 text-cream placeholder:text-cream/50 focus:outline-none"
          />
          <button className="flex w-16 items-center justify-center bg-cream text-ink">
            <ArrowRight size={20} />
          </button>
        </form>
      </div>
    </section>
  );
}
