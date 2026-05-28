import SectionHeading from "../../app/components/SectionHeading";
import Card from "../../app/components/Card";

export default function CaseStudies() {
  const cases = [
    {
      id: 'restoring-financial-accuracy',
      title: 'Restoring Financial Accuracy Across Multi-Entity Accounting',
      excerpt: 'Consolidation, reconciliations and controls implemented for multi-entity retail chain.',
    },
    {
      id: 'quickbooks-accuracy',
      title: 'Restoring Financial Accuracy in QuickBooks Online',
      excerpt: 'Cleanup and processes to ensure reliable reports from cloud accounting setups.',
    },
  ];

  return (
    <div className="container py-20">
      <SectionHeading>Case Studies</SectionHeading>

      <p className="mt-4 text-slate-700 max-w-3xl">Selected success stories showing measurable outcomes we delivered for clients.</p>

      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        {cases.map((c) => (
          <Card key={c.id} title={c.title}>
            <div className="text-sm text-slate-600">{c.excerpt}</div>
            <div className="mt-4">
              <a href={`/case-studies/${c.id}`} className="text-sm text-indigo-600 underline">Read case study</a>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
