export type BlockedSite = {
  name: string;
  domain: string;
};

export type PopularSitePreset = BlockedSite & {
  id: string;
  iconSrc: string;
};

export type PopularSitePresetItem = PopularSitePreset & {
  isSelected: boolean;
};
