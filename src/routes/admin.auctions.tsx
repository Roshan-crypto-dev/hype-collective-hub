import { createFileRoute } from "@tanstack/react-router";
import { AdminHeader, DataCard, StatusPill, Th, Td } from "@/components/admin/AdminLayout";
import { liveAuctions } from "@/lib/hype-data";
import { formatINR } from "@/lib/cart-store";

export const Route = createFileRoute("/admin/auctions")({ component: Page });

function Page() {
  return (
    <>
      <AdminHeader title="Auctions" subtitle="142 live · 38 ending within the hour" />
      <DataCard title="Live oversight">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px]">
            <thead><tr><Th>Auction</Th><Th>Current bid</Th><Th>Watchers</Th><Th>Ends in</Th><Th>Status</Th><Th>Actions</Th></tr></thead>
            <tbody>
              {liveAuctions.map((a) => (
                <tr key={a.id}>
                  <Td>
                    <div className="flex items-center gap-3">
                      <img src={a.image} alt="" className="h-10 w-10 rounded-md object-cover" />
                      <div className="min-w-0">
                        <div className="truncate font-semibold">{a.name}</div>
                        <div className="text-xs text-ink/55">{a.brand} · {a.size}</div>
                      </div>
                    </div>
                  </Td>
                  <Td className="font-semibold">{formatINR(a.bid)}</Td>
                  <Td>{a.watching}</Td>
                  <Td className="font-mono">{a.endsIn}</Td>
                  <Td><StatusPill tone="green">Live</StatusPill></Td>
                  <Td>
                    <div className="flex gap-2 text-xs font-bold uppercase tracking-[0.14em]">
                      <button className="hover:text-ink/65">Extend</button>
                      <button className="text-red hover:underline">Cancel</button>
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
