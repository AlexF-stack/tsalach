"use client";

import {
  useDictionary,
  useLocale,
} from "@/components/providers/LocaleProvider";
import { Reveal } from "@/components/tsa/Reveal";
import { brandAssets } from "@/content/brand";
import { FormEvent, useState } from "react";

export function TsaContact() {
  const dictionary = useDictionary();
  const { locale } = useLocale();
  const [status, setStatus] = useState<"idle" | "sent" | "error" | "sending">(
    "idle",
  );
  const address = brandAssets.address[locale];

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.checkValidity()) {
      setStatus("error");
      return;
    }

    const data = new FormData(form);
    setStatus("sending");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: String(data.get("name") || ""),
          email: String(data.get("email") || ""),
          message: String(data.get("message") || ""),
          website: String(data.get("website") || ""),
        }),
      });
      if (!res.ok) throw new Error("fail");
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  };

  return (
    <section
      id="contact"
      data-nav-surface="light"
      data-tone="light"
      className="lg:grid lg:min-h-[70vh] lg:grid-cols-2"
      aria-labelledby="contact-heading"
    >
      <div className="bg-[color:var(--ink)] px-6 py-16 sm:px-10 lg:px-12 lg:py-20 xl:px-16">
        <Reveal effect="slideRight">
          <p className="label-act text-[color:var(--accent)]">
            {dictionary.contact.actLabel}
          </p>
          <h2
            id="contact-heading"
            className="font-display mt-4 text-[clamp(1.75rem,4vw,2.75rem)] font-bold leading-tight text-white"
          >
            {dictionary.contact.title}
          </h2>
          <p className="mt-5 max-w-md text-white/65">
            {dictionary.contact.invite}
          </p>
        </Reveal>

        <Reveal effect="slideRight" delay={0.1}>
          <address className="card-soft mt-10 bg-white/5 p-6 not-italic backdrop-blur-sm sm:p-7">
            <p className="font-display text-lg font-semibold text-[color:var(--accent)]">
              {dictionary.contact.entity}
            </p>
            <p className="mt-5 text-sm text-white/55">
              {dictionary.ui.address}
            </p>
            <p className="mt-1 text-white">{address}</p>

            <p className="mt-5 text-sm text-white/55">{dictionary.ui.phone}</p>
            <a
              className="mt-1 flex min-h-11 items-center text-white transition hover:text-[color:var(--accent)]"
              href={`tel:${brandAssets.phoneTel}`}
            >
              {brandAssets.phone}
            </a>
            <a
              className="flex min-h-11 items-center text-white transition hover:text-[color:var(--accent)]"
              href={`tel:${brandAssets.phoneSecondaryTel}`}
            >
              {brandAssets.phoneSecondary}
            </a>

            <p className="mt-5 text-sm text-white/55">Email</p>
            <a
              className="mt-1 flex min-h-11 items-center break-all text-white transition hover:text-[color:var(--accent)]"
              href={`mailto:${brandAssets.email}`}
            >
              {brandAssets.email}
            </a>

            <p className="mt-5 text-sm text-white/55">
              {dictionary.ui.website}
            </p>
            <a
              className="mt-1 flex min-h-11 items-center break-all text-[color:var(--accent)] hover:underline"
              href={brandAssets.portalUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {brandAssets.website}
            </a>
          </address>

          <a
            href={brandAssets.companyProfileSrc}
            download={brandAssets.companyProfileDownloadName}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary mt-8 !border-white/30 !bg-transparent !text-white hover:!border-[color:var(--accent)] hover:!bg-[color:var(--accent)]"
          >
            {dictionary.ui.downloadProfile}
          </a>
        </Reveal>
      </div>

      <div className="bg-[color:var(--accent-soft)] px-6 py-16 sm:px-10 lg:px-12 lg:py-20 xl:px-16">
        <Reveal effect="slideLeft" delay={0.08}>
          <form
            onSubmit={onSubmit}
            className="card-soft bg-white p-6 ring-1 ring-[color:var(--ink)]/8 md:p-8"
            aria-label={dictionary.ui.contactForm}
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="block text-sm">
                <span className="mb-2 block text-[0.8rem] font-semibold tracking-[0.02em] text-[color:var(--ink)]">
                  {dictionary.ui.name}
                </span>
                <input
                  name="name"
                  required
                  autoComplete="name"
                  placeholder={dictionary.ui.name}
                />
              </label>
              <label className="block text-sm">
                <span className="mb-2 block text-[0.8rem] font-semibold tracking-[0.02em] text-[color:var(--ink)]">
                  {dictionary.ui.email}
                </span>
                <input
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder={dictionary.ui.email}
                />
              </label>
            </div>
            <label className="mt-5 block text-sm">
              <span className="mb-2 block text-[0.8rem] font-semibold tracking-[0.02em] text-[color:var(--ink)]">
                {dictionary.ui.message}
              </span>
              <textarea
                name="message"
                rows={5}
                required
                placeholder={dictionary.ui.message}
              />
            </label>
            <input
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              className="hidden"
              aria-hidden
            />
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <button
                type="submit"
                className="btn-primary"
                disabled={status === "sending"}
              >
                {dictionary.ui.send}
              </button>
              {status === "sent" ? (
                <p className="text-sm text-[color:var(--accent)]">
                  {dictionary.ui.sent}
                </p>
              ) : null}
              {status === "error" ? (
                <p className="text-sm text-[color:var(--accent-hover)]">
                  {dictionary.ui.formError}
                </p>
              ) : null}
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
