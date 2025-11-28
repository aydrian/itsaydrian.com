import type { LinksFunction } from "react-router";

import {
  Link,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration
} from "react-router";

import { Icon, type IconName } from "~/components/icon";
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
  const socialLinks: { href: string; name: IconName }[] = [
    { href: "https://instagram.com/itsaydrian", name: "Instagram" },
    { href: "https://youtube.com/@itsaydrian", name: "Youtube" },
    { href: "https://twitch.com/itsaydrian", name: "Twitch" },
    { href: "https://x.com/itsaydrian", name: "X" },
    { href: "https://github.com/aydrian", name: "Github" },
    { href: "https://linkedin.com/in/aydrian/", name: "Linkedin" }
  ];

  return (
    <html className="scroll-smooth" lang="en">
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

            <footer className="flex flex-col items-center gap-4 p-8 text-center">
              <div className="flex items-center justify-center gap-4">
                {socialLinks.map((social) => (
                  <a
                    className="text-foreground/80 transition-colors hover:text-foreground"
                    href={social.href}
                    key={social.href}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <Icon name={social.name} size="md" />
                    <span className="sr-only">{social.name}</span>
                  </a>
                ))}
              </div>
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
