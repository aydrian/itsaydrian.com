import type { LinksFunction } from "react-router";

import { Link } from "react-router";

export const handle = { standalone: true };

export function meta() {
  return [{ title: "Tiny Maintenance — Terms of Use" }];
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
      "By downloading, accessing, or using Tiny Maintenance, you agree to these Terms of Use. If you do not agree to these terms, please do not use the app.",
    heading: "Acceptance of Terms"
  },
  {
    content:
      "Tiny Maintenance is provided for your personal, non-commercial use to help manage recurring maintenance reminders and related information. You agree not to misuse the app, interfere with its operation, attempt to reverse engineer it (except where expressly permitted by law), bypass feature limitations, or use the app in violation of applicable laws or Apple's App Store guidelines. We reserve the right to limit or restrict access to the app in cases of misuse.",
    heading: "Use of the App"
  },
  {
    content:
      "Tiny Maintenance offers an optional one-time Pro unlock that provides access to premium features. All purchases are processed by Apple through your App Store account and are subject to Apple's purchase terms and policies. Apple is responsible for billing and handles all purchase-related refund requests under its policies. We use RevenueCat to help manage purchase status, entitlements, and restore purchases across your eligible devices. Premium access may be restored on eligible devices using the same App Store account.",
    heading: "Purchases and Premium Features"
  },
  {
    content:
      "The features available in Tiny Maintenance may change over time. We may add, modify, or remove features in future updates. Premium features included in the Pro unlock are those available at the time of your purchase. We will make reasonable efforts to maintain core functionality but do not guarantee that specific features will remain available indefinitely.",
    heading: "Feature Availability"
  },
  {
    content:
      "Tiny Maintenance, including its software, design, branding, text, graphics, and other content, is owned by ItsAydrian LLC or its licensors and is protected by applicable intellectual property laws. These terms do not grant you ownership of the app or any of its intellectual property rights.",
    heading: "Intellectual Property"
  },
  {
    content:
      'Tiny Maintenance is provided on an "as is" and "as available" basis without warranties of any kind, whether express or implied, to the fullest extent permitted by law. We do not guarantee that the app will be uninterrupted, error-free, or suitable for every purpose, or that reminders and notifications will always be delivered at a specific time because device settings, operating system behavior, and other factors may affect performance.',
    heading: "Disclaimer of Warranties"
  },
  {
    content:
      "To the fullest extent permitted by law, ItsAydrian LLC and its affiliates, licensors, and service providers will not be liable for any indirect, incidental, special, consequential, or punitive damages, or for any loss of data, missed reminders, lost profits, or other damages arising out of or related to your use of, or inability to use, Tiny Maintenance.",
    heading: "Limitation of Liability"
  },
  {
    content:
      "We may update these Terms of Use from time to time. If we make material changes, we may update the effective date and make the revised terms available within the app or through another appropriate method. Your continued use of Tiny Maintenance after updated terms become effective means you accept the revised terms.",
    heading: "Changes to Terms"
  },
  {
    content:
      "If you have any questions about these Terms of Use, please contact us at developer@itsaydrian.com.",
    heading: "Contact Us"
  }
];

export default function TermsOfUse() {
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
          Terms of Use
        </h1>
        <p className="mb-14 text-sm" style={{ color: "#8A9BB0" }}>
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
              <p
                className="leading-relaxed"
                style={{ color: "#5A6A7E", fontSize: "15px" }}
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
