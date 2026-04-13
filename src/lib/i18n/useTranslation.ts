import { useCallback, useEffect, useState } from "react";
import { getMessage } from "@/lib/chrome/i18n";
import {
  SUPPORTED_LANGUAGES,
  TranslationKey,
} from "@/lib/i18n/translation.constants";
import {
  userPreferencesRepository as defaultUserPreferencesRepository,
} from "@/lib/repositories/userPreferencesRepository";
import type {
  Language,
  TranslationMessageKey,
} from "@/lib/i18n/translation.interfaces";
import type { UserPreferencesRepository } from "@/lib/repositories/userPreferencesRepository";

function normalizeLanguage(value: string | null | undefined): Language {
  if (!value) {
    return "en";
  }

  return value.toLowerCase().startsWith("es") ? "es" : "en";
}

function getBrowserLanguage(): Language {
  if (typeof navigator === "undefined") {
    return "en";
  }

  return normalizeLanguage(navigator.language);
}

export type UseTranslationResult = {
  language: Language;
  setLanguage: (nextLanguage: Language) => Promise<void>;
  getTranslation: (key: TranslationKey) => string;
};

function createTranslationMessageKey(
  key: TranslationKey,
  language: Language,
): TranslationMessageKey {
  return `${key}_${language}`;
}

export function useTranslation(
  repository: UserPreferencesRepository = defaultUserPreferencesRepository,
): UseTranslationResult {
  const [language, setLanguageState] = useState<Language>(getBrowserLanguage);

  useEffect(() => {
    void repository.getPreferences().then((preferences) => {
      const storedLanguage = preferences?.language;

      if (storedLanguage && SUPPORTED_LANGUAGES.includes(storedLanguage)) {
        setLanguageState(storedLanguage);
      }
    });
  }, [repository]);

  const setLanguage = useCallback(
    async (nextLanguage: Language) => {
      setLanguageState(nextLanguage);
      await repository.savePreferences({
        language: nextLanguage,
      });
    },
    [repository],
  );

  const getTranslation = useCallback(
    (key: TranslationKey) => {
      return getMessage(createTranslationMessageKey(key, language));
    },
    [language],
  );

  return { language, setLanguage, getTranslation };
}

export { createTranslationMessageKey, normalizeLanguage };
