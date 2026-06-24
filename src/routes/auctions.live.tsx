import { createFileRoute } from "@tanstack/react-router";
import { liveAuctions } from "@/lib/hype-data";
import { AuctionGrid } from "./auctions.index";

export const Route = createFileRoute("/auctions/live")({ component: () => <AuctionGrid items={liveAuctions.filter((a) => a.live)} badge="Live" /> });
