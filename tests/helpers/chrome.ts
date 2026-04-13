import { vi } from "vitest";

const messages = {
  popupRedirectTitle_en: "Hello! Thanks for installing our extension",
  popupRedirectTitle_es: "¡Hola! Gracias por instalar nuestra extensión",
  popupRedirectDescription_en:
    "We’ll help you set up your focus companion and preferences.",
  popupRedirectDescription_es:
    "Te ayudaremos a configurar tu compañero de enfoque y tus preferencias.",
  popupRedirectBody_en:
    "Continue in the options page to choose your cat, review your progress, and finish setup.",
  popupRedirectBody_es:
    "Continúa en la página de opciones para elegir tu gato, revisar tu progreso y terminar la configuración.",
  popupRedirectAction_en: "Open options",
  popupRedirectAction_es: "Abrir opciones",
  popupRedirectFooter_en:
    "You can leave and come back later. Your saved onboarding data will be ready when you return.",
  popupRedirectFooter_es:
    "Puedes salir y volver luego. Tus datos guardados del onboarding estarán listos cuando regreses.",
  popupEyebrow_en: "Popup",
  popupEyebrow_es: "Popup",
  homeOptionsTitle_en: "Extension settings",
  homeOptionsTitle_es: "Configuración de la extensión",
  catStepSubmit_en: "Save and continue",
  catStepSubmit_es: "Guardar y continuar",
  stepTwoTitle_en: "Choose how you want to block distractions",
  stepTwoTitle_es: "Elige cómo bloquear distracciones",
  onboardingEyebrow_en: "Onboarding",
  onboardingEyebrow_es: "Onboarding",
  onboardingTitle_en: "Set up Cat Focus",
  onboardingTitle_es: "Configura Cat Focus",
  onboardingDescription_en:
    "Finish your first setup to personalize the extension and unlock the default popup and options experience.",
  onboardingDescription_es:
    "Completa tu primera configuración para personalizar la extensión y desbloquear la experiencia normal del popup y opciones.",
  onboardingStepOneLabel_en: "Choose your cat",
  onboardingStepOneLabel_es: "Elige tu gato",
  onboardingStepTwoLabel_en: "Set your schedule",
  onboardingStepTwoLabel_es: "Configura tu horario",
  onboardingStepThreeLabel_en: "Finish setup",
  onboardingStepThreeLabel_es: "Termina la configuración",
  languageLabel_en: "Language",
  languageLabel_es: "Idioma",
  languageEnglish_en: "English",
  languageEnglish_es: "Inglés",
  languageSpanish_en: "Spanish",
  languageSpanish_es: "Español",
  homeOptionsDescription_en:
    "This options surface is ready for persisted settings and feature-specific forms.",
  homeOptionsDescription_es:
    "Esta superficie de opciones está lista para preferencias persistidas y formularios específicos por funcionalidad.",
  homeOptionsBody_en:
    "Use this page as the home for storage-backed preferences, Chrome API integrations, and module-specific configuration screens.",
  homeOptionsBody_es:
    "Usa esta página como base para preferencias persistidas, integraciones con Chrome APIs y pantallas de configuración por módulo.",
  homeOptionsFooter_en:
    "The options entrypoint stays thin and delegates orchestration to a container.",
  homeOptionsFooter_es:
    "El entrypoint de opciones se mantiene delgado y delega la orquestación a un contenedor.",
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
      getMessage: vi.fn((key: keyof typeof messages) => {
        return messages[key] ?? String(key);
      }),
    },
    __storageState: storageState,
  };
}
