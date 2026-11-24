"use client";

import { FormEvent, useRef, useState } from "react";
import { Reveal } from "@/components/motion";

type FormState = { status: "idle" | "sending" | "success" | "error"; message: string };

export function ContactForm() {
  const [state, setState] = useState<FormState>({ status: "idle", message: "" });
  const submissionLock = useRef(false);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submissionLock.current) return;
    submissionLock.current = true;
    const form = event.currentTarget;
    const formData = new FormData(form);
    setState({ status: "sending", message: "Sending your message…" });
    try {
      const response = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(Object.fromEntries(formData)) });
      const result = await response.json() as { ok?: boolean; error?: string };
      if (!response.ok || !result.ok) throw new Error(result.error || "The message could not be sent.");
      form.reset();
      setState({ status: "success", message: "Resend accepted your message for processing. Thank you for reaching out." });
    } catch (error) {
      setState({ status: "error", message: error instanceof Error ? error.message : "The message could not be sent. Please use LinkedIn." });
    } finally {
      submissionLock.current = false;
    }
  }

  return <form className="contact-form" onSubmit={submit}>
    <Reveal><span className="eyebrow"><i /> SEND A MESSAGE</span><h2>Tell me about it.</h2></Reveal>
    <Reveal className="form-field-reveal" delay={0.06}><div className="form-row"><label>Name<input name="name" autoComplete="name" required maxLength={100} /></label><label>Email address<input name="email" type="email" autoComplete="email" required maxLength={254} /></label></div></Reveal>
    <Reveal className="form-field-reveal" delay={0.12}><label>Subject<input name="subject" required maxLength={160} /></label></Reveal>
    <Reveal className="form-field-reveal" delay={0.18}><label>Message<textarea name="message" rows={6} required maxLength={5000} /></label></Reveal>
    <label className="honeypot" aria-hidden="true" tabIndex={-1}>Leave this field empty<input name="companyWebsite" tabIndex={-1} autoComplete="off" /></label>
    <Reveal className="form-field-reveal" delay={0.24}><button className="action-link primary" type="submit" disabled={state.status === "sending"}>{state.status === "sending" ? "Sending…" : "Send message"}<span aria-hidden="true">↗</span></button></Reveal>
    <p className={`form-status ${state.status}`} role="status" aria-live="polite">{state.message}</p>
    <p className="contact-note">Your message is submitted through the site’s configured email service. Inbox delivery can be checked in the email provider’s event log. If sending is not configured, the form will say so and direct you to LinkedIn.</p>
  </form>;
}
