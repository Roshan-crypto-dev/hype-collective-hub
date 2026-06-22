import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Mail, MessageSquare, Instagram } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — HYPE" },
      { name: "description", content: "Get in touch with HYPE. Support, partnerships and press inquiries." },
      { property: "og:title", content: "Contact — HYPE" },
      { property: "og:description", content: "Support, partnerships and press." },
    ],
  }),
  component: () => (
    <SiteLayout>
      <section className="mx-auto max-w-[900px] px-8 py-24">
        <h1 className="font-display text-6xl uppercase tracking-tight">Contact.</h1>
        <p className="mt-4 text-ink/70">We reply within 24 hours.</p>
        <div className="mt-10 grid gap-5 sm:grid-cols-3">
          {[
            { i: <Mail size={20} />, t: "Email", v: "support@thehypecompany.in" },
            { i: <MessageSquare size={20} />, t: "Live chat", v: "Mon–Sat, 10am–7pm IST" },
            { i: <Instagram size={20} />, t: "Social", v: "@hypeindiahq" },
          ].map((c) => (
            <div key={c.t} className="rounded-2xl bg-cream p-6">
              <div className="grid h-10 w-10 place-items-center rounded-full bg-ink text-cream">{c.i}</div>
              <div className="mt-4 text-[11px] font-bold uppercase tracking-[0.16em] text-ink/55">{c.t}</div>
              <div className="mt-1 font-semibold">{c.v}</div>
            </div>
          ))}
        </div>
      </section>
    </SiteLayout>
  ),
});
