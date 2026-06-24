import { createFileRoute, Link } from "@tanstack/react-router";
import { useCart } from "@/lib/cart-store";
import { useRole } from "@/lib/role-store";

export const Route = createFileRoute("/me/")({ component: Page });

function Card({ label, value, to }: { label: string; value: string; to: string }) {
  return (
    <Link to={to} className="rounded-2xl border border-line-soft bg-cream p-5 transition hover:border-ink">
      <div className="text-[11px] font-bold uppercase tracking-[0.16em] text-ink/55">{label}</div>
      <div className="mt-2 font-display text-3xl">{value}</div>
    </Link>
  );
}

function Page() {
  const { cartCount, wishlist } = useCart();
  const { name, role } = useRole();
  return (
    <>
      <header className="mb-6">
        <h1 className="font-display text-3xl">Welcome back, {name.split(" ")[0]}</h1>
        <p className="mt-1 text-sm text-ink/60">You're signed in as <strong className="uppercase tracking-[0.14em]">{role}</strong>.</p>
      </header>
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Card label="Active bids" value="3" to="/me/bids" />
        <Card label="Watchlist" value={String(wishlist.length)} to="/me/watchlist" />
        <Card label="In cart" value={String(cartCount)} to="/cart" />
        <Card label="Open orders" value="2" to="/me/orders" />
      </div>
      <div className="mt-6 rounded-2xl bg-ink p-6 text-cream">
        <div className="font-display text-xl">HYPE Insider perks</div>
        <p className="mt-1 text-sm text-cream/70">Win an auction this month to unlock free authentication on your next consignment.</p>
        <Link to="/auctions/live" className="mt-4 inline-flex rounded-full bg-cream px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-ink">Browse live auctions</Link>
      </div>
    </>
  );
}
