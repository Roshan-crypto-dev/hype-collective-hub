import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="bg-ink text-cream">
      <div className="mx-auto max-w-[1440px] px-8 py-16">
        <div className="grid gap-12 md:grid-cols-4">
          <div>
            <Link to="/" className="font-display text-2xl tracking-tight">
              HYPE<span className="text-gold">.</span>
            </Link>
            <p className="mt-5 text-[11px] uppercase leading-relaxed tracking-[0.22em] text-cream/55">
              India's first live auction marketplace
              <br />
              thehypecompany.in
            </p>
          </div>
          <div>
            <h4 className="mb-5 text-[11px] font-bold uppercase tracking-[0.22em] text-cream">
              Quick Links
            </h4>
            <ul className="space-y-3 text-sm text-cream/75">
              <li><Link to="/" className="hover:text-cream">Home</Link></li>
              <li><Link to="/shop" className="hover:text-cream">Shop</Link></li>
              <li><Link to="/live-auctions/chicago" className="hover:text-cream">Live Auctions</Link></li>
              <li><Link to="/sell" className="hover:text-cream">Sell With Us</Link></li>
              <li><Link to="/about" className="hover:text-cream">About</Link></li>
              <li><Link to="/contact" className="hover:text-cream">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-5 text-[11px] font-bold uppercase tracking-[0.22em] text-cream">
              Social Links
            </h4>
            <p className="text-sm leading-relaxed text-cream/75">
              <span className="text-cream">@hypeindiahq</span> on X and<br />
              other platforms
            </p>
          </div>
          <div>
            <h4 className="mb-5 text-[11px] font-bold uppercase tracking-[0.22em] text-cream">
              Download Our App
            </h4>
            <p className="text-sm text-cream/55">Coming soon</p>
          </div>
        </div>
        <div className="mt-16 flex flex-col items-start justify-between gap-3 border-t border-cream/10 pt-8 text-[11px] uppercase tracking-[0.22em] text-cream/55 sm:flex-row sm:items-center">
          <div>
            <div className="text-cream">The Hype Company</div>
            <div>All rights reserved</div>
          </div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-cream">Terms</a>
            <a href="#" className="hover:text-cream">Privacy</a>
            <a href="#" className="hover:text-cream">Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
