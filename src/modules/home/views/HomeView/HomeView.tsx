import { SurfaceCard } from "@/components/SurfaceCard";
import {
  HOME_VIEW_BODY_PANEL_CLASS_NAME,
  HOME_VIEW_OPTIONS_LAYOUT_CLASS_NAME,
  HOME_VIEW_POPUP_LAYOUT_CLASS_NAME,
  HOME_VIEW_PRIMARY_ACTION_CLASS_NAME,
  HOME_VIEW_SECONDARY_TEXT_CLASS_NAME,
  HOME_VIEW_SHELL_CLASS_NAME,
} from "@/modules/home/views/HomeView/constants";
import type { HomeViewProps } from "@/modules/home/views/HomeView/interfaces";

export function HomeView({
  surface = "options",
  eyebrow,
  title,
  description,
  body,
  primaryActionLabel,
  onPrimaryAction,
  secondaryText,
}: HomeViewProps) {
  const layoutClassName =
    surface === "popup"
      ? HOME_VIEW_POPUP_LAYOUT_CLASS_NAME
      : HOME_VIEW_OPTIONS_LAYOUT_CLASS_NAME;

  return (
    <div className={HOME_VIEW_SHELL_CLASS_NAME}>
      <div className={layoutClassName}>
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
    </div>
  );
}
