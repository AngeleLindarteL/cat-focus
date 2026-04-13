import type { CSSProperties } from "react";
import {
  PIXEL_CAT_PALETTE_MAP,
  PIXEL_CAT_SPRITE,
} from "@/components/PixelCat/constants";
import type { PixelCatProps, UsePixelCatResult } from "@/components/PixelCat/interfaces";

export function usePixelCat({
  furColorPrimary,
  furColorSecondary,
}: Pick<PixelCatProps, "furColorPrimary" | "furColorSecondary">): UsePixelCatResult {
  const style: CSSProperties = {
    "--cat-fur-primary": furColorPrimary,
    "--cat-fur-secondary": furColorSecondary,
    "--cat-fur-light": "#ffffff",
    "--cat-outline": "#000000",
    "--cat-inner-ear": "#f1d9e6",
    "--cat-blush": "#efb4c3",
  } as CSSProperties;

  const cells = PIXEL_CAT_SPRITE.flatMap((row, y) =>
    [...row].flatMap((cell, x) => {
      if (cell === ".") {
        return [];
      }

      return {
        key: `${x}-${y}`,
        left: `${x * 10}px`,
        top: `${y * 10}px`,
        backgroundColor: PIXEL_CAT_PALETTE_MAP[cell],
      };
    }),
  );

  return { style, cells };
}
