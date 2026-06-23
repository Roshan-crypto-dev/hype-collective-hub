import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2 } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";

export const Route = createFileRoute("/checkout/success")({
  head: () => ({
    meta: [
      { title: "Order Confirmed — HYPE" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: SuccessPage,
});

function SuccessPage() {
  const orderId = `HYP-${Math.floor(100000 + Math.random() * 900000)}`;
  return (
    <SiteLayout>
      <div className="bg-shop-bg">
        <div className="mx-auto max-w-xl px-4 py-20 text-center sm:px-8">
          <CheckCircle2 className="mx-auto text-green-ink" size={56} />
          <h1 className="mt-6 font-display text-4xl">Order placed</h1>
          <p className="mt-2 text-sm text-ink/60">
            We've sent a confirmation email with tracking details.
          </p>
          <div className="mx-auto mt-8 max-w-sm rounded-2xl bg-cream p-6 text-left">
            <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-ink/55">Order Number</div>
            <div className="mt-1 font-display text-2xl">{orderId}</div>
            <div className="mt-4 text-xs text-ink/55">Estimated delivery in 5–7 business days. Track it from your account.</div>
          </div>
          <div className="mt-8 flex justify-center gap-3">
            <Link to="/account" className="rounded-full bg-ink px-6 py-3 text-sm font-semibold tracking-[0.14em] text-cream">VIEW ORDERS</Link>
            <Link to="/shop" className="rounded-full border border-ink/30 px-6 py-3 text-sm font-semibold tracking-[0.14em]">KEEP SHOPPING</Link>
          </div>
        </div>
      </div>
    </SiteLayout>
  );
}
