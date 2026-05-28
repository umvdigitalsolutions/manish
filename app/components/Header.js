"use client";

import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 bg-white border-b antialiased z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-slate-900">
              MM &amp; Co.
            </Link>
          </div>

          <div className="hidden md:flex md:items-center md:space-x-6">
            <nav className="flex space-x-4 text-sm">
              <Link href="/about" className="text-slate-700 hover:text-slate-900">
                About
              </Link>
              <Link href="/services" className="text-slate-700 hover:text-slate-900">
                Services
              </Link>
              <Link href="/case-studies" className="text-slate-700 hover:text-slate-900">
                Case Studies
              </Link>
              <Link href="/blogs" className="text-slate-700 hover:text-slate-900">
                Blogs
              </Link>
              <Link href="/team" className="text-slate-700 hover:text-slate-900">
                Team
              </Link>
              <Link href="/locations" className="text-slate-700 hover:text-slate-900">
                Locations
              </Link>
            </nav>

            <Link
              href="/contact"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-rose-600 hover:bg-rose-700"
            >
              Get in touch
            </Link>
          </div>

          <div className="md:hidden">
            <button
              type="button"
              aria-expanded={open}
              aria-label="Toggle navigation"
              onClick={() => setOpen(!open)}
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-700 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-500"
            >
              {open ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      <div className={`${open ? "block" : "hidden"} md:hidden border-t`}>
        <nav className="px-4 pt-2 pb-4 space-y-1">
          <Link
            href="/about"
            className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:bg-slate-50"
            onClick={() => setOpen(false)}
          >
            About
          </Link>
          <Link
            href="/services"
            className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:bg-slate-50"
            onClick={() => setOpen(false)}
          >
            Services
          </Link>
          <Link
            href="/case-studies"
            className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:bg-slate-50"
            onClick={() => setOpen(false)}
          >
            Case Studies
          </Link>
          <Link
            href="/blogs"
            className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:bg-slate-50"
            onClick={() => setOpen(false)}
          >
            Blogs
          </Link>
          <Link
            href="/team"
            className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:bg-slate-50"
            onClick={() => setOpen(false)}
          >
            Team
          </Link>
          <Link
            href="/locations"
            className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:bg-slate-50"
            onClick={() => setOpen(false)}
          >
            Locations
          </Link>

          <div className="mt-2 px-3">
            <Link
              href="/contact"
              className="block w-full text-center px-4 py-2 rounded-md text-sm font-medium text-white bg-sky-600 hover:bg-sky-700"
              onClick={() => setOpen(false)}
            >
              Get in touch
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
