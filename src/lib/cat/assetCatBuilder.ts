import { BASE_ANIMATIONS_FOLDER } from "@/lib/cat/cat.constants";
import type {
  CatAnimation,
  CatFurType,
  CatLayerDefinition,
} from "@/lib/cat/cat.interfaces";

export class AssetCatBuilder {
  private constructor() {}

  static build(
    animation: CatAnimation,
    furType: CatFurType,
  ): CatLayerDefinition[] {
    let patternLayers: Array<CatLayerDefinition> = [];

    if (furType === "stripes") {
      patternLayers = [
        AssetCatBuilder.createLayer(animation, "fur1_color1", "furTypeColor1"),
      ];
      console.log("stripes pattern added");
    } else if (furType === "spots") {
      patternLayers = [
        AssetCatBuilder.createLayer(animation, "fur2_color1", "furTypeColor1"),
        AssetCatBuilder.createLayer(animation, "fur2_color2", "furTypeColor2"),
      ];
      console.log("spots pattern added");
    }

    return [
      AssetCatBuilder.createLayer(animation, "base_fur", "baseFurColor"),
      ...patternLayers,
      AssetCatBuilder.createLayer(animation, "eyes", "eyeColor"),
      AssetCatBuilder.createLayer(animation, "blush"),
      AssetCatBuilder.createLayer(animation, "outline"),
    ];
  }

  private static createLayer(
    animation: CatAnimation,
    layer: string,
    tintKey?: CatLayerDefinition["tintKey"],
  ): CatLayerDefinition {
    return {
      layer,
      assetPath: `${BASE_ANIMATIONS_FOLDER}/${animation}_spritesheets/${layer}.png`,
      tintKey,
    };
  }
}
