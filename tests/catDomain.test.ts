import { beforeEach, describe, expect, it, vi } from "vitest";

const { loadTextureMock, textureFromMock } = vi.hoisted(() => ({
  loadTextureMock: vi.fn(),
  textureFromMock: vi.fn(),
}));

vi.mock("pixi.js", () => {
  class MockTexture {
    id: string;
    width = 224;
    height = 32;
    source = {
      resource: {},
      scaleMode: "linear",
    };
    destroy = vi.fn();

    constructor(id: string) {
      this.id = id;
    }

    static from(...args: unknown[]) {
      return textureFromMock(...args);
    }
  }

  class MockAnimatedSprite {
    frames: unknown[];
    anchor = {
      set: vi.fn(),
    };
    animationSpeed = 0;
    roundPixels = false;
    tint?: number;
    gotoAndPlay = vi.fn();
    stop = vi.fn();
    destroy = vi.fn();

    constructor(frames: unknown[]) {
      this.frames = frames;
    }
  }

  class MockSpritesheet {
    texture: MockTexture;
    data: {
      animations: Record<string, string[]>;
    };
    animations: Record<string, unknown[]> = {};

    constructor(
      texture: MockTexture,
      data: {
        animations: Record<string, string[]>;
      },
    ) {
      this.texture = texture;
      this.data = data;
    }

    async parse() {
      this.animations = Object.fromEntries(
        Object.entries(this.data.animations).map(([animation, frames]) => [
          animation,
          frames.map((frame) => ({
            frame,
            textureId: this.texture.id,
          })),
        ]),
      );
    }
  }

  return {
    AnimatedSprite: MockAnimatedSprite,
    Assets: {
      load: loadTextureMock,
    },
    Spritesheet: MockSpritesheet,
    Texture: MockTexture,
  };
});

import {
  AssetCatBuilder,
  BASE_ANIMATIONS_FOLDER,
  CAT_FRAME_COUNT,
  CAT_FRAME_SIZE,
  CatSpritesheetsBuilder,
} from "@/lib/cat";
import { PixiCanvasHelpers } from "@/lib/utils";

declare global {
  var chrome: {
    runtime?: {
      getURL?: (path: string) => string;
    };
  };
}

describe("cat domain", () => {
  beforeEach(() => {
    loadTextureMock.mockReset();
    textureFromMock.mockReset();
    vi.restoreAllMocks();
    globalThis.chrome = {
      runtime: {
        getURL: (path) => `chrome-extension://test/${path}`,
      },
    };
  });

  it("builds the idle stripes layers in the expected order", () => {
    expect(AssetCatBuilder.build("idle", "stripes")).toEqual([
      {
        layer: "base_fur",
        assetPath: `${BASE_ANIMATIONS_FOLDER}/idle_spritesheets/base_fur.png`,
        tintKey: "baseFurColor",
      },
      {
        layer: "fur1_color1",
        assetPath: `${BASE_ANIMATIONS_FOLDER}/idle_spritesheets/fur1_color1.png`,
        tintKey: "furTypeColor1",
      },
      {
        layer: "eyes",
        assetPath: `${BASE_ANIMATIONS_FOLDER}/idle_spritesheets/eyes.png`,
        tintKey: "eyeColor",
      },
      {
        layer: "blush",
        assetPath: `${BASE_ANIMATIONS_FOLDER}/idle_spritesheets/blush.png`,
      },
      {
        layer: "outline",
        assetPath: `${BASE_ANIMATIONS_FOLDER}/idle_spritesheets/outline.png`,
      },
    ]);
  });

  it("builds the idle spots layers in the expected order", () => {
    expect(AssetCatBuilder.build("idle", "spots")).toEqual([
      {
        layer: "base_fur",
        assetPath: `${BASE_ANIMATIONS_FOLDER}/idle_spritesheets/base_fur.png`,
        tintKey: "baseFurColor",
      },
      {
        layer: "fur2_color1",
        assetPath: `${BASE_ANIMATIONS_FOLDER}/idle_spritesheets/fur2_color1.png`,
        tintKey: "furTypeColor1",
      },
      {
        layer: "fur2_color2",
        assetPath: `${BASE_ANIMATIONS_FOLDER}/idle_spritesheets/fur2_color2.png`,
        tintKey: "furTypeColor2",
      },
      {
        layer: "eyes",
        assetPath: `${BASE_ANIMATIONS_FOLDER}/idle_spritesheets/eyes.png`,
        tintKey: "eyeColor",
      },
      {
        layer: "blush",
        assetPath: `${BASE_ANIMATIONS_FOLDER}/idle_spritesheets/blush.png`,
      },
      {
        layer: "outline",
        assetPath: `${BASE_ANIMATIONS_FOLDER}/idle_spritesheets/outline.png`,
      },
    ]);
  });

  it("builds seven 32x32 frames for the idle strip", () => {
    const data = CatSpritesheetsBuilder.createSpritesheetData("idle");

    expect(Object.keys(data.frames)).toHaveLength(CAT_FRAME_COUNT);
    expect(data.frames["idle-0.png"]).toEqual({
      frame: { x: 0, y: 0, w: CAT_FRAME_SIZE, h: CAT_FRAME_SIZE },
      sourceSize: { w: CAT_FRAME_SIZE, h: CAT_FRAME_SIZE },
      spriteSourceSize: { x: 0, y: 0, w: CAT_FRAME_SIZE, h: CAT_FRAME_SIZE },
    });
    expect(data.frames["idle-6.png"]).toEqual({
      frame: { x: 192, y: 0, w: CAT_FRAME_SIZE, h: CAT_FRAME_SIZE },
      sourceSize: { w: CAT_FRAME_SIZE, h: CAT_FRAME_SIZE },
      spriteSourceSize: { x: 0, y: 0, w: CAT_FRAME_SIZE, h: CAT_FRAME_SIZE },
    });
    expect(data.animations?.idle).toEqual([
      "idle-0.png",
      "idle-1.png",
      "idle-2.png",
      "idle-3.png",
      "idle-4.png",
      "idle-5.png",
      "idle-6.png",
      "idle-5.png",
      "idle-4.png",
      "idle-3.png",
      "idle-2.png",
      "idle-1.png",
      "idle-0.png",
    ]);
  });

  it("loads layers with masked textures only for tinted assets", async () => {
    loadTextureMock.mockImplementation(async (assetUrl: string) => ({
      id: assetUrl,
      width: 224,
      height: 32,
      source: {
        resource: {},
        scaleMode: "linear",
      },
      destroy: vi.fn(),
    }));

    const maskTextureSpy = vi
      .spyOn(PixiCanvasHelpers, "createFlatColorMaskTexture")
      .mockImplementation((texture) => ({
        id: `masked:${(texture as { id: string }).id}`,
        width: texture.width,
        height: texture.height,
        source: {
          resource: {},
          scaleMode: "nearest",
        },
        destroy: vi.fn(),
      }) as never);

    const result = await CatSpritesheetsBuilder.LoadLayers(
      {
        baseFurColor: "#d0a06a",
        eyeColor: "#365314",
        furType: "spots",
        furTypeColor1: "#8a5527",
        furTypeColor2: "#f3c48b",
      },
      "idle",
    );

    expect(maskTextureSpy).toHaveBeenCalledTimes(4);
    expect(result.disposableTextures).toHaveLength(4);
    expect(result.layerSprites).toHaveLength(6);
    expect(result.layerSprites.map((sprite) => (sprite as { frames: { textureId: string }[] }).frames[0].textureId)).toEqual([
      "masked:chrome-extension://test/src/assets/animations/idle_spritesheets/base_fur.png",
      "masked:chrome-extension://test/src/assets/animations/idle_spritesheets/fur2_color1.png",
      "masked:chrome-extension://test/src/assets/animations/idle_spritesheets/fur2_color2.png",
      "masked:chrome-extension://test/src/assets/animations/idle_spritesheets/eyes.png",
      "chrome-extension://test/src/assets/animations/idle_spritesheets/blush.png",
      "chrome-extension://test/src/assets/animations/idle_spritesheets/outline.png",
    ]);
  });
});
