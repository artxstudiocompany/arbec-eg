import { notFound } from "next/navigation";
import { locale as localeParam } from "next/root-params";
import { isLocale, type Locale } from "./config";

/** Resolve and validate the current locale from the `[locale]` root segment. */
export async function getLocale(): Promise<Locale> {
  const value = await localeParam();
  if (!isLocale(value)) notFound();
  return value;
}
