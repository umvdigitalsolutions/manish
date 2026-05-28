"use client";
import React, { useMemo, useState } from "react";
import Link from "next/link";

const SERVICES = [
  { id: 'cost-audit', title: 'Cost Auditing', cat: 'Audit', desc: 'Thorough audits that bring clarity to your cost base.', icon: '🧾' },
  { id: 'budgeting', title: 'Budgeting & Forecasting', cat: 'Planning', desc: 'Practical, rolling forecasts aligned to your operations.', icon: '📊' },
  { id: 'reporting', title: 'Management Reporting', cat: 'Reporting', desc: 'Clear dashboards and reports for faster decisions.', icon: '📈' },
  { id: 'tax', title: 'Taxation Services', cat: 'Tax', desc: 'Tax audits, TDS, compliance and advisory support.', icon: '💼' },
  { id: 'roc', title: 'MCA / ROC Compliance', cat: 'Compliance', desc: 'ROC filings, corporate secretarial and compliance services.', icon: '✅' },
  { id: 'bookkeeping', title: 'Accounting & Bookkeeping', cat: 'Accounting', desc: 'Accurate bookkeeping, MIS and month-end packages.', icon: '🧾' },
];

export default function Services() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [expanded, setExpanded] = useState(null);

  const cats = useMemo(() => ["All", ...Array.from(new Set(SERVICES.map(s => s.cat)))], []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return SERVICES.filter(s => {
      if (category !== 'All' && s.cat !== category) return false;
      if (!q) return true;
      return (s.title + ' ' + s.desc + ' ' + s.tag).toLowerCase().includes(q);
    });
  }, [query, category]);

  return (
    <div className="pt-auto rounded-2xl bg-slate-200  p-8 text-white">
      <div className="mb-6">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-slate-900">Services</h2>
          <div className="text-sm text-slate-700 mt-1">Practical services for cost &amp; compliance</div>
        </div>

        <div className="mt-4 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <input
            aria-label="Search services"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search services, e.g. tax, audit..."
            className="rounded-md border border-white/10 bg-white/6 placeholder-slate-700 px-3 py-2 text-sm text-white outline-none w-full max-w-xs"
          />

          <div className="flex flex-wrap items-center gap-2 justify-center">
            {cats.map(c => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={`rounded-full px-3 py-1 text-sm transition ${category===c? 'bg-slate-800 text-white ring-1 ring-indigo-400' : 'bg-white/5 text-slate-700 border border-white/5'}`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map(s => (
          <article key={s.id} className="group relative rounded-2xl p-6 shadow-lg bg-white">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="rounded-full bg-gradient-to-br from-slate-700/90  p-3 text-xl text-white ">{s.icon}</div>
                <div>
                  <h3 className="font-semibold text-slate-900">{s.title}</h3>
                  <div className="mt-2 text-sm text-slate-700">{s.desc}</div>
                </div>
              </div>
              <div className="text-sm text-slate-700 font-medium">{s.tag}</div>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <div className="text-xs text-slate-700"> <span className="font-mono text-xs text-slate-700"></span></div>
              <Link href={`/services#${s.id}`} className="text-sm text-slate-700 underline">
                Details
              </Link>
            </div>

            {expanded === s.id && (
              <div className="mt-4 rounded-md bg-black/60 p-4 text-sm text-slate-100">
                <pre className="font-mono text-xs overflow-auto whitespace-pre-wrap">{
`{
  "service": "${s.title}",
  "scope": "Standard",
  "duration_weeks": 4,
  "price_estimate": "Contact for quote"
}`
                }</pre>

                <div className="mt-3 flex items-center gap-3">
                  <a href="/contact" className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-500 to-sky-400 px-4 py-2 text-sm font-semibold text-white shadow">Get a Quote</a>
                  <a href="/services" className="text-sm text-indigo-300 hover:text-indigo-400 underline">See full services</a>
                </div>
              </div>
            )}
          </article>
        ))}
      </div>
    </div>
  );
}
