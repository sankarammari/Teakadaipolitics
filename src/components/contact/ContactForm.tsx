"use client";

import { AlertCircle, CheckCircle2, Mail } from "lucide-react";
import { useRef, useState } from "react";
import { siteConfig } from "@/config/site";

type Fields = { name: string; email: string; subject: string; message: string };
type Errors = Partial<Record<keyof Fields, string>>;
type Status = "idle" | "sending" | "sent" | "failed" | "offline";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validate(values: Fields): Errors {
  const errors: Errors = {};
  if (!values.name.trim()) errors.name = "Enter your name.";
  if (!values.email.trim()) errors.email = "Enter your email address.";
  else if (!EMAIL_PATTERN.test(values.email.trim())) errors.email = "Enter an email address like name@example.com.";
  if (!values.subject.trim()) errors.subject = "Enter a subject.";
  if (values.message.trim().length < 10) errors.message = "Write a message of at least 10 characters.";
  return errors;
}

const labels: Record<keyof Fields, string> = {
  name: "Name",
  email: "Email",
  subject: "Subject",
  message: "Message",
};

/**
 * Validates in the browser. Without a configured form endpoint it never
 * pretends to send: it says submission is not live and offers an email link.
 */
export function ContactForm() {
  const [values, setValues] = useState<Fields>({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");
  const formRef = useRef<HTMLFormElement>(null);
  const endpoint = siteConfig.contactFormEndpoint;

  const set = (key: keyof Fields) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValues((v) => ({ ...v, [key]: e.target.value }));
    if (errors[key]) setErrors((err) => ({ ...err, [key]: undefined }));
  };

  const mailto = `mailto:${siteConfig.contactEmail}?subject=${encodeURIComponent(values.subject)}&body=${encodeURIComponent(
    `${values.message}\n\n${values.name}\n${values.email}`,
  )}`;

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    const firstInvalid = (Object.keys(labels) as (keyof Fields)[]).find((k) => found[k]);
    if (firstInvalid) {
      formRef.current?.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
      return;
    }

    if (!endpoint) {
      setStatus("offline");
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("sent");
      setValues({ name: "", email: "", subject: "", message: "" });
    } catch {
      setStatus("failed");
    }
  };

  const input = (key: keyof Fields) =>
    `w-full rounded-md border bg-white px-3.5 py-2.5 ${errors[key] ? "border-opinion" : "border-rule focus:border-ink"}`;

  const errorText = (key: keyof Fields) =>
    errors[key] && (
      <p id={`${key}-error`} className="mt-1.5 flex items-center gap-1 text-sm font-semibold text-opinion">
        <AlertCircle className="size-4" aria-hidden /> {errors[key]}
      </p>
    );

  const describedBy = (key: keyof Fields) => (errors[key] ? `${key}-error` : undefined);

  return (
    <div>
      {!endpoint && (
        <p className="mb-6 rounded-md bg-tea-light px-4 py-3 text-sm">
          Online submission isn’t switched on yet. You can fill in the form to check your message, then send it by
          email to <a className="font-semibold underline" href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a>.
        </p>
      )}

      <form ref={formRef} onSubmit={onSubmit} noValidate className="grid gap-5">
        <div className="grid gap-5 sm:grid-cols-2">
          {(["name", "email"] as const).map((key) => (
            <div key={key}>
              <label htmlFor={key} className="mb-1.5 block font-semibold">
                {labels[key]} <span className="text-opinion" aria-hidden>*</span>
              </label>
              <input
                id={key}
                name={key}
                type={key === "email" ? "email" : "text"}
                autoComplete={key === "email" ? "email" : "name"}
                required
                value={values[key]}
                onChange={set(key)}
                aria-invalid={Boolean(errors[key])}
                aria-describedby={describedBy(key)}
                className={input(key)}
              />
              {errorText(key)}
            </div>
          ))}
        </div>

        <div>
          <label htmlFor="subject" className="mb-1.5 block font-semibold">
            Subject <span className="text-opinion" aria-hidden>*</span>
          </label>
          <input
            id="subject"
            name="subject"
            required
            value={values.subject}
            onChange={set("subject")}
            aria-invalid={Boolean(errors.subject)}
            aria-describedby={describedBy("subject")}
            className={input("subject")}
          />
          {errorText("subject")}
        </div>

        <div>
          <label htmlFor="message" className="mb-1.5 block font-semibold">
            Message <span className="text-opinion" aria-hidden>*</span>
          </label>
          <textarea
            id="message"
            name="message"
            rows={6}
            required
            value={values.message}
            onChange={set("message")}
            aria-invalid={Boolean(errors.message)}
            aria-describedby={describedBy("message")}
            className={input("message")}
          />
          {errorText("message")}
        </div>

        <p className="text-sm text-ink-soft">
          <span className="text-opinion" aria-hidden>*</span> Required
        </p>

        <div>
          <button
            type="submit"
            disabled={status === "sending"}
            className="rounded-full bg-ink px-6 py-2.5 font-semibold text-paper hover:bg-ink/85 disabled:opacity-60"
          >
            {status === "sending" ? "Sending message" : endpoint ? "Send message" : "Check message"}
          </button>
        </div>
      </form>

      <div aria-live="polite" className="mt-6">
        {status === "offline" && (
          <div className="rounded-md border border-rule bg-white px-4 py-4">
            <p className="font-semibold">Your message looks complete, but it has not been sent.</p>
            <p className="mt-1 text-sm text-ink-soft">
              Online submission isn’t live yet. Open it in your email app to send it to {siteConfig.contactEmail}.
            </p>
            <a
              href={mailto}
              className="mt-3 inline-flex items-center gap-2 rounded-full border-2 border-ink px-4 py-1.5 text-sm font-semibold hover:bg-ink hover:text-paper"
            >
              <Mail className="size-4" aria-hidden /> Open in email app
            </a>
          </div>
        )}
        {status === "sent" && (
          <p className="flex items-center gap-2 rounded-md bg-white px-4 py-3 font-semibold text-analysis">
            <CheckCircle2 className="size-5" aria-hidden /> Message sent. We read every message, and reply when we can.
          </p>
        )}
        {status === "failed" && (
          <p className="flex items-center gap-2 rounded-md bg-white px-4 py-3 font-semibold text-opinion">
            <AlertCircle className="size-5" aria-hidden /> Your message wasn’t sent. Check your connection and try
            again, or email {siteConfig.contactEmail}.
          </p>
        )}
      </div>
    </div>
  );
}
