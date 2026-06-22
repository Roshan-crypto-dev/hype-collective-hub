import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/listings")({
  head: () => ({ meta: [{ title: "My Listings — HYPE Seller" }] }),
  component: () => (
    <div>
      <h1 className="font-display text-4xl tracking-tight">My Listings</h1>
      <p className="mt-1 text-ink/65">You have 12 active listings.</p>
      <div className="mt-6 rounded-2xl border border-dashed border-line bg-cream-2 p-12 text-center text-ink/55">
        Listings management coming soon.
      </div>
    </div>
  ),
});
