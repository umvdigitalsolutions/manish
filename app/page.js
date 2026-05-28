import Hero from "./components/Hero";
import HeroBlock from "./components/HeroBlock";
import SectionHeading from "./components/SectionHeading";
import Card from "./components/Card";
import Badge from "./components/Badge";
import Services from "./components/Services";
import Industries from "./components/Industries";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="relative flex flex-1 flex-col">
        {/* Decorative blobs */}
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <div className="blob blob-1 bg-gradient-to-tr from-indigo-500 via-fuchsia-400 to-rose-400 opacity-40 blur-3xl"></div>
          <div className="blob blob-2 bg-gradient-to-tr from-indigo-500 via-fuchsia-400 to-rose-400 opacity-20 blur-2xl animate-slow"></div>
        </div>

        <HeroBlock />

        <section className="container py-8">
          <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-slate-50 p-4">
            <div className="flex flex-wrap items-center gap-6">
              <div className="text-sm text-slate-700">Established 2015</div>
              <div className="text-sm text-slate-700">Multi-city Presence</div>
              <div className="text-sm text-slate-700">
                Audit &amp; Compliance Expertise
              </div>
              <div className="text-sm text-slate-700">Gold Medalist Leadership</div>
            </div>
            <div>
              <a href="/about" className="text-sm font-medium text-indigo-600">
                Learn More →
              </a>
            </div>
          </div>
        </section>

        <section className="container py-12" id="overview">
          <div className="max-w-5xl mx-auto rounded-2xl bg-slate-200 p-8 grid items-center gap-8 md:grid-cols-2">
            <div>
              <SectionHeading>
                A Firm Built on Expertise &amp; Integrity
              </SectionHeading>
              <p className="mt-4 text-justify text-slate-700">
                MM &amp; Co. is a one-point solution for finance and compliance
                challenges, combining process-driven methodologies with modern
                tools to deliver timely and auditable outcomes.
              </p>
              <p className="mt-3 text-justify text-slate-700">
                We collaborate with your leadership and external advisors to
                design pragmatic reporting and governance frameworks that align
                with regulatory requirements and business needs.
              </p>
            </div>

            <div className="flex items-center justify-center">
              <img
                src="/team.jpg"
                alt="Team at work"
                className="w-full max-w-md h-56 md:h-72 object-cover rounded-lg shadow-sm"
              />
            </div>
          </div>
        </section>

        <section className="container pt-auto py-8">
          <div className="max-w-4xl mx-auto rounded-2xl bg-slate-200 p-8 grid items-start gap-6 md:grid-cols-1">
            <div>
              <SectionHeading>Expertise Areas</SectionHeading>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {[
                  "Cost Audit & Cost Records",
                  "GST Advisory & Assurance",
                  "Statutory / Financial Audit Support",
                  "Tax & TDS Governance",
                  "Internal Controls & Risk Reviews",
                  "Corporate / MCA Compliance",
                ].map((e) => (
                  <div key={e} className="card p-4">
                    <div className="font-semibold text-[var(--navy)]">{e}</div>
                    <div className="mt-2 text-sm text-slate-700">
                      Boardroom-grade advisory and compliance support.
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>


        <section className="container py-12">
          <Industries />
        </section>

        <section id="services" className="container py-16">
          <Services />
        </section>

        <section className="py-8" id="why">
          <div className="w-fit mx-auto rounded-2xl bg-slate-200 p-6 text-center">
            <SectionHeading>Why Choose MM &amp; Co.?</SectionHeading>
            <ul className="mt-4 list-inside list-disc space-y-2 text-slate-700 text-left">
              <li>Precision-driven methodologies and reporting</li>
              <li>Uncompromising professional integrity</li>
              <li>Multi-industry experience and cross-sector learnings</li>
              <li>Gold-medalist leadership and senior experts</li>
              <li>One-point solution: audits, GST, tax, compliance</li>
              <li>Technology-enabled processes for faster insights</li>
            </ul>
          </div>
        </section>

        <section className="container py-16">
          <div className="rounded-2xl bg-slate-50 p-8 shadow-md">
            <h3 className="text-lg font-semibold text-slate-900">
              Client testimonial
            </h3>
            <blockquote className="mt-4 text-slate-700">
              “MM &amp; Co. helped us reduce cost leakage by 18% within 6 months
              while improving reporting cadence—practical, fast and
              client-friendly.”
            </blockquote>
            <div className="mt-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-700/90 font-semibold text-white">
                AK
              </div>
              <div>
                <div className="font-semibold">Asha Kapoor</div>
                <div className="text-sm text-slate-600">CFO, RetailCo</div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}