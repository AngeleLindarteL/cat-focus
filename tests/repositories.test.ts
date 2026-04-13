import { beforeEach, describe, expect, it } from "vitest";
import { ONBOARDING_STORAGE_KEYS } from "@/lib/onboarding";
import { ChromeStorageCatRepository } from "@/lib/repositories/catRepository";
import { ChromeStorageOnboardingRepository } from "@/lib/repositories/onboardingRepository";
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

  it("saves and reloads the cat profile", async () => {
    const repository = new ChromeStorageCatRepository();
    const profile = {
      name: "Mochi",
      furColorPrimary: "#d0a06a",
      furColorSecondary: "#8a5527",
    };

    await repository.saveCatProfile(profile);

    await expect(repository.getCatProfile()).resolves.toEqual(profile);
  });
});
