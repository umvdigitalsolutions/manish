import Image from "next/image";
import Link from "next/link";
import Hero from "./components/Hero";
import { buildMetadata } from "./seo";

export const metadata = buildMetadata({
  title: "Cost Accountants in Noida",
  description:
    "MM & Co. provides cost audit, GST compliance, taxation, internal audit, accounting, and compliance advisory services from Noida with support across Delhi, Guwahati, and Sonipat.",
  path: "/",
  keywords: ["cost accountants in Noida", "GST consultant Noida", "tax consultant Noida"],
});

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

export default function Home() {
  return (
    <div className="bg-white text-[#102040]">
      <Hero />

      <section className="bg-white py-14 sm:py-16">
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

          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
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

      <section className="bg-[#102040] py-14 text-white sm:py-16">
        <div className="container grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
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

      <section className="bg-white py-14 sm:py-16">
        <div className="container grid items-center gap-8 lg:grid-cols-2">
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

      <section className="bg-[#244b7a] py-12 sm:py-14">
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
