import { Outlet } from "react-router";

export default function PostRoot() {
  return (
    <article className="p-10">
      <Outlet />
    </article>
  );
}
