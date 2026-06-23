import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import type { FormEvent } from "react";
import { SiteLayout } from "@/components/site/SiteLayout";

export const Route = createFileRoute("/signup")({
  head: () => ({
    meta: [
      { title: "Create Account — HYPE" },
      { name: "description", content: "Join HYPE to bid on live auctions and buy verified drops." },
    ],
  }),
  component: SignupPage,
});

function SignupPage() {
  const navigate = useNavigate();
  const onSubmit = (e: FormEvent) => { e.preventDefault(); navigate({ to: "/account" }); };
  return (
    <SiteLayout>
      <div className="bg-shop-bg">
        <div className="mx-auto grid max-w-md gap-6 px-4 py-16 sm:px-8">
          <h1 className="font-display text-4xl">Create Account</h1>
          <form onSubmit={onSubmit} className="space-y-4 rounded-3xl bg-cream p-6 sm:p-8">
            <Field label="Full name" required />
            <Field label="Email" type="email" required />
            <Field label="Password" type="password" required />
            <label className="flex items-start gap-2 text-xs text-ink/65">
              <input type="checkbox" required className="mt-0.5 accent-ink" />
              I agree to the <Link to="/terms" className="underline">Terms</Link> and <Link to="/privacy" className="underline">Privacy Policy</Link>.
            </label>
            <button type="submit" className="w-full rounded-full bg-ink px-6 py-3 text-sm font-bold tracking-[0.14em] text-cream">CREATE ACCOUNT</button>
            <p className="text-center text-xs text-ink/60">
              Already have one? <Link to="/login" className="font-semibold underline">Sign in</Link>
            </p>
          </form>
        </div>
      </div>
    </SiteLayout>
  );
}

function Field({ label, type = "text", required }: { label: string; type?: string; required?: boolean }) {
  return (
    <label className="flex flex-col gap-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-ink/65">
      {label}
      <input type={type} required={required} className="rounded-lg border border-line bg-white px-4 py-3 text-sm font-normal normal-case tracking-normal text-ink focus:border-ink focus:outline-none" />
    </label>
  );
}
