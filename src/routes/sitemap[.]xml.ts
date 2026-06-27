import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { shopItems, liveAuctions } from "@/lib/hype-data";

const BASE_URL = "https://hype-collective-hub.lovable.app";

interface SitemapEntry {
  path: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: string;
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const entries: SitemapEntry[] = [
          { path: "/", changefreq: "daily", priority: "1.0" },
          { path: "/shop", changefreq: "daily", priority: "0.9" },
          { path: "/auctions", changefreq: "hourly", priority: "0.9" },
          { path: "/auctions/live", changefreq: "hourly", priority: "0.9" },
          { path: "/auctions/ending-soon", changefreq: "hourly", priority: "0.8" },
          { path: "/auctions/upcoming", changefreq: "daily", priority: "0.7" },
          { path: "/sell", changefreq: "weekly", priority: "0.8" },
          { path: "/about", changefreq: "monthly", priority: "0.5" },
          { path: "/contact", changefreq: "monthly", priority: "0.5" },
          { path: "/shipping", changefreq: "monthly", priority: "0.4" },
          { path: "/returns", changefreq: "monthly", priority: "0.4" },
          { path: "/privacy", changefreq: "yearly", priority: "0.3" },
          { path: "/terms", changefreq: "yearly", priority: "0.3" },
          ...liveAuctions.map((a) => ({
            path: `/live-auctions/${a.id}`,
            changefreq: "hourly" as const,
            priority: "0.8",
          })),
          ...shopItems.map((s) => ({
            path: `/live-auctions/${s.id}`,
            changefreq: "daily" as const,
            priority: "0.7",
          })),
        ];
        const urls = entries
          .map((e) =>
            [
              `  <url>`,
              `    <loc>${BASE_URL}${e.path}</loc>`,
              e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
              e.priority ? `    <priority>${e.priority}</priority>` : null,
              `  </url>`,
            ].filter(Boolean).join("\n"),
          ).join("\n");
        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          urls,
          `</urlset>`,
        ].join("\n");
        return new Response(xml, {
          headers: { "Content-Type": "application/xml", "Cache-Control": "public, max-age=3600" },
        });
      },
    },
  },
});
