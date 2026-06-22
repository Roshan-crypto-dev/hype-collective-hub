import { Link } from "@tanstack/react-router";

const nav = [
  { to: "/", label: "HOME" },
  { to: "/shop", label: "SHOP" },
  { to: "/live-auctions/chicago", label: "LIVE AUCTIONS" },
  { to: "/sell", label: "SELL WITH US" },
  { to: "/about", label: "ABOUT" },
  { to: "/contact", label: "CONTACT" },
] as const;

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 bg-ink text-cream">
      <div className="mx-auto flex h-[72px] max-w-[1440px] items-center gap-10 px-8">
        <Link to="/" className="font-display text-2xl tracking-tight">
          HYPE<span className="text-gold">.</span>
        </Link>
        <nav className="hidden flex-1 items-center justify-center gap-8 text-[12px] font-semibold tracking-[0.18em] lg:flex">
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
        <div className="ml-auto flex items-center gap-3">
          <button className="hidden rounded-full border border-cream/40 px-6 py-2 text-xs font-semibold tracking-[0.16em] text-cream transition hover:bg-cream hover:text-ink sm:inline-flex">
            LOGIN
          </button>
          <button className="rounded-full bg-cream px-6 py-2 text-xs font-semibold tracking-[0.16em] text-ink transition hover:bg-cream/85">
            SIGN UP
          </button>
        </div>
      </div>
    </header>
  );
}
