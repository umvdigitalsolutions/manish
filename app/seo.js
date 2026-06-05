export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.mmcocma.com";

export const siteName = "MM & Co.";

export const defaultDescription =
  "MM & Co. is a Noida-based cost accounting, GST, taxation, audit, and compliance advisory firm serving businesses since 2015.";

export function absoluteUrl(path = "/") {
  return new URL(path, siteUrl).toString();
}

export function buildMetadata({
  title,
  description = defaultDescription,
  path = "/",
  keywords = [],
  noIndex = false,
}) {
  const pageTitle = title ? `${title} | ${siteName}` : `${siteName} | Cost Accountants & Compliance Advisors`;
  const url = absoluteUrl(path);

  return {
    title: pageTitle,
    description,
    keywords: [
      "MM & Co.",
      "cost accountant Noida",
      "cost audit",
      "GST compliance",
      "tax advisory",
      "TDS compliance",
      "internal audit",
      ...keywords,
    ],
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: pageTitle,
      description,
      url,
      siteName,
      type: "website",
      locale: "en_IN",
      images: [
        {
          url: absoluteUrl("/mmnc.png"),
          width: 1200,
          height: 630,
          alt: "MM & Co. cost accountants and compliance advisors",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description,
      images: [absoluteUrl("/mmnc.png")],
    },
    robots: noIndex
      ? {
          index: false,
          follow: false,
        }
      : {
          index: true,
          follow: true,
        },
  };
}

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "AccountingService",
  "@id": `${siteUrl}/#organization`,
  name: "MM & Co.",
  url: siteUrl,
  logo: absoluteUrl("/mmnc.png"),
  image: absoluteUrl("/mmnc.png"),
  description: defaultDescription,
  foundingDate: "2015-04-01",
  email: "mmcocma@gmail.com",
  telephone: "+91-7290821910",
  address: {
    "@type": "PostalAddress",
    streetAddress: "B-33, 1st Floor, Sector 63",
    addressLocality: "Noida",
    postalCode: "201301",
    addressCountry: "IN",
  },
  areaServed: ["Noida", "Delhi", "Guwahati", "Sonipat", "India"],
  knowsAbout: [
    "Cost Audit",
    "Cost Records",
    "GST Compliance",
    "Taxation",
    "TDS Compliance",
    "Internal Audit",
    "MCA ROC Compliance",
    "Accounting",
  ],
  sameAs: [],
};
