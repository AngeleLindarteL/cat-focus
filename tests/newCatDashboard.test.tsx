import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import type { CatProfile } from "@/lib/cat";
import type { NewCatRepository } from "@/lib/repositories";
import { NewCatDashboardContainer } from "@/modules/new-cat/containers/NewCatDashboardContainer";

vi.mock("@/components/CatPixiCanvas", () => ({
  CatPixiCanvas: ({
    profile,
    animation,
  }: {
    profile: CatProfile;
    animation: "idle";
  }) => (
    <div data-testid="new-cat-pixi-canvas">
      {[
        animation,
        profile.furType,
        profile.baseFurColor,
        profile.eyeColor,
        profile.furTypeColor1,
        profile.furTypeColor2,
      ].join("|")}
    </div>
  ),
}));

function getTranslation(key: string): string {
  const messages: Record<string, string> = {
    loadingLabel: "Loading...",
    catPreviewLabel: "Live preview",
    newCatBaseFurColorLabel: "Base fur color",
    newCatEyeColorLabel: "Eye color",
    newCatFurTypeLabel: "Fur type",
    newCatFurTypeStripesLabel: "Stripes",
    newCatFurTypeSpotsLabel: "Spots",
    newCatPatternColor1Label: "Pattern color 1",
    newCatPatternColor2Label: "Pattern color 2",
    newCatAutosaveSaving: "Saving...",
    newCatAutosaveSaved: "Saved",
    newCatAutosaveError: "Could not save changes.",
  };

  return messages[key] ?? key;
}

function createNewCatRepository(
  storedProfile: CatProfile | null = null,
  saveImpl?: (profile: CatProfile) => Promise<void>,
) {
  let currentProfile = storedProfile;
  const saveNewCatProfile = vi.fn(async (nextProfile: CatProfile) => {
    currentProfile = nextProfile;
    await saveImpl?.(nextProfile);
  });

  const repository: NewCatRepository = {
    getNewCatProfile: async () => currentProfile,
    saveNewCatProfile,
  };

  return {
    repository,
    saveNewCatProfile,
  };
}

describe("new cat dashboard", () => {
  beforeEach(() => {
    vi.useRealTimers();
  });

  it("loads curated defaults when no experimental profile is saved", async () => {
    const { repository } = createNewCatRepository();

    render(
      <NewCatDashboardContainer
        getTranslation={getTranslation}
        repository={repository}
      />,
    );

    expect(await screen.findByText("Saved")).toBeInTheDocument();
    expect(screen.getByDisplayValue("#d0a06a")).toBeInTheDocument();
    expect(screen.getByDisplayValue("#365314")).toBeInTheDocument();
    expect(screen.getByTestId("new-cat-pixi-canvas")).toHaveTextContent(
      "idle|stripes|#d0a06a|#365314|#8a5527|#f3c48b",
    );
  });

  it("preloads saved experimental settings when present", async () => {
    const { repository } = createNewCatRepository({
      baseFurColor: "#101010",
      eyeColor: "#abcdef",
      furType: "spots",
      furTypeColor1: "#222222",
      furTypeColor2: "#333333",
    });

    render(
      <NewCatDashboardContainer
        getTranslation={getTranslation}
        repository={repository}
      />,
    );

    expect(await screen.findByLabelText("Base fur color")).toHaveValue("#101010");
    expect(screen.getByLabelText("Eye color")).toHaveValue("#abcdef");
    expect(screen.getByRole("combobox", { name: "Fur type" })).toHaveValue("spots");
    expect(screen.getByLabelText("Pattern color 2")).toHaveValue("#333333");
  });

  it("updates preview state immediately and toggles the second pattern color by fur type", async () => {
    const { repository } = createNewCatRepository();

    render(
      <NewCatDashboardContainer
        getTranslation={getTranslation}
        repository={repository}
      />,
    );

    await screen.findByText("Saved");
    expect(screen.queryByLabelText("Pattern color 2")).not.toBeInTheDocument();

    fireEvent.change(screen.getByRole("combobox", { name: "Fur type" }), {
      target: { value: "spots" },
    });

    expect(await screen.findByLabelText("Pattern color 2")).toBeInTheDocument();
    expect(screen.getByTestId("new-cat-pixi-canvas")).toHaveTextContent(
      "idle|spots|#d0a06a|#365314|#8a5527|#f3c48b",
    );

    fireEvent.change(screen.getByLabelText("Base fur color"), {
      target: { value: "#123456" },
    });

    expect(screen.getByTestId("new-cat-pixi-canvas")).toHaveTextContent(
      "idle|spots|#123456|#365314|#8a5527|#f3c48b",
    );
  });

  it("debounces saves for 500ms and collapses rapid edits into one write", async () => {
    const { repository, saveNewCatProfile } = createNewCatRepository();

    render(
      <NewCatDashboardContainer
        getTranslation={getTranslation}
        repository={repository}
      />,
    );

    await screen.findByText("Saved");

    fireEvent.change(screen.getByLabelText("Base fur color"), {
      target: { value: "#111111" },
    });
    fireEvent.change(screen.getByLabelText("Base fur color"), {
      target: { value: "#222222" },
    });

    expect(screen.getByText("Saving...")).toBeInTheDocument();

    await act(async () => {
      await new Promise((resolve) => {
        window.setTimeout(resolve, 450);
      });
    });

    expect(saveNewCatProfile).not.toHaveBeenCalled();

    await waitFor(() => {
      expect(saveNewCatProfile).toHaveBeenCalledTimes(1);
      expect(saveNewCatProfile).toHaveBeenCalledWith({
        baseFurColor: "#222222",
        eyeColor: "#365314",
        furType: "stripes",
        furTypeColor1: "#8a5527",
        furTypeColor2: "#f3c48b",
      });
    }, { timeout: 1000 });
  });

  it("shows an error state when autosave fails without losing the local preview", async () => {
    const { repository } = createNewCatRepository(null, async () => {
      throw new Error("save failed");
    });

    render(
      <NewCatDashboardContainer
        getTranslation={getTranslation}
        repository={repository}
      />,
    );

    await screen.findByText("Saved");

    fireEvent.change(screen.getByLabelText("Eye color"), {
      target: { value: "#ff00ff" },
    });

    expect(
      await screen.findByText("Could not save changes.", {}, { timeout: 1000 }),
    ).toBeInTheDocument();
    expect(screen.getByTestId("new-cat-pixi-canvas")).toHaveTextContent(
      "idle|stripes|#d0a06a|#ff00ff|#8a5527|#f3c48b",
    );
  });
});
