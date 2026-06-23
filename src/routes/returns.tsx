import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";

export const Route = createFileRoute("/returns")({
  head: () => ({
    meta: [
      { title: "Returns & Refunds — HYPE" },
      { name: "description", content: "HYPE's 7-day return policy for verified Buy Now orders." },
    ],
    links: [{ rel: "canonical", href: "https://hype-collective-hub.lovable.app/returns" }],
  }),
  component: () => (
    <SiteLayout>
      <div className="bg-shop-bg">
        <article className="mx-auto max-w-3xl px-4 py-16 sm:px-8">
          <h1 className="font-display text-5xl">Returns & Refunds</h1>
          <p className="mt-2 text-xs uppercase tracking-[0.2em] text-ink/55">7-day window · Buy Now orders only</p>
          <div className="mt-8 space-y-4 text-ink/80">
            <p>Buy Now orders may be returned within 7 days of delivery if the item is unused, in original condition and packaging.</p>
            <p>Auction wins are <strong>final sale</strong>. Items that fail HYPE authentication are automatically refunded in full.</p>
            <h2 className="mt-8 font-display text-xl">Start a return</h2>
            <p>Go to <Link to="/account" className="underline">your orders</Link>, open the order and tap "Request return". We'll arrange pickup at no cost to you.</p>
            <h2 className="mt-8 font-display text-xl">Refund timeline</h2>
            <p>Refunds are issued to the original payment method within 5–7 business days of items reaching our facility.</p>
          </div>
        </article>
      </div>
    </SiteLayout>
  ),
});
