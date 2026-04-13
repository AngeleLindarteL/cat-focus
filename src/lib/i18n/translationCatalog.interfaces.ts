import type { TranslationKey } from "@/lib/i18n/translation.constants";
import type { Language } from "@/lib/i18n/translation.interfaces";

export type TranslationDictionary = Record<TranslationKey, string>;

export type TranslationCatalog = Record<Language, TranslationDictionary>;
