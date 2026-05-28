const RESEND_ENDPOINT = "https://api.resend.com/emails";

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

function formatMessage(data) {
  const rows = [
    ["Name", data.name],
    ["Email", data.email],
    ["Phone", data.phone || "Not provided"],
    ["Company", data.company || "Not provided"],
    ["Service area", data.service || "Not selected"],
  ];

  const htmlRows = rows
    .map(
      ([label, value]) => `
        <tr>
          <td style="padding:10px 14px;border:1px solid #e2e8f0;font-weight:700;color:#075985;">${label}</td>
          <td style="padding:10px 14px;border:1px solid #e2e8f0;color:#334155;">${escapeHtml(value)}</td>
        </tr>
      `
    )
    .join("");

  const textRows = rows.map(([label, value]) => `${label}: ${value}`).join("\n");

  return {
    html: `
      <div style="font-family:Arial,sans-serif;color:#0f172a;line-height:1.6;">
        <h2 style="color:#075985;margin:0 0 16px;">New enquiry from MM & Co. website</h2>
        <table style="border-collapse:collapse;width:100%;max-width:680px;margin-bottom:20px;">
          ${htmlRows}
        </table>
        <h3 style="color:#075985;margin:20px 0 8px;">Message</h3>
        <div style="white-space:pre-wrap;border:1px solid #e2e8f0;background:#f8fafc;padding:14px;border-radius:10px;color:#334155;">${escapeHtml(data.message)}</div>
      </div>
    `,
    text: `New enquiry from MM & Co. website\n\n${textRows}\n\nMessage:\n${data.message}`,
  };
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

  const name = String(data.name || "").trim();
  const email = String(data.email || "").trim();
  const message = String(data.message || "").trim();
  const phone = String(data.phone || "").trim();
  const company = String(data.company || "").trim();
  const service = String(data.service || "").trim();

  if (!name || !email || !message) {
    return Response.json(
      { message: "Name, email, and message are required." },
      { status: 400 }
    );
  }

  if (!isEmail(email)) {
    return Response.json(
      { message: "Please provide a valid email address." },
      { status: 400 }
    );
  }

  const emailBody = formatMessage({
    name,
    email,
    phone,
    company,
    service,
    message,
  });

  const resendResponse = await fetch(RESEND_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to,
      reply_to: email,
      subject: `Website enquiry from ${name}`,
      html: emailBody.html,
      text: emailBody.text,
    }),
  });

  if (!resendResponse.ok) {
    let errorMessage = "Unable to send enquiry right now.";
    try {
      const error = await resendResponse.json();
      errorMessage = error?.message || errorMessage;
    } catch {
      // Keep the generic message if Resend does not return JSON.
    }

    return Response.json({ message: errorMessage }, { status: 502 });
  }

  return Response.json({ message: "Enquiry sent successfully." });
}
