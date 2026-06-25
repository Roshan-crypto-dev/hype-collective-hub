import { createFileRoute } from "@tanstack/react-router";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Legend, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Eye, TrendingUp, Wallet, Users } from "lucide-react";

export const Route = createFileRoute("/dashboard/analytics")({
  head: () => ({ meta: [{ title: "Analytics — HYPE Seller" }] }),
  component: AnalyticsPage,
});

const sales = [
  { d: "Mon", revenue: 18400, orders: 4 },
  { d: "Tue", revenue: 22100, orders: 5 },
  { d: "Wed", revenue: 31200, orders: 7 },
  { d: "Thu", revenue: 27800, orders: 6 },
  { d: "Fri", revenue: 41500, orders: 9 },
  { d: "Sat", revenue: 58900, orders: 13 },
  { d: "Sun", revenue: 49200, orders: 11 },
];

const bidVelocity = [
  { h: "00", bids: 4 },
  { h: "04", bids: 2 },
  { h: "08", bids: 9 },
  { h: "12", bids: 22 },
  { h: "16", bids: 31 },
  { h: "20", bids: 48 },
  { h: "23", bids: 27 },
];

const categories = [
  { name: "Sneakers", value: 64, color: "#0A0A0A" },
  { name: "Apparel", value: 22, color: "#C9A24A" },
  { name: "Accessories", value: 9, color: "#2A9D8F" },
  { name: "Collectibles", value: 5, color: "#E63946" },
];

const topListings = [
  { name: "AJ1 Chicago Lost & Found", views: 1240, watch: 312, sold: 8 },
  { name: "Yeezy 350 Bone", views: 980, watch: 244, sold: 6 },
  { name: "Dunk Low Panda", views: 870, watch: 198, sold: 11 },
  { name: "Off-White Hoodie", views: 620, watch: 142, sold: 3 },
  { name: "Gazelle Bold", views: 510, watch: 96, sold: 4 },
];

const stats = [
  { k: "30-day Revenue", v: "₹2,49,100", d: "▲ 18%", icon: Wallet, tone: "ink" },
  { k: "Conversion Rate", v: "3.8%", d: "▲ 0.4pp", icon: TrendingUp, tone: "green" },
  { k: "Watchers", v: "1,332", d: "▲ 12%", icon: Users, tone: "gold" },
  { k: "Listing Views", v: "8,420", d: "▼ 3%", icon: Eye, tone: "red" },
] as const;

function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="font-display text-4xl tracking-tight">Analytics</h1>
        <p className="mt-1 text-ink/65">Sales, watchlist, conversion and bid velocity — last 7 days.</p>
      </header>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.k} className="rounded-2xl border border-line bg-cream p-5">
            <div className="flex items-center justify-between text-[12px] text-ink/60"><span>{s.k}</span><s.icon size={14} /></div>
            <div className="mt-2 font-display text-3xl">{s.v}</div>
            <div className={`mt-1 text-[11px] font-semibold ${s.tone === "red" ? "text-red" : s.tone === "green" ? "text-green" : "text-ink/55"}`}>{s.d}</div>
          </div>
        ))}
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        <div className="rounded-2xl border border-line bg-cream p-5 lg:col-span-2">
          <div className="mb-4 flex items-baseline justify-between">
            <h2 className="font-display text-lg">Revenue (7d)</h2>
            <span className="text-[11px] uppercase tracking-[0.16em] text-ink/55">INR</span>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={sales} margin={{ top: 8, right: 8, left: -10, bottom: 0 }}>
                <defs>
                  <linearGradient id="rev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#0A0A0A" stopOpacity={0.5} />
                    <stop offset="100%" stopColor="#0A0A0A" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="#E8E2D6" vertical={false} />
                <XAxis dataKey="d" tick={{ fill: "#6B6B6B", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "#6B6B6B", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `₹${v / 1000}k`} />
                <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #E8E2D6", fontSize: 12 }} formatter={(v: number) => [`₹${v.toLocaleString("en-IN")}`, "Revenue"]} />
                <Area type="monotone" dataKey="revenue" stroke="#0A0A0A" strokeWidth={2} fill="url(#rev)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-2xl border border-line bg-cream p-5">
          <h2 className="mb-4 font-display text-lg">Category mix</h2>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={categories} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={48} outerRadius={86} paddingAngle={2}>
                  {categories.map((c) => <Cell key={c.name} fill={c.color} />)}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #E8E2D6", fontSize: 12 }} formatter={(v: number) => [`${v}%`, ""]} />
                <Legend wrapperStyle={{ fontSize: 11 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <div className="rounded-2xl border border-line bg-cream p-5">
          <h2 className="mb-4 font-display text-lg">Bid velocity (24h)</h2>
          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={bidVelocity} margin={{ top: 8, right: 8, left: -10, bottom: 0 }}>
                <CartesianGrid stroke="#E8E2D6" vertical={false} />
                <XAxis dataKey="h" tick={{ fill: "#6B6B6B", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "#6B6B6B", fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #E8E2D6", fontSize: 12 }} />
                <Line type="monotone" dataKey="bids" stroke="#C9A24A" strokeWidth={2.5} dot={{ r: 3, fill: "#C9A24A" }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-2xl border border-line bg-cream p-5">
          <h2 className="mb-4 font-display text-lg">Orders by day</h2>
          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={sales} margin={{ top: 8, right: 8, left: -10, bottom: 0 }}>
                <CartesianGrid stroke="#E8E2D6" vertical={false} />
                <XAxis dataKey="d" tick={{ fill: "#6B6B6B", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "#6B6B6B", fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #E8E2D6", fontSize: 12 }} />
                <Bar dataKey="orders" fill="#2A9D8F" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-line bg-cream p-5">
        <h2 className="mb-4 font-display text-lg">Top listings</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-left text-[11px] uppercase tracking-[0.14em] text-ink/55">
              <tr><th className="pb-2">Listing</th><th className="pb-2 text-right">Views</th><th className="pb-2 text-right">Watchers</th><th className="pb-2 text-right">Sold</th></tr>
            </thead>
            <tbody className="divide-y divide-line-soft">
              {topListings.map((l) => (
                <tr key={l.name}>
                  <td className="py-2.5 font-medium">{l.name}</td>
                  <td className="py-2.5 text-right font-mono">{l.views.toLocaleString("en-IN")}</td>
                  <td className="py-2.5 text-right font-mono">{l.watch}</td>
                  <td className="py-2.5 text-right font-mono font-semibold">{l.sold}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
