import type { PropsWithChildren } from "react";

export type TooltipPosition = "above" | "below" | "left" | "right";

export type TooltipProps = PropsWithChildren<{
  position: TooltipPosition;
  text: string;
  disabled: boolean;
}>;
