import { OptionSelector } from "@/components/OptionSelector";
import type { LanguageSelectorProps } from "@/components/LanguageSelector/interfaces";

export function LanguageSelector({
  value,
  label,
  englishLabel,
  spanishLabel,
  onChange,
  disabled = false,
}: LanguageSelectorProps) {
  return (
    <OptionSelector
      value={value}
      options={[
        { value: "en", label: englishLabel },
        { value: "es", label: spanishLabel },
      ]}
      onChange={onChange}
      label={label}
      disabled={disabled}
    />
  );
}
