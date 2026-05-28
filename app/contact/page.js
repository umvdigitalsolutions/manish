"use client";

import { useState } from "react";
import SectionHeading from "../components/SectionHeading";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [status, setStatus] = useState(null);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setStatus({ ok: false, msg: "Please fill name, email and message." });
      return;
    }

    // Simulate success
    setStatus({ ok: true, msg: "Thank you — we will contact you shortly." });
    setForm({ name: "", email: "", phone: "", message: "" });
  }

  return (
    <div className="container py-20">
      <SectionHeading>Contact</SectionHeading>

      <div className="mt-6 grid gap-8 md:grid-cols-2">
        <div>
          <h3 className="font-semibold">Get in touch</h3>
          <p className="mt-2 text-slate-700">Email: <a href="mailto:mmcocma@gmail.com" className="text-indigo-600">mmcocma@gmail.com</a></p>
          <p className="text-slate-700">Phone: +91 7290821910, +91 9999289826</p>
          <p className="mt-4 text-slate-700">Head Office: B-33, 1st Floor, Sector 63, Noida 201301</p>

          <div className="mt-6">
            <a href="#" className="inline-flex items-center gap-3 rounded-full bg-green-500 px-4 py-2 text-sm font-semibold text-white">WhatsApp</a>
            <a href="mailto:mmcocma@gmail.com" className="ml-3 inline-flex items-center gap-3 rounded-full border px-4 py-2 text-sm font-medium">Email Us</a>
          </div>
        </div>

        <div>
          <form onSubmit={handleSubmit} className="space-y-4">
            {status ? (
              <div className={`rounded-md p-3 ${status.ok ? "bg-green-50 text-green-800" : "bg-red-50 text-red-800"}`}>{status.msg}</div>
            ) : null}

            <div>
              <label className="text-sm font-medium">Name</label>
              <input name="name" value={form.name} onChange={handleChange} className="mt-1 w-full rounded-md border px-3 py-2" />
            </div>

            <div>
              <label className="text-sm font-medium">Email</label>
              <input name="email" type="email" value={form.email} onChange={handleChange} className="mt-1 w-full rounded-md border px-3 py-2" />
            </div>

            <div>
              <label className="text-sm font-medium">Phone</label>
              <input name="phone" value={form.phone} onChange={handleChange} className="mt-1 w-full rounded-md border px-3 py-2" />
            </div>

            <div>
              <label className="text-sm font-medium">Message</label>
              <textarea name="message" value={form.message} onChange={handleChange} rows={4} className="mt-1 w-full rounded-md border px-3 py-2" />
            </div>

            <div>
              <button type="submit" className="inline-flex items-center gap-3 rounded-full bg-indigo-600 px-5 py-3 text-sm font-semibold text-white">Send Message</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
