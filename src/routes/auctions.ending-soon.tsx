import { createFileRoute } from "@tanstack/react-router";
import { liveAuctions } from "@/lib/hype-data";
import { AuctionGrid } from "./auctions.index";

// Auctions with the smallest endsIn strings
const ending = [...liveAuctions].sort((a, b) => a.endsIn.localeCompare(b.endsIn)).slice(0, 4);

export const Route = createFileRoute("/auctions/ending-soon")({
  head: () => ({
    meta: [
      { title: "Ending Soon — HYPE Live Auctions" },
      { name: "description", content: "Auctions closing within the hour. Place your last bids on HYPE-verified drops before the timer hits zero." },
      { property: "og:title", content: "Ending Soon — HYPE Live Auctions" },
      { property: "og:description", content: "Auctions closing within the hour on HYPE." },
      { property: "og:url", content: "https://hype-collective-hub.lovable.app/auctions/ending-soon" },
    ],
    links: [{ rel: "canonical", href: "https://hype-collective-hub.lovable.app/auctions/ending-soon" }],
  }),
  component: () => <AuctionGrid items={ending} badge="Ending" />,
});

