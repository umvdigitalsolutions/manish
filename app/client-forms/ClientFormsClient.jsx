"use client";

import { useMemo, useState } from "react";

const formTypes = {
  incomeTax: {
    label: "Income Tax Details",
    intro: "Collect personal, income, deduction, and bank details for ITR review.",
    fields: [
      ["fullName", "Full name"],
      ["pan", "PAN"],
      ["aadhaar", "Aadhaar"],
      ["mobile", "Mobile number"],
      ["email", "Email address"],
      ["address", "Residential address", "textarea"],
      ["assessmentYear", "Assessment year"],
      ["salaryIncome", "Salary / pension income"],
      ["businessIncome", "Business / professional income"],
      ["houseProperty", "House property income"],
      ["capitalGains", "Capital gains"],
      ["otherIncome", "Other income"],
      ["deductions", "Deductions claimed"],
      ["taxPaid", "TDS / advance tax paid"],
      ["bankDetails", "Bank account details", "textarea"],
      ["notes", "Additional notes", "textarea"],
    ],
  },
  gst: {
    label: "GST Details",
    intro: "Collect GST registration, sales, purchase, ITC, and filing details.",
    fields: [
      ["businessName", "Business / trade name"],
      ["gstin", "GSTIN"],
      ["legalName", "Legal name"],
      ["contactPerson", "Contact person"],
      ["mobile", "Mobile number"],
      ["email", "Email address"],
      ["businessAddress", "Business address", "textarea"],
      ["filingPeriod", "Return period"],
      ["outwardSupplies", "Outward supplies / sales"],
      ["taxableSales", "Taxable sales"],
      ["exemptSales", "Exempt / nil-rated sales"],
      ["purchaseValue", "Purchase value"],
      ["inputTaxCredit", "Input tax credit"],
      ["taxPaid", "GST paid"],
      ["ewayBills", "E-way bill details"],
      ["notes", "Additional notes", "textarea"],
    ],
  },
};

function buildInitialValues(type) {
  return Object.fromEntries(formTypes[type].fields.map(([name]) => [name, ""]));
}

function PrintableRow({ label, value }) {
  return (
    <div className="grid grid-cols-[11rem_1fr] gap-4 border-b border-slate-200 py-3 text-sm">
      <div className="font-bold text-[#102040]">{label}</div>
      <div className="whitespace-pre-wrap text-slate-700">{value || "-"}</div>
    </div>
  );
}

export default function ClientForms() {
  const [activeType, setActiveType] = useState("incomeTax");
  const [values, setValues] = useState(() => ({
    incomeTax: buildInitialValues("incomeTax"),
    gst: buildInitialValues("gst"),
  }));
  const [emailStatus, setEmailStatus] = useState(null);
  const [isEmailing, setIsEmailing] = useState(false);

  const activeForm = formTypes[activeType];
  const activeValues = values[activeType];
  const filledFields = activeForm.fields.filter(([name]) =>
    String(activeValues[name] || "").trim()
  );
  const generatedDate = useMemo(
    () =>
      new Intl.DateTimeFormat("en-IN", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }).format(new Date()),
    []
  );

  function updateValue(name, value) {
    setEmailStatus(null);
    setValues((current) => ({
      ...current,
      [activeType]: {
        ...current[activeType],
        [name]: value,
      },
    }));
  }

  function resetForm() {
    setEmailStatus(null);
    setValues((current) => ({
      ...current,
      [activeType]: buildInitialValues(activeType),
    }));
  }

  async function handleEmailForm() {
    setIsEmailing(true);
    setEmailStatus(null);

    try {
      const response = await fetch("/api/client-forms", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          formType: activeType,
          values: activeValues,
        }),
      });
      const data = await response.json();

      if (!response.ok) {
        setEmailStatus({
          ok: false,
          message: data.message || "Unable to email form right now.",
        });
        return;
      }

      setEmailStatus({
        ok: true,
        message: "Form emailed successfully with a printable attachment.",
      });
    } catch {
      setEmailStatus({
        ok: false,
        message: "Unable to email form right now. Please try again.",
      });
    } finally {
      setIsEmailing(false);
    }
  }

  return (
    <div className="bg-white text-[#102040]">
      <section className="border-b border-slate-200 bg-[#102040] text-white print:hidden">
        <div className="container py-20">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#fbf5e8]">
            Client forms
          </p>
          <h1 className="mt-5 max-w-4xl text-4xl font-bold leading-tight sm:text-5xl">
            Fill tax or GST details and send them directly to MM &amp; Co.
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-8 text-[#f2f6fb]">
            Use these forms to collect client information, review it on-screen,
            and email it securely to the office for follow-up.
          </p>
        </div>
      </section>

      <section className="bg-slate-50 py-16 print:bg-white print:py-0">
        <div className="container grid gap-8 lg:grid-cols-[0.85fr_1.15fr] print:block">
          <div className="self-start rounded-xl border border-slate-200 bg-white p-6 shadow-sm print:hidden">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#244b7a]">
              Select form
            </p>

            <div className="mt-5 grid grid-cols-2 gap-3">
              {Object.entries(formTypes).map(([type, form]) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setActiveType(type)}
                  className={`rounded-xl border px-4 py-3 text-sm font-bold transition ${
                    activeType === type
                      ? "border-[#d8bc80] bg-[#102040] text-white"
                      : "border-slate-200 bg-white text-[#102040] hover:border-[#d8bc80]"
                  }`}
                >
                  {form.label}
                </button>
              ))}
            </div>

            <p className="mt-5 text-sm leading-6 text-slate-700">
              {activeForm.intro}
            </p>

            <div className="mt-6 grid gap-4">
              {activeForm.fields.map(([name, label, type]) => (
                <label key={name} className="block">
                  <span className="text-sm font-bold text-slate-700">
                    {label}
                  </span>
                  {type === "textarea" ? (
                    <textarea
                      value={activeValues[name]}
                      onChange={(event) => updateValue(name, event.target.value)}
                      rows={4}
                      className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-[#244b7a] focus:ring-2 focus:ring-[#f7ecd5]"
                    />
                  ) : (
                    <input
                      value={activeValues[name]}
                      onChange={(event) => updateValue(name, event.target.value)}
                      className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-[#244b7a] focus:ring-2 focus:ring-[#f7ecd5]"
                    />
                  )}
                </label>
              ))}
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={handleEmailForm}
                disabled={isEmailing}
                className="inline-flex items-center justify-center rounded-xl bg-[#102040] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#244b7a] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isEmailing ? "Sending..." : "Send form"}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="inline-flex items-center justify-center rounded-xl border border-slate-300 px-5 py-3 text-sm font-bold text-[#102040] transition hover:bg-slate-50"
              >
                Clear form
              </button>
            </div>

            {emailStatus ? (
              <div
                className={`mt-4 rounded-xl p-4 text-sm font-semibold ${
                  emailStatus.ok
                    ? "bg-green-50 text-green-800"
                    : "bg-red-50 text-red-800"
                }`}
              >
                {emailStatus.message}
              </div>
            ) : null}
          </div>

          <div className="self-start rounded-xl border border-slate-200 bg-white p-6 shadow-sm print:border-0 print:p-0 print:shadow-none">
            <div className="border-b border-slate-200 pb-4">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#244b7a]">
                MM & Co.
              </p>
              <div className="mt-3 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                <div>
                  <h2 className="text-2xl font-bold text-[#102040]">
                    {activeForm.label}
                  </h2>
                  <p className="mt-2 text-sm text-slate-600">
                    Generated on {generatedDate}
                  </p>
                </div>
                <div className="rounded-xl bg-[#fbf5e8] px-4 py-3 text-sm font-bold text-[#102040] print:bg-white print:px-0">
                  Client information sheet
                </div>
              </div>
            </div>

            <div className="mt-4">
              {filledFields.length ? (
                filledFields.map(([name, label]) => (
                  <PrintableRow
                    key={name}
                    label={label}
                    value={activeValues[name]}
                  />
                ))
              ) : (
                <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-5 text-sm leading-6 text-slate-600">
                  Filled details will appear here as a compact review before
                  sending.
                </div>
              )}
            </div>

            <div className="mt-5 rounded-xl bg-[#fbf5e8] p-4 text-sm leading-6 text-slate-700">
              <div className="font-bold text-[#102040]">Before sending</div>
              <div className="mt-1">
                Review the entered details. The email sent to MM &amp; Co. will
                include the complete structured form.
              </div>
            </div>

            <p className="mt-5 text-xs leading-5 text-slate-500">
              This form is intended for information collection and preliminary
              review. Final tax, GST, or filing treatment should be confirmed
              against supporting documents and applicable law.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
