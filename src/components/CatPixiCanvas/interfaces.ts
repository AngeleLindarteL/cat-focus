import type { CatAnimation, CatProfile } from "@/lib/cat";

export type CatPixiCanvasProps = {
  profile: CatProfile;
  animation: CatAnimation;
  className?: string;
};
