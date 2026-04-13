import {
  PIXEL_CAT_CELL_CLASS_NAME,
  PIXEL_CAT_CONTAINER_CLASS_NAME,
  PIXEL_CAT_SHADOW_CLASS_NAME,
} from "@/components/PixelCat/constants";
import type { PixelCatProps } from "@/components/PixelCat/interfaces";
import { usePixelCat } from "@/components/PixelCat/usePixelCat";

export function PixelCat({
  furColorPrimary,
  furColorSecondary,
  className,
}: PixelCatProps) {
  const { style, cells } = usePixelCat({ furColorPrimary, furColorSecondary });

  return (
    <div
      className={[PIXEL_CAT_CONTAINER_CLASS_NAME, className ?? ""].join(" ")}
      style={style}
    >
      <div className={PIXEL_CAT_SHADOW_CLASS_NAME} />
      <div className="absolute inset-0">
        {cells.map((cell) => (
          <span
            key={cell.key}
            className={PIXEL_CAT_CELL_CLASS_NAME}
            style={{
              left: cell.left,
              top: cell.top,
              backgroundColor: cell.backgroundColor,
            }}
          />
        ))}
      </div>
    </div>
  );
}
