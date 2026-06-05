import Link from "next/link";
import { buildMetadata } from "../seo";

export const metadata = buildMetadata({
  title: "Locations",
  description:
    "Find MM & Co. office locations and contact details for Noida, Delhi, Guwahati, and Sonipat tax, GST, audit, and compliance support.",
  path: "/locations",
  keywords: ["cost accountant Noida address", "GST consultant Noida office", "MM & Co locations"],
});

const offices = [
  {
    type: "Head Office",
    city: "Noida",
    address: "B-33, 1st Floor, Sector 63, Noida 201301",
    phone: "+91 7290821910",
    email: "mmcocma@gmail.com",
    note: "Primary coordination office for appointments, document drop-off, and engagement planning.",
  },
  {
    type: "Branch Office",
    city: "Delhi",
    address: "Anand Vihar, Delhi",
    note: "Client coordination support for Delhi-based audit, GST, and compliance matters.",
  },
  {
    type: "Branch Office",
    city: "Guwahati",
    address: "Silpukhuri, Guwahati",
    note: "Regional support for assignments and documentation coordination in the North East.",
  },
  {
    type: "Branch Office",
    city: "Sonipat",
    address: "Kundli, Sonipat",
    note: "Support office for nearby industrial and business clients.",
  },
];

const associates = [
  { name: "Kishore & Kishore", location: "Delhi" },
  { name: "Bram & Co.", location: "Noida" },
  { name: "Ankesh Kumar & Co.", location: "Delhi" },
];

const visitNotes = [
  "Please schedule an appointment before visiting so the right professional can be available.",
  "For document drop-off, contact the head office first to confirm timing and requirements.",
  "Urgent filing, audit, or compliance matters can be initiated by phone or email before an in-person meeting.",
];

export default function Locations() {
  return (
    <div className="bg-white text-[#102040]">
      <section className="border-b border-slate-200 bg-[#102040] text-white">
        <div className="container grid gap-10 py-20 lg:grid-cols-[1fr_0.82fr] lg:items-end">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#fbf5e8]">
              Locations
            </p>
            <h1 className="mt-5 text-4xl font-bold leading-tight sm:text-5xl">
              Local access with a coordinated professional network.
            </h1>
            <p className="mt-6 max-w-3xl text-base leading-8 text-[#f2f6fb]">
              MM &amp; Co. serves clients through its Noida head office,
              branch presence, and associate offices, keeping communication and
              document flow organized across engagements.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-xl bg-[#d8bc80] px-5 py-3 text-sm font-bold text-[#102040] transition hover:bg-[#f7ecd5]"
              >
                Schedule a Visit
              </Link>
              <a
                href="mailto:mmcocma@gmail.com"
                className="inline-flex items-center justify-center rounded-xl border border-white/25 px-5 py-3 text-sm font-bold text-white transition hover:bg-white/10"
              >
                Email Head Office
              </a>
            </div>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/[0.08] p-6">
            <div className="text-sm font-bold uppercase tracking-[0.16em] text-[#fbf5e8]">
              Head office
            </div>
            <p className="mt-4 text-2xl font-bold text-white">Noida</p>
            <p className="mt-3 text-sm leading-7 text-[#f2f6fb]">
              B-33, 1st Floor, Sector 63, Noida 201301
            </p>
            <div className="mt-6 grid gap-3 text-sm font-semibold text-white">
              <a href="tel:+917290821910" className="transition hover:text-[#d8bc80]">
                +91 7290821910
              </a>
              <a href="mailto:mmcocma@gmail.com" className="transition hover:text-[#d8bc80]">
                mmcocma@gmail.com
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-20">
        <div className="container">
          <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#244b7a]">
                Office network
              </p>
              <h2 className="mt-4 text-3xl font-bold leading-tight sm:text-4xl">
                Structured support across key business locations.
              </h2>
            </div>
            <p className="max-w-3xl text-base leading-8 text-slate-700">
              Our offices help clients coordinate meetings, records, audit
              evidence, compliance schedules, and professional consultations
              with a clear central point of accountability.
            </p>
          </div>

          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            {offices.map((office) => (
              <article
                key={`${office.type}-${office.city}`}
                className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-[#d8bc80] hover:shadow-lg hover:shadow-slate-200/70"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <span className="rounded-xl bg-[#fbf5e8] px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-[#102040]">
                      {office.type}
                    </span>
                    <h3 className="mt-5 text-2xl font-bold text-[#102040]">
                      {office.city}
                    </h3>
                  </div>
                  <div className="h-12 w-12 rounded-xl border border-[#f7ecd5] bg-[#fbf5e8]" />
                </div>
                <p className="mt-5 text-base font-semibold leading-7 text-[#102040]">
                  {office.address}
                </p>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  {office.note}
                </p>
                {office.phone || office.email ? (
                  <div className="mt-6 flex flex-col gap-2 border-t border-slate-200 pt-5 text-sm font-bold sm:flex-row sm:gap-5">
                    {office.phone ? (
                      <a
                        href="tel:+917290821910"
                        className="text-[#244b7a] transition hover:text-[#102040]"
                      >
                        {office.phone}
                      </a>
                    ) : null}
                    {office.email ? (
                      <a
                        href={`mailto:${office.email}`}
                        className="text-[#244b7a] transition hover:text-[#102040]"
                      >
                        {office.email}
                      </a>
                    ) : null}
                  </div>
                ) : null}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="container grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#244b7a]">
              Associate offices
            </p>
            <h2 className="mt-4 text-3xl font-bold leading-tight sm:text-4xl">
              Extended professional reach for coordinated delivery.
            </h2>
            <p className="mt-5 leading-8 text-slate-700">
              Our associate network helps support documentation, coordination,
              and local availability while keeping engagement ownership clear.
            </p>
          </div>

          <div className="grid gap-px overflow-hidden rounded-xl border border-slate-200 bg-slate-200">
            {associates.map((associate) => (
              <div
                key={associate.name}
                className="grid gap-3 bg-white p-5 sm:grid-cols-[1fr_auto] sm:items-center"
              >
                <div>
                  <h3 className="text-lg font-bold text-[#102040]">
                    {associate.name}
                  </h3>
                  <p className="mt-1 text-sm text-slate-600">
                    Associate office
                  </p>
                </div>
                <span className="rounded-xl bg-[#fbf5e8] px-3 py-2 text-sm font-bold text-[#102040]">
                  {associate.location}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-20">
        <div className="container">
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/70 lg:p-8">
            <div className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr]">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#244b7a]">
                  Visiting guidance
                </p>
                <h2 className="mt-4 text-3xl font-bold leading-tight text-[#102040]">
                  Plan your visit with the right context.
                </h2>
              </div>

              <div className="grid gap-4">
                {visitNotes.map((note, index) => (
                  <div
                    key={note}
                    className="grid gap-4 rounded-xl border border-slate-200 bg-slate-50 p-4 sm:grid-cols-[3rem_1fr]"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#102040] text-sm font-bold text-white">
                      {String(index + 1).padStart(2, "0")}
                    </div>
                    <p className="text-sm leading-7 text-slate-700">{note}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
