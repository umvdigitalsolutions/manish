"use client";
import React, { useMemo, useState } from "react";

export default function Hero() {
  const [direct, setDirect] = useState(48000);
  const [overheads, setOverheads] = useState(35000);
  const [prev, setPrev] = useState(140000);
  const [target, setTarget] = useState(160000);

  const monthly = useMemo(() => (Number(direct) || 0) + (Number(overheads) || 0), [direct, overheads]);

  const deltaPct = useMemo(() => {
    const p = Number(prev) || 0;
    if (!p) return 0;
    return Math.round(((monthly - p) / p) * 100);
  }, [monthly, prev]);

  const utilization = useMemo(() => {
    const t = Number(target) || 1;
    return Math.min(100, Math.round((monthly / t) * 100));
  }, [monthly, target]);

  const fmt = (v) => new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(Number(v) || 0);

  return (
    <section className="container py-20">
      <div className="grid gap-12 md:grid-cols-2 md:items-center">
        <div>

          <p className="inline-flex items-center space-x-2 rounded-full bg-rose-50 px-3 py-1 text-sm font-medium text-rose-600">
            <span>Trusted</span>
            <span className="hidden sm:inline text-slate-500">— Finance, accounting & advisory</span>
          </p>

          <h1 className="mt-6 text-4xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-5xl">
            Driving Excellence. Delivering Growth.
          </h1>

          <p className="mt-6 max-w-xl text-lg text-slate-700">
            We deliver accounting, tax and advisory services that help businesses scale with confidence.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="/contact"
              className="inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-rose-600 to-pink-500 px-6 py-3 text-sm font-semibold text-white shadow-lg hover:scale-105 transition-transform"
            >
              Get Started
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>

            <a
              href="/about"
              className="rounded-full border border-slate-200 px-5 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              Learn About Us
            </a>
          </div>

          <div className="mt-8 flex flex-wrap gap-6 text-sm text-slate-600">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-slate-100 p-2">📈</div>
              <div>
                <div className="font-semibold text-slate-900">18%</div>
                <div>Avg. cost reduction</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="rounded-full bg-slate-100 p-2">⏱️</div>
              <div>
                <div className="font-semibold text-slate-900">3 days</div>
                <div>to first insights</div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="relative">
            <div className="rounded-2xl bg-white/80 p-6 shadow-lg backdrop-blur-md">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium text-slate-500">Monthly spend</div>
                  <div className="mt-2 text-2xl font-semibold text-slate-900">₹ {fmt(monthly)}</div>
                </div>
                <div className={`text-sm font-semibold ${deltaPct <= 0 ? "text-green-600" : "text-rose-600"}`}>
                  {deltaPct === 0 ? "—" : `${deltaPct > 0 ? "↑" : "↓"} ${Math.abs(deltaPct)}%`}
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="rounded-lg border p-3">
                  <div className="text-xs text-slate-500">Direct materials</div>
                  <input
                    type="number"
                    value={direct}
                    onChange={(e) => setDirect(e.target.value)}
                    className="mt-1 w-full bg-transparent text-base font-medium outline-none"
                  />
                </div>
                <div className="rounded-lg border p-3">
                  <div className="text-xs text-slate-500">Overheads</div>
                  <input
                    type="number"
                    value={overheads}
                    onChange={(e) => setOverheads(e.target.value)}
                    className="mt-1 w-full bg-transparent text-base font-medium outline-none"
                  />
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-4">
                <div>
                  <div className="text-xs text-slate-500">Prev month total (for comparison)</div>
                  <input
                    type="number"
                    value={prev}
                    onChange={(e) => setPrev(e.target.value)}
                    className="mt-1 w-full bg-transparent text-sm outline-none"
                  />
                </div>
                <div>
                  <div className="text-xs text-slate-500">Target (for utilization)</div>
                  <input
                    type="number"
                    value={target}
                    onChange={(e) => setTarget(e.target.value)}
                    className="mt-1 w-full bg-transparent text-sm outline-none"
                  />
                </div>
              </div>

              <div className="mt-6">
                <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
                  <div className="h-2 rounded-full bg-indigo-500" style={{ width: `${utilization}%` }} />
                </div>
                <div className="mt-2 flex items-center justify-between text-xs text-slate-500">
                  <div>Utilization vs target</div>
                  <div>{utilization}%</div>
                </div>
              </div>
            </div>

            <div className="absolute -right-8 -top-8 hidden transform-gpu rotate-6 lg:block">
              <div className="h-40 w-40 rounded-2xl bg-gradient-to-tr from-indigo-400 via-fuchsia-400 to-rose-400 opacity-30 blur-2xl" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
