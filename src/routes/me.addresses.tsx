import { createFileRoute } from "@tanstack/react-router";
import { Plus } from "lucide-react";

export const Route = createFileRoute("/me/addresses")({ component: Page });

const A = [
  { label: "Home", line1: "402, Lotus Heights", line2: "Bandra West, Mumbai 400050", phone: "+91 98xxxxxx12", primary: true },
  { label: "Office", line1: "5th Floor, Phoenix Tower", line2: "Lower Parel, Mumbai 400013", phone: "+91 98xxxxxx12" },
];

function Page() {
  return (
    <>
      <header className="mb-6 flex items-center justify-between">
        <h1 className="font-display text-3xl">Addresses</h1>
        <button className="inline-flex items-center gap-1.5 rounded-full bg-ink px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-cream"><Plus size={12} /> Add address</button>
      </header>
      <div className="grid gap-4 md:grid-cols-2">
        {A.map((a, i) => (
          <div key={i} className="rounded-2xl border border-line-soft bg-cream p-5">
            <div className="flex items-center justify-between">
              <div className="font-semibold">{a.label}</div>
              {a.primary && <span className="rounded-full bg-green px-2.5 py-1 text-[11px] font-bold text-green-ink">Default</span>}
            </div>
            <div className="mt-3 text-sm">
              <div>{a.line1}</div>
              <div className="text-ink/65">{a.line2}</div>
              <div className="mt-1 text-ink/65">{a.phone}</div>
            </div>
            <div className="mt-4 flex gap-3 text-xs font-bold uppercase tracking-[0.14em]">
              <button>Edit</button>
              {!a.primary && <button>Set default</button>}
              <button className="text-red">Remove</button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
