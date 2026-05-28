import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

export const metadata = {
  title: "MM & Co. — Cost Accountants & Compliance Advisors",
  description:
    "MM & Co. — Professional cost accountants offering cost audit, GST, taxation, compliance and consultancy since 2015.",
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
        <div className="min-h-screen flex flex-col">
          <Header />

          <main className="flex-1">{children}</main>

          <Footer />
        </div>
      </body>
    </html>
  );
}
