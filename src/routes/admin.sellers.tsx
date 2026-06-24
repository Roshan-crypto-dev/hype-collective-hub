import { createFileRoute } from "@tanstack/react-router";
import { AdminHeader, DataCard, PillTabs, StatusPill, Th, Td } from "@/components/admin/AdminLayout";
import { Check, X } from "lucide-react";

export const Route = createFileRoute("/admin/sellers")({ component: Page });

const SELLERS = [
  { shop: "Sole Lab", owner: "Riya Kapoor", tier: "Gold", listings: 142, gmv: "₹84L", status: "active" },
  { shop: "Drop Society", owner: "Kabir Singh", tier: "Silver", listings: 67, gmv: "₹22L", status: "active" },
  { shop: "HYPE India Store", owner: "Aman Verma", tier: "Platinum", listings: 412, gmv: "₹3.1Cr", status: "active" },
  { shop: "Vault 99", owner: "Neha Rao", tier: "—", listings: 0, gmv: "—", status: "kyc" },
  { shop: "ResellRaj", owner: "Raj Patel", tier: "—", listings: 0, gmv: "—", status: "kyc" },
  { shop: "Cop & Hold", owner: "Tara M.", tier: "Bronze", listings: 12, gmv: "₹1.4L", status: "suspended" },
];

function Page() {
  return (
    <>
      <AdminHeader title="Sellers & KYC" subtitle="48 awaiting verification · 6 tier upgrades pending" />
      <PillTabs tabs={["All", "Active", "KYC queue", "Suspended", "Tier upgrade"]} active="All" />
      <DataCard title="Seller directory">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px]">
            <thead><tr><Th>Shop</Th><Th>Owner</Th><Th>Tier</Th><Th>Listings</Th><Th>GMV (90d)</Th><Th>Status</Th><Th>Actions</Th></tr></thead>
            <tbody>
              {SELLERS.map((s) => (
                <tr key={s.shop}>
                  <Td className="font-semibold">{s.shop}</Td>
                  <Td className="text-ink/65">{s.owner}</Td>
                  <Td>{s.tier}</Td>
                  <Td>{s.listings}</Td>
                  <Td className="font-semibold">{s.gmv}</Td>
                  <Td>
                    {s.status === "active" && <StatusPill tone="green">Active</StatusPill>}
                    {s.status === "kyc" && <StatusPill tone="amber">KYC review</StatusPill>}
                    {s.status === "suspended" && <StatusPill tone="red">Suspended</StatusPill>}
                  </Td>
                  <Td>
                    {s.status === "kyc" ? (
                      <div className="flex gap-1.5">
                        <button className="inline-flex items-center gap-1 rounded-full bg-green px-3 py-1 text-[11px] font-bold text-green-ink"><Check size={11} /> Approve</button>
                        <button className="inline-flex items-center gap-1 rounded-full bg-red px-3 py-1 text-[11px] font-bold text-cream"><X size={11} /> Reject</button>
                      </div>
                    ) : (
                      <button className="text-xs font-bold uppercase tracking-[0.14em] text-ink/65 hover:text-ink">Manage</button>
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
