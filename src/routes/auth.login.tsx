import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { useRole } from "@/lib/role-store";

export const Route = createFileRoute("/auth/login")({
  head: () => ({ meta: [{ title: "Sign in — HYPE" }] }),
  component: Page,
});

function Page() {
  const { setRole } = useRole();
  const navigate = useNavigate();
  const [tab, setTab] = useState<"signin" | "signup">("signin");

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
          <h2 className="font-display text-5xl leading-[1.05]">Bid. Win.<br/>Repeat.</h2>
          <p className="mt-3 max-w-md text-cream/70">India's first live auction marketplace for hype culture. Every drop authenticated.</p>
        </div>
        <div className="text-xs text-cream/55">© HYPE Collective · India</div>
      </div>
      <div className="grid place-items-center bg-sand-hero p-8">
        <div className="w-full max-w-sm">
          <Link to="/" className="mb-8 inline-block font-display text-2xl lg:hidden">HYPE<span className="text-gold">.</span></Link>
          <div className="mb-6 inline-flex rounded-full border border-line bg-white p-1">
            <button onClick={() => setTab("signin")} className={`rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-[0.14em] ${tab === "signin" ? "bg-ink text-cream" : "text-ink/65"}`}>Sign in</button>
            <Link to="/auth/signup" onClick={() => setTab("signup")} className={`rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-[0.14em] ${tab === "signup" ? "bg-ink text-cream" : "text-ink/65"}`}>Create account</Link>
          </div>
          <h1 className="font-display text-3xl">Welcome back</h1>
          <p className="mt-1 text-sm text-ink/60">Sign in to bid, buy, and track drops.</p>
          <form onSubmit={onSubmit} className="mt-6 space-y-3">
            <input type="email" required placeholder="Email" className="w-full rounded-xl border border-line bg-white px-4 py-3 text-sm" />
            <input type="password" required placeholder="Password" className="w-full rounded-xl border border-line bg-white px-4 py-3 text-sm" />
            <div className="flex items-center justify-between text-xs">
              <label className="inline-flex items-center gap-2"><input type="checkbox" /> Remember me</label>
              <Link to="/auth/forgot" className="font-semibold hover:underline">Forgot password?</Link>
            </div>
            <button type="submit" className="w-full rounded-full bg-ink py-3 text-sm font-bold uppercase tracking-[0.16em] text-cream">Sign in</button>
          </form>
          <div className="my-5 flex items-center gap-3 text-[11px] uppercase tracking-[0.16em] text-ink/40">
            <span className="h-px flex-1 bg-line" /> or continue with <span className="h-px flex-1 bg-line" />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button className="rounded-full border border-line bg-white py-2.5 text-sm font-semibold">Google</button>
            <button className="rounded-full border border-line bg-white py-2.5 text-sm font-semibold">Apple</button>
          </div>
          <p className="mt-5 text-center text-xs text-ink/55">
            New here? <Link to="/auth/signup" className="font-semibold text-ink hover:underline">Create an account</Link>
          </p>
          <p className="mt-3 rounded-lg bg-amber-bg/40 p-3 text-center text-[11px] text-amber-ink">
            Demo mode — any credentials will log you in as a Buyer. Use the dev role switcher to change role.
          </p>
        </div>
      </div>
    </div>
  );
}
