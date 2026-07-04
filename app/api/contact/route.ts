import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

/**
 * Contact Form API Route
 *
 * Architecture:
 * - Next.js App Router API route — server-only, never exposed to client
 * - Resend handles email delivery
 * - Environment variables validated at request time
 * - Input validated server-side — client validation is UX, not security
 *
 * Email template design:
 * - Light theme for maximum rendering consistency across email clients
 * - Gmail, Apple Mail, Outlook all render light backgrounds reliably
 * - Dark email templates have inconsistent rendering on Outlook/Windows
 * - Monospace font preserved for engineering brand identity
 * - reply-to set to sender's email — replies go directly to them
 *
 * Security:
 * - API key lives in .env.local only
 * - No sensitive data logged
 * - Input length limits prevent abuse
 */

const resend = new Resend(process.env.RESEND_API_KEY);
const CONTACT_EMAIL = process.env.CONTACT_EMAIL ?? "chiderahillary80@gmail.com";

interface ContactPayload {
  name: string;
  email: string;
  organization?: string;
  subject: string;
  message: string;
}

function validatePayload(body: unknown): ContactPayload | null {
  if (typeof body !== "object" || body === null) return null;

  const { name, email, subject, message, organization } =
    body as Record<string, unknown>;

  if (
    typeof name !== "string" || name.trim().length < 2 ||
    typeof email !== "string" || !email.includes("@") ||
    typeof subject !== "string" || subject.trim().length < 2 ||
    typeof message !== "string" || message.trim().length < 10
  ) {
    return null;
  }

  return {
    name: name.trim(),
    email: email.trim().toLowerCase(),
    organization: typeof organization === "string" && organization.trim().length > 0
      ? organization.trim()
      : undefined,
    subject: subject.trim(),
    message: message.trim(),
  };
}

function buildEmailHtml(payload: ContactPayload): string {
  const { name, email, organization, subject, message } = payload;

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Portfolio Contact — ${subject}</title>
</head>
<body style="
  margin: 0;
  padding: 0;
  background-color: #f4f4f4;
  font-family: 'Courier New', Courier, monospace;
  -webkit-font-smoothing: antialiased;
">
  <table width="100%" cellpadding="0" cellspacing="0" border="0"
    style="background-color: #f4f4f4; padding: 40px 16px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" border="0"
          style="
            max-width: 600px;
            width: 100%;
            background-color: #ffffff;
            border: 1px solid #e0e0e0;
          ">

          <!-- Header -->
          <tr>
            <td style="
              padding: 28px 32px 24px;
              border-bottom: 1px solid #e0e0e0;
              background-color: #ffffff;
            ">
              <!-- CH Monogram + Label -->
              <table cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="
                    width: 28px;
                    height: 28px;
                    border: 1.5px solid #d4a017;
                    text-align: center;
                    vertical-align: middle;
                    padding: 0;
                  ">
                    <span style="
                      font-family: 'Courier New', monospace;
                      font-size: 9px;
                      font-weight: 700;
                      color: #d4a017;
                      letter-spacing: 0;
                      line-height: 1;
                    ">CH</span>
                  </td>
                  <td style="padding-left: 12px; vertical-align: middle;">
                    <span style="
                      font-family: 'Courier New', monospace;
                      font-size: 9px;
                      letter-spacing: 0.12em;
                      text-transform: uppercase;
                      color: #999999;
                    ">Portfolio Contact — New Message</span>
                  </td>
                </tr>
              </table>

              <!-- Subject -->
              <p style="
                margin: 16px 0 0;
                font-family: 'Courier New', monospace;
                font-size: 20px;
                font-weight: 600;
                color: #171717;
                line-height: 1.3;
                letter-spacing: -0.01em;
              ">${subject}</p>
            </td>
          </tr>

          <!-- Sender Details -->
          <tr>
            <td style="padding: 24px 32px; border-bottom: 1px solid #e0e0e0;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0">

                <!-- From -->
                <tr>
                  <td style="
                    padding: 8px 0;
                    width: 130px;
                    vertical-align: top;
                    font-family: 'Courier New', monospace;
                    font-size: 9px;
                    letter-spacing: 0.12em;
                    text-transform: uppercase;
                    color: #999999;
                  ">From</td>
                  <td style="
                    padding: 8px 0;
                    vertical-align: top;
                    font-family: 'Courier New', monospace;
                    font-size: 13px;
                    color: #171717;
                  ">${name}</td>
                </tr>

                <!-- Divider -->
                <tr>
                  <td colspan="2" style="
                    height: 1px;
                    background-color: #f0f0f0;
                    padding: 0;
                    font-size: 0;
                    line-height: 0;
                  ">&nbsp;</td>
                </tr>

                <!-- Email -->
                <tr>
                  <td style="
                    padding: 8px 0;
                    width: 130px;
                    vertical-align: top;
                    font-family: 'Courier New', monospace;
                    font-size: 9px;
                    letter-spacing: 0.12em;
                    text-transform: uppercase;
                    color: #999999;
                  ">Reply To</td>
                  <td style="
                    padding: 8px 0;
                    vertical-align: top;
                  ">
                    <a href="mailto:${email}" style="
                      font-family: 'Courier New', monospace;
                      font-size: 13px;
                      color: #d4a017;
                      text-decoration: none;
                    ">${email}</a>
                  </td>
                </tr>

                ${organization ? `
                <!-- Divider -->
                <tr>
                  <td colspan="2" style="
                    height: 1px;
                    background-color: #f0f0f0;
                    padding: 0;
                    font-size: 0;
                    line-height: 0;
                  ">&nbsp;</td>
                </tr>

                <!-- Organisation -->
                <tr>
                  <td style="
                    padding: 8px 0;
                    width: 130px;
                    vertical-align: top;
                    font-family: 'Courier New', monospace;
                    font-size: 9px;
                    letter-spacing: 0.12em;
                    text-transform: uppercase;
                    color: #999999;
                  ">Organisation</td>
                  <td style="
                    padding: 8px 0;
                    vertical-align: top;
                    font-family: 'Courier New', monospace;
                    font-size: 13px;
                    color: #171717;
                  ">${organization}</td>
                </tr>
                ` : ""}

              </table>
            </td>
          </tr>

          <!-- Message Body -->
          <tr>
            <td style="padding: 24px 32px; border-bottom: 1px solid #e0e0e0;">
              <p style="
                margin: 0 0 12px;
                font-family: 'Courier New', monospace;
                font-size: 9px;
                letter-spacing: 0.12em;
                text-transform: uppercase;
                color: #999999;
              ">Message</p>
              <p style="
                margin: 0;
                font-family: 'Courier New', monospace;
                font-size: 13px;
                color: #444444;
                line-height: 1.75;
                white-space: pre-wrap;
                word-break: break-word;
              ">${message}</p>
            </td>
          </tr>

          <!-- Reply CTA -->
          <tr>
            <td style="padding: 24px 32px; border-bottom: 1px solid #e0e0e0;">
              <a href="mailto:${email}?subject=Re: ${encodeURIComponent(subject)}" style="
                display: inline-block;
                padding: 10px 20px;
                background-color: #d4a017;
                color: #171717;
                font-family: 'Courier New', monospace;
                font-size: 10px;
                font-weight: 700;
                letter-spacing: 0.1em;
                text-transform: uppercase;
                text-decoration: none;
              ">Reply to ${name}</a>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 20px 32px; background-color: #fafafa;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="
                    font-family: 'Courier New', monospace;
                    font-size: 9px;
                    letter-spacing: 0.08em;
                    color: #bbbbbb;
                    line-height: 1.6;
                  ">
                    Chukwuemeka Hillary — Portfolio Contact Form<br />
                    Civil Engineer &amp; Software Developer<br />
                    University of Nigeria, Nsukka
                  </td>
                  <td align="right" style="
                    font-family: 'Courier New', monospace;
                    font-size: 9px;
                    letter-spacing: 0.08em;
                    color: #dddddd;
                    white-space: nowrap;
                    vertical-align: top;
                  ">
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

export async function POST(request: NextRequest) {
  if (
    !process.env.RESEND_API_KEY ||
    process.env.RESEND_API_KEY === "your_api_key_here"
  ) {
    console.error("[Contact API] RESEND_API_KEY is not configured.");
    return NextResponse.json(
      { error: "Email service is not configured. Please try again later." },
      { status: 503 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid request body." },
      { status: 400 }
    );
  }

  const payload = validatePayload(body);
  if (!payload) {
    return NextResponse.json(
      { error: "Please fill in all required fields correctly." },
      { status: 422 }
    );
  }

  try {
    const { error } = await resend.emails.send({
      from: "Chukwuemeka Hillary <onboarding@resend.dev>",
      to: [CONTACT_EMAIL],
      replyTo: payload.email,
      subject: `[Portfolio] ${payload.subject}`,
      html: buildEmailHtml(payload),
    });

    if (error) {
      console.error("[Contact API] Resend delivery error:", error);
      return NextResponse.json(
        { error: "Failed to send message. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Message sent successfully." },
      { status: 200 }
    );
  } catch (err) {
    console.error("[Contact API] Unexpected error:", err);
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again." },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ error: "Method not allowed." }, { status: 405 });
}
