import { createFileRoute, Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { SiteLayout } from "@/components/site/SiteLayout";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — HYPE" },
      { name: "description", content: "How HYPE collects, uses and protects your information." },
      { property: "og:title", content: "Privacy Policy — HYPE" },
    ],
    links: [{ rel: "canonical", href: "https://hype-collective-hub.lovable.app/privacy" }],
  }),
  component: () => (
    <LegalPage title="Privacy Policy" updated="June 1, 2026">
      <p>
        The Hype Company ("HYPE", "we") respects your privacy. This page explains what we collect when you use thehypecompany.in
        and how we use it. This page is maintained by HYPE to answer common privacy questions about our marketplace.
      </p>
      <h2>What we collect</h2>
      <ul>
        <li>Account information (name, email, phone) you provide on sign-up.</li>
        <li>Order, shipping and payment metadata required to fulfil purchases and auctions.</li>
        <li>Device and usage data (IP, browser, pages visited) for security and analytics.</li>
      </ul>
      <h2>How we use it</h2>
      <ul>
        <li>To operate the marketplace, fulfil orders and authenticate items.</li>
        <li>To send transactional emails about bids, orders and shipping.</li>
        <li>To prevent fraud, abuse and comply with applicable law.</li>
      </ul>
      <h2>Your choices</h2>
      <p>You can request a copy or deletion of your data by writing to <Link to="/contact" className="underline">support</Link>.</p>
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
          <div className="prose prose-neutral mt-8 max-w-none text-ink/80 [&_h2]:mt-8 [&_h2]:font-display [&_h2]:text-xl [&_li]:my-1 [&_p]:my-4 [&_ul]:list-disc [&_ul]:pl-6">
            {children}
          </div>
        </article>
      </div>
    </SiteLayout>
  );
}
