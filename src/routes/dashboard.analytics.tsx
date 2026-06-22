import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/analytics")({
  head: () => ({ meta: [{ title: "Analytics — HYPE Seller" }] }),
  component: () => (
    <div>
      <h1 className="font-display text-4xl tracking-tight">Analytics</h1>
      <p className="mt-1 text-ink/65">Watchlist, conversion and bid velocity.</p>
      <div className="mt-6 rounded-2xl border border-dashed border-line bg-cream-2 p-12 text-center text-ink/55">
        Charts coming soon.
      </div>
    </div>
  ),
});
