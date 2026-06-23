import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronDown, Grid2x2, List, Search, X, Eye, Heart, Check, ChevronUp, ChevronLeft, ChevronRight, ShoppingBag } from "lucide-react";
import { useMemo } from "react";
import { z } from "zod";
import { SiteLayout } from "@/components/site/SiteLayout";
import { shopItems } from "@/lib/hype-data";
import { useCart, formatINR } from "@/lib/cart-store";

const searchSchema = z.object({ q: z.string().optional() });

export const Route = createFileRoute("/shop")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Shop — HYPE Verified Sneakers, Apparel & Collectibles" },
      { name: "description", content: "Browse Buy Now and fixed-price listings from HYPE-verified sellers. Filter by brand, size, condition and price." },
      { property: "og:title", content: "Shop — HYPE Verified Listings" },
      { property: "og:description", content: "Browse Buy Now listings from HYPE-verified sellers." },
    ],
  }),
  component: ShopPage,
});

function ShopPage() {
  const { q } = Route.useSearch();
  const filtered = useMemo(() => {
    if (!q) return shopItems;
    const needle = q.toLowerCase();
    return shopItems.filter((p) => p.name.toLowerCase().includes(needle) || p.condition.toLowerCase().includes(needle));
  }, [q]);

  return (
    <SiteLayout>
      <Crumbs />
      <div className="bg-shop-bg">
        <div className="mx-auto max-w-[1440px] px-4 py-9 sm:px-8">
          <TopBar count={filtered.length} q={q} />
          <Chips q={q} />
          <div className="grid gap-9 lg:grid-cols-[290px_1fr]">
            <Filters />
            <div>
              <ProductGrid items={filtered} />
              {filtered.length > 0 && <Pager />}
            </div>
          </div>
        </div>
      </div>
    </SiteLayout>
  );
}

function Crumbs() {
  return (
    <div className="bg-cream/60 px-8 py-5 text-sm text-ink/70">
      <div className="mx-auto max-w-[1440px]">
        <Link to="/" className="hover:underline">Home</Link>
        <span className="mx-2 opacity-50">/</span>
        <Link to="/shop" className="hover:underline">Shop</Link>
        <span className="mx-2 opacity-50">/</span>
        <span className="text-ink">Browse Listings</span>
      </div>
    </div>
  );
}

function TopBar({ count, q }: { count: number; q?: string }) {
  return (
    <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
      <p className="text-lg text-ink/65">
        {q ? <>Results for <span className="font-semibold text-ink">"{q}"</span> · {count} match{count === 1 ? "" : "es"}</> : "Fixed price and Buy Now listings."}
      </p>
      <div className="flex items-center gap-3">
        <button className="flex items-center gap-6 rounded-xl border border-line bg-white px-5 py-3 text-sm font-medium">
          Sort by: Newest <ChevronDown size={13} />
        </button>
        <button aria-label="Grid view" className="grid h-12 w-12 place-items-center rounded-xl border border-line bg-white">
          <Grid2x2 size={18} />
        </button>
        <button aria-label="List view" className="grid h-12 w-12 place-items-center rounded-xl border border-line bg-white">
          <List size={18} />
        </button>
      </div>
    </div>
  );
}

function Chips({ q }: { q?: string }) {
  const chips = ["Nike", "Jordan", "UK 9", "DS / Brand New", "₹0 – ₹50,000"];
  return (
    <div className="mb-7 flex flex-wrap items-center gap-3">
      {q && (
        <Link to="/shop" className="inline-flex items-center gap-2 rounded-full border border-ink bg-ink px-4 py-2 text-sm font-medium text-cream">
          Search: {q} <X size={12} />
        </Link>
      )}
      {chips.map((c) => (
        <span key={c} className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-4 py-2 text-sm font-medium">
          {c} <X size={12} className="opacity-60" />
        </span>
      ))}
      <button className="text-sm font-bold text-red">Clear all</button>
      <span className="ml-auto text-base text-ink/45">128 results</span>
    </div>
  );
}

function Filters() {
  return (
    <aside className="self-start rounded-2xl border border-line-soft bg-white px-6 pb-7 pt-2">
      <FilterSection title="Category">
        <RadioRow label="All Categories" checked />
        <RadioRow label="Sneakers" count={1842} />
        <RadioRow label="Apparel" count={632} />
        <RadioRow label="Collectibles" count={156} />
      </FilterSection>
      <FilterSection title="Brand">
        <div className="mb-3 flex items-center gap-2 rounded-lg border border-line px-3 py-2.5 text-sm text-ink/45">
          <Search size={15} /> Search brand
        </div>
        <RadioRow label="Nike" checked count={972} />
        <RadioRow label="Jordan" count={645} />
        <RadioRow label="Adidas" count={214} />
        <RadioRow label="New Balance" count={128} />
        <RadioRow label="Other" count={671} />
      </FilterSection>
      <FilterSection title="Size (UK)">
        <div className="grid grid-cols-4 gap-2">
          {["All", 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, "18+", 17].map((s, i) => (
            <button
              key={i}
              className={`rounded-md border border-line py-2.5 text-sm font-semibold transition ${
                s === "All" || s === 9 ? "border-ink bg-ink text-cream" : "bg-white hover:border-ink"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </FilterSection>
      <FilterSection title="Condition">
        <CheckRow label="All" />
        <CheckRow label="DS / Brand New" count={1298} checked />
        <CheckRow label="Like New" count={512} />
        <CheckRow label="Very Good" count={389} />
        <CheckRow label="Good" count={198} />
        <CheckRow label="Fair" count={77} />
      </FilterSection>
      <FilterSection title="Price Range">
        <div className="mb-2 text-[13px] text-ink/55">Min</div>
        <input defaultValue="₹ 0" className="mb-4 w-full rounded-lg border border-line px-3.5 py-3 text-sm" />
        <input type="range" defaultValue={80} className="w-full accent-ink" />
      </FilterSection>
      <FilterSection title="Sort">
        <RadioRow label="Newest" checked />
        <RadioRow label="Price: Low to High" />
        <RadioRow label="Price: High to Low" />
        <RadioRow label="Most Watched" />
      </FilterSection>
    </aside>
  );
}

function FilterSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border-b border-line-soft py-6 last:border-none">
      <div className="mb-4 flex items-center justify-between">
        <h4 className="text-[12px] font-bold uppercase tracking-[0.16em]">{title}</h4>
        <ChevronUp size={13} className="opacity-60" />
      </div>
      {children}
    </div>
  );
}

function RadioRow({ label, checked, count }: { label: string; checked?: boolean; count?: number }) {
  return (
    <label className="flex cursor-pointer items-center justify-between py-1.5 text-[15px]">
      <span className="flex items-center gap-3">
        <span className={`grid h-[17px] w-[17px] place-items-center rounded-full border-[1.6px] ${checked ? "border-ink" : "border-ink/35"}`}>
          {checked && <span className="h-2 w-2 rounded-full bg-ink" />}
        </span>
        {label}
      </span>
      {count !== undefined && <span className="text-sm text-ink/45">{count}</span>}
    </label>
  );
}

function CheckRow({ label, checked, count }: { label: string; checked?: boolean; count?: number }) {
  return (
    <label className="flex cursor-pointer items-center justify-between py-1.5 text-[15px]">
      <span className="flex items-center gap-3">
        <span className={`grid h-[17px] w-[17px] place-items-center rounded border-[1.6px] ${checked ? "border-ink bg-ink" : "border-ink/35"}`}>
          {checked && <Check size={11} className="text-cream" />}
        </span>
        {label}
      </span>
      {count !== undefined && <span className="text-sm text-ink/45">{count}</span>}
    </label>
  );
}

function ProductGrid({ items }: { items: typeof shopItems }) {
  const { addToCart, toggleWish, isWished } = useCart();
  if (items.length === 0) {
    return (
      <div className="grid place-items-center rounded-2xl bg-cream p-16 text-center">
        <p className="font-display text-2xl">No matches</p>
        <p className="mt-1 text-sm text-ink/60">Try a different search or clear filters.</p>
        <Link to="/shop" className="mt-5 inline-flex rounded-full bg-ink px-5 py-2.5 text-xs font-semibold tracking-[0.14em] text-cream">RESET</Link>
      </div>
    );
  }
  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {items.map((p) => {
        const wished = isWished(p.id);
        return (
          <article key={p.id} className="group overflow-hidden rounded-2xl bg-ink text-cream shadow-[0_10px_24px_-16px_rgba(0,0,0,0.4)] transition hover:-translate-y-0.5">
            <Link to="/shop/$id" params={{ id: p.id }} className="block">
              <div className="relative aspect-square">
                <img src={p.image} alt={p.name} width={400} height={400} loading="lazy" className="h-full w-full object-cover transition group-hover:scale-[1.02]" />
                {p.verified && (
                  <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-green px-2.5 py-1 text-[10px] font-bold text-green-ink">
                    <span className="h-1.5 w-1.5 rounded-full bg-green-ink" /> HYPE Verified
                  </span>
                )}
                {p.watching !== undefined && (
                  <span className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-black/55 px-2.5 py-1 text-[11px] text-cream">
                    <Eye size={12} /> {p.watching} watching
                  </span>
                )}
              </div>
            </Link>
            <button
              onClick={(e) => { e.preventDefault(); toggleWish(p.id); }}
              aria-pressed={wished}
              aria-label={`${wished ? "Remove from" : "Add to"} wishlist`}
              className={`absolute right-2.5 top-2.5 grid h-8 w-8 place-items-center rounded-full transition ${wished ? "bg-red text-cream" : "bg-white text-ink"}`}
              style={{ position: "absolute" }}
            >
              <Heart size={14} fill={wished ? "currentColor" : "none"} />
            </button>
            <div className="px-4 pb-4 pt-4">
              <Link to="/shop/$id" params={{ id: p.id }}>
                <h3 className="min-h-[40px] text-[15px] font-semibold leading-snug hover:underline">{p.name}</h3>
              </Link>
              <div className="mt-1 text-xs text-cream/55">{p.condition}</div>
              <div className="mt-2 flex items-end justify-between gap-2">
                <div className="font-display text-lg">{formatINR(p.price)}</div>
                <button
                  onClick={() => addToCart({ id: p.id, name: p.name, image: p.image, price: p.price, size: "UK 9" })}
                  className="inline-flex items-center gap-1.5 rounded-full bg-cream px-3 py-1.5 text-[11px] font-bold tracking-[0.12em] text-ink transition hover:bg-cream/85"
                >
                  <ShoppingBag size={12} /> ADD
                </button>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}

function Pager() {
  const pages = ["<", 1, 2, 3, "…", 9, ">"];
  return (
    <div className="mt-12 flex items-center justify-center gap-3">
      {pages.map((p, i) => {
        const Icon = p === "<" ? ChevronLeft : p === ">" ? ChevronRight : null;
        const isActive = p === 1;
        return (
          <button
            key={i}
            className={`grid h-12 min-w-[48px] place-items-center rounded-xl border border-line bg-white text-[15px] font-semibold ${
              isActive ? "border-ink bg-ink text-cream" : "hover:border-ink"
            }`}
          >
            {Icon ? <Icon size={16} /> : p}
          </button>
        );
      })}
    </div>
  );
}
