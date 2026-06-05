import Link from "next/link";
import ServicesExplorer from "../components/Services";
import { buildMetadata } from "../seo";

export const metadata = buildMetadata({
  title: "Services",
  description:
    "Explore MM & Co. services including cost audit, GST compliance, tax audit, TDS, internal audit, MCA ROC compliance, bookkeeping, and management consultancy.",
  path: "/services",
  keywords: ["cost audit services", "GST compliance services", "tax audit", "ROC compliance"],
});

const stats = [
  { value: "9+", label: "Service areas" },
  { value: "4", label: "Core locations" },
  { value: "2015", label: "Established practice" },
  { value: "360", label: "Degree compliance view" },
];

const detailedServices = [
  {
    id: "cost-audit",
    category: "Audit",
    title: "Cost Audit & Cost Records",
    description:
      "Cost audits, maintenance of cost records, cost statements, and compliance documentation for regulated business environments.",
    points: ["Cost audit support", "Cost record maintenance", "Cost statements"],
  },
  {
    id: "gst",
    category: "Tax",
    title: "GST Audit & GST Compliance",
    description:
      "GST registration, filings, reconciliations, audit assistance, and training support for internal finance teams.",
    points: ["GST filings", "GST audit support", "Workshops and training"],
  },
  {
    id: "statutory-audit",
    category: "Audit",
    title: "Financial & Statutory Audit",
    description:
      "Financial statement audit support, statutory audit coordination, and reporting assistance with clear working papers.",
    points: ["Statutory audits", "Financial statement audits", "Reporting"],
  },
  {
    id: "tax",
    category: "Tax",
    title: "Taxation Services",
    description:
      "Tax audit, TDS compliance, transfer pricing support, and documentation for better tax governance.",
    points: ["Tax audit", "TDS compliance", "Transfer pricing support"],
  },
  {
    id: "internal-audit",
    category: "Risk",
    title: "Internal Audit & Risk Management",
    description:
      "Internal control reviews, operational audits, and risk assessments that help leadership improve process discipline.",
    points: ["Internal controls", "Operational audits", "Risk assessments"],
  },
  {
    id: "roc",
    category: "Compliance",
    title: "MCA / ROC Compliances",
    description:
      "ROC filings, corporate compliance advisory, statutory registers, and governance support for companies.",
    points: ["ROC filings", "Company compliance advisory", "Governance support"],
  },
  {
    id: "bookkeeping",
    category: "Accounting",
    title: "Accounting & Bookkeeping",
    description:
      "Bookkeeping, reconciliations, MIS reporting, and month-end support to keep finance records dependable.",
    points: ["Bookkeeping", "MIS reporting", "Reconciliations"],
  },
  {
    id: "consultancy",
    category: "Advisory",
    title: "Management Consultancy",
    description:
      "Business process improvement, cost optimisation, and practical advisory for operational finance decisions.",
    points: ["Process improvement", "Cost optimisation", "Management advisory"],
  },
  {
    id: "trade",
    category: "Compliance",
    title: "Customs & Trade Compliance",
    description:
      "Customs advisory and trade compliance support for businesses managing documentation-heavy transactions.",
    points: ["Customs advisory", "Trade compliance support", "Documentation review"],
  },
];

const process = [
  {
    step: "01",
    title: "Diagnostic review",
    text: "We identify your business context, compliance calendar, record gaps, and decision priorities.",
    deliverables: ["Scope note", "Risk and records checklist", "Priority timeline"],
  },
  {
    step: "02",
    title: "Execution framework",
    text: "We structure records, owners, review rhythm, and documentation so work moves with less friction.",
    deliverables: ["Responsibility matrix", "Documentation plan", "Review cadence"],
  },
  {
    step: "03",
    title: "Reporting and closure",
    text: "We provide filings, reports, working papers, and practical next steps your team can act on.",
    deliverables: ["Working papers", "Management summary", "Action register"],
  },
];

export default function ServicesPage() {
  return (
    <div className="bg-white text-[#102040]">
      <section className="border-b border-slate-200 bg-[#102040] text-white">
        <div className="container py-20">
          <div className="max-w-4xl">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#fbf5e8]">
              Services
            </p>
            <h1 className="mt-5 text-4xl font-bold leading-tight sm:text-5xl">
              Finance, audit, tax, and compliance services built around
              accountable delivery.
            </h1>
            <p className="mt-6 max-w-3xl text-base leading-8 text-slate-300">
              MM &amp; Co. supports businesses with clean documentation, timely
              compliance, better reporting, and practical advisory across the
              finance function.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-xl bg-[#d8bc80] px-5 py-3 text-sm font-bold text-[#102040] transition hover:bg-[#f7ecd5]"
              >
                Discuss Requirements
              </Link>
              <a
                href="#service-explorer"
                className="inline-flex items-center justify-center rounded-xl border border-white/25 px-5 py-3 text-sm font-bold text-white transition hover:bg-white/10"
              >
                Explore Services
              </a>
            </div>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((item) => (
              <div
                key={item.label}
                className="border-l-2 border-[#d8bc80] bg-white/[0.04] p-5"
              >
                <div className="text-3xl font-bold">{item.value}</div>
                <div className="mt-1 text-sm font-semibold text-slate-300">
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="service-explorer" className="bg-slate-50 py-20">
        <div className="container">
          <ServicesExplorer />
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="container">
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#244b7a]">
              Service coverage
            </p>
            <h2 className="mt-4 text-3xl font-bold leading-tight sm:text-4xl">
              A complete support system for finance and compliance teams.
            </h2>
          </div>

          <div className="mt-10 grid gap-px overflow-hidden rounded-xl border border-slate-200 bg-slate-200 md:grid-cols-2 lg:grid-cols-3">
            {detailedServices.map((service) => (
              <article
                id={service.id}
                key={service.id}
                className="scroll-mt-28 bg-white p-6 transition hover:bg-slate-50"
              >
                <span className="rounded-xl bg-[#fbf5e8] px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-[#102040]">
                  {service.category}
                </span>
                <h3 className="mt-5 text-xl font-bold text-[#102040]">
                  {service.title}
                </h3>
                <p className="mt-4 text-sm leading-7 text-slate-600">
                  {service.description}
                </p>
                <ul className="mt-6 space-y-3">
                  {service.points.map((point) => (
                    <li
                      key={point}
                      className="flex gap-3 text-sm font-semibold text-[#102040]"
                    >
                      <span className="mt-2 h-2 w-2 rounded-full bg-[#d8bc80]" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-20">
        <div className="container">
          <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#244b7a]">
                How we work
              </p>
              <h2 className="mt-4 text-3xl font-bold leading-tight sm:text-4xl">
                A disciplined engagement model that keeps work moving.
              </h2>
            </div>
            <p className="max-w-3xl text-base leading-8 text-slate-700">
              Each engagement is managed with defined scope, ownership,
              evidence, and review rhythm, so your team gets clarity while the
              compliance work progresses.
            </p>
          </div>

          <div className="mt-10 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl shadow-slate-200/70">
            <div className="grid bg-[#102040] text-white lg:grid-cols-[0.85fr_1.15fr]">
              <div className="border-b border-white/10 p-8 lg:border-b-0 lg:border-r lg:p-10">
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#fbf5e8]">
                  Engagement discipline
                </p>
                <h3 className="mt-4 text-3xl font-bold leading-tight">
                  From first review to final working papers.
                </h3>
                <p className="mt-5 text-sm leading-7 text-slate-300">
                  Our process is designed to reduce ambiguity: what is needed,
                  who owns it, when it is reviewed, and how it is documented.
                </p>
              </div>

              <div className="grid divide-y divide-white/10">
                {process.map((item) => (
                  <article
                    key={item.step}
                    className="grid gap-5 p-6 sm:grid-cols-[4rem_1fr] lg:p-8"
                  >
                    <div className="text-3xl font-bold text-[#fbf5e8]">
                      {item.step}
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-white">
                        {item.title}
                      </h4>
                      <p className="mt-3 text-sm leading-7 text-slate-300">
                        {item.text}
                      </p>
                      <div className="mt-5 flex flex-wrap gap-2">
                        {item.deliverables.map((deliverable) => (
                          <span
                            key={deliverable}
                            className="rounded-xl border border-white/10 bg-white/[0.06] px-3 py-2 text-xs font-bold text-slate-100"
                          >
                            {deliverable}
                          </span>
                        ))}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#244b7a] py-16">
        <div className="container flex flex-col justify-between gap-6 md:flex-row md:items-center">
          <div>
            <h2 className="text-3xl font-bold text-white">
              Need help choosing the right service?
            </h2>
            <p className="mt-3 max-w-2xl text-[#fbf5e8]">
              Share your current finance or compliance priority and we will
              help map the practical next step.
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
