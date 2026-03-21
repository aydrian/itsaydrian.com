import { PostHogProvider } from "@posthog/react";
import posthogClient from "posthog-js";
import { startTransition, StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";
import { HydratedRouter } from "react-router/dom";

posthogClient.init(import.meta.env.VITE_PUBLIC_POSTHOG_TOKEN, {
  __add_tracing_headers: [window.location.host, "localhost"],
  api_host: import.meta.env.VITE_PUBLIC_POSTHOG_HOST,
  defaults: "2026-01-30"
});

startTransition(() => {
  hydrateRoot(
    document,
    <PostHogProvider client={posthogClient}>
      <StrictMode>
        <HydratedRouter />
      </StrictMode>
    </PostHogProvider>
  );
});
