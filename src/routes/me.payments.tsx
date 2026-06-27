import { createFileRoute } from "@tanstack/react-router";
import { CreditCard, Plus, Smartphone } from "lucide-react";

export const Route = createFileRoute("/me/payments")({
  head: () => ({ meta: [{ title: "Payment Methods — HYPE Account" }, { name: "description", content: "Manage cards, UPI and saved payment methods on HYPE." }] }),
  component: Page,
});


function Page() {
  return (
    <>
      <header className="mb-6 flex items-center justify-between">
        <h1 className="font-display text-3xl">Payment methods</h1>
        <button className="inline-flex items-center gap-1.5 rounded-full bg-ink px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-cream"><Plus size={12} /> Add method</button>
      </header>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl bg-ink p-5 text-cream">
          <div className="flex items-center justify-between">
            <CreditCard size={20} />
            <span className="rounded-full bg-gold px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-ink">Default</span>
          </div>
          <div className="mt-8 font-mono text-lg tracking-widest">•••• •••• •••• 4242</div>
          <div className="mt-2 flex justify-between text-xs text-cream/70">
            <span>Aarav Mehta</span><span>09 / 28</span>
          </div>
        </div>
        <div className="rounded-2xl border border-line-soft bg-cream p-5">
          <div className="flex items-center justify-between">
            <Smartphone size={20} />
            <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-ink/55">UPI</span>
          </div>
          <div className="mt-8 font-mono text-lg">aarav@okhdfc</div>
          <div className="mt-2 text-xs text-ink/65">Verified ID</div>
        </div>
      </div>
    </>
  );
}
