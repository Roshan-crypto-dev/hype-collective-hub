import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/sell-with-us")({
  beforeLoad: () => {
    throw redirect({ to: "/sell" });
  },
});
