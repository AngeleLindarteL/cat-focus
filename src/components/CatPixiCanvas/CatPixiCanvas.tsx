import { useEffect, useRef } from "react";
import "pixi.js/unsafe-eval";
import { Application, Container, type AnimatedSprite, Texture } from "pixi.js";
import { type CatProfile, CatSpritesheetsBuilder } from "@/lib/cat";
import {
  CAT_PIXI_ANIMATION_SPEED,
  CAT_PIXI_CANVAS_SIZE,
  CAT_PIXI_DISPLAY_SCALE,
} from "@/components/CatPixiCanvas/constants";
import type { CatPixiCanvasProps } from "@/components/CatPixiCanvas/interfaces";

export function CatPixiCanvas({
  profile,
  animation,
  className,
}: CatPixiCanvasProps) {
  const hostRef = useRef<HTMLDivElement | null>(null);
  const appRef = useRef<Application | null>(null);
  const layerSpritesRef = useRef<AnimatedSprite[]>([]);
  const disposableTexturesRef = useRef<Texture[]>([]);

  useEffect(() => {
    let isCancelled = false;

    async function setupCanvas(nextProfile: CatProfile) {
      const host = hostRef.current;

      if (!host) {
        return;
      }

      const app = new Application();

      await app.init({
        width: CAT_PIXI_CANVAS_SIZE,
        height: CAT_PIXI_CANVAS_SIZE,
        backgroundAlpha: 0,
        antialias: false,
        autoDensity: true,
        resolution: window.devicePixelRatio || 1,
      });

      if (isCancelled) {
        app.destroy({ removeView: true }, { children: true });
        return;
      }

      host.replaceChildren(app.canvas);
      appRef.current = app;
      app.canvas.className = "h-full w-full";

      const catContainer = new Container();
      catContainer.position.set(
        Math.round(CAT_PIXI_CANVAS_SIZE / 2),
        Math.round(CAT_PIXI_CANVAS_SIZE / 2 + 4),
      );
      catContainer.scale.set(CAT_PIXI_DISPLAY_SCALE);

      const { layerSprites, disposableTextures } =
        await CatSpritesheetsBuilder.LoadLayers(nextProfile, animation);

      if (isCancelled) {
        app.destroy({ removeView: true }, { children: true });
        return;
      }

      disposableTexturesRef.current = disposableTextures;
      layerSpritesRef.current = layerSprites;
      layerSprites.forEach((layer) => {
        layer.animationSpeed = CAT_PIXI_ANIMATION_SPEED;
        catContainer.addChild(layer);
      });
      layerSprites.forEach((layer) => {
        layer.gotoAndPlay(0);
      });

      app.stage.addChild(catContainer);
    }

    void setupCanvas(profile).catch((error) => {
      if (!isCancelled) {
        console.error("Failed to initialize the cat Pixi canvas.", error);
      }
    });

    return () => {
      isCancelled = true;
      layerSpritesRef.current.forEach((layer) => {
        layer.stop();
        layer.destroy();
      });
      layerSpritesRef.current = [];
      disposableTexturesRef.current.forEach((texture) => {
        texture.destroy(true);
      });
      disposableTexturesRef.current = [];

      if (appRef.current) {
        appRef.current.destroy({ removeView: true }, { children: true });
        appRef.current = null;
      }
    };
  }, [animation, profile]);

  return (
    <div
      ref={hostRef}
      className={["h-40 w-40", className].filter(Boolean).join(" ")}
      aria-hidden="true"
    />
  );
}
