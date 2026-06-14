interface Env {
  TRAVEL_INQUIRIES: KVNamespace;
  WEBHOOK_URL?: string;
  WEBHOOK_AUTH_TOKEN?: string;
}

declare const __PREVIEW_BUILD__: boolean;

type Runtime = import("@astrojs/cloudflare").Runtime<Env>;

declare namespace App {
  interface Locals extends Runtime {}
}
