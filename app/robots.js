import { absoluteUrl } from "./seo";

export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/test", "/api/"],
    },
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
