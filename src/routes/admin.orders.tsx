import { createFileRoute } from "@tanstack/react-router";
import { AdminHeader, DataCard, PillTabs, StatusPill, Th, Td } from "@/components/admin/AdminLayout";

export const Route = createFileRoute("/admin/orders")({ component: Page });

const ORDERS = [
  { id: "HC-29104", buyer: "Aarav M.", item: "AJ1 Chicago", amount: "₹28,500", status: "paid", date: "10:42" },
  { id: "HC-29103", buyer: "Kabir S.", item: "Yeezy Beluga", amount: "₹25,200", status: "shipped", date: "09:18" },
  { id: "HC-29102", buyer: "Riya K.", item: "Supreme BLK Hoodie", amount: "₹31,000", status: "auth", date: "08:55" },
  { id: "HC-29101", buyer: "Dev I.", item: "AJ4 White Cement", amount: "₹32,900", status: "refund_req", date: "07:30" },
  { id: "HC-29100", buyer: "Meera J.", item: "NB 990v6", amount: "₹24,999", status: "delivered", date: "Yesterday" },
];

function Page() {
  return (
    <>
      <AdminHeader title="Orders" subtitle="1,402 in flight · 3 refund requests pending" />
      <PillTabs tabs={["All", "Paid", "Authentication", "Shipped", "Delivered", "Refunds"]} active="All" />
      <DataCard title="Order ledger">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px]">
            <thead><tr><Th>Order</Th><Th>Buyer</Th><Th>Item</Th><Th>Amount</Th><Th>Status</Th><Th>Time</Th><Th>Actions</Th></tr></thead>
            <tbody>
              {ORDERS.map((o) => (
                <tr key={o.id}>
                  <Td className="font-mono">{o.id}</Td>
                  <Td>{o.buyer}</Td>
                  <Td className="font-semibold">{o.item}</Td>
                  <Td className="font-semibold">{o.amount}</Td>
                  <Td>
                    {o.status === "paid" && <StatusPill tone="green">Paid</StatusPill>}
                    {o.status === "shipped" && <StatusPill tone="gold">Shipped</StatusPill>}
                    {o.status === "auth" && <StatusPill tone="amber">In auth</StatusPill>}
                    {o.status === "refund_req" && <StatusPill tone="red">Refund req.</StatusPill>}
                    {o.status === "delivered" && <StatusPill tone="ink">Delivered</StatusPill>}
                  </Td>
                  <Td className="text-ink/55">{o.date}</Td>
                  <Td><button className="text-xs font-bold uppercase tracking-[0.14em]">View</button></Td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </DataCard>
    </>
  );
}
