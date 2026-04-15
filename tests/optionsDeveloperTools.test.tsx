import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import type { CatProfile, OnboardingState } from "@/lib/onboarding";
import type { CatRepository } from "@/lib/repositories/catRepository";
import type { OnboardingRepository } from "@/lib/repositories/onboardingRepository";
import type { ScheduleRepository } from "@/lib/repositories/scheduleRepository";
import type { UsageRepository } from "@/lib/repositories/usageRepository";
import { OptionsGateContainer } from "@/modules/onboarding/containers/OptionsGateContainer";
import { createChromeMock } from "./helpers/chrome";

declare global {
  var chrome: ReturnType<typeof createChromeMock>;
}

vi.mock("@tsparticles/confetti", () => ({
  confetti: vi.fn(async () => undefined),
}));

function createOnboardingRepository(state: OnboardingState): OnboardingRepository {
  let currentState = { ...state };

  return {
    getOnboardingState: async () => currentState,
    setActiveStep: async (step) => {
      currentState = { step, finished: false };
    },
    finishOnboarding: async () => {
      currentState = { step: 3, finished: true };
    },
    resetOnboarding: async () => {
      currentState = { step: 1, finished: false };
    },
  };
}

function createCatRepository(profile: CatProfile | null = null): CatRepository {
  return {
    getCatProfile: async () => profile,
    saveCatProfile: async () => undefined,
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

describe("options developer tools", () => {
  beforeEach(() => {
    globalThis.chrome = createChromeMock();
    window.history.replaceState(null, "", "/options.html");
  });

  it("renders the floating developer tools only for development installs", async () => {
    render(
      <OptionsGateContainer
        onboardingRepository={createOnboardingRepository({
          step: 3,
          finished: true,
        })}
        catRepository={createCatRepository()}
        usageRepository={createUsageRepository()}
        scheduleRepository={createScheduleRepository()}
        isDevelopmentInstall={async () => true}
      />,
    );

    expect(await screen.findByText("Developer tools")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Skip onboarding" }),
    ).toBeInTheDocument();
  });

  it("keeps the developer tools hidden for non-development installs", async () => {
    render(
      <OptionsGateContainer
        onboardingRepository={createOnboardingRepository({
          step: 3,
          finished: true,
        })}
        catRepository={createCatRepository()}
        usageRepository={createUsageRepository()}
        scheduleRepository={createScheduleRepository()}
        isDevelopmentInstall={async () => false}
      />,
    );

    expect(await screen.findByText("Your focus dashboard")).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.queryByText("Developer tools")).not.toBeInTheDocument();
    });
  });

  it("skips onboarding and lands on the dashboard", async () => {
    render(
      <OptionsGateContainer
        onboardingRepository={createOnboardingRepository({
          step: 1,
          finished: false,
        })}
        catRepository={createCatRepository()}
        usageRepository={createUsageRepository()}
        scheduleRepository={createScheduleRepository()}
        isDevelopmentInstall={async () => true}
      />,
    );

    expect(await screen.findByText("Set up Cat Focus")).toBeInTheDocument();

    fireEvent.click(await screen.findByRole("button", { name: "Skip onboarding" }));

    await waitFor(() => {
      expect(screen.getByText("Your focus dashboard")).toBeInTheDocument();
    });

    expect(
      screen.getByText("Onboarding marked as completed."),
    ).toBeInTheDocument();
  });

  it("resets onboarding back to step one", async () => {
    render(
      <OptionsGateContainer
        onboardingRepository={createOnboardingRepository({
          step: 3,
          finished: true,
        })}
        catRepository={createCatRepository()}
        usageRepository={createUsageRepository()}
        scheduleRepository={createScheduleRepository()}
        isDevelopmentInstall={async () => true}
      />,
    );

    expect(await screen.findByText("Your focus dashboard")).toBeInTheDocument();

    fireEvent.click(await screen.findByRole("button", { name: "Reset onboarding" }));

    await waitFor(() => {
      expect(screen.getByText("Set up Cat Focus")).toBeInTheDocument();
    });

    expect(screen.getByText("Onboarding restored to step one.")).toBeInTheDocument();
  });

  it("deletes usage and schedule blocks through the developer actions", async () => {
    const usageRepository: UsageRepository = {
      findAll: async () => [],
      insertOne: async (block) => ({ ...block, id: crypto.randomUUID() }),
      updateOneById: async (id, block) => ({ ...block, id }),
      deleteOneById: async () => undefined,
      deleteAll: vi.fn(async () => undefined),
    };
    const scheduleRepository: ScheduleRepository = {
      findAll: async () => [],
      insertOne: async (schedule) => ({ ...schedule, id: crypto.randomUUID() }),
      updateOneById: async (id, schedule) => ({ ...schedule, id }),
      deleteOneById: async () => undefined,
      deleteAll: vi.fn(async () => undefined),
    };

    render(
      <OptionsGateContainer
        onboardingRepository={createOnboardingRepository({
          step: 3,
          finished: true,
        })}
        catRepository={createCatRepository()}
        usageRepository={usageRepository}
        scheduleRepository={scheduleRepository}
        isDevelopmentInstall={async () => true}
      />,
    );

    expect(await screen.findByText("Developer tools")).toBeInTheDocument();

    fireEvent.click(
      await screen.findByRole("button", {
        name: "Delete all usage limit blocks",
      }),
    );

    await waitFor(() => {
      expect(usageRepository.deleteAll).toHaveBeenCalledTimes(1);
    });

    fireEvent.click(
      await screen.findByRole("button", {
        name: "Delete all schedule blocks",
      }),
    );

    await waitFor(() => {
      expect(scheduleRepository.deleteAll).toHaveBeenCalledTimes(1);
    });
  });
});
