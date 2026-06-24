import { createFileRoute } from "@tanstack/react-router";
import { AdminHeader, DataCard, PillTabs, StatusPill, Th, Td } from "@/components/admin/AdminLayout";

export const Route = createFileRoute("/admin/disputes")({ component: Page });

const D = [
  { id: "DS-441", parties: "Aarav (B) ↔ Sole Lab (S)", reason: "Item not as described", amount: "₹28,500", age: "2d", sev: "high" },
  { id: "DS-440", parties: "Kabir (B) ↔ Vault 99 (S)", reason: "Replica suspected post-auth", amount: "₹19,200", age: "3d", sev: "high" },
  { id: "DS-439", parties: "Riya (B) ↔ HYPE Store (S)", reason: "Late delivery, wrong size", amount: "₹12,400", age: "4d", sev: "med" },
  { id: "DS-438", parties: "Dev (B) ↔ Cop & Hold (S)", reason: "Refund delay", amount: "₹8,499", age: "5d", sev: "low" },
];

function Page() {
  return (
    <>
      <AdminHeader title="Disputes" subtitle="7 open · 2 escalated · SLA target 5 business days" />
      <PillTabs tabs={["All", "Open", "Awaiting buyer", "Awaiting seller", "Escalated", "Resolved"]} active="Open" />
      <DataCard title="Open disputes">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px]">
            <thead><tr><Th>ID</Th><Th>Parties</Th><Th>Reason</Th><Th>Amount</Th><Th>Age</Th><Th>Severity</Th><Th>Actions</Th></tr></thead>
            <tbody>
              {D.map((d) => (
                <tr key={d.id}>
                  <Td className="font-mono">{d.id}</Td>
                  <Td className="font-semibold">{d.parties}</Td>
                  <Td className="text-ink/65">{d.reason}</Td>
                  <Td className="font-semibold">{d.amount}</Td>
                  <Td className="text-ink/55">{d.age}</Td>
                  <Td>
                    {d.sev === "high" && <StatusPill tone="red">High</StatusPill>}
                    {d.sev === "med" && <StatusPill tone="amber">Medium</StatusPill>}
                    {d.sev === "low" && <StatusPill tone="ink">Low</StatusPill>}
                  </Td>
                  <Td><button className="text-xs font-bold uppercase tracking-[0.14em]">Review</button></Td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </DataCard>
    </>
  );
}
