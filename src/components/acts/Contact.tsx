"use client";

import { ChapterNumber } from "@/components/ui/ChapterNumber";
import {
  useDictionary,
  useLocale,
} from "@/components/providers/LocaleProvider";
import { brandAssets } from "@/content/brand";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { MapPin, FileText } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FormEvent, useState } from "react";

export function Contact() {
  const dictionary = useDictionary();
  const { locale } = useLocale();
  const [status, setStatus] = useState<"idle" | "sent" | "error" | "sending">(
    "idle",
  );
  const address = brandAssets.address[locale];
  const formspreeId = process.env.NEXT_PUBLIC_FORMSPREE_ID;

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.checkValidity()) {
      setStatus("error");
      return;
    }

    if (!formspreeId) {
      setStatus("sent");
      form.reset();
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch(`https://formspree.io/f/${formspreeId}`, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
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
      className="relative z-20 pt-24 md:pt-32"
      aria-labelledby="contact-heading"
    >
      <div className="gold-divider mb-16" />

      <div className="container-herna">
        <ChapterNumber number="07" label={dictionary.contact.actLabel} />
        <h2
          id="contact-heading"
          className="heading-display mt-2 max-w-[18ch] text-display-md"
        >
          {dictionary.brand.closing}
        </h2>

        <div className="mt-16 grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <div className="mb-8 flex max-w-sm items-center justify-center">
              <Image
                src={brandAssets.logoClearSrc}
                alt={`${brandAssets.holdingName} logo`}
                width={420}
                height={320}
                className="h-auto w-full max-w-[280px] object-contain"
              />
            </div>

            <h3 className="heading-display text-display-sm">
              {dictionary.contact.title}
            </h3>
            <p className="mt-5 max-w-xl text-body-lg text-text-gray">
              {dictionary.contact.invite}
            </p>

            <p className="label-act mt-12 mb-6">
              {dictionary.contact.partnerContactsLabel}
            </p>

            <address className="not-italic text-body leading-[1.8] text-text-gray">
              <p className="font-display text-lg text-off-white">
                {dictionary.contact.entity}
              </p>
              <p className="mt-3">
                {dictionary.ui.address}:{" "}
                <span className="text-off-white">{address}</span>
              </p>
              <p className="mt-2">
                {dictionary.ui.phone}:{" "}
                <a
                  href={`tel:${brandAssets.phoneTel}`}
                  className="link-underline text-gold-light"
                >
                  {brandAssets.phone}
                </a>
              </p>
              <p className="mt-2">
                {dictionary.ui.email}:{" "}
                <a
                  href={`mailto:${brandAssets.email}`}
                  className="link-underline text-gold-light"
                >
                  {brandAssets.email}
                </a>
              </p>
              <p className="mt-2">
                {dictionary.ui.website}:{" "}
                <a
                  href={brandAssets.websiteUrl}
                  className="link-underline text-gold-light"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {brandAssets.website}
                </a>
              </p>
              {dictionary.contact.partnerPhones.length > 0 ? (
                <ul className="mt-8 space-y-2">
                  {dictionary.contact.partnerPhones.map((item) => (
                    <li key={item.label}>
                      {item.label}:{" "}
                      <a
                        href={`tel:${item.phoneTel}`}
                        className="link-underline text-gold-light"
                      >
                        {item.phone}
                      </a>
                    </li>
                  ))}
                </ul>
              ) : null}
            </address>
          </div>

          <div className="flex flex-col gap-10 lg:col-span-7">
            <div
              className="glass-panel relative flex min-h-[220px] items-end overflow-hidden p-6 md:min-h-[280px]"
              role="img"
              aria-label={dictionary.ui.mapPlaceholder}
            >
              <div
                className="absolute inset-0 opacity-40"
                style={{
                  background:
                    "radial-gradient(circle at 55% 45%, color-mix(in srgb, var(--gold-primary) 35%, transparent), transparent 55%), linear-gradient(135deg, var(--logo-navy), var(--bg-black))",
                }}
              />
              <div className="relative z-10 flex items-center gap-3 text-sm text-off-white">
                <MapPin className="h-4 w-4 text-gold-primary" aria-hidden />
                <span>{dictionary.ui.mapPlaceholder}</span>
              </div>
            </div>

            <form
              onSubmit={onSubmit}
              className="flex flex-col gap-6"
              noValidate
              aria-label={dictionary.ui.contactForm}
            >
              <label className="flex flex-col gap-2 text-sm text-text-gray">
                {dictionary.ui.name}
                <input
                  name="name"
                  type="text"
                  required
                  autoComplete="name"
                  className="border-b border-[color:var(--border)] bg-transparent py-3 text-off-white outline-none transition-colors duration-[600ms] ease-out focus:border-gold-primary"
                />
              </label>
              <label className="flex flex-col gap-2 text-sm text-text-gray">
                {dictionary.ui.email}
                <input
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className="border-b border-[color:var(--border)] bg-transparent py-3 text-off-white outline-none transition-colors duration-[600ms] ease-out focus:border-gold-primary"
                />
              </label>
              <label className="flex flex-col gap-2 text-sm text-text-gray">
                {dictionary.ui.message}
                <textarea
                  name="message"
                  required
                  rows={4}
                  className="resize-y border-b border-[color:var(--border)] bg-transparent py-3 text-off-white outline-none transition-colors duration-[600ms] ease-out focus:border-gold-primary"
                />
              </label>
              <MagneticButton
                type="submit"
                className="link-outline mt-2 self-start"
              >
                {dictionary.ui.send}
              </MagneticButton>
              <a
                href={brandAssets.companyProfileSrc}
                className="mt-2 inline-flex items-center gap-2 text-sm text-text-gray link-underline"
                download={brandAssets.companyProfileDownloadName}
              >
                <FileText className="h-4 w-4" aria-hidden />
                {dictionary.ui.downloadProfile}
              </a>
              {status === "sent" && (
                <p className="text-sm text-gold-light" role="status">
                  {dictionary.ui.sent}
                </p>
              )}
              {status === "error" && (
                <p className="text-sm text-[#E8A0A0]" role="alert">
                  {dictionary.ui.formError}
                </p>
              )}
            </form>
          </div>
        </div>

        <footer className="mt-24 border-t border-[color:var(--border)] pb-10 pt-10">
          <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
            <div>
              <p className="font-display text-xl tracking-[0.12em] text-off-white">
                {brandAssets.name}
              </p>
              <p className="mt-2 text-sm text-text-gray">
                {brandAssets.fullName}
              </p>
              <p className="mt-6 max-w-sm text-sm text-text-gray">
                {dictionary.legal.copyright}
              </p>
            </div>
            <nav
              className="flex flex-col gap-3 text-sm text-text-gray sm:flex-row sm:gap-8"
              aria-label="Legal"
            >
              <Link
                href={`/${locale}/legal-notice`}
                className="link-underline"
              >
                {dictionary.ui.legalNotice}
              </Link>
              <Link
                href={`/${locale}/privacy-policy`}
                className="link-underline"
              >
                {dictionary.ui.privacyPolicy}
              </Link>
              <a href="#hero" className="link-underline">
                {dictionary.ui.backHome}
              </a>
            </nav>
          </div>
        </footer>
      </div>
    </section>
  );
}
