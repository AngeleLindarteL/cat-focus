import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
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
      expect(screen.getByText("Focus methods are next")).toBeInTheDocument();
    });
  });
});
