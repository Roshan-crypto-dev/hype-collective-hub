import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/me/watchlist")({
  beforeLoad: () => { throw redirect({ to: "/wishlist" }); },
});
