import { createFileRoute, Link } from "@tanstack/react-router";
import { Truck, ShieldCheck, BadgeCent, BarChart3, Award, Lock, Star, Check, ArrowRight } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import sellHero from "@/assets/sell-hero.jpg";

export const Route = createFileRoute("/sell")({
  head: () => ({
    meta: [
      { title: "Sell With HYPE — List, Ship, Get Paid" },
      { name: "description", content: "List, ship and get paid. HYPE is India's trusted marketplace for verified sellers — instant logistics, live auction pricing and authentication handled." },
      { property: "og:title", content: "Sell With HYPE — List, Ship, Get Paid" },
      { property: "og:description", content: "Join thousands of sellers earning with HYPE. Apply to sell." },
      { property: "og:image", content: sellHero },
    ],
  }),
  component: SellPage,
});

function SellPage() {
  return (
    <SiteLayout>
      <Hero />
      <Steps />
      <Features />
      <Tiers />
      <ReadyCTA />
    </SiteLayout>
  );
}

function Hero() {
  return (
    <section className="bg-sand-hero">
      <div className="mx-auto grid max-w-[1440px] grid-cols-1 items-center gap-8 px-8 py-14 lg:grid-cols-2">
        <div>
          <h1 className="font-display text-[clamp(64px,7vw,108px)] uppercase leading-[0.86] tracking-[-0.04em]">
            List, Ship,<br />Get Paid.
          </h1>
          <p className="mt-6 max-w-md text-base text-ink/65">
            The Hype Company is India's trusted marketplace for verified sellers — list, sell, and never worry about pricing or selling hype again.
          </p>
          <div className="mt-7 flex gap-3">
            <Link to="/dashboard/create-listing" className="rounded-full bg-ink px-7 py-3.5 text-sm font-semibold tracking-wide text-cream">Start Selling</Link>
            <button className="rounded-full border border-ink px-7 py-3.5 text-sm font-semibold tracking-wide">Sell Info</button>
          </div>
        </div>
        <div className="overflow-hidden rounded-3xl">
          <img src={sellHero} alt="Boxes, sneakers, hoodies and accessories ready to ship" width={1024} height={1024} className="h-full w-full object-cover" />
        </div>
      </div>
    </section>
  );
}

function Steps() {
  return (
    <section className="bg-cream py-20">
      <div className="mx-auto max-w-[1100px] px-8">
        <h2 className="mb-12 text-center text-[12px] font-bold uppercase tracking-[0.24em]">How Selling Works</h2>
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
          {["01","02","03","04"].map((n, i) => (
            <div key={n} className="text-center">
              <div className="font-display text-[88px] leading-none text-ink/10">{n}</div>
              <div className="mx-auto -mt-8 grid h-14 w-14 place-items-center rounded-full border border-ink/40 bg-cream">
                {[<BadgeCent size={20} key="a"/>, <BarChart3 size={20} key="b"/>, <Truck size={20} key="c"/>, <ShieldCheck size={20} key="d"/>][i]}
              </div>
              <div className="mt-4 font-display text-2xl">{n}</div>
              <p className="mt-2 text-[11px] uppercase leading-relaxed tracking-[0.12em] text-ink/60">
                {["List an item in seconds","Set price or live auction","Arrange free pickup once sold","HYPE authenticates & ships"][i]}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Features() {
  const features = [
    { icon: <Truck size={26}/>, t: "Instant Logistics", d: "No trips to courier offices." },
    { icon: <ShieldCheck size={26}/>, t: "Authentication Handled", d: "We verify every item in-house." },
    { icon: <BadgeCent size={26}/>, t: "Live Auction Pricing", d: "The market sets the right price." },
    { icon: <BarChart3 size={26}/>, t: "Analytics Dashboard", d: "Track views, watchlist & conversion." },
    { icon: <Award size={26}/>, t: "Badge Tier System", d: "Build your seller reputation." },
    { icon: <Lock size={26}/>, t: "Seller Protection", d: "Disputes resolved, listings protected." },
  ];
  return (
    <section className="bg-cream pb-20">
      <div className="mx-auto grid max-w-[900px] grid-cols-1 gap-4 px-8 sm:grid-cols-2">
        {features.map((f) => (
          <div key={f.t} className="flex items-center gap-5 rounded-2xl bg-ink p-6 text-cream">
            <div className="grid h-12 w-12 place-items-center rounded-xl bg-cream/10">{f.icon}</div>
            <div>
              <div className="font-bold">{f.t}</div>
              <div className="mt-1 text-sm text-cream/65">{f.d}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Tiers() {
  const tiers = [
    { name: "New Seller", tag: "Bronze Tier", grad: "linear-gradient(135deg,#c97e3a,#3a2614)", perks: ["Lower fees","Standard support","Basic analytics"] },
    { name: "Verified Seller", tag: "Silver Tier", grad: "linear-gradient(135deg,#9aa0a8,#1a1a1a)", perks: ["Reduced fees","Priority support","Analytics Dashboard"] },
    { name: "Trusted Seller", tag: "Gold Tier", grad: "linear-gradient(135deg,#a09040,#1a1408)", perks: ["Reduced 2% fee","Live auction priority","Early invitations"] },
    { name: "Elite Seller", tag: "Platinum Tier", grad: "linear-gradient(135deg,#7a8aa0,#0c0f1a)", perks: ["VIP listings","Lowest selling fees","Dedicated account manager"] },
  ];
  return (
    <section className="bg-cream pb-20">
      <div className="mx-auto max-w-[900px] px-8">
        <h2 className="mb-8 text-center font-display text-[28px]">Badge Tiers</h2>
        <div className="grid gap-5 md:grid-cols-2">
          {tiers.map((t) => (
            <div key={t.name} className="relative overflow-hidden rounded-2xl p-7 text-cream" style={{ background: t.grad }}>
              <span className="absolute right-5 top-5 rounded-full bg-black/30 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em]">{t.tag}</span>
              <Star size={36} className="mb-12 text-cream" />
              <div className="text-2xl font-bold">{t.name}</div>
              <div className="mt-1 text-sm text-cream/70">Best value tier — Complete eligible orders & reach this tier.</div>
              <div className="my-4 text-[10px] font-bold uppercase tracking-[0.18em] text-cream/60">— Perks —</div>
              {t.perks.map((p) => (
                <div key={p} className="flex items-center gap-2 py-1 text-sm"><Check size={14} className="text-green" /> {p}</div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ReadyCTA() {
  return (
    <section className="bg-sand-hero py-16">
      <div className="mx-auto max-w-[1100px] rounded-3xl bg-gradient-to-br from-[oklch(0.88_0.04_70)] to-[oklch(0.78_0.06_50)] px-8 py-16 text-center">
        <h2 className="font-display text-4xl tracking-tight">Ready to Sell?</h2>
        <p className="mt-3 text-ink/70">Join thousands of sellers earning with HYPE.</p>
        <Link to="/dashboard/create-listing" className="mt-6 inline-flex items-center gap-2 rounded-full bg-ink px-8 py-4 text-sm font-bold tracking-wider text-cream">
          APPLY TO SELL <ArrowRight size={16} />
        </Link>
      </div>
    </section>
  );
}
