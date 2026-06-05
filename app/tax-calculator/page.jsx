import { buildMetadata } from "../seo";
import TaxCalculatorClient from "./TaxCalculatorClient";

export const metadata = buildMetadata({
  title: "Tax Calculator",
  description:
    "Use MM & Co. calculators for income tax, GST, TDS, HRA, advance tax, product pricing, break-even, EMI, and depreciation estimates.",
  path: "/tax-calculator",
  keywords: [
    "income tax calculator India",
    "GST calculator",
    "TDS calculator",
    "break-even calculator",
    "depreciation calculator",
  ],
});

export default function TaxCalculatorPage() {
  return <TaxCalculatorClient />;
}
