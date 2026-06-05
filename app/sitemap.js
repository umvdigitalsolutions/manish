import { absoluteUrl } from "./seo";

const routes = [
  "",
  "/about",
  "/services",
  "/team",
  "/locations",
  "/tax-calculator",
  "/client-forms",
  "/contact",
];

export default function sitemap() {
  const now = new Date();

  return routes.map((route) => ({
    url: absoluteUrl(route || "/"),
    lastModified: now,
    changeFrequency: route ? "monthly" : "weekly",
    priority: route ? 0.8 : 1,
  }));
}
