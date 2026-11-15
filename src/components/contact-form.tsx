"use client";

import { useRef, useState } from "react";
import type { FormEvent } from "react";

const serviceOptions = [
  "Social Media Marketing & Management",
  "UI/UX Designing",
  "Web Development",
  "App Development",
  "Video Shooting",
  "Video Editing",
  "AI Solutions",
  "Other",
];

const budgetOptions = [
  "Not Decided Yet",
  "Under $100",
  "$100 – $500",
  "$500 – $1,000",
  "$1,000 – $5,000",
  "Above $5,000",
];

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const submissionLock = useRef(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    const form = event.currentTarget;
    if (submissionLock.current || !form.reportValidity()) return;

    const data = new FormData(form);
    const phone = String(data.get("phone") ?? "").trim();
    if (phone && !/^\+?[0-9\s().-]{7,20}$/.test(phone)) {
      setErrorMessage("Please enter a valid phone number, including your country code if possible.");
      return;
    }

    submissionLock.current = true;
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Idempotency-Key": crypto.randomUUID(),
        },
        body: JSON.stringify(Object.fromEntries(data.entries())),
      });
      const result = (await response.json()) as { message?: string; success?: boolean };
      if (!response.ok || !result.success) {
        setErrorMessage(result.message ?? "Your message could not be sent. Please try again later.");
        return;
      }
      form.reset();
      setSuccessMessage(result.message ?? "Your message has been sent.");
    } catch {
      setErrorMessage("We could not reach the contact service. Please try again later.");
    } finally {
      submissionLock.current = false;
      setIsSubmitting(false);
    }
  }

  return (
    <form className="contact-form contact-page-form" onSubmit={handleSubmit}>
      <div className="form-grid">
        <label>Full Name <span>*</span><input autoComplete="name" name="name" placeholder="Your full name" required maxLength={120} /></label>
        <label>Email Address <span>*</span><input autoComplete="email" name="email" type="email" placeholder="you@company.com" required maxLength={254} /></label>
        <label>Phone Number <small>(optional)</small><input autoComplete="tel" name="phone" type="tel" placeholder="+1 234 567 890" maxLength={20} /></label>
        <label>Company Name <small>(optional)</small><input autoComplete="organization" name="company" placeholder="Your company" maxLength={160} /></label>
        <label>Select a Service <span>*</span><select name="service" defaultValue="" required><option value="" disabled>Select a service</option>{serviceOptions.map((service) => <option key={service} value={service}>{service}</option>)}</select></label>
        <label>Project Budget <small>(optional)</small><select name="budget" defaultValue=""><option value="">Choose a budget</option>{budgetOptions.map((budget) => <option key={budget} value={budget}>{budget}</option>)}</select></label>
        <label className="form-field-wide">Project Details / Message <span>*</span><textarea name="message" placeholder="Tell us about your idea, goals, or project requirements..." required minLength={10} maxLength={5000} rows={6} /></label>
      </div>
      {errorMessage && <p className="form-status form-status-error" role="alert">{errorMessage}</p>}
      {successMessage && <p className="form-status form-status-success" role="status">{successMessage}</p>}
      <div className="contact-form-submit-row">
        <button className="contact-primary-button form-submit" type="submit" disabled={isSubmitting}>{isSubmitting ? "Sending..." : "Send Message"}<span aria-hidden="true">↗</span></button>
        <span>We&apos;ll only use your details to reply to your inquiry.</span>
      </div>
    </form>
  );
}
