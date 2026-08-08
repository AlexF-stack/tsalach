import type { ReactNode } from "react";
import type { Metadata } from "next";
import { headers } from "next/headers";
import { Manrope, Syne } from "next/font/google";
import { brandAssets } from "@/content/brand";
import { defaultLocale, isLocale } from "@/i18n/config";
import { ogImage } from "@/lib/seo";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-manrope",
  display: "swap",
  preload: true,
});

const syne = Syne({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-syne",
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL(brandAssets.websiteUrl),
  applicationName: brandAssets.name,
  title: {
    default: `${brandAssets.name} — ${brandAssets.fullName}`,
    template: `%s · ${brandAssets.name}`,
  },
  description:
    "TSALACH S.A. — structuring, financing, construction and infrastructures in Gabon and internationally.",
  icons: {
    icon: [
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.png", sizes: "48x48", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
    shortcut: "/favicon.png",
  },
  openGraph: {
    type: "website",
    siteName: brandAssets.name,
    title: `${brandAssets.name} — ${brandAssets.fullName}`,
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title: brandAssets.holdingName,
    images: [ogImage.url],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const headerList = await headers();
  const raw = headerList.get("x-tsalach-locale");
  const lang = raw && isLocale(raw) ? raw : defaultLocale;

  return (
    <html
      suppressHydrationWarning
      lang={lang}
      className={`light ${manrope.variable} ${syne.variable}`}
      data-theme="light"
    >
      <body className="antialiased" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
