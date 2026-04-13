import { describe, expect, it } from "vitest";
import {
  createCatProfileSchema,
  sanitizeCatName,
} from "@/modules/onboarding/services/catProfileForm";

describe("cat profile form schema", () => {
  const schema = createCatProfileSchema({
    nameRequired: "Name required",
    colorInvalid: "Invalid color",
  });

  it("sanitizes repeated whitespace", () => {
    expect(sanitizeCatName("  Captain   Whiskers  ")).toBe("Captain Whiskers");
  });

  it("rejects a whitespace-only name", () => {
    const result = schema.safeParse({
      name: "   ",
      furColorPrimary: "#d0a06a",
      furColorSecondary: "#8a5527",
    });

    expect(result.success).toBe(false);
  });

  it("rejects invalid color values", () => {
    const result = schema.safeParse({
      name: "Mochi",
      furColorPrimary: "orange",
      furColorSecondary: "#8a5527",
    });

    expect(result.success).toBe(false);
  });

  it("returns sanitized values for valid data", () => {
    const result = schema.parse({
      name: "  Captain   Whiskers ",
      furColorPrimary: "#d0a06a",
      furColorSecondary: "#8a5527",
    });

    expect(result.name).toBe("Captain Whiskers");
  });
});
