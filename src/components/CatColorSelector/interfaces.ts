import type { InputHTMLAttributes, ReactNode } from "react";

export type CatColorSelectorProps = {
  label: string;
  icon: ReactNode;
  error?: string;
} & InputHTMLAttributes<HTMLInputElement>;
