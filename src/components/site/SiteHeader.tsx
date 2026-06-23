import { Link, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { Heart, Menu, Search, ShoppingBag, User, X } from "lucide-react";
import { useCart } from "@/lib/cart-store";

const nav = [
  { to: "/", label: "HOME" },
  { to: "/shop", label: "SHOP" },
  { to: "/live-auctions/chicago", label: "LIVE AUCTIONS" },
  { to: "/sell", label: "SELL WITH US" },
  { to: "/about", label: "ABOUT" },
  { to: "/contact", label: "CONTACT" },
] as const;

export function SiteHeader() {
  const { cartCount, wishlist } = useCart();
  const navigate = useNavigate();
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);

  const onSearch = (e: FormEvent) => {
    e.preventDefault();
    navigate({ to: "/shop", search: { q: q.trim() || undefined } as never });
  };

  return (
    <header className="sticky top-0 z-40 bg-ink text-cream">
      <div className="mx-auto flex h-[72px] max-w-[1440px] items-center gap-6 px-4 sm:px-8">
        <Link to="/" className="font-display text-2xl tracking-tight" aria-label="HYPE home">
          HYPE<span className="text-gold">.</span>
        </Link>

        <nav className="hidden flex-1 items-center justify-center gap-6 text-[12px] font-semibold tracking-[0.18em] lg:flex">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="text-cream/80 transition hover:text-cream [&.active]:text-cream [&.active]:underline [&.active]:underline-offset-[6px]"
              activeOptions={{ exact: n.to === "/" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <form onSubmit={onSearch} className="ml-auto hidden md:flex" role="search">
          <label className="flex items-center gap-2 rounded-full border border-cream/25 bg-cream/5 px-4 py-2 text-sm text-cream/90 focus-within:border-cream">
            <Search size={14} className="opacity-70" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search drops, brands…"
              className="w-44 bg-transparent text-cream placeholder:text-cream/45 focus:outline-none"
              aria-label="Search listings"
            />
          </label>
        </form>

        <div className="ml-auto flex items-center gap-2 md:ml-0">
          <Link
            to="/wishlist"
            aria-label={`Wishlist (${wishlist.length})`}
            className="relative grid h-10 w-10 place-items-center rounded-full text-cream hover:bg-cream/10"
          >
            <Heart size={18} />
            {wishlist.length > 0 && (
              <span className="absolute -right-0.5 -top-0.5 grid h-5 min-w-[20px] place-items-center rounded-full bg-gold px-1 text-[10px] font-bold text-ink">
                {wishlist.length}
              </span>
            )}
          </Link>
          <Link
            to="/cart"
            aria-label={`Cart (${cartCount})`}
            className="relative grid h-10 w-10 place-items-center rounded-full text-cream hover:bg-cream/10"
          >
            <ShoppingBag size={18} />
            {cartCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 grid h-5 min-w-[20px] place-items-center rounded-full bg-gold px-1 text-[10px] font-bold text-ink">
                {cartCount}
              </span>
            )}
          </Link>
          <Link
            to="/account"
            aria-label="Account"
            className="hidden h-10 w-10 place-items-center rounded-full text-cream hover:bg-cream/10 sm:grid"
          >
            <User size={18} />
          </Link>
          <Link
            to="/login"
            className="hidden rounded-full border border-cream/40 px-5 py-2 text-xs font-semibold tracking-[0.16em] text-cream transition hover:bg-cream hover:text-ink lg:inline-flex"
          >
            LOGIN
          </Link>
          <Link
            to="/signup"
            className="hidden rounded-full bg-cream px-5 py-2 text-xs font-semibold tracking-[0.16em] text-ink transition hover:bg-cream/85 lg:inline-flex"
          >
            SIGN UP
          </Link>
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={open}
            className="grid h-10 w-10 place-items-center rounded-full text-cream hover:bg-cream/10 lg:hidden"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-cream/10 bg-ink lg:hidden">
          <nav className="mx-auto flex max-w-[1440px] flex-col gap-1 px-4 py-4 text-sm font-semibold tracking-[0.16em] sm:px-8">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2 text-cream/85 hover:bg-cream/10 [&.active]:bg-cream/10 [&.active]:text-cream"
              >
                {n.label}
              </Link>
            ))}
            <form onSubmit={onSearch} className="mt-2 flex md:hidden" role="search">
              <label className="flex w-full items-center gap-2 rounded-full border border-cream/25 bg-cream/5 px-4 py-2 text-sm">
                <Search size={14} className="opacity-70" />
                <input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Search drops, brands…"
                  className="w-full bg-transparent text-cream placeholder:text-cream/45 focus:outline-none"
                  aria-label="Search listings"
                />
              </label>
            </form>
            <div className="mt-3 flex gap-2">
              <Link to="/login" onClick={() => setOpen(false)} className="flex-1 rounded-full border border-cream/40 px-4 py-2 text-center text-xs tracking-[0.16em]">LOGIN</Link>
              <Link to="/signup" onClick={() => setOpen(false)} className="flex-1 rounded-full bg-cream px-4 py-2 text-center text-xs tracking-[0.16em] text-ink">SIGN UP</Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
