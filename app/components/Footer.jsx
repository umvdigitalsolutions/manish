export default function Footer() {
  return (
    <footer className="bg-[#102040] border-t">
      <div className="container mx-auto py-8 text-sm text-slate-300">
        <div className="flex flex-col md:flex-row md:justify-between gap-4 items-center">
          <div>© {new Date().getFullYear()} MM &amp; Co. All rights reserved.</div>
          <div className="space-x-4">
            <a href="/privacy" className="hover:underline">
              Privacy
            </a>
            <a href="/terms" className="hover:underline">
              Terms
            </a>
            <a href="/contact" className="hover:underline">
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
