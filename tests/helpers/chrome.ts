import { vi } from "vitest";
import { translationCatalog, type Language, type TranslationKey } from "@/lib/i18n";
import type { ExtensionInstallType } from "@/lib/chrome/management";

type StorageState = Record<string, unknown>;

function toUiLanguage(language: Language): string {
  return language === "es" ? "es-ES" : "en-US";
}

export function createChromeMock(
  initialState: StorageState = {},
  uiLanguage: Language = "en",
  installType: ExtensionInstallType = "normal",
) {
  const storageState: StorageState = { ...initialState };

  return {
    runtime: {
      openOptionsPage: vi.fn().mockResolvedValue(undefined),
    },
    storage: {
      local: {
        get: vi.fn(async (keys: string[]) => {
          return keys.reduce<Record<string, unknown>>((result, key) => {
            if (key in storageState) {
              result[key] = storageState[key];
            }

            return result;
          }, {});
        }),
        set: vi.fn(async (values: Record<string, unknown>) => {
          Object.assign(storageState, values);
        }),
      },
    },
    i18n: {
      getMessage: vi.fn((key: TranslationKey) => {
        return translationCatalog[uiLanguage][key] ?? String(key);
      }),
      getUILanguage: vi.fn(() => toUiLanguage(uiLanguage)),
    },
    management: {
      getSelf: vi.fn(async () => ({
        installType,
      })),
    },
    __storageState: storageState,
  };
}
