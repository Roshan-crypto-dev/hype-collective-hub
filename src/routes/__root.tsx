import "@fontsource/archivo-black/400.css";
import "@fontsource-variable/inter/index.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { CartProvider } from "../lib/cart-store";
import { RoleProvider } from "../lib/role-store";
import { RoleSwitcher } from "../components/site/RoleSwitcher";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-sand-hero px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-8xl text-ink">404</h1>
        <h2 className="mt-4 text-xl font-semibold">Page not found</h2>
        <p className="mt-2 text-sm text-muted-fg">
          The drop you're looking for has already ended.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full bg-ink px-6 py-3 text-sm font-semibold tracking-[0.12em] text-cream"
          >
            BACK HOME
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-sand-hero px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight">This page didn't load</h1>
        <p className="mt-2 text-sm text-muted-fg">
          Something went wrong on our end. Try again or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="rounded-full bg-ink px-5 py-2 text-sm font-semibold text-cream"
          >
            Try again
          </button>
          <a
            href="/"
            className="rounded-full border border-ink/30 px-5 py-2 text-sm font-semibold"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "HYPE — India's First Live Auction Marketplace" },
      { name: "description", content: "Bid. Win. Repeat. HYPE is India's first live auction marketplace for sneakers, apparel and hype culture collectibles. Verified by HYPE." },
      { name: "author", content: "The Hype Company" },
      { property: "og:site_name", content: "HYPE" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "stylesheet", href: appCss }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "HYPE",
          url: "https://hype-collective-hub.lovable.app",
          description: "India's first live auction marketplace for sneakers, apparel and hype-culture collectibles.",
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "HYPE",
          url: "https://hype-collective-hub.lovable.app",
          potentialAction: {
            "@type": "SearchAction",
            target: "https://hype-collective-hub.lovable.app/shop?q={search_term_string}",
            "query-input": "required name=search_term_string",
          },
        }),
      },
    ],
  }),

  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <RoleProvider>
        <CartProvider>
          <Outlet />
          <RoleSwitcher />
        </CartProvider>
      </RoleProvider>
    </QueryClientProvider>
  );
}
