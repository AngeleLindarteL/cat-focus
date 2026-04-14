import type { TooltipPosition } from "@/components/Tooltip/interfaces";

export const TOOLTIP_ANIMATION_MS = 180;

export const TOOLTIP_POSITION_CLASSNAME: Record<TooltipPosition, string> = {
  above:
    "bottom-full left-1/2 mb-3 -translate-x-1/2",
  below:
    "top-full left-1/2 mt-3 -translate-x-1/2",
  left: "right-full top-1/2 mr-3 -translate-y-1/2",
  right: "left-full top-1/2 ml-3 -translate-y-1/2",
};
