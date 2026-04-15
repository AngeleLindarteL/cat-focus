import type { TranslationCatalog } from "@/lib/i18n/translationCatalog.interfaces";

export const translationCatalog = {
  en: {
    popupEyebrow: "Popup",
    popupRedirectTitle: "Hello! Thanks for installing our extension",
    popupRedirectDescription:
      "We’ll help you set up your focus companion and preferences.",
    popupRedirectBody:
      "Continue in the options page to choose your cat, review your progress, and finish setup.",
    popupRedirectAction: "Open options",
    popupRedirectFooter:
      "You can leave and come back later. Your saved onboarding data will be ready when you return.",
    homePopupTitle: "Cat Focus",
    homePopupDescription:
      "A clean popup shell for the extension while the focus workflow is built out.",
    homePopupBody:
      "Open the options page to configure behavior, site rules, and future focus-session settings.",
    homePopupAction: "Open options",
    homePopupFooter:
      "Popup logic stays in containers, while the shared card UI remains presentation-only.",
    optionsEyebrow: "Options",
    homeOptionsTitle: "Extension settings",
    homeOptionsDescription:
      "This options surface is ready for persisted settings and feature-specific forms.",
    homeOptionsBody:
      "Use this page as the home for storage-backed preferences, Chrome API integrations, and module-specific configuration screens.",
    homeOptionsFooter:
      "The options entrypoint stays thin and delegates orchestration to a container.",
    optionsDashboardTitle: "Your focus dashboard",
    optionsDashboardDescription:
      "Move between your cat, blocking rules, and personal preferences without leaving the floating options shell.",
    optionsDashboardFooter:
      "Each section keeps its own persistence flow while the options entrypoint remains container-driven.",
    optionsNavigationLabel: "Dashboard",
    optionsSectionYourCatLabel: "Your Cat",
    optionsSectionYourCatDescription: "Edit your companion's name and colors.",
    optionsSectionUsageLabel: "Usage Time Limits",
    optionsSectionUsageDescription: "Manage daily time-based website limits.",
    optionsSectionScheduleLabel: "Schedule Limits",
    optionsSectionScheduleDescription:
      "Configure recurring schedule-based blocks.",
    optionsSectionPreferencesLabel: "Preferences",
    optionsSectionPreferencesDescription:
      "Update your name and focus motivation.",
    developerToolsTitle: "Developer tools",
    developerToolsDescription:
      "Development-only controls for onboarding and persisted block data.",
    developerToolsSkipOnboarding: "Skip onboarding",
    developerToolsResetOnboarding: "Reset onboarding",
    developerToolsClearUsageBlocks: "Delete all usage limit blocks",
    developerToolsClearScheduleBlocks: "Delete all schedule blocks",
    developerToolsStatusIdle: "Visible because this extension is installed in development mode.",
    developerToolsStatusWorking: "Running developer action...",
    developerToolsSuccessSkipOnboarding:
      "Onboarding marked as completed.",
    developerToolsSuccessResetOnboarding:
      "Onboarding restored to step one.",
    developerToolsSuccessClearUsageBlocks:
      "All usage limit blocks were deleted.",
    developerToolsSuccessClearScheduleBlocks:
      "All schedule blocks were deleted.",
    developerToolsErrorAction:
      "The developer action could not be completed.",
    onboardingEyebrow: "Onboarding",
    onboardingTitle: "Set up Cat Focus",
    onboardingDescription:
      "Personalize your experience with our extension and unlock the full potential of your productivity.",
    onboardingStepOneLabel: "Choose your cat",
    onboardingStepTwoLabel: "Choose your blocks",
    onboardingStepThreeLabel: "Your profile",
    onboardingBackAction: "Back",
    onboardingNextAction: "Next",
    onboardingFinishAction: "Start your journey",
    onboardingStepThreeTitle: "Tell us about you",
    onboardingStepThreeDescription:
      "This helps us keep your focus goals visible when distraction gets in the way.",
    userPreferencesNameLabel: "Your name",
    userPreferencesNamePlaceholder: "Your name (e.g John Doe)",
    userPreferencesReasonLabel: "Why did you install Cat Focus?",
    userPreferencesReasonPlaceholder:
      "Tell us the reason why you installed this extension, we will remind you about this every time you try to break our limits.",
    userPreferencesCreateSubmit: "Start your journey",
    userPreferencesUpdateSubmit: "Save changes",
    validationUserPreferencesNameRequired: "Enter your name.",
    validationUserPreferencesNameMinLength:
      "Use at least 3 characters for your name.",
    validationUserPreferencesReasonRequired: "Enter your installation reason.",
    validationUserPreferencesReasonMinLength:
      "Use at least 3 characters for your reason.",
    validationUserPreferencesReasonMaxLength:
      "Keep your reason under 1000 characters.",
    onboardingFinishTitle: "Congratulations",
    onboardingFinishDescription:
      "You completed your onboarding setup. Keep your focus steady and move one step at a time.",
    onboardingFinishQuote:
      "It does not matter how slowly you go, as long as you do not stop.",
    onboardingFinishQuoteAuthor: "Confucio (Confucius)",
    onboardingFinishActionLabel: "Go to home",
    catSetupTitle: "Create your cat companion",
    catSetupDescription:
      "Pick a name and choose its fur, eye, and tail colors. You can come back later and your saved values will be prefilled.",
    catNameLabel: "Cat name",
    catNamePlaceholder: "Mochi",
    catPrimaryColorLabel: "Primary fur color",
    catSecondaryColorLabel: "Secondary fur color",
    catEyeColorLabel: "Eye color",
    catTailColorLabel: "Tail color",
    catPreviewLabel: "Live preview",
    catStepSubmit: "Save and continue",
    catUpdateSubmit: "Save cat changes",
    validationCatNameRequired: "Enter a name for your cat.",
    validationCatNameMinLength: "Use at least 3 characters for your cat name.",
    validationCatNameMaxLength: "Keep your cat name under 32 characters.",
    validationColorInvalid: "Choose a valid color.",
    loadingLabel: "Loading...",
    languageLabel: "Language",
    languageEnglish: "English",
    languageSpanish: "Spanish",
    stepTwoTitle: "Choose how you want to block distractions",
    stepTwoDescription:
      "Choose at least one way to avoid distractions. You can edit it whenever you want.",
    stepTwoScheduleLabel: "Schedule block",
    stepTwoScheduleDescription:
      "Block distracting sites during the days and hours you choose.",
    stepTwoUsageLabel: "Usage time block",
    stepTwoUsageDescription:
      "Limit a site's allowed usage time before it gets blocked.",
    stepTwoUsageConstruction: "Under construction",
    usageEmptyTitle: "Create your first usage limit.",
    usageEmptyDescription:
      "Choose a daily usage limit and the websites that should count against it.",
    usageCreateFirst: "Create my first usage limit",
    usageCreate: "Create usage time block",
    usageNameLabel: "Name of the usage limit",
    usageNamePlaceholder: "Adult sites",
    usageLimitLabel: "Limit (Daily)",
    usageLimitHoursLabel: "Hours",
    usageLimitMinutesLabel: "Minutes",
    usageSitesLabel: "Websites to block",
    usagePopularSitesTitle: "Add some popular sites",
    usageSiteAdd: "Block this site",
    usageSiteNamePlaceholder: "Site Name (example: Instagram)",
    usageSiteDomainPlaceholder:
      "The Site you want to block (example: instagram.com)",
    usageSiteCancelEdit: "Cancel",
    usageSiteDeleteAriaLabel: "Delete site",
    usageSave: "Save usage limit",
    usageCreateSubmit: "Create usage limit",
    usageUpdateSubmit: "Update usage limit",
    usageUnsavedReminderTitle: "You changed this usage limit.",
    usageUnsavedReminderDescription:
      "Press Save usage limit to keep your updates.",
    usageEdit: "Edit",
    usageDelete: "Delete usage limit",
    usageDeleteConfirmTitle: "Delete usage limit?",
    usageDeleteConfirmDescription:
      "This action will permanently remove the usage time block.",
    usageDeleteConfirmAction: "Delete",
    usageCancel: "Cancel",
    usageClose: "Close",
    usageSummarySites: "sites",
    usageSummaryLimit: "Daily limit",
    scheduleEmptyTitle:
      "Let’s start with your focus, create your first schedule.",
    scheduleEmptyDescription:
      "Create a weekly focus schedule and choose the sites that should be blocked during that time.",
    scheduleCreateFirst: "Create my first schedule",
    scheduleCreate: "Create schedule block",
    scheduleNameLabel: "Name of the schedule",
    scheduleNamePlaceholder: "Work",
    scheduleDaysLabel: "Active days",
    scheduleFromLabel: "From",
    scheduleToLabel: "To",
    scheduleSitesLabel: "Websites to block",
    schedulePopularSitesTitle: "Add some popular sites",
    scheduleSiteAdd: "Block this site",
    scheduleSiteNamePlaceholder: "Site Name (example: Instagram)",
    scheduleSiteDomainPlaceholder:
      "The Site you want to block (example: instagram.com)",
    scheduleSiteCancelEdit: "Cancel",
    scheduleSiteDeleteAriaLabel: "Delete site",
    scheduleSave: "Save schedule",
    scheduleCreateSubmit: "Create schedule block",
    scheduleUpdateSubmit: "Update schedule block",
    scheduleUnsavedReminderTitle: "You changed this schedule.",
    scheduleUnsavedReminderDescription:
      "Press Save schedule to keep your updates.",
    scheduleEdit: "Edit",
    scheduleDelete: "Delete schedule",
    scheduleDeleteConfirmTitle: "Delete schedule?",
    scheduleDeleteConfirmDescription:
      "This action will permanently remove the schedule block.",
    scheduleDeleteConfirmAction: "Delete",
    scheduleCancel: "Cancel",
    scheduleClose: "Close",
    scheduleSummarySites: "sites",
    validationScheduleNameRequired: "Enter a name for the schedule.",
    validationScheduleNameMinLength:
      "Use at least 3 characters for the schedule name.",
    validationScheduleNameMaxLength:
      "Keep the schedule name under 48 characters.",
    validationUsageNameRequired: "Enter a name for the usage limit.",
    validationUsageNameMinLength:
      "Use at least 3 characters for the usage limit name.",
    validationUsageHoursRequired: "Enter the number of hours.",
    validationUsageHoursInvalid: "Hours must be between 0 and 23.",
    validationUsageMinutesRequired: "Enter the number of minutes.",
    validationUsageMinutesInvalid: "Minutes must be between 0 and 59.",
    validationTimeRequired: "Enter a valid time.",
    validationTimeRange: "The end time must be later than the start time.",
    validationSitesRequired: "Add at least one website.",
    validationSiteNameRequired: "Enter a site name.",
    validationDomainInvalid: "Enter a valid website domain.",
    formSubmitDisabledNoChanges: "There are no changes to save yet.",
    formSubmitDisabledInvalid: "Complete the form before saving your changes.",
    weekdayMonday: "Mon",
    weekdayTuesday: "Tue",
    weekdayWednesday: "Wed",
    weekdayThursday: "Thu",
    weekdayFriday: "Fri",
    weekdaySaturday: "Sat",
    weekdaySunday: "Sun",
  },
  es: {
    popupEyebrow: "Popup",
    popupRedirectTitle: "¡Hola! Gracias por instalar nuestra extensión",
    popupRedirectDescription:
      "Te ayudaremos a configurar tu compañero de enfoque y tus preferencias.",
    popupRedirectBody:
      "Continúa en la página de opciones para elegir tu gato, revisar tu progreso y terminar la configuración.",
    popupRedirectAction: "Abrir opciones",
    popupRedirectFooter:
      "Puedes salir y volver luego. Tus datos guardados del onboarding estarán listos cuando regreses.",
    homePopupTitle: "Cat Focus",
    homePopupDescription:
      "Una base limpia para el popup mientras construimos el flujo principal de enfoque.",
    homePopupBody:
      "Abre la página de opciones para configurar el comportamiento, las reglas de sitios y futuros ajustes de sesiones de enfoque.",
    homePopupAction: "Abrir opciones",
    homePopupFooter:
      "La lógica del popup vive en contenedores, mientras la UI compartida permanece solo de presentación.",
    optionsEyebrow: "Opciones",
    homeOptionsTitle: "Configuración de la extensión",
    homeOptionsDescription:
      "Esta superficie de opciones está lista para preferencias persistidas y formularios específicos por funcionalidad.",
    homeOptionsBody:
      "Usa esta página como base para preferencias persistidas, integraciones con Chrome APIs y pantallas de configuración por módulo.",
    homeOptionsFooter:
      "El entrypoint de opciones se mantiene delgado y delega la orquestación a un contenedor.",
    optionsDashboardTitle: "Tu panel de enfoque",
    optionsDashboardDescription:
      "Muévete entre tu gato, tus reglas de bloqueo y tus preferencias personales sin salir del shell flotante de opciones.",
    optionsDashboardFooter:
      "Cada sección conserva su propio flujo de persistencia mientras el entrypoint de opciones sigue siendo manejado por contenedores.",
    optionsNavigationLabel: "Panel",
    optionsSectionYourCatLabel: "Tu gato",
    optionsSectionYourCatDescription:
      "Edita el nombre y los colores de tu compañero.",
    optionsSectionUsageLabel: "Límites de tiempo de uso",
    optionsSectionUsageDescription:
      "Administra límites diarios de tiempo por sitio.",
    optionsSectionScheduleLabel: "Límites por horario",
    optionsSectionScheduleDescription:
      "Configura bloqueos recurrentes basados en horario.",
    optionsSectionPreferencesLabel: "Preferencias",
    optionsSectionPreferencesDescription:
      "Actualiza tu nombre y tu motivación de enfoque.",
    developerToolsTitle: "Herramientas de desarrollo",
    developerToolsDescription:
      "Controles solo para desarrollo sobre el onboarding y los bloques persistidos.",
    developerToolsSkipOnboarding: "Saltar onboarding",
    developerToolsResetOnboarding: "Reiniciar onboarding",
    developerToolsClearUsageBlocks:
      "Eliminar todos los bloques de límite de uso",
    developerToolsClearScheduleBlocks:
      "Eliminar todos los bloques de horario",
    developerToolsStatusIdle:
      "Visible porque esta extensión está instalada en modo desarrollo.",
    developerToolsStatusWorking:
      "Ejecutando acción de desarrollo...",
    developerToolsSuccessSkipOnboarding:
      "El onboarding quedó marcado como completado.",
    developerToolsSuccessResetOnboarding:
      "El onboarding volvió al paso uno.",
    developerToolsSuccessClearUsageBlocks:
      "Se eliminaron todos los bloques de límite de uso.",
    developerToolsSuccessClearScheduleBlocks:
      "Se eliminaron todos los bloques de horario.",
    developerToolsErrorAction:
      "No se pudo completar la acción de desarrollo.",
    onboardingEyebrow: "Onboarding",
    onboardingTitle: "Configura Cat Focus",
    onboardingDescription:
      "Personaliza tu experiencia con nuestra extensión y desbloquea el potencial de tu productividad.",
    onboardingStepOneLabel: "Elige tu gato",
    onboardingStepTwoLabel: "Configura tus bloqueos",
    onboardingStepThreeLabel: "Tu perfil",
    onboardingBackAction: "Atrás",
    onboardingNextAction: "Siguiente",
    onboardingFinishAction: "Comienza tu camino",
    onboardingStepThreeTitle: "Cuéntanos sobre ti",
    onboardingStepThreeDescription:
      "Esto nos ayuda a mantener tus metas de enfoque visibles cuando aparezcan distracciones.",
    userPreferencesNameLabel: "Tu nombre",
    userPreferencesNamePlaceholder: "Tu nombre (ej. John Doe)",
    userPreferencesReasonLabel: "¿Por qué instalaste Cat Focus?",
    userPreferencesReasonPlaceholder:
      "Cuéntanos por qué instalaste esta extensión, te lo recordaremos cada vez que intentes romper los límites.",
    userPreferencesCreateSubmit: "Comienza tu camino",
    userPreferencesUpdateSubmit: "Guardar cambios",
    validationUserPreferencesNameRequired: "Ingresa tu nombre.",
    validationUserPreferencesNameMinLength:
      "Usa al menos 3 caracteres para tu nombre.",
    validationUserPreferencesReasonRequired: "Ingresa la razón de instalación.",
    validationUserPreferencesReasonMinLength:
      "Usa al menos 3 caracteres para tu razón.",
    validationUserPreferencesReasonMaxLength:
      "Mantén tu razón por debajo de 1000 caracteres.",
    onboardingFinishTitle: "Felicitaciones",
    onboardingFinishDescription:
      "Completaste el onboarding. Mantén tu enfoque firme y avanza paso a paso.",
    onboardingFinishQuote:
      "No importa lo lento que vayas, siempre y cuando no te detengas.",
    onboardingFinishQuoteAuthor: "Confucio (Confucius)",
    onboardingFinishActionLabel: "Ir al inicio",
    catSetupTitle: "Crea tu compañero felino",
    catSetupDescription:
      "Elige un nombre y selecciona los colores del pelaje, ojos y cola. Puedes volver luego y los valores guardados aparecerán precargados.",
    catNameLabel: "Nombre del gato",
    catNamePlaceholder: "Mochi",
    catPrimaryColorLabel: "Color principal del pelaje",
    catSecondaryColorLabel: "Color secundario del pelaje",
    catEyeColorLabel: "Color de ojos",
    catTailColorLabel: "Color de cola",
    catPreviewLabel: "Vista previa",
    catStepSubmit: "Guardar y continuar",
    catUpdateSubmit: "Guardar cambios del gato",
    validationCatNameRequired: "Ingresa un nombre para tu gato.",
    validationCatNameMinLength:
      "Usa al menos 3 caracteres para el nombre del gato.",
    validationCatNameMaxLength:
      "Mantén el nombre del gato por debajo de 32 caracteres.",
    validationColorInvalid: "Elige un color válido.",
    loadingLabel: "Cargando...",
    languageLabel: "Idioma",
    languageEnglish: "Inglés",
    languageSpanish: "Español",
    stepTwoTitle: "Elige cómo bloquear distracciones",
    stepTwoDescription:
      "Selecciona al menos una forma de evitar distracciones. Puedes editarla cuando quieras.",
    stepTwoScheduleLabel: "Bloqueo por horario",
    stepTwoScheduleDescription:
      "Bloquea sitios distractores durante los días y horas que elijas.",
    stepTwoUsageLabel: "Bloqueo por tiempo de uso",
    stepTwoUsageDescription:
      "Limita el tiempo permitido de uso de un sitio antes de bloquearlo.",
    stepTwoUsageConstruction: "En construcción",
    usageEmptyTitle: "Crea tu primer límite de uso.",
    usageEmptyDescription:
      "Elige un límite diario de uso y los sitios web que deben contar dentro de ese límite.",
    usageCreateFirst: "Crear mi primer límite de uso",
    usageCreate: "Crear bloqueo por tiempo de uso",
    usageNameLabel: "Nombre del límite de uso",
    usageNamePlaceholder: "Sitios para adultos",
    usageLimitLabel: "Límite (Diario)",
    usageLimitHoursLabel: "Horas",
    usageLimitMinutesLabel: "Minutos",
    usageSitesLabel: "Sitios web a bloquear",
    usagePopularSitesTitle: "Agrega sitios populares",
    usageSiteAdd: "Bloquea este sitio",
    usageSiteNamePlaceholder: "Nombre del Sitio (ejemplo: Instagram)",
    usageSiteDomainPlaceholder:
      "El Sitio que quieres bloquear (ejemplo: instagram.com)",
    usageSiteCancelEdit: "Cancelar",
    usageSiteDeleteAriaLabel: "Eliminar sitio",
    usageSave: "Guardar límite de uso",
    usageCreateSubmit: "Crear límite de uso",
    usageUpdateSubmit: "Actualizar límite de uso",
    usageUnsavedReminderTitle: "Cambiaste este límite de uso.",
    usageUnsavedReminderDescription:
      "Presiona Guardar límite de uso para conservar los cambios.",
    usageEdit: "Editar",
    usageDelete: "Eliminar límite de uso",
    usageDeleteConfirmTitle: "¿Eliminar límite de uso?",
    usageDeleteConfirmDescription:
      "Esta acción eliminará el bloqueo por tiempo de uso de forma permanente.",
    usageDeleteConfirmAction: "Eliminar",
    usageCancel: "Cancelar",
    usageClose: "Cerrar",
    usageSummarySites: "sitios",
    usageSummaryLimit: "Límite diario",
    scheduleEmptyTitle: "Comencemos con tu enfoque, crea tu primer horario.",
    scheduleEmptyDescription:
      "Crea un horario semanal de enfoque y elige los sitios que deben bloquearse en ese periodo.",
    scheduleCreateFirst: "Crear mi primer horario",
    scheduleCreate: "Crear bloqueo por horario",
    scheduleNameLabel: "Nombre del horario",
    scheduleNamePlaceholder: "Trabajo",
    scheduleDaysLabel: "Días activos",
    scheduleFromLabel: "Desde",
    scheduleToLabel: "Hasta",
    scheduleSitesLabel: "Sitios web a bloquear",
    schedulePopularSitesTitle: "Agrega sitios populares",
    scheduleSiteAdd: "Bloquea este sitio",
    scheduleSiteNamePlaceholder: "Nombre del Sitio (ejemplo: Instagram)",
    scheduleSiteDomainPlaceholder:
      "El Sitio que quieres bloquear (ejemplo: instagram.com)",
    scheduleSiteCancelEdit: "Cancelar",
    scheduleSiteDeleteAriaLabel: "Eliminar sitio",
    scheduleSave: "Guardar horario",
    scheduleCreateSubmit: "Crear bloqueo por horario",
    scheduleUpdateSubmit: "Actualizar bloqueo por horario",
    scheduleUnsavedReminderTitle: "Cambiaste este horario.",
    scheduleUnsavedReminderDescription:
      "Presiona Guardar horario para conservar los cambios.",
    scheduleEdit: "Editar",
    scheduleDelete: "Eliminar horario",
    scheduleDeleteConfirmTitle: "¿Eliminar horario?",
    scheduleDeleteConfirmDescription:
      "Esta acción eliminará el bloqueo por horario de forma permanente.",
    scheduleDeleteConfirmAction: "Eliminar",
    scheduleCancel: "Cancelar",
    scheduleClose: "Cerrar",
    scheduleSummarySites: "sitios",
    validationScheduleNameRequired: "Ingresa un nombre para el horario.",
    validationScheduleNameMinLength:
      "Usa al menos 3 caracteres para el nombre del horario.",
    validationScheduleNameMaxLength:
      "Mantén el nombre del horario por debajo de 48 caracteres.",
    validationUsageNameRequired: "Ingresa un nombre para el límite de uso.",
    validationUsageNameMinLength:
      "Usa al menos 3 caracteres para el nombre del límite de uso.",
    validationUsageHoursRequired: "Ingresa la cantidad de horas.",
    validationUsageHoursInvalid: "Las horas deben estar entre 0 y 23.",
    validationUsageMinutesRequired: "Ingresa la cantidad de minutos.",
    validationUsageMinutesInvalid: "Los minutos deben estar entre 0 y 59.",
    validationTimeRequired: "Ingresa una hora válida.",
    validationTimeRange: "La hora final debe ser posterior a la hora inicial.",
    validationSitesRequired: "Agrega al menos un sitio web.",
    validationSiteNameRequired: "Ingresa el nombre del sitio.",
    validationDomainInvalid: "Ingresa un dominio válido.",
    formSubmitDisabledNoChanges: "No hay cambios para guardar todavía.",
    formSubmitDisabledInvalid:
      "Completa el formulario antes de guardar tus cambios.",
    weekdayMonday: "Lun",
    weekdayTuesday: "Mar",
    weekdayWednesday: "Mié",
    weekdayThursday: "Jue",
    weekdayFriday: "Vie",
    weekdaySaturday: "Sáb",
    weekdaySunday: "Dom",
  },
} satisfies TranslationCatalog;
