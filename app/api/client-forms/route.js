const RESEND_ENDPOINT = "https://api.resend.com/emails";

const formTypes = {
  incomeTax: {
    label: "Income Tax Details",
    filename: "income-tax-details.html",
    fields: [
      ["fullName", "Full name"],
      ["pan", "PAN"],
      ["aadhaar", "Aadhaar"],
      ["mobile", "Mobile number"],
      ["email", "Email address"],
      ["address", "Residential address"],
      ["assessmentYear", "Assessment year"],
      ["salaryIncome", "Salary / pension income"],
      ["businessIncome", "Business / professional income"],
      ["houseProperty", "House property income"],
      ["capitalGains", "Capital gains"],
      ["otherIncome", "Other income"],
      ["deductions", "Deductions claimed"],
      ["taxPaid", "TDS / advance tax paid"],
      ["bankDetails", "Bank account details"],
      ["notes", "Additional notes"],
    ],
  },
  gst: {
    label: "GST Details",
    filename: "gst-details.html",
    fields: [
      ["businessName", "Business / trade name"],
      ["gstin", "GSTIN"],
      ["legalName", "Legal name"],
      ["contactPerson", "Contact person"],
      ["mobile", "Mobile number"],
      ["email", "Email address"],
      ["businessAddress", "Business address"],
      ["filingPeriod", "Return period"],
      ["outwardSupplies", "Outward supplies / sales"],
      ["taxableSales", "Taxable sales"],
      ["exemptSales", "Exempt / nil-rated sales"],
      ["purchaseValue", "Purchase value"],
      ["inputTaxCredit", "Input tax credit"],
      ["taxPaid", "GST paid"],
      ["ewayBills", "E-way bill details"],
      ["notes", "Additional notes"],
    ],
  },
};

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function isEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function getRows(form, values) {
  return form.fields.map(([name, label]) => [
    label,
    String(values?.[name] || "").trim() || "Not provided",
  ]);
}

function buildDocumentHtml(form, rows) {
  const rowHtml = rows
    .map(
      ([label, value]) => `
        <tr>
          <td style="width:34%;padding:11px 14px;border:1px solid #e2e8f0;font-weight:700;color:#102040;vertical-align:top;">${escapeHtml(label)}</td>
          <td style="padding:11px 14px;border:1px solid #e2e8f0;color:#334155;white-space:pre-wrap;">${escapeHtml(value)}</td>
        </tr>
      `
    )
    .join("");

  return `
    <!doctype html>
    <html>
      <head>
        <meta charset="utf-8" />
        <title>${escapeHtml(form.label)} - MM & Co.</title>
      </head>
      <body style="font-family:Arial,sans-serif;color:#102040;line-height:1.55;margin:32px;">
        <p style="font-size:12px;font-weight:700;letter-spacing:1.8px;text-transform:uppercase;color:#244b7a;margin:0 0 10px;">MM & Co.</p>
        <h1 style="font-size:28px;margin:0 0 6px;color:#102040;">${escapeHtml(form.label)}</h1>
        <p style="font-size:13px;color:#64748b;margin:0 0 24px;">Client information sheet</p>
        <table style="border-collapse:collapse;width:100%;margin:0 0 28px;">
          ${rowHtml}
        </table>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:32px;margin-top:34px;font-size:13px;color:#334155;">
          <div>
            <strong style="color:#102040;">Client signature</strong>
            <div style="border-top:1px solid #cbd5e1;margin-top:56px;padding-top:8px;">Signature / confirmation</div>
          </div>
          <div>
            <strong style="color:#102040;">Office use</strong>
            <div style="border-top:1px solid #cbd5e1;margin-top:56px;padding-top:8px;">Reviewed by / date</div>
          </div>
        </div>
        <p style="font-size:11px;color:#64748b;margin-top:32px;">
          This form is intended for information collection and preliminary review. Final tax, GST, or filing treatment should be confirmed against supporting documents and applicable law.
        </p>
      </body>
    </html>
  `;
}

export async function POST(request) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL || "infobramandcollp@gmail.com";
  const from =
    process.env.CONTACT_FROM_EMAIL || "MM & Co. <onboarding@resend.dev>";

  if (!apiKey) {
    return Response.json(
      { message: "Email service is not configured." },
      { status: 500 }
    );
  }

  let data;
  try {
    data = await request.json();
  } catch {
    return Response.json({ message: "Invalid request body." }, { status: 400 });
  }

  const form = formTypes[data.formType];
  if (!form) {
    return Response.json({ message: "Invalid form type." }, { status: 400 });
  }

  const rows = getRows(form, data.values);
  const documentHtml = buildDocumentHtml(form, rows);
  const email = String(data.values?.email || "").trim();
  const subjectName =
    String(data.values?.fullName || data.values?.businessName || "").trim() ||
    "Website client";

  const resendResponse = await fetch(RESEND_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to,
      ...(isEmail(email) ? { reply_to: email } : {}),
      subject: `${form.label} from ${subjectName}`,
      html: documentHtml,
      text: rows.map(([label, value]) => `${label}: ${value}`).join("\n"),
      attachments: [
        {
          filename: form.filename,
          content: Buffer.from(documentHtml).toString("base64"),
        },
      ],
    }),
  });

  if (!resendResponse.ok) {
    let errorMessage = "Unable to email form right now.";
    try {
      const error = await resendResponse.json();
      errorMessage = error?.message || errorMessage;
    } catch {
      // Keep the generic message if Resend does not return JSON.
    }

    return Response.json({ message: errorMessage }, { status: 502 });
  }

  return Response.json({ message: "Form emailed successfully." });
}
