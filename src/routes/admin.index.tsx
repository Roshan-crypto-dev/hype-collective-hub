import { createFileRoute, Link } from "@tanstack/react-router";
import { AdminHeader, StatCard, DataCard, StatusPill, Th, Td } from "@/components/admin/AdminLayout";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/admin/")({
  component: AdminIndex,
});

function AdminIndex() {
  return (
    <>
      <AdminHeader title="Console" subtitle="Platform health at a glance · last 24h" />
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="GMV (24h)" value="₹18.4L" hint="▲ 12.3% vs. yesterday" tone="ink" />
        <StatCard label="Active auctions" value="142" hint="38 ending in <1h" tone="gold" />
        <StatCard label="New users" value="312" hint="48 awaiting KYC" tone="green" />
        <StatCard label="Open disputes" value="7" hint="2 escalated" tone="red" />
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <DataCard title="Action queue" action={<Link to="/admin/moderation" className="text-xs font-bold uppercase tracking-[0.14em] text-red">View all →</Link>}>
            <table className="w-full">
              <thead>
                <tr><Th>Item</Th><Th>Type</Th><Th>Severity</Th><Th>Age</Th><Th> </Th></tr>
              </thead>
              <tbody>
                {[
                  { i: "Jordan 4 'Bred' listing", t: "Suspected replica", s: "high", a: "12m" },
                  { i: "Seller @sole.lab", t: "KYC review", s: "med", a: "1h" },
                  { i: "Order #HC-29104", t: "Refund request", s: "med", a: "2h" },
                  { i: "Auction 'Off-White AJ1'", t: "Bid manipulation", s: "high", a: "3h" },
                  { i: "User @hypebeast_99", t: "Report (3rd)", s: "high", a: "5h" },
                ].map((r) => (
                  <tr key={r.i}>
                    <Td>{r.i}</Td>
                    <Td className="text-ink/65">{r.t}</Td>
                    <Td>{r.s === "high" ? <StatusPill tone="red">High</StatusPill> : <StatusPill tone="amber">Medium</StatusPill>}</Td>
                    <Td className="text-ink/55">{r.a}</Td>
                    <Td><button className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-[0.14em]">Resolve <ArrowRight size={11} /></button></Td>
                  </tr>
                ))}
              </tbody>
            </table>
          </DataCard>
        </div>
        <DataCard title="System">
          <ul className="space-y-3 text-sm">
            <li className="flex justify-between"><span>API latency p95</span><span className="font-mono">128ms</span></li>
            <li className="flex justify-between"><span>Webhook backlog</span><span className="font-mono">0</span></li>
            <li className="flex justify-between"><span>Auth queue depth</span><span className="font-mono">23</span></li>
            <li className="flex justify-between"><span>Payment success</span><span className="font-mono text-green-ink">99.2%</span></li>
            <li className="flex justify-between"><span>Shiprocket sync</span><span className="font-mono text-green-ink">healthy</span></li>
          </ul>
        </DataCard>
      </div>
    </>
  );
}
