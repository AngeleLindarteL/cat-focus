import { vi } from "vitest";

const enMessages = {
  popupRedirectTitle: "Hello! Thanks for installing our extension",
  popupRedirectDescription:
    "We’ll help you set up your focus companion and preferences.",
  popupRedirectBody:
    "Continue in the options page to choose your cat, review your progress, and finish setup.",
  popupRedirectAction: "Open options",
  popupRedirectFooter:
    "You can leave and come back later. Your saved onboarding data will be ready when you return.",
  popupEyebrow: "Popup",
  homeOptionsTitle: "Extension settings",
  catStepSubmit: "Save and continue",
  onboardingStepTwoTitle: "Focus methods are next",
} as const;

type StorageState = Record<string, unknown>;

export function createChromeMock(initialState: StorageState = {}) {
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
      getMessage: vi.fn((key: keyof typeof enMessages) => {
        return enMessages[key] ?? String(key);
      }),
    },
    __storageState: storageState,
  };
}
