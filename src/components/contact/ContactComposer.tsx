"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import type { ContactCopy } from "@/data/contact-copy";

export function ContactComposer({ copy, email }: { copy: ContactCopy; email: string }) {
  const [values, setValues] = useState({ name: "", email: "", phone: "", service: "", message: "" });
  const [feedback, setFeedback] = useState("");
  const [copied, setCopied] = useState(false);

  function setValue(field: keyof typeof values, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
    setFeedback("");
    setCopied(false);
  }

  function requestText() {
    return `${copy.name}: ${values.name}\n${copy.email}: ${values.email}\n${copy.phone}: ${values.phone || "—"}\n${copy.service}: ${values.service || copy.general}\n${copy.message}:\n${values.message}`;
  }

  function validate() {
    if (!values.name.trim() || !values.email.trim() || !values.message.trim()) return copy.required;
    if (!/^\S+@\S+\.\S+$/.test(values.email.trim())) return copy.invalidEmail;
    if (values.phone && !/^[+()\d\s-]{7,}$/.test(values.phone.trim())) return copy.invalidPhone;
    if (values.message.trim().length < 12) return copy.tooShort;
    return "";
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const error = validate();
    if (error) {
      setFeedback(error);
      return;
    }
    const subject = values.service ? `${values.service} — ARBEC enquiry` : "ARBEC project enquiry";
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(requestText())}`;
    setFeedback(copy.emailOpened);
  }

  async function copyRequest() {
    const error = validate();
    if (error) {
      setFeedback(error);
      return;
    }
    try {
      await navigator.clipboard.writeText(requestText());
      setCopied(true);
      setFeedback(copy.copied);
    } catch {
      setFeedback(copy.copy);
    }
  }

  const inputClass = "w-full rounded-xl border border-line bg-ink-950/60 px-4 py-3 text-sm text-fg outline-none transition-colors placeholder:text-fg-subtle focus:border-accent-500";

  return (
    <form onSubmit={submit} className="rounded-2xl border border-line bg-white/[0.02] p-5 sm:p-7" noValidate>
      <div className="mb-6">
        <h2 className="font-display text-2xl text-fg">{copy.composerTitle}</h2>
        <p className="mt-2 text-sm leading-relaxed text-fg-muted">{copy.composerLead}</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2 text-xs font-medium text-fg-muted">{copy.name}<input className={inputClass} value={values.name} onChange={(e) => setValue("name", e.target.value)} autoComplete="name" required /></label>
        <label className="grid gap-2 text-xs font-medium text-fg-muted">{copy.email}<input className={inputClass} value={values.email} onChange={(e) => setValue("email", e.target.value)} type="email" autoComplete="email" required /></label>
        <label className="grid gap-2 text-xs font-medium text-fg-muted">{copy.phone}<input className={inputClass} value={values.phone} onChange={(e) => setValue("phone", e.target.value)} type="tel" autoComplete="tel" dir="ltr" /></label>
        <label className="grid gap-2 text-xs font-medium text-fg-muted">{copy.service}<select className={inputClass} value={values.service} onChange={(e) => setValue("service", e.target.value)}><option value="">{copy.servicePlaceholder}</option><option value={copy.supplies}>{copy.supplies}</option><option value={copy.contracting}>{copy.contracting}</option><option value={copy.general}>{copy.general}</option></select></label>
        <label className="grid gap-2 text-xs font-medium text-fg-muted sm:col-span-2">{copy.message}<textarea className={`${inputClass} min-h-32 resize-y`} value={values.message} onChange={(e) => setValue("message", e.target.value)} placeholder={copy.messagePlaceholder} required /></label>
      </div>
      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
        <button type="submit" className="inline-flex min-h-11 items-center justify-center rounded-full bg-accent-500 px-6 text-sm font-semibold text-ink-950 transition-colors hover:bg-accent-400">{copy.submit}</button>
        <button type="button" onClick={copyRequest} className="inline-flex min-h-11 items-center justify-center rounded-full border border-line px-6 text-sm font-medium text-fg transition-colors hover:border-accent-500/60">{copied ? copy.copied : copy.copy}</button>
      </div>
      {feedback && <p role="status" className="mt-4 text-sm leading-relaxed text-accent-300">{feedback}</p>}
      <p className="mt-4 text-xs leading-relaxed text-fg-subtle">{copy.localOnly}</p>
    </form>
  );
}
