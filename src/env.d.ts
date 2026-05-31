interface Env {
  TRAVEL_INQUIRIES: KVNamespace;
  WEBHOOK_URL?: string;
  WEBHOOK_AUTH_TOKEN?: string;
}

type Runtime = import("@astrojs/cloudflare").Runtime<Env>;

declare namespace App {
  interface Locals extends Runtime {}
}
