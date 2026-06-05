import Link from "next/link";

const assurances = [
  "Cost audit and records",
  "GST, tax and TDS compliance",
  "Internal controls and MIS",
];

const briefingItems = [
  { label: "First discussion", value: "Understand your business and compliance priorities" },
  { label: "Working plan", value: "Define records, filings, owners and review cadence" },
  { label: "Clear output", value: "Practical reports, audit trails and next-step actions" },
];

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-white text-[#102040]">
      <div className="absolute inset-x-0 top-0 h-px bg-slate-200" />
      <div className="absolute inset-y-0 right-0 hidden w-1/3 bg-slate-50 lg:block" />
      <div className="absolute left-0 top-0 h-full w-2 bg-[#d8bc80]" />

      <div className="container relative grid min-h-[calc(100svh-10rem)] items-center gap-10 py-12 lg:grid-cols-[1.05fr_0.95fr] lg:py-16">
        <div className="max-w-3xl">
          <p className="inline-flex rounded-xl border border-[#d8bc80] bg-[#fbf5e8] px-3 py-2 text-sm font-bold text-[#102040]">
            Senior-led finance, audit and compliance advisory
          </p>

          <h1 className="mt-6 text-4xl font-bold leading-tight text-[#102040] sm:text-5xl lg:text-6xl">
            Confident compliance starts with numbers you can trust.
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-8 text-slate-700 sm:text-lg">
            MM &amp; Co. helps business owners, CFOs and finance teams make cost
            records, GST, tax, audits and reporting feel organized, timely and
            board-ready.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-xl bg-[#102040] px-5 py-3 text-sm font-bold text-white shadow-lg shadow-slate-200 transition hover:bg-[#244b7a]"
            >
              Talk to an Advisor
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center justify-center rounded-xl border border-slate-300 px-5 py-3 text-sm font-bold text-[#102040] transition hover:bg-slate-50"
            >
              See How We Help
            </Link>
          </div>

          <div className="mt-8 grid gap-3 text-sm text-slate-700 sm:grid-cols-3">
            {assurances.map((item) => (
              <div key={item} className="flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-[#d8bc80]" />
                <span>{item}</span>
              </div>
            ))}
          </div>

          <div className="mt-10 grid max-w-2xl gap-4 border-t border-slate-200 pt-6 sm:grid-cols-3">
            <div>
              <div className="text-2xl font-bold text-[#102040]">2015</div>
              <div className="mt-1 text-sm text-slate-600">Established</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-[#102040]">4</div>
              <div className="mt-1 text-sm text-slate-600">Locations</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-[#102040]">9+</div>
              <div className="mt-1 text-sm text-slate-600">Service lines</div>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-[#244b7a] bg-[#102040] p-5 shadow-2xl shadow-slate-200 sm:p-6">
          <div className="flex items-start justify-between gap-6 border-b border-white/10 pb-5">
            <div>
              <p className="text-sm font-semibold text-[#fbf5e8]">
                Client-friendly approach
              </p>
              <h2 className="mt-2 text-2xl font-bold text-white">
                Clarity before complexity.
              </h2>
            </div>
            <div className="rounded-xl bg-white px-3 py-2 text-right text-[#102040]">
              <div className="text-2xl font-bold">2015</div>
              <div className="text-xs font-semibold text-slate-600">Established</div>
            </div>
          </div>

          <div className="mt-5 space-y-4">
            {briefingItems.map((item, index) => (
              <div key={item.label} className="grid gap-4 rounded-xl bg-white/[0.07] p-4 sm:grid-cols-[2.5rem_1fr]">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#d8bc80] text-sm font-bold text-[#102040]">
                  {index + 1}
                </div>
                <div>
                  <div className="font-bold text-white">{item.label}</div>
                  <p className="mt-1 text-sm leading-6 text-slate-200">
                    {item.value}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-5 rounded-xl border border-[#d8bc80]/20 bg-[#c09040]/10 p-4">
            <div className="text-sm font-bold text-white">What clients get</div>
            <p className="mt-2 text-sm leading-6 text-slate-300">
              A calm, practical view of what is due, what is risky, and what
              needs attention next.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
