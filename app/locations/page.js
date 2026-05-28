import SectionHeading from "../components/SectionHeading";
import Card from "../components/Card";

export default function Locations() {
  return (
    <div className="container py-20">
      <SectionHeading>Locations</SectionHeading>

      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <Card title="Head Office — Noida">
          B-33, 1st Floor, Sector 63, Noida 201301<br />
          Phone: +91 7290821910<br />
          Email: <a href="mailto:mmcocma@gmail.com" className="text-indigo-600">mmcocma@gmail.com</a>
        </Card>

        <Card title="Branch — Delhi (Anand Vihar)">Anand Vihar, Delhi</Card>
        <Card title="Branch — Guwahati (Silpukhuri)">Silpukhuri, Guwahati</Card>
        <Card title="Branch — Sonipat (Kundli)">Kundli, Sonipat</Card>
      </div>

      <div className="mt-10">
        <SectionHeading>Associate Offices</SectionHeading>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Card title="Kishore & Kishore">Delhi</Card>
          <Card title="Bram & Co.">Noida</Card>
          <Card title="Ankesh Kumar & Co.">Delhi</Card>
        </div>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        <div className="rounded-lg border p-6">
          <div className="h-48 w-full bg-slate-100 flex items-center justify-center text-slate-400">Map placeholder</div>
        </div>
        <div>
          <p className="text-slate-700">For detailed directions and office timings, contact our head office or use the contact form.</p>
        </div>
      </div>
    </div>
  );
}
