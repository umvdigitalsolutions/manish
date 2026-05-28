import Image from "next/image";
import Link from "next/link";
import Hero from "./components/Hero";

const metrics = [
  { value: "2015", label: "Established practice" },
  { value: "9+", label: "Advisory service lines" },
  { value: "4", label: "Core operating locations" },
  { value: "360", label: "Degree compliance support" },
];

const services = [
  {
    title: "Cost Audit & Records",
    description:
      "Structured audit support, cost statements, and record maintenance for regulated and growth-focused businesses.",
  },
  {
    title: "GST & Tax Governance",
    description:
      "Filing, reconciliations, audit readiness, TDS, and practical advisory for fast-moving finance teams.",
  },
  {
    title: "Internal Controls",
    description:
      "Risk reviews, process checks, MIS discipline, and management reporting that leadership can act on.",
  },
  {
    title: "Corporate Compliance",
    description:
      "MCA, ROC, accounting, bookkeeping, and statutory support delivered with clean documentation.",
  },
];

const industries = [
  "Manufacturing",
  "Infrastructure",
  "Logistics",
  "Hospitality",
  "Technology",
  "NGOs",
  "Education",
  "Trading",
];

const reasons = [
  "Gold-medalist leadership with hands-on review",
  "Process-driven documentation and clear audit trails",
  "One-point support across audit, tax, accounting, and compliance",
];

export default function Home() {
  return (
    <div className="bg-white text-[#102040]">
      <Hero />

      <section className="border-b border-slate-200 bg-white">
        <div className="container grid gap-4 py-6 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((metric) => (
            <div key={metric.label} className="border-l-2 border-[#d8bc80] pl-4">
              <div className="text-3xl font-bold text-[#102040]">
                {metric.value}
              </div>
              <div className="mt-1 text-sm font-medium text-slate-600">
                {metric.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-slate-50 py-20">
        <div className="container grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#244b7a]">
              Built for accountable growth
            </p>
            <h2 className="mt-4 max-w-2xl text-3xl font-bold leading-tight text-[#102040] sm:text-4xl">
              Practical finance systems, clean compliance, and reporting your
              leadership can trust.
            </h2>
            <p className="mt-5 max-w-2xl leading-8 text-slate-700">
              We work with founders, CFOs, finance teams, and external advisors
              to turn regulatory requirements into repeatable operating rhythm.
              The result is sharper cost visibility, fewer compliance surprises,
              and decisions backed by dependable numbers.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
            {reasons.map((reason) => (
              <div
                key={reason}
                className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <div className="text-sm font-semibold leading-6 text-[#102040]">
                  {reason}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="container">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#244b7a]">
                What we handle
              </p>
              <h2 className="mt-4 text-3xl font-bold text-[#102040] sm:text-4xl">
                Advisory that meets the audit file and the boardroom.
              </h2>
            </div>
            <Link
              href="/services"
              className="text-sm font-bold text-[#244b7a] hover:text-[#102040]"
            >
              View all services &rarr;
            </Link>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {services.map((service) => (
              <article
                key={service.title}
                className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-[#d8bc80] hover:shadow-lg"
              >
                <div className="h-1 w-12 bg-[#d8bc80]" />
                <h3 className="mt-6 text-lg font-bold text-[#102040]">
                  {service.title}
                </h3>
                <p className="mt-4 text-sm leading-7 text-slate-600">
                  {service.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#102040] py-20 text-white">
        <div className="container grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#fbf5e8]">
              Industry fluency
            </p>
            <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
              From plant floors to board packs.
            </h2>
            <p className="mt-5 leading-8 text-slate-300">
              Our work spans cost-heavy operations, services, institutions, and
              mission-driven organizations where compliance and operational
              insight need to move together.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {industries.map((industry) => (
              <div
                key={industry}
                className="rounded-xl border border-white/10 bg-white/[0.06] px-4 py-5 text-sm font-semibold text-slate-100"
              >
                {industry}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="container grid items-center gap-10 lg:grid-cols-2">
          <div className="relative min-h-80 overflow-hidden rounded-xl">
            <Image
              src="/team.jpg"
              alt="MM & Co. team discussion"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>

          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#244b7a]">
              Senior attention
            </p>
            <h2 className="mt-4 text-3xl font-bold leading-tight text-[#102040] sm:text-4xl">
              A lean, responsive firm with the discipline of a larger practice.
            </h2>
            <p className="mt-5 leading-8 text-slate-700">
              MM &amp; Co. combines partner-level judgment, trained support
              teams, and associate networks across Noida, Delhi, Guwahati, and
              Sonipat. You get clear ownership, timely communication, and work
              papers that stand up to scrutiny.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/about"
                className="inline-flex items-center justify-center rounded-xl bg-[#102040] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#244b7a]"
              >
                Meet the Firm
              </Link>
              <Link
                href="/locations"
                className="inline-flex items-center justify-center rounded-xl border border-slate-300 px-5 py-3 text-sm font-bold text-[#102040] transition hover:bg-slate-50"
              >
                See Locations
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#244b7a] py-16">
        <div className="container flex flex-col justify-between gap-6 md:flex-row md:items-center">
          <div>
            <h2 className="text-3xl font-bold text-white">
              Ready to make compliance feel controlled?
            </h2>
            <p className="mt-3 max-w-2xl text-[#fbf5e8]">
              Share your finance, audit, or GST challenge and we will help map
              the next practical step.
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
