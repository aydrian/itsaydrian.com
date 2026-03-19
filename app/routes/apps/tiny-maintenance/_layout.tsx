import { Outlet } from "react-router";

export default function TinyMaintenanceLayout() {
  return (
    <>
      <link
        rel="icon"
        href="/images/apps/tiny-maintenance/favicon.png"
        type="image/png"
      />
      <Outlet />
    </>
  );
}
