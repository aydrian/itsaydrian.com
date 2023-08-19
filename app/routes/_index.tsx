import type { V2_MetaFunction } from "@remix-run/node";

export const meta: V2_MetaFunction = () => {
  return [
    { title: "ItsAydrian.com" },
    { content: "Welcome to ItsAydrian.com!", name: "description" }
  ];
};

export default function Index() {
  return (
    <div>
      <h1>Welcome to ItsAydrian.com</h1>
    </div>
  );
}
