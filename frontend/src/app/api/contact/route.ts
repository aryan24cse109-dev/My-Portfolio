import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
const attempts = new Map<string, { count: number; resetAt: number }>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 5;

type ContactPayload = { name?: unknown; email?: unknown; subject?: unknown; message?: unknown; companyWebsite?: unknown };

function text(value: unknown, max: number): string | null {
  if (typeof value !== "string") return null;
  const normalized = value.trim();
  return normalized.length > 0 && normalized.length <= max ? normalized : null;
}

export async function POST(request: Request) {
  let body: ContactPayload;
  try {
    if (Number(request.headers.get("content-length") ?? 0) > 12_000) return NextResponse.json({ error: "Message is too large." }, { status: 413 });
    body = await request.json() as ContactPayload;
  } catch {
    return NextResponse.json({ error: "Please submit a valid message." }, { status: 400 });
  }

  // Quietly discard automated submissions caught by the hidden honeypot.
  if (typeof body.companyWebsite === "string" && body.companyWebsite.length > 0) return NextResponse.json({ error: "The message could not be processed." }, { status: 400 });
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const key = forwarded || request.headers.get("x-real-ip") || "unknown";
  const now = Date.now();
  for (const [ip, attempt] of attempts) if (attempt.resetAt <= now) attempts.delete(ip);
  const previous = attempts.get(key);
  if (previous && previous.count >= MAX_REQUESTS && previous.resetAt > now) return NextResponse.json({ error: "Too many messages were sent. Please try again in a few minutes." }, { status: 429 });
  attempts.set(key, { count: (previous?.count ?? 0) + 1, resetAt: previous?.resetAt ?? now + WINDOW_MS });

  const name = text(body.name, 100);
  const email = text(body.email, 254);
  const subject = text(body.subject, 160)?.replace(/[\r\n]+/g, " ");
  const message = text(body.message, 5000);
  if (!name || !email || !subject || !message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return NextResponse.json({ error: "Check each field and enter a valid email address." }, { status: 400 });

  const { RESEND_API_KEY, CONTACT_EMAIL, RESEND_FROM_EMAIL } = process.env;
  if (!RESEND_API_KEY || !CONTACT_EMAIL || !RESEND_FROM_EMAIL) return NextResponse.json({ error: "Message delivery is not configured yet. Please use LinkedIn for now." }, { status: 503 });

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST", headers: { Authorization: `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from: RESEND_FROM_EMAIL, to: [CONTACT_EMAIL], reply_to: email, subject: `Portfolio contact: ${subject}`, text: `Name: ${name}\nEmail: ${email}\n\n${message}` }),
      cache: "no-store",
      signal: AbortSignal.timeout(10_000),
    });
    if (!response.ok) return NextResponse.json({ error: "The message could not be sent. Please try again or use LinkedIn." }, { status: 502 });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "The message could not be sent. Please try again or use LinkedIn." }, { status: 502 });
  }
}
