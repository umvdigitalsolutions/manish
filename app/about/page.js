import SectionHeading from "../components/SectionHeading";
import Card from "../components/Card";

export default function About() {
  return (
    <div className="container py-20">
      <SectionHeading>About MM &amp; Co.</SectionHeading>

      <p className="mt-6 max-w-3xl text-slate-700">
        MM &amp; Co. is a professionally managed cost accounting and consultancy firm established on 01.04.2015.
        Led by gold-medalist partners and a multidisciplinary team, we deliver cost audit, GST, taxation, statutory
        audit and end-to-end compliance services. Over the years we have grown our manpower, adopted modern tools and
        developed collaborations to provide a one-point solution for businesses across industries.
      </p>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card title="Established">01.04.2015</Card>
        <Card title="Practice Areas">Cost Audit, GST, Taxation, Audit, Compliance</Card>
        <Card title="Multi-city Footprint">Noida, Delhi, Guwahati, Sonipat + Associates</Card>
        <Card title="Team Strength">Experienced partners &amp; support staff</Card>
      </div>

      <div className="mt-12">
        <SectionHeading>Timeline</SectionHeading>
        <ol className="mt-6 space-y-6 text-slate-700">
          <li>
            <div className="font-semibold">2015</div>
            <div className="text-sm">Firm established and initial practice areas formed.</div>
          </li>
          <li>
            <div className="font-semibold">2018</div>
            <div className="text-sm">Growth in audit and GST services; expanded client base.</div>
          </li>
          <li>
            <div className="font-semibold">2021</div>
            <div className="text-sm">Technology adoption for reporting and MIS.</div>
          </li>
          <li>
            <div className="font-semibold">2024</div>
            <div className="text-sm">Multi-city presence and associate networks strengthened.</div>
          </li>
        </ol>
      </div>
    </div>
  );
}
