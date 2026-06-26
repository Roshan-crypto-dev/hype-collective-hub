import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/live-auctions")({
  beforeLoad: () => {
    throw redirect({ to: "/auctions/live" });
  },
});
