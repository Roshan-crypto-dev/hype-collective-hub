import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/settings")({
  head: () => ({ meta: [{ title: "Account Settings — HYPE Seller" }] }),
  component: () => (
    <div>
      <h1 className="font-display text-4xl tracking-tight">Account Settings</h1>
      <p className="mt-1 text-ink/65">Manage your store profile, payouts and notifications.</p>
      <div className="mt-6 rounded-2xl border border-dashed border-line bg-cream-2 p-12 text-center text-ink/55">
        Settings coming soon.
      </div>
    </div>
  ),
});
