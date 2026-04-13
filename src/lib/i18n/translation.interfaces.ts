import { SUPPORTED_LANGUAGES, type TranslationKey } from "@/lib/i18n/translation.constants";

export type Language = (typeof SUPPORTED_LANGUAGES)[number];

export type TranslationMessageKey = `${TranslationKey}_${Language}`;
