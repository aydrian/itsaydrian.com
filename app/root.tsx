import type { LinksFunction } from "react-router";

import {
  Link,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration
} from "react-router";

import { ThemeSwitcher } from "~/components/theme-switcher";
import { ThemeProvider } from "~/contexts/theme-context";
import styles from "~/styles/tailwind.css?url";

export const links: LinksFunction = () => [
  { href: styles, rel: "stylesheet" },
  { href: "/fonts/noto-sans-jp/font.css", rel: "stylesheet" }
];

export default function App() {
  return <Outlet />;
}

export function Layout({ children }: { children: React.ReactNode }) {
  const currentYear = new Date().getFullYear();

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <Meta />
        <Links />
        <ThemeInitScript />
      </head>
      <body>
        <ThemeProvider>
          <div className="from-hydro via-angel-feather to-scoville-high dark:from-english-breakfast dark:via-crowberry-blue dark:to-hydro flex min-h-screen flex-col bg-linear-to-b">
            <header className="p-8">
              <nav className="flex items-center justify-between">
                <Link to="/">
                  <h1 className="text-foreground text-3xl font-bold text-shadow-sm dark:drop-shadow-sm">
                    ItsAydrian LLC
                  </h1>
                </Link>
                <ThemeSwitcher />
              </nav>
            </header>

            <main className="flex-1 px-8">{children}</main>

            <footer className="p-8 text-center">
              <p className="text-foreground/70 text-sm">
                © {currentYear} ItsAydrian LLC. All rights reserved.
              </p>
            </footer>
          </div>
        </ThemeProvider>
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
