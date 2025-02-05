import type { LinksFunction } from "react-router";
import { Links, Meta, Outlet, Scripts, ScrollRestoration } from "react-router";
import styles from "~/styles/tailwind.css?url";

import iconHref from "~/components/icons/sprite.svg";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: styles },
  { as: "image", href: iconHref, rel: "preload", type: "image/svg+xml" },
  { href: "/fonts/noto-sans-jp/font.css", rel: "stylesheet" }
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
        <link rel="stylesheet" href={styles} />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
