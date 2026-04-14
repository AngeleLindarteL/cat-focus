import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import { USER_PREFERENCES_STORAGE_KEY } from "@/lib/repositories/userPreferencesRepository.constants";
import type { CatProfile, OnboardingState } from "@/lib/onboarding";
import type { CatRepository } from "@/lib/repositories/catRepository";
import type { OnboardingRepository } from "@/lib/repositories/onboardingRepository";
import { OptionsGateContainer } from "@/modules/onboarding/containers/OptionsGateContainer";
import { PopupGateContainer } from "@/modules/onboarding/containers/PopupGateContainer";
import { createChromeMock } from "./helpers/chrome";

declare global {
  var chrome: ReturnType<typeof createChromeMock>;
}

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
  };
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

describe("onboarding flow", () => {
  beforeEach(() => {
    globalThis.chrome = createChromeMock();
  });

  it("renders the popup onboarding redirect while unfinished", async () => {
    render(
      <PopupGateContainer
        onboardingRepository={createOnboardingRepository({
          step: 2,
          finished: false,
        })}
      />,
    );

    expect(
      await screen.findByText("Hello! Thanks for installing our extension"),
    ).toBeInTheDocument();
  });

  it("renders the default options home when onboarding is finished", async () => {
    render(
      <OptionsGateContainer
        onboardingRepository={createOnboardingRepository({
          step: 3,
          finished: true,
        })}
        catRepository={createCatRepository()}
      />,
    );

    expect(await screen.findByText("Extension settings")).toBeInTheDocument();
  });

  it("prefills saved data and advances after a valid submit", async () => {
    const onboardingRepository = createOnboardingRepository({
      step: 1,
      finished: false,
    });
    const catRepository = createCatRepository({
      name: "Captain Whiskers",
      furColorPrimary: "#112233",
      furColorSecondary: "#445566",
      eyeColor: "#365314",
      tailColor: "#445566",
    });

    render(
      <OptionsGateContainer
        onboardingRepository={onboardingRepository}
        catRepository={catRepository}
      />,
    );

    const nameInput = (await screen.findByDisplayValue(
      "Captain Whiskers",
    )) as HTMLInputElement;

    expect(nameInput.value).toBe("Captain Whiskers");

    fireEvent.change(nameInput, { target: { value: "  Luna   Ray " } });
    fireEvent.click(screen.getByRole("button", { name: "Save and continue" }));

    await waitFor(() => {
      expect(
        screen.getByText("Choose how you want to block distractions"),
      ).toBeInTheDocument();
    });
  });

  it("reloads the saved cat profile after step one submit", async () => {
    const onboardingRepository = createOnboardingRepository({
      step: 1,
      finished: false,
    });
    let getCatProfileCalls = 0;
    let currentProfile: CatProfile | null = {
      name: "Captain Whiskers",
      furColorPrimary: "#112233",
      furColorSecondary: "#445566",
      eyeColor: "#365314",
      tailColor: "#445566",
    };

    const catRepository: CatRepository = {
      getCatProfile: async () => {
        getCatProfileCalls += 1;
        return currentProfile;
      },
      saveCatProfile: async (nextProfile) => {
        currentProfile = nextProfile;
      },
    };

    render(
      <OptionsGateContainer
        onboardingRepository={onboardingRepository}
        catRepository={catRepository}
      />,
    );

    const nameInput = (await screen.findByDisplayValue(
      "Captain Whiskers",
    )) as HTMLInputElement;

    fireEvent.change(nameInput, { target: { value: "Luna Ray" } });
    fireEvent.click(screen.getByRole("button", { name: "Save and continue" }));

    await waitFor(() => {
      expect(
        screen.getByText("Choose how you want to block distractions"),
      ).toBeInTheDocument();
    });

    expect(getCatProfileCalls).toBeGreaterThan(1);
    expect(currentProfile?.name).toBe("Luna Ray");
  });

  it("updates the cat name preview in real time", async () => {
    const onboardingRepository = createOnboardingRepository({
      step: 1,
      finished: false,
    });

    render(
      <OptionsGateContainer
        onboardingRepository={onboardingRepository}
        catRepository={createCatRepository({
          name: "Captain Whiskers",
          furColorPrimary: "#112233",
          furColorSecondary: "#445566",
          eyeColor: "#365314",
          tailColor: "#445566",
        })}
      />,
    );

    const nameInput = (await screen.findByDisplayValue(
      "Captain Whiskers",
    )) as HTMLInputElement;

    fireEvent.change(nameInput, { target: { value: "Luna Ray" } });

    expect(screen.getByText("Luna Ray")).toBeInTheDocument();
  });

  it("uses the persisted app language for onboarding copy", async () => {
    globalThis.chrome = createChromeMock({
      [USER_PREFERENCES_STORAGE_KEY]: { language: "es" },
    });

    render(
      <PopupGateContainer
        onboardingRepository={createOnboardingRepository({
          step: 1,
          finished: false,
        })}
      />,
    );

    expect(
      await screen.findByText("¡Hola! Gracias por instalar nuestra extensión"),
    ).toBeInTheDocument();
  });

  it("allows returning to a reachable previous onboarding step from the stepper", async () => {
    const onboardingRepository = createOnboardingRepository({
      step: 2,
      finished: false,
    });

    render(
      <OptionsGateContainer
        onboardingRepository={onboardingRepository}
        catRepository={createCatRepository({
          name: "Captain Whiskers",
          furColorPrimary: "#112233",
          furColorSecondary: "#445566",
          eyeColor: "#365314",
          tailColor: "#445566",
        })}
      />,
    );

    fireEvent.click(await screen.findByRole("button", { name: "Choose your cat" }));

    await waitFor(() => {
      expect(screen.getByRole("button", { name: "Save and continue" })).toBeInTheDocument();
    });
  });

  it("keeps the step-three stepper target locked until step-two validation passes", async () => {
    render(
      <OptionsGateContainer
        onboardingRepository={createOnboardingRepository({
          step: 2,
          finished: false,
        })}
        catRepository={createCatRepository({
          name: "Captain Whiskers",
          furColorPrimary: "#112233",
          furColorSecondary: "#445566",
          eyeColor: "#365314",
          tailColor: "#445566",
        })}
      />,
    );

    await screen.findByText("Choose how you want to block distractions");

    expect(
      screen.queryByRole("button", { name: "Finish setup" }),
    ).not.toBeInTheDocument();
  });

  it("unlocks direct navigation to step three when step-two validation passes", async () => {
    render(
      <OptionsGateContainer
        onboardingRepository={createOnboardingRepository({
          step: 2,
          finished: false,
        })}
        catRepository={createCatRepository({
          name: "Captain Whiskers",
          furColorPrimary: "#112233",
          furColorSecondary: "#445566",
          eyeColor: "#365314",
          tailColor: "#445566",
        })}
      />,
    );

    fireEvent.click(await screen.findByRole("button", { name: "Create my first schedule" }));
    fireEvent.change(await screen.findByLabelText("Name of the schedule"), {
      target: { value: "Weekday focus" },
    });
    fireEvent.change(screen.getByPlaceholderText("Site Name (example: Instagram)"), {
      target: { value: "X" },
    });
    fireEvent.change(
      screen.getByPlaceholderText("The Site you want to block (example: instagram.com)"),
      {
        target: { value: "https://www.x.com" },
      },
    );
    fireEvent.click(screen.getByRole("button", { name: "Block this site" }));
    fireEvent.click(screen.getByRole("button", { name: "Create schedule block" }));

    const finishSetupStep = await screen.findByRole("button", { name: "Finish setup" });
    fireEvent.click(finishSetupStep);

    await waitFor(() => {
      expect(screen.getByRole("button", { name: "Finish onboarding" })).toBeInTheDocument();
    });
  });

  it("locks stepper navigation while a step-two draft has unsaved changes", async () => {
    globalThis.chrome = createChromeMock({
      "schedule-block-data": [
        {
          id: "schedule-1",
          name: "Weekday focus",
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
          sites: [{ name: "X", domain: "x.com" }],
        },
      ],
    });

    render(
      <OptionsGateContainer
        onboardingRepository={createOnboardingRepository({
          step: 2,
          finished: false,
        })}
        catRepository={createCatRepository({
          name: "Captain Whiskers",
          furColorPrimary: "#112233",
          furColorSecondary: "#445566",
          eyeColor: "#365314",
          tailColor: "#445566",
        })}
      />,
    );

    fireEvent.change(await screen.findByLabelText("Name of the schedule"), {
      target: { value: "Weekday focus updated" },
    });

    expect(
      screen.queryByRole("button", { name: "Choose your cat" }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "Finish setup" }),
    ).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Back" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "Next" })).toBeDisabled();

    fireEvent.click(screen.getByRole("button", { name: "Update schedule block" }));

    await waitFor(() => {
      expect(
        screen.getByRole("button", { name: "Choose your cat" }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: "Finish setup" }),
      ).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "Back" })).toBeEnabled();
      expect(screen.getByRole("button", { name: "Next" })).toBeEnabled();
    });
  });

  it("falls back to the Chrome UI locale when no app language is saved", async () => {
    globalThis.chrome = createChromeMock({}, "es");

    render(
      <PopupGateContainer
        onboardingRepository={createOnboardingRepository({
          step: 1,
          finished: false,
        })}
      />,
    );

    expect(
      await screen.findByText("¡Hola! Gracias por instalar nuestra extensión"),
    ).toBeInTheDocument();
  });

  it("allows returning to step two from step one after step one is already completed", async () => {
    const onboardingRepository = createOnboardingRepository({
      step: 2,
      finished: false,
    });

    render(
      <OptionsGateContainer
        onboardingRepository={onboardingRepository}
        catRepository={createCatRepository({
          name: "Captain Whiskers",
          furColorPrimary: "#112233",
          furColorSecondary: "#445566",
          eyeColor: "#365314",
          tailColor: "#445566",
        })}
      />,
    );

    fireEvent.click(await screen.findByRole("button", { name: "Choose your cat" }));

    await waitFor(() => {
      expect(screen.getByRole("button", { name: "Save and continue" })).toBeInTheDocument();
    });

    fireEvent.click(screen.getByRole("button", { name: "Choose your blocks" }));

    await waitFor(() => {
      expect(
        screen.getByText("Choose how you want to block distractions"),
      ).toBeInTheDocument();
    });
  });
});
