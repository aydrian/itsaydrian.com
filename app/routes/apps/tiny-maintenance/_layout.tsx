import { Outlet } from "react-router";

export default function TinyMaintenanceLayout() {
  return (
    <>
      <link
        href="/images/apps/tiny-maintenance/favicon.png"
        rel="icon"
        type="image/png"
      />
      {/* Open Graph */}
      <meta content="Tiny Maintenance" property="og:title" />
      <meta
        content="Track recurring maintenance tasks for your home, car, garden, and more — with reminders, no account required."
        property="og:description"
      />
      <meta
        content="https://itsaydrian.com/images/apps/tiny-maintenance/og.png"
        property="og:image"
      />
      <meta content="1200" property="og:image:width" />
      <meta content="630" property="og:image:height" />
      <meta content="image/png" property="og:image:type" />
      <meta
        content="Tiny Maintenance — Remember everything that needs doing."
        property="og:image:alt"
      />
      <meta
        content="https://itsaydrian.com/apps/tiny-maintenance"
        property="og:url"
      />
      <meta content="website" property="og:type" />
      <meta content="ItsAydrian" property="og:site_name" />
      {/* Twitter / X */}
      <meta content="summary_large_image" name="twitter:card" />
      <meta content="Tiny Maintenance" name="twitter:title" />
      <meta
        content="Track recurring maintenance tasks for your home, car, garden, and more — with reminders, no account required."
        name="twitter:description"
      />
      <meta
        content="https://itsaydrian.com/images/apps/tiny-maintenance/og.png"
        name="twitter:image"
      />
      <meta
        content="Tiny Maintenance — Remember everything that needs doing."
        name="twitter:image:alt"
      />
      <meta content="@itsaydrian" name="twitter:creator" />
      <meta content="@itsaydrian" name="twitter:site" />
      <Outlet />
    </>
  );
}
