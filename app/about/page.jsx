import Image from "next/image";
import Link from "next/link";

const highlights = [
  { value: "2015", label: "Established" },
  { value: "4", label: "Core locations" },
  { value: "9+", label: "Service areas" },
  { value: "360", label: "Degree compliance support" },
];

const principles = [
  {
    title: "Senior-led judgment",
    text: "Assignments are shaped by experienced professionals who understand regulatory expectations and business realities.",
    outcome: "You get advice that is reviewed, practical, and accountable.",
  },
  {
    title: "Clean documentation",
    text: "We focus on audit trails, reconciliations, filings, and working papers that can stand up to review.",
    outcome: "Your records stay easier to explain, verify, and defend.",
  },
  {
    title: "Practical communication",
    text: "Clients get clear priorities, next steps, and timelines without unnecessary complexity.",
    outcome: "Your team always knows what matters next.",
  },
];

const timeline = [
  {
    year: "2015",
    title: "Firm established",
    text: "MM & Co. began as a focused cost accounting and consultancy practice.",
  },
  {
    year: "2018",
    title: "Audit and GST expansion",
    text: "The practice strengthened its audit, GST, taxation, and compliance capabilities.",
  },
  {
    year: "2021",
    title: "Reporting discipline",
    text: "Modern tools, MIS processes, and management reporting became deeper parts of client delivery.",
  },
  {
    year: "2024",
    title: "Broader footprint",
    text: "Associate networks and multi-city presence were strengthened across key operating locations.",
  },
];

export default function About() {
  return (
    <div className="bg-white text-[#102040]">
      <section className="border-b border-slate-200 bg-[#102040] text-white">
        <div className="container grid gap-12 py-20 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#fbf5e8]">
              About MM &amp; Co.
            </p>
            <h1 className="mt-5 text-4xl font-bold leading-tight sm:text-5xl">
              A cost accounting and compliance firm built for clarity,
              discipline, and trust.
            </h1>
            <p className="mt-6 max-w-3xl text-base leading-8 text-slate-300">
              Established on 01.04.2015, MM &amp; Co. supports businesses with
              cost audit, GST, taxation, statutory audit, accounting,
              management reporting, and end-to-end compliance advisory.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-xl bg-[#d8bc80] px-5 py-3 text-sm font-bold text-[#102040] transition hover:bg-[#f7ecd5]"
              >
                Start a Conversation
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center justify-center rounded-xl border border-white/25 px-5 py-3 text-sm font-bold text-white transition hover:bg-white/10"
              >
                View Services
              </Link>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-xl border border-white/10 bg-white p-8 shadow-2xl shadow-[#102040]/20">
            <div className="absolute inset-x-0 top-0 h-1 bg-[#c09040]" />
            <div className="absolute inset-x-8 bottom-0 h-24 rounded-t-xl bg-[#fbf5e8]" />
            <div className="absolute right-0 top-0 h-full w-20 bg-[#f7ecd5]" />

            <div className="relative mx-auto flex min-h-72 max-w-md flex-col items-center justify-center text-center">
              <div className="flex h-44 w-44 items-center justify-center rounded-xl border border-[#f7ecd5] bg-white p-4 shadow-xl shadow-slate-200/80 sm:h-56 sm:w-56">
                <Image
                  src="/mmnc.png"
                  alt="MM & Co. logo"
                  width={220}
                  height={220}
                  priority
                  className="h-full w-full object-contain"
                />
              </div>

              <div className="mt-7">
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#c09040]">
                  Cost Accountants
                </p>
                <h2 className="mt-3 text-3xl font-bold text-[#102040]">
                  MM &amp; Co.
                </h2>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  A steady partner for cost audit, compliance, taxation, and
                  management reporting.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white">
        <div className="container grid gap-4 py-7 sm:grid-cols-2 lg:grid-cols-4">
          {highlights.map((item) => (
            <div key={item.label} className="border-l-2 border-[#d8bc80] pl-4">
              <div className="text-3xl font-bold text-[#102040]">
                {item.value}
              </div>
              <div className="mt-1 text-sm font-semibold text-slate-600">
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-slate-50 py-20">
        <div className="container">
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#244b7a]">
                Firm philosophy
              </p>
              <h2 className="mt-4 max-w-2xl text-3xl font-bold leading-tight sm:text-4xl">
                We make finance and compliance easier to govern.
              </h2>
            </div>
            <p className="max-w-3xl text-base leading-8 text-slate-700">
              Our role is to bring order to the moving parts: records, filings,
              controls, reports, and regulatory expectations. We keep the work
              disciplined, explainable, and useful for decision makers.
            </p>
          </div>

          <div className="mt-10 grid overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl shadow-slate-200/70 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="bg-[#102040] p-8 text-white lg:p-10">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#fbf5e8]">
                Operating standard
              </p>
              <h3 className="mt-4 text-3xl font-bold leading-tight">
                Clear work. Clean files. Calm decisions.
              </h3>
              <p className="mt-5 text-sm leading-7 text-slate-300">
                Every engagement is designed around a simple standard: the
                client should know what is happening, why it matters, and what
                evidence supports the conclusion.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
                <div className="border-l-2 border-[#d8bc80] pl-4">
                  <div className="text-2xl font-bold">01</div>
                  <div className="mt-1 text-sm text-slate-300">
                    Understand the business context
                  </div>
                </div>
                <div className="border-l-2 border-[#d8bc80] pl-4">
                  <div className="text-2xl font-bold">02</div>
                  <div className="mt-1 text-sm text-slate-300">
                    Build the right compliance rhythm
                  </div>
                </div>
                <div className="border-l-2 border-[#d8bc80] pl-4">
                  <div className="text-2xl font-bold">03</div>
                  <div className="mt-1 text-sm text-slate-300">
                    Deliver usable, review-ready outputs
                  </div>
                </div>
              </div>
            </div>

            <div className="grid divide-y divide-slate-200">
              {principles.map((item, index) => (
                <article
                  key={item.title}
                  className="grid gap-5 p-6 transition hover:bg-slate-50 sm:grid-cols-[3.5rem_1fr] lg:p-8"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#f7ecd5] text-sm font-bold text-[#102040]">
                    {String(index + 1).padStart(2, "0")}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#102040]">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-slate-600">
                      {item.text}
                    </p>
                    <p className="mt-4 border-l-2 border-[#d8bc80] pl-4 text-sm font-bold leading-6 text-[#102040]">
                      {item.outcome}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="container grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#244b7a]">
              Our journey
            </p>
            <h2 className="mt-4 text-3xl font-bold leading-tight sm:text-4xl">
              Built steadily around client trust and stronger delivery systems.
            </h2>
            <p className="mt-5 leading-8 text-slate-700">
              Over the years, MM &amp; Co. has grown its team, expanded its
              collaborations, adopted modern tools, and developed a practical
              one-point approach for finance and compliance challenges.
            </p>
          </div>

          <ol className="space-y-4">
            {timeline.map((item) => (
              <li
                key={item.year}
                className="grid gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:grid-cols-[5rem_1fr]"
              >
                <div className="text-xl font-bold text-[#102040]">
                  {item.year}
                </div>
                <div>
                  <h3 className="font-bold text-[#102040]">{item.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-slate-600">
                    {item.text}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-[#244b7a] py-16">
        <div className="container flex flex-col justify-between gap-6 md:flex-row md:items-center">
          <div>
            <h2 className="text-3xl font-bold text-white">
              Need a dependable finance and compliance partner?
            </h2>
            <p className="mt-3 max-w-2xl text-[#fbf5e8]">
              Tell us what you are trying to solve, and we will help define the
              right next step.
            </p>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-xl bg-[#d8bc80] px-6 py-3 text-sm font-bold text-[#102040] transition hover:bg-[#f7ecd5]"
          >
            Contact MM &amp; Co.
          </Link>
        </div>
      </section>
    </div>
  );
}
