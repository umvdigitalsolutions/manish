import SectionHeading from "../../app/components/SectionHeading";
import Card from "../../app/components/Card";

export default function Blogs() {
  const posts = [
    { id: 'maintain-internal-controls', title: 'Maintain Internal Controls as You Scale', excerpt: 'Practical steps to keep controls tight during growth.' },
    { id: 'gst-audit-prep', title: 'Preparing for a Smooth GST Audit', excerpt: 'Checklist and tips to reduce audit friction.' },
  ];

  return (
    <div className="container py-20">
      <SectionHeading>Blogs</SectionHeading>

      <p className="mt-4 text-slate-700 max-w-3xl">Insights on accounting, compliance and finance operations.</p>

      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        {posts.map(p => (
          <Card key={p.id} title={p.title}>
            <div className="text-sm text-slate-600">{p.excerpt}</div>
            <div className="mt-4">
              <a href={`/blogs/${p.id}`} className="text-sm text-indigo-600 underline">Read more</a>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
