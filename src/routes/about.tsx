import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — HYPE" },
      { name: "description", content: "HYPE is India's first live auction marketplace for hype culture. Built for collectors, by collectors." },
      { property: "og:title", content: "About — HYPE" },
      { property: "og:description", content: "Built for collectors, by collectors." },
    ],
  }),
  component: () => (
    <SiteLayout>
      <section className="mx-auto max-w-[900px] px-8 py-24">
        <h1 className="font-display text-6xl uppercase tracking-tight">About HYPE.</h1>
        <p className="mt-6 text-lg text-ink/70">
          We're building India's first live auction marketplace for hype culture — sneakers, streetwear and collectibles, every drop authenticated, every transaction protected. The market decides the price.
        </p>
        <p className="mt-4 text-lg text-ink/70">
          Founded in Bengaluru by collectors, for collectors.
        </p>
      </section>
    </SiteLayout>
  ),
});
