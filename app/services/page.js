import SectionHeading from "../components/SectionHeading";
import Card from "../components/Card";

export default function Services() {
  const services = [
    {
      title: "Cost Audit & Cost Records",
      items: ["Cost audits", "Maintenance of cost records", "Cost statements"],
    },
    {
      title: "GST Audit & GST Compliance",
      items: ["GST registrations & filings", "GST audit support", "Workshops & training"],
    },
    {
      title: "Financial & Statutory Audit",
      items: ["Statutory audits", "Financial statement audits", "Reporting"],
    },
    {
      title: "Taxation Services",
      items: ["Tax audit", "TDS compliance", "Transfer pricing support"],
    },
    {
      title: "Internal Audit & Risk Management",
      items: ["Internal controls", "Operational audits", "Risk assessments"],
    },
    {
      title: "MCA / ROC Compliances",
      items: ["ROC filings", "Company compliance advisory"],
    },
    {
      title: "Accounting & Bookkeeping",
      items: ["Bookkeeping", "MIS reporting", "Reconciliations"],
    },
    {
      title: "Management Consultancy",
      items: ["Business process improvements", "Cost optimisation"],
    },
    {
      title: "Customs & Trade Compliance",
      items: ["Customs advisory", "Trade compliance support"],
    },
  ];

  return (
    <div className="container py-20">
      <SectionHeading>Services</SectionHeading>

      <p className="mt-4 text-slate-700 max-w-3xl">We offer a comprehensive range of services across audit, taxation, compliance and consultancy tailored to industry needs.</p>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s) => (
          <Card key={s.title} title={s.title}>
            <ul className="list-inside list-disc">
              {s.items.map((it) => (
                <li key={it}>{it}</li>
              ))}
            </ul>
          </Card>
        ))}
      </div>

      <div className="mt-10 text-center">
        <a href="/contact" className="inline-flex items-center gap-3 rounded-full bg-indigo-600 px-5 py-3 text-sm font-semibold text-white">Get in touch</a>
      </div>
    </div>
  );
}
