import type { CatFurType, CatProfile } from "@/lib/cat";
import type { UseTranslationResult } from "@/lib/i18n";

export type NewCatAutosaveStatus = "saving" | "saved" | "error";

export type NewCatDashboardViewProps = {
  getTranslation: UseTranslationResult["getTranslation"];
  profile: CatProfile;
  autosaveStatus: NewCatAutosaveStatus;
  isLoading: boolean;
  onBaseFurColorChange: (value: string) => void;
  onEyeColorChange: (value: string) => void;
  onFurTypeChange: (value: CatFurType) => void;
  onFurTypeColor1Change: (value: string) => void;
  onFurTypeColor2Change: (value: string) => void;
};
