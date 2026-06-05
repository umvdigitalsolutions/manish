import Image from "next/image";
import Link from "next/link";
import { buildMetadata } from "../seo";

export const metadata = buildMetadata({
  title: "Team",
  description:
    "Meet the MM & Co. leadership team for cost audit, GST, tax, internal audit, corporate compliance, and management reporting engagements.",
  path: "/team",
  keywords: ["MM & Co team", "cost accountant partners", "audit tax GST team"],
});

const partners = [
  {
    name: "Ms. Renu Sehgal",
    role: "Partner",
    credential: "Gold Medalist, AIR 16",
    focus: ["Cost records", "Audit discipline", "Compliance review"],
    summary:
      "Provides senior oversight on cost accounting, audit readiness, and compliance documentation with a strong emphasis on accuracy and review quality.",
  },
  {
    name: "Mr. Manish Malik",
    role: "Partner",
    credential: "Gold Medalist, AIR 1",
    focus: ["Strategic advisory", "Cost audit", "Management reporting"],
    summary:
      "Guides client engagements that require structured financial insight, cost visibility, and practical reporting for leadership decision-making.",
  },
  {
    name: "Mr. Nishant Garg",
    role: "Partner",
    credential: "Gold Medalist, AIR 33",
    focus: ["GST compliance", "Tax governance", "Process controls"],
    summary:
      "Supports clients on tax, GST, and process-led compliance matters where clear documentation and timely execution are essential.",
  },
  {
    name: "Mr. Mayank Jain",
    role: "Partner",
    credential: "Gold Medalist, AIR 41",
    focus: ["Internal audit", "Risk reviews", "Corporate compliance"],
    summary:
      "Works across audit, control reviews, and compliance assignments to help organizations strengthen governance and operating discipline.",
  },
];

const strengths = [
  {
    title: "Senior review on critical work",
    text: "Important filings, audit outputs, and advisory deliverables are reviewed with partner-level attention.",
  },
  {
    title: "Cross-functional delivery",
    text: "The team combines cost accounting, GST, taxation, audit, reporting, and corporate compliance capability.",
  },
  {
    title: "Clear client ownership",
    text: "Engagements are structured around defined responsibilities, documentation needs, timelines, and review cadence.",
  },
];

const operatingModel = [
  {
    step: "01",
    title: "Partner-led scoping",
    text: "We begin by understanding the client’s business context, regulatory priorities, and expected outputs.",
  },
  {
    step: "02",
    title: "Specialist execution",
    text: "Work is allocated across audit, tax, accounting, and compliance capability based on the assignment need.",
  },
  {
    step: "03",
    title: "Review and closure",
    text: "Final outputs are checked for clarity, evidence, compliance logic, and practical next steps.",
  },
];

export default function Team() {
  return (
    <div className="bg-white text-[#102040]">
      <section className="border-b border-slate-200 bg-[#102040] text-white">
        <div className="container grid gap-12 py-20 lg:grid-cols-[1fr_0.9fr] lg:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#fbf5e8]">
              Our team
            </p>
            <h1 className="mt-5 text-4xl font-bold leading-tight sm:text-5xl">
              Experienced leadership for audit, tax, cost, and compliance
              decisions.
            </h1>
            <p className="mt-6 max-w-3xl text-base leading-8 text-[#f2f6fb]">
              MM &amp; Co. is led by award-winning professionals and supported
              by a multidisciplinary team focused on reliable execution, clean
              documentation, and clear client communication.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-xl bg-[#d8bc80] px-5 py-3 text-sm font-bold text-[#102040] transition hover:bg-[#f7ecd5]"
              >
                Work With Our Team
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center justify-center rounded-xl border border-white/25 px-5 py-3 text-sm font-bold text-white transition hover:bg-white/10"
              >
                View Services
              </Link>
            </div>
          </div>

          <div className="relative min-h-80 overflow-hidden rounded-xl border border-white/10">
            <Image
              src="/team.jpg"
              alt="MM & Co. team discussion"
              fill
              priority
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-[#102040]/20" />
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white">
        <div className="container grid gap-4 py-7 sm:grid-cols-2 lg:grid-cols-4">
          <div className="border-l-2 border-[#d8bc80] pl-4">
            <div className="text-3xl font-bold text-[#102040]">4</div>
            <div className="mt-1 text-sm font-semibold text-slate-600">
              Partners
            </div>
          </div>
          <div className="border-l-2 border-[#d8bc80] pl-4">
            <div className="text-3xl font-bold text-[#102040]">4</div>
            <div className="mt-1 text-sm font-semibold text-slate-600">
              Gold medalist leaders
            </div>
          </div>
          <div className="border-l-2 border-[#d8bc80] pl-4">
            <div className="text-3xl font-bold text-[#102040]">9+</div>
            <div className="mt-1 text-sm font-semibold text-slate-600">
              Practice areas
            </div>
          </div>
          <div className="border-l-2 border-[#d8bc80] pl-4">
            <div className="text-3xl font-bold text-[#102040]">360</div>
            <div className="mt-1 text-sm font-semibold text-slate-600">
              Degree support
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-20">
        <div className="container">
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#244b7a]">
              Leadership
            </p>
            <h2 className="mt-4 text-3xl font-bold leading-tight text-[#102040] sm:text-4xl">
              Partner-led attention with specialist execution behind it.
            </h2>
            <p className="mt-5 leading-8 text-slate-700">
              Each partner brings senior judgment to assignments that require
              regulatory confidence, accurate records, and practical business
              interpretation.
            </p>
          </div>

          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            {partners.map((partner) => (
              <article
                key={partner.name}
                className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:border-[#d8bc80] hover:shadow-lg"
              >
                <div className="border-b border-slate-200 bg-white p-6">
                  <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
                    <div>
                      <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#244b7a]">
                        {partner.role}
                      </p>
                      <h3 className="mt-2 text-2xl font-bold text-[#102040]">
                        {partner.name}
                      </h3>
                    </div>
                    <div className="rounded-xl bg-[#fbf5e8] px-4 py-3 text-sm font-bold text-[#102040]">
                      {partner.credential}
                    </div>
                  </div>
                  <p className="mt-5 text-sm leading-7 text-slate-600">
                    {partner.summary}
                  </p>
                </div>

                <div className="p-6">
                  <div className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">
                    Representative focus
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {partner.focus.map((item) => (
                      <span
                        key={item}
                        className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-bold text-[#102040]"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="container grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#244b7a]">
              How the team supports clients
            </p>
            <h2 className="mt-4 text-3xl font-bold leading-tight text-[#102040] sm:text-4xl">
              A delivery model built around accountability.
            </h2>
            <p className="mt-5 leading-8 text-slate-700">
              We combine partner oversight with organized execution so clients
              know who owns the work, what information is required, and how each
              output will be reviewed.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {operatingModel.map((item) => (
              <article
                key={item.step}
                className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <div className="text-sm font-bold text-[#244b7a]">
                  {item.step}
                </div>
                <h3 className="mt-4 text-xl font-bold text-[#102040]">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  {item.text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#102040] py-20 text-white">
        <div className="container grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#fbf5e8]">
              What clients can expect
            </p>
            <h2 className="mt-4 text-3xl font-bold leading-tight sm:text-4xl">
              Clear communication, careful review, and dependable follow
              through.
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {strengths.map((item) => (
              <article
                key={item.title}
                className="rounded-xl border border-white/10 bg-white/[0.06] p-5"
              >
                <div className="h-1 w-12 bg-[#d8bc80]" />
                <h3 className="mt-5 font-bold text-white">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-[#f2f6fb]">
                  {item.text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#d8bc80] py-16">
        <div className="container flex flex-col justify-between gap-6 md:flex-row md:items-center">
          <div>
            <h2 className="text-3xl font-bold text-[#102040]">
              Need senior guidance on a finance or compliance matter?
            </h2>
            <p className="mt-3 max-w-2xl text-[#102040]">
              Share your current requirement and we will connect the right
              senior attention to the work.
            </p>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-xl bg-[#102040] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#244b7a]"
          >
            Contact the Team
          </Link>
        </div>
      </section>
    </div>
  );
}
