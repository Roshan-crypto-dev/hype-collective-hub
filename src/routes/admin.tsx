import { createFileRoute } from "@tanstack/react-router";
import { AdminLayout } from "@/components/admin/AdminLayout";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Admin Console — HYPE" }, { name: "robots", content: "noindex" }] }),
  component: AdminLayout,
});
