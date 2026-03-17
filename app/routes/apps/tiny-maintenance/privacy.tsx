import type { LinksFunction } from "react-router";

import { Link } from "react-router";

export const handle = { standalone: true };

export function meta() {
  return [{ title: "Tiny Maintenance — Privacy Policy" }];
}

export const links: LinksFunction = () => [
  { href: "https://fonts.googleapis.com", rel: "preconnect" },
  {
    crossOrigin: "anonymous" as const,
    href: "https://fonts.gstatic.com",
    rel: "preconnect"
  },
  {
    href: "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500&family=DM+Sans:opsz,wght@9..40,400;9..40,500&display=swap",
    rel: "stylesheet"
  }
];

const sections = [
  {
    content:
      "Tiny Maintenance does not require an account for core use of the app. Information you enter into the app, such as maintenance item names, notes, categories, schedules, due dates, and reminder preferences, is stored locally on your device. If you make or restore a purchase, purchase-related information and app user identifiers needed to manage your premium access may be processed through Apple and RevenueCat.",
    heading: "Information We Collect"
  },
  {
    content:
      "We use the information you enter to provide the app’s core functionality, including displaying your maintenance items, organizing schedules, tracking completion history, and sending reminder notifications that you choose to enable. If you purchase Tiny Maintenance Pro, we use RevenueCat to help manage purchase status, restore purchases, and unlock premium features.",
    heading: "How We Use Your Information"
  },
  {
    content:
      "If you enable reminders, Tiny Maintenance may request permission to send notifications on your device. These notifications are used to remind you about maintenance items you create and manage in the app. You can change notification permissions at any time in your device settings.",
    heading: "Notifications"
  },
  {
    content:
      "Tiny Maintenance uses RevenueCat to manage in-app purchase entitlements and purchase restoration. RevenueCat is a third-party service provider that processes purchase-related data on our behalf. We do not use third-party advertising SDKs in the core version of the app. If we add analytics, crash reporting, or other third-party services in the future, this policy will be updated.",
    heading: "Third-Party Services"
  },
  {
    content:
      "Your maintenance data remains on your device until you edit or delete it, or until you remove the app. Purchase and entitlement records handled through Apple and RevenueCat may be retained as needed to support purchases, restorations, legal obligations, and account or transaction records maintained by those services.",
    heading: "Data Retention"
  },
  {
    content:
      "You can access, edit, or delete your maintenance items at any time within the app because that data is stored locally on your device. You can also disable notifications in the app or in your device settings. If you have questions about purchase-related data or want to make a privacy request, you can contact us using the details below.",
    heading: "Your Rights"
  },
  {
    content:
      "If you have any questions about this Privacy Policy or the app’s privacy practices, please contact us at developer@itsaydrian.com.",
    heading: "Contact Us"
  }
];

export default function PrivacyPolicy() {
  return (
    <div
      className="flex min-h-screen flex-col"
      style={{
        background: "#F5F1EB",
        color: "#1C1C18",
        fontFamily: "'DM Sans', sans-serif"
      }}
    >
      {/* Top bar */}
      <header
        className="px-8 py-5"
        style={{ borderBottom: "1px solid #E2DDD5" }}
      >
        <div className="mx-auto flex max-w-2xl items-center justify-between">
          <span
            style={{
              color: "#1C1C18",
              fontFamily: "'Fraunces', serif",
              fontSize: "18px",
              fontWeight: 500
            }}
          >
            Tiny Maintenance
          </span>
          <Link
            className="text-sm transition-colors duration-100 hover:text-[#356B47]"
            style={{ color: "#6E6B65", textDecoration: "none" }}
            to="/apps/tiny-maintenance"
          >
            ← Back to app
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="mx-auto w-full max-w-2xl flex-1 px-8 py-16">
        <h1
          className="mb-2 tracking-tight"
          style={{
            color: "#1C1C18",
            fontFamily: "'Fraunces', serif",
            fontSize: "clamp(32px, 5vw, 48px)",
            fontWeight: 500,
            lineHeight: 1.1
          }}
        >
          Privacy Policy
        </h1>
        <p className="mb-14 text-sm" style={{ color: "#9A948C" }}>
          Last Updated: March 17, 2026
        </p>

        <div className="space-y-12">
          {sections.map(({ content, heading }) => (
            <section key={heading}>
              <h2
                className="mb-3 text-lg font-medium tracking-tight"
                style={{ color: "#1C1C18" }}
              >
                {heading}
              </h2>
              <p
                className="leading-relaxed"
                style={{ color: "#6E6B65", fontSize: "15px" }}
              >
                {content}
              </p>
            </section>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer
        className="px-8 py-8 text-center"
        style={{ borderTop: "1px solid #E2DDD5" }}
      >
        <Link
          className="text-sm transition-colors duration-100 hover:text-[#356B47]"
          style={{ color: "#6E6B65", textDecoration: "none" }}
          to="/apps/tiny-maintenance"
        >
          ← Back to Tiny Maintenance
        </Link>
      </footer>
    </div>
  );
}
