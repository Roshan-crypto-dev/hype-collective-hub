import { createFileRoute } from "@tanstack/react-router";
import { Truck } from "lucide-react";

export const Route = createFileRoute("/me/orders")({ component: Page });

const ORDERS = [
  { id: "HC-29104", item: "AJ1 Chicago", amount: 28500, status: "In authentication", date: "Today" },
  { id: "HC-29088", item: "Yeezy Beluga", amount: 25200, status: "Shipped · Delhivery", date: "2 days ago" },
  { id: "HC-29067", item: "NB 990v6 Grey", amount: 24999, status: "Delivered", date: "Last week" },
];

function Page() {
  return (
    <>
      <h1 className="mb-6 font-display text-3xl">Orders</h1>
      <div className="space-y-3">
        {ORDERS.map((o) => (
          <div key={o.id} className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-line-soft bg-cream p-5">
            <div>
              <div className="font-mono text-xs text-ink/55">{o.id} · {o.date}</div>
              <div className="mt-1 font-semibold">{o.item}</div>
              <div className="text-sm text-ink/65">₹{o.amount.toLocaleString("en-IN")}</div>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full bg-ink px-3.5 py-1.5 text-xs font-bold text-cream">
              <Truck size={12} /> {o.status}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
