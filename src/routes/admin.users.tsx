import { createFileRoute } from "@tanstack/react-router";
import { AdminHeader, DataCard, PillTabs, StatusPill, Th, Td } from "@/components/admin/AdminLayout";
import { Search, MoreHorizontal } from "lucide-react";

export const Route = createFileRoute("/admin/users")({ component: Page });

const USERS = [
  { id: "u_001", name: "Aarav Mehta", email: "aarav@mail.com", role: "Buyer", kyc: "verified", joined: "2026-04-12", spend: "₹1.2L" },
  { id: "u_002", name: "Riya Kapoor", email: "riya@mail.com", role: "Seller", kyc: "pending", joined: "2026-05-02", spend: "—" },
  { id: "u_003", name: "Kabir Singh", email: "kabir@mail.com", role: "Buyer", kyc: "verified", joined: "2025-12-09", spend: "₹4.8L" },
  { id: "u_004", name: "Sole Lab", email: "ops@solelab.in", role: "Seller", kyc: "verified", joined: "2025-09-14", spend: "—" },
  { id: "u_005", name: "Dev Iyer", email: "dev@mail.com", role: "Buyer", kyc: "rejected", joined: "2026-06-19", spend: "₹0" },
  { id: "u_006", name: "Meera Joshi", email: "meera@mail.com", role: "Admin", kyc: "verified", joined: "2024-03-01", spend: "—" },
];

function Page() {
  return (
    <>
      <AdminHeader title="Users" subtitle="14,283 total · 312 new this week" />
      <PillTabs tabs={["All", "Buyers", "Sellers", "Admins", "Banned"]} active="All" />
      <DataCard
        title="Directory"
        action={
          <div className="flex items-center gap-2 rounded-full border border-line bg-white px-3 py-1.5 text-sm">
            <Search size={13} className="opacity-60" /><input placeholder="Search name, email, ID" className="w-48 bg-transparent focus:outline-none" />
          </div>
        }
      >
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px]">
            <thead><tr><Th>User</Th><Th>Role</Th><Th>KYC</Th><Th>Joined</Th><Th>Lifetime spend</Th><Th> </Th></tr></thead>
            <tbody>
              {USERS.map((u) => (
                <tr key={u.id}>
                  <Td>
                    <div className="font-semibold">{u.name}</div>
                    <div className="text-xs text-ink/55">{u.email}</div>
                  </Td>
                  <Td>{u.role}</Td>
                  <Td>
                    {u.kyc === "verified" && <StatusPill tone="green">Verified</StatusPill>}
                    {u.kyc === "pending" && <StatusPill tone="amber">Pending</StatusPill>}
                    {u.kyc === "rejected" && <StatusPill tone="red">Rejected</StatusPill>}
                  </Td>
                  <Td className="text-ink/65">{u.joined}</Td>
                  <Td className="font-semibold">{u.spend}</Td>
                  <Td><button aria-label="Actions" className="grid h-8 w-8 place-items-center rounded-lg hover:bg-cream-2"><MoreHorizontal size={15} /></button></Td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </DataCard>
    </>
  );
}
