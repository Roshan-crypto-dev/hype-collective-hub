import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/shop/brand/$slug")({
  beforeLoad: ({ params }) => {
    throw redirect({ to: "/shop", search: { q: params.slug } as never });
  },
});
