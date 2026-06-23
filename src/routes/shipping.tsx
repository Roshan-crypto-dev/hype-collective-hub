import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";

export const Route = createFileRoute("/shipping")({
  head: () => ({
    meta: [
      { title: "Shipping & Delivery — HYPE" },
      { name: "description", content: "HYPE ships pan-India with full tracking. Standard and Express options." },
    ],
    links: [{ rel: "canonical", href: "https://hype-collective-hub.lovable.app/shipping" }],
  }),
  component: () => (
    <SiteLayout>
      <div className="bg-shop-bg">
        <article className="mx-auto max-w-3xl px-4 py-16 sm:px-8">
          <h1 className="font-display text-5xl">Shipping & Delivery</h1>
          <p className="mt-2 text-xs uppercase tracking-[0.2em] text-ink/55">Pan-India · Fully tracked</p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <Card title="Standard" eta="5–7 business days" fee="₹250" />
            <Card title="Express" eta="2–3 business days" fee="₹600" />
          </div>
          <div className="mt-8 space-y-4 text-ink/80">
            <p>Every HYPE order is authenticated before shipping. You'll receive a tracking link via email once your order leaves our facility.</p>
            <p>We currently ship within India only. International shipping is coming soon.</p>
          </div>
        </article>
      </div>
    </SiteLayout>
  ),
});

function Card({ title, eta, fee }: { title: string; eta: string; fee: string }) {
  return (
    <div className="rounded-2xl bg-cream p-6">
      <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-ink/55">{title}</div>
      <div className="mt-2 font-display text-2xl">{eta}</div>
      <div className="mt-1 text-sm text-ink/65">{fee} flat</div>
    </div>
  );
}
