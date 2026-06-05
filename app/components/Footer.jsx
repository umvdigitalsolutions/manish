import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t bg-[#102040] text-slate-300">
      <div className="container py-10 text-sm">
        <div className="grid gap-8 md:grid-cols-[1.2fr_0.8fr_0.8fr]">
          <div>
            <div className="text-lg font-bold text-white">MM &amp; Co.</div>
            <p className="mt-3 max-w-md leading-7">
              Cost accountants and compliance advisors for cost audit, GST,
              taxation, accounting, internal audit, and business reporting.
            </p>
            <address className="mt-4 not-italic leading-7">
              B-33, 1st Floor, Sector 63, Noida 201301
              <br />
              <a href="tel:+917290821910" className="hover:text-[#d8bc80]">
                +91 7290821910
              </a>
              <br />
              <a href="mailto:mmcocma@gmail.com" className="hover:text-[#d8bc80]">
                mmcocma@gmail.com
              </a>
            </address>
          </div>

          <div>
            <div className="font-bold text-white">Services</div>
            <div className="mt-4 grid gap-2">
              <Link href="/services#cost-audit" className="hover:text-[#d8bc80]">
                Cost Audit
              </Link>
              <Link href="/services#gst" className="hover:text-[#d8bc80]">
                GST Compliance
              </Link>
              <Link href="/services#tax" className="hover:text-[#d8bc80]">
                Taxation Services
              </Link>
              <Link href="/services#internal-audit" className="hover:text-[#d8bc80]">
                Internal Audit
              </Link>
            </div>
          </div>

          <div>
            <div className="font-bold text-white">Quick links</div>
            <div className="mt-4 grid gap-2">
              <Link href="/about" className="hover:text-[#d8bc80]">
                About
              </Link>
              <Link href="/tax-calculator" className="hover:text-[#d8bc80]">
                Tax Calculator
              </Link>
              <Link href="/client-forms" className="hover:text-[#d8bc80]">
                Client Forms
              </Link>
              <Link href="/contact" className="hover:text-[#d8bc80]">
                Contact
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3 border-t border-white/10 pt-6 md:flex-row md:items-center md:justify-between">
          <div>© {new Date().getFullYear()} MM &amp; Co. All rights reserved.</div>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-[#d8bc80]">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-[#d8bc80]">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
