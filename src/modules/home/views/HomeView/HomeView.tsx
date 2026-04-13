import { SurfaceCard } from "@/components/SurfaceCard";
import {
  HOME_VIEW_BODY_PANEL_CLASS_NAME,
  HOME_VIEW_PRIMARY_ACTION_CLASS_NAME,
  HOME_VIEW_SECONDARY_TEXT_CLASS_NAME,
  HOME_VIEW_SHELL_CLASS_NAME,
} from "@/modules/home/views/HomeView/constants";
import type { HomeViewProps } from "@/modules/home/views/HomeView/interfaces";

export function HomeView({
  eyebrow,
  title,
  description,
  body,
  primaryActionLabel,
  onPrimaryAction,
  secondaryText,
}: HomeViewProps) {
  return (
    <div className={HOME_VIEW_SHELL_CLASS_NAME}>
      <SurfaceCard
        eyebrow={eyebrow}
        title={title}
        description={description}
        footer={
          secondaryText ? (
            <p className={HOME_VIEW_SECONDARY_TEXT_CLASS_NAME}>{secondaryText}</p>
          ) : undefined
        }
      >
        <div className="space-y-4">
          <p className={HOME_VIEW_BODY_PANEL_CLASS_NAME}>{body}</p>
          {primaryActionLabel && onPrimaryAction ? (
            <button
              className={HOME_VIEW_PRIMARY_ACTION_CLASS_NAME}
              type="button"
              onClick={onPrimaryAction}
            >
              {primaryActionLabel}
            </button>
          ) : null}
        </div>
      </SurfaceCard>
    </div>
  );
}
