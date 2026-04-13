import type { DeleteScheduleModalProps } from "@/components/DeleteScheduleModal/interfaces";

export function DeleteScheduleModal({
  isOpen,
  title,
  description,
  confirmLabel,
  cancelLabel,
  onConfirm,
  onCancel,
}: DeleteScheduleModalProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-20 flex items-center justify-center bg-stone-950/25 p-4">
      <div className="w-full max-w-sm rounded-[28px] border border-stone-200 bg-white p-6 shadow-xl">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-stone-900">{title}</h3>
          <p className="text-sm leading-6 text-stone-600">{description}</p>
        </div>
        <div className="mt-5 flex justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="cursor-pointer rounded-2xl border border-stone-200 px-4 py-3 text-sm font-semibold text-stone-700 transition hover:border-stone-300"
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="cursor-pointer rounded-2xl bg-red-700 px-4 py-3 text-sm font-semibold text-white transition hover:bg-red-600"
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
