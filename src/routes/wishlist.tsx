import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart, Trash2 } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { shopItems } from "@/lib/hype-data";
import { useCart, formatINR } from "@/lib/cart-store";

export const Route = createFileRoute("/wishlist")({
  head: () => ({
    meta: [
      { title: "Wishlist — HYPE" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: WishlistPage,
});

function WishlistPage() {
  const { wishlist, toggleWish, addToCart } = useCart();
  const items = shopItems.filter((p) => wishlist.includes(p.id));

  return (
    <SiteLayout>
      <div className="bg-shop-bg">
        <div className="mx-auto max-w-[1100px] px-4 py-12 sm:px-8">
          <h1 className="font-display text-4xl">Your Wishlist</h1>
          <p className="mt-1 text-sm text-ink/60">{items.length} saved item{items.length === 1 ? "" : "s"}</p>

          {items.length === 0 ? (
            <div className="mt-10 rounded-3xl bg-cream p-12 text-center">
              <Heart className="mx-auto opacity-60" />
              <h2 className="mt-4 font-display text-2xl">No saves yet</h2>
              <p className="mt-2 text-sm text-ink/60">Tap the heart on any listing to save it for later.</p>
              <Link to="/shop" className="mt-6 inline-flex rounded-full bg-ink px-6 py-3 text-sm font-semibold tracking-[0.14em] text-cream">EXPLORE DROPS</Link>
            </div>
          ) : (
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((p) => (
                <article key={p.id} className="overflow-hidden rounded-2xl bg-cream">
                  <Link to="/shop/$id" params={{ id: p.id }}>
                    <img src={p.image} alt={p.name} className="aspect-square w-full object-cover" />
                  </Link>
                  <div className="p-4">
                    <Link to="/shop/$id" params={{ id: p.id }} className="text-sm font-semibold hover:underline">{p.name}</Link>
                    <div className="mt-1 font-display text-lg">{formatINR(p.price)}</div>
                    <div className="mt-3 flex gap-2">
                      <button
                        onClick={() => addToCart({ id: p.id, name: p.name, image: p.image, price: p.price, size: "UK 9" })}
                        className="flex-1 rounded-full bg-ink px-4 py-2 text-xs font-bold tracking-[0.14em] text-cream"
                      >
                        ADD TO CART
                      </button>
                      <button onClick={() => toggleWish(p.id)} aria-label="Remove" className="grid h-9 w-9 place-items-center rounded-full border border-line text-ink/60 hover:text-red">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </SiteLayout>
  );
}
