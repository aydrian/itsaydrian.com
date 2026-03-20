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

const sections: { heading: string; content: string | string[] }[] = [
  {
    content: [
      "Tiny Maintenance does not require an account. All maintenance data you enter — item names, notes, categories, schedules, due dates, and reminder preferences — is stored locally on your device and is not transmitted to any server.",
      "If you make or restore a purchase, Apple and RevenueCat may process purchase-related information. This can include an anonymous identifier (such as a randomly generated ID assigned to your app install or your Apple App Store account) used to verify and manage your purchase entitlements. This identifier is not linked to your name or any personal profile."
    ],
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
      "Tiny Maintenance uses RevenueCat to manage in-app purchases and restore access to Tiny Maintenance Pro. RevenueCat may receive and store an anonymous app user identifier, your purchase receipt, and entitlement status to verify your Pro access and support restore across eligible devices. RevenueCat does not receive your name, contact details, or any maintenance data from the app.",
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
        background: "#F0F4F8",
        color: "#1A2535",
        fontFamily: "'DM Sans', sans-serif"
      }}
    >
      {/* Top bar */}
      <header
        className="px-8 py-5"
        style={{ borderBottom: "1px solid #CDD7E4" }}
      >
        <div className="mx-auto flex max-w-2xl items-center justify-between">
          <span
            style={{
              color: "#1A2535",
              fontFamily: "'Fraunces', serif",
              fontSize: "18px",
              fontWeight: 500
            }}
          >
            Tiny Maintenance
          </span>
          <Link
            className="text-sm transition-colors duration-100 hover:text-[#3A5A8C]"
            style={{ color: "#5A6A7E", textDecoration: "none" }}
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
            color: "#1A2535",
            fontFamily: "'Fraunces', serif",
            fontSize: "clamp(32px, 5vw, 48px)",
            fontWeight: 500,
            lineHeight: 1.1
          }}
        >
          Privacy Policy
        </h1>
        <p
          className="mb-14 text-sm font-medium"
          style={{
            background: "#E2E9F2",
            borderRadius: "8px",
            color: "#3A5A8C",
            display: "inline-block",
            padding: "4px 12px"
          }}
        >
          Last Updated: March 17, 2026
        </p>

        <div className="space-y-12">
          {sections.map(({ content, heading }) => (
            <section key={heading}>
              <h2
                className="mb-3 text-lg font-medium tracking-tight"
                style={{ color: "#1A2535" }}
              >
                {heading}
              </h2>
              {Array.isArray(content) ? (
                content.map((para, i) => (
                  <p
                    key={i}
                    className="leading-relaxed"
                    style={{ color: "#5A6A7E", fontSize: "15px", marginTop: i > 0 ? "12px" : undefined }}
                  >
                    {para}
                  </p>
                ))
              ) : (
                <p
                  className="leading-relaxed"
                  style={{ color: "#5A6A7E", fontSize: "15px" }}
                >
                  {content}
                </p>
              )}
            </section>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer
        className="px-8 py-8 text-center"
        style={{ borderTop: "1px solid #CDD7E4" }}
      >
        <Link
          className="text-sm transition-colors duration-100 hover:text-[#3A5A8C]"
          style={{ color: "#5A6A7E", textDecoration: "none" }}
          to="/apps/tiny-maintenance"
        >
          ← Back to Tiny Maintenance
        </Link>
      </footer>
    </div>
  );
}
