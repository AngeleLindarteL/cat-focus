import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import type { BlockedSite } from "@/lib/schedules";
import {
  createScheduleSitePresetItems,
  isPresetBackedScheduleSite,
  normalizeScheduleSiteDomain,
  toggleScheduleSitePreset,
} from "@/modules/schedule/services/scheduleSitePresets";
import { PopularSiteCarousel } from "@/modules/schedule/components/PopularSiteCarousel";

describe("schedule site presets", () => {
  it("normalizes raw, www, and https domain variants to the same hostname", () => {
    expect(normalizeScheduleSiteDomain("x.com")).toBe("x.com");
    expect(normalizeScheduleSiteDomain("www.x.com")).toBe("x.com");
    expect(normalizeScheduleSiteDomain("https://x.com")).toBe("x.com");
    expect(normalizeScheduleSiteDomain("https://www.x.com")).toBe("x.com");
  });

  it("marks already-added preset domains as selected", () => {
    const sites: BlockedSite[] = [{ name: "Instagram", domain: "https://www.instagram.com" }];

    const items = createScheduleSitePresetItems(sites);
    const instagramItem = items.find((item) => item.domain === "instagram.com");
    const youtubeItem = items.find((item) => item.domain === "youtube.com");

    expect(instagramItem?.isSelected).toBe(true);
    expect(youtubeItem?.isSelected).toBe(false);
  });

  it("toggles a preset on and off using normalized domains", () => {
    const initialSites: BlockedSite[] = [{ name: "X", domain: "https://www.x.com" }];

    const withoutX = toggleScheduleSitePreset(initialSites, {
      name: "X",
      domain: "x.com",
    });
    const withYoutube = toggleScheduleSitePreset(withoutX, {
      name: "YouTube",
      domain: "https://www.youtube.com",
    });

    expect(withoutX).toEqual([]);
    expect(withYoutube).toEqual([
      { name: "YouTube", domain: "youtube.com" },
    ]);
  });

  it("marks preset-backed rows as non-editable by normalized domain", () => {
    expect(
      isPresetBackedScheduleSite({ name: "X", domain: "https://www.x.com" }),
    ).toBe(true);
    expect(
      isPresetBackedScheduleSite({ name: "Docs", domain: "docs.example.com" }),
    ).toBe(false);
  });

  it("renders the translated title and accessible preset buttons", () => {
    const items = createScheduleSitePresetItems([
      { name: "Instagram", domain: "instagram.com" },
    ]);

    render(
      <PopularSiteCarousel
        title="Add from popular sites"
        items={items}
        onSelect={() => undefined}
      />,
    );

    expect(screen.getByText("Add from popular sites")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "YouTube" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Instagram" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
  });
});
