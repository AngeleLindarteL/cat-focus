import { beforeEach, describe, expect, it } from "vitest";
import { ONBOARDING_STORAGE_KEYS } from "@/lib/onboarding";
import { ChromeStorageCatRepository } from "@/lib/repositories/catRepository";
import { ChromeStorageOnboardingRepository } from "@/lib/repositories/onboardingRepository";
import { ChromeStorageScheduleRepository } from "@/lib/repositories/scheduleRepository";
import { ChromeStorageUsageRepository } from "@/lib/repositories/usageRepository";
import { ChromeStorageUserPreferencesRepository } from "@/lib/repositories/userPreferencesRepository";
import { USER_PREFERENCES_STORAGE_KEY } from "@/lib/repositories/userPreferencesRepository.constants";
import { SCHEDULE_BLOCK_STORAGE_KEY } from "@/lib/schedules";
import { USAGE_BLOCK_STORAGE_KEY } from "@/lib/usage";
import { createChromeMock } from "./helpers/chrome";

declare global {
  var chrome: ReturnType<typeof createChromeMock>;
}

describe("repositories", () => {
  beforeEach(() => {
    globalThis.chrome = createChromeMock();
  });

  it("returns default onboarding state for missing values", async () => {
    const repository = new ChromeStorageOnboardingRepository();

    await expect(repository.getOnboardingState()).resolves.toEqual({
      step: 1,
      finished: false,
    });
  });

  it("persists and reloads onboarding state", async () => {
    const repository = new ChromeStorageOnboardingRepository();

    await repository.setActiveStep(2);

    await expect(repository.getOnboardingState()).resolves.toEqual({
      step: 2,
      finished: false,
    });

    await repository.finishOnboarding();

    expect(globalThis.chrome.__storageState).toMatchObject({
      [ONBOARDING_STORAGE_KEYS.step]: 3,
      [ONBOARDING_STORAGE_KEYS.finished]: true,
    });
  });

  it("resets onboarding back to the initial state", async () => {
    const repository = new ChromeStorageOnboardingRepository();

    await repository.finishOnboarding();
    await repository.resetOnboarding();

    await expect(repository.getOnboardingState()).resolves.toEqual({
      step: 1,
      finished: false,
    });
  });

  it("saves and reloads the cat profile", async () => {
    const repository = new ChromeStorageCatRepository();
    const profile = {
      name: "Mochi",
      furColorPrimary: "#d0a06a",
      furColorSecondary: "#8a5527",
      eyeColor: "#365314",
      tailColor: "#8a5527",
    };

    await repository.saveCatProfile(profile);

    await expect(repository.getCatProfile()).resolves.toEqual(profile);
  });

  it("persists and reloads the app language", async () => {
    const repository = new ChromeStorageUserPreferencesRepository();

    await repository.savePreferences({ language: "es" });

    await expect(repository.getPreferences()).resolves.toEqual({ language: "es" });
    expect(globalThis.chrome.__storageState).toMatchObject({
      [USER_PREFERENCES_STORAGE_KEY]: { language: "es" },
    });
  });

  it("patches user preferences without dropping existing fields", async () => {
    const repository = new ChromeStorageUserPreferencesRepository();

    await repository.savePreferences({
      language: "en",
      userName: "John Doe",
      installationReason: "Read more books",
    });

    await repository.updatePreferences({
      language: "es",
    });

    await expect(repository.getPreferences()).resolves.toEqual({
      language: "es",
      userName: "John Doe",
      installationReason: "Read more books",
    });
  });

  it("persists schedule blocks", async () => {
    const repository = new ChromeStorageScheduleRepository();

    const schedule = await repository.insertOne({
      name: "Work",
      schedule: {
        days: {
          monday: true,
          tuesday: true,
          wednesday: true,
          thursday: true,
          friday: true,
          saturday: false,
          sunday: false,
        },
        time: {
          from: "06:00",
          to: "18:00",
        },
      },
      sites: [{ name: "Instagram", domain: "instagram.com" }],
    });

    const schedules = await repository.findAll();

    expect(schedules).toHaveLength(1);
    expect(schedules[0]).toEqual(schedule);
    expect(globalThis.chrome.__storageState).toHaveProperty(
      SCHEDULE_BLOCK_STORAGE_KEY,
    );
  });

  it("persists usage blocks", async () => {
    const repository = new ChromeStorageUsageRepository();

    const usageBlock = await repository.insertOne({
      name: "Adult sites",
      limit: {
        time: "01:00",
        resetsAt: "00:00",
      },
      sites: [{ name: "Instagram", domain: "instagram.com" }],
    });

    const usageBlocks = await repository.findAll();

    expect(usageBlocks).toHaveLength(1);
    expect(usageBlocks[0]).toEqual(usageBlock);
    expect(globalThis.chrome.__storageState).toHaveProperty(
      USAGE_BLOCK_STORAGE_KEY,
    );
  });

  it("deletes all usage blocks", async () => {
    const repository = new ChromeStorageUsageRepository();

    await repository.insertOne({
      name: "Adult sites",
      limit: {
        time: "01:00",
        resetsAt: "00:00",
      },
      sites: [{ name: "Instagram", domain: "instagram.com" }],
    });

    await repository.deleteAll();

    await expect(repository.findAll()).resolves.toEqual([]);
  });

  it("deletes all schedule blocks", async () => {
    const repository = new ChromeStorageScheduleRepository();

    await repository.insertOne({
      name: "Work",
      schedule: {
        days: {
          monday: true,
          tuesday: true,
          wednesday: true,
          thursday: true,
          friday: true,
          saturday: false,
          sunday: false,
        },
        time: {
          from: "06:00",
          to: "18:00",
        },
      },
      sites: [{ name: "Instagram", domain: "instagram.com" }],
    });

    await repository.deleteAll();

    await expect(repository.findAll()).resolves.toEqual([]);
  });
});
