import { createFileRoute } from "@tanstack/react-router";
import { liveAuctions } from "@/lib/hype-data";
import { AuctionGrid } from "./auctions.index";

export const Route = createFileRoute("/auctions/live")({
  head: () => ({
    meta: [
      { title: "Live Auctions — Bid Now on HYPE" },
      { name: "description", content: "Auctions accepting bids right now. Real-time bidding on HYPE-verified sneakers, apparel and collectibles." },
      { property: "og:title", content: "Live Auctions — Bid Now on HYPE" },
      { property: "og:description", content: "Real-time bidding on HYPE-verified sneakers and streetwear." },
      { property: "og:url", content: "https://hype-collective-hub.lovable.app/auctions/live" },
    ],
    links: [{ rel: "canonical", href: "https://hype-collective-hub.lovable.app/auctions/live" }],
  }),
  component: () => <AuctionGrid items={liveAuctions.filter((a) => a.live)} badge="Live" />,
});

