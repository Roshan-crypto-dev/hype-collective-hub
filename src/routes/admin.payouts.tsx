import { createFileRoute } from "@tanstack/react-router";
import { AdminHeader, DataCard, StatCard, PillTabs, StatusPill, Th, Td } from "@/components/admin/AdminLayout";

export const Route = createFileRoute("/admin/payouts")({ component: Page });

const PAYOUTS = [
  { id: "PO-8821", seller: "Sole Lab", amount: "₹3,42,500", method: "UPI", status: "pending", req: "2026-06-22" },
  { id: "PO-8820", seller: "Drop Society", amount: "₹1,18,900", method: "Bank", status: "pending", req: "2026-06-22" },
  { id: "PO-8819", seller: "HYPE India Store", amount: "₹8,76,200", method: "Bank", status: "cleared", req: "2026-06-20" },
  { id: "PO-8818", seller: "Vault 99", amount: "₹42,300", method: "UPI", status: "hold", req: "2026-06-19" },
];

function Page() {
  return (
    <>
      <AdminHeader title="Payouts" subtitle="Ledger · approvals · disputes" />
      <div className="mb-5 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Pending approval" value="₹14.2L" hint="22 requests" tone="amber" />
        <StatCard label="Cleared this week" value="₹68.4L" tone="green" />
        <StatCard label="Held / review" value="₹2.1L" hint="6 sellers" tone="red" />
        <StatCard label="Take rate (avg)" value="11.8%" tone="ink" />
      </div>
      <PillTabs tabs={["Pending", "Cleared", "Held", "Disputed"]} active="Pending" />
      <DataCard title="Payout queue">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px]">
            <thead><tr><Th>ID</Th><Th>Seller</Th><Th>Amount</Th><Th>Method</Th><Th>Status</Th><Th>Requested</Th><Th>Actions</Th></tr></thead>
            <tbody>
              {PAYOUTS.map((p) => (
                <tr key={p.id}>
                  <Td className="font-mono">{p.id}</Td>
                  <Td className="font-semibold">{p.seller}</Td>
                  <Td className="font-semibold">{p.amount}</Td>
                  <Td>{p.method}</Td>
                  <Td>
                    {p.status === "pending" && <StatusPill tone="amber">Pending</StatusPill>}
                    {p.status === "cleared" && <StatusPill tone="green">Cleared</StatusPill>}
                    {p.status === "hold" && <StatusPill tone="red">On hold</StatusPill>}
                  </Td>
                  <Td className="text-ink/55">{p.req}</Td>
                  <Td>
                    {p.status === "pending" ? (
                      <button className="rounded-full bg-ink px-3 py-1 text-[11px] font-bold text-cream">Approve</button>
                    ) : (
                      <button className="text-xs font-bold uppercase tracking-[0.14em]">View</button>
                    )}
                  </Td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </DataCard>
    </>
  );
}
