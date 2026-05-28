"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

const SERVICES = [
  {
    id: "cost-audit",
    title: "Cost Auditing",
    cat: "Audit",
    desc: "Independent review of cost records, statements, and controls to strengthen regulatory confidence.",
    outcome: "Audit-ready cost records",
  },
  {
    id: "budgeting",
    title: "Budgeting & Forecasting",
    cat: "Planning",
    desc: "Practical forecasting models and budget controls aligned with operational realities.",
    outcome: "Sharper planning cadence",
  },
  {
    id: "reporting",
    title: "Management Reporting",
    cat: "Reporting",
    desc: "Clear MIS packs, reconciliations, and dashboards that help leadership act faster.",
    outcome: "Decision-ready insights",
  },
  {
    id: "tax",
    title: "Taxation Services",
    cat: "Tax",
    desc: "Tax audit, TDS, filings, reconciliations, and advisory support with clean documentation.",
    outcome: "Controlled tax compliance",
  },
  {
    id: "roc",
    title: "MCA / ROC Compliance",
    cat: "Compliance",
    desc: "Corporate filings, statutory registers, and governance support for growing companies.",
    outcome: "Timely corporate filings",
  },
  {
    id: "bookkeeping",
    title: "Accounting & Bookkeeping",
    cat: "Accounting",
    desc: "Accurate books, month-end close support, reconciliations, and finance hygiene.",
    outcome: "Reliable financial records",
  },
];

export default function Services() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(SERVICES.map((service) => service.cat)))],
    []
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    return SERVICES.filter((service) => {
      if (category !== "All" && service.cat !== category) return false;
      if (!q) return true;

      return [
        service.title,
        service.cat,
        service.desc,
        service.outcome,
      ]
        .join(" ")
        .toLowerCase()
        .includes(q);
    });
  }, [query, category]);

  return (
    <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl shadow-slate-200/70">
      <div className="grid gap-8 border-b border-slate-200 bg-[#102040] px-6 py-8 text-white md:grid-cols-[1fr_auto] md:items-end lg:px-8">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#fbf5e8]">
            Professional services
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            Finance, audit, and compliance support with senior oversight.
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
            Filter by your priority area, then explore the service line that
            best matches your current finance or compliance need.
          </p>
        </div>

        <Link
          href="/contact"
          className="inline-flex items-center justify-center rounded-xl bg-[#d8bc80] px-5 py-3 text-sm font-bold text-[#102040] transition hover:bg-[#f7ecd5]"
        >
          Discuss Requirements
        </Link>
      </div>

      <div className="bg-slate-50 px-6 py-5 lg:px-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <label className="relative block w-full lg:max-w-sm">
            <span className="sr-only">Search services</span>
            <input
              aria-label="Search services"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search audit, tax, reporting..."
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-medium text-[#102040] outline-none transition placeholder:text-slate-400 focus:border-[#244b7a] focus:ring-2 focus:ring-[#f7ecd5]"
            />
          </label>

          <div className="flex flex-wrap gap-2">
            {categories.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setCategory(item)}
                className={`rounded-xl border px-3 py-2 text-sm font-bold transition ${
                  category === item
                    ? "border-[#244b7a] bg-[#102040] text-white"
                    : "border-slate-300 bg-white text-slate-700 hover:border-[#244b7a] hover:text-[#102040]"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-px bg-slate-200 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((service) => (
          <article
            key={service.id}
            className="group flex min-h-72 flex-col bg-white p-6 transition hover:bg-slate-50 lg:p-7"
          >
            <div className="flex items-start justify-between gap-4">
              <span className="rounded-xl bg-[#fbf5e8] px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-[#102040]">
                {service.cat}
              </span>
              <span className="h-2 w-2 rounded-full bg-[#d8bc80]" />
            </div>

            <h3 className="mt-6 text-xl font-bold text-[#102040]">
              {service.title}
            </h3>
            <p className="mt-4 text-sm leading-7 text-slate-600">
              {service.desc}
            </p>

            <div className="mt-auto pt-8">
              <div className="border-t border-slate-200 pt-5">
                <div className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">
                  Typical outcome
                </div>
                <div className="mt-2 text-sm font-bold text-[#102040]">
                  {service.outcome}
                </div>
              </div>

              <Link
                href={`/services#${service.id}`}
                className="mt-5 inline-flex text-sm font-bold text-[#244b7a] transition group-hover:text-[#102040]"
              >
                View details &rarr;
              </Link>
            </div>
          </article>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="px-6 py-12 text-center lg:px-8">
          <h3 className="text-lg font-bold text-[#102040]">
            No services found
          </h3>
          <p className="mt-2 text-sm text-slate-600">
            Try a different search term or select another category.
          </p>
        </div>
      )}
    </section>
  );
}
