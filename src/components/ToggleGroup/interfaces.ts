export type ToggleGroupOption<TKey extends string> = {
  key: TKey;
  label: string;
  default: boolean;
};

export type ToggleGroupValue<TKey extends string> = Record<TKey, boolean>;

export type ToggleGroupRef<TKey extends string> = {
  value: ToggleGroupValue<TKey>;
};

export type ToggleGroupProps<TKey extends string> = {
  options: ToggleGroupOption<TKey>[];
  label: string;
  disabled?: boolean;
};
