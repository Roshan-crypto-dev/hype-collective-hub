import { createFileRoute } from "@tanstack/react-router";
import { AdminHeader, DataCard, StatCard } from "@/components/admin/AdminLayout";

export const Route = createFileRoute("/admin/analytics")({ component: Page });

function Page() {
  const bars = [42, 58, 51, 69, 84, 76, 92, 88, 102, 96, 118, 124];
  const max = Math.max(...bars);
  return (
    <>
      <AdminHeader title="Platform Analytics" subtitle="Last 12 weeks · all marketplaces" />
      <div className="mb-5 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="GMV (90d)" value="₹14.2Cr" hint="▲ 38% YoY" tone="ink" />
        <StatCard label="Take rate" value="11.8%" tone="gold" />
        <StatCard label="MAU" value="48,210" hint="▲ 9% MoM" tone="green" />
        <StatCard label="Auth fail rate" value="0.8%" tone="red" />
      </div>
      <DataCard title="Weekly GMV (₹ Lakh)">
        <div className="flex h-44 items-end gap-2">
          {bars.map((b, i) => (
            <div key={i} className="flex-1 rounded-t-md bg-ink/85" style={{ height: `${(b / max) * 100}%` }} title={`Week ${i + 1}: ₹${b}L`} />
          ))}
        </div>
        <div className="mt-3 flex justify-between text-[11px] text-ink/55">
          <span>W1</span><span>W4</span><span>W8</span><span>W12</span>
        </div>
      </DataCard>

      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        <DataCard title="Top categories (90d)">
          <ul className="space-y-2 text-sm">
            <li className="flex justify-between"><span>Sneakers</span><span className="font-semibold">₹9.4Cr</span></li>
            <li className="flex justify-between"><span>Apparel</span><span className="font-semibold">₹2.8Cr</span></li>
            <li className="flex justify-between"><span>Collectibles</span><span className="font-semibold">₹1.4Cr</span></li>
            <li className="flex justify-between"><span>Accessories</span><span className="font-semibold">₹62L</span></li>
          </ul>
        </DataCard>
        <DataCard title="Cohort retention">
          <ul className="space-y-2 text-sm font-mono">
            <li className="flex justify-between"><span>W1</span><span>100%</span></li>
            <li className="flex justify-between"><span>W4</span><span>48%</span></li>
            <li className="flex justify-between"><span>W12</span><span>31%</span></li>
            <li className="flex justify-between"><span>W26</span><span>22%</span></li>
          </ul>
        </DataCard>
      </div>
    </>
  );
}
