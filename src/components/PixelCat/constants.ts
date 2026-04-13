export const PIXEL_CAT_CONTAINER_CLASS_NAME = "relative h-[220px] w-[220px]";

export const PIXEL_CAT_SHADOW_CLASS_NAME =
  "absolute bottom-3 left-1/2 h-5 w-32 -translate-x-1/2 rounded-full bg-[rgba(0,0,0,0.22)] blur-[1px]";

export const PIXEL_CAT_CELL_CLASS_NAME = "absolute block h-2.5 w-2.5";

export const PIXEL_CAT_SPRITE = [
  "......XXX....XXX......",
  "......XIXX..XXIX......",
  "......XIPX..XPIX......",
  ".....XXPPXXXXPPXX.....",
  "....XXPPPPSSPPPPXX....",
  "....XPPPPWWWWPPPPX....",
  "...XXPPWWWWWWWWPPXX...",
  "...XPPWWWWWWWWWWPPX...",
  "...XPWWEWWWWWWEWWPX..XX",
  "...XWWWBXWXWXBWWWWX.XTX",
  "...XWWWWXXXXXWWWWWXXTX.",
  "....XWWWWWWWWWWWWX.XTX",
  "....XXWWWWWWWWWWXXXXTTX",
  "...XXSWWWWWWWWWWWSSXXTX",
  "...XSSWWWWWWWWWWWSSXXTX",
  "...XSSWWWWWWWWWWWSSXXTX",
  "...XXXXXXWWWWWWXXXXXTX..",
  ".....XSSXWWWWXSSXXTTX.",
  ".....XSSXXXXXXSSXXXX..",
  ".....XXXX....XXXX.....",
] as const;

export const PIXEL_CAT_PALETTE_MAP: Record<string, string> = {
  X: "var(--cat-outline)",
  P: "var(--cat-fur-primary)",
  S: "var(--cat-fur-secondary)",
  T: "var(--cat-tail)",
  W: "var(--cat-fur-light)",
  I: "var(--cat-inner-ear)",
  E: "var(--cat-eyes)",
  B: "var(--cat-blush)",
};
