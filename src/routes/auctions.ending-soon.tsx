import { createFileRoute } from "@tanstack/react-router";
import { liveAuctions } from "@/lib/hype-data";
import { AuctionGrid } from "./auctions.index";

// Auctions with the smallest endsIn strings
const ending = [...liveAuctions].sort((a, b) => a.endsIn.localeCompare(b.endsIn)).slice(0, 4);

export const Route = createFileRoute("/auctions/ending-soon")({ component: () => <AuctionGrid items={ending} badge="Ending" /> });
