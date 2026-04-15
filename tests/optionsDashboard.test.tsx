import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import type { CatProfile } from "@/lib/onboarding";
import type { CatRepository } from "@/lib/repositories/catRepository";
import type { ScheduleRepository } from "@/lib/repositories/scheduleRepository";
import type { UsageRepository } from "@/lib/repositories/usageRepository";
import type {
  UserPreferences,
  UserPreferencesRepository,
} from "@/lib/repositories/userPreferencesRepository";
import { OptionsDashboardContainer } from "@/modules/options-dashboard/containers/OptionsDashboardContainer";
import {
  getOptionsDashboardHash,
  getOptionsDashboardSectionFromHash,
} from "@/modules/options-dashboard/services/optionsDashboardNavigation";

function getTranslation(key: string): string {
  const messages: Record<string, string> = {
    optionsEyebrow: "Options",
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
    optionsSectionScheduleDescription: "Configure recurring schedule-based blocks.",
    optionsSectionPreferencesLabel: "Preferences",
    optionsSectionPreferencesDescription: "Update your name and focus motivation.",
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
    catUpdateSubmit: "Save cat changes",
    validationCatNameRequired: "Enter a name for your cat.",
    validationCatNameMinLength: "Use at least 5 characters for your cat name.",
    validationCatNameMaxLength: "Keep your cat name under 32 characters.",
    validationColorInvalid: "Choose a valid color.",
    usageCreate: "Create usage time block",
    usageEmptyTitle: "Create your first usage limit.",
    usageEmptyDescription:
      "Choose a daily usage limit and the websites that should count against it.",
    usageCreateFirst: "Create my first usage limit",
    scheduleCreate: "Create schedule block",
    scheduleEmptyTitle: "Let’s start with your focus, create your first schedule.",
    scheduleEmptyDescription:
      "Create a weekly focus schedule and choose the sites that should be blocked during that time.",
    scheduleCreateFirst: "Create my first schedule",
    onboardingStepThreeTitle: "Tell us about you",
    onboardingStepThreeDescription:
      "This helps us keep your focus goals visible when distraction gets in the way.",
    userPreferencesNameLabel: "Your name",
    userPreferencesNamePlaceholder: "Your name (e.g John Doe)",
    userPreferencesReasonLabel: "Why did you install Cat Focus?",
    userPreferencesReasonPlaceholder:
      "Tell us the reason why you installed this extension, we will remind you about this every time you try to break our limits.",
    userPreferencesUpdateSubmit: "Save changes",
    validationUserPreferencesNameRequired: "Enter your name.",
    validationUserPreferencesNameMinLength:
      "Use at least 3 characters for your name.",
    validationUserPreferencesReasonRequired: "Enter your installation reason.",
    validationUserPreferencesReasonMinLength:
      "Use at least 3 characters for your reason.",
    validationUserPreferencesReasonMaxLength:
      "Keep your reason under 1000 characters.",
    loadingLabel: "Loading...",
  };

  return messages[key] ?? key;
}

function createCatRepository(profile: CatProfile | null = null): CatRepository {
  let currentProfile = profile;

  return {
    getCatProfile: async () => currentProfile,
    saveCatProfile: async (nextProfile) => {
      currentProfile = nextProfile;
    },
  };
}

function createUsageRepository(): UsageRepository {
  return {
    findAll: async () => [],
    insertOne: async (block) => ({ ...block, id: crypto.randomUUID() }),
    updateOneById: async (id, block) => ({ ...block, id }),
    deleteOneById: async () => undefined,
    deleteAll: async () => undefined,
  };
}

function createScheduleRepository(): ScheduleRepository {
  return {
    findAll: async () => [],
    insertOne: async (schedule) => ({ ...schedule, id: crypto.randomUUID() }),
    updateOneById: async (id, schedule) => ({ ...schedule, id }),
    deleteOneById: async () => undefined,
    deleteAll: async () => undefined,
  };
}

function createUserPreferencesRepository(
  preferences: UserPreferences | null = null,
): UserPreferencesRepository {
  let currentPreferences = preferences;

  return {
    getPreferences: async () => currentPreferences,
    savePreferences: async (nextPreferences) => {
      currentPreferences = nextPreferences;
    },
    updatePreferences: async (patch) => {
      currentPreferences = {
        ...(currentPreferences ?? {}),
        ...patch,
      };

      return currentPreferences;
    },
  };
}

describe("options dashboard navigation", () => {
  beforeEach(() => {
    window.history.replaceState(null, "", "/options.html");
  });

  it("falls back to the your-cat section for empty and unknown hashes", () => {
    expect(getOptionsDashboardSectionFromHash("")).toBe("your-cat");
    expect(getOptionsDashboardSectionFromHash("#not-real")).toBe("your-cat");
  });

  it("resolves known hashes", () => {
    expect(getOptionsDashboardSectionFromHash("#preferences")).toBe("preferences");
    expect(getOptionsDashboardHash("schedule-limits")).toBe("#schedule-limits");
  });

  it("renders the default section and keeps the hash canonical", async () => {
    render(
      <OptionsDashboardContainer
        getTranslation={getTranslation}
        catRepository={createCatRepository({
          name: "Captain Whiskers",
          furColorPrimary: "#112233",
          furColorSecondary: "#445566",
          eyeColor: "#365314",
          tailColor: "#445566",
        })}
        usageRepository={createUsageRepository()}
        scheduleRepository={createScheduleRepository()}
        userPreferencesRepository={createUserPreferencesRepository()}
      />,
    );

    expect(await screen.findByText("Your focus dashboard")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Your Cat/ }),
    ).toHaveAttribute("aria-current", "page");
    expect(window.location.hash).toBe("#your-cat");
  });

  it("switches sections when the sidebar button is pressed", async () => {
    render(
      <OptionsDashboardContainer
        getTranslation={getTranslation}
        catRepository={createCatRepository({
          name: "Captain Whiskers",
          furColorPrimary: "#112233",
          furColorSecondary: "#445566",
          eyeColor: "#365314",
          tailColor: "#445566",
        })}
        usageRepository={createUsageRepository()}
        scheduleRepository={createScheduleRepository()}
        userPreferencesRepository={createUserPreferencesRepository({
          userName: "Angel",
          installationReason: "Keep focused",
        })}
      />,
    );

    fireEvent.click(
      await screen.findByRole("button", {
        name: /Preferences/,
      }),
    );

    await waitFor(() => {
      expect(window.location.hash).toBe("#preferences");
    });

    expect(
      screen.getByRole("button", { name: /Preferences/ }),
    ).toHaveAttribute("aria-current", "page");
    expect(await screen.findByDisplayValue("Angel")).toBeInTheDocument();
  });

  it("loads and saves the cat profile without touching onboarding state", async () => {
    const saveCatProfile = vi.fn(async () => undefined);
    const catRepository: CatRepository = {
      getCatProfile: async () => ({
        name: "Captain Whiskers",
        furColorPrimary: "#112233",
        furColorSecondary: "#445566",
        eyeColor: "#365314",
        tailColor: "#445566",
      }),
      saveCatProfile,
    };

    render(
      <OptionsDashboardContainer
        getTranslation={getTranslation}
        catRepository={catRepository}
        usageRepository={createUsageRepository()}
        scheduleRepository={createScheduleRepository()}
        userPreferencesRepository={createUserPreferencesRepository()}
      />,
    );

    const nameInput = (await screen.findByDisplayValue(
      "Captain Whiskers",
    )) as HTMLInputElement;

    fireEvent.change(nameInput, { target: { value: "Luna Ray" } });
    fireEvent.click(screen.getByRole("button", { name: "Save cat changes" }));

    await waitFor(() => {
      expect(saveCatProfile).toHaveBeenCalledWith({
        name: "Luna Ray",
        furColorPrimary: "#112233",
        furColorSecondary: "#445566",
        eyeColor: "#365314",
        tailColor: "#445566",
      });
    });
  });

  it("loads and updates saved preferences through the preferences repository", async () => {
    const updatePreferences = vi.fn(async (patch: Partial<UserPreferences>) => ({
      userName: patch.userName,
      installationReason: patch.installationReason,
    }));
    const userPreferencesRepository: UserPreferencesRepository = {
      getPreferences: async () => ({
        userName: "Angel",
        installationReason: "Stay focused",
      }),
      savePreferences: async () => undefined,
      updatePreferences,
    };

    window.history.replaceState(null, "", "/options.html#preferences");

    render(
      <OptionsDashboardContainer
        getTranslation={getTranslation}
        catRepository={createCatRepository()}
        usageRepository={createUsageRepository()}
        scheduleRepository={createScheduleRepository()}
        userPreferencesRepository={userPreferencesRepository}
      />,
    );

    fireEvent.change(await screen.findByDisplayValue("Angel"), {
      target: { value: "Angelica" },
    });
    fireEvent.change(screen.getByDisplayValue("Stay focused"), {
      target: { value: "Keep building with focus" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Save changes" }));

    await waitFor(() => {
      expect(updatePreferences).toHaveBeenCalledWith({
        userName: "Angelica",
        installationReason: "Keep building with focus",
      });
    });
  });
});
