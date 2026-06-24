import { createFileRoute } from "@tanstack/react-router";
import { liveAuctions } from "@/lib/hype-data";
import { AuctionGrid } from "./auctions.index";

// Mock: pretend the last two haven't started yet
const upcoming = liveAuctions.slice(-2).map((a) => ({ ...a, endsIn: "Starts " + a.endsIn, live: false }));

export const Route = createFileRoute("/auctions/upcoming")({ component: () => <AuctionGrid items={upcoming} badge="Upcoming" /> });
