"use client";
import React from "react";

const ITEMS = [
  { id: 'manufacturing', title: 'Manufacturing', icon: '🏭', desc: 'Process-driven production and cost controls' },
  { id: 'infrastructure', title: 'Infrastructure', icon: '🛣️', desc: 'Highways, utilities and large-project accounting' },
  { id: 'logistics', title: 'Logistics', icon: '🚚', desc: 'Transport, warehousing and cost optimisation' },
  { id: 'hospitality', title: 'Hospitality', icon: '🏨', desc: 'Hotels, F&B and operational reporting' },
  { id: 'ngos', title: 'NGOs', icon: '🤝', desc: 'Grant accounting and compliance support' },
  { id: 'technology', title: 'Technology', icon: '💻', desc: 'SaaS, platforms and technology cost modelling' },
  { id: 'institutions', title: 'Institutions', icon: '🏫', desc: 'Educational and institutional finance' },
];

export default function Industries() {
  return (
    <div className="pt-auto rounded-2xl bg-slate-200  p-8 ">
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-[#102040]">Industries Served</h2>
        <p className="mt-2 text-sm text-slate-700">We provide tailored cost accounting and compliance solutions across industries.</p>
      </div>

      <div className="mt-6 grid gap-6 sm:grid-cols-2 md:grid-cols-4">
        {ITEMS.map((it) => (
          <div
            key={it.id}
            className="relative overflow-hidden rounded-2xl border p-5 bg-white"
          >
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-xl">{it.icon}</div>
              <div>
                <div className="font-semibold text-[#102040]">{it.title}</div>
                <div className="mt-2 text-sm text-slate-600">{it.desc}</div>
              </div>
            </div>

            <div className="absolute right-4 bottom-4">
              <span className="inline-flex items-center gap-2 rounded-full bg-indigo-100 px-3 py-1 text-xs font-medium text-indigo-700">Explore</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
