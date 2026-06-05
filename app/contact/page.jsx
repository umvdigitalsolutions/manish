import { buildMetadata } from "../seo";
import ContactClient from "./ContactClient";

export const metadata = buildMetadata({
  title: "Contact",
  description:
    "Contact MM & Co. for cost audit, GST, taxation, TDS, accounting, internal audit, and compliance advisory support in Noida and across India.",
  path: "/contact",
  keywords: ["contact cost accountant Noida", "GST consultant contact", "tax advisory Noida"],
});

export default function ContactPage() {
  return <ContactClient />;
}
