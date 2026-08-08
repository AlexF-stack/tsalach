import { brandAssets } from "@/content/brand";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/en";

export function JsonLd({
  locale,
  dictionary,
}: {
  locale: Locale;
  dictionary: Dictionary;
}) {
  const street =
    locale === "fr" ? brandAssets.address.fr : brandAssets.address.en;

  const organization = {
    "@type": ["Organization", "ProfessionalService"],
    "@id": `${brandAssets.websiteUrl}/#organization`,
    name: brandAssets.holdingName,
    legalName: brandAssets.holdingName,
    alternateName: [brandAssets.name, brandAssets.fullName],
    url: brandAssets.websiteUrl,
    logo: {
      "@type": "ImageObject",
      url: `${brandAssets.websiteUrl}${brandAssets.logoOpaqueSrc}`,
    },
    image: `${brandAssets.websiteUrl}${brandAssets.coverSrc}`,
    description: dictionary.meta.description,
    email: brandAssets.email,
    telephone: [brandAssets.phoneTel, brandAssets.phoneSecondaryTel],
    address: {
      "@type": "PostalAddress",
      streetAddress: street,
      addressLocality: "Libreville",
      addressRegion: "Estuaire",
      addressCountry: "GA",
    },
    areaServed: [
      { "@type": "Country", name: "Gabon" },
      { "@type": "City", name: "Libreville" },
      { "@type": "Place", name: "Africa" },
    ],
    knowsAbout: [
      "Real estate development",
      "Infrastructure",
      "Public-Private Partnerships (PPP)",
      "EPC contracting",
      "Project finance",
      "Structured finance",
      "General contracting",
      "Civil engineering",
      "Public works",
      "Housing",
      "Public facilities",
      "Urban development",
    ],
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: brandAssets.phoneTel,
        contactType: "customer service",
        email: brandAssets.email,
        areaServed: "GA",
        availableLanguage: ["French", "English"],
      },
    ],
    sameAs: [brandAssets.websiteUrl].filter(Boolean),
  };

  const website = {
    "@type": "WebSite",
    "@id": `${brandAssets.websiteUrl}/#website`,
    url: brandAssets.websiteUrl,
    name: brandAssets.holdingName,
    alternateName: brandAssets.fullName,
    description: dictionary.meta.description,
    publisher: { "@id": `${brandAssets.websiteUrl}/#organization` },
    inLanguage: ["en", "fr"],
  };

  const data = {
    "@context": "https://schema.org",
    "@graph": [organization, website],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
