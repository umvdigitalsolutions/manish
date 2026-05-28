"use client";

import Link from "next/link";
import { useState } from "react";

const contactMethods = [
  {
    label: "Email",
    value: "mmcocma@gmail.com",
    href: "mailto:mmcocma@gmail.com",
  },
  {
    label: "Phone",
    value: "+91 7290821910",
    href: "tel:+917290821910",
  },
  {
    label: "Alternate phone",
    value: "+91 9999289826",
    href: "tel:+919999289826",
  },
];

const matterTypes = [
  "Cost audit / cost records",
  "GST or tax compliance",
  "Internal audit / controls",
  "Accounting and MIS support",
];

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: "",
    message: "",
  });
  const [status, setStatus] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleChange(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setStatus({
        ok: false,
        msg: "Please add your name, email, and a short message.",
      });
      return;
    }

    setIsSubmitting(true);
    setStatus(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      const data = await response.json();

      if (!response.ok) {
        setStatus({
          ok: false,
          msg: data.message || "Unable to send enquiry right now.",
        });
        return;
      }

      setStatus({
        ok: true,
        msg: "Thank you. Our team will review your requirement and contact you shortly.",
      });
      setForm({
        name: "",
        email: "",
        phone: "",
        company: "",
        service: "",
        message: "",
      });
    } catch {
      setStatus({
        ok: false,
        msg: "Unable to send enquiry right now. Please email us directly.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="bg-white text-[#102040]">
      <section className="border-b border-slate-200 bg-[#102040] text-white">
        <div className="container grid gap-10 py-20 lg:grid-cols-[1fr_0.85fr] lg:items-end">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#fbf5e8]">
              Contact MM &amp; Co.
            </p>
            <h1 className="mt-5 text-4xl font-bold leading-tight sm:text-5xl">
              Speak with a professional team about audit, tax, cost, or
              compliance support.
            </h1>
            <p className="mt-6 max-w-3xl text-base leading-8 text-[#f2f6fb]">
              Share your requirement and we will help identify the right next
              step, whether you need regulatory compliance, financial reporting,
              audit support, or ongoing advisory.
            </p>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/[0.08] p-6">
            <div className="text-sm font-bold uppercase tracking-[0.16em] text-[#fbf5e8]">
              Head office
            </div>
            <p className="mt-4 text-lg font-bold text-white">
              B-33, 1st Floor, Sector 63, Noida 201301
            </p>
            <p className="mt-3 text-sm leading-7 text-[#f2f6fb]">
              For detailed directions, office timings, or appointment
              scheduling, contact the head office before visiting.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-20">
        <div className="container grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="space-y-6">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#244b7a]">
                Reach us directly
              </p>
              <h2 className="mt-4 text-3xl font-bold text-[#102040]">
                Clear communication for time-sensitive finance matters.
              </h2>
              <p className="mt-4 leading-8 text-slate-700">
                Use the form for a structured enquiry, or contact us directly
                for urgent audit, filing, or compliance timelines.
              </p>
            </div>

            <div className="grid gap-4">
              {contactMethods.map((method) => (
                <a
                  key={method.label}
                  href={method.href}
                  className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-[#d8bc80] hover:shadow-md"
                >
                  <div className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">
                    {method.label}
                  </div>
                  <div className="mt-2 text-lg font-bold text-[#102040]">
                    {method.value}
                  </div>
                </a>
              ))}
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="font-bold text-[#102040]">Common enquiry areas</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {matterTypes.map((type) => (
                  <span
                    key={type}
                    className="rounded-xl bg-[#fbf5e8] px-3 py-2 text-xs font-bold text-[#102040]"
                  >
                    {type}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="rounded-xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/70 lg:p-8"
          >
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#244b7a]">
                Enquiry form
              </p>
              <h2 className="mt-3 text-3xl font-bold text-[#102040]">
                Tell us what you need help with.
              </h2>
            </div>

            {status ? (
              <div
                className={`mt-6 rounded-xl p-4 text-sm font-semibold ${
                  status.ok
                    ? "bg-green-50 text-green-800"
                    : "bg-red-50 text-red-800"
                }`}
              >
                {status.msg}
              </div>
            ) : null}

            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <label className="block">
                <span className="text-sm font-bold text-slate-700">
                  Full name
                </span>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-[#244b7a] focus:ring-2 focus:ring-[#f7ecd5]"
                />
              </label>

              <label className="block">
                <span className="text-sm font-bold text-slate-700">
                  Email address
                </span>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-[#244b7a] focus:ring-2 focus:ring-[#f7ecd5]"
                />
              </label>

              <label className="block">
                <span className="text-sm font-bold text-slate-700">Phone</span>
                <input
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-[#244b7a] focus:ring-2 focus:ring-[#f7ecd5]"
                />
              </label>

              <label className="block">
                <span className="text-sm font-bold text-slate-700">
                  Company / organization
                </span>
                <input
                  name="company"
                  value={form.company}
                  onChange={handleChange}
                  className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-[#244b7a] focus:ring-2 focus:ring-[#f7ecd5]"
                />
              </label>
            </div>

            <label className="mt-5 block">
              <span className="text-sm font-bold text-slate-700">
                Service area
              </span>
              <select
                name="service"
                value={form.service}
                onChange={handleChange}
                className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-[#244b7a] focus:ring-2 focus:ring-[#f7ecd5]"
              >
                <option value="">Select a service area</option>
                {matterTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </label>

            <label className="mt-5 block">
              <span className="text-sm font-bold text-slate-700">
                Message
              </span>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                rows={5}
                placeholder="Share deadlines, compliance requirements, or the issue you want reviewed."
                className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-[#244b7a] focus:ring-2 focus:ring-[#f7ecd5]"
              />
            </label>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center justify-center rounded-xl bg-[#102040] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#244b7a]"
              >
                {isSubmitting ? "Sending..." : "Send Enquiry"}
              </button>
              <Link
                href="/locations"
                className="text-sm font-bold text-[#244b7a] hover:text-[#102040]"
              >
                View office locations
              </Link>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
