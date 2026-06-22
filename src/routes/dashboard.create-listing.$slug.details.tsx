import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, ChevronLeft, ChevronRight, Palette, Calendar, Package, Ruler, Info } from "lucide-react";

export const Route = createFileRoute("/dashboard/create-listing/$slug/details")({
  head: () => ({ meta: [{ title: "Listing details — HYPE Seller" }] }),
  component: Details,
});

const steps = ["Product", "Details", "Condition", "Photos", "Pricing", "Review"];

function Details() {
  return (
    <div>
      <h1 className="font-display text-4xl tracking-tight">List Your Next Drop</h1>
      <p className="mt-1 text-ink/65">Start by searching the product you want to sell.</p>

      <Link to="/dashboard/create-listing" className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium"><ChevronLeft size={16} /> Back</Link>

      <ol className="mt-5 flex items-start">
        {steps.map((s, i) => (
          <li key={s} className="flex flex-1 items-start last:flex-none">
            <div className="flex flex-col items-center">
              <div className={`grid h-11 w-11 place-items-center rounded-full border text-sm font-bold ${
                i === 0 ? "border-ink bg-ink text-cream" : i === 1 ? "border-ink bg-ink text-cream" : "border-line bg-white text-ink/45"
              }`}>
                {i === 0 ? <Check size={18} /> : i + 1}
              </div>
              <div className={`mt-2 text-xs font-medium ${i <= 1 ? "text-ink" : "text-ink/45"}`}>{s}</div>
            </div>
            {i < steps.length - 1 && <div className="mx-1 mt-5 h-px flex-1 bg-line" />}
          </li>
        ))}
      </ol>

      <div className="mt-8 grid gap-6 rounded-3xl bg-cream p-8 lg:grid-cols-[1fr_280px]">
        <div>
          <div className="flex items-start gap-4">
            <div className="grid h-8 w-8 flex-none place-items-center rounded-full bg-ink font-display text-sm text-cream">2</div>
            <div>
              <h2 className="font-display text-2xl">Select Product Details</h2>
              <p className="mt-1 text-sm text-ink/55">Choose the option that best matches your item.</p>
            </div>
          </div>

          <div className="mt-6 space-y-3">
            <Row icon={<Ruler size={22} />} title="Size" desc="Select the size of your item" />
            <Row icon={<Palette size={22} />} title="Colorway" desc="Select the color or colorway" />
            <Row icon={<Calendar size={22} />} title="Year of Release" desc="Select the year of release" />
            <Row icon={<Package size={22} />} title="Style / SKU" desc="Select the style or SKU if available" optional />
          </div>
        </div>

        <aside className="self-start rounded-2xl bg-cream-2 p-5">
          <div className="flex items-center gap-2.5">
            <div className="grid h-6 w-6 place-items-center rounded-full bg-ink text-cream"><Info size={13} /></div>
            <b className="text-sm">Why this step</b>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-ink/60">Providing accurate details helps buyers find your listing and builds trust.</p>
        </aside>
      </div>

      <div className="mt-7 flex items-center justify-between">
        <button className="rounded-full border border-ink/30 px-6 py-3 text-sm font-semibold">Save as draft</button>
        <button className="inline-flex items-center gap-2 rounded-full bg-ink px-7 py-3.5 text-sm font-bold text-cream">Next step →</button>
      </div>
    </div>
  );
}

function Row({ icon, title, desc, optional }: { icon: React.ReactNode; title: string; desc: string; optional?: boolean }) {
  return (
    <button className="flex w-full items-center gap-5 rounded-xl border border-line-soft bg-white p-5 text-left transition hover:border-ink">
      <div className="grid h-10 w-10 place-items-center text-ink/80">{icon}</div>
      <div className="flex-1">
        <div className="text-base font-bold">{title} {optional && <span className="ml-1 text-sm font-medium text-ink/45">(Optional)</span>}</div>
        <div className="text-sm text-ink/55">{desc}</div>
      </div>
      <ChevronRight size={18} className="text-ink/35" />
    </button>
  );
}
