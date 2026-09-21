import en from "./messages/en.json";
import ar from "./messages/ar.json";
import type { Locale } from "./config";

export type Dictionary = typeof en;

const dictionaries: Record<Locale, Dictionary> = {
  en,
  ar,
};

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
