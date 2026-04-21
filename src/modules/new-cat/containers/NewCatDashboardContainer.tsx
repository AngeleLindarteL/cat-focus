import { useEffect, useRef, useState } from "react";
import { type CatFurType, type CatProfile } from "@/lib/cat";
import { type UseTranslationResult } from "@/lib/i18n";
import { DEFAULT_NEW_CAT_PROFILE } from "@/lib/newCat";
import {
  newCatRepository as defaultNewCatRepository,
  type NewCatRepository,
} from "@/lib/repositories";
import { NewCatDashboardView } from "@/modules/new-cat/views/NewCatDashboardView";
import type { NewCatAutosaveStatus } from "@/modules/new-cat/views/NewCatDashboardView";

type NewCatDashboardContainerProps = {
  getTranslation: UseTranslationResult["getTranslation"];
  repository?: NewCatRepository;
};

function areProfilesEqual(left: CatProfile, right: CatProfile): boolean {
  return (
    left.baseFurColor === right.baseFurColor &&
    left.eyeColor === right.eyeColor &&
    left.furType === right.furType &&
    left.furTypeColor1 === right.furTypeColor1 &&
    left.furTypeColor2 === right.furTypeColor2
  );
}

export function NewCatDashboardContainer({
  getTranslation,
  repository = defaultNewCatRepository,
}: NewCatDashboardContainerProps) {
  const [profile, setProfile] = useState<CatProfile>(DEFAULT_NEW_CAT_PROFILE);
  const [isLoading, setIsLoading] = useState(true);
  const [autosaveStatus, setAutosaveStatus] =
    useState<NewCatAutosaveStatus>("saved");
  const lastSavedProfileRef = useRef<CatProfile>(DEFAULT_NEW_CAT_PROFILE);

  useEffect(() => {
    let isMounted = true;

    void repository.getNewCatProfile().then((storedProfile) => {
      if (!isMounted) {
        return;
      }

      const nextProfile = storedProfile ?? DEFAULT_NEW_CAT_PROFILE;

      setProfile(nextProfile);
      lastSavedProfileRef.current = nextProfile;
      setAutosaveStatus("saved");
      setIsLoading(false);
    });

    return () => {
      isMounted = false;
    };
  }, [repository]);

  useEffect(() => {
    if (isLoading || areProfilesEqual(profile, lastSavedProfileRef.current)) {
      return undefined;
    }

    let isCancelled = false;
    const timeoutId = window.setTimeout(() => {
      void repository
        .saveNewCatProfile(profile)
        .then(() => {
          if (isCancelled) {
            return;
          }

          lastSavedProfileRef.current = profile;
          setAutosaveStatus("saved");
        })
        .catch(() => {
          if (isCancelled) {
            return;
          }

          setAutosaveStatus("error");
        });
    }, 500);

    return () => {
      isCancelled = true;
      window.clearTimeout(timeoutId);
    };
  }, [isLoading, profile, repository]);

  function updateProfile(patch: Partial<CatProfile>) {
    setAutosaveStatus("saving");
    setProfile((currentProfile) => ({
      ...currentProfile,
      ...patch,
    }));
  }

  return (
    <NewCatDashboardView
      getTranslation={getTranslation}
      profile={profile}
      autosaveStatus={autosaveStatus}
      isLoading={isLoading}
      onBaseFurColorChange={(value) => {
        updateProfile({ baseFurColor: value });
      }}
      onEyeColorChange={(value) => {
        updateProfile({ eyeColor: value });
      }}
      onFurTypeChange={(value: CatFurType) => {
        updateProfile({ furType: value });
      }}
      onFurTypeColor1Change={(value) => {
        updateProfile({ furTypeColor1: value });
      }}
      onFurTypeColor2Change={(value) => {
        updateProfile({ furTypeColor2: value });
      }}
    />
  );
}
