import { createFileRoute } from "@tanstack/react-router";
import { AdminHeader, DataCard, PillTabs, StatusPill, Th, Td } from "@/components/admin/AdminLayout";
import { shopItems } from "@/lib/hype-data";
import { formatINR } from "@/lib/cart-store";

export const Route = createFileRoute("/admin/products")({ component: Page });

function Page() {
  return (
    <>
      <AdminHeader title="Listings" subtitle="2,830 active · 12 in takedown queue" />
      <PillTabs tabs={["All", "Active", "Draft", "Sold", "Takedown queue", "Removed"]} active="All" />
      <DataCard title="Catalog">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px]">
            <thead><tr><Th>Product</Th><Th>Seller</Th><Th>Price</Th><Th>Stock</Th><Th>Status</Th><Th>Actions</Th></tr></thead>
            <tbody>
              {shopItems.map((p) => (
                <tr key={p.id}>
                  <Td>
                    <div className="flex items-center gap-3">
                      <img src={p.image} alt="" className="h-10 w-10 rounded-md object-cover" />
                      <div className="min-w-0">
                        <div className="truncate font-semibold">{p.name}</div>
                        <div className="text-xs text-ink/55">{p.condition}</div>
                      </div>
                    </div>
                  </Td>
                  <Td className="text-ink/65">Sole Lab</Td>
                  <Td className="font-semibold">{formatINR(p.price)}</Td>
                  <Td>1</Td>
                  <Td><StatusPill tone="green">Live</StatusPill></Td>
                  <Td><button className="text-xs font-bold uppercase tracking-[0.14em] text-red hover:underline">Takedown</button></Td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </DataCard>
    </>
  );
}
