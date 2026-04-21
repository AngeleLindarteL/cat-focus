export type CatFurType = "stripes" | "spots";

export type CatAnimation = "idle";

export type CatProfile = {
  baseFurColor: string;
  eyeColor: string;
  furType: CatFurType;
  furTypeColor1: string;
  furTypeColor2: string;
};

export type CatLayerDefinition = {
  layer: string;
  assetPath: string;
  tintKey?: keyof Pick<
    CatProfile,
    "baseFurColor" | "eyeColor" | "furTypeColor1" | "furTypeColor2"
  >;
};
