import { Texture } from "pixi.js";

export class PixiCanvasHelpers {
  private constructor() {}

  static createFlatColorMaskTexture(texture: Texture): Texture {
    const canvas = document.createElement("canvas");
    const width = texture.width;
    const height = texture.height;

    canvas.width = width;
    canvas.height = height;

    const context = canvas.getContext("2d");
    const resource = texture.source.resource;

    if (!context || !resource) {
      throw new Error(
        "Could not create a 2D canvas context for cat Pixi tint masking.",
      );
    }

    context.clearRect(0, 0, width, height);
    context.drawImage(resource as CanvasImageSource, 0, 0, width, height);
    context.globalCompositeOperation = "source-in";
    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, width, height);

    const maskedTexture = Texture.from(canvas, true);
    maskedTexture.source.scaleMode = "nearest";

    return maskedTexture;
  }
}
