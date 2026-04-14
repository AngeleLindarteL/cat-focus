import type { PixelCatProps } from "@/components/PixelCat/interfaces";
import { usePixelCat } from "@/components/PixelCat/usePixelCat";

export function PixelCat({
  furColorPrimary,
  furColorSecondary,
  eyeColor,
  tailColor,
  className,
}: PixelCatProps) {
  const { style, cells } = usePixelCat({
    furColorPrimary,
    furColorSecondary,
    eyeColor,
    tailColor,
  });

  return (
    <div
      className={["relative h-[220px] w-[220px]", className ?? ""].join(" ")}
      style={style}
    >
      <div className="absolute bottom-3 left-1/2 h-5 w-32 -translate-x-1/2 rounded-full bg-[rgba(0,0,0,0.22)] blur-[1px]" />
      <div className="absolute inset-0">
        {cells.map((cell) => (
          <span
            key={cell.key}
            className="absolute block h-2.5 w-2.5"
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
