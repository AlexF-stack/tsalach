import { isLocale } from "@/i18n/config";
import { redirect } from "next/navigation";

/** Insights are disabled until real corporate news is provided. */
export default async function InsightsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) redirect("/en");
  redirect(`/${locale}`);
}
