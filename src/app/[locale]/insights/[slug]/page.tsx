import { isLocale } from "@/i18n/config";
import { redirect } from "next/navigation";

/** Insight articles are disabled until real corporate news is provided. */
export default async function InsightDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) redirect("/en");
  redirect(`/${locale}`);
}
