import { Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState, type FormEvent } from "react";
import {
  Bell,
  ChevronDown,
  Globe,
  Headphones,
  Heart,
  LayoutDashboard,
  LogIn,
  LogOut,
  Menu,
  Package,
  Search,
  Settings,
  Shield,
  ShoppingBag,
  Truck,
  User,
  X,
} from "lucide-react";
import { useCart } from "@/lib/cart-store";
import { useRole } from "@/lib/role-store";
import { HypeLogo } from "./HypeLogo";

const BASE_NAV = [
  { to: "/shop", label: "SHOP" },
  { to: "/auctions/live", label: "LIVE" },
  { to: "/sell", label: "SELL" },
  { to: "/about", label: "ABOUT" },
] as const;

export function SiteHeader() {
  const { cartCount, wishlist } = useCart();
  const { role, isAuthed, name, initials, setRole } = useRole();
  const navigate = useNavigate();
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setMenuOpen(false);
    }
    if (menuOpen) document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [menuOpen]);

  const onSearch = (e: FormEvent) => {
    e.preventDefault();
    setOpen(false);
    navigate({ to: "/shop", search: { q: q.trim() || undefined } as never });
  };

  return (
    <header className="sticky top-0 z-40 bg-ink text-cream">
      {/* Utility row */}
      <div className="hidden border-b border-cream/10 text-cream/70 md:block">
        <div className="mx-auto flex h-8 max-w-[1440px] items-center justify-between px-4 text-[11px] tracking-[0.08em] sm:px-8">
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1.5"><Globe size={11} /> IN · EN · INR</span>
            <span className="inline-flex items-center gap-1.5 text-green"><Shield size={11} /> 100% Authenticated</span>
            <span className="hidden lg:inline-flex items-center gap-1.5"><Truck size={11} /> Free shipping ₹25,000+</span>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/me/orders" className="inline-flex items-center gap-1.5 hover:text-cream"><Package size={11} /> Track Order</Link>
            <Link to="/contact" className="inline-flex items-center gap-1.5 hover:text-cream"><Headphones size={11} /> Help · 1800-HYPE</Link>
          </div>
        </div>
      </div>

      {/* Main row */}
      <div className="mx-auto flex h-[68px] max-w-[1440px] items-center gap-4 px-4 sm:px-8">
        <Link to="/" className="flex items-center gap-2 font-display text-2xl tracking-tight text-cream" aria-label="HYPE home">
          <HypeLogo size={26} className="text-cream" />
          <span>HYPE<span className="text-gold">.</span></span>
        </Link>

        <nav className="hidden flex-1 items-center justify-center gap-7 text-[12px] font-semibold tracking-[0.18em] lg:flex">
          {BASE_NAV.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="text-cream/75 transition hover:text-cream [&.active]:text-cream [&.active]:underline [&.active]:underline-offset-[6px]"
            >
              {n.label}
            </Link>
          ))}
          {role === "seller" && (
            <Link to="/dashboard" className="inline-flex items-center gap-1.5 rounded-full bg-gold/15 px-3 py-1 text-gold transition hover:bg-gold/25 [&.active]:bg-gold [&.active]:text-ink">
              <LayoutDashboard size={12} /> SELLER
            </Link>
          )}
          {role === "admin" && (
            <Link to="/admin" className="inline-flex items-center gap-1.5 rounded-full bg-red/20 px-3 py-1 text-red transition hover:bg-red/30 [&.active]:bg-red [&.active]:text-cream">
              <Shield size={12} /> ADMIN
            </Link>
          )}
        </nav>

        <form onSubmit={onSearch} className="ml-auto hidden md:flex" role="search">
          <label className="flex items-center gap-2 rounded-full border border-cream/25 bg-cream/5 px-4 py-2 text-sm text-cream/90 focus-within:border-cream">
            <Search size={14} className="opacity-70" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search drops, brands, sizes…"
              className="w-52 bg-transparent text-cream placeholder:text-cream/45 focus:outline-none xl:w-72"
              aria-label="Search listings"
            />
          </label>
        </form>

        <div className="ml-auto flex items-center gap-1 md:ml-0">
          <Link to="/me/watchlist" aria-label={`Watchlist (${wishlist.length})`} className="relative grid h-10 w-10 place-items-center rounded-full text-cream hover:bg-cream/10">
            <Heart size={18} />
            {wishlist.length > 0 && <Badge n={wishlist.length} />}
          </Link>

          {isAuthed && (
            <button aria-label="Notifications" className="relative hidden h-10 w-10 place-items-center rounded-full text-cream hover:bg-cream/10 sm:grid">
              <Bell size={18} />
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red" />
            </button>
          )}

          <Link to="/cart" aria-label={`Cart (${cartCount})`} className="relative grid h-10 w-10 place-items-center rounded-full text-cream hover:bg-cream/10">
            <ShoppingBag size={18} />
            {cartCount > 0 && <Badge n={cartCount} />}
          </Link>

          {/* Account dropdown */}
          {isAuthed ? (
            <div ref={menuRef} className="relative">
              <button
                onClick={() => setMenuOpen((v) => !v)}
                className="ml-1 flex items-center gap-2 rounded-full bg-cream/10 py-1 pl-1 pr-3 text-xs font-semibold text-cream hover:bg-cream/15"
                aria-haspopup="menu"
                aria-expanded={menuOpen}
              >
                <span className="grid h-8 w-8 place-items-center rounded-full bg-gold text-[11px] font-bold text-ink">{initials}</span>
                <ChevronDown size={12} className="opacity-70" />
              </button>
              {menuOpen && (
                <div role="menu" className="absolute right-0 top-12 w-64 overflow-hidden rounded-2xl border border-ink/5 bg-cream text-ink shadow-2xl">
                  <div className="border-b border-line-soft bg-cream-2 px-4 py-3">
                    <div className="text-xs uppercase tracking-[0.16em] text-ink/55">Signed in as</div>
                    <div className="truncate font-semibold">{name}</div>
                    <div className="text-[11px] uppercase tracking-[0.14em] text-ink/55">{role}</div>
                  </div>
                  <div className="py-1.5 text-sm">
                    <MenuLink to="/me" onClick={() => setMenuOpen(false)} icon={User}>Account</MenuLink>
                    <MenuLink to="/me/bids" onClick={() => setMenuOpen(false)} icon={Package}>My Bids</MenuLink>
                    <MenuLink to="/me/watchlist" onClick={() => setMenuOpen(false)} icon={Heart}>Watchlist</MenuLink>
                    <MenuLink to="/me/orders" onClick={() => setMenuOpen(false)} icon={Truck}>Orders</MenuLink>
                    {role === "seller" && <MenuLink to="/dashboard" onClick={() => setMenuOpen(false)} icon={LayoutDashboard}>Seller Dashboard</MenuLink>}
                    {role === "admin" && <MenuLink to="/admin" onClick={() => setMenuOpen(false)} icon={Shield}>Admin Console</MenuLink>}
                    <MenuLink to="/me/notifications" onClick={() => setMenuOpen(false)} icon={Settings}>Settings</MenuLink>
                    <button
                      onClick={() => { setRole("guest"); setMenuOpen(false); }}
                      className="flex w-full items-center gap-3 border-t border-line-soft px-4 py-2.5 text-left text-ink/75 hover:bg-cream-2"
                    >
                      <LogOut size={14} /> Sign out
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/auth/login"
              className="ml-1 hidden items-center gap-1.5 rounded-full bg-cream px-4 py-2 text-[11px] font-bold uppercase tracking-[0.16em] text-ink transition hover:bg-cream/85 sm:inline-flex"
            >
              <LogIn size={12} /> Get Started
            </Link>
          )}

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
            {BASE_NAV.map((n) => (
              <Link key={n.to} to={n.to} onClick={() => setOpen(false)} className="rounded-md px-3 py-2 text-cream/85 hover:bg-cream/10 [&.active]:bg-cream/10 [&.active]:text-cream">
                {n.label}
              </Link>
            ))}
            {role === "seller" && <Link to="/dashboard" onClick={() => setOpen(false)} className="rounded-md px-3 py-2 text-gold">SELLER DASHBOARD</Link>}
            {role === "admin" && <Link to="/admin" onClick={() => setOpen(false)} className="rounded-md px-3 py-2 text-red">ADMIN CONSOLE</Link>}
            <form onSubmit={onSearch} className="mt-2 flex md:hidden" role="search">
              <label className="flex w-full items-center gap-2 rounded-full border border-cream/25 bg-cream/5 px-4 py-2 text-sm">
                <Search size={14} className="opacity-70" />
                <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search drops, brands…" className="w-full bg-transparent text-cream placeholder:text-cream/45 focus:outline-none" aria-label="Search listings" />
              </label>
            </form>
            {!isAuthed && (
              <Link to="/auth/login" onClick={() => setOpen(false)} className="mt-3 rounded-full bg-cream px-4 py-2 text-center text-xs tracking-[0.16em] text-ink">GET STARTED</Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}

function Badge({ n }: { n: number }) {
  return (
    <span className="absolute -right-0.5 -top-0.5 grid h-5 min-w-[20px] place-items-center rounded-full bg-gold px-1 text-[10px] font-bold text-ink">
      {n > 99 ? "99+" : n}
    </span>
  );
}

function MenuLink({
  to,
  onClick,
  icon: Icon,
  children,
}: {
  to: string;
  onClick?: () => void;
  icon: React.ComponentType<{ size?: number }>;
  children: React.ReactNode;
}) {
  return (
    <Link to={to} onClick={onClick} className="flex items-center gap-3 px-4 py-2.5 text-ink/80 hover:bg-cream-2 hover:text-ink">
      <Icon size={14} /> {children}
    </Link>
  );
}
