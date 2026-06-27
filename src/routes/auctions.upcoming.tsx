import { createFileRoute } from "@tanstack/react-router";
import { liveAuctions } from "@/lib/hype-data";
import { AuctionGrid } from "./auctions.index";

// Mock: pretend the last two haven't started yet
const upcoming = liveAuctions.slice(-2).map((a) => ({ ...a, endsIn: "Starts " + a.endsIn, live: false }));

export const Route = createFileRoute("/auctions/upcoming")({
  head: () => ({
    meta: [
      { title: "Upcoming Auctions — HYPE Drops Calendar" },
      { name: "description", content: "Scheduled HYPE auctions. Set reminders so you don't miss the next verified drop." },
      { property: "og:title", content: "Upcoming Auctions — HYPE" },
      { property: "og:description", content: "Scheduled HYPE auctions and upcoming verified drops." },
      { property: "og:url", content: "https://hype-collective-hub.lovable.app/auctions/upcoming" },
    ],
    links: [{ rel: "canonical", href: "https://hype-collective-hub.lovable.app/auctions/upcoming" }],
  }),
  component: () => <AuctionGrid items={upcoming} badge="Upcoming" />,
});

