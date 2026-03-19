import { Outlet } from "react-router";

export default function TinyMaintenanceLayout() {
  return (
    <>
      <link
        rel="icon"
        href="/images/apps/tiny-maintenance/favicon.png"
        type="image/png"
      />
      <meta
        content="https://itsaydrian.com/images/apps/tiny-maintenance/icon.png"
        property="og:image"
      />
      <meta content="1024" property="og:image:width" />
      <meta content="1024" property="og:image:height" />
      <meta content="image/png" property="og:image:type" />
      <meta content="ItsAydrian" property="og:site_name" />
      <meta content="summary" name="twitter:card" />
      <meta
        content="https://itsaydrian.com/images/apps/tiny-maintenance/icon.png"
        name="twitter:image"
      />
      <Outlet />
    </>
  );
}
