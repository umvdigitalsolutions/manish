import SectionHeading from "../components/SectionHeading";
import Card from "../components/Card";

export default function Team() {
  const members = [
    { name: "Ms. Renu Sehgal", role: "Partner", note: "Gold Medalist, AIR 16" },
    { name: "Mr. Manish Malik", role: "Partner", note: "Gold Medalist, AIR 1" },
    { name: "Mr. Nishant Garg", role: "Partner", note: "Gold Medalist, AIR 33" },
    { name: "Mr. Mayank Jain", role: "Partner", note: "Gold Medalist, AIR 41" },
  ];

  return (
    <div className="container py-20">
      <SectionHeading>Our Team</SectionHeading>

      <p className="mt-4 text-slate-700 max-w-3xl">Leadership comprised of award-winning professionals and experienced partners providing high quality advisory and compliance services.</p>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {members.map((m) => (
          <Card key={m.name} title={m.name}>
            <div className="text-sm text-slate-600">{m.role}</div>
            <div className="mt-2 text-xs text-slate-500">{m.note}</div>
          </Card>
        ))}
      </div>
    </div>
  );
}
