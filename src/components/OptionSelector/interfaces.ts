export type OptionSelectorOption<TValue extends string> = {
  value: TValue;
  label: string;
};

export type OptionSelectorProps<TValue extends string> = {
  value: TValue;
  options: OptionSelectorOption<TValue>[];
  onChange: (value: TValue) => void;
  label: string;
  disabled?: boolean;
};
