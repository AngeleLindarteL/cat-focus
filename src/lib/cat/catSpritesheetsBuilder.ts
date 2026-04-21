import {
  AnimatedSprite,
  Assets,
  Spritesheet,
  type SpritesheetData,
  Texture,
} from "pixi.js";
import { AssetCatBuilder } from "@/lib/cat/assetCatBuilder";
import { CAT_FRAME_COUNT, CAT_FRAME_SIZE } from "@/lib/cat/cat.constants";
import type { CatAnimation, CatProfile } from "@/lib/cat/cat.interfaces";
import { ExtensionHelpers, PixiCanvasHelpers } from "@/lib/utils";

export class CatSpritesheetsBuilder {
  private constructor() {}

  static createPingPongFrameSequence(animation: CatAnimation): string[] {
    const ascendingFrames = Array.from(
      { length: CAT_FRAME_COUNT },
      (_, index) => `${animation}-${index}.png`,
    );
    const descendingFrames = ascendingFrames.slice(0, -1).reverse();

    return [...ascendingFrames, ...descendingFrames];
  }

  static createSpritesheetData(animation: CatAnimation): SpritesheetData {
    const frames = Object.fromEntries(
      Array.from({ length: CAT_FRAME_COUNT }, (_, index) => [
        `${animation}-${index}.png`,
        {
          frame: {
            x: index * CAT_FRAME_SIZE,
            y: 0,
            w: CAT_FRAME_SIZE,
            h: CAT_FRAME_SIZE,
          },
          sourceSize: {
            w: CAT_FRAME_SIZE,
            h: CAT_FRAME_SIZE,
          },
          spriteSourceSize: {
            x: 0,
            y: 0,
            w: CAT_FRAME_SIZE,
            h: CAT_FRAME_SIZE,
          },
        },
      ]),
    );

    return {
      frames,
      animations: {
        [animation]: CatSpritesheetsBuilder.createPingPongFrameSequence(animation),
      },
      meta: {
        scale: 1,
        size: {
          w: CAT_FRAME_SIZE * CAT_FRAME_COUNT,
          h: CAT_FRAME_SIZE,
        },
      },
    };
  }

  static async parseSpritesheet(texture: Texture, animation: CatAnimation) {
    texture.source.scaleMode = "nearest";

    const spritesheet = new Spritesheet(
      texture,
      CatSpritesheetsBuilder.createSpritesheetData(animation),
    );

    await spritesheet.parse();

    return spritesheet;
  }

  static async LoadLayers(profile: CatProfile, animation: CatAnimation) {
    const layerDefinitions = AssetCatBuilder.build(animation, profile.furType);
    const disposableTextures: Texture[] = [];

    const layerSprites = await Promise.all(
      layerDefinitions.map(async ({ assetPath, tintKey }) => {
        const assetUrl = ExtensionHelpers.getExtensionAssetUrl(assetPath);
        const loadedTexture = await Assets.load<Texture>(assetUrl);
        const texture = tintKey
          ? PixiCanvasHelpers.createFlatColorMaskTexture(loadedTexture)
          : loadedTexture;

        if (tintKey) {
          disposableTextures.push(texture);
        }

        const spritesheet = await CatSpritesheetsBuilder.parseSpritesheet(
          texture,
          animation,
        );
        const frames = spritesheet.animations[animation];
        const sprite = new AnimatedSprite(frames);

        sprite.anchor.set(0.5);
        sprite.roundPixels = true;

        if (tintKey) {
          sprite.tint = CatSpritesheetsBuilder.hexColorToNumber(profile[tintKey]);
        }

        return sprite;
      }),
    );

    return {
      layerSprites,
      disposableTextures,
    };
  }

  private static hexColorToNumber(color: string): number {
    return Number.parseInt(color.slice(1), 16);
  }
}
