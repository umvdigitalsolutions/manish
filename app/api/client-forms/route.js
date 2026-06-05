const RESEND_ENDPOINT = "https://api.resend.com/emails";

const formTypes = {
  incomeTax: {
    label: "Income Tax Details",
    filename: "income-tax-details.pdf",
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
    filename: "gst-details.pdf",
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

function sanitizePdfText(value) {
  return String(value ?? "")
    .replace(/[^\x09\x0A\x0D\x20-\x7E]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function escapePdfText(value) {
  return sanitizePdfText(value)
    .replaceAll("\\", "\\\\")
    .replaceAll("(", "\\(")
    .replaceAll(")", "\\)");
}

function wrapPdfText(value, maxLength = 74) {
  const words = sanitizePdfText(value).split(" ").filter(Boolean);
  const lines = [];
  let line = "";

  for (const word of words) {
    if (!line) {
      line = word;
    } else if (`${line} ${word}`.length <= maxLength) {
      line = `${line} ${word}`;
    } else {
      lines.push(line);
      line = word;
    }
  }

  if (line) {
    lines.push(line);
  }

  return lines.length ? lines : ["-"];
}

function drawText({ text, x, y, size = 10, font = "F1" }) {
  return `BT /${font} ${size} Tf ${x} ${y} Td (${escapePdfText(text)}) Tj ET`;
}

function buildPdfContent(form, rows) {
  const pages = [];
  let commands = [];
  let y = 790;

  function startPage() {
    commands = [
      drawText({ text: "MM & Co.", x: 50, y: 790, size: 12, font: "F2" }),
      drawText({ text: form.label, x: 50, y: 765, size: 20, font: "F2" }),
      drawText({
        text: "Client information sheet",
        x: 50,
        y: 744,
        size: 10,
      }),
    ];
    y = 712;
  }

  function finishPage() {
    pages.push(commands.join("\n"));
  }

  function ensureSpace(lineCount) {
    if (y - lineCount * 16 < 70) {
      finishPage();
      startPage();
    }
  }

  startPage();

  for (const [label, value] of rows) {
    const valueLines = wrapPdfText(value);
    const lineCount = Math.max(1, valueLines.length);
    ensureSpace(lineCount + 1);

    commands.push(drawText({ text: label, x: 50, y, size: 10, font: "F2" }));
    valueLines.forEach((line, index) => {
      commands.push(
        drawText({
          text: line,
          x: 205,
          y: y - index * 14,
          size: 10,
        })
      );
    });
    y -= lineCount * 14 + 10;
  }

  ensureSpace(7);
  y -= 16;
  commands.push(drawText({ text: "Client signature", x: 50, y, font: "F2" }));
  commands.push(drawText({ text: "Office use", x: 325, y, font: "F2" }));
  y -= 46;
  commands.push("50 " + y + " m 250 " + y + " l S");
  commands.push("325 " + y + " m 545 " + y + " l S");
  y -= 16;
  commands.push(drawText({ text: "Signature / confirmation", x: 50, y }));
  commands.push(drawText({ text: "Reviewed by / date", x: 325, y }));

  ensureSpace(4);
  y -= 38;
  wrapPdfText(
    "This form is intended for information collection and preliminary review. Final tax, GST, or filing treatment should be confirmed against supporting documents and applicable law.",
    92
  ).forEach((line) => {
    commands.push(drawText({ text: line, x: 50, y, size: 8 }));
    y -= 11;
  });

  finishPage();
  return pages;
}

function buildPdf(form, rows) {
  const pageContents = buildPdfContent(form, rows);
  const objects = [
    "<< /Type /Catalog /Pages 2 0 R >>",
    "",
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>",
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>",
  ];
  const pageObjectNumbers = [];

  for (const content of pageContents) {
    const contentObjectNumber = objects.length + 1;
    const pageObjectNumber = objects.length + 2;
    const stream = `${content}\n`;

    objects.push(
      `<< /Length ${Buffer.byteLength(stream, "latin1")} >>\nstream\n${stream}endstream`,
      `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 3 0 R /F2 4 0 R >> >> /Contents ${contentObjectNumber} 0 R >>`
    );
    pageObjectNumbers.push(pageObjectNumber);
  }

  objects[1] = `<< /Type /Pages /Kids [${pageObjectNumbers
    .map((pageObjectNumber) => `${pageObjectNumber} 0 R`)
    .join(" ")}] /Count ${pageObjectNumbers.length} >>`;

  let pdf = "%PDF-1.4\n";
  const offsets = [0];

  objects.forEach((object, index) => {
    offsets.push(Buffer.byteLength(pdf, "latin1"));
    pdf += `${index + 1} 0 obj\n${object}\nendobj\n`;
  });

  const xrefOffset = Buffer.byteLength(pdf, "latin1");
  pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
  offsets.slice(1).forEach((offset) => {
    pdf += `${String(offset).padStart(10, "0")} 00000 n \n`;
  });
  pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`;

  return Buffer.from(pdf, "latin1");
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
  const pdfBuffer = buildPdf(form, rows);
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
          content: pdfBuffer.toString("base64"),
          content_type: "application/pdf",
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
