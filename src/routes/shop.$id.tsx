import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Heart, Eye, Check, ShoppingBag, Truck, ShieldCheck, RotateCcw } from "lucide-react";
import { useState } from "react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { shopItems } from "@/lib/hype-data";
import { useCart, formatINR } from "@/lib/cart-store";

export const Route = createFileRoute("/shop/$id")({
  loader: ({ params }) => {
    const item = shopItems.find((p) => p.id === params.id);
    if (!item) throw notFound();
    return { item };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.item.name ?? "Product"} — HYPE` },
      { name: "description", content: `Buy ${loaderData?.item.name} on HYPE. ${loaderData?.item.condition}. Verified by HYPE.` },
      { property: "og:title", content: `${loaderData?.item.name ?? "Product"} — HYPE` },
      { property: "og:description", content: `Buy ${loaderData?.item.name} — HYPE Verified.` },
      { property: "og:image", content: loaderData?.item.image ?? "" },
    ],
  }),
  notFoundComponent: () => (
    <SiteLayout>
      <div className="mx-auto max-w-xl px-8 py-24 text-center">
        <h1 className="font-display text-4xl">Listing not found</h1>
        <p className="mt-3 text-muted-fg">This drop may have sold out.</p>
        <Link to="/shop" className="mt-6 inline-flex rounded-full bg-ink px-6 py-3 text-sm font-semibold text-cream">Back to shop</Link>
      </div>
    </SiteLayout>
  ),
  component: ProductPage,
});

const SIZES = ["UK 6", "UK 7", "UK 8", "UK 9", "UK 10", "UK 11", "UK 12"];

function ProductPage() {
  const { item } = Route.useLoaderData();
  const { addToCart, toggleWish, isWished } = useCart();
  const [size, setSize] = useState<string>("UK 9");
  const [added, setAdded] = useState(false);
  const wished = isWished(item.id);

  const handleAdd = () => {
    addToCart({ id: item.id, name: item.name, image: item.image, price: item.price, size });
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <SiteLayout>
      <div className="bg-shop-bg">
        <div className="mx-auto max-w-[1440px] px-4 py-6 text-sm text-ink/70 sm:px-8">
          <Link to="/" className="hover:underline">Home</Link> <span className="mx-2 opacity-50">/</span>
          <Link to="/shop" className="hover:underline">Shop</Link> <span className="mx-2 opacity-50">/</span>
          <span className="text-ink">{item.name}</span>
        </div>
        <div className="mx-auto grid max-w-[1440px] gap-10 px-4 pb-16 sm:px-8 lg:grid-cols-[1.1fr_1fr]">
          <div className="overflow-hidden rounded-3xl bg-ink">
            <img src={item.image} alt={item.name} className="aspect-square w-full object-cover" />
          </div>
          <div className="rounded-3xl bg-cream p-6 sm:p-10">
            {item.verified && (
              <span className="inline-flex items-center gap-2 rounded-full bg-green px-3 py-1 text-[11px] font-bold text-green-ink">
                <ShieldCheck size={12} /> HYPE Verified
              </span>
            )}
            <h1 className="mt-4 font-display text-3xl leading-tight sm:text-4xl">{item.name}</h1>
            <p className="mt-2 text-sm text-ink/60">{item.condition}</p>
            <div className="mt-6 flex items-end gap-3">
              <div className="font-display text-4xl">{formatINR(item.price)}</div>
              <div className="pb-1.5 text-xs text-ink/50">incl. authentication</div>
            </div>

            <div className="mt-8">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="text-[11px] font-bold uppercase tracking-[0.18em]">Select Size</h3>
                <button className="text-xs font-semibold text-ink/55 underline">Size guide</button>
              </div>
              <div className="grid grid-cols-4 gap-2 sm:grid-cols-7">
                {SIZES.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    className={`rounded-lg border px-2 py-3 text-sm font-semibold transition ${
                      size === s ? "border-ink bg-ink text-cream" : "border-line bg-white hover:border-ink"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <button
                onClick={handleAdd}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-ink px-6 py-4 text-sm font-bold tracking-[0.14em] text-cream transition hover:bg-ink-soft"
              >
                {added ? <><Check size={16} /> ADDED</> : <><ShoppingBag size={16} /> ADD TO CART</>}
              </button>
              <button
                onClick={() => toggleWish(item.id)}
                aria-pressed={wished}
                aria-label="Toggle wishlist"
                className={`grid h-14 w-14 place-items-center rounded-full border-2 transition ${
                  wished ? "border-red bg-red text-cream" : "border-ink/30 bg-white text-ink hover:border-ink"
                }`}
              >
                <Heart size={18} fill={wished ? "currentColor" : "none"} />
              </button>
            </div>

            {item.watching !== undefined && (
              <div className="mt-4 inline-flex items-center gap-2 text-xs text-ink/60">
                <Eye size={13} /> {item.watching} people watching this drop
              </div>
            )}

            <div className="mt-10 grid gap-4 border-t border-line-soft pt-6 sm:grid-cols-3">
              <Perk icon={<ShieldCheck size={16} />} title="Authenticated" desc="Every item passes HYPE's verification before shipping." />
              <Perk icon={<Truck size={16} />} title="Fast Shipping" desc="Pan-India delivery in 5–7 business days." />
              <Perk icon={<RotateCcw size={16} />} title="7-Day Returns" desc="Hassle-free returns on Buy Now orders." />
            </div>
          </div>
        </div>
      </div>
    </SiteLayout>
  );
}

function Perk({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div>
      <div className="mb-1.5 inline-flex items-center gap-2 text-ink">{icon}<span className="text-[11px] font-bold uppercase tracking-[0.16em]">{title}</span></div>
      <p className="text-xs leading-relaxed text-ink/60">{desc}</p>
    </div>
  );
}
