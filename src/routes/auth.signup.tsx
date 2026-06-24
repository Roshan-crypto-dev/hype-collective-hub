import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { type FormEvent } from "react";
import { useRole } from "@/lib/role-store";

export const Route = createFileRoute("/auth/signup")({
  head: () => ({ meta: [{ title: "Create account — HYPE" }] }),
  component: Page,
});

function Page() {
  const { setRole } = useRole();
  const navigate = useNavigate();
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setRole("buyer");
    navigate({ to: "/me" });
  };
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="hidden bg-ink p-12 text-cream lg:flex lg:flex-col lg:justify-between">
        <Link to="/" className="font-display text-3xl">HYPE<span className="text-gold">.</span></Link>
        <div>
          <h2 className="font-display text-5xl leading-[1.05]">Join the<br/>collective.</h2>
          <p className="mt-3 max-w-md text-cream/70">Free account. Bid in live auctions, build your watchlist, get notified on every drop.</p>
        </div>
        <div className="text-xs text-cream/55">© HYPE Collective · India</div>
      </div>
      <div className="grid place-items-center bg-sand-hero p-8">
        <div className="w-full max-w-sm">
          <h1 className="font-display text-3xl">Create account</h1>
          <p className="mt-1 text-sm text-ink/60">Takes 30 seconds. Sellers can apply for KYC after sign-up.</p>
          <form onSubmit={onSubmit} className="mt-6 space-y-3">
            <input required placeholder="Full name" className="w-full rounded-xl border border-line bg-white px-4 py-3 text-sm" />
            <input type="email" required placeholder="Email" className="w-full rounded-xl border border-line bg-white px-4 py-3 text-sm" />
            <input type="tel" required placeholder="Mobile (+91)" className="w-full rounded-xl border border-line bg-white px-4 py-3 text-sm" />
            <input type="password" required placeholder="Password" className="w-full rounded-xl border border-line bg-white px-4 py-3 text-sm" />
            <label className="flex items-start gap-2 text-xs text-ink/65">
              <input type="checkbox" required className="mt-0.5" />
              I agree to the <Link to="/terms" className="font-semibold text-ink hover:underline">Terms</Link> & <Link to="/privacy" className="font-semibold text-ink hover:underline">Privacy</Link>.
            </label>
            <button type="submit" className="w-full rounded-full bg-ink py-3 text-sm font-bold uppercase tracking-[0.16em] text-cream">Create account</button>
          </form>
          <p className="mt-5 text-center text-xs text-ink/55">
            Already have one? <Link to="/auth/login" className="font-semibold text-ink hover:underline">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
