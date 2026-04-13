import type { OptionSelectorProps } from "@/components/OptionSelector/interfaces";

export function OptionSelector<TValue extends string>({
  value,
  options,
  onChange,
  label,
  disabled = false,
}: OptionSelectorProps<TValue>) {
  return (
    <label className="flex min-w-[140px] flex-col gap-1 text-right">
      <span className="text-xs font-semibold uppercase tracking-[0.18em] text-stone-400">
        {label}
      </span>
      <select
        value={value}
        disabled={disabled}
        onChange={(event) => {
          onChange(event.target.value as TValue);
        }}
        className="cursor-pointer rounded-2xl border border-stone-200 bg-white px-3 py-2 text-sm text-stone-800 outline-none transition focus:border-amber-500 disabled:cursor-not-allowed"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}
