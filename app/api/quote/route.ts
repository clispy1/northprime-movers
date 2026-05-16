import { NextRequest, NextResponse } from "next/server";
import Mailjet from "node-mailjet";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const { moveSize, fromZip, toZip, date, name, email, phone } = data;

    // Validate variables
    const apiKey = process.env.MAILJET_API_KEY;
    const secretKey = process.env.MAILJET_SECRET_KEY;
    const fromEmail = process.env.MAILJET_FROM_EMAIL;
    const toEmail = process.env.MAILJET_TO_EMAIL;

    if (!apiKey || !secretKey || !fromEmail || !toEmail) {
      console.error("Mailjet credentials are not fully configured in environment variables.");
      return NextResponse.json(
        { error: "Server email configuration is missing." },
        { status: 500 }
      );
    }

    const mailjet = Mailjet.apiConnect(apiKey, secretKey);

    const emailHtml = `
      <h2>New Moving Quote Request</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <br/>
      <p><strong>Move Size:</strong> ${moveSize}</p>
      <p><strong>Moving From:</strong> ${fromZip}</p>
      <p><strong>Moving To:</strong> ${toZip}</p>
      <p><strong>Preferred Date:</strong> ${date}</p>
    `;

    const request = await mailjet.post("send", { version: "v3.1" }).request({
      Messages: [
        {
          From: {
            Email: fromEmail,
            Name: "Moving Website Alerts",
          },
          To: [
            {
              Email: toEmail,
              Name: "Moving Company Approvals",
            },
          ],
          Subject: "New Quote Request - " + name,
          TextPart: "New moving quote request from " + name + ". Phone: " + phone + ". From: " + fromZip + " to " + toZip + " on " + date + ".",
          HTMLPart: emailHtml,
        },
      ],
    });

    return NextResponse.json({ success: true, data: request.body });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { error: "Failed to send email." },
      { status: 500 }
    );
  }
}
