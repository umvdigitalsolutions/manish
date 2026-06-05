"use client";

import Link from "next/link";
import { useState } from "react";

const contactMethods = [
  {
    label: "WhatsApp",
    value: "+91 9999289826",
    href: "https://wa.me/919999289826?text=Hello%20MM%20%26%20Co.%2C%20I%20would%20like%20to%20discuss%20a%20website%20enquiry.",
    featured: true,
  },
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

const whatsappNumber = "919999289826";

function WhatsappIcon({ className = "h-5 w-5" }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.33 4.95L2 22l5.27-1.39a9.85 9.85 0 0 0 4.73 1.2h.01c5.46 0 9.91-4.45 9.91-9.91A9.83 9.83 0 0 0 12.04 2Zm0 18.14h-.01a8.2 8.2 0 0 1-4.18-1.14l-.3-.18-3.13.82.84-3.05-.2-.31a8.17 8.17 0 0 1-1.25-4.37c0-4.54 3.69-8.23 8.24-8.23a8.2 8.2 0 0 1 8.23 8.24c0 4.53-3.7 8.22-8.24 8.22Zm4.51-6.16c-.25-.12-1.46-.72-1.69-.8-.23-.08-.39-.12-.56.12-.16.25-.64.8-.79.97-.14.16-.29.18-.54.06-.25-.12-1.04-.38-1.98-1.22-.73-.65-1.23-1.46-1.37-1.71-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.12-.14.16-.25.25-.41.08-.16.04-.31-.02-.43-.06-.12-.56-1.35-.77-1.85-.2-.49-.41-.42-.56-.43h-.48c-.16 0-.43.06-.66.31-.23.25-.87.85-.87 2.07s.89 2.4 1.01 2.57c.12.16 1.75 2.67 4.24 3.74.59.26 1.06.41 1.42.52.6.19 1.14.16 1.57.1.48-.07 1.46-.6 1.67-1.17.2-.58.2-1.07.14-1.17-.06-.1-.23-.16-.48-.29Z" />
    </svg>
  );
}

function buildWhatsappMessage(form) {
  if (!form.name && !form.email && !form.phone && !form.company && !form.service && !form.message) {
    return "Hello MM & Co., I would like to discuss an enquiry from your website.";
  }

  const details = [
    ["Name", form.name],
    ["Email", form.email],
    ["Phone", form.phone || "Not provided"],
    ["Company", form.company || "Not provided"],
    ["Service area", form.service || "Not selected"],
  ];

  const detailText = details
    .map(([label, value]) => `*${label}:* ${value}`)
    .join("\n");

  return [
    "*New enquiry from MM & Co. website*",
    "",
    detailText,
    "",
    "*Message:*",
    form.message,
  ].join("\n");
}

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

  function validateForm() {
    if (!form.name || !form.email || !form.message) {
      setStatus({
        ok: false,
        msg: "Please add your name, email, and a short message.",
      });
      return false;
    }

    return true;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (!validateForm()) {
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

  function handleWhatsappClick() {
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      buildWhatsappMessage(form)
    )}`;
    const opened = window.open(whatsappUrl, "_blank", "noopener,noreferrer");

    if (!opened) {
      window.location.href = whatsappUrl;
    }

    setStatus({
      ok: true,
      msg: "Your WhatsApp message is ready. Please review it and tap send in WhatsApp.",
    });
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
                  target={method.featured ? "_blank" : undefined}
                  rel={method.featured ? "noreferrer" : undefined}
                  className={`rounded-xl border p-5 shadow-sm transition hover:shadow-md ${
                    method.featured
                      ? "border-[#d8bc80] bg-[#102040] text-white hover:bg-[#244b7a]"
                      : "border-slate-200 bg-white hover:border-[#d8bc80]"
                  }`}
                >
                  <div
                    className={`text-xs font-bold uppercase tracking-[0.14em] ${
                      method.featured ? "text-[#fbf5e8]" : "text-slate-500"
                    }`}
                  >
                    {method.label}
                  </div>
                  <div
                    className={`mt-2 flex items-center gap-3 text-lg font-bold ${
                      method.featured ? "text-white" : "text-[#102040]"
                    }`}
                  >
                    {method.featured ? (
                      <WhatsappIcon className="h-6 w-6 text-[#d8bc80]" />
                    ) : null}
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

            <div className="mt-6 flex flex-col gap-3 border-b border-slate-200 pb-6 sm:flex-row sm:items-center sm:justify-between">
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

            <div className="mt-6 rounded-xl border border-[#d8bc80] bg-[#fbf5e8] p-5">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#244b7a]">
                Prefer WhatsApp?
              </p>
              <div className="mt-3 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm leading-6 text-slate-700">
                  Open WhatsApp directly with a ready message for MM &amp; Co.
                  You can edit it before sending.
                </p>
                <button
                  type="button"
                  onClick={handleWhatsappClick}
                  className="inline-flex shrink-0 items-center justify-center rounded-xl bg-[#102040] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#244b7a]"
                >
                  <WhatsappIcon className="mr-2 h-5 w-5 text-[#d8bc80]" />
                  Send on WhatsApp
                </button>
              </div>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
