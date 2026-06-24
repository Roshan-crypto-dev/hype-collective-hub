import { createFileRoute, Outlet, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";

export const Route = createFileRoute("/auctions")({
  head: () => ({
    meta: [
      { title: "Auctions — Live, Upcoming & Ending Soon · HYPE" },
      { name: "description", content: "Live and upcoming auctions on HYPE — bid on authenticated sneakers, apparel, and collectibles." },
    ],
  }),
  component: AuctionsShell,
});

const TABS = [
  { to: "/auctions", label: "All", exact: true },
  { to: "/auctions/live", label: "Live now" },
  { to: "/auctions/upcoming", label: "Upcoming" },
  { to: "/auctions/ending-soon", label: "Ending soon" },
] as const;

function AuctionsShell() {
  return (
    <SiteLayout>
      <div className="bg-shop-bg">
        <div className="mx-auto max-w-[1440px] px-4 py-8 sm:px-8">
          <h1 className="font-display text-4xl">Auctions</h1>
          <p className="mt-1 max-w-2xl text-sm text-ink/65">
            Live bidding on authenticated drops. Auto-extends in the final 30 seconds. Free shipping above ₹25,000.
          </p>
          <nav className="mt-6 flex flex-wrap gap-2">
            {TABS.map((t) => (
              <Link
                key={t.to}
                to={t.to}
                activeOptions={{ exact: t.exact }}
                className="rounded-full border border-line bg-white px-4 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-ink/65 transition hover:border-ink [&.active]:border-ink [&.active]:bg-ink [&.active]:text-cream"
              >
                {t.label}
              </Link>
            ))}
          </nav>
          <div className="mt-7"><Outlet /></div>
        </div>
      </div>
    </SiteLayout>
  );
}
