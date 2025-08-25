import type { LinksFunction } from "react-router";

import { Links, Meta, Outlet, Scripts, ScrollRestoration } from "react-router";

import styles from "~/styles/tailwind.css?url";

export const links: LinksFunction = () => [
  { href: styles, rel: "stylesheet" },
  { href: "/fonts/noto-sans-jp/font.css", rel: "stylesheet" }
];

export default function App() {
  return <Outlet />;
}

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <Meta />
        <Links />
        <link href={styles} rel="stylesheet" />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
