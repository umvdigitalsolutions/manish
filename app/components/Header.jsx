"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/team", label: "Team" },
  { href: "/locations", label: "Locations" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href) =>
    href === "/" ? pathname === "/" : pathname?.startsWith(href);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 antialiased shadow-sm shadow-[#102040]/[0.03] backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-24 items-center justify-between gap-6">
          <div className="flex items-center">
            <Link href="/" className="group flex items-center">
              <Image
                src="/mmnc.png"
                alt="MM & Co."
                width={80}
                height={80}
                priority
                className="h-20 w-20 rounded-xl object-contain"
              />
            </Link>
          </div>

          <div className="hidden items-center gap-5 lg:flex">
            <nav className="flex items-center gap-1 rounded-xl border border-slate-200 bg-white px-2 py-1 text-sm font-semibold text-slate-600 shadow-sm shadow-[#102040]/[0.02]">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rounded px-3 py-2 transition ${
                    isActive(item.href)
                      ? "bg-[#102040] text-white shadow-sm"
                      : "hover:bg-slate-50 hover:text-[#102040]"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-xl border border-[#244b7a] bg-[#102040] px-5 py-3 text-sm font-bold text-white shadow-lg shadow-slate-200 transition hover:-translate-y-0.5 hover:bg-white hover:text-[#102040]"
            >
              Get in Touch
            </Link>
          </div>

          <div className="lg:hidden">
            <button
              type="button"
              aria-expanded={open}
              aria-label="Toggle navigation"
              onClick={() => setOpen(!open)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-[#102040] shadow-sm transition hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-[#d8bc80]"
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

      <div className={`${open ? "block" : "hidden"} border-t border-slate-200 bg-white lg:hidden`}>
        <nav className="mx-auto max-w-7xl px-4 py-4 sm:px-6">
          <div className="grid gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`block rounded-xl px-3 py-3 text-base font-semibold transition ${
                  isActive(item.href)
                    ? "bg-[#102040] text-white"
                    : "text-slate-700 hover:bg-slate-50 hover:text-[#102040]"
                }`}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="mt-4">
            <Link
              href="/contact"
              className="block w-full rounded-xl bg-[#102040] px-4 py-3 text-center text-sm font-bold text-white"
              onClick={() => setOpen(false)}
            >
              Get in Touch
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
