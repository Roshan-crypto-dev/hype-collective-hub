import { createFileRoute } from "@tanstack/react-router";
import { AdminHeader, DataCard, PillTabs, StatusPill, Th, Td } from "@/components/admin/AdminLayout";
import { Flag } from "lucide-react";

export const Route = createFileRoute("/admin/moderation")({ component: Page });

const R = [
  { id: "R-2014", target: "Listing · AJ1 Lost & Found", type: "Replica suspected", reporter: "buyer @aarav", count: 3 },
  { id: "R-2013", target: "User · @hypebeast_99", type: "Harassment in DM", reporter: "buyer @meera", count: 5 },
  { id: "R-2012", target: "Listing · Off-White Jordan", type: "Misleading photos", reporter: "buyer @kabir", count: 2 },
  { id: "R-2011", target: "Auction · Yeezy 700", type: "Shill bidding", reporter: "system", count: 1 },
];

function Page() {
  return (
    <>
      <AdminHeader title="Moderation" subtitle="Reports queue · trust & safety triage" />
      <PillTabs tabs={["All reports", "Listings", "Users", "Auctions", "Resolved"]} active="All reports" />
      <DataCard title="Open reports">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[680px]">
            <thead><tr><Th>ID</Th><Th>Target</Th><Th>Type</Th><Th>Reporter</Th><Th>Reports</Th><Th>Actions</Th></tr></thead>
            <tbody>
              {R.map((r) => (
                <tr key={r.id}>
                  <Td className="font-mono">{r.id}</Td>
                  <Td className="font-semibold">{r.target}</Td>
                  <Td className="text-ink/65"><span className="inline-flex items-center gap-1.5"><Flag size={12} /> {r.type}</span></Td>
                  <Td className="text-ink/65">{r.reporter}</Td>
                  <Td>{r.count > 2 ? <StatusPill tone="red">{r.count}</StatusPill> : <StatusPill tone="ink">{r.count}</StatusPill>}</Td>
                  <Td>
                    <div className="flex gap-2 text-xs font-bold uppercase tracking-[0.14em]">
                      <button>Review</button>
                      <button className="text-red">Takedown</button>
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
