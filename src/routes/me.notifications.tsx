import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/me/notifications")({ component: Page });

const PREFS = [
  { label: "Outbid alerts", hint: "Email + push when someone outbids you" },
  { label: "Auction ending soon", hint: "Last 5 minutes on watched auctions" },
  { label: "Won auction", hint: "Immediate payment reminder" },
  { label: "Order shipped / delivered", hint: "Tracking updates" },
  { label: "New drops in saved brands", hint: "Weekly digest" },
  { label: "Marketing & promos", hint: "Sales, new features" },
];

function Page() {
  return (
    <>
      <h1 className="mb-6 font-display text-3xl">Notifications</h1>
      <div className="rounded-2xl border border-line-soft bg-cream">
        {PREFS.map((p, i) => (
          <div key={p.label} className={`flex items-center justify-between p-5 ${i ? "border-t border-line-soft" : ""}`}>
            <div>
              <div className="font-semibold">{p.label}</div>
              <div className="text-xs text-ink/55">{p.hint}</div>
            </div>
            <span className={`relative inline-block h-6 w-11 rounded-full ${i < 4 ? "bg-green" : "bg-ink/15"}`}>
              <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-cream shadow ${i < 4 ? "left-[22px]" : "left-0.5"}`} />
            </span>
          </div>
        ))}
      </div>
    </>
  );
}
