import type { LinksFunction } from "react-router";

import { Links, Meta, Outlet, Scripts, ScrollRestoration } from "react-router";

import { ThemeProvider } from "~/contexts/theme-context";
import styles from "~/styles/tailwind.css?url";

export const links: LinksFunction = () => [
  { href: styles, rel: "stylesheet" },
  { href: "/fonts/noto-sans-jp/font.css", rel: "stylesheet" }
];

export default function App() {
  return (
    <ThemeProvider>
      <Outlet />
    </ThemeProvider>
  );
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
        <ThemeInitScript />
      </head>
      <body className="bg-background text-foreground">
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

function ThemeInitScript() {
  const script = `
    (function() {
      try {
        const stored = localStorage.getItem('theme-preference');
        const theme = stored === 'light' || stored === 'dark' ? stored : 'system';
        const resolved = theme === 'system' 
          ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
          : theme;
        
        if (resolved === 'dark') {
          document.documentElement.classList.add('dark');
        }
      } catch {}
    })();
  `;

  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
