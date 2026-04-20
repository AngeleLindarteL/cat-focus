import type { PropsWithChildren, ReactNode } from "react";

export type SurfaceCardProps = PropsWithChildren<{
  eyebrow: string;
  title: string;
  description: string;
  footer?: ReactNode;
  headerAccessory?: ReactNode;
  className?: string;
}>;
