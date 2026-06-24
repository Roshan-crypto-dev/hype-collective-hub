import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/auctions/$id")({
  beforeLoad: ({ params }) => {
    throw redirect({ to: "/live-auctions/$id", params: { id: params.id } });
  },
});
