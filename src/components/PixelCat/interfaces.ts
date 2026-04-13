import type { CSSProperties } from "react";

export type PixelCatProps = {
  furColorPrimary: string;
  furColorSecondary: string;
  className?: string;
};

export type PixelCatCell = {
  key: string;
  left: string;
  top: string;
  backgroundColor: string;
};

export type UsePixelCatResult = {
  style: CSSProperties;
  cells: PixelCatCell[];
};
