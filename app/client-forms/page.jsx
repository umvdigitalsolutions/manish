import { buildMetadata } from "../seo";
import ClientFormsClient from "./ClientFormsClient";

export const metadata = buildMetadata({
  title: "Client Forms",
  description:
    "Fill and send Income Tax and GST information forms to MM & Co. for review, filing support, and compliance follow-up.",
  path: "/client-forms",
  keywords: ["income tax client form", "GST client form", "tax details form"],
});

export default function ClientFormsPage() {
  return <ClientFormsClient />;
}
