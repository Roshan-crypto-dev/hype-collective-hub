import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { useCart, formatINR } from "@/lib/cart-store";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Your Cart — HYPE" },
      { name: "description", content: "Review your HYPE cart before checkout." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: CartPage,
});

function CartPage() {
  const { cart, updateQty, removeFromCart, cartSubtotal, cartCount } = useCart();
  const shipping = cart.length ? 250 : 0;
  const total = cartSubtotal + shipping;

  return (
    <SiteLayout>
      <div className="bg-shop-bg">
        <div className="mx-auto max-w-[1100px] px-4 py-12 sm:px-8">
          <h1 className="font-display text-4xl">Your Cart</h1>
          <p className="mt-1 text-sm text-ink/60">{cartCount} item{cartCount === 1 ? "" : "s"}</p>

          {cart.length === 0 ? (
            <div className="mt-10 rounded-3xl bg-cream p-12 text-center">
              <ShoppingBag className="mx-auto opacity-60" />
              <h2 className="mt-4 font-display text-2xl">Your cart is empty</h2>
              <p className="mt-2 text-sm text-ink/60">Start browsing verified drops.</p>
              <Link to="/shop" className="mt-6 inline-flex rounded-full bg-ink px-6 py-3 text-sm font-semibold tracking-[0.14em] text-cream">SHOP NOW</Link>
            </div>
          ) : (
            <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
              <div className="space-y-3">
                {cart.map((l) => (
                  <div key={`${l.id}-${l.size}`} className="flex gap-4 rounded-2xl bg-cream p-4">
                    <img src={l.image} alt={l.name} className="h-24 w-24 rounded-xl object-cover" />
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <Link to="/shop/$id" params={{ id: l.id }} className="font-semibold hover:underline">{l.name}</Link>
                          {l.size && <div className="text-xs text-ink/55">Size {l.size}</div>}
                        </div>
                        <button onClick={() => removeFromCart(l.id, l.size)} aria-label="Remove" className="rounded-full p-1.5 text-ink/55 hover:bg-ink/5 hover:text-red">
                          <Trash2 size={16} />
                        </button>
                      </div>
                      <div className="mt-3 flex items-center justify-between">
                        <div className="inline-flex items-center rounded-full border border-line bg-white">
                          <button onClick={() => updateQty(l.id, l.size, l.qty - 1)} className="grid h-8 w-8 place-items-center" aria-label="Decrease"><Minus size={13} /></button>
                          <span className="min-w-[26px] text-center text-sm font-semibold">{l.qty}</span>
                          <button onClick={() => updateQty(l.id, l.size, l.qty + 1)} className="grid h-8 w-8 place-items-center" aria-label="Increase"><Plus size={13} /></button>
                        </div>
                        <div className="font-display text-lg">{formatINR(l.price * l.qty)}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <aside className="h-fit rounded-3xl bg-ink p-6 text-cream">
                <h2 className="text-[11px] font-bold uppercase tracking-[0.18em] text-cream/70">Order Summary</h2>
                <dl className="mt-6 space-y-3 text-sm">
                  <Row label="Subtotal" value={formatINR(cartSubtotal)} />
                  <Row label="Shipping" value={formatINR(shipping)} />
                  <div className="my-3 h-px bg-cream/15" />
                  <Row label="Total" value={formatINR(total)} bold />
                </dl>
                <Link to="/checkout" className="mt-6 flex items-center justify-center rounded-full bg-cream px-6 py-3.5 text-sm font-bold tracking-[0.14em] text-ink">PROCEED TO CHECKOUT</Link>
                <Link to="/shop" className="mt-3 block text-center text-xs tracking-[0.16em] text-cream/65 hover:text-cream">CONTINUE SHOPPING</Link>
              </aside>
            </div>
          )}
        </div>
      </div>
    </SiteLayout>
  );
}

function Row({ label, value, bold }: { label: string; value: string; bold?: boolean }) {
  return (
    <div className={`flex justify-between ${bold ? "text-base font-bold" : "text-cream/80"}`}>
      <dt>{label}</dt><dd>{value}</dd>
    </div>
  );
}
