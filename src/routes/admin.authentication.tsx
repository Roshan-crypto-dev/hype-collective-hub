import { createFileRoute } from "@tanstack/react-router";
import { AdminHeader, DataCard, PillTabs, StatusPill, Th, Td } from "@/components/admin/AdminLayout";
import { Eye, Check, X } from "lucide-react";

export const Route = createFileRoute("/admin/authentication")({ component: Page });

const QUEUE = [
  { id: "AU-1041", item: "Air Jordan 1 Chicago 2022", seller: "Sole Lab", arrived: "2h ago", priority: "high" },
  { id: "AU-1042", item: "Yeezy 350 Beluga 2.0", seller: "Drop Society", arrived: "3h ago", priority: "med" },
  { id: "AU-1043", item: "Off-White AJ1 UNC", seller: "HYPE India Store", arrived: "4h ago", priority: "high" },
  { id: "AU-1044", item: "FoG Essentials Hoodie", seller: "Cop & Hold", arrived: "5h ago", priority: "low" },
  { id: "AU-1045", item: "Adidas Gazelle Bold", seller: "Vault 99", arrived: "6h ago", priority: "med" },
];

function Page() {
  return (
    <>
      <AdminHeader title="Authentication Queue" subtitle="23 in queue · avg turnaround 18h · 4 specialists on shift" />
      <PillTabs tabs={["Queue", "In progress", "Approved", "Rejected", "Disputed"]} active="Queue" />
      <DataCard title="Awaiting authentication">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px]">
            <thead><tr><Th>ID</Th><Th>Item</Th><Th>Seller</Th><Th>Arrived</Th><Th>Priority</Th><Th>Actions</Th></tr></thead>
            <tbody>
              {QUEUE.map((q) => (
                <tr key={q.id}>
                  <Td className="font-mono">{q.id}</Td>
                  <Td className="font-semibold">{q.item}</Td>
                  <Td className="text-ink/65">{q.seller}</Td>
                  <Td className="text-ink/65">{q.arrived}</Td>
                  <Td>
                    {q.priority === "high" && <StatusPill tone="red">High</StatusPill>}
                    {q.priority === "med" && <StatusPill tone="amber">Medium</StatusPill>}
                    {q.priority === "low" && <StatusPill tone="ink">Low</StatusPill>}
                  </Td>
                  <Td>
                    <div className="flex gap-1.5">
                      <button className="inline-flex items-center gap-1 rounded-full bg-ink px-3 py-1 text-[11px] font-bold text-cream"><Eye size={11} /> Inspect</button>
                      <button aria-label="Pass" className="grid h-7 w-7 place-items-center rounded-full bg-green text-green-ink"><Check size={12} /></button>
                      <button aria-label="Fail" className="grid h-7 w-7 place-items-center rounded-full bg-red text-cream"><X size={12} /></button>
                    </div>
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
