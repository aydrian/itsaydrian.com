import { useEffect, useState } from "react";
import type { LinksFunction } from "react-router";

import { Link } from "react-router";

export const handle = { standalone: true };

export function meta() {
  return [
    { title: "Tiny Maintenance" },
    {
      content:
        "Track recurring maintenance tasks for your home, car, garden, and more — with reminders, no account required.",
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
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    if (activeIndex === null) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveIndex(null);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [activeIndex]);

  const screenshots = [
    {
      label: "Today's Tasks",
      scale: "scale-90",
      src: "/images/apps/tiny-maintenance/01-today.png"
    },
    {
      label: "Add Anything",
      scale: "scale-100",
      src: "/images/apps/tiny-maintenance/02-add-item.png"
    },
    {
      label: "Built-in Templates",
      scale: "scale-100",
      src: "/images/apps/tiny-maintenance/03-templates.png"
    },
    {
      label: "Mark It Done",
      scale: "scale-90",
      src: "/images/apps/tiny-maintenance/04-mark-done.png"
    }
  ];

  return (
    <div
      className="flex min-h-screen flex-col"
      style={{
        background: "#F0F4F8",
        color: "#1A2535",
        fontFamily: "'DM Sans', sans-serif"
      }}
    >
      {/* Pre-launch banner — remove once app is live */}
      <div
        className="w-full py-3 text-center text-sm font-medium"
        style={{
          background: "#3A5A8C",
          color: "#F0F4F8",
          fontFamily: "'DM Sans', sans-serif",
          letterSpacing: "0.01em"
        }}
      >
        🚀 Coming soon — currently in App Store Review
      </div>

      {/* Hero */}
      <main className="flex-1">
        <section className="mx-auto max-w-3xl px-8 pt-24 pb-20 text-center">
          {/* App icon */}
          <div
            className="mx-auto mb-10 overflow-hidden rounded-[24px]"
            style={{
              boxShadow:
                "0 12px 32px rgba(30,46,69,0.35), 0 2px 4px rgba(0,0,0,0.10)",
              height: "112px",
              width: "112px"
            }}
          >
            <img
              alt="Tiny Maintenance app icon"
              height="112"
              src="/images/apps/tiny-maintenance/icon.png"
              width="112"
            />
          </div>

          {/* App name */}
          <h1
            className="mb-4 leading-[1.05] tracking-tight"
            style={{
              color: "#1A2535",
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
              color: "#3A5A8C",
              fontFamily: "'Fraunces', serif",
              fontSize: "clamp(20px, 3vw, 28px)",
              fontStyle: "italic",
              fontWeight: 300
            }}
          >
            Remember everything that needs doing.
            <br />
            Never let upkeep slip through the cracks.
          </p>

          {/* Description */}
          <p
            className="mx-auto mb-14 max-w-md text-lg leading-relaxed"
            style={{ color: "#5A6A7E" }}
          >
            Track recurring tasks for your home, car, garden, and more.
            Set reminders, stay on schedule, and never wonder when something
            was last done.
          </p>

          {/* App Store CTA */}
          {/* TODO: Replace with real App Store URL before launch */}
          <a
            aria-label="Download Tiny Maintenance on the App Store"
            className="inline-flex items-center gap-3 rounded-2xl px-8 py-4 text-base font-medium tracking-tight transition-all duration-150 hover:scale-[1.02] active:scale-[0.98]"
            href="https://apps.apple.com"
            style={{
              background: "#1A2535",
              boxShadow: "0 4px 16px rgba(26,37,53,0.20)",
              color: "#F0F4F8",
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
        <section className="px-8 py-20" style={{ background: "#E2E9F2" }}>
          <div className="mx-auto max-w-3xl">
            <h2
              className="mb-3 text-center tracking-tight"
              style={{
                color: "#1A2535",
                fontFamily: "'Fraunces', serif",
                fontSize: "clamp(28px, 4vw, 40px)",
                fontWeight: 500
              }}
            >
              Simple. Organized. Yours.
            </h2>
            <p
              className="mb-14 text-center text-base"
              style={{ color: "#5A6A7E" }}
            >
              Everything you need, nothing you don&apos;t.
            </p>

            <div
              className="flex items-end justify-center gap-4 overflow-x-auto pb-4"
            >
              {screenshots.map(({ src, label, scale }, i) => (
                <div
                  aria-label={`View ${label} screenshot`}
                  className={`flex flex-shrink-0 flex-col items-center gap-3 ${scale} cursor-pointer`}
                  key={label}
                  role="button"
                  tabIndex={0}
                  onClick={() => setActiveIndex(i)}
                  onKeyDown={(e) => e.key === "Enter" && setActiveIndex(i)}
                >
                  <div
                    className="overflow-hidden rounded-[32px]"
                    style={{
                      border: "2px solid #1E2E45",
                      boxShadow:
                        "0 12px 32px rgba(26,37,53,0.18), 0 2px 6px rgba(0,0,0,0.08)",
                      width: "170px"
                    }}
                  >
                    <img
                      alt={label}
                      src={src}
                      style={{
                        aspectRatio: "1284 / 2778",
                        display: "block",
                        width: "100%"
                      }}
                    />
                  </div>
                  <span
                    className="text-center text-xs font-medium"
                    style={{ color: "#5A6A7E" }}
                  >
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Who it's for */}
        <section className="px-8 py-20">
          <div className="mx-auto max-w-3xl">
            <h2
              className="mb-3 text-center tracking-tight"
              style={{
                color: "#1A2535",
                fontFamily: "'Fraunces', serif",
                fontSize: "clamp(28px, 4vw, 40px)",
                fontWeight: 500
              }}
            >
              Built for real life upkeep
            </h2>
            <p className="mb-14 text-center text-base" style={{ color: "#5A6A7E" }}>
              Anything that needs doing on a schedule — Tiny Maintenance keeps track of it.
            </p>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {[
                { emoji: "🏠", label: "Home", detail: "Filters, HVAC, smoke alarms, gutters" },
                { emoji: "🚗", label: "Car", detail: "Oil changes, tire rotation, registration" },
                { emoji: "🪴", label: "Garden & Plants", detail: "Watering, fertilizing, seasonal prep" },
                { emoji: "🐾", label: "Pet Care", detail: "Vet visits, flea treatment, grooming" }
              ].map(({ emoji, label, detail }) => (
                <div
                  key={label}
                  className="flex flex-col items-center gap-2 rounded-2xl p-5 text-center"
                  style={{ background: "#E2E9F2" }}
                >
                  <span style={{ fontSize: "28px" }}>{emoji}</span>
                  <span
                    className="font-medium tracking-tight"
                    style={{ color: "#1A2535", fontSize: "15px" }}
                  >
                    {label}
                  </span>
                  <span style={{ color: "#5A6A7E", fontSize: "13px", lineHeight: 1.4 }}>
                    {detail}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="px-8 py-20" style={{ background: "#E2E9F2" }}>
          <div className="mx-auto max-w-3xl">
            <h2
              className="mb-14 text-center tracking-tight"
              style={{
                color: "#1A2535",
                fontFamily: "'Fraunces', serif",
                fontSize: "clamp(28px, 4vw, 40px)",
                fontWeight: 500
              }}
            >
              Simple by design
            </h2>
            <div className="grid gap-8 sm:grid-cols-3">
              {[
                {
                  step: "1",
                  heading: "Add what needs doing",
                  detail: "Create a maintenance item from a template or from scratch. Set how often it repeats."
                },
                {
                  step: "2",
                  heading: "Get reminded when it's due",
                  detail: "Tiny Maintenance tracks the schedule and reminds you when something is coming up."
                },
                {
                  step: "3",
                  heading: "Mark it done",
                  detail: "One tap and the task resets for next time. Your history is saved automatically."
                }
              ].map(({ step, heading, detail }) => (
                <div key={step} className="flex flex-col gap-3">
                  <div
                    className="flex h-9 w-9 items-center justify-center rounded-full text-sm font-medium"
                    style={{ background: "#3A5A8C", color: "#F0F4F8" }}
                  >
                    {step}
                  </div>
                  <h3
                    className="font-medium tracking-tight"
                    style={{ color: "#1A2535", fontSize: "17px" }}
                  >
                    {heading}
                  </h3>
                  <p style={{ color: "#5A6A7E", fontSize: "15px", lineHeight: 1.6 }}>
                    {detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Trust signals */}
        <section className="px-8 py-20">
          <div className="mx-auto max-w-3xl">
            <h2
              className="mb-3 text-center tracking-tight"
              style={{
                color: "#1A2535",
                fontFamily: "'Fraunces', serif",
                fontSize: "clamp(28px, 4vw, 40px)",
                fontWeight: 500
              }}
            >
              Your data stays with you
            </h2>
            <p className="mb-14 text-center text-base" style={{ color: "#5A6A7E" }}>
              Tiny Maintenance is built to stay out of the way.
            </p>
            <div className="grid gap-6 sm:grid-cols-3">
              {[
                {
                  heading: "No account required",
                  detail: "Start using the app immediately. Nothing to sign up for."
                },
                {
                  heading: "Works offline",
                  detail: "All your data lives on your device. No internet connection needed."
                },
                {
                  heading: "Private by default",
                  detail: "Your maintenance items are never uploaded or shared with anyone."
                }
              ].map(({ heading, detail }) => (
                <div
                  key={heading}
                  className="rounded-2xl p-6"
                  style={{ background: "#E2E9F2" }}
                >
                  <h3
                    className="mb-2 font-medium tracking-tight"
                    style={{ color: "#1A2535", fontSize: "16px" }}
                  >
                    {heading}
                  </h3>
                  <p style={{ color: "#5A6A7E", fontSize: "14px", lineHeight: 1.6 }}>
                    {detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Lightbox */}
      {activeIndex !== null && (
        <div
          aria-label="Screenshot preview"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center"
          role="dialog"
          style={{ background: "rgba(0,0,0,0.85)" }}
          onClick={() => setActiveIndex(null)}
        >
          <button
            aria-label="Close preview"
            className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full text-white transition-opacity hover:opacity-75"
            style={{ background: "rgba(255,255,255,0.15)" }}
            onClick={() => setActiveIndex(null)}
          >
            <svg
              fill="none"
              height="18"
              stroke="currentColor"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
              width="18"
            >
              <path d="M18 6 6 18M6 6l12 12" strokeLinecap="round" />
            </svg>
          </button>
          <img
            alt={screenshots[activeIndex].label}
            className="rounded-[24px]"
            src={screenshots[activeIndex].src}
            style={{
              boxShadow: "0 24px 64px rgba(0,0,0,0.5)",
              maxHeight: "90vh",
              maxWidth: "min(420px, 90vw)",
              width: "auto"
            }}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      {/* Footer */}
      <footer
        className="px-8 py-10 text-center"
        style={{ background: "#F0F4F8", borderTop: "1px solid #CDD7E4" }}
      >
        <div className="mb-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          <Link
            className="text-sm transition-colors duration-100 hover:text-[#3A5A8C]"
            style={{ color: "#5A6A7E", textDecoration: "none" }}
            to="/apps/tiny-maintenance/privacy"
          >
            Privacy Policy
          </Link>
          <span style={{ color: "#B0C0D4" }}>·</span>
          <Link
            className="text-sm transition-colors duration-100 hover:text-[#3A5A8C]"
            style={{ color: "#5A6A7E", textDecoration: "none" }}
            to="/apps/tiny-maintenance/terms"
          >
            Terms of Use
          </Link>
          <span style={{ color: "#B0C0D4" }}>·</span>
          <a
            className="text-sm transition-colors duration-100 hover:text-[#3A5A8C]"
            href="mailto:developer@itsaydrian.com"
            style={{ color: "#5A6A7E", textDecoration: "none" }}
          >
            Support
          </a>
        </div>
        <p className="text-xs" style={{ color: "#8A9BB0" }}>
          © {new Date().getFullYear()} ItsAydrian LLC. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
