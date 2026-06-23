import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import type { FormEvent } from "react";
import { SiteLayout } from "@/components/site/SiteLayout";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Sign In — HYPE" },
      { name: "description", content: "Sign in to your HYPE account to bid, buy and track orders." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const onSubmit = (e: FormEvent) => { e.preventDefault(); navigate({ to: "/account" }); };
  return (
    <SiteLayout>
      <div className="bg-shop-bg">
        <div className="mx-auto grid max-w-md gap-6 px-4 py-16 sm:px-8">
          <h1 className="font-display text-4xl">Sign In</h1>
          <form onSubmit={onSubmit} className="space-y-4 rounded-3xl bg-cream p-6 sm:p-8">
            <Field label="Email" type="email" required />
            <Field label="Password" type="password" required />
            <button type="submit" className="w-full rounded-full bg-ink px-6 py-3 text-sm font-bold tracking-[0.14em] text-cream">SIGN IN</button>
            <p className="text-center text-xs text-ink/60">
              New here? <Link to="/signup" className="font-semibold underline">Create an account</Link>
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
