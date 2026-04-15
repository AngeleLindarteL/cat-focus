import { beforeEach, describe, expect, it } from "vitest";
import { getExtensionInstallType, isDevelopmentInstall } from "@/lib/chrome/management";
import { createChromeMock } from "./helpers/chrome";

declare global {
  var chrome: ReturnType<typeof createChromeMock>;
}

describe("chrome management wrapper", () => {
  beforeEach(() => {
    globalThis.chrome = createChromeMock();
  });

  it("returns the current install type from chrome.management.getSelf", async () => {
    globalThis.chrome = createChromeMock({}, "en", "development");

    await expect(getExtensionInstallType()).resolves.toBe("development");
  });

  it("detects development installs", async () => {
    globalThis.chrome = createChromeMock({}, "en", "development");

    await expect(isDevelopmentInstall()).resolves.toBe(true);
  });

  it("returns false when the install is not development", async () => {
    globalThis.chrome = createChromeMock({}, "en", "normal");

    await expect(isDevelopmentInstall()).resolves.toBe(false);
  });
});
