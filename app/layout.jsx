import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { buildMetadata, organizationSchema, siteUrl } from "./seo";

export const metadata = {
  ...buildMetadata({ path: "/" }),
  metadataBase: new URL(siteUrl),
  icons: {
    icon: "/mmnc.png",
    shortcut: "/mmnc.png",
    apple: "/mmnc.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased bg-white text-[#102040]">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <div className="min-h-screen flex flex-col">
          <Header />

          <main className="flex-1">{children}</main>

          <Footer />
        </div>
      </body>
    </html>
  );
}
