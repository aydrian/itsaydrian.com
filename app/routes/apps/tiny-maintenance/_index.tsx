import type { LinksFunction } from "react-router";

import { Link } from "react-router";

export const handle = { standalone: true };

export function meta() {
  return [
    { title: "Tiny Maintenance" },
    {
      content:
        "Track, schedule, and manage all your home maintenance tasks in one simple app.",
      name: "description"
    }
  ];
}

export const links: LinksFunction = () => [
  { href: "https://fonts.googleapis.com", rel: "preconnect" },
  {
    crossOrigin: "anonymous" as const,
    href: "https://fonts.gstatic.com",
    rel: "preconnect"
  },
  {
    href: "https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,500;1,9..144,300&family=DM+Sans:opsz,wght@9..40,400;9..40,500&display=swap",
    rel: "stylesheet"
  }
];

export default function TinyMaintenanceLanding() {
  return (
    <div
      className="flex min-h-screen flex-col"
      style={{
        background: "#F5F1EB",
        color: "#1C1C18",
        fontFamily: "'DM Sans', sans-serif"
      }}
    >
      {/* Hero */}
      <main className="flex-1">
        <section className="mx-auto max-w-3xl px-8 pt-24 pb-20 text-center">
          {/* App icon */}
          <div
            className="mx-auto mb-10 flex items-center justify-center rounded-[28px] text-5xl"
            style={{
              background: "linear-gradient(135deg, #3D7A55 0%, #2A5C3F 100%)",
              boxShadow:
                "0 12px 32px rgba(45,96,63,0.30), 0 2px 4px rgba(0,0,0,0.08)",
              height: "112px",
              width: "112px"
            }}
          >
            🔧
          </div>

          {/* App name */}
          <h1
            className="mb-4 leading-[1.05] tracking-tight"
            style={{
              color: "#1C1C18",
              fontFamily: "'Fraunces', serif",
              fontSize: "clamp(52px, 10vw, 88px)",
              fontWeight: 500
            }}
          >
            Tiny Maintenance
          </h1>

          {/* Tagline */}
          <p
            className="mb-6"
            style={{
              color: "#356B47",
              fontFamily: "'Fraunces', serif",
              fontSize: "clamp(20px, 3vw, 28px)",
              fontStyle: "italic",
              fontWeight: 300
            }}
          >
            Your home, always taken care of.
          </p>

          {/* Description */}
          <p
            className="mx-auto mb-14 max-w-md text-lg leading-relaxed"
            style={{ color: "#6E6B65" }}
          >
            Track, schedule, and manage all your home maintenance tasks in one
            simple, beautiful app. Never miss a filter change or seasonal
            inspection again.
          </p>

          {/* App Store CTA */}
          <a
            aria-label="Download Tiny Maintenance on the App Store"
            className="inline-flex items-center gap-3 rounded-2xl px-8 py-4 text-base font-medium tracking-tight transition-all duration-150 hover:scale-[1.02] active:scale-[0.98]"
            href="#"
            style={{
              background: "#1C1C18",
              boxShadow: "0 4px 16px rgba(28,28,24,0.20)",
              color: "#F5F1EB",
              textDecoration: "none"
            }}
          >
            <svg
              aria-hidden="true"
              fill="currentColor"
              height="22"
              viewBox="0 0 24 24"
              width="22"
            >
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
            </svg>
            Download on the App Store
          </a>
        </section>

        {/* Screenshots */}
        <section className="px-8 py-20" style={{ background: "#EDE9E1" }}>
          <div className="mx-auto max-w-3xl">
            <h2
              className="mb-3 text-center tracking-tight"
              style={{
                color: "#1C1C18",
                fontFamily: "'Fraunces', serif",
                fontSize: "clamp(28px, 4vw, 40px)",
                fontWeight: 500
              }}
            >
              Simple. Organized. Yours.
            </h2>
            <p
              className="mb-14 text-center text-base"
              style={{ color: "#6E6B65" }}
            >
              Everything you need, nothing you don&apos;t.
            </p>

            <div className="flex flex-wrap items-end justify-center gap-6">
              {/* Center phone is slightly larger for emphasis */}
              {[
                { label: "Dashboard", scale: "scale-95" },
                { label: "Task Detail", scale: "scale-100" },
                { label: "Schedule", scale: "scale-95" }
              ].map(({ label, scale }) => (
                <div
                  className={`relative flex flex-col overflow-hidden rounded-[32px] ${scale}`}
                  key={label}
                  style={{
                    aspectRatio: "9 / 19.5",
                    background:
                      "linear-gradient(160deg, #D8D3CA 0%, #C8C2B8 100%)",
                    border: "1px solid #BDB7AE",
                    boxShadow:
                      "0 8px 24px rgba(0,0,0,0.10), 0 2px 4px rgba(0,0,0,0.06)",
                    width: "180px"
                  }}
                >
                  {/* Notch */}
                  <div
                    className="mx-auto mt-3 rounded-full"
                    style={{
                      background: "#A8A29A",
                      height: "6px",
                      width: "60px"
                    }}
                  />
                  <div
                    className="flex flex-1 flex-col items-center justify-center gap-2 p-4 text-center"
                    style={{ color: "#7A756E" }}
                  >
                    <span className="text-xs font-medium">{label}</span>
                    <span
                      className="text-[10px] leading-snug"
                      style={{ color: "#9A948C" }}
                    >
                      Replace with
                      <br />
                      real screenshot
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer
        className="px-8 py-10 text-center"
        style={{ background: "#F5F1EB", borderTop: "1px solid #E2DDD5" }}
      >
        <div className="mb-4 flex items-center justify-center gap-6">
          <Link
            className="text-sm transition-colors duration-100 hover:text-[#356B47]"
            style={{ color: "#6E6B65", textDecoration: "none" }}
            to="/apps/tiny-maintenance/privacy"
          >
            Privacy Policy
          </Link>
          <span style={{ color: "#C8C2B8" }}>·</span>
          <Link
            className="text-sm transition-colors duration-100 hover:text-[#356B47]"
            style={{ color: "#6E6B65", textDecoration: "none" }}
            to="/apps/tiny-maintenance/terms"
          >
            Terms of Use
          </Link>
        </div>
        <p className="text-xs" style={{ color: "#9A948C" }}>
          © {new Date().getFullYear()} ItsAydrian LLC. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
