"use client";

import {
  useDictionary,
  useLocale,
} from "@/components/providers/LocaleProvider";
import { BrandLogo } from "@/components/site/BrandLogo";
import { Reveal } from "@/components/site/Reveal";
import { brandAssets } from "@/content/brand";
import { FormEvent, useState } from "react";

export function SiteContact() {
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
        headers: { "Content-Type": "application/json", Accept: "application/json" },
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
      className="section-pad pb-0"
      aria-labelledby="contact-heading"
    >
      <div className="container-herna">
        <Reveal className="max-w-2xl">
          <p className="label-act">{dictionary.contact.actLabel}</p>
          <h2 id="contact-heading" className="heading-display mt-4 text-display-md">
            {dictionary.contact.title}
          </h2>
          <p className="mt-5 text-body-lg text-[color:var(--muted)]">
            {dictionary.contact.invite}
          </p>
        </Reveal>

        <div className="mt-12 grid gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <div className="mb-8 inline-flex">
              <BrandLogo
                variant="light"
                width={280}
                height={210}
                className="h-auto w-full max-w-[220px] object-contain"
                alt={`${brandAssets.holdingName} logo`}
              />
            </div>

            <address className="not-italic text-[color:var(--muted)]">
              <p className="font-display text-lg text-[color:var(--ink)]">
                {dictionary.contact.entity}
              </p>
              <p className="mt-4">
                {dictionary.ui.address}:{" "}
                <span className="text-[color:var(--ink)]">{address}</span>
              </p>
              <p className="mt-2">
                {dictionary.ui.phone}:{" "}
                <a
                  className="text-[color:var(--gold)] hover:underline"
                  href={`tel:${brandAssets.phoneTel}`}
                >
                  {brandAssets.phone}
                </a>
              </p>
              <p className="mt-2">
                {dictionary.ui.website}:{" "}
                <a
                  className="text-[color:var(--gold)] hover:underline"
                  href={brandAssets.portalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {brandAssets.website}
                </a>
              </p>
              <p className="mt-2">
                Email:{" "}
                <a
                  className="text-[color:var(--gold)] hover:underline"
                  href={`mailto:${brandAssets.email}`}
                >
                  {brandAssets.email}
                </a>
              </p>
            </address>

            {dictionary.contact.partnerPhones.length > 0 ? (
              <>
                <p className="label-act mt-10 mb-4">
                  {dictionary.contact.partnerContactsLabel}
                </p>
                <ul className="space-y-2 text-sm text-[color:var(--muted)]">
                  {dictionary.contact.partnerPhones.map((p) => (
                    <li key={p.label}>
                      {p.label}:{" "}
                      <a
                        href={`tel:${p.phoneTel}`}
                        className="text-[color:var(--ink)] hover:text-[color:var(--gold)]"
                      >
                        {p.phone}
                      </a>
                    </li>
                  ))}
                </ul>
              </>
            ) : null}

            <a
              href={brandAssets.companyProfileSrc}
              download={brandAssets.companyProfileDownloadName}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary mt-8 !rounded-xl"
            >
              {dictionary.ui.downloadProfile}
            </a>
          </Reveal>

          <Reveal className="lg:col-span-7" delay={0.08}>
            <form
              onSubmit={onSubmit}
              className="rounded-2xl border border-[color:var(--line)] bg-[color:var(--bg-elevated)] p-6 md:p-8"
              aria-label={dictionary.ui.contactForm}
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block text-sm">
                  <span className="mb-2 block text-[color:var(--muted)]">
                    {dictionary.ui.name}
                  </span>
                  <input name="name" required autoComplete="name" />
                </label>
                <label className="block text-sm">
                  <span className="mb-2 block text-[color:var(--muted)]">
                    {dictionary.ui.email}
                  </span>
                  <input
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                  />
                </label>
              </div>
              <label className="mt-4 block text-sm">
                <span className="mb-2 block text-[color:var(--muted)]">
                  {dictionary.ui.message}
                </span>
                <textarea name="message" rows={5} required />
              </label>
              {/* Honeypot — leave empty */}
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
                  <p className="text-sm text-[color:var(--gold)]">
                    {dictionary.ui.sent}
                  </p>
                ) : null}
                {status === "error" ? (
                  <p className="text-sm text-[color:var(--gold-deep)]">
                    {dictionary.ui.formError}
                  </p>
                ) : null}
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
