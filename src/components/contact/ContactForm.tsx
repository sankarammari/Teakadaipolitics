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
  if (!values.name.trim()) errors.name = "உங்கள் பெயரை உள்ளிடுங்கள்.";
  if (!values.email.trim()) errors.email = "உங்கள் மின்னஞ்சல் முகவரியை உள்ளிடுங்கள்.";
  else if (!EMAIL_PATTERN.test(values.email.trim())) errors.email = "name@example.com போன்ற சரியான மின்னஞ்சல் முகவரியை உள்ளிடுங்கள்.";
  if (!values.subject.trim()) errors.subject = "பொருளை உள்ளிடுங்கள்.";
  if (values.message.trim().length < 10) errors.message = "குறைந்தது 10 எழுத்துகள் கொண்ட செய்தியை எழுதுங்கள்.";
  return errors;
}

const labels: Record<keyof Fields, string> = {
  name: "பெயர்",
  email: "மின்னஞ்சல்",
  subject: "பொருள்",
  message: "செய்தி",
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
          இணையவழிச் சமர்ப்பிப்பு இன்னும் தொடங்கப்படவில்லை. படிவத்தை நிரப்பி உங்கள் செய்தியைச் சரிபார்த்து, பிறகு மின்னஞ்சல் மூலம் அனுப்பலாம்:{" "}
          <a className="font-semibold underline" href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a>.
        </p>
      )}

      <form ref={formRef} onSubmit={onSubmit} noValidate data-anim-children="fadeUp" className="grid gap-5">
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
            பொருள் <span className="text-opinion" aria-hidden>*</span>
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
            செய்தி <span className="text-opinion" aria-hidden>*</span>
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
          <span className="text-opinion" aria-hidden>*</span> கட்டாயம்
        </p>

        <div>
          <button
            type="submit"
            disabled={status === "sending"}
            className="rounded-full bg-ink px-6 py-2.5 font-semibold text-paper hover:bg-ink/85 disabled:opacity-60"
          >
            {status === "sending" ? "அனுப்பப்படுகிறது" : endpoint ? "செய்தியை அனுப்பு" : "செய்தியைச் சரிபார்"}
          </button>
        </div>
      </form>

      <div aria-live="polite" className="mt-6">
        {status === "offline" && (
          <div className="rounded-md border border-rule bg-white px-4 py-4">
            <p className="font-semibold">உங்கள் செய்தி முழுமையாக உள்ளது, ஆனால் இன்னும் அனுப்பப்படவில்லை.</p>
            <p className="mt-1 text-sm text-ink-soft">
              இணையவழிச் சமர்ப்பிப்பு இன்னும் செயல்படவில்லை. {siteConfig.contactEmail} முகவரிக்கு அனுப்ப, உங்கள் மின்னஞ்சல் செயலியில் திறந்துகொள்ளுங்கள்.
            </p>
            <a
              href={mailto}
              className="mt-3 inline-flex items-center gap-2 rounded-full border-2 border-ink px-4 py-1.5 text-sm font-semibold hover:bg-ink hover:text-paper"
            >
              <Mail className="size-4" aria-hidden /> மின்னஞ்சல் செயலியில் திற
            </a>
          </div>
        )}
        {status === "sent" && (
          <p className="flex items-center gap-2 rounded-md bg-white px-4 py-3 font-semibold text-analysis">
            <CheckCircle2 className="size-5" aria-hidden /> செய்தி அனுப்பப்பட்டது. ஒவ்வொரு செய்தியையும் படிக்கிறோம்; இயன்றவரை பதில் அனுப்புவோம்.
          </p>
        )}
        {status === "failed" && (
          <p className="flex items-center gap-2 rounded-md bg-white px-4 py-3 font-semibold text-opinion">
            <AlertCircle className="size-5" aria-hidden /> உங்கள் செய்தி அனுப்பப்படவில்லை. இணைய இணைப்பைச் சரிபார்த்து மீண்டும் முயலுங்கள், அல்லது {siteConfig.contactEmail} முகவரிக்கு மின்னஞ்சல் அனுப்புங்கள்.
          </p>
        )}
      </div>
    </div>
  );
}
