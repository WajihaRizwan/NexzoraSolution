import { NextResponse } from "next/server";
import { siteContact } from "@/config/site-contact";

const serviceOptions = new Set([
  "Social Media Marketing & Management",
  "UI/UX Designing",
  "Web Development",
  "App Development",
  "Video Shooting",
  "Video Editing",
  "AI Solutions",
  "Other",
]);

const budgetOptions = new Set([
  "Not Decided Yet",
  "Under $100",
  "$100 – $500",
  "$500 – $1,000",
  "$1,000 – $5,000",
  "Above $5,000",
]);

function cleanText(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

export async function POST(request: Request) {
  let fields: Record<string, unknown>;
  try {
    const payload: unknown = await request.json();
    if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
      return NextResponse.json({ success: false, message: "Please check the form and try again." }, { status: 400 });
    }
    fields = payload as Record<string, unknown>;
  } catch {
    return NextResponse.json({ success: false, message: "Please check the form and try again." }, { status: 400 });
  }

  const name = cleanText(fields.name);
  const email = cleanText(fields.email);
  const phone = cleanText(fields.phone);
  const company = cleanText(fields.company);
  const service = cleanText(fields.service);
  const budget = cleanText(fields.budget);
  const message = cleanText(fields.message);

  if (
    !name || name.length > 120 || /[\r\n\x00-\x1f]/.test(name) ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254 ||
    (phone && !/^\+?[0-9\s().-]{7,20}$/.test(phone)) ||
    company.length > 160 || !serviceOptions.has(service) ||
    (budget && !budgetOptions.has(budget)) || message.length < 10 || message.length > 5000
  ) {
    return NextResponse.json({ success: false, message: "Please check your details and make sure every required field is valid." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;
  const to = process.env.CONTACT_TO_EMAIL || siteContact.email;
  if (!apiKey || !from) {
    return NextResponse.json({
      success: false,
      message: "The contact service is not configured yet. Please try again later or contact us by email.",
    }, { status: 503 });
  }

  const idempotencyKey = request.headers.get("idempotency-key");
  const emailText = [
    "A new enquiry was submitted through the Nexzora Solution website.",
    "",
    `Name: ${name}`,
    `Email: ${email}`,
    `Phone: ${phone || "Not provided"}`,
    `Company: ${company || "Not provided"}`,
    `Selected service: ${service}`,
    `Project budget: ${budget || "Not provided"}`,
    "",
    "Project details / message:",
    message,
  ].join("\n");

  try {
    const upstream = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        ...(idempotencyKey ? { "Idempotency-Key": idempotencyKey } : {}),
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject: `Website enquiry: ${name}`,
        text: emailText,
      }),
      cache: "no-store",
      signal: AbortSignal.timeout(10_000),
    });

    if (!upstream.ok) {
      return NextResponse.json({ success: false, message: "We could not send your message right now. Please try again later or email us directly." }, { status: 502 });
    }
    return NextResponse.json({ success: true, message: "Thanks for reaching out. Your message has been sent." });
  } catch {
    return NextResponse.json({ success: false, message: "The contact service is temporarily unavailable. Please try again later." }, { status: 502 });
  }
}
