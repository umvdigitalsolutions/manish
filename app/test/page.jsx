import { buildMetadata } from "../seo";

export const metadata = buildMetadata({
  title: "Test",
  description: "Internal test page.",
  path: "/test",
  noIndex: true,
});

export default function TestPage() {
  return (
    <div className="container py-20">
      <h1 className="text-2xl font-bold">Test Page</h1>
      <p className="mt-4">If you see this, routing is working.</p>
    </div>
  );
}
