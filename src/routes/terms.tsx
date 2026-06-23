import { createFileRoute } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { SiteLayout } from "@/components/site/SiteLayout";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Service — HYPE" },
      { name: "description", content: "The rules of using HYPE's marketplace and live auctions." },
    ],
    links: [{ rel: "canonical", href: "https://hype-collective-hub.lovable.app/terms" }],
  }),
  component: () => (
    <LegalPage title="Terms of Service" updated="June 1, 2026">
      <p>
        By using HYPE you agree to these terms. HYPE operates a multi-seller marketplace and live-auction platform for sneakers,
        apparel and culture collectibles. Listings are subject to HYPE authentication.
      </p>
      <h2>Bidding & purchases</h2>
      <p>All bids are binding. Winning bidders must complete payment within 24 hours of auction close.</p>
      <h2>Sellers</h2>
      <p>Sellers warrant items are authentic and as described. Items failing authentication are returned at the seller's cost.</p>
      <h2>Fees</h2>
      <p>HYPE charges a commission on completed sales. Current rates are shown in your Seller Dashboard.</p>
      <h2>Liability</h2>
      <p>The platform is provided "as is". Disputes are governed by the laws of India.</p>
    </LegalPage>
  ),
});

function LegalPage({ title, updated, children }: { title: string; updated: string; children: ReactNode }) {
  return (
    <SiteLayout>
      <div className="bg-shop-bg">
        <article className="mx-auto max-w-3xl px-4 py-16 sm:px-8">
          <h1 className="font-display text-5xl">{title}</h1>
          <p className="mt-2 text-xs uppercase tracking-[0.2em] text-ink/55">Last updated: {updated}</p>
          <div className="prose prose-neutral mt-8 max-w-none text-ink/80 [&_h2]:mt-8 [&_h2]:font-display [&_h2]:text-xl [&_p]:my-4">
            {children}
          </div>
        </article>
      </div>
    </SiteLayout>
  );
}
