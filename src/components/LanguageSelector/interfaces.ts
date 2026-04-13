import type { Language } from "@/lib/i18n";

export type LanguageSelectorProps = {
  value: Language;
  label: string;
  englishLabel: string;
  spanishLabel: string;
  onChange: (value: Language) => void;
  disabled?: boolean;
};
