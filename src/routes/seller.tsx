import { createFileRoute, redirect } from "@tanstack/react-router";

// Seller dashboard alias → existing /dashboard route.
export const Route = createFileRoute("/seller")({
  beforeLoad: () => { throw redirect({ to: "/dashboard" }); },
});
