import { useCallback, useEffect, useState } from "react";
import { getMessage, getUILanguage } from "@/lib/chrome/i18n";
import {
  SUPPORTED_LANGUAGES,
  TranslationKey,
} from "@/lib/i18n/translation.constants";
import { translationCatalog } from "@/lib/i18n/translationCatalog.constants";
import {
  userPreferencesRepository as defaultUserPreferencesRepository,
} from "@/lib/repositories";
import type {
  Language,
} from "@/lib/i18n/translation.interfaces";
import type { UserPreferencesRepository } from "@/lib/repositories";

function normalizeLanguage(value: string | null | undefined): Language {
  if (!value) {
    return "en";
  }

  return value.toLowerCase().startsWith("es") ? "es" : "en";
}

function getBrowserLanguage(): Language {
  const chromeLanguage = getUILanguage();

  if (chromeLanguage) {
    return normalizeLanguage(chromeLanguage);
  }

  if (typeof navigator !== "undefined") {
    return normalizeLanguage(navigator.language);
  }

  return "en";
}

export type UseTranslationResult = {
  language: Language;
  setLanguage: (nextLanguage: Language) => Promise<void>;
  getTranslation: (key: TranslationKey) => string;
};

export function useTranslation(
  repository: UserPreferencesRepository = defaultUserPreferencesRepository,
): UseTranslationResult {
  const [language, setLanguageState] = useState<Language>(getBrowserLanguage);
  const [hasStoredPreference, setHasStoredPreference] = useState(false);

  useEffect(() => {
    void repository.getPreferences().then((preferences) => {
      const storedLanguage = preferences?.language;

      if (storedLanguage && SUPPORTED_LANGUAGES.includes(storedLanguage)) {
        setLanguageState(storedLanguage);
        setHasStoredPreference(true);
        return;
      }

      setLanguageState(getBrowserLanguage());
      setHasStoredPreference(false);
    });
  }, [repository]);

  const setLanguage = useCallback(
    async (nextLanguage: Language) => {
      setLanguageState(nextLanguage);
      setHasStoredPreference(true);
      await repository.updatePreferences({
        language: nextLanguage,
      });
    },
    [repository],
  );

  const getTranslation = useCallback(
    (key: TranslationKey) => {
      if (hasStoredPreference) {
        return translationCatalog[language][key];
      }

      const chromeMessage = getMessage(key);

      if (chromeMessage !== key) {
        return chromeMessage;
      }

      return translationCatalog[language][key];
    },
    [hasStoredPreference, language],
  );

  return { language, setLanguage, getTranslation };
}

export { normalizeLanguage };
