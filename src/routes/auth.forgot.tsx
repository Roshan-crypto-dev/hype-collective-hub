import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/auth/forgot")({
  head: () => ({ meta: [{ title: "Reset password — HYPE" }] }),
  component: Page,
});

function Page() {
  return (
    <div className="grid min-h-screen place-items-center bg-sand-hero p-8">
      <div className="w-full max-w-sm">
        <Link to="/" className="mb-6 inline-block font-display text-2xl">HYPE<span className="text-gold">.</span></Link>
        <h1 className="font-display text-3xl">Reset password</h1>
        <p className="mt-1 text-sm text-ink/60">Enter your email and we'll send a reset link.</p>
        <form className="mt-6 space-y-3" onSubmit={(e) => e.preventDefault()}>
          <input type="email" required placeholder="Email" className="w-full rounded-xl border border-line bg-white px-4 py-3 text-sm" />
          <button type="submit" className="w-full rounded-full bg-ink py-3 text-sm font-bold uppercase tracking-[0.16em] text-cream">Send reset link</button>
        </form>
        <p className="mt-5 text-center text-xs text-ink/55">
          Remembered it? <Link to="/auth/login" className="font-semibold text-ink hover:underline">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
